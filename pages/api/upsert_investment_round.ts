import { mutate } from '@/graphql/hasuraAdmin'
import type { NextApiRequest, NextApiResponse } from 'next'
import CookieService from '../../utils/cookie'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  const token = CookieService.getAuthToken(req.cookies)
  const user = await CookieService.getUser(token)
  if (!user) return res.status(403).end()
  const investmentRoundPayload = req.body.investmentRound
  try {
    const investmentRound = await upsertInvestmentRound(investmentRoundPayload, token)
    res.send({ investmentRound })
  } catch (e: any) {
    res.status(400).send({message: "Bad request"})
  }

}

const upsertInvestmentRound = async (payload: any, token: string) => {

  const investments = payload.investments
  delete payload.investments

  const mutation = `
    mutation UpsertInvestmentRound($data: investment_rounds_insert_input!) {
      insert_investment_rounds_one(object: $data, on_conflict: {constraint: investment_rounds_pkey, update_columns: [round_date, round, amount, valuation, currency]}) {
        id
        round_date
        round
        amount
        valuation
        currency
      }
    }
  `

  const data = await mutate({
    mutation,
    variables: {
      data: payload
    }
  })

  const investmentsData = investments.map((investment: any) => ({ ...investment, round_id: data.data.insert_investment_rounds_one.id }))

  const resultInvestments = await upsertInvestments(investmentsData, token)

  return { ...data.data.insert_investment_rounds_one, investments: resultInvestments }
}

const upsertInvestments = async (payload: any, token: string) => {
  const mutation = `
    mutation UpsertInvestments($data: [investments_insert_input!]!) {
      insert_investments(objects: $data, on_conflict: {constraint: investments_pkey, update_columns: [amount]}) {
        returning {
          id
          round_id
          person_id
          vc_firm_id
          amount
        }
      }
    }
  `

  const result = await mutate({
    mutation,
    variables: {
      data: payload
    }
  })

  return result.data.insert_investments.returning
}

export default handler