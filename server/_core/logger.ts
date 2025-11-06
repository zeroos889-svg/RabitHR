/**
 * Winston-based Logging System for Production
 * Enterprise-grade logging with file storage, rotation, and structured logs
 *
 * Features:
 * - Winston logger with multiple transports
 * - File rotation and management
 * - JSON structured logging
 * - Development-friendly console output
 * - Configurable via environment variables
 * - Integration with external services (Sentry, etc.)
 */

import winston from "winston";
import path from "path";
import fs from "fs";

// Ensure logs directory exists
const logsDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Custom format for development (colorized and readable)
const devFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, context, ...meta }) => {
    const levelEmojis: Record<string, string> = {
      debug: "🔍",
      info: "ℹ️",
      warn: "⚠️",
      error: "❌",
      fatal: "💀",
    };

    let output = `${levelEmojis[level] || "📝"} [${timestamp}] ${level.toUpperCase()}`;

    if (context) {
      output += ` [${context}]`;
    }

    output += `: ${message}`;

    // Add metadata if present
    const metaKeys = Object.keys(meta);
    if (
      metaKeys.length > 0 &&
      metaKeys.some(k => k !== "timestamp" && k !== "level")
    ) {
      const cleanMeta = { ...meta };
      delete cleanMeta.timestamp;
      delete cleanMeta.level;
      if (Object.keys(cleanMeta).length > 0) {
        output += `\n  ${JSON.stringify(cleanMeta, null, 2)}`;
      }
    }

    return output;
  })
);

// Custom format for production (JSON with full metadata)
const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Determine environment
const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = !isProduction;

// Configure transports
const transports: winston.transport[] = [
  // Console transport (always enabled)
  new winston.transports.Console({
    format: isDevelopment
      ? winston.format.combine(winston.format.colorize(), devFormat)
      : prodFormat,
  }),
];

// File transports (production only or when explicitly enabled)
if (isProduction || process.env.ENABLE_FILE_LOGGING === "true") {
  transports.push(
    // Error log file
    new winston.transports.File({
      filename: path.join(logsDir, "error.log"),
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      format: prodFormat,
    }),
    // Combined log file
    new winston.transports.File({
      filename: path.join(logsDir, "combined.log"),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      format: prodFormat,
    })
  );
}

// Create Winston logger instance
const winstonLogger = winston.createLogger({
  level: process.env.LOG_LEVEL || (isDevelopment ? "debug" : "info"),
  format: prodFormat,
  transports,
  exitOnError: false,
});

// Custom Logger class wrapping Winston
class Logger {
  private winston = winstonLogger;

  private formatMeta(meta?: any): any {
    if (!meta) return {};

    // Handle Error objects
    if (meta.error instanceof Error) {
      return {
        ...meta,
        error: {
          name: meta.error.name,
          message: meta.error.message,
          stack: meta.error.stack,
        },
      };
    }

    return meta;
  }

  // Logging methods
  debug(message: string, meta?: any) {
    this.winston.debug(message, this.formatMeta(meta));
  }

  info(message: string, meta?: any) {
    this.winston.info(message, this.formatMeta(meta));
  }

  warn(message: string, meta?: any) {
    this.winston.warn(message, this.formatMeta(meta));
  }

  error(message: string, meta?: any) {
    this.winston.error(message, this.formatMeta(meta));
  }

  fatal(message: string, meta?: any) {
    // Winston doesn't have 'fatal' level by default, use error with fatal flag
    this.winston.error(message, { ...this.formatMeta(meta), fatal: true });
  }

  // Helper for logging errors with full context
  logError(error: Error, context?: string, additionalData?: any) {
    this.error(error.message, {
      context,
      error,
      ...additionalData,
    });
  }

  // Helper for logging HTTP requests
  logRequest(
    method: string,
    url: string,
    statusCode: number,
    responseTime: number,
    ip?: string,
    userAgent?: string
  ) {
    const level =
      statusCode >= 500 ? "error" : statusCode >= 400 ? "warn" : "info";

    this.winston.log(
      level,
      `${method} ${url} ${statusCode} - ${responseTime}ms`,
      {
        context: "HTTP",
        request: {
          method,
          url,
          ip,
          userAgent,
        },
        statusCode,
        responseTime,
      }
    );
  }

  // HTTP middleware for logging requests
  middleware() {
    return (req: any, res: any, next: any) => {
      const start = Date.now();

      // Log when response finishes
      res.on("finish", () => {
        const duration = Date.now() - start;
        this.logRequest(
          req.method,
          req.originalUrl || req.url,
          res.statusCode,
          duration,
          req.ip || req.connection.remoteAddress,
          req.get("user-agent")
        );
      });

      next();
    };
  }

  // Graceful shutdown
  async close(): Promise<void> {
    return new Promise(resolve => {
      this.winston.on("finish", resolve);
      this.winston.end();
    });
  }

  // Get Winston instance for advanced usage
  getWinston() {
    return this.winston;
  }
}

// Export singleton instance
export const logger = new Logger();

// Export class for testing/advanced usage
export { Logger };

// Legacy compatibility - export winston instance directly
export const winstonInstance = winstonLogger;
