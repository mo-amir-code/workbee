import pkg from "pg";
const { Pool } = pkg;
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { DB_URL } from "./src/config/index.js";
import logger from "./logger.js";

async function runMigation() {
  try {
    logger.info("Migration Start....");
    const pool = new Pool({ connectionString: DB_URL });
    const db = drizzle(pool);
    await migrate(db, { migrationsFolder: "./dist/src/db/migrations" });
    logger.info("Migation was successfull");
    await pool.end();
  } catch (error) {
    logger.error("Migation Failed: ", error);
  }
}

runMigation();
