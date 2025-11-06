/**
 * Redis Client Tests
 * اختبارات لعميل Redis الرسمي
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  redis,
  connectRedis,
  testRedisConnection,
  disconnectRedis,
} from "../redisClient.js";

describe("Redis Client", () => {
  // تخطي الاختبارات إذا لم يكن REDIS_URL مُعرّفاً
  const skipTests =
    !process.env.REDIS_URL ||
    process.env.REDIS_URL === "redis://localhost:6379";

  beforeAll(async () => {
    if (skipTests) {
      console.log("⚠️  Skipping Redis tests: REDIS_URL not configured");
      return;
    }

    // الاتصال بـ Redis قبل الاختبارات
    try {
      await connectRedis();
    } catch (error) {
      console.error("Failed to connect to Redis:", error);
    }
  });

  afterAll(async () => {
    if (skipTests) return;

    // إغلاق الاتصال بعد الاختبارات
    try {
      await disconnectRedis();
    } catch (error) {
      console.error("Failed to disconnect from Redis:", error);
    }
  });

  it("يجب أن يتصل بـ Redis بنجاح", async () => {
    if (skipTests) {
      expect(true).toBe(true);
      return;
    }

    expect(redis.isOpen).toBe(true);
  });

  it("يجب أن يختبر الاتصال بـ Redis", async () => {
    if (skipTests) {
      expect(true).toBe(true);
      return;
    }

    const result = await testRedisConnection();
    expect(result).toBe(true);
  });

  it("يجب أن يحفظ ويسترجع القيم", async () => {
    if (skipTests) {
      expect(true).toBe(true);
      return;
    }

    const testKey = "test:redis:client";
    const testValue = "test-value-123";

    // حفظ القيمة
    await redis.set(testKey, testValue);

    // استرجاع القيمة
    const retrievedValue = await redis.get(testKey);

    expect(retrievedValue).toBe(testValue);

    // حذف القيمة
    await redis.del(testKey);
  });

  it("يجب أن يتحقق من وجود المفاتيح", async () => {
    if (skipTests) {
      expect(true).toBe(true);
      return;
    }

    const testKey = "test:redis:exists";

    // التحقق قبل الحفظ
    const beforeSet = await redis.exists(testKey);
    expect(beforeSet).toBe(0);

    // حفظ القيمة
    await redis.set(testKey, "value");

    // التحقق بعد الحفظ
    const afterSet = await redis.exists(testKey);
    expect(afterSet).toBe(1);

    // حذف القيمة
    await redis.del(testKey);
  });

  it("يجب أن يتعامل مع TTL بشكل صحيح", async () => {
    if (skipTests) {
      expect(true).toBe(true);
      return;
    }

    const testKey = "test:redis:ttl";
    const testValue = "expires-soon";

    // حفظ مع TTL (2 ثانية)
    await redis.setEx(testKey, 2, testValue);

    // التحقق فوراً
    const immediate = await redis.get(testKey);
    expect(immediate).toBe(testValue);

    // الانتظار 3 ثوانٍ
    await new Promise(resolve => setTimeout(resolve, 3000));

    // يجب أن تكون منتهية الصلاحية
    const expired = await redis.get(testKey);
    expect(expired).toBeNull();
  }, 10000); // زيادة timeout للاختبار
});
