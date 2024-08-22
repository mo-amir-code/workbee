import {
  pgTable,
  varchar,
  boolean,
  pgEnum,
  serial,
  integer,
} from "drizzle-orm/pg-core";
import { UserTable } from "./user.js";
import { InferSelectModel, relations } from "drizzle-orm";

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const AuthTable = pgTable("auth", {
  id: serial("id").primaryKey(),
  user: integer("user")
    .references(() => UserTable.id)
    .notNull(),
  role: roleEnum("role").notNull().default("user"),
  verified: boolean("verified").notNull().default(false),
  refreshToken: varchar("refreshToken", { length: 255 }),
  otp: varchar("otp", { length: 255 }),
  otpToken: varchar("otpToken", { length: 255 }),
});

export const authRelations = relations(AuthTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [AuthTable.user],
    references: [UserTable.id],
  }),
}));

export type Auth = InferSelectModel<typeof AuthTable>;
