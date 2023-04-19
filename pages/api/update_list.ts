import { NextApiResponse, NextApiRequest } from "next";
import { query, mutate } from "@/graphql/hasuraAdmin";
import CookieService from "../../utils/cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const listId = req.body.id;
  const payload = req.body.payload;

  if (payload.name) {
    payload.name = `sentiment-${user.id}-${payload.name}`;
  }

  try {
    const data = await query({
      query: `
      query findListOne($listId: Int!) {
        lists(where: {id: {_eq: $listId}}, limit: 1) {
          id
          name
          created_by_id
        }
      }
      `,
      variables: { listId },
    });

    if (data.data.lists[0]?.created_by_id !== user?.id) {
      return res
        .status(403)
        .json({ message: "You don't have permission to edit this list" });
    }

    const mutateResult = await mutate({
      mutation: `
      mutation update_lists($listId: Int!, $changes: lists_set_input!) {
        update_lists(
          where: {id: {_eq: $listId}},
          _set: $changes
        ) {
          affected_rows
          returning {
            id
            name
          }
        }
      }
    `,
      variables: { listId, changes: payload },
    });
    res.status(200).json(mutateResult.data.update_lists.returning[0]);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default handler;
