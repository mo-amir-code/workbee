import { DB } from "../../config/db.connection.js";
import { AuthTable } from "../schemas/index.js";
import {
  AuthTableType,
  CreateAuthType,
  DeleteAuthType,
  GetAuthType,
  UpdateAuthType,
} from "../../types/db-services/index.js";
import { eq, or } from "drizzle-orm";

const createAuth = async ({
  user,
  refreshToken,
  role = "user",
}: CreateAuthType): Promise<AuthTableType> => {
  const auth = await DB.insert(AuthTable)
    .values({ user, refreshToken, role })
    .returning();
  return auth[0];
};

const updateAuth = async (newData: UpdateAuthType): Promise<AuthTableType> => {
  const auth = await DB.update(AuthTable)
    .set(newData)
    .where(eq(AuthTable.user, newData.user))
    .returning();
  return auth[0];
};

const deleteAuth = async ({ user }: DeleteAuthType): Promise<AuthTableType> => {
  const auth = await DB.delete(AuthTable)
    .where(eq(AuthTable.user, user))
    .returning();
  return auth[0];
};

const getAuth = async ({ user, id }: GetAuthType): Promise<AuthTableType> => {
  const auth = await DB.select()
    .from(AuthTable)
    .where(
      or(
        id ? eq(AuthTable.id, id) : undefined,
        user ? eq(AuthTable.user, user) : undefined
      )
    );
  return auth[0];
};

export { createAuth, updateAuth, deleteAuth, getAuth };
