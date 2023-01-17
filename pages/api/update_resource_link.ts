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
  const oldValue: any = req.body.oldValue;
  const newValue: any = req.body.newValue;

  try {
    const {
      data: { update_resource_links },
    } = await mutate({
      mutation: `
      mutation UpdateResourceLink($where: resource_links_bool_exp!, $changes: resource_links_set_input!) {
        update_resource_links(
          where: $where,
          _set: $changes
        ) {
          affected_rows 
          returning {
            id
            link_type
            from_company_id
            from_vc_firm_id
            to_company_id
            to_vc_firm_id
          }
        }
      }
    `,
      variables: {
        where: {
          from_company_id: { _eq: oldValue.fromCompanyId },
          from_vc_firm_id: { _eq: oldValue.fromVcFirmId },
          to_company_id: { _eq: oldValue.toCompanyId },
          to_vc_firm_id: { _eq: oldValue.toVcFirmId },
        },
        changes: {
          from_company_id: newValue.fromCompanyId,
          from_vc_firm_id: newValue.fromVcFirmId,
          to_company_id: newValue.toCompanyId,
          to_vc_firm_id: newValue.toVcFirmId,
        },
      },
    });

    res.send(update_resource_links);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export default handler;
