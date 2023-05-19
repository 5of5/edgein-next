import { mutate } from '@/graphql/hasuraAdmin'
import { DeleteInvestmentDocument, DeleteInvestmentMutation } from '@/graphql/types'
import type { NextApiRequest, NextApiResponse } from 'next'
import CookieService from '../../utils/cookie'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  const token = CookieService.getAuthToken(req.cookies)
  const user = await CookieService.getUser(token)
  if (!user) return res.status(403).end()
  const investmentId = req.body.investmentId
  try {
    await deleteInvestment(investmentId, token)
    res.send({})
    res.status(400).send({ message: "Bad request" })
  } catch (e: any) {
    res.status(400).send({message: `Bad request`})
  }

}

const deleteInvestment = async (investmentId: number, token: string) => {
  return await mutate<DeleteInvestmentMutation>({
    mutation: DeleteInvestmentDocument,
    variables: {
      investmentId 
    }
  })
}

export default handler