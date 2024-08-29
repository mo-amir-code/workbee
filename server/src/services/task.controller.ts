import { and, asc, desc, eq, gt, sql } from "drizzle-orm";
import { DB } from "../config/index.js";
import { TaskTable } from "../db/schemas/index.js";
import {
  FilterTasksType,
  LatestOrMostPayingTaskType,
  LatestTaskWithLimits,
} from "../types/controllers/index.js";

const getLatestTaskWithLimit = async ({
  limit,
}: LatestTaskWithLimits): Promise<LatestOrMostPayingTaskType[]> => {
  let tasks = await DB.select({
    id: TaskTable.id,
    title: TaskTable.title,
    participants: TaskTable.participants,
    prizeAmount: TaskTable.prizeAmount,
    expiryTime: TaskTable.expiryTime,
  })
    .from(TaskTable)
    .where(
      and(
        eq(TaskTable.isCompleted, false),
        gt(TaskTable.expiryTime, sql`NOW()`)
      )
    )
    .limit(limit)
    .orderBy(desc(TaskTable.createdAt));

  const updatedTasks = tasks.map((task) => {
    return {
      ...task,
      participants: task.participants?.length || 0,
    };
  }) as LatestOrMostPayingTaskType[];

  return updatedTasks;
};

const getHighestPayingTaskWithLimit = async ({
  limit,
}: LatestTaskWithLimits): Promise<LatestOrMostPayingTaskType[]> => {
  let tasks = await DB.select({
    id: TaskTable.id,
    title: TaskTable.title,
    participants: TaskTable.participants,
    prizeAmount: TaskTable.prizeAmount,
    expiryTime: TaskTable.expiryTime,
  })
    .from(TaskTable)
    .where(
      and(
        eq(TaskTable.isCompleted, false),
        gt(TaskTable.expiryTime, sql`NOW()`)
      )
    )
    .limit(limit)
    .orderBy(desc(TaskTable.prizeAmount));

  const updatedTasks = tasks.map((task) => {
    return {
      ...task,
      participants: task.participants?.length || 0,
    };
  }) as LatestOrMostPayingTaskType[];

  return updatedTasks;
};

const getFilteredTasks = async ({
  category,
  pageNo,
  sort,
  limit,
}: FilterTasksType): Promise<LatestOrMostPayingTaskType[]> => {
   
   let sortConf;

   switch(sort){
    case "highest-paying":
        sortConf = desc(TaskTable.prizeAmount);
        break;
    case "lowest-paying":
        sortConf = asc(TaskTable.prizeAmount);
        break;
    case "latest":
        sortConf = desc(TaskTable.createdAt);
        break;
    default: // Oldest
        sortConf = asc(TaskTable.createdAt);
   }

  let tasks = await DB.select({
    id: TaskTable.id,
    title: TaskTable.title,
    participants: TaskTable.participants,
    prizeAmount: TaskTable.prizeAmount,
    expiryTime: TaskTable.expiryTime,
  })
    .from(TaskTable)
    .where(
      and(
        eq(TaskTable.isCompleted, false),
        eq(TaskTable.category, category),
        gt(TaskTable.expiryTime, sql`NOW()`)
      )
    )
    .offset(limit * (pageNo - 1))
    .limit(limit)
    .orderBy(sortConf);

  const updatedTasks = tasks.map((task) => {
    return {
      ...task,
      participants: task.participants?.length || 0,
    };
  }) as LatestOrMostPayingTaskType[];

  return updatedTasks;
};

export { getLatestTaskWithLimit, getHighestPayingTaskWithLimit, getFilteredTasks };
