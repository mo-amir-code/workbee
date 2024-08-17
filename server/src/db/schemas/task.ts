import {
  pgTable,
  uuid,
  varchar,
  pgEnum,
  boolean,
  timestamp,
  serial,
  integer,
} from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { UserTable, CategoryTable, TaskSubmitTable } from "./index.js";

export const statusEnum = pgEnum("status", ["draft", "published"]);

export const TaskTable = pgTable("task", {
  id: serial("id").primaryKey(),
  solanaTaskId: varchar("solana_task_id", { length: 255 }),
  user: uuid("user_id")
    .references(() => UserTable.id)
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  category: integer("category_id").references(() => CategoryTable.id),
  participants: integer("participants")
    .array()
    .references(() => UserTable.id),
  prizeAmount: integer("prize_amount"),
  isCompleted: boolean("is_completed").notNull().default(false),
  status: statusEnum("status").notNull().default("draft"),
  completer: integer("completer").references(() => UserTable.id),
  expiryTime: timestamp("expiry_time"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const tasksRelations = relations(TaskTable, ({ one, many }) => ({
  user: one(UserTable, {
    fields: [TaskTable.user],
    references: [UserTable.id],
  }),
  category: one(CategoryTable, {
    fields: [TaskTable.category],
    references: [CategoryTable.id],
  }),
  completer: one(UserTable, {
    fields: [TaskTable.completer],
    references: [UserTable.id],
  }),
  taskSubmissions: many(TaskSubmitTable),
  participants: many(UserTable),
}));

export type Task = InferSelectModel<typeof TaskTable>;
