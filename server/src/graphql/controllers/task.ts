import { desc } from "drizzle-orm";
import { DB } from "../../config/index.js";
import { TaskTable } from "../../db/schemas/index.js";
import funcHandler from "../../utils/errorHander.js";

const getLatestTask = funcHandler(async () => {
  const tasks = await DB.select()
    .from(TaskTable)
    .orderBy(desc(TaskTable.createdAt))
    .limit(5);

    return tasks;
});


export {
    getLatestTask
}
