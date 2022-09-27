import { NextApiResponse, NextApiRequest } from "next";
import CookieService from '../../utils/cookie'
import { has, map } from "lodash";
import { updateResourceSentimentCount, upsertFollow, upsertList } from "@/utils/lists";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method !== 'POST') return res.status(405).end()

  const token = CookieService.getAuthToken(req.cookies)
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end()

  const sentimentType: string = req.body.sentiment

  const resourceType = has(req.body, 'companies') ? 'companies' : has(req.body, 'vcfirms') ? 'vc_firms' : ''

  if (resourceType === '') {
    return res.status(400).end()
  }

  // console.log('starting reaction for user', {token,user,companyId,sentimentType,pathname})
  // check if user has a list for sentiment
  const listname = `sentiment-${user.id}-${sentimentType}`
  // upsertList
  const list = await upsertList(listname, user, token)

  const reactions = await Promise.all(map(req.body.companies, async (resource) => {

    const resourceId = resourceType === 'companies' ? resource.company : resource.vcfirm

    // insert follow only if the follows don't exists
    const follow = await upsertFollow(list, resourceId, resourceType, user, token)

    const { sentiment } = await updateResourceSentimentCount(resourceType, resourceId, token, sentimentType, Boolean(follow), false)

    return { company: resource.company, sentiment: { ...sentiment } }
  }))

  res.send({ reactions })
}

export default handler