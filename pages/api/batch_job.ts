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

  // Creating a special list type that automatically follows the companies in a vc firms portfolio
  // the list represents the group of companies the vc firm has invested in

  // Reset data
  // Delete all list_members of portfolio
  await client.query(`DELETE FROM list_members WHERE list_id IN (
    SELECT id FROM lists WHERE created_by_id = 0)`, []);
  // Delete all invested companies in follow table
  await client.query(`DELETE FROM follows WHERE created_by_user_id = 0`, []);
  // Delete all vc_firm portfolio lists
  await client.query(`DELETE FROM lists WHERE created_by_id = 0`, []);

  // Add vc_firms into lists table with name is <vc_firm_id>-vc_firm_portfolio created by user 0
  await client.query(`INSERT INTO lists (name, created_by_id)
    (
      SELECT id || '-' || name || ' portfolio', 0 FROM vc_firms WHERE num_of_investments > 0
    ) ON CONFLICT DO NOTHING`, []);

  // Add invested companies of vc_firms into follows table
  await client.query(`INSERT INTO follows (resource_type, list_id, resource_id, created_by_user_id)
    (
    SELECT 'companies', t1.id, t3.company_id, 0 FROM (
      SELECT id, split_part(name, '-', 1)::int AS vc_id FROM lists WHERE created_by_id = 0) AS t1
      INNER JOIN investments AS t2 ON t1.vc_id = t2.vc_firm_id 
      INNER JOIN investment_rounds AS t3 ON t2.round_id = t3.id
    WHERE t2.vc_firm_id IS NOT NULL AND t3.company_id IS NOT NULL
    ) ON CONFLICT DO NOTHING`, []);

  // Then add vc_firm portfolio list into list_members
  // where user_id is owner or follow of any list contains this vc_firm
  await client.query(`INSERT INTO list_members (list_id, user_id, member_type)
    (
    SELECT t2.id, t3.user_id, 'follow' FROM (
      SELECT list_id, resource_id FROM follows_vc_firms
      ) AS t1
      INNER JOIN (
        SELECT id, split_part(name, '-', 1)::int AS vc_id FROM lists WHERE created_by_id = 0
      ) AS t2 ON t1.resource_id = t2.vc_id 
      INNER JOIN list_members AS t3 ON t3.list_id = t1.list_id 
    WHERE t2.id IS NOT NULL AND t3.user_id IS NOT NULL
    )
    ON CONFLICT DO NOTHING`, []);

  res.send({ success: true });
}

export default handler;
