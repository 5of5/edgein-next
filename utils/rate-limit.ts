import type { NextApiRequest, NextApiResponse } from 'next'
import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'
import RedisStore from "rate-limit-redis"
import { createClient } from "redis"
const applyMiddleware = (middleware: any) => (request: NextApiRequest, response: NextApiResponse) =>
  new Promise((resolve, reject) => {
    middleware(request, response, (result: any) =>
      result instanceof Error ? reject(result) : resolve(result)
    )
  })

const getIP = (request: any) =>
  String(request.headers['x-forwarded-for'] ||
  request.headers['x-real-ip'] ||
  request.connection.remoteAddress)

export const getRateLimitMiddlewares = ({
  limit = Number(process.env.RATE_LIMIT),
  windowMs = Number(process.env.WINDOWMS),
  delayAfter = Number(process.env.DELAY_AFTER),
  delayMs = Number(process.env.DELAYMS),
} = {}) => {
  const url = `redis://${process.env.REDIS_USER}:${process.env.REDIS_PASS}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
  const client = createClient({
    url: url,
  });
  (async () => {
    await client.connect()
  })();
  return [
    slowDown({ keyGenerator: getIP, windowMs, delayAfter, delayMs }),
    rateLimit({
      keyGenerator: getIP,
      windowMs,
      max: limit,
      standardHeaders: true,
      legacyHeaders: false,
      store: new RedisStore({
        sendCommand: (...args: string[]) => client.sendCommand(args),
      }),
    }),
  ];
}

const middlewares = getRateLimitMiddlewares()

async function applyRateLimit(request: NextApiRequest, response: NextApiResponse) {
  await Promise.all(
    middlewares
      .map(applyMiddleware)
      .map(middleware => middleware(request, response))
  )
}

export default applyRateLimit