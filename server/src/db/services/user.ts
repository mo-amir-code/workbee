import { DB } from "src/config/db.connection.js";
import { CreateUserType, DeleteUserType, GetUserType, UpdateUserType } from "../../types/db-services/index.js";
import { UserTable } from "../schemas/index.js";
import { eq } from "drizzle-orm";

const createUser = async (user:CreateUserType) => {
    await DB.insert(UserTable).values(user);
}

const deleteUser = async ({id}:DeleteUserType) => {
    await DB.delete(UserTable).where(eq(UserTable.id, id));
}

const updateUser = async (newData:UpdateUserType) => {
    await DB.update(UserTable).set(newData).where(eq(UserTable.id, newData.id));
}

const getUser = async ({id}:GetUserType) => {
    await DB.select().from(UserTable).where(eq(UserTable.id, id));
}

export {
    createUser,
    deleteUser,
    updateUser,
    getUser
}