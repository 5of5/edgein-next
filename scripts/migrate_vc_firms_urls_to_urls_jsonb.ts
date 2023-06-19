import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { getClient } from './postgres-helpers';

(async () => {
  const client = await getClient();

  const queryResults = await client.query(
    'SELECT id, name, website, linkedin, twitter FROM vc_firms',
  );

  for (let i = 0; i < queryResults.rows.length; i += 1) {
    const record = queryResults.rows[i];

    console.log(
      `Update urls column for data row id ${record.id} name ${record.name}`,
    );

    const urls = {
      website: record.website,
      linkedin: record.linkedin,
      twitter: record.twitter,
    };

    await client.query('UPDATE vc_firms SET urls = $1 WHERE id = $2', [
      urls,
      record.id,
    ]);
  }

  await client.end();
})();
