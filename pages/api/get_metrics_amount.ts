import { NextApiResponse, NextApiRequest } from "next";
import axios, {AxiosError} from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") res.status(405).json({ message: "Method not allowed" });

  // get the ticker from request
  const ticker = req.body.ticker;

  let currentPrice = 0;
  let circulatingSupply = 0;
  try {
    // fetch the data current price
    const currentPriceData = await axios({
      method: 'GET',
      url: `https://web3api.io/api/v2/tokens/metrics/${ticker}/latest`,
      headers: { Accept: 'application/json', 'x-api-key': process.env.AMBERDATA_API_KEY!, }
    })
    currentPrice = +currentPriceData.data.payload.priceUSD;
  } catch(error) {
    const err = error as AxiosError
    let errrorData: any;
    let errrorStatus: any;
    errrorStatus = err.response?.status;
    errrorData = err.response?.data;
    if (errrorData && errrorData.message) {
      return res.status(errrorStatus).send(errrorData.message)
    }
  }

  try {
    // fetch the data for Circulating Supply
    const circulatingSupplyData = await axios({
      method: 'GET',
      url: `https://web3api.io/api/v2/market/metrics/${ticker}/supply/latest`,
      headers: { 'Accept': 'application/json', 'x-api-key': process.env.AMBERDATA_API_KEY!, }
    })
    circulatingSupply = circulatingSupplyData.data.payload.circulatingSupply;
  } catch(error) {
    const err = error as AxiosError
    let errrorData: any;
    let errrorStatus: any;
    errrorStatus = err.response?.status;
    errrorData = err.response?.data;
    if (errrorData && errrorData.message) {
      return res.status(errrorStatus).send(errrorData.message)
    }
  }

  // get the Market Cap value (Market Cap = Current Price x Circulating Supply)
  const marketCap = currentPrice * circulatingSupply

  res.send({ success: true, currentPrice, marketCap })
};

export default handler;
