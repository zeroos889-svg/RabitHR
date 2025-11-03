import "dotenv/config";
import { execSync } from "child_process";

/**
 * Run database migrations on server startup
 * This ensures the database schema is always up-to-date
 */
export async function runMigrations() {
  try {
    console.log("[Migrations] Starting database migrations...");
    
    // Run drizzle migrations
    execSync("drizzle-kit migrate", {
      stdio: "inherit",
      env: { ...process.env },
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
