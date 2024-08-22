import { DB } from "../../config/db.connection.js"
import { UserSavedTaskTable } from "../schemas/index.js"
import { AddTaskInUserSavedTask, CreateUserSavedTaskType, UserSavedTaskTableType } from "../../types/db-services/index.js"
import { eq } from "drizzle-orm";
import { REMOVE_USER_SAVED_TASK } from "../../constants/index.js";

const createUserSavedTask = async ({user}:CreateUserSavedTaskType):Promise<UserSavedTaskTableType> => {
    const savedTasks = await DB.insert(UserSavedTaskTable).values({tasks: [], user }).returning();
    return savedTasks[0];
}

const addUserSavedTask = async ({user, task}:AddTaskInUserSavedTask) : Promise<UserSavedTaskTableType> => {
    let savedTask = (await DB.select().from(UserSavedTaskTable).where(eq(UserSavedTaskTable.user, user)))[0];
    const newData = [...savedTask.tasks || [], task];
    const updatedTask = await DB.update(UserSavedTaskTable).set({
        tasks: newData
    }).returning();
    return updatedTask[0];
}

const removeUserSavedTask = async ({user, task}:AddTaskInUserSavedTask) : Promise<UserSavedTaskTableType> => {
    let savedTask = (await DB.select().from(UserSavedTaskTable).where(eq(UserSavedTaskTable.user, user)))[0];
    
    if(savedTask.tasks === null || savedTask.tasks.length === 0){
        throw new Error(REMOVE_USER_SAVED_TASK)
    }
    
    const newData = savedTask.tasks.filter((t:number) => t !== task);

    const updatedTask = await DB.update(UserSavedTaskTable).set({
        tasks: newData
    }).returning();

    return updatedTask[0];
}


export {
    createUserSavedTask,
    addUserSavedTask,
    removeUserSavedTask
}