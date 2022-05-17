import CookieService from '../../utils/cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  CookieService.clearTokenCookie(res)

  res.end()
}

export default handler