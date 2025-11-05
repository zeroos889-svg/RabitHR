/**
 * Advanced Error Handling & Logging System
 */

import type { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  code?: string;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    code?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, true, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication failed") {
    super(message, 401, true, "AUTHENTICATION_ERROR");
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = "Access denied") {
    super(message, 403, true, "AUTHORIZATION_ERROR");
    this.name = "AuthorizationError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`, 404, true, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, true, "CONFLICT_ERROR");
    this.name = "ConflictError";
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = "Too many requests") {
    super(message, 429, true, "RATE_LIMIT_ERROR");
    this.name = "RateLimitError";
  }
}

/**
 * Error logger
 */
function logError(error: Error, req?: Request) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    request: req
      ? {
          method: req.method,
          url: req.url,
          ip: req.ip,
          userAgent: req.get("user-agent"),
        }
      : undefined,
  };

  console.error("[ERROR]", JSON.stringify(logEntry, null, 2));

  // TODO: Send to external logging service (e.g., Sentry, LogRocket)
  // if (process.env.NODE_ENV === 'production') {
  //   Sentry.captureException(error);
  // }
}

/**
 * Development error response
 */
function sendErrorDev(err: any, req: Request, res: Response) {
  res.status(err.statusCode || 500).json({
    status: "error",
    error: err,
    message: err.message,
    stack: err.stack,
    request: {
      method: req.method,
      url: req.url,
      body: req.body,
      params: req.params,
      query: req.query,
    },
  });
}

/**
 * Production error response
 */
function sendErrorProd(err: any, req: Request, res: Response) {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      status: "error",
      code: err.code,
      message: err.message,
    });
  } else {
    // Programming or unknown error: don't leak error details
    console.error("ERROR 💥", err);

    res.status(500).json({
      status: "error",
      code: "INTERNAL_ERROR",
      message: "Something went wrong. Please try again later.",
    });
  }
}

/**
 * Global error handler middleware
 */
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Log error
  logError(err, req);

  // Send response based on environment
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else {
    sendErrorProd(err, req, res);
  }
}

/**
 * Async error wrapper
 * Wraps async route handlers to catch errors automatically
 */
export function asyncHandler(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Handle unhandled promise rejections
 */
export function handleUnhandledRejection() {
  process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    logError(reason);

    // Exit with error (let process manager restart)
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  });
}

/**
 * Handle uncaught exceptions
 */
export function handleUncaughtException() {
  process.on("uncaughtException", (error: Error) => {
    console.error("Uncaught Exception:", error);
    logError(error);

    // Exit with error
    process.exit(1);
  });
}

/**
 * Graceful shutdown handler
 */
export function setupGracefulShutdown(server: any) {
  const shutdown = (signal: string) => {
    console.log(`\n${signal} received. Starting graceful shutdown...`);

    server.close((err: any) => {
      if (err) {
        console.error("Error during shutdown:", err);
        process.exit(1);
      }

      console.log("Server closed. Process exiting...");
      process.exit(0);
    });

    // Force shutdown after 30 seconds
    setTimeout(() => {
      console.error("Forced shutdown after timeout");
      process.exit(1);
    }, 30000);
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

/**
 * Initialize error handling
 */
export function initializeErrorHandling(server?: any) {
  handleUncaughtException();
  handleUnhandledRejection();

  if (server) {
    setupGracefulShutdown(server);
  }
}
