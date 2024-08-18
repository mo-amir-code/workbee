import pkg from "pg";
const { Pool } = pkg;
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres"
import * as schema from "../db/schemas/index.js";
import { DB_URL } from "./index.js";


const pool = new Pool({
    connectionString: DB_URL as string
});

export const DB: NodePgDatabase<typeof schema> = drizzle(pool, { schema });