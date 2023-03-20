import { getClient } from "@/scripts/postgres_helpers";
import { NextApiResponse, NextApiRequest } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const client = await getClient()
  await client.query(`UPDATE vc_firms vc SET latest_investment = (SELECT round_date
    FROM investments
    INNER JOIN investment_rounds
      ON investments.round_id = investment_rounds.id
    WHERE
      investments.vc_firm_id = vc.id
      ORDER BY round_date DESC
      LIMIT 1)`, []);

  await client.query(`UPDATE vc_firms vc SET num_of_investments = (SELECT count(*)
    FROM investments
    WHERE investments.vc_firm_id = vc.id)`, []);

  await client.query(
    `UPDATE vc_firms vc SET num_of_exits = (
    SELECT COUNT(company_id) FROM (
      SELECT DISTINCT t1.company_id, t2.vc_firm_id 
      FROM investment_rounds AS t1 INNER JOIN investments AS t2
      ON t1.id = t2.round_id
      WHERE t1.company_id IS NOT NULL AND t2.vc_firm_id IS NOT NULL
        AND t1.round IN ('Acquisition', 'ICO')
    ) AS t3 
    WHERE vc_firm_id = vc.id
    GROUP BY vc_firm_id)`, []);

  await client.query(`UPDATE vc_firms vc SET investment_amount_total = (SELECT SUM(investment_rounds.amount)
    FROM investments
    INNER JOIN investment_rounds
      ON investments.round_id = investment_rounds.id
    WHERE
      investments.vc_firm_id = vc.id)`, []);

  await client.query(`UPDATE vc_firms vc SET team_size = (SELECT count(*)
    FROM investors
    WHERE
    investors.vc_firm_id = vc.id)`, []);

  // Reset invested companies of porfolio lists
  await client.query(`DELETE FROM follows WHERE list_id IN 
    (SELECT id FROM lists WHERE "type" = 'portfolio')
    AND resource_type = 'companies'`, []);

  // Add invested companies of vc_firms into follows table
  await client.query(`INSERT INTO follows (resource_type, list_id, resource_id, created_by_user_id)
    (
    SELECT 'companies', t1.id, t4.company_id, t1.created_by_id FROM (
      SELECT id, created_by_id FROM lists WHERE "type" = 'portfolio') AS t1
      INNER JOIN follows_vc_firms AS t2 ON t1.id = t2.list_id 
      INNER JOIN investments AS t3 ON t2.resource_id = t3.vc_firm_id 
      INNER JOIN investment_rounds AS t4 ON t3.round_id = t4.id
    WHERE t3.vc_firm_id IS NOT NULL AND t4.company_id IS NOT NULL
  ) ON CONFLICT DO NOTHING`, []);

  res.send({ success: true });
}

export default handler;
