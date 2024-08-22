import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { TaskTable, UserTable } from "./index.js";

export const UserSavedTaskTable = pgTable("userSavedTask", {
  id: serial("id").primaryKey(),
  user: integer("user")
    .references(() => UserTable.id)
    .notNull(),
  tasks: integer("tasks").array().default([]),
});

export const userSavedTaskRelations = relations(
  UserSavedTaskTable,
  ({ one, many }) => ({
    user: one(UserTable, {
      fields: [UserSavedTaskTable.user],
      references: [UserTable.id],
    }),
    tasks: many(TaskTable),
  })
);

export type UserSavedTask = InferSelectModel<typeof UserSavedTaskTable>;
