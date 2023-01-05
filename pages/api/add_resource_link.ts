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
  const link_type: String = req.body.linkType;
  const from_company_id: number = req.body.fromCompanyId;
  const from_vc_firm_id: number = req.body.fromVcFirmId;
  const to_company_id: number = req.body.toCompanyId;
  const to_vc_firm_id: number = req.body.toVcFirmId;

  try {
    const {
      data: { insert_resource_links_one },
    } = await mutate({
      mutation: `
      mutation InsertResourceLink($object: resource_links_insert_input!) {
        insert_resource_links_one(
          object: $object
        ) {
          id
          link_type
          from_company_id
          from_vc_firm_id
          to_company_id
          to_vc_firm_id
        }
      }
    `,
      variables: {
        object: {
          link_type,
          from_company_id,
          from_vc_firm_id,
          to_company_id,
          to_vc_firm_id,
        },
      },
    });

    res.send(insert_resource_links_one);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export default handler;
