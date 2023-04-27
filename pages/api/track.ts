import { NextApiResponse, NextApiRequest } from "next";
import { mutate } from "@/graphql/hasuraAdmin";
import CookieService from "../../utils/cookie";
import { InsertActionDocument, InsertActionMutation } from "@/graphql/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
  }

  // params:
  const resourceId: string = req.body.resourceId;
  const resourceType: string = req.body.resourceType;
  const pathname: string = req.body.pathname;
  const properties: any = req.body.properties || {};

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // create action
  mutate<InsertActionMutation>({
    mutation: InsertActionDocument,
    variables: {
      object: {
        action: "View",
        page: pathname,
        properties,
        resource_id: resourceId,
        resource: resourceType,
        user: user.id,
      },
    },
  });

  res.send({ success: true });
};

export default handler;
