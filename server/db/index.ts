/**
 * Database Connection Module
 * Manages singleton database connection with automatic retry logic
 */

import { drizzle } from "drizzle-orm/mysql2";
import { logger } from "../_core/logger";

/**
 * Database Configuration Constants
 */
const MAX_CONNECTION_ATTEMPTS = 3;
const CONNECTION_RETRY_DELAY_MS = 1000;

/**
 * Singleton database instance
 * @private
 */
let _db: ReturnType<typeof drizzle> | null = null;

/**
 * Counter for tracking database connection attempts
 * @private
 */
let _connectionAttempts = 0;

/**
 * Get or create database connection instance with automatic retry logic
 * Optimized for Railway MySQL database with exponential backoff
 *
 * @returns {Promise<ReturnType<typeof drizzle> | null>} Database instance or null if connection fails
 * @throws Never throws - returns null on failure after max attempts
 *
 * @example
 * const db = await getDb();
 * if (!db) {
 *   throw new Error("Database unavailable");
 * }
 */
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
      _connectionAttempts = 0;
      logger.info("Connected successfully to Railway database", {
        context: "Database",
      });
    } catch (error) {
      _connectionAttempts++;
      logger.warn(
        `Connection attempt ${_connectionAttempts}/${MAX_CONNECTION_ATTEMPTS} failed`,
        {
          context: "Database",
          error:
            error instanceof Error
              ? {
                  name: error.name,
                  message: error.message,
                }
              : undefined,
        }
      );

      if (_connectionAttempts < MAX_CONNECTION_ATTEMPTS) {
        // Exponential backoff: wait 1s, 2s, 3s between attempts
        const delay = CONNECTION_RETRY_DELAY_MS * _connectionAttempts;
        logger.info(`Retrying database connection in ${delay}ms...`, {
          context: "Database",
        });

        await new Promise((resolve) => setTimeout(resolve, delay));
        return getDb();
      }

      _db = null;
      logger.error("Max connection attempts reached. Database unavailable", {
        context: "Database",
      });
    }
  }
  return _db;
}

// Re-export all database functions from their respective modules
export * from "./users";
export * from "./consultants";
export * from "./documents";
export * from "./packages";
export * from "./notifications";
export * from "./discounts";
export * from "./analytics";
