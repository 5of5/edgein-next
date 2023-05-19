import { keyBy } from 'lodash'
import { getClient, upsert } from './postgres-helpers'

const run = (async () => {
  const client = await getClient()
  const investment_rounds = await client.query('SELECT * FROM investment_rounds', [])
  //console.log(investment_rounds.rows)
  const companies = await client.query('SELECT * FROM companies', [])
  const companiesByKey = keyBy(companies.rows, 'external_id')
  // console.log(companiesByKey)
  const newInvestmentRound = investment_rounds.rows.map(ir => {
    ir.company_id = companiesByKey[ir.company_id].id
    return ir;
  })
  for (let index = 0; index < newInvestmentRound.length; index++) {
    const ir = newInvestmentRound[index]
    await upsert(client, 'investment_rounds', 'id', ir)
  }
  // console.log(newInvestmentRound)
  await client.end()  
})
run()
