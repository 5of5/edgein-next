import { mutate } from '@/graphql/hasuraAdmin';
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

    // const result = await updatePerson(req.body.payload, req.body.id, token)

    res.json({ status: 200 })

  } catch (e: any) {
    return res.status(400).send({ status: 400, message: e.message })
  }
}

const updatePerson = async (updateBody: any, id: number, token?: string) => {
  const mutation = `
  mutation update_people($set: people_set_input, $where: people_bool_exp!) {
    update_people(_set: $set, where: $where) {
      returning {
        id
        name
        personal_email
        picture
        slug
        status
        type
        work_email
        linkedin
        github
        city
        country
        facebook_url
        twitter_url
        website_url
        about
        email
        team_members {
          id
          end_date
          start_date
          founder
          function
          company {
            id
            slug
            name
            logo
            overview
          }
        }
        investments {
          investment_round {
            id
            round_date
            round
            amount
            company {
              id
              slug
              name
              logo
            }
          }
        }
      }
    }
  }
`

  const result = await mutate({
    mutation,
    variables: {
      where: { id: { _eq: id } },
      set: updateBody,
    }
  }, token)

  return result.data.update_people.returning[0]
}

export default handler