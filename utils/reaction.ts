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