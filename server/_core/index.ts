// Load environment variables early with explicit dev support
import dotenv from "dotenv";
const envFile =
  process.env.NODE_ENV === "development" ? ".env.development" : ".env";
dotenv.config({ path: envFile });
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerAuthRoutes } from "./auth";
import { checkEnv } from "./env";
import cookieParser from "cookie-parser";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { runSQLMigrations } from "./sqlMigrations";
import { runEmbeddedMigrations } from "./embeddedMigrations";
import mysql from "mysql2/promise";

/**
 * Check if a port is available for use
 * @param port - Port number to check
 * @returns Promise resolving to true if port is available
 */
function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

/**
 * Find an available port starting from a given port number
 * @param startPort - Starting port number (default: 3000)
 * @returns Promise resolving to an available port number
 * @throws {Error} If no available port found in range
 */
async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

/**
 * Initialize and start the Express server
 * Sets up middleware, runs migrations, and starts listening on available port
 * @throws {Error} If migrations fail or server cannot start
 */
async function startServer() {
  // Check environment variables
  checkEnv();

  // Run database migrations on startup (can be disabled via env)
  try {
    const migrationsEnabled = process.env.DB_MIGRATIONS_ENABLED !== "false";
    if (!migrationsEnabled) {
      console.log(
        "[Server] Skipping DB migrations (DB_MIGRATIONS_ENABLED=false)"
      );
    }

    if (migrationsEnabled && process.env.DATABASE_URL) {
      const url = new URL(process.env.DATABASE_URL);
      const connection = await mysql.createConnection({
        host: url.hostname,
        port: parseInt(url.port || "3306"),
        user: url.username,
        password: url.password,
        database: url.pathname.slice(1),
        ssl: {
          rejectUnauthorized: false,
        },
      });
      await runEmbeddedMigrations(connection);
      await connection.end();
    }
  } catch (error) {
    console.error("[Server] Failed to run migrations:", error);
  }

  const app = express();
  const server = createServer(app);

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(cookieParser());

  // Authentication routes
  registerAuthRoutes(app);
  // Health check endpoint for load balancers/platforms
  app.get("/healthz", (_req, res) => {
    res.status(200).json({ ok: true });
  });
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
