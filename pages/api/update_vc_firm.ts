import { mutate } from "@/graphql/hasuraAdmin";
import { NextApiResponse, NextApiRequest } from "next";
import CookieService from '../../utils/cookie'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method !== 'POST') return res.status(405).end()

  const token = CookieService.getAuthToken(req.cookies)
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end()

  const data = req.body.vcFirm
  const vcFirmId = req.body.vcFirmId

  if (!vcFirmId) return res.status(400).send({ message: 'Bad request, vcFirmId required!' })

  try {
    const result = await updateVcFirm(data, vcFirmId, token)
    res.send({ result })
  } catch (e: any) {
    return res.status(500).send({ message: 'some error occurred while saving organization' })
  }

}

const updateVcFirm = async (payload: any, vcFirmId: number, token: string) => {
  const mutation = `
    mutation UpdateVcFirmByPk($vcFirmId: Int!, $data: vc_firms_set_input) {
      update_vc_firms_by_pk(pk_columns: {id: $vcFirmId}, _set: $data) {
        id
      }
    }
  `

  return await mutate({
    mutation,
    variables: {
      vcFirmId,
      data: payload
    }
  }, token)
}

export default handler
