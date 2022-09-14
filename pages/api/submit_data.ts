import { Data_Fields, Data_Partners } from '@/graphql/types'
import { partnerLookUp, resourceIdLookup, insertDataRaw, fieldLookup } from '@/utils/submit_data'
import type { NextApiRequest, NextApiResponse } from 'next'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).send({ message: 'Only POST requests allowed' })

  const apiKey: string = req.body.partner_api_key
  const resourceType: string = req.body.resource_type
  const resourceIdentifier: string = req.body.resource_identifier
  const identifierColumn: string = req.body.identifier_column
  const resourceObj: Record<string, any> = req.body.resource
  if (apiKey === undefined || resourceIdentifier === undefined || identifierColumn === undefined
    || resourceObj === undefined || resourceType === undefined)
    return res.status(400).send({ message: 'Bad Request' })

  const partner: Data_Partners = await partnerLookUp(apiKey)  
  if (partner?.id === undefined)
    return res.status(401).send({ message: 'Unauthorized' })

  const resourceId: number = await resourceIdLookup(resourceType, resourceIdentifier, identifierColumn)
  if (resourceId === undefined)
    return res.status(404).send({ message: 'Resource Not Found' })

  const partnerId: number = partner.id
  const currentTime = new Date()
  let validData: Array<Record<string, any>> = []
  let invalidData: Array<Record<string, any>> = []

  for (let field in resourceObj) {
    let value = resourceObj[field]
    let dataField: Data_Fields = await fieldLookup(`${resourceType}.${field}`)
    if (dataField === undefined)
      invalidData.push({
        resource: resourceType,
        field,
        message: 'Invalid Field'
      })
    else {
      validData.push({
        created_at: currentTime,
        partner: partnerId,
        resource: resourceType,
        resource_id: resourceId,
        field,
        value,
        accuracy_weight: 1
      })
    }
  }

  const insertResult = await insertDataRaw(validData)
  res.send(invalidData.concat(insertResult))
}

export default handler
