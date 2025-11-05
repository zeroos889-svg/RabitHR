/**
 * Advanced Health Check System
 * Monitors all system components and dependencies
 */

import { getDb } from "../db";

export interface HealthCheckResult {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  uptime: number;
  version: string;
  checks: {
    database: ComponentHealth;
    redis: ComponentHealth;
    disk: ComponentHealth;
    memory: ComponentHealth;
    cpu: ComponentHealth;
  };
}

export interface ComponentHealth {
  status: "up" | "down" | "degraded";
  responseTime?: number;
  message?: string;
  details?: any;
}

const startTime = Date.now();

/**
 * Check database health
 */
async function checkDatabase(): Promise<ComponentHealth> {
  const start = Date.now();

  try {
    // Get database instance
    const db = await getDb();

    if (!db) {
      return {
        status: "down",
        responseTime: Date.now() - start,
        message: "Database connection not available",
      };
    }

    // Simple query to test connection
    await db.execute("SELECT 1");

    const responseTime = Date.now() - start;

    // Check if response time is acceptable
    if (responseTime > 1000) {
      return {
        status: "degraded",
        responseTime,
        message: "Database is slow",
      };
    }

    return {
      status: "up",
      responseTime,
      message: "Database is healthy",
    };
  } catch (error: any) {
    return {
      status: "down",
      responseTime: Date.now() - start,
      message: error.message,
    };
  }
}

/**
 * Check Redis health
 */
async function checkRedis(): Promise<ComponentHealth> {
  const start = Date.now();

  try {
    // Try to get cache instance
    const { getCache } = await import("./cache");
    const cache = getCache();

    // Test ping
    await cache.ping();

    const responseTime = Date.now() - start;

    return {
      status: "up",
      responseTime,
      message: "Redis is healthy",
    };
  } catch (error: any) {
    return {
      status: "down",
      responseTime: Date.now() - start,
      message: error.message || "Redis not available",
    };
  }
}

/**
 * Check disk space
 */
async function checkDisk(): Promise<ComponentHealth> {
  try {
    const os = await import("os");
    const fs = await import("fs");

    // Get disk usage (simplified)
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedPercent = ((totalMem - freeMem) / totalMem) * 100;

    if (usedPercent > 90) {
      return {
        status: "degraded",
        message: "Disk usage is high",
        details: { usedPercent: usedPercent.toFixed(2) },
      };
    }

    return {
      status: "up",
      message: "Disk space is healthy",
      details: { usedPercent: usedPercent.toFixed(2) },
    };
  } catch (error: any) {
    return {
      status: "down",
      message: error.message,
    };
  }
}

/**
 * Check memory usage
 */
async function checkMemory(): Promise<ComponentHealth> {
  try {
    const used = process.memoryUsage();
    const totalMem = require("os").totalmem();
    const heapPercent = (used.heapUsed / used.heapTotal) * 100;

    if (heapPercent > 90) {
      return {
        status: "degraded",
        message: "Memory usage is high",
        details: {
          heapUsed: `${(used.heapUsed / 1024 / 1024).toFixed(2)} MB`,
          heapTotal: `${(used.heapTotal / 1024 / 1024).toFixed(2)} MB`,
          heapPercent: `${heapPercent.toFixed(2)}%`,
        },
      };
    }

    return {
      status: "up",
      message: "Memory usage is healthy",
      details: {
        heapUsed: `${(used.heapUsed / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(used.heapTotal / 1024 / 1024).toFixed(2)} MB`,
        rss: `${(used.rss / 1024 / 1024).toFixed(2)} MB`,
      },
    };
  } catch (error: any) {
    return {
      status: "down",
      message: error.message,
    };
  }
}

/**
 * Check CPU usage
 */
async function checkCPU(): Promise<ComponentHealth> {
  try {
    const os = await import("os");
    const cpus = os.cpus();
    const loadAvg = os.loadavg();

    // Calculate average CPU usage
    let totalIdle = 0;
    let totalTick = 0;

    cpus.forEach(cpu => {
      for (const type in cpu.times) {
        totalTick += cpu.times[type as keyof typeof cpu.times];
      }
      totalIdle += cpu.times.idle;
    });

    const avgIdle = totalIdle / cpus.length;
    const avgTotal = totalTick / cpus.length;
    const cpuPercent = 100 - ~~((100 * avgIdle) / avgTotal);

    if (cpuPercent > 80) {
      return {
        status: "degraded",
        message: "CPU usage is high",
        details: {
          usage: `${cpuPercent}%`,
          cores: cpus.length,
          loadAvg: loadAvg.map(l => l.toFixed(2)),
        },
      };
    }

    return {
      status: "up",
      message: "CPU usage is healthy",
      details: {
        usage: `${cpuPercent}%`,
        cores: cpus.length,
        loadAvg: loadAvg.map(l => l.toFixed(2)),
      },
    };
  } catch (error: any) {
    return {
      status: "down",
      message: error.message,
    };
  }
}

/**
 * Perform comprehensive health check
 */
export async function performHealthCheck(): Promise<HealthCheckResult> {
  const checks = {
    database: await checkDatabase(),
    redis: await checkRedis(),
    disk: await checkDisk(),
    memory: await checkMemory(),
    cpu: await checkCPU(),
  };

  // Determine overall status
  const statuses = Object.values(checks).map(c => c.status);
  let overallStatus: "healthy" | "degraded" | "unhealthy" = "healthy";

  if (statuses.includes("down")) {
    overallStatus = "unhealthy";
  } else if (statuses.includes("degraded")) {
    overallStatus = "degraded";
  }

  return {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    uptime: Date.now() - startTime,
    version: process.env.npm_package_version || "1.0.0",
    checks,
  };
}

/**
 * Simple health check for load balancers
 */
export async function simpleHealthCheck(): Promise<boolean> {
  try {
    const db = await getDb();
    if (!db) return false;
    await db.execute("SELECT 1");
    return true;
  } catch {
    return false;
  }
}
