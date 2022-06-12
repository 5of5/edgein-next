import { Client } from 'pg'

export const getClient = async () =>{
  const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT),
  })
  await client.connect()
  return client
}

export const upsert = async (client: Client, table: string, primaryKey: string, object: Record<string, any>) => {
  const query = `INSERT INTO ${table}
    (
      ${Object.keys(object).map(key => ` "${key}"`)}
    )
    VALUES
    (
      ${Object.values(object).map((_v, i) => ` $${i+1} `)}
    )
    ON CONFLICT ("${primaryKey}") DO UPDATE SET
      ${Object.keys(object).map(key => `"${key}" = "excluded"."${key}"`)}`
  try {
    await client.query(query, Object.values(object))
  } catch (e) {
    console.log({ e })
  }
}

export const upsertBatch = async (client: Client, table: string, primaryKey: string, objects: Record<string, any>[]) => {
  console.log('Starting batch')
  for (let index = 0; index < objects.length; index++) {
    const object = objects[index]
    console.log(`Running query ${index+1}\r`)
    await upsert(client, table, primaryKey, object)
  }
}