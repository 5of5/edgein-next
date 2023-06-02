import UserService from '../../utils/users';
import { linkTwoAccount } from '../../utils/auth0-library';
import CookieService from '../../utils/cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { GetUserGroupInvitesByEmailQuery } from '@/graphql/types';
import GroupService from '@/utils/groups';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

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

  let isUserPassPrimaryAccount = false;
  let isLinkedInPrimaryAccount = true;

  const data = JSON.stringify({
    client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    email,
    password: req.body.password,
    name: req.body.name,
    user_metadata: { role: 'user' },
    connection: 'Username-Password-Authentication',
  });

  let result;
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  try {
    const fetchRequest = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/dbconnections/signup`,
      {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow',
      },
    );
    if (!fetchRequest.ok) {
      const errorResponse = JSON.parse(await fetchRequest.text());
      if (errorResponse.code === 'invalid_signup') {
        return res.status(fetchRequest.status).send({
          message: `Email ${email} already registered, please try signing in`,
        });
      } else {
        return res
          .status(fetchRequest.status)
          .send({ message: errorResponse.description });
      }
    }
    result = JSON.parse(await fetchRequest.text());

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
        _id: result._id, // get Id from sub
        auth0_user_pass_id: result._id,
        reference_user_id: referenceUserId,
        // person_id: isEmailAllowed.person_id
      };
      // upsert user info
      userData = await UserService.upsertUser(objectData);
    }
    // update the linkedIn id in user
    if (userData && !userData.auth0_user_pass_id) {
      isLinkedInPrimaryAccount = true;
      isUserPassPrimaryAccount = false;
      userData = await UserService.updateAuth0UserPassId(
        result.email,
        result._id,
      );
    }

    if (userData && userData.auth0_linkedin_id && userData.auth0_user_pass_id) {
      let primaryId = '';
      let secondayProvider = '';
      let secondayId = '';
      if (isUserPassPrimaryAccount) {
        primaryId = `auth0|${userData.auth0_user_pass_id}`;
        secondayProvider = 'linkedin';
        secondayId = `linkedin|${userData.auth0_linkedin_id}`;
      }
      if (isLinkedInPrimaryAccount) {
        primaryId = `linkedin|${userData.auth0_linkedin_id}`;
        secondayProvider = 'auth0';
        secondayId = `auth0|${userData.auth0_user_pass_id}`;
      }
      if (primaryId !== '' && secondayId !== '') {
        await linkTwoAccount(primaryId, secondayId, secondayProvider);
      }
    }

    const userToken = UserService.createToken(userData, true);

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
    return res.status(404).send({ message: ex.message });
  }

  res.send({ success: true, result });
};

const addMember = async (userId: number, groupId: number) => {
  const response = await GroupService.onAddGroupMember(userId, groupId);
  return response;
};

export default handler;
