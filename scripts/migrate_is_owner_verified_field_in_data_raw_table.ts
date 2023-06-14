import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { getClient } from './postgres-helpers';

(async () => {
  const client = await getClient();

  const queryResults = await client.query(
    "SELECT data_raw.id, resource, resource_id, users.email FROM data_raw LEFT JOIN users on data_raw.user_id = users.id WHERE resource = 'people' AND user_id IS NOT NULL AND resource_id = users.person_id AND is_owner_verified=false",
  );

  for (let i = 0; i < queryResults.rows.length; i += 1) {
    const record = queryResults.rows[i];
    console.log(
      `Update is_owner_verified to true for data row id ${record.id} resource ${record.resource} resource_id ${record.resource_id} email ${record.email}`,
    );

    await client.query(
      'UPDATE data_raw SET is_owner_verified = true WHERE id=$1',
      [record.id],
    );
  }

  await client.end();
})();
