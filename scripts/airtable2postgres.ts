import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { companiesMapping, investmentRoundsMapping, investmentsMapping, peopleMapping, vcFirmMapping, teamMembersMapping, Mapping, coinsMapping } from './mapping'
import { getClient, upsertBatch } from './postgres_helpers'
import { getAirtableTable } from './airtable_helpers'
import { Client } from 'pg';
import { keyBy, compact, Dictionary } from 'lodash'

const runTable = async (client: Client, mapping: Mapping) => {
  console.log(`Moving airtable ${mapping.airtable} to postgres ${mapping.table}`)
  const airtableRecords = await getAirtableTable(mapping.airtable)
  const references: Record<string, Dictionary<any>> = {}
  const referenceTables: { table: string, key: string}[] = compact(mapping.mappings.map(map => map.reference ? ({ table: map.reference, key: map.referenceColumn || 'external_id'}) : undefined))
  if (referenceTables && referenceTables.length > 0) {
    for (let index = 0; index < referenceTables.length; index++) {
      const reference = referenceTables[index]
      console.log(`Fetching all ${reference.table}`)
      const query = await client.query(`SELECT * FROM ${reference.table}`)
      references[reference.table] = keyBy(query.rows, reference.key)
    }  
  }
  const recordsToInsert = airtableRecords.map(c => {
    const ret: Record<string, any> = {}
    mapping.mappings.forEach(map => {
      let val = c[map.from]
      if (map.unwrap) {
        val = val?.[0]
      }
      if (map.reference) {
        const obj = references[map.reference][val]
        val = obj?.id
      }
      if (map.whitespace === 'strip' && typeof val === 'string') {
        val = val.trim()
      }
      if (map.type === 'json') {
        val = JSON.stringify(val)
      }
      ret[map.to] = val
    })
    return ret
  })
  await upsertBatch(client, mapping.table, mapping.key, recordsToInsert)
}

const run = (async () => {
  const mappings = [
    coinsMapping,
    companiesMapping, 
    peopleMapping, 
    vcFirmMapping, 
    investmentRoundsMapping, 
    investmentsMapping,
    teamMembersMapping,
  ]
  const client = await getClient()
  for (let index = 0; index < mappings.length; index++) {
    const mapping = mappings[index]
    await runTable(client, mapping)
  }
  await client.end()  
})
run()
