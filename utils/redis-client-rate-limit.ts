import { createClient } from "redis";

const url = `redis://${process.env.REDIS_USER}:${process.env.REDIS_PASS}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

const redisClient = createClient({url: url,});

(async () => {
	await redisClient.connect()
})();

export default redisClient;
