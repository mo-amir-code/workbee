import { Redis } from "ioredis";
import { ENVIRONMENT, REDIS_URI } from "./env.vars.js";

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
  console.log("Redis connected....!");
});

redis.on("error", (err) => {
  console.error("Redis Error: ", err);
});

export { redis };
