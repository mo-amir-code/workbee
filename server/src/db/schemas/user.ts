import {
  pgTable,
  varchar,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { AuthTable, TaskTable, TaskSubmitTable, UserSavedTaskTable } from "./index.js";

export const UserTable = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const usersRelations = relations(UserTable, ({ one, many }) => ({
  auth: one(AuthTable, {
    fields: [UserTable.id],
    references: [AuthTable.user],
  }),
  tasks: many(TaskTable),
  taskSubmissions: many(TaskSubmitTable),
  completedTasks: many(TaskTable),
  savedTasks: many(UserSavedTaskTable),
}));

export type User = InferSelectModel<typeof UserTable>;
