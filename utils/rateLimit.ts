import type { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import RedisStore from "rate-limit-redis";
import { createClient } from "redis";

const url = `redis://${process.env.REDIS_USER}:${process.env.REDIS_PASS}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
const client = createClient({
  url: url,
});
(async () => {
  await client.connect();
})();

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

const getRateLimitMiddlewares = ({
  limit = Number(process.env.RATE_LIMIT),
  windowMs = Number(process.env.WINDOWMS),
  delayAfter = Number(process.env.DELAY_AFTER),
  delayMs = Number(process.env.DELAYMS),
} = {}) => 
  [
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
  ]

const middlewares = getRateLimitMiddlewares();

export async function applyRateLimit(request: NextApiRequest, response: NextApiResponse) {
  await Promise.all(
    middlewares
      .map(applyMiddleware)
      .map(middleware => middleware(request, response))
  );
}

export async function simpleRateLimit(userID: number | undefined) {
  if (!userID)
    return true;

  const lastResetTime = Number(await client.get(`${userID}_last_reset_time_graphql`));
  const nowEpoch = Number(new Date());
	if (nowEpoch - lastResetTime >= Number(process.env.WINDOWMS)) {
		// if elapsed, reset the counters
		await client.set(`${userID}_counter_graphql`, Number(process.env.RATE_LIMIT));
    await client.set(`${userID}_last_reset_time_graphql`, nowEpoch);
	} else {
		const requestLeft = Number(await client.get(`${userID}_counter_graphql`));
		if (requestLeft <= 0)
			return false;
	}

	await client.decr(`${userID}_counter_graphql`);
	return true;
}
