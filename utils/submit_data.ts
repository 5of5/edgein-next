import { mutate, query } from '@/graphql/hasuraAdmin'
import { DataRaw } from '@/models/biz_model'


export const partnerIdLookUp = async (apiKey: string) => {
    const { data: {data_partners: [data_partner]} } = await query({
        query: `
        query query_data_partners($apiKey: String!) {
          data_partners(where: {api_key: {_eq: $apiKey}}) {
            id
            name
            api_key
          }
        }`,
        variables: {apiKey}
    })
    return data_partner 
}

export const insertDataRaw = async (data: DataRaw) => {
    const { data: {insert_data_raw_one} } = await mutate({
        mutation: `
        mutation insert_data_raw(
            $accuracy_weight: Int!,
            $field: String!,
            $partner: Int!,
            $resource: String!,
            $value: jsonb!,
            $resource_id: Int!
            ) {
                insert_data_raw_one(object: {
                    accuracy_weight: $accuracy_weight,
                    field: $field,
                    partner: $partner,
                    resource: $resource,
                    value: $value,
                    resource_id: $resource_id
                }) {
                    id
                    created_at
                    resource
                    resource_id
                    field
                    value
                    accuracy_weight
                }
            }
        `,
        variables: {...data} 
    })
    return insert_data_raw_one
}
