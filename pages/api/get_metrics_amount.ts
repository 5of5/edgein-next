import { NextApiResponse, NextApiRequest } from "next"
import { getCoinInfo } from '@/utils/marketData'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") res.status(405).json({ message: "Method not allowed" })

  // get the ticker from request
  const ticker = req.body.ticker
  const ret = JSON.parse(await getCoinInfo(ticker) as string)
  res.send({ success: true, ...ret })
};

export default handler;
