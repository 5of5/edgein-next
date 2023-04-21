import { mutate } from '@/graphql/hasuraAdmin'
import { UpsertTeamMemberDocument, UpsertTeamMemberMutation } from '@/graphql/types'
import type { NextApiRequest, NextApiResponse } from 'next'
import CookieService from '../../utils/cookie'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  const token = CookieService.getAuthToken(req.cookies)
  const user = await CookieService.getUser(token)
  if (!user) return res.status(403).end()

  const resp = await upserTeamMember({ data: req.body.teammember }, token)

  return res.json(resp)

}

const upserTeamMember = async (variables: any, token: string) => {
  const response = await mutate<UpsertTeamMemberMutation>({
    mutation: UpsertTeamMemberDocument,
    variables
  }, token)

  return response
}

export default handler