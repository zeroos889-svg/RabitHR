/**
 * Redis Cache Manager
 * يوفر طبقة caching متقدمة باستخدام Redis لتحسين الأداء
 */

import Redis from 'ioredis';
import { ENV } from './env';

// Redis client instance (singleton pattern)
let redisClient: Redis | null = null;

/**
 * إنشاء اتصال Redis
 * @returns Redis client instance
 */
export function getRedisClient(): Redis {
  if (!redisClient) {
    // استخدام environment variable أو fallback للتطوير المحلي
    const redisUrl = ENV.redisUrl || 'redis://localhost:6379';
    
    redisClient = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      // تفعيل reconnect تلقائي
      enableReadyCheck: true,
      enableOfflineQueue: true,
    });

    // تسجيل الأحداث المهمة
    redisClient.on('connect', () => {
      console.log('✅ Redis connected successfully');
    });

    redisClient.on('error', (err) => {
      console.error('❌ Redis error:', err.message);
    });

    redisClient.on('close', () => {
      console.log('⚠️  Redis connection closed');
    });
  }

  return redisClient;
}

/**
 * Cache Manager مع دوال مساعدة
 */
export class CacheManager {
  private redis: Redis;
  private defaultTTL = 3600; // 1 hour default

  constructor(ttl?: number) {
    this.redis = getRedisClient();
    if (ttl) this.defaultTTL = ttl;
  }

  /**
   * حفظ قيمة في الـ cache
   * @param key - Cache key
   * @param value - Value to cache (سيتم تحويله لـ JSON)
   * @param ttl - Time to live بالثواني (اختياري)
   */
  async set(key: string, value: any, ttl?: number): Promise<void> {
    const serialized = JSON.stringify(value);
    const expiry = ttl || this.defaultTTL;
    
    await this.redis.setex(key, expiry, serialized);
  }

  /**
   * استرجاع قيمة من الـ cache
   * @param key - Cache key
   * @returns القيمة المحفوظة أو null إذا لم توجد
   */
  async get<T>(key: string): Promise<T | null> {
    const cached = await this.redis.get(key);
    
    if (!cached) return null;
    
    try {
      return JSON.parse(cached) as T;
    } catch {
      return null;
    }
  }

  /**
   * حذف قيمة من الـ cache
   * @param key - Cache key
   */
  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }

  /**
   * حذف عدة قيم بـ pattern معين
   * @param pattern - Pattern للبحث (مثل: "user:*")
   */
  async deletePattern(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }

  /**
   * التحقق من وجود key
   * @param key - Cache key
   */
  async exists(key: string): Promise<boolean> {
    const result = await this.redis.exists(key);
    return result === 1;
  }

  /**
   * دالة مساعدة: حفظ أو استرجاع مع callback
   * إذا كانت القيمة موجودة، يتم إرجاعها من الـ cache
   * إذا لم توجد، يتم استدعاء الـ callback وحفظ النتيجة
   * 
   * @param key - Cache key
   * @param callback - دالة لاسترجاع البيانات إذا لم توجد في الـ cache
   * @param ttl - Time to live بالثواني
   */
  async getOrSet<T>(
    key: string,
    callback: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    // محاولة استرجاع من الـ cache
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    // إذا لم توجد، استدعاء الـ callback
    const value = await callback();
    
    // حفظ النتيجة في الـ cache
    await this.set(key, value, ttl);
    
    return value;
  }

  /**
   * Invalidate cache لمستخدم معين
   * يحذف جميع الـ cache المرتبط بالمستخدم
   */
  async invalidateUserCache(userId: number): Promise<void> {
    await this.deletePattern(`user:${userId}:*`);
  }

  /**
   * Invalidate cache للاستشارات
   */
  async invalidateConsultationsCache(consultantId?: number): Promise<void> {
    if (consultantId) {
      await this.deletePattern(`consultations:consultant:${consultantId}:*`);
    } else {
      await this.deletePattern('consultations:*');
    }
  }

  /**
   * إغلاق اتصال Redis (للاستخدام عند إيقاف التطبيق)
   */
  async disconnect(): Promise<void> {
    if (this.redis) {
      await this.redis.quit();
    }
  }
}

/**
 * Cache keys constants لضمان consistency
 */
export const CACHE_KEYS = {
  USER_PROFILE: (userId: number) => `user:${userId}:profile`,
  USER_PERMISSIONS: (userId: number) => `user:${userId}:permissions`,
  CONSULTANT_PROFILE: (consultantId: number) => `consultant:${consultantId}:profile`,
  CONSULTANT_REVIEWS: (consultantId: number) => `consultant:${consultantId}:reviews`,
  CONSULTATIONS_BY_CLIENT: (clientId: number) => `consultations:client:${clientId}`,
  CONSULTATIONS_BY_CONSULTANT: (consultantId: number) => `consultations:consultant:${consultantId}`,
  CONSULTATION_TYPES: 'consultation:types',
  COMPANY_INFO: (companyId: number) => `company:${companyId}:info`,
};

/**
 * TTL constants (بالثواني)
 */
export const CACHE_TTL = {
  SHORT: 300, // 5 minutes
  MEDIUM: 1800, // 30 minutes
  LONG: 3600, // 1 hour
  VERY_LONG: 86400, // 24 hours
};

/**
 * Get Redis client for direct operations
 * @returns Redis client instance
 */
export function getCache(): Redis {
  return getRedisClient();
}

// تصدير instance جاهز للاستخدام
export const cache = new CacheManager();
