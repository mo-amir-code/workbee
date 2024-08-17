import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { TaskTable } from "./index.js";

export const CategoryTable = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
});

export const categoryRelations = relations(CategoryTable, ({ many }) => ({
  tasks: many(TaskTable),
}));

export type Category = InferSelectModel<typeof CategoryTable>;
