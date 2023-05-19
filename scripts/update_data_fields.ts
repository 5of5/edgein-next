import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { getClient } from './postgres-helpers';
import { NODE_NAME, isResourceType } from '../utils/constants';


(async () => {
	const client = await getClient();
	for (let table in NODE_NAME) {
		if (isResourceType(table)) {
			const resource = NODE_NAME[table];
			console.log(`Update data field for resource: ${resource}`)
			await client.query(`
			INSERT INTO data_fields (path, resource, name, weight)
				SELECT CONCAT('${resource}.',column_name) AS path, '${resource}' AS resource, column_name AS name, 1 AS weight 
				FROM information_schema.columns 
				WHERE table_name = '${table}' AND column_name NOT IN ('id', 'external_id', 'created_at', 'updated_at')
			ON CONFLICT ON CONSTRAINT data_fields_pkey DO NOTHING
			`);
		}
	}
	await client.end();
})();
