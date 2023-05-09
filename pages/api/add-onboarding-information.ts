import type { NextApiRequest, NextApiResponse } from "next";
import { mutate } from "@/graphql/hasuraAdmin";
import {
  UpdateUserOnboardingInformationDocument,
  UpdateUserOnboardingInformationMutation,
} from "@/graphql/types";
import CookieService from "../../utils/cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // params
  const question = req.body.question;
  const answer = req.body.answer;

  try {
    const response = await mutate<UpdateUserOnboardingInformationMutation>({
      mutation: UpdateUserOnboardingInformationDocument,
      variables: {
        id: user.id,
        onboarding_information: [{ question, answer }],
      },
    });
    return res.status(200).send(response);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export default handler;
