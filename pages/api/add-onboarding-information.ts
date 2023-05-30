import type { NextApiRequest, NextApiResponse } from "next";
import { mutate, query } from "@/graphql/hasuraAdmin";
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
} from "@/graphql/types";
import CookieService from "../../utils/cookie";
import SlackServices from "@/utils/slack";
import UserService from "@/utils/users";

type QUESTION = {
  name: string;
  answer: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // params
  const selectedResourceType = req.body.selectedResourceType;
  const locationTags = req.body.locationTags;
  const industryTags = req.body.industryTags;
  const questions = req.body.questions;
  const selectedPerson: FindPeopleByNameAndEmailQuery["people"][0] =
    req.body.selectedPerson;
  const linkedin: string = req.body.linkedin;

  try {
    // Link user to person id
    if (selectedPerson?.id) {
      await onLinkUserToPerson(user.id, selectedPerson.id);
    } else if (linkedin) {
      const personByLinkedin = await onFindPeopleByLinkedin(linkedin);
      if (personByLinkedin?.id) {
        await onLinkUserToPerson(user.id, personByLinkedin.id);
      } else {
        const insertedPerson = await onInsertProfile(
          user.display_name || "",
          user.email,
          linkedin
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
          color: "#2EB886",
          title: "You have a new submission",
          fields: [
            {
              title: "Username",
              value: user.display_name,
            },
            {
              title: "Email",
              value: user.email,
            },
            ...questions.map((item: QUESTION) => ({
              title: item.name,
              value: item.answer,
            })),
            {
              title: "Claim Profile",
              value: selectedPerson
                ? `Person: #${selectedPerson.id} | ${selectedPerson.name}`
                : `Linkedin URL: ${linkedin}`,
            },
          ],
        },
      ],
    };

    await SlackServices.sendMessage(
      process.env.EDGEIN_ONBOARDING_WEBHOOK_URL || "",
      messagePayload
    );

    return res.status(200).send(response);
  } catch (error: any) {
    return res.status(500).send(error.message);
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
  linkedin: string
) => {
  const {
    data: { insert_people_one },
  } = await mutate<InsertOnboardingClaimProfileMutation>({
    mutation: InsertOnboardingClaimProfileDocument,
    variables: {
      object: {
        name,
        slug: `${name.trim().replace(/ /g, "-").toLowerCase()}-${Math.floor(
          Date.now() / 1000
        )}`,
        email,
        linkedin,
        status: "draft",
      },
    },
  });

  return insert_people_one;
};

export default handler;
