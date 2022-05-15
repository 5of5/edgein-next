import type { NextApiRequest, NextApiResponse } from 'next'
import CookieService from '../../utils/cookie'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let user;
  try {
    user = CookieService.getUser(CookieService.getAuthToken(req.cookies))
  } catch (error) {
    res.status(401).end()
  }

  // now we have access to the data inside of user
  // and we could make database calls or just send back what we have
  // in the token.

  res.json(user)
}

export default handler
