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

  res.send({ success: true });
}

export default handler;
