import { DB } from "src/config/db.connection.js"
import { AuthTable } from "../schemas/index.js"
import { AuthTableType, CreateAuthType, DeleteAuthType, UpdateAuthType } from "src/types/db-services/index.js"
import { eq } from "drizzle-orm";


const createAuth = async (authData:CreateAuthType): Promise<AuthTableType> => {
    const auth = await DB.insert(AuthTable).values(authData).returning();
    return auth[0];
}

const updateAuth = async (newData:UpdateAuthType): Promise<AuthTableType> => {
    const auth = await DB.update(AuthTable).set(newData).where(eq(AuthTable.user, newData.user)).returning();
    return auth[0];
}

const deleteAuth = async ({user}:DeleteAuthType): Promise<AuthTableType> => {
    const auth = await DB.delete(AuthTable).where(eq(AuthTable.user, user)).returning();
    return auth[0];
}

const getAuth = async ({user}:DeleteAuthType): Promise<AuthTableType> => {
    const auth = await DB.select().from(AuthTable).where(eq(AuthTable.user, user));
    return auth[0];
}


export {
    createAuth,
    updateAuth,
    deleteAuth,
    getAuth
}