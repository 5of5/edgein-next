import { query } from '../graphql/hasuraAdmin';
import AWS from 'aws-sdk';

//AWS config set
AWS.config.update({
  accessKeyId: process.env.AWS_DYNAMODB_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_DYNAMODB_SECRET_ACCESS_KEY!,
  region: process.env.AWS_DYNAMODB_REGION!,
});

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const coinInfoDynamoDBTable = 'coin_info';

const AmberAPIv2 = 'https://web3api.io/api/v2';
const AmberAPIHeader = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-api-key': process.env.AMBERDATA_API_KEY!,
  },
};

const CoingeckoAPIv3 = 'https://api.coingecko.com/api/v3';
const CoingeckoAPIHeader = {
  method: 'GET',
  headers: { accept: 'application/json' },
};

const EXPIRATION_TIME = 3600000; // 60 mins
const BIG_EXPIRATION_TIME = 24 * 3600000; // 1 day

const coinLookUp = async (edgeinCoinId: number) => {
  try {
    const {
      data: {
        coins: [coinDetail],
      },
    } = await query({
      query: `
      query lookup_coin($edgeinCoinId: Int!) {
        coins(where: {id: {_eq: $edgeinCoinId}}) {
          name,
          ticker
        }
      }`,
      variables: { edgeinCoinId },
    });
    return coinDetail;
  } catch (error) {
    console.log(`coinLookUp failed ${error}`);
  }
};

const putDynamoDBItem = async (table: string, item: Record<string, any>) => {
  try {
    const params = {
      TableName: table,
      Item: item,
    };
    return await dynamodb.putItem(params).promise();
  } catch (error) {
    console.log(`Failed to putDynamoDBItem ${table} ${item} ${error}`);
  }
};

const getDynamoDBItem = async (table: string, id: string) => {
  try {
    const params = {
      Key: {
        id: { S: id },
      },
      TableName: table,
    };
    return (await dynamodb.getItem(params).promise()).Item;
  } catch (error) {
    console.log(`Failed to getDynamoDBItem ${table} ${id} ${error}`);
  }
};

const getCachedItem = async (key: string) => {
  try {
    const ret = await getDynamoDBItem(coinInfoDynamoDBTable, key);
    if (
      !ret ||
      (ret.expire_at.S !== '0' &&
        (!ret.expire_at.S || Date.now().toString() > ret.expire_at.S))
    )
      return;
    return ret.data.S;
  } catch (error) {
    console.log(`Failed to getCachedItem ${key} ${error}`);
    return;
  }
};

const putCachedItem = async (key: string, item: any, expiration = 0) => {
  try {
    const expireAt =
      expiration === 0 ? '0' : (Date.now() + expiration).toString();
    const data = {
      id: { S: key },
      data: { S: item },
      expire_at: { S: expireAt },
    };
    await putDynamoDBItem(coinInfoDynamoDBTable, data);
  } catch (error) {
    console.log(`Failed to putCachedItem ${key} ${item} ${error}`);
  }
};

const ticker2CoinId = async (name: string, ticker: string) => {
  try {
    const res = await fetch(`${CoingeckoAPIv3}/coins/list`, CoingeckoAPIHeader);
    if (!res.ok) {
      console.log(
        `Failed to convert ticker2CoinId ${ticker}\n${JSON.stringify(
          await res.text(),
        )}`,
      );
      return;
    }
    for (const item of JSON.parse(await res.text())) {
      if (
        item.symbol.toLowerCase() === ticker ||
        item.name.toLowerCase() === name
      )
        return item.id;
    }
  } catch (e) {
    console.log(`Got exception when ticker2CoinId for ${ticker}\n${e}`);
  }
};

export const getCoinInfo = async (edgeinCoinId: number) => {
  try {
    const coinDetail = await coinLookUp(edgeinCoinId);
    const ticker = coinDetail.ticker.toLowerCase();
    const name = coinDetail.name.toLowerCase();
    // Get coin info from DynamoDB cached
    let ret = await getCachedItem(edgeinCoinId.toString());

    // If not exist, get from coingecko first
    if (!ret) {
      let coinInfo;
      const coinId = await ticker2CoinId(name, ticker);
      if (coinId) {
        const res = await fetch(
          `${CoingeckoAPIv3}/coins/${coinId}?localization=false&community_data=false&developer_data=false`,
          CoingeckoAPIHeader,
        );
        if (!res.ok) {
          console.log(`Failed to get CoingeckoCoin\n${JSON.stringify(res)}`);
          return '{}';
        }
        const data = JSON.parse(await res.text());
        coinInfo = {
          currentPrice: data.market_data.current_price.usd,
          high24H: data.market_data.high_24h.usd,
          low24H: data.market_data.low_24h.usd,
          vol24H: data.market_data.total_volume.usd,
          marketCap: data.market_data.market_cap.usd,
          marketCapRank: data.market_data.market_cap_rank,
        };
      } else {
        console.log(`${ticker} not available in coingecko`);
        coinInfo = await getAmberCexCoin(ticker);
      }

      if (coinInfo) {
        ret = JSON.stringify(coinInfo);
        await putCachedItem(edgeinCoinId.toString(), ret, EXPIRATION_TIME);
      } else return '{}';
    }

    return ret;
  } catch (e) {
    console.log(
      `Got exception when getCoingeckoCoin for ${edgeinCoinId}\n${e}`,
    );
    return '{}';
  }
};

const getAmberCexCoin = async (ticker: string) => {
  try {
    let ret = await fetch(
      `${AmberAPIv2}/market/spot/prices/assets/${ticker}/latest`,
      AmberAPIHeader,
    );
    if (ret.ok) {
      const currentPrice = JSON.parse(await ret.text()).payload.price;
      ret = await fetch(
        `${AmberAPIv2}/market/spot/ohlcv/${ticker}_usd/historical?startDate=${
          Date.now() - 86400000
        }&timeInterval=days`,
        AmberAPIHeader,
      );
      if (!ret.ok) {
        console.log(
          `Failed to getAmberCexCoin ${ticker}\n${JSON.stringify(ret)}`,
        );
        return;
      }

      const ohlcvData = JSON.parse(await ret.text()).payload.data;
      let high24H;
      let low24H;
      let vol24H = 0;
      for (const item of Object.values(ohlcvData) as any[]) {
        if (!high24H || item[0][2] > high24H) high24H = item[0][2];
        if (!low24H || item[0][3] < low24H) low24H = item[0][2];
        vol24H += item[0][5];
      }

      const rankInfo = await getAmberRanking();
      const rank = JSON.parse(rankInfo as string)[ticker];
      return {
        currentPrice,
        high24H,
        low24H,
        vol24H,
        ...rank,
      };
    } else {
      console.log(`${ticker} not available in Amberdata CEX`);
      return await getAmberDexCoin(ticker);
    }
  } catch (e) {
    console.log(`Got exception when getAmberCexCoin ${ticker}\n${e}`);
  }
};

const getAmberDexList = async () => {
  try {
    // Get AmberDexList from DynamoDB cached
    let ret = await getCachedItem('AmberDexList');

    if (!ret) {
      const res = await fetch(
        `${AmberAPIv2}/market/defi/dex/exchanges?sortBy=numPairs`,
        AmberAPIHeader,
      );
      const payload = JSON.parse(await res.text()).payload;
      ret = JSON.stringify(
        payload.map((item: Record<string, string>) => item.exchangeId),
      );
      await putCachedItem('AmberDexList', ret);
    }

    return ret;
  } catch (e) {
    console.log(`Got exception when getAmberDexList\n${e}`);
  }
};

const getAmberCoinAddress = async (ticker: string) => {
  try {
    let ret = await getCachedItem(`${ticker}Addr`);

    if (!ret) {
      const allDex = await getAmberDexList();
      for (const dex of JSON.parse(allDex as string)) {
        const res = await fetch(
          `${AmberAPIv2}/market/defi/dex/pairs?exchange=${dex}&asset=${ticker}`,
          AmberAPIHeader,
        );
        const payload = JSON.parse(await res.text()).payload;
        if (payload[0]) {
          if (payload[0].baseSymbol.toLowerCase() === ticker.toLowerCase())
            ret = payload[0].baseAddress;
          else if (
            payload[0].quoteSymbol.toLowerCase() === ticker.toLowerCase()
          )
            ret = payload[0].quoteAddress;

          await putCachedItem(`${ticker}Addr`, ret as string);
          break;
        }
      }
    }
    return ret;
  } catch (e) {
    console.log(`Got exception when getAmberCoinAddress\n${e}`);
  }
};

const getAmberDexCoin = async (ticker: string) => {
  try {
    const coinAddr = await getAmberCoinAddress(ticker);
    if (!coinAddr) {
      console.log(`${ticker} not available in Amberdata DEX`);
      return;
    }

    const ret = await fetch(
      `${AmberAPIv2}/market/defi/prices/asset/${coinAddr}/historical?startDate=${
        Date.now() - 86400000
      }&timeInterval=days`,
      AmberAPIHeader,
    );
    if (!ret.ok) {
      console.log(
        `Failed to getAmberDexCoin ${ticker}\n${JSON.stringify(ret)}`,
      );
      return {};
    }
    const payload = JSON.parse(await ret.text()).payload;
    //payload !== {}
    if (JSON.stringify(payload) === JSON.stringify({})) {
      const rankInfo = await getAmberRanking();
      const rank = JSON.parse(rankInfo as string)[ticker];
      return {
        currentPrice: payload.data[0].price,
        vol24H: payload.data[0].volume,
        ...rank,
      };
    } else {
      console.log(`${ticker} not available in Amberdata DEX`);
    }
  } catch (e) {
    console.log(`Got exception when getAmberDexCoin ${ticker}\n${e}`);
  }
};

const getAmberRanking = async () => {
  try {
    // Get AmberRanking from DynamoDB cached
    let ret = await getCachedItem('AmberRanking');
    if (!ret) {
      console.log(`Reload AmberRanking DynamoDB cached`);
      const ranking: Record<string, any> = {};
      const maxPageAllow = 100;
      let pageNo = 0;
      do {
        const ret = await fetch(
          `${AmberAPIv2}/market/rankings/latest?page=${pageNo}&size=1000`,
          AmberAPIHeader,
        );
        if (!ret.ok) {
          console.log(`Failed to getAmberRanking\n${JSON.stringify(ret)}`);
          return;
        }
        const amberRanking = JSON.parse(await ret.text()).payload.data;
        if (amberRanking.length <= 0) break;
        else {
          pageNo += 1;
          for (const item of amberRanking) {
            ranking[item.symbol] = {
              marketCap: item.liquidMarketCap,
              marketCapRank: item.rank,
            };
          }
        }
      } while (pageNo < maxPageAllow);
      ret = JSON.stringify(ranking);
      await putCachedItem('AmberRanking', ret, BIG_EXPIRATION_TIME);
    }
    return ret;
  } catch (e) {
    console.log(`Got exception when getAmberRanking\n${e}`);
  }
};
