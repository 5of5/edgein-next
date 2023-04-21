import { NextApiResponse, NextApiRequest } from "next";
import CookieService from "../../utils/cookie";
import { mutate } from "@/graphql/hasuraAdmin";
import { MarkNotificationsAsReadDocument, MarkNotificationsAsReadMutation } from "@/graphql/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const id: number = req.body.id;
  const all: boolean = req.body.all;

  let where = null;

  if (id) {
    where = { id: { _eq: id } };
  }

  if (all) {
    where = { target_user_id: { _eq: user?.id } };
  }

  if (!where) {
    return res.status(400).send({ message: "Bad request" });
  }

  try {
    const response = await mutate<MarkNotificationsAsReadMutation>({
      mutation: MarkNotificationsAsReadDocument,
      variables: { where },
    });

    return res.send(response.data.update_notifications?.returning);
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
};

export default handler;
