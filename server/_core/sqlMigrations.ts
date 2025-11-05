import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";

/**
 * Run SQL migrations directly without drizzle-kit
 * This is more reliable for serverless environments like Vercel
 */
export async function runSQLMigrations() {
  try {
    if (!process.env.DATABASE_URL) {
      console.log("[SQL Migrations] DATABASE_URL not set, skipping migrations");
      return false;
    }

    console.log("[SQL Migrations] Starting database migrations...");

    // Parse DATABASE_URL
    const url = new URL(process.env.DATABASE_URL);
    const config = {
      host: url.hostname,
      port: parseInt(url.port || "3306"),
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1),
      waitForConnections: true,
      connectionLimit: 1,
      queueLimit: 0,
      ssl: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    };

    // Create connection
    let connection;
    try {
      connection = await mysql.createConnection(config);
    } catch (error: any) {
      // If SSL fails, try without it (for local development)
      if (
        error.code === "PROTOCOL_CONNECTION_LOST" ||
        error.code === "ER_UNKNOWN_ERROR"
      ) {
        console.log("[SQL Migrations] Retrying without SSL...");
        const configNoSSL = { ...config, ssl: undefined };
        connection = await mysql.createConnection(configNoSSL);
      } else {
        throw error;
      }
    }

    try {
      // Get list of migration files
      const migrationsDir = path.join(process.cwd(), "drizzle");
      const files = fs
        .readdirSync(migrationsDir)
        .filter(f => f.endsWith(".sql"))
        .sort();

      console.log(`[SQL Migrations] Found ${files.length} migration files`);

      // Create migrations tracking table if it doesn't exist
      await connection.execute(
        `
        CREATE TABLE IF NOT EXISTS __drizzle_migrations (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE,
          executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      ` as any
      );

      // Get already executed migrations
      const [executed] = await connection.execute(
        "SELECT name FROM __drizzle_migrations"
      );
      const executedNames = new Set(
        (executed as any[]).map((row: any) => row.name)
      );

      // Run pending migrations
      let executedCount = 0;
      for (const file of files) {
        if (executedNames.has(file)) {
          console.log(`[SQL Migrations] ✓ Already executed: ${file}`);
          continue;
        }

        const filePath = path.join(migrationsDir, file);
        const sql = fs.readFileSync(filePath, "utf-8");

        try {
          // Split by semicolon and execute each statement
          const statements = sql
            .split(";")
            .map(s => s.trim())
            .filter(s => s.length > 0);

          for (const statement of statements) {
            await connection.execute(statement as any);
          }

          // Record migration as executed
          await connection.execute(
            "INSERT INTO __drizzle_migrations (name) VALUES (?)" as any,
            [file]
          );

          console.log(`[SQL Migrations] ✓ Executed: ${file}`);
          executedCount++;
        } catch (error) {
          console.error(`[SQL Migrations] ✗ Failed to execute ${file}:`, error);
          throw error;
        }
      }

      console.log(
        `[SQL Migrations] ✓ Successfully executed ${executedCount} new migrations`
      );
      return true;
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error("[SQL Migrations] ✗ Failed to run migrations:", error);
    // Don't throw - allow server to start even if migrations fail
    return false;
  }
}
