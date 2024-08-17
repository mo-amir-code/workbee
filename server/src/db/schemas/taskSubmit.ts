import {
  pgTable,
  varchar,
  pgEnum,
  timestamp,
  serial,
  integer,
} from "drizzle-orm/pg-core";
import { UserTable } from "./user.js";
import { TaskTable } from "./task.js";
import { InferSelectModel, relations } from "drizzle-orm";

export const taskSubmitStatusEnum = pgEnum("status", [
  "pending",
  "accepted",
  "rejected",
  "inProgress",
]);

export const TaskSubmitTable = pgTable("taskSubmit", {
  id: serial("id").primaryKey(),
  user: integer("user_id")
    .references(() => UserTable.id)
    .notNull(),
  task: integer("task_id")
    .references(() => TaskTable.id)
    .notNull(),
  coverLetter: varchar("cover_letter", { length: 255 }).notNull(),
  credentials: varchar("credentials").notNull(),
  status: taskSubmitStatusEnum("status").notNull().default("pending"),
  solanaWalletAddress: varchar("solana_wallet_address", {
    length: 255,
  }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const taskSubmitRelations = relations(TaskSubmitTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [TaskSubmitTable.user],
    references: [UserTable.id],
  }),
  task: one(TaskTable, {
    fields: [TaskSubmitTable.task],
    references: [TaskTable.id],
  }),
}));


export type TaskSubmit = InferSelectModel<typeof TaskSubmitTable>;
