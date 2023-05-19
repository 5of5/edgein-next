import { mutate } from '@/graphql/hasuraAdmin';
import { UpdatePeopleByPkDocument, UpdatePeopleByPkMutation } from '@/graphql/types';
import type { NextApiRequest, NextApiResponse } from 'next'
import CookieService from '../../utils/cookie'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method !== "POST") res.status(405).json({ message: "Method not allowed" })

  let user;
  let token;
  try {
    token = CookieService.getAuthToken(req.cookies)
    user = await CookieService.getUser(token)

    // now we have access to the data inside of user
    // and we could make database calls or just send back what we have
    // in the token.
    if (!user) {
      res.status(401).end()
    }

  } catch (error) {
    res.status(401).end()
  }

  try {

    const result = await updatePerson(req.body.payload, req.body.id, token)

    res.json({ status: 200, result })

  } catch (e: any) {
    return res.status(400).send({ status: 400, message: e.message })
  }
}

const updatePerson = async (updateBody: any, id: number, token?: string) => {
  const result = await mutate<UpdatePeopleByPkMutation>({
    mutation: UpdatePeopleByPkDocument,
    variables: {
      id,
      set: updateBody,
    }
  }, token)

  return result.data.update_people_by_pk;
}

export default handler