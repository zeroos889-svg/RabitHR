/**
 * Cache Manager Tests
 * اختبارات شاملة لـ Redis Cache Manager
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { CacheManager, CACHE_KEYS, CACHE_TTL } from "../cache";

describe("CacheManager", () => {
  let cache: CacheManager;

  beforeAll(() => {
    // إنشاء instance للاختبار
    cache = new CacheManager(CACHE_TTL.SHORT);
  });

  afterAll(async () => {
    // تنظيف وإغلاق الاتصال
    await cache.disconnect();
  });

  beforeEach(async () => {
    // تنظيف الـ cache قبل كل اختبار
    await cache.deletePattern("test:*");
  });

  describe("set و get", () => {
    it("يجب أن يحفظ ويسترجع القيم بشكل صحيح", async () => {
      const key = "test:simple";
      const value = { name: "محمد", age: 25 };

      await cache.set(key, value);
      const retrieved = await cache.get(key);

      expect(retrieved).toEqual(value);
    });

    it("يجب أن يُرجع null للقيم غير الموجودة", async () => {
      const result = await cache.get("test:nonexistent");
      expect(result).toBeNull();
    });

    it("يجب أن يحترم TTL المحدد", async () => {
      const key = "test:ttl";
      const value = { data: "test" };

      // حفظ مع TTL قصير جداً (1 ثانية)
      await cache.set(key, value, 1);

      // التحقق من وجود القيمة
      const immediate = await cache.get(key);
      expect(immediate).toEqual(value);

      // الانتظار 2 ثانية
      await new Promise(resolve => setTimeout(resolve, 2000));

      // يجب أن تكون منتهية الصلاحية
      const expired = await cache.get(key);
      expect(expired).toBeNull();
    }, 10000); // زيادة timeout للاختبار
  });

  describe("delete", () => {
    it("يجب أن يحذف القيم بشكل صحيح", async () => {
      const key = "test:delete";
      const value = { test: true };

      await cache.set(key, value);
      await cache.delete(key);

      const result = await cache.get(key);
      expect(result).toBeNull();
    });
  });

  describe("exists", () => {
    it("يجب أن يتحقق من وجود القيم", async () => {
      const key = "test:exists";

      const beforeSet = await cache.exists(key);
      expect(beforeSet).toBe(false);

      await cache.set(key, { test: true });

      const afterSet = await cache.exists(key);
      expect(afterSet).toBe(true);
    });
  });

  describe("getOrSet", () => {
    it("يجب أن يُرجع من الـ cache إذا وجد", async () => {
      const key = "test:getOrSet";
      const cachedValue = { cached: true };

      let callbackExecuted = false;
      const callback = async () => {
        callbackExecuted = true;
        return { fresh: true };
      };

      // حفظ قيمة مسبقاً
      await cache.set(key, cachedValue);

      // استدعاء getOrSet
      const result = await cache.getOrSet(key, callback);

      // يجب أن يُرجع القيمة المحفوظة
      expect(result).toEqual(cachedValue);
      // ولا يُنفذ الـ callback
      expect(callbackExecuted).toBe(false);
    });

    it("يجب أن ينفذ callback إذا لم يجد في الـ cache", async () => {
      const key = "test:getOrSet:new";
      const freshValue = { fresh: true };

      let callbackExecuted = false;
      const callback = async () => {
        callbackExecuted = true;
        return freshValue;
      };

      // استدعاء getOrSet بدون قيمة محفوظة
      const result = await cache.getOrSet(key, callback);

      // يجب أن يُرجع القيمة الجديدة
      expect(result).toEqual(freshValue);
      // ويُنفذ الـ callback
      expect(callbackExecuted).toBe(true);

      // التحقق من حفظ القيمة
      const cached = await cache.get(key);
      expect(cached).toEqual(freshValue);
    });
  });

  describe("CACHE_KEYS", () => {
    it("يجب أن يُولّد keys صحيحة", () => {
      expect(CACHE_KEYS.USER_PROFILE(123)).toBe("user:123:profile");
      expect(CACHE_KEYS.CONSULTANT_PROFILE(456)).toBe("consultant:456:profile");
      expect(CACHE_KEYS.CONSULTATIONS_BY_CLIENT(789)).toBe(
        "consultations:client:789"
      );
    });
  });

  describe("invalidateUserCache", () => {
    it("يجب أن يحذف جميع cache المتعلق بالمستخدم", async () => {
      const userId = 123;

      // حفظ عدة قيم للمستخدم
      await cache.set(`user:${userId}:profile`, { name: "علي" });
      await cache.set(`user:${userId}:permissions`, ["read", "write"]);
      await cache.set(`user:${userId}:settings`, { theme: "dark" });

      // التحقق من وجود القيم
      expect(await cache.exists(`user:${userId}:profile`)).toBe(true);

      // حذف cache المستخدم
      await cache.invalidateUserCache(userId);

      // التحقق من حذف جميع القيم
      expect(await cache.exists(`user:${userId}:profile`)).toBe(false);
      expect(await cache.exists(`user:${userId}:permissions`)).toBe(false);
      expect(await cache.exists(`user:${userId}:settings`)).toBe(false);
    });
  });
});
