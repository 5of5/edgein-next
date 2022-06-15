import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { companiesMapping, investmentRoundsMapping, investmentsMapping, peopleMapping, vcFirmMapping, teamMembersMapping, Mapping } from './mapping'
import { getClient, upsertBatch } from './postgres_helpers'
import { getAirtableTable } from './airtable_helpers'
import { Client } from 'pg';
import { keyBy, compact } from 'lodash'

const runTable = async (client: Client, mapping: Mapping) => {
  console.log(`Moving airtable ${mapping.airtable} to postgres ${mapping.table}`)
  const airtableRecords = await getAirtableTable(mapping.airtable)
  const references: Record<string, Record<string, any>[]> = {}
  const referenceTables: string[] = compact(mapping.mappings.map(map => map.reference))
  if (referenceTables && referenceTables.length > 0) {
    for (let index = 0; index < referenceTables.length; index++) {
      const reference = referenceTables[index]
      console.log(`Fetching all ${reference}`)
      const query = await client.query(`SELECT * FROM ${reference}`)
      references[reference] = keyBy(query.rows, 'external_id')
    }  
  }
  const recordsToInsert = airtableRecords.map(c => {
    const ret = {}
    mapping.mappings.forEach(map => {
      if (map.unwrap) {
        ret[map.to] = c[map.from]?.[0]
      } else if (map.reference) {
        const obj = references[map.reference][c[map.from]]
        ret[map.to] = obj?.id
      } else {
        ret[map.to] = c[map.from]
      }
    })
    return ret
  })
  await upsertBatch(client, mapping.table, mapping.key, recordsToInsert)
}


const run = (async () => {
  const mappings = [companiesMapping, peopleMapping, vcFirmMapping, investmentRoundsMapping, investmentsMapping, teamMembersMapping]
  const client = await getClient()
  for (let index = 0; index < mappings.length; index++) {
    const mapping = mappings[index]
    await runTable(client, mapping)
  }
  await client.end()  
})
run()
