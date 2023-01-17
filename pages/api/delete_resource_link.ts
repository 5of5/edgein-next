import type { NextApiRequest, NextApiResponse } from "next";
import { mutate } from "@/graphql/hasuraAdmin";
import CookieService from "../../utils/cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // params:
  const from_company_id: number = req.body.fromCompanyId;
  const from_vc_firm_id: number = req.body.fromVcFirmId;
  const to_company_id: number = req.body.toCompanyId;
  const to_vc_firm_id: number = req.body.toVcFirmId;

  try {
    await mutate({
      mutation: `
      mutation DeleteResourceLink($where: resource_links_bool_exp!) {
        delete_resource_links(where: $where) {
          returning {
            id
          }
        }
      }
      `,
      variables: {
        where: {
          from_company_id: { _eq: from_company_id },
          from_vc_firm_id: { _eq: from_vc_firm_id },
          to_company_id: { _eq: to_company_id },
          to_vc_firm_id: { _eq: to_vc_firm_id },
        },
      },
    });

    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export default handler;
