import { InferModel } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { nanoId } from "./types/nanoId";
export const song = pgTable("song", {
  id: nanoId("id").primaryKey(),
  name: text("title").notNull(),
  artist: text("artist")
    .notNull()
    .references(() => artist.id, { onDelete: "cascade" }),
  cover: text("cover").notNull(),
  file: text("file").notNull(),
});
export type Song = InferModel<typeof song>;
export const artist = pgTable("artist", {
  id: nanoId("id").primaryKey(),
  name: text("name").notNull(),
});
export type Artist = InferModel<typeof artist>;
