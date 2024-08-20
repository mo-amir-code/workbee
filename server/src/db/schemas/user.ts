import {
  pgTable,
  varchar,
  timestamp,
  serial,
  integer,
} from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { AuthTable, TaskTable, TaskSubmitTable } from "./index.js";

export const UserTable = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  savedTask: integer("savedTask").array(),
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
  savedTasks: many(TaskTable),
  taskSubmissions: many(TaskSubmitTable),
  completedTasks: many(TaskTable),
}));

export type User = InferSelectModel<typeof UserTable>;
