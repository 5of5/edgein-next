import * as dotenv from 'dotenv';
import random from 'lodash/random';
dotenv.config({ path: './.env' });
import { getClient } from './postgres-helpers';

(async () => {
  const client = await getClient();

  const queryResults = await client.query(
    'SELECT id, name FROM events WHERE slug IS NULL',
  );

  for (let i = 0; i < queryResults.rows.length; i += 1) {
    const record = queryResults.rows[i];
    console.log(`Update slug for event id ${record.id} name ${record.name}`);

    let generatedSlug = record.name.trim().replace(/ /g, '-').toLowerCase();

    const findDuplicatedItem = await client.query(
      `SELECT id FROM events WHERE slug = '${generatedSlug}'`,
    );
    let isDuplicatedSlug = findDuplicatedItem.rows.length > 0;

    while (isDuplicatedSlug) {
      generatedSlug = generatedSlug + '-' + random(10);
      const findSlug = await client.query(
        `SELECT id FROM events WHERE slug = '${generatedSlug}'`,
      );
      isDuplicatedSlug = findSlug.rows.length > 0;
    }

    await client.query(
      `UPDATE events SET slug = '${generatedSlug}' WHERE id=${record.id};`,
    );
  }

  await client.query('ALTER TABLE events ALTER COLUMN slug SET NOT NULL;');

  await client.end();
})();
