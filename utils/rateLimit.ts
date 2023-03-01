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
  limit = 10,
  windowMs = 60 * 1000,
  delayAfter = Math.round(10 / 2),
  delayMs = 500,
} = {}) => {
  // Create a `node-redis` client
  const client = createClient({
    socket: {
      port: 6379,
      host: "35.86.238.186",
    },
  });
  // client.on("error", (err) => {
  //   console.error("connect to redis failed!", err);
  // });
  // client.on("connect", () => console.log("client is connect"));
  // client.on("reconnecting", () => console.log("client is reconnecting"));
  // client.on("ready", () => console.log("client is ready"));
  // Then connect to the Redis server
  (async () => {
    // Connect to redis server
    await client.connect();
  })();
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
