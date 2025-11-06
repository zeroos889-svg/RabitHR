/**
 * Redis Client Configuration
 * عميل Redis الرسمي للاتصال بـ Vercel Storage
 */

import { createClient } from "redis";

export const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on("error", err => console.error("❌ Redis Client Error:", err));

export const connectRedis = async () => {
  if (!redis.isOpen) {
    await redis.connect();
    console.log("✅ Redis connected successfully");
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
    console.log("🟢 Redis test value:", value);
    return value === "alive";
  } catch (error) {
    console.error("❌ Redis test failed:", error);
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
    console.log("✅ Redis disconnected");
  }
};
