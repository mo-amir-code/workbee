import {
  pgTable,
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
  solanaTaskId: varchar("solanaTaskId", { length: 255 }),
  user: integer("user")
    .references(() => UserTable.id)
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  category: integer("category").references(() => CategoryTable.id).notNull(),
  participants: integer("participants")
    .array().default([]),
  prizeAmount: integer("prizeAmount").notNull(),
  isCompleted: boolean("isCompleted").notNull().default(false),
  status: statusEnum("status").notNull(),
  completer: integer("completer").references(() => UserTable.id),
  expiryTime: timestamp("expiryTime").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
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
