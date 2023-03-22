import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { getClient } from "./postgres_helpers";

(async () => {
  const client = await getClient();

  const queryResults = await client.query(
    "SELECT id, action_ids FROM notifications"
  );

  for (let i = 0; i < queryResults.rows.length; i += 1) {
    const record = queryResults.rows[i];
    console.log(`Migrate action_ids for notification #${record.id}`);

    const actionIds = record.action_ids;

    for (let j = 0; j < actionIds.length; j += 1) {
      if (actionIds[j]) {
        await client.query(
          `INSERT INTO notification_actions (notification_id, action_id) VALUES(${record.id}, ${actionIds[j]})`
        );
      }
    }
  }

  await client.end();
})();
