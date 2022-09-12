import CookieService from '../../utils/cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  CookieService.clearTokenCookie(res)

  const logoutLink = `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}`;

  res.send({ success: true, logoutLink })
}

export default handler