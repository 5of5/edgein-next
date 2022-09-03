import { NextApiResponse, NextApiRequest } from "next";
import { mutate } from '@/graphql/hasuraAdmin'
import CookieService from '../../utils/cookie'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const newName = req.body.name;
  const listId = req.body.id;
  const token = CookieService.getAuthToken(req.cookies)
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end()

  const listname = `sentiment-${user.id}-${newName}`
  
  try {
    // update the last_sync date to current date
    const result = await mutateForlastSync(listId, listname);
    res.status(200).json({ result });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const mutateForlastSync = async (listId: string, newname: string) => {
  // prepare gql query
  const updateListName = `
  mutation update_lists($listId: Int!, $newname: String) {
    update_lists(
      where: {id: {_eq: $listId}},
      _set: { name: $newname }
    ) {
      affected_rows
      returning {
        id
        name
      }
    }
  }
`
try {
  const mutateResult = await mutate({
    mutation: updateListName,
    variables:{ listId, newname }
  });
  return mutateResult.data.update_lists.returning[0]
  } catch (e) {
    throw e
  }
}

export default handler;
