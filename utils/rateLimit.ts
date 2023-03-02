import type { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { createClient } from "redis";
import slowDown from "express-slow-down";

const applyMiddleware =
  (middleware: any) => (request: NextApiRequest, response: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(request, response, (result: any) =>
        result instanceof Error ? reject(result) : resolve(result)
      );
    });

const getIP = (request: any) =>
  String(
    request.headers["x-forwarded-for"] ||
      request.headers["x-real-ip"] ||
      request.connection.remoteAddress
  );

export const getRateLimitMiddlewares = ({
  limit = Number(process.env.RATE_LIMIT),
  windowMs = Number(process.env.WINDOWMS),
  delayAfter = Number(process.env.DELAY_AFTER),
  delayMs = Number(process.env.DELAYMS),
} = {}) => {
  let isConnected = true;
  // Create a `node-redis` client
  const client = createClient({
    url: `redis://${process.env.REDIS_USER}:${process.env.REDIS_PASS}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  });
  function getRedisClient(timeoutMs: any) {
    return new Promise((resolve, reject) => {
      client.connect();
      const timer = setTimeout(() => reject("timeout"), timeoutMs);
      client.on("ready", () => {
        clearTimeout(timer);
        resolve(client);
      });
      client.on("error", (err) => {
        clearTimeout(timer);
        reject(err);
      });
    });
  }
  const redisReadyTimeoutMs = 10000;
  getRedisClient(redisReadyTimeoutMs).then(
    (redisClient) => {
      isConnected = true;
      // the client has connected to redis sucessfully
    },
    (error) => {
      isConnected = false;
    }
  );
  // using redis server when user connected to server
  if (isConnected) {
    return [
      slowDown({ keyGenerator: getIP, windowMs, delayAfter, delayMs }),
      rateLimit({
        keyGenerator: getIP,
        windowMs,
        max: limit,
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        // Redis store configuration
        store: new RedisStore({
          sendCommand: (...args: string[]) => client.sendCommand(args),
        }),
      }),
    ];
  }
  // just by pass using redis server when user cannot connect to redis server
  return [
    slowDown({ keyGenerator: getIP, windowMs, delayAfter, delayMs }),
    rateLimit({
      keyGenerator: getIP,
      windowMs,
      max: limit,
    }),
  ];
};

const middlewares = getRateLimitMiddlewares();

async function applyRateLimit(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await Promise.all(
    middlewares
      .map(applyMiddleware)
      .map((middleware) => middleware(request, response))
  );
}

export default applyRateLimit;
