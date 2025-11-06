/**
 * Redis Client Configuration
 * عميل Redis الرسمي للاتصال بـ Vercel Storage
 */

import { createClient } from "redis";
import { logger } from "./logger";

export const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on("error", err =>
  logger.error("Redis Client Error", { context: "Redis", error: err })
);

export const connectRedis = async () => {
  if (!redis.isOpen) {
    await redis.connect();
    logger.info("Redis connected successfully", { context: "Redis" });
  }
};

/**
 * اختبار اتصال Redis
 * Test Redis connectivity
 */
export const testRedisConnection = async () => {
  try {
    await redis.set("test_key", "alive");
    const value = await redis.get("test_key");
    logger.debug("Redis test completed", {
      context: "Redis",
      testValue: value,
    });
    return value === "alive";
  } catch (error) {
    logger.error("Redis test failed", { context: "Redis", error });
    return false;
  }
};

/**
 * إغلاق اتصال Redis
 * Disconnect Redis client
 */
export const disconnectRedis = async () => {
  if (redis.isOpen) {
    await redis.quit();
    logger.info("Redis disconnected", { context: "Redis" });
  }
};
