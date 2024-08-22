import { DB } from "../../config/db.connection.js"
import { TaskTable } from "../schemas/index.js"
import { CreateTaskType, DeleteTaskType, TaskTableType, UpdateTaskType } from "../../types/db-services/index.js"
import { eq } from "drizzle-orm";


const createTask = async (taskData:CreateTaskType): Promise<TaskTableType> => {
    const task = await DB.insert(TaskTable).values(taskData).returning();
    return task[0];
}

const updateTask = async (newData:UpdateTaskType): Promise<TaskTableType> => {
    const task = await DB.update(TaskTable).set(newData).where(eq(TaskTable.id, newData.id)).returning();
    return task[0];
}

const deleteTask = async ({id}:DeleteTaskType): Promise<TaskTableType> => {
    const task = await DB.delete(TaskTable).where(eq(TaskTable.id, id)).returning();
    return task[0];
}

const getTask = async ({id}:DeleteTaskType): Promise<TaskTableType> => {
    const task = await DB.select().from(TaskTable).where(eq(TaskTable.id, id));
    return task[0];
}


export {
    createTask,
    updateTask,
    deleteTask,
    getTask
}