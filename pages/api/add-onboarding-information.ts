import type { NextApiRequest, NextApiResponse } from "next";
import { mutate } from "@/graphql/hasuraAdmin";
import {
  UpdateUserOnboardingInformationDocument,
  UpdateUserOnboardingInformationMutation,
} from "@/graphql/types";
import CookieService from "../../utils/cookie";
import SlackServices from "@/utils/slack";

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

  try {
    const response = await mutate<UpdateUserOnboardingInformationMutation>({
      mutation: UpdateUserOnboardingInformationDocument,
      variables: {
        id: user.id,
        onboarding_information: {
          selectedResourceType,
          locationTags,
          industryTags,
          questions,
        },
      },
    });

    if (questions.some((item: QUESTION) => item.answer.trim())) {
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
            ],
          },
        ],
      };

      await SlackServices.sendMessage(
        process.env.EDGEIN_ONBOARDING_WEBHOOK_URL || '',
        messagePayload
      );
    }
    return res.status(200).send(response);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export default handler;
