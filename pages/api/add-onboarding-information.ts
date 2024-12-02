import type { NextApiRequest, NextApiResponse } from 'next';
import { mutate, query } from '@/graphql/hasuraAdmin';
import {
  FindPeopleByLinkedinUrlDocument,
  FindPeopleByLinkedinUrlQuery,
  UpdateUserOnboardingInformationDocument,
  UpdateUserOnboardingInformationMutation,
} from '@/graphql/types';
import CookieService from '../../utils/cookie';
import SlackServices from '@/utils/slack';
import UserService from '@/utils/users';
import { zodValidate } from '@/utils/validation';
import { addOnboardingSchema } from '@/utils/schema';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // params
  const segment = req.body.segment;
  const exploreChoices = req.body.exploreChoices;
  const locationTags = req.body.locationTags;
  const locationDetails = req.body.locationDetails;
  const industryTags = req.body.industryTags;

  const { errors } = zodValidate(req.body, addOnboardingSchema);

  if (errors) {
    return res
      .status(400)
      .send({ error: errors['name']?.[0] || 'Invalid parameters' });
  }

  try {
    const onboardingInformationObj: any = {
      segment,
      exploreChoices,
      locationTags,
      locationDetails,
      industryTags,
    };

    const response = await mutate<UpdateUserOnboardingInformationMutation>({
      mutation: UpdateUserOnboardingInformationDocument,
      variables: {
        id: user.id,
        onboarding_information: onboardingInformationObj,
      },
    });

    /** Update user token */
    const newUserToken = await UserService.generateToken({
      userId: user.id,
      isFirstLogin: false,
    });
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
          ],
        },
      ],
    };

    // await SlackServices.sendMessage(
    //   process.env.EDGEIN_ONBOARDING_WEBHOOK_URL || '',
    //   messagePayload,
    // );

    return res.status(200).send(response);
  } catch (error: any) {
    return res.status(500).send({ error: error });
  }
};

export const onFindPeopleByLinkedin = async (linkedin: string) => {
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

export default handler;
