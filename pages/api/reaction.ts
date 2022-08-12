import { mutate } from '@/graphql/hasuraAdmin'
import { doGraphQlQuery } from '@/utils/hasura'
import type { NextApiRequest, NextApiResponse } from 'next'
import CookieService from '../../utils/cookie'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  // params:
  const companyId: string = req.body.company
  const sentiment: string = req.body.sentiment
  const pathname: string = req.body.pathname

  const token = CookieService.getAuthToken(req.cookies)
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end()

  // update sentiment on company
  // Feel this is bad and a race condition
  const company = await doGraphQlQuery({
    operationName: 'query_sentiment',
    query: `{
      query query_sentiment($companyId: Int) {
        companies_by_pk(id: $companyId) {
          sentiment
        }
      }
    }`,
    variables: {"companyId": companyId}
  }, token)
  await doGraphQlQuery({
    operationName: 'update_sentiment',
    query: `
    mutation update_sentiment($companyId: Int, $sentiment: jsonb = "") {
      update_companies_by_pk(pk_columns: {id: $companyId}, _set: {sentiment: $sentiment}) {
        sentiment
      }
    }    
    `,
    variables: {"companyId": companyId, sentiment: company.sentiment}
  }, token)

  // check if user has a list for sentiment
  const listname = `sentiment-${user.id}-${sentiment}`
  const list = await doGraphQlQuery({
    operationName: 'upsert_list',
    query: `
    mutation upsert_follows($user_id: Int, $name: String) {
      insert_list_members_one(
        object: {
          user_id: $user_id,
          list: {
            data: {
              created_by_id: $user_id,
              name: $name
            },
            on_conflict: {
              constraint: lists_pkey // TODO
            }
          }
        }
      ) {
        list_id
      }
    }
    `,
    variables: {
      name: listname,
      user_id: user.id
    }
  }, token)

  // upsert follow
  const follows = await doGraphQlQuery({
    operationName: 'upsert_follows',
    query: `
    mutation upsert_follows(
      $list_id: Int,
      $resource_id: Int,
      $resource_type: String,
      $user_id: String) {
      insert_follows(
        objects: {
          list_id: $list_id,
          resource_id: $resource_id,
          resource_type: $resource_type,
          user_id: $user_id
      }, on_conflict: {
        constraint: follows_pkey  // TODO
      }) {
        affected_rows
      }
    }
    `,
    variables: {
      list_id: list.id,
      resource_id: companyId,
      resource_type: "companies",
      user_id: user.id
    }
  }, token)

  
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

        },
        user: user.email,
      },
    },
  });

  res.send({success: true})
}

export default handler