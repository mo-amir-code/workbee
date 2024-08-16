import pkg from "pg";
const { Pool } = pkg;
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator"
import { DB_URL } from "./src/config/index.js";

async function runMigation() {
    try {
        console.log("Migation Start....");
        const pool = new Pool({connectionString: DB_URL});
        const db = drizzle(pool);
        await migrate(db, { migrationsFolder: "./src/db/migrations" });
        console.log("Migation was successfull");
        await pool.end();
    } catch (error) {
        console.error("Migation Failed: ", error);
    }
}

runMigation();