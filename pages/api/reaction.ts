import CookieService from '../../utils/cookie'
import { sentimentLimit } from '@/utils/constants';
import { mutate, query } from '@/graphql/hasuraAdmin'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getDateToday, getDateTomorrow } from '../../utils/numbers'
import { deleteIfExists, updateResourceSentimentCount, upsertFollow, upsertList } from '@/utils/lists'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  // params:
  const companyId: string = req.body.company
  const vcFirmId: string = req.body.vcfirm
  const sentimentType: string = req.body.sentiment
  const pathname: string = req.body.pathname

  const token = CookieService.getAuthToken(req.cookies)
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end()

  // check the count of the current date sentiments
  const sentimentsCount = await getSentimentsCount(user.id);
  if (sentimentsCount.length >= sentimentLimit) return res.status(404).send({ message: 'Sorry, you have reached your reactions limit for today' });

  const resourceType = companyId ? 'companies' : vcFirmId ? 'vc_firms' : ''
  const resourceId = resourceType === 'companies' ? companyId : vcFirmId

  if (resourceType === '') {
    return res.status(400).end()
  }

  // console.log('starting reaction for user', {token,user,companyId,sentimentType,pathname})
  // check if user has a list for sentiment
  const listname = `sentiment-${user.id}-${sentimentType}`
  // upsertList
  const list = await upsertList(listname, user, token)

  // check if user already follows
  const existsFollows = await deleteIfExists(list, resourceId, resourceType, user, token)

  // insert follow only if the follows don't exists
  const follow = !existsFollows && await upsertFollow(list, resourceId, resourceType, user, token)

  const { sentiment, revalidatePath } = await updateResourceSentimentCount(resourceType, resourceId, token, sentimentType, Boolean(follow), Boolean(existsFollows))
  try{
    if (revalidatePath) {
      await res.unstable_revalidate(revalidatePath)
    }
  }catch(err){
    
  }
  

  // create action
  mutate({
    mutation: `
      mutation InsertAction($object: actions_insert_input!) {
        insert_actions_one(
          object: $object
        ) {
          id
        }
      }
    `,
    variables: {
      object: {
        action: "Sentiment",
        page: pathname,
        properties: {
          listId: list.id,
          sentiment: sentimentType,
        },
        resource_id: resourceId,
        resource: resourceType,
        user: user.id,
      },
    },
  });

  res.send({ ...sentiment })
}

const getSentimentsCount = async (userId: number) => {
  // prepare gql query
  const fetchQuery = `
  query MyQuery($hotProperties: jsonb, $likeProperties: jsonb, $crapProperties: jsonb, $todayDate: timestamptz, $nextDate: timestamptz, $user: Int) {
    actions(where: {_or: [
      {properties: {_contains: $hotProperties}}, 
      {properties: {_contains: $likeProperties}},
      {properties: {_contains: $crapProperties}}
    ], 
      created_at: {_gte: $todayDate, _lt: $nextDate}, 
      user: {_eq: $user}}
    ) {
      action
      id
      created_at
    }
  }
  
  `
  try {
    const data = await query({
      query: fetchQuery,
      variables: {
        "hotProperties": {
          "sentiment": "hot"
        },
         "likeProperties": {
          "sentiment": "like"
        },
        "crapProperties": {
          "sentiment": "crap"
        },
        "todayDate": getDateToday(),
        "nextDate": getDateTomorrow(),
        "user": userId
      }
    })
    return data.data.actions
  } catch (ex) {
    throw ex;
  }
}

export default handler