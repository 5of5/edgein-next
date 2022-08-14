import { mutate, query } from '@/graphql/hasuraAdmin'
import type { NextApiRequest, NextApiResponse } from 'next'
import CookieService from '../../utils/cookie'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  // params:
  const companyId: string = req.body.company
  const sentimentType: string = req.body.sentiment
  const pathname: string = req.body.pathname

  const token = CookieService.getAuthToken(req.cookies)
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end()

  // console.log('starting reaction for user', {token,user,companyId,sentimentType,pathname})
  // check if user has a list for sentiment
  const listname = `sentiment-${user.id}-${sentimentType}`
  // check list exists
  const { data : { insert_lists_one: list } } = await mutate({
    mutation: `
    mutation upsert_list($userId: Int, $name: String) {
      insert_lists_one(object: {created_by_id: $userId, name: $name}, on_conflict: {constraint: lists_created_by_id_name_key, update_columns: created_by_id}) {
          id
      }
    }
    `,
    variables: {
      name: listname,
      userId: user.id
    }
  }, token)
  // check list membership exists
  await mutate({
    mutation: `
    mutation upsert_follows($userId: Int!, $listId: Int!) {
      insert_list_members_one(object: {user_id: $userId, list_id: $listId}, on_conflict: {update_columns: user_id, constraint: list_members_list_id_user_id_key }) {
        id
      }
    }
    `,
    variables: {
      listId: list.id,
      userId: user.id
    }
  }, token)
  // insert follow
  const { data: { insert_follows_one }} = await mutate({
    mutation: `
    mutation upsert_follows($listId: Int, $resourceId: Int, $resourceType: String, $userId: Int) {
      insert_follows_one(object: {list_id: $listId, resource_id: $resourceId, resource_type: $resourceType, created_by_user_id: $userId}, on_conflict: {constraint: follows_resource_type_resource_id_list_id_key}) {
        id
      }
    }
    `,
    variables: {
      listId: list.id,
      resourceId: companyId,
      resourceType: "companies",
      userId: user.id
    }
  }, token)

  const { data } = await query({
    query: `
    query query_sentiment($companyId: Int!) {
      companies_by_pk(id: $companyId) {
        sentiment
        slug
      }
    }`,
    variables: {"companyId": companyId}
  }, token)

  const company = data.companies_by_pk || {}
  const sentiment = company?.sentiment || {}

  // Was added to list for first time, so increament company count
  if (insert_follows_one) {
    // update sentiment on company
    // Feel this is bad and a race condition
    // TODO refactor to use direct sql so increamenting can be atomic
    if (!(sentimentType in sentiment)) {
      sentiment[sentimentType] = 0
    } 
    sentiment[sentimentType] = sentiment[sentimentType] + 1

    await mutate({
      mutation: `
      mutation update_sentiment($companyId: Int!, $sentiment: jsonb!) {
        update_companies_by_pk(pk_columns: {id: $companyId}, _set: {sentiment: $sentiment}) {
          sentiment
        }
      }    
      `,
      variables: {"companyId": companyId, sentiment}
    }, token)

    await res.unstable_revalidate(`/companies/${company.slug}/?revalidation_auth=${process.env.REVALIDATION_AUTH_TOKEN}`)
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
          resourceId: companyId,
          resourceType: "companies",
          sentiment: sentimentType,
        },
        user: user.email,
      },
    },
  });

  res.send({...sentiment})
}

export default handler