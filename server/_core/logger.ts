/**
 * Structured Logging System for Production
 * Enterprise-grade logging with JSON format and log levels
 */

export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  data?: any;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
  request?: {
    method?: string;
    url?: string;
    ip?: string;
    userAgent?: string;
  };
}

class Logger {
  private isProduction = process.env.NODE_ENV === "production";
  private minLevel: LogLevel = this.isProduction ? "info" : "debug";

  private levelPriority: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    fatal: 4,
  };

  private shouldLog(level: LogLevel): boolean {
    return this.levelPriority[level] >= this.levelPriority[this.minLevel];
  }

  private formatLog(entry: LogEntry): string {
    if (this.isProduction) {
      // JSON format for production (structured logs)
      return JSON.stringify(entry);
    } else {
      // Human-readable format for development
      const time = new Date(entry.timestamp).toLocaleTimeString();
      const levelEmoji = {
        debug: "🔍",
        info: "ℹ️",
        warn: "⚠️",
        error: "❌",
        fatal: "💀",
      };

      let output = `${levelEmoji[entry.level]} [${time}] ${entry.level.toUpperCase()}`;

      if (entry.context) {
        output += ` [${entry.context}]`;
      }

      output += `: ${entry.message}`;

      if (entry.data) {
        output += `\n  Data: ${JSON.stringify(entry.data, null, 2)}`;
      }

      if (entry.error) {
        output += `\n  Error: ${entry.error.message}`;
        if (entry.error.stack) {
          output += `\n${entry.error.stack}`;
        }
      }

      return output;
    }
  }

  private log(
    level: LogLevel,
    message: string,
    meta?: Partial<Omit<LogEntry, "timestamp" | "level" | "message">>
  ) {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...meta,
    };

    const formatted = this.formatLog(entry);

    // Output to appropriate stream
    if (level === "error" || level === "fatal") {
      console.error(formatted);
    } else if (level === "warn") {
      console.warn(formatted);
    } else {
      console.log(formatted);
    }

    // In production, you could send to external logging service here
    // if (this.isProduction && (level === "error" || level === "fatal")) {
    //   sendToSentry(entry);
    // }
  }

  debug(
    message: string,
    meta?: Partial<Omit<LogEntry, "timestamp" | "level" | "message">>
  ) {
    this.log("debug", message, meta);
  }

  info(
    message: string,
    meta?: Partial<Omit<LogEntry, "timestamp" | "level" | "message">>
  ) {
    this.log("info", message, meta);
  }

  warn(
    message: string,
    meta?: Partial<Omit<LogEntry, "timestamp" | "level" | "message">>
  ) {
    this.log("warn", message, meta);
  }

  error(
    message: string,
    meta?: Partial<Omit<LogEntry, "timestamp" | "level" | "message">>
  ) {
    this.log("error", message, meta);
  }

  fatal(
    message: string,
    meta?: Partial<Omit<LogEntry, "timestamp" | "level" | "message">>
  ) {
    this.log("fatal", message, meta);
  }

  // Helper for logging errors with full context
  logError(error: Error, context?: string, additionalData?: any) {
    this.error(error.message, {
      context,
      data: additionalData,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    });
  }

  // Helper for logging HTTP requests
  logRequest(
    method: string,
    url: string,
    statusCode: number,
    responseTime: number,
    ip?: string
  ) {
    const level =
      statusCode >= 500 ? "error" : statusCode >= 400 ? "warn" : "info";

    this.log(level, `${method} ${url} ${statusCode} - ${responseTime}ms`, {
      context: "HTTP",
      request: {
        method,
        url,
        ip,
      },
      data: {
        statusCode,
        responseTime,
      },
    });
  }
}

// Export singleton instance
export const logger = new Logger();

// Export for testing/advanced usage
export { Logger };
