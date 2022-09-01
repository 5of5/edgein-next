import { DataFields, DataPartners, DataRaw } from '@/models/biz_model'
import { partnerLookUp, insertDataRaw, fieldLookup } from '@/utils/submit_data'
import type { NextApiRequest, NextApiResponse } from 'next'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).send({ message: 'Only POST requests allowed' })

  const apiKey: string = req.body.partner_api_key
  const resourceType: string = req.body.resource_type
  const resourceId: number = req.body.resource_identifier
  const resourceObj: Object = req.body.resource
  if (apiKey === undefined || resourceId === undefined || resourceObj === undefined || resourceType === undefined)
    return res.status(400).send({ message: 'Bad Request' })

  const partner: DataPartners = await partnerLookUp(apiKey)  
  if (partner.id === undefined)
    return res.status(401).send({ message: 'Unauthorized' })

  const partnerId: number = partner.id
  const submitResult = await Promise.all(Object.entries(resourceObj).map( async item => {
    const field = item[0]
    const value = item[1]
    const dataField: DataFields = await fieldLookup(`${resourceType}.${field}`)
    if (dataField === undefined)
      return {
        resource: resourceType,
        field,
        message: 'Invalid Field'
      }
    else {
      const newRecord: DataRaw = {
        partner: partnerId,
        resource: resourceType,
        resource_id: resourceId,
        field,
        value,
        accuracy_weight: 1
      }
      return insertDataRaw(newRecord)
    }
  }))

  res.send(submitResult)
}

export default handler
