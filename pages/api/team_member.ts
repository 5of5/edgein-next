import { mutate } from '@/graphql/hasuraAdmin'
import type { NextApiRequest, NextApiResponse } from 'next'
import CookieService from '../../utils/cookie'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  const token = CookieService.getAuthToken(req.cookies)
  const user = await CookieService.getUser(token)
  if (!user) return res.status(403).end()

  const resp = await upserTeamMember(req.body.teammember, req.body.personId)

  return res.json(resp)

}

const upserTeamMember = async (variables: any, personId: number) => {

  const mutation = `
    mutation upsert_team_member($personId: Int, $companyId: Int, $positionType: String = null, $position: String = null, $founder: Boolean = false, $startDate: date = null, $endDate: date = null) {
      insert_team_members_one(object: {person_id: $personId, company_id: $companyId, function: $positionType, title: $position, founder: $founder, start_date: $startDate, end_date: $endDate}, on_conflict: {constraint: team_members_company_id_person_id_key, update_columns: [function, title, founder, start_date, end_date]}) {
        id
        function
        person_id
        company_id
        title
        start_date
        end_date
        seniority
      }
    }
  `
  const response = await mutate({
    mutation,
    variables: { ...variables, personId }
  })

  return response
}

export default handler