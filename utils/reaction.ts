import { Follows_Companies, Follows_Vc_Firms, Lists } from "@/graphql/types"

type ReactionType = {
  company?: number
  vcfirm?: number
  sentiment: string
  pathname: string
}

export const reactOnSentiment = async ({
  company,
  vcfirm,
  sentiment,
  pathname
}: ReactionType) => {
  const resp = await fetch("/api/reaction/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      company,
      vcfirm,
      sentiment,
      pathname
    }),
  });
  return resp.json()
}

export const getNewFollows = (sentiment: string, type: string = 'company') => {
  const follows = type === 'company' ? {} as Follows_Companies : {} as Follows_Vc_Firms;
  follows.list = {} as Lists;
  follows.list.name = `sentiment-${sentiment}`;

  return follows;
}