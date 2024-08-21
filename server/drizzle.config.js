import { DB_URL } from "./dist/src/config";

/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./dist/src/db/schemas/*",
  out: "./dist/src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: DB_URL,
  }
};
