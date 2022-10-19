import memoryCache, { CacheClass } from 'memory-cache';


const AmberAPIv2 = 'https://web3api.io/api/v2'
const AmberAPIHeader = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-api-key': process.env.AMBERDATA_API_KEY!}
}

const CoingeckoAPIv3 = 'https://api.coingecko.com/api/v3'
const CoingeckoAPIHeader = {
  method: 'GET',
  headers: {accept: 'application/json'}
}

const EXPIRATION_TIME = 3600000 // 60 mins
const BIG_EXPIRATION_TIME = 24 * 3600000 // 1 day
const memCache: CacheClass<string, string> = new memoryCache.Cache();

const ticker2CoinId = async(ticker: string) => {
  try {
    const res = await fetch(`${CoingeckoAPIv3}/coins/list`, CoingeckoAPIHeader)
    if (!res.ok) {
      console.log(`Failed to convert ticker2CoinId ${ticker}\n${JSON.stringify(res)}`)
      return
    }
    for (let item of JSON.parse(await res.text())) {
      if (item.symbol === ticker)
        return item.id
    }
  } catch(e) { console.log(`Got exception when ticker2CoinId for ${ticker}\n${e}`) }
}

export const getCoinInfo = async(ticker: string) => {
  try {
    ticker = ticker.toLocaleLowerCase()
    // Get coin info from memcached
    var ret = memCache.get(ticker)

    // If not exist, get from coingecko first
    if (!ret) {
      var coinInfo
      const coinId = await ticker2CoinId(ticker)
      if (coinId) {
        const res = await fetch(`${CoingeckoAPIv3}/coins/${coinId}?localization=false&community_data=false&developer_data=false`, CoingeckoAPIHeader)
        if (!res.ok) {
          console.log(`Failed to get CoingeckoCoin\n${JSON.stringify(res)}`)
          return
        }
        const data = JSON.parse(await res.text())
        coinInfo = {
          'currentPrice': data.market_data.current_price.usd,
          'high24H': data.market_data.high_24h.usd,
          'low24H': data.market_data.low_24h.usd,
          'vol24H': data.market_data.total_volume.usd,
          'marketCap': data.market_data.market_cap.usd,
          'marketCapRank': data.market_data.market_cap_rank,
        }
      } else {
        console.log(`${ticker} not available in coingecko`)
        coinInfo = await getAmberCexCoin(ticker)
      }

      ret = JSON.stringify(coinInfo)
      memCache.put(ticker, ret, EXPIRATION_TIME)
    }

    return ret
  } catch(e) { console.log(`Got exception when getCoingeckoCoin for ${ticker}\n${e}`) }
}


const getAmberCexCoin = async(ticker: string) => {
  try {
    var ret = await fetch(`${AmberAPIv2}/market/spot/prices/assets/${ticker}/latest`, AmberAPIHeader)
    if (ret.ok) {
      const currentPrice = JSON.parse(await ret.text()).payload.price
      ret = await fetch(`${AmberAPIv2}/market/spot/ohlcv/${ticker}_usd/historical?startDate=${Date.now()-86400000}&timeInterval=days`, AmberAPIHeader)
      if (!ret.ok) {
        console.log(`Failed to getAmberCexCoin ${ticker}\n${JSON.stringify(ret)}`)
        return
      }

      const ohlcvData = JSON.parse(await ret.text()).payload.data
      var high24H
      var low24H
      var vol24H = 0
      for (let item of Object.values(ohlcvData) as any[]) {
        if (!high24H || item[0][2] > high24H)
          high24H = item[0][2]
        if (!low24H || item[0][3] < low24H)
          low24H = item[0][2]
        vol24H += item[0][5]
      }

      const rankInfo = await getAmberRanking()
      const rank = JSON.parse(rankInfo as string)[ticker]
      return {
        currentPrice,
        high24H,
        low24H,
        vol24H,
        ...rank
      }
    } else {
      console.log(`${ticker} not available in Amberdata CEX`)
      return await getAmberDexCoin(ticker)
    }
  } catch(e) { console.log(`Got exception when getAmberCexCoin ${ticker}\n${e}`) }
}

const getAmberDexList = async() => {
  try {
    // Get AmberDexList from memcached
    var ret = memCache.get('AmberDexList')

    if (!ret) {
      const res = await fetch(`${AmberAPIv2}/market/defi/dex/exchanges?sortBy=numPairs`, AmberAPIHeader)
      const payload = JSON.parse(await res.text()).payload
      ret = JSON.stringify(payload.map((item: Record<string, string>) => item.exchangeId))
      memCache.put('AmberDexList', ret)
    }

    return ret
  } catch(e) { console.log(`Got exception when getAmberDexList\n${e}`) }
}

const getAmberCoinAddress = async(ticker: string) => {
  try {
    var ret = memCache.get(`${ticker}Addr`)

    if (!ret) {
      const allDex = await getAmberDexList()
      for (let dex of JSON.parse(allDex as string)) {
        const res = await fetch(`${AmberAPIv2}/market/defi/dex/pairs?exchange=${dex}&asset=${ticker}`, AmberAPIHeader)
        const payload = JSON.parse(await res.text()).payload
        if (payload[0]) {
          if (payload[0].baseSymbol.toLowerCase() === ticker.toLowerCase())
            ret = payload[0].baseAddress
          else if (payload[0].quoteSymbol.toLowerCase() === ticker.toLowerCase())
            ret = payload[0].quoteAddress
          
          memCache.put(`${ticker}Addr`, ret as string)
          break
        }
      }
    }
    console.log(ret)
    return ret
  } catch(e) { console.log(`Got exception when getAmberCoinAddress\n${e}`) }
}

const getAmberDexCoin = async(ticker: string) => {
  try {
    const coinAddr = await getAmberCoinAddress(ticker)
    const ret = await fetch(`${AmberAPIv2}/market/defi/prices/asset/${coinAddr}/historical?startDate=${Date.now()-86400000}&timeInterval=days`, AmberAPIHeader)
    if (!ret.ok) {
      console.log(`Failed to getAmberDexCoin ${ticker}\n${JSON.stringify(ret)}`)
      return {}
    }
    const payload = JSON.parse(await ret.text()).payload

    if (payload !== {}) {
      const rankInfo = await getAmberRanking()
      const rank = JSON.parse(rankInfo as string)[ticker]
      return {
        'currentPrice': payload.data[0].price,
        'vol24H': payload.data[0].volume,
        ...rank
      }
    } else {
      console.log(`${ticker} not available in Amberdata DEX`)
    }
  } catch(e) { console.log(`Got exception when getAmberCexCoin ${ticker}\n${e}`) }
}

const getAmberRanking = async() => {
  try {
    // Get AmberRanking from memcached
    var ret = memCache.get('AmberRanking')
    if (!ret) {
      console.log(`Reload AmberRanking memcached`)
      var ranking: Record<string, any> = {}
      const maxPageAllow = 100
      var pageNo = 0
      do {
        const ret = await fetch(`${AmberAPIv2}/market/rankings/latest?page=${pageNo}&size=1000`, AmberAPIHeader)
        if (!ret.ok) {
          console.log(`Failed to getAmberRanking\n${JSON.stringify(ret)}`)
          return
        }
        const amberRanking = JSON.parse(await ret.text()).payload.data
        if (amberRanking.length <= 0)
          break
        else {
          pageNo += 1
          for (let item of amberRanking) {
            ranking[item.symbol] = {
              'marketCap': item.liquidMarketCap,
              'marketCapRank': item.rank
            }
          }
        }
      } while (pageNo < maxPageAllow)
      ret = JSON.stringify(ranking)
      memCache.put('AmberRanking', ret, BIG_EXPIRATION_TIME)
    }
    return ret
  } catch(e) { console.log(`Got exception when getAmberRanking\n${e}`) }
}
