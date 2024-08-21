import { DB } from "src/config/db.connection.js";
import { TaskSubmitTable } from "../schemas/index.js";
import {
  CreateTaskSubmitType,
  DeleteTaskSubmitType,
  TaskSubmitTableType,
  UpdateTaskSubmitType,
} from "src/types/db-services/index.js";
import { eq } from "drizzle-orm";

const createTaskSubmit = async (
  taskData: CreateTaskSubmitType
): Promise<TaskSubmitTableType> => {
  const task = await DB.insert(TaskSubmitTable).values(taskData).returning();
  return task[0];
};

const updateTaskSubmit = async (
  newData: UpdateTaskSubmitType
): Promise<TaskSubmitTableType> => {
  const task = await DB.update(TaskSubmitTable)
    .set(newData)
    .where(eq(TaskSubmitTable.id, newData.id))
    .returning();
  return task[0];
};

const deleteTaskSubmit = async ({
  id,
}: DeleteTaskSubmitType): Promise<TaskSubmitTableType> => {
  const task = await DB.delete(TaskSubmitTable)
    .where(eq(TaskSubmitTable.id, id))
    .returning();
  return task[0];
};

const getTaskSubmit = async ({
  id,
}: DeleteTaskSubmitType): Promise<TaskSubmitTableType> => {
  const task = await DB.select()
    .from(TaskSubmitTable)
    .where(eq(TaskSubmitTable.id, id));
  return task[0];
};

export { createTaskSubmit, updateTaskSubmit, deleteTaskSubmit, getTaskSubmit };
