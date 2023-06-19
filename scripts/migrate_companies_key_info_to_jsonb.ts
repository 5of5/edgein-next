import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { getClient } from './postgres-helpers';

(async () => {
  const client = await getClient();

  const queryResults = await client.query(
    'SELECT id, name, layer, layer_detail, ico_start, ico_end, investor_amount, total_valuation, market_verified FROM companies',
  );

  for (let i = 0; i < queryResults.rows.length; i += 1) {
    const record = queryResults.rows[i];

    console.log(
      `Update key_info column for data row id ${record.id} name ${record.name}`,
    );

    const urls = {
      layer: record.layer,
      layer_detail: record.layer_detail,
      ico_start: record.ico_start,
      ico_end: record.ico_end,
      investor_amount: record.investor_amount,
      total_valuation: record.total_valuation,
      market_verified: record.market_verified,
    };

    await client.query('UPDATE companies SET key_info = $1 WHERE id = $2', [
      urls,
      record.id,
    ]);
  }

  await client.end();
})();
