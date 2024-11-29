import UserService from '@/utils/users';
import CookieService from '@/utils/cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  GetUserGroupInvitesByEmailQuery,
  UpdateUserPersonIdDocument,
  UpdateUserPersonIdMutation,
  InsertOnboardingClaimProfileMutation,
  InsertOnboardingClaimProfileDocument,
} from '@/graphql/types';
import GroupService from '@/utils/groups';
import { makeAuthService, UserInfo } from '@/services/auth.service';
import { mutate } from '@/graphql/hasuraAdmin';
import { onFindPeopleByLinkedin } from './add-onboarding-information';
import validator from 'validator';
import UserTransactionsService, {
  REFERRAL_CREDITS_AMOUNT,
  REGISTRATION_CREDITS_AMOUNT,
  TRANSACTION_SYSTEM_NOTE,
} from '@/utils/userTransactions';
import { PASSWORD_VALIDATION } from '@/utils/constants';

const authService = makeAuthService();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const personId: number | undefined = req.body.personId;
  const linkedinUrl: string = req.body.linkedinUrl;

  // check email exist in allowedEmail table or not
  const email = ((req.body.email as string) || '').toLowerCase();
  const reference_id = req.body.reference_id;
  // get the domain from the email
  const domain = email.split('@').pop() || '';
  const isEmailDisabled = await UserService.queryForDisabledEmailCheck(
    email,
    domain,
  );

  // when email does not exist in the allowed emails
  if (isEmailDisabled) {
    return res.status(404).send({
      message: `Your email ${email} has been added to our waitlist.  We'll be in touch soon!`,
    });
  }

  // Password validation
  if (!validator.isStrongPassword(req.body.password, PASSWORD_VALIDATION)) {
    return res.status(400).send({
      message: `Your password is not strong enough!`,
    });
  }

  let isUserPassPrimaryAccount = false;
  let isLinkedInPrimaryAccount = true;

  const data = {
    email,
    password: req.body.password,
    name: req.body.name,
    user_metadata: { role: 'user' },
  };

  let result: UserInfo & {
    groupInvites?: GetUserGroupInvitesByEmailQuery['user_group_invites'];
  };

  try {
    result = await authService.createUser(data);

    const user_id = result.identities![0].user_id;

    let userData: any = await UserService.findOneUserByEmail(email);

    if (!userData) {
      isUserPassPrimaryAccount = true;
      isLinkedInPrimaryAccount = false;
      let referenceUserId = null;

      // check user exist or not for the current reference
      if (reference_id) {
        // look up user by reference_id
        const referenceUser = await UserService.findOneUserByReferenceId(
          reference_id,
        );
        if (referenceUser) {
          referenceUserId = referenceUser.id;
        } else {
          // look up people by person slug
          const person = await UserService.findOnePeopleBySlug(reference_id);
          if (person) {
            // look up user by person_id
            const userByPersonId = await UserService.findOneUserByPersonId(
              person.id,
            );
            if (userByPersonId) {
              referenceUserId = userByPersonId.id;
            } else {
              referenceUserId = `person-${person.id}`;
            }
          }
        }
      }

      const objectData = {
        email: result.email,
        name: result.name,
        _id: user_id, // get Id from sub
        auth0_user_pass_id: user_id,
        reference_user_id: referenceUserId,
        // person_id: isEmailAllowed.person_id
      };
      // upsert user info
      userData = await UserService.upsertUser(objectData);
      console.log(
        'user data....upsertUser',
        referenceUserId,
        !isNaN(Number(referenceUserId)),
        userData,
        objectData,
      );
      // If we have referenced user, add extra credits to him
      if (referenceUserId && !isNaN(Number(referenceUserId))) {
        await UserTransactionsService.onInsertTransaction(
          referenceUserId as number,
          REFERRAL_CREDITS_AMOUNT,
          `${TRANSACTION_SYSTEM_NOTE} - registration referral bonus`,
        );
      }
    }
    // update the linkedIn id in user
    if (userData && !userData.auth0_user_pass_id) {
      isLinkedInPrimaryAccount = true;
      isUserPassPrimaryAccount = false;
      userData = await UserService.updateAuth0UserPassId(
        result.email!,
        user_id,
      );
    }

    // Link user to profile
    if (personId) {
      await onLinkUserToPerson(userData.id, personId);
    } else if (linkedinUrl) {
      const personByLinkedin = await onFindPeopleByLinkedin(linkedinUrl);
      if (personByLinkedin?.id) {
        await onLinkUserToPerson(userData.id, personByLinkedin.id);
      } else {
        const insertedPerson = await onInsertProfile(
          userData.display_name || '',
          userData.email,
          linkedinUrl,
        );
        await onLinkUserToPerson(userData.id, insertedPerson?.id || 0);
      }
    }

    // await authService.linkAccounts(
    //   isUserPassPrimaryAccount,
    //   isLinkedInPrimaryAccount,
    //   userData,
    // );

    // Add registration credits to new user
    await UserTransactionsService.onInsertTransaction(
      userData.id,
      REGISTRATION_CREDITS_AMOUNT,
      `${TRANSACTION_SYSTEM_NOTE} - registration bonus`,
    );

    const userToken = await UserService.generateToken({
      userId: userData.id,
      isFirstLogin: true,
    });
    console.log('after generate token', userToken);
    // Author a couple of cookies to persist a user's session
    const token = await CookieService.createUserToken(userToken);
    CookieService.setTokenCookie(res, token);

    const userGroupInvites: GetUserGroupInvitesByEmailQuery['user_group_invites'] =
      await GroupService.onFindUserGroupInvitesByEmail(email);
    result.groupInvites = userGroupInvites;
    if (userGroupInvites && userGroupInvites.length > 0) {
      await Promise.all(
        userGroupInvites.map(invites =>
          addMember(userData.id, invites.user_group_id),
        ),
      );
    }
  } catch (ex: any) {
    return res.status(404).send({ message: ex });
  }

  res.send({ success: true, result });
};

const addMember = async (userId: number, groupId: number) => {
  const response = await GroupService.onAddGroupMember(userId, groupId);
  return response;
};

const onLinkUserToPerson = async (userId: number, personId: number) => {
  const {
    data: { update_users },
  } = await mutate<UpdateUserPersonIdMutation>({
    mutation: UpdateUserPersonIdDocument,
    variables: {
      id: userId,
      person_id: personId,
    },
  });

  return update_users;
};

const onInsertProfile = async (
  name: string,
  email: string,
  linkedin: string,
) => {
  const {
    data: { insert_people_one },
  } = await mutate<InsertOnboardingClaimProfileMutation>({
    mutation: InsertOnboardingClaimProfileDocument,
    variables: {
      object: {
        name,
        slug: `${name.trim().replace(/ /g, '-').toLowerCase()}-${Math.floor(
          Date.now() / 1000,
        )}`,
        email,
        linkedin,
        status: 'draft',
      },
    },
  });

  return insert_people_one;
};

export default handler;
