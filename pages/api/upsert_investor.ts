import { mutate } from "@/graphql/hasuraAdmin";
import { NextApiResponse, NextApiRequest } from "next";
import CookieService from '../../utils/cookie'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method !== 'POST') return res.status(405).end()

  const token = CookieService.getAuthToken(req.cookies)
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end()

  const data = req.body.investor
  const vcFirmId = req.body.vcFirmId

  if (!vcFirmId) return res.status(400).send({ message: 'Bad request, vcFirmId required!' })

  try {
    const result = await upsertInvestor(data, vcFirmId, token)
    res.send({ result })
  } catch (e: any) {
    return res.status(500).send({ message: 'some error occurred while saving organization' })
  }

}

const upsertInvestor = async (payload: any, vcFirmId: number, token: string) => {
  const mutation = `
    mutation UpsertInvestors($data: investors_insert_input!) {
      insert_investors_one(object: $data, on_conflict: {constraint: investors_vc_firm_id_person_id_key, update_columns: [start_date, end_date, seniority, function, title]}) {
        id
        person_id
        vc_firm_id
        title
        seniority
        start_date
        end_date
        created_at
      }
    }
  `

  return await mutate({
    mutation,
    variables: {
      vcFirmId,
      data: payload
    }
  }, token)
}

export default handler
