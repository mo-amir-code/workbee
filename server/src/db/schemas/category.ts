import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { TaskTable } from "./index.js";

export const CategoryTable = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const categoryRelations = relations(CategoryTable, ({ many }) => ({
  tasks: many(TaskTable),
}));

export type Category = InferSelectModel<typeof CategoryTable>;
