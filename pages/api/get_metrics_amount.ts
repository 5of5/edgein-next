import { NextApiResponse, NextApiRequest } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") res.status(405).json({ message: "Method not allowed" });

  // get the ticker from request
  const ticker = req.body.ticker;

  let currentPrice = 0;
  let circulatingSupply = 0;
  const priceHeader = new Headers();
  priceHeader.append('Accept', 'application/json');
  priceHeader.append('x-api-key', process.env.AMBERDATA_API_KEY!);
  try {
    const currentPriceFetchResponse = await fetch(`https://web3api.io/api/v2/tokens/metrics/${ticker}/latest`, {
      method: 'GET',
      headers: priceHeader,
    });
    if (!currentPriceFetchResponse.ok) {
      console.log('response not ok', currentPriceFetchResponse)
      return res.status(currentPriceFetchResponse.status).send(currentPriceFetchResponse.statusText)
    }
    const currentPriceData = JSON.parse(await currentPriceFetchResponse.text());
    currentPrice = +currentPriceData.payload.priceUSD;
  } catch (ex: any) {
    console.log(ex)
    return res.status(404).send(ex.message)
  }

  try {
    const circulatingSupplyFetchResponse = await fetch(`https://web3api.io/api/v2/market/metrics/${ticker}/supply/latest`, {
      method: 'GET',
      headers: priceHeader,
    });
    if (!circulatingSupplyFetchResponse.ok) {
      console.log('response not ok', circulatingSupplyFetchResponse)
      return res.status(circulatingSupplyFetchResponse.status).send(circulatingSupplyFetchResponse.statusText)
    }
    const circulatingSupplyData = JSON.parse(await circulatingSupplyFetchResponse.text());
    circulatingSupply = +circulatingSupplyData.payload.circulatingSupply;
  } catch (ex: any) {
    console.log(ex)
    return res.status(404).send(ex.message)
  }

  // get the Market Cap value (Market Cap = Current Price x Circulating Supply)
  const marketCap = currentPrice * circulatingSupply

  console.log({ success: true, currentPrice, marketCap })

  res.send({ success: true, currentPrice, marketCap })
};

export default handler;
