import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import "dotenv/config";
// migrate the database
async function runMigration() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL not set");
  const connection = postgres(process.env.DATABASE_URL);
  const database = drizzle(connection);
  console.log("⌛️Running migration...");
  const start = Date.now();
  await migrate(database, { migrationsFolder: "drizzle" });
  const end = Date.now();
  console.log(`✅Migration complete in ${end - start}ms`);
  process.exit(0);
}
runMigration().catch((error) => {
  console.error(" ❌ Migration failed");
  console.error(error);
  process.exit(1);
});
