import { getClient } from '@/scripts/postgres-helpers';
import { NextApiResponse, NextApiRequest } from 'next';

const DATA_RAW = 'data_raw';
const DATA_RUNS = 'data_runs';
const now = Date.now();
const REDUCED_DATA_RAW = `reduced_data_raw_${now}`;
const TOTAL_WEIGHT_DATA = `total_weight_data_${now}`;
const DATA_SET = `data_set_${now}`;
const TOTAL_WEIGTH_TABLE = `total_weight_${now}`;
const WINNERS_TABLE = `winners_${now}`;
const CLASSIFIED_DATA = `classified_data_${now}`;

const CREATE_TEMP_REDUCED_DATA_RUN = `
CREATE TEMP TABLE ${REDUCED_DATA_RAW} AS (
  -- only count latest record of same partner-user
  SELECT partner, user_id, resource, resource_id, field, value, created_at, id, accuracy_weight FROM
  (SELECT *,
    ROW_NUMBER() OVER (
      PARTITION BY partner, user_id, resource, resource_id, field
      ORDER BY created_at DESC) AS row_number
  FROM ${DATA_RAW} WHERE is_active = true) AS t1
  WHERE t1.row_number = 1
)
`;

const CREATE_TEMP_TOTAL_WEIGHT_DATA = `
-- build total weight data from data raw
CREATE TEMP TABLE ${TOTAL_WEIGHT_DATA} AS (
  SELECT resource, resource_id, field, value, SUM(accuracy_weight) AS total_weight
  FROM ${REDUCED_DATA_RAW}
  GROUP BY resource, resource_id, field, value
)
`;

const CREATE_TEMP_DATA_SET = `
CREATE TEMP TABLE ${DATA_SET} AS (
  SELECT
    resource,
    resource_id,
    field,
    total_weight,
    ROW_NUMBER() OVER (
      PARTITION BY resource,
      resource_id,
      field
    ORDER BY
      total_weight DESC
    ) AS ROW_NUMBER
  FROM ${TOTAL_WEIGHT_DATA}
)
`;

const CREATE_TEMP_TOTAL_WEIGHT_TABLE = `
CREATE TEMP TABLE ${TOTAL_WEIGTH_TABLE} AS 
(
  SELECT * FROM ${TOTAL_WEIGHT_DATA} LEFT JOIN (
    -- build max, second max and ambiguity score from total_weight_data
    -- then join it with total_weight_data
    SELECT
      t1.resource,
      t1.resource_id,
      t1.field,
      t1.total_weight AS max_weight,
      t2.total_weight AS second_max,
      (t1.total_weight - t2.total_weight)/t1.total_weight::decimal as ambiguity_score
    FROM
      (
        -- build largest weight table as t1
        SELECT
          resource,
          resource_id,
          field,
          total_weight
        FROM
          ${DATA_SET}
        WHERE
          ROW_NUMBER = 1
      ) AS t1
    LEFT JOIN (
        -- build second largest weight table as t2
        SELECT
          resource,
          resource_id,
          field,
          total_weight
        FROM
        ${DATA_SET}
        WHERE
          ROW_NUMBER = 2
      ) AS t2
    USING (resource, resource_id, field)
  ) AS T USING (resource, resource_id, field)
)
`;

const CREATE_TEMP_WINNERS_TABLE = `
CREATE TEMP TABLE ${WINNERS_TABLE} AS (
  SELECT partner, user_id, resource, resource_id, field, value, created_at, id, accuracy_weight, max_weight FROM(
    SELECT
    -- If there're many records (can be a winner), choose the earliest record as a winner
      *, ROW_NUMBER() OVER (PARTITION BY resource, resource_id, field ORDER BY created_at) AS row_number 
    FROM ${REDUCED_DATA_RAW} AS t1
       INNER JOIN (
        -- Get winner candidates that has total_weight = max_weight
        SELECT resource, resource_id, field, value, max_weight FROM ${TOTAL_WEIGTH_TABLE}  WHERE total_weight = max_weight
       ) AS t2
       USING (resource, resource_id, field, value)) AS t3
    WHERE row_number = 1
)
`;

const CREATE_TEMP_CLASSIFIED_DATA = `
CREATE TEMP TABLE ${CLASSIFIED_DATA} AS (
  SELECT
    t1.id,
    t1.resource,
    t1.resource_id,
    t1.field,
    t1.value,
    CASE
      WHEN (t2.id is null) THEN 'incorrect'
      WHEN (t2.id = t1.id) THEN 'new'
      WHEN (t2.id != t1.id) THEN 'validated'
    END
    AS classification,
    CASE
      WHEN (t2.id is null) THEN -1
      WHEN (t2.id = t1.id) THEN 5
      WHEN (t2.id != t1.id) THEN 1
    END
    AS weight,
    CASE
      WHEN (t2.id is not null) THEN t2.max_weight
    END
    AS max_weight,
    '${new Date().toISOString()}'::timestamp AS run_at
  FROM ${REDUCED_DATA_RAW} AS t1 LEFT JOIN ${WINNERS_TABLE} AS t2
  USING (resource, resource_id, field, value)
  )
`;

const INSERT_DATA_RUN = `
INSERT INTO ${DATA_RUNS} (data_raw, classification, run_at, weight, weight_normalized, max_weight, ambiguity_score)
SELECT t1.id, t1.classification, t1.run_at, t1.weight, t1.weight_normalized, t1.max_weight,
  -- only record of 2nd group will have ambiguity_score
  CASE WHEN (t1.classification = 'incorrect') THEN t2.ambiguity_score ELSE NULL END AS ambiguity_score
FROM (
  SELECT *, weight/total_positive_weight::DECIMAL AS weight_normalized
  FROM (
    SELECT *,
	    SUM(CASE WHEN (weight > 0) THEN weight ELSE 0 END) OVER (
	      PARTITION BY resource, resource_id, field) AS total_positive_weight
    FROM ${CLASSIFIED_DATA} 
	) AS t
) AS t1
LEFT JOIN (SELECT resource, resource_id, field, value, ambiguity_score FROM ${TOTAL_WEIGTH_TABLE} WHERE total_weight = second_max) AS t2
USING (resource, resource_id, field, value)
`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const client = await getClient();
  // Reduce data raw
  await client.query(CREATE_TEMP_REDUCED_DATA_RUN);
  //Calculate total weight for each resource_id-resource-field-value combination
  await client.query(CREATE_TEMP_TOTAL_WEIGHT_DATA);
  //Get top 2 total weight of each combination
  await client.query(CREATE_TEMP_DATA_SET);
  /*
  total_weight sample
  resource|resource_id|field  |value            |total_weight|max|second_max|ambiguity_score       |
  --------+-----------+-------+-----------------+------------+---+----------+----------------------+
  company |       1394|twitter|"twitter1"       |           2|  4|         2|0.50000000000000000000|
  company |       1394|website|"website1"       |           1|  2|         1|0.50000000000000000000|
  company |       1394|twitter|"twitter2"       |           1|  4|         2|0.50000000000000000000|
  company |       1394|website|"website2"       |           2|  2|         1|0.50000000000000000000|
  company |       1394|twitter|"twitter3"       |           4|  4|         2|0.50000000000000000000|
  company |       1394|website|"website3"       |           1|  2|         1|0.50000000000000000000|
  */
  //Build total weight table
  await client.query(CREATE_TEMP_TOTAL_WEIGHT_TABLE);
  //Build winner table')
  await client.query(CREATE_TEMP_WINNERS_TABLE);
  //Classify all reduced data_raw records
  await client.query(CREATE_TEMP_CLASSIFIED_DATA);
  //Insert result into data_runs table
  await client.query(INSERT_DATA_RUN);

  await client.end();

  res.send({ success: true });
};

export default handler;
