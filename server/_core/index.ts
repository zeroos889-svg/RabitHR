import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerAuthRoutes } from "./auth";
import { checkEnv } from "./env";
// @ts-ignore - No type definitions available
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { apiLimiter, authLimiter } from "./rateLimit";
import { doubleSubmitCsrfProtection } from "./csrf";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { runEmbeddedMigrations } from "./embeddedMigrations";
import { simpleHealthCheck } from "./healthCheck";
import { errorHandler, initializeErrorHandling } from "./errorHandler";
import mysql from "mysql2/promise";
import { connectRedis, testRedisConnection } from "./redisClient.js";

/**
 * Get port from environment or use default
 * Railway and other cloud platforms set PORT environment variable
 */
function getPort(): number {
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  if (isNaN(port) || port < 1 || port > 65535) {
    console.warn(`Invalid PORT value: ${process.env.PORT}, using default 3000`);
    return 3000;
  }

  return port;
}

async function startServer() {
  // Check environment variables
  checkEnv();

  // Initialize Redis connection
  try {
    if (process.env.REDIS_URL) {
      await connectRedis();
      await testRedisConnection();
    } else {
      console.warn(
        "⚠️  REDIS_URL not configured, skipping Redis initialization"
      );
    }
  } catch (error) {
    console.error("[Server] Failed to connect to Redis:", error);
    console.warn("⚠️  Server will continue without Redis caching");
  }

  // Run database migrations on startup
  try {
    if (process.env.DATABASE_URL) {
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

  // Initialize error handling (uncaught exceptions, unhandled rejections, graceful shutdown)
  initializeErrorHandling(server);

  // Request Logging
  const logFormat =
    process.env.NODE_ENV === "production"
      ? "combined" // Apache combined log format for production
      : "dev"; // Colorful and concise for development

  app.use(morgan(logFormat));

  // Security Headers - Helmet
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'none'"],
        },
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
    })
  );

  // Response Compression
  app.use(
    compression({
      level: 6, // Compression level (0-9)
      threshold: 1024, // Only compress responses larger than 1KB
    })
  );

  // Rate Limiting - General API
  app.use("/api/", apiLimiter);

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(cookieParser());

  // Health Check Endpoint (for Railway and load balancers)
  app.get("/health", async (req, res) => {
    try {
      const isHealthy = await simpleHealthCheck();
      if (isHealthy) {
        res
          .status(200)
          .json({ status: "ok", timestamp: new Date().toISOString() });
      } else {
        res
          .status(503)
          .json({ status: "error", message: "Database connection failed" });
      }
    } catch (error) {
      res.status(503).json({ status: "error", message: "Health check failed" });
    }
  });

  // Redis Health Check Endpoint
  app.get("/health/redis", async (req, res) => {
    try {
      const isRedisHealthy = await testRedisConnection();
      if (isRedisHealthy) {
        res.status(200).json({
          status: "ok",
          message: "Redis is healthy",
          timestamp: new Date().toISOString(),
        });
      } else {
        res
          .status(503)
          .json({ status: "error", message: "Redis connection failed" });
      }
    } catch (error) {
      res.status(503).json({
        status: "error",
        message: "Redis health check failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // CSRF Protection for all routes
  app.use(doubleSubmitCsrfProtection);

  // Authentication routes with strict rate limiting
  registerAuthRoutes(app, authLimiter);

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

  // Global Error Handler Middleware (must be last)
  app.use(errorHandler);

  // Get port from environment (Railway sets this automatically)
  const port = getPort();

  server.listen(port, "0.0.0.0", () => {
    const env = process.env.NODE_ENV || "development";
    console.log(`[${env}] Server running on http://0.0.0.0:${port}/`);
    console.log(
      `[${env}] Health check available at http://0.0.0.0:${port}/health`
    );
  });

  return app;
}

// Start server for local development or Docker
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  startServer().catch(console.error);
}

// Export for Vercel serverless
export default startServer;
