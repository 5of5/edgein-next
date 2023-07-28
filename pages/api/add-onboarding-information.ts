import type { NextApiRequest, NextApiResponse } from 'next';
import { mutate, query } from '@/graphql/hasuraAdmin';
import {
  FindPeopleByLinkedinUrlDocument,
  FindPeopleByLinkedinUrlQuery,
  FindPeopleByNameAndEmailQuery,
  UpdateUserOnboardingInformationDocument,
  UpdateUserOnboardingInformationMutation,
  UpdateUserPersonIdDocument,
  UpdateUserPersonIdMutation,
  InsertOnboardingClaimProfileMutation,
  InsertOnboardingClaimProfileDocument,
  GetUserPublicByPersonIdQuery,
  GetUserPublicByPersonIdDocument,
} from '@/graphql/types';
import CookieService from '../../utils/cookie';
import SlackServices from '@/utils/slack';
import UserService from '@/utils/users';

type QUESTION = {
  name: string;
  answer: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // params
  const selectedResourceType = req.body.selectedResourceType;
  const locationTags = req.body.locationTags;
  const industryTags = req.body.industryTags;
  const questions = req.body.questions;
  const selectedPerson: FindPeopleByNameAndEmailQuery['people'][0] =
    req.body.selectedPerson;
  const linkedin: string = req.body.linkedin;

  try {
    // Link user to person id
    if (selectedPerson?.id) {
      const isClaimedPerson = await onFindUserPublicByPersonId(
        selectedPerson.id,
      );
      if (isClaimedPerson) {
        return res.status(400).send({
          error: 'The profile you chose was claimed from another user.',
        });
      }
      await onLinkUserToPerson(user.id, selectedPerson.id);
    } else if (linkedin) {
      const personByLinkedin = await onFindPeopleByLinkedin(linkedin);
      if (personByLinkedin?.id) {
        const isClaimedPerson = await onFindUserPublicByPersonId(
          personByLinkedin.id,
        );
        if (isClaimedPerson) {
          return res.status(400).send({
            error:
              'A user with this LinkedIn profile already exists. Try a different one.',
          });
        }
        await onLinkUserToPerson(user.id, personByLinkedin.id);
      } else {
        const insertedPerson = await onInsertProfile(
          user.display_name || '',
          user.email,
          linkedin,
        );
        await onLinkUserToPerson(user.id, insertedPerson?.id || 0);
      }
    }

    const onboardingInformationObj: any = {
      selectedResourceType,
      locationTags,
      industryTags,
      questions,
    };

    if (selectedPerson?.id) {
      onboardingInformationObj.selectedPerson = selectedPerson;
    } else if (linkedin) {
      onboardingInformationObj.claimLinkedin = linkedin;
    }

    const response = await mutate<UpdateUserOnboardingInformationMutation>({
      mutation: UpdateUserOnboardingInformationDocument,
      variables: {
        id: user.id,
        onboarding_information: onboardingInformationObj,
      },
    });

    /** Update user token */
    const userData = await UserService.findOneUserById(user.id);
    const newUserToken = UserService.createToken(userData, false);
    const token = await CookieService.createUserToken(newUserToken);
    CookieService.setTokenCookie(res, token);

    const messagePayload = {
      attachments: [
        {
          color: '#2EB886',
          title: 'You have a new submission',
          fields: [
            {
              title: 'Username',
              value: user.display_name,
            },
            {
              title: 'Email',
              value: user.email,
            },
            {
              title: 'Claim Profile',
              value: selectedPerson
                ? `Person: #${selectedPerson.id} | ${selectedPerson.name}`
                : `Linkedin URL: ${linkedin}`,
            },
            ...questions.map((item: QUESTION) => ({
              title: item.name,
              value: item.answer,
            })),
          ],
        },
      ],
    };

    await SlackServices.sendMessage(
      process.env.EDGEIN_ONBOARDING_WEBHOOK_URL || '',
      messagePayload,
    );

    return res.status(200).send(response);
  } catch (error: any) {
    return res
      .status(500)
      .send({ error: 'Something went wrong. Please try again later.' });
  }
};

const onFindPeopleByLinkedin = async (linkedin: string) => {
  const {
    data: { people },
  } = await query<FindPeopleByLinkedinUrlQuery>({
    query: FindPeopleByLinkedinUrlDocument,
    variables: {
      linkedin,
    },
  });

  return people[0];
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

const onFindUserPublicByPersonId = async (personId: number) => {
  const {
    data: { users_public },
  } = await query<GetUserPublicByPersonIdQuery>({
    query: GetUserPublicByPersonIdDocument,
    variables: {
      person_id: personId,
    },
  });

  return users_public[0];
};

export default handler;
