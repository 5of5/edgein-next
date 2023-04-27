import { NextApiResponse, NextApiRequest } from "next";
import { query } from '@/graphql/hasuraAdmin'
import CookieService from '../../utils/cookie'
import { deleteFollowIfExists, updateResourceSentimentCount } from '@/utils/lists'
import {
  GetFollowByIdDocument,
  GetFollowByIdQuery,
  GetListByIdDocument,
  GetListByIdQuery,
} from "@/graphql/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const followIds = req.body.followIds as [string];
  const token = CookieService.getAuthToken(req.cookies)
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end()

  try {
    // loop over list and delete the data
    for (const followId of followIds) {
      const followResult = await queryForFollows(followId);
      if (!followResult) {
        return res.status(400).json({ message: 'Invalid Follow' });
      }

      const list = await queryForLists(followResult?.list_id || 0);
      if (!list) return res.status(400).json({ message: 'Invalid List' });

      const sentimentType = list.name.split('-').pop();
      await deleteFollowIfExists(list.id, followResult.resource_id, followResult.resource_type, user, token) // delete follows
      await updateResourceSentimentCount(
        followResult.resource_type as "companies" | "vc_firms",
        followResult.resource_id,
        token,
        sentimentType || '',
        false,
        true
      );
    }
    res.status(200).json({ message: 'success' });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const queryForLists = async (id: number) => {
  try {
    const data = await query<GetListByIdQuery>({
      query: GetListByIdDocument,
      variables: { id }
    })
    return data.data.lists[0]
  } catch (ex) {
    throw ex;
  }
}

const queryForFollows = async (id: string) => {
  try {
    const data = await query<GetFollowByIdQuery>({
      query: GetFollowByIdDocument,
      variables: { id }
    })
    return data.data.follows[0]
  } catch (ex) {
    throw ex;
  }
}

export default handler;
