import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schemas/index.js";
import { DB_URL } from "src/config/index.js";


const pool = new Pool({
    connectionString: DB_URL as string
});

export const DB: NodePgDatabase<typeof schema> = drizzle(pool, { schema });