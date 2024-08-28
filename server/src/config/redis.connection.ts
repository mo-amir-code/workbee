import { Redis } from "ioredis";
import { ENVIRONMENT, REDIS_URI } from "./env.vars.js";
import logger from "../../logger.js";

let redis: Redis;

if (ENVIRONMENT === "development") {
  redis = new Redis({
    host: "localhost",
    port: 6379,
  });
} else {
  redis = new Redis(REDIS_URI as string);
}

redis.on("connect", () => {
  logger.info("Redis connected....!");
});

redis.on("error", (err) => {
  logger.error("Redis Error: ", err);
});

export { redis };
