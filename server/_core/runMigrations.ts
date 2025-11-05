import "dotenv/config";
import { execSync } from "child_process";

/**
 * Run database migrations on server startup
 * This ensures the database schema is always up-to-date
 */
export async function runMigrations() {
  try {
    console.log("[Migrations] Starting database migrations...");

    // Skip migrations if DATABASE_URL is not set
    if (!process.env.DATABASE_URL) {
      console.log("[Migrations] DATABASE_URL not set, skipping migrations");
      return false;
    }

    // Run drizzle migrations using pnpm
    execSync("pnpm exec drizzle-kit migrate", {
      stdio: "inherit",
      env: { ...process.env },
      cwd: process.cwd(),
    });

    console.log("[Migrations] ✓ Database migrations completed successfully!");
    return true;
  } catch (error) {
    console.error("[Migrations] ✗ Failed to run migrations:", error);
    // Don't throw - allow server to start even if migrations fail
    // This prevents deployment from failing
    return false;
  }
}
