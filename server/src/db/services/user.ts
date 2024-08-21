import { DB } from "src/config/db.connection.js";
import {
  CreateUserType,
  DeleteUserType,
  GetUserType,
  UpdateUserType,
  UserTableType,
} from "../../types/db-services/index.js";
import { UserTable } from "../schemas/index.js";
import { eq, or } from "drizzle-orm";

const createUser = async (user: CreateUserType): Promise<UserTableType> => {
  const newUser = await DB.insert(UserTable).values(user).returning();
  return newUser[0];
};

const deleteUser = async ({ id }: DeleteUserType): Promise<UserTableType> => {
  const user = await DB.delete(UserTable)
    .where(eq(UserTable.id, id))
    .returning();
  return user[0];
};

const updateUser = async (newData: UpdateUserType): Promise<UserTableType> => {
  const user = await DB.update(UserTable)
    .set(newData)
    .where(eq(UserTable.id, newData.id))
    .returning();
  return user[0];
};

const getUser = async ({ id, email, username }: GetUserType): Promise<UserTableType> => {
  const user = await DB.select().from(UserTable).where(
    or(
      id? eq(UserTable.id, id) : undefined,
      email? eq(UserTable.email, email) : undefined,
      username? eq(UserTable.username, username) : undefined,
    )
  );
  return user[0];
};

export { createUser, deleteUser, updateUser, getUser };
