# دليل استخدام Redis مع Vercel

# Redis Integration Guide for Vercel

## نظرة عامة | Overview

هذا الدليل يشرح كيفية استخدام Redis في بيئة Vercel Serverless Functions.

This guide explains how to use Redis in Vercel Serverless Functions environment.

---

## التثبيت | Installation

تم تثبيت حزمة `redis` الرسمية:

```bash
pnpm install redis
```

---

## إعداد متغيرات البيئة | Environment Variables Setup

### في Vercel Dashboard

1. اذهب إلى: **Project Settings → Environment Variables**
2. أضف متغير جديد:
   - **KEY**: `REDIS_URL`
   - **VALUE**: `redis://username:password@host:port`
   - **Scope**: Production + Preview + Development

### عبر Vercel CLI

```bash
vercel env add REDIS_URL
```

---

## الاستخدام الأساسي | Basic Usage

### في Express Server (server/\_core/index.ts)

```typescript
import { connectRedis, testRedisConnection } from "./redisClient.js";

// Initialize Redis on server startup
await connectRedis();
await testRedisConnection();
```

### في Vercel Serverless Function (api/redis-example.ts)

```typescript
import { createClient } from "redis";

// Create singleton Redis client
let redis: ReturnType<typeof createClient> | null = null;

async function getRedisClient() {
  if (!redis || !redis.isOpen) {
    redis = createClient({
      url: process.env.REDIS_URL,
    });
    await redis.connect();
  }
  return redis;
}

// Use in API handler
export default async function handler(req, res) {
  const client = await getRedisClient();

  // Set data
  await client.set("key", "value");

  // Get data
  const result = await client.get("key");

  return res.json({ result });
}
```

---

## مثال API Endpoint

### حفظ البيانات | Save Data (POST)

**Endpoint**: `POST /api/redis-example`

**Request Body**:

```json
{
  "key": "user:123",
  "value": {
    "name": "أحمد",
    "email": "ahmed@example.com"
  }
}
```

**Response**:

```json
{
  "success": true,
  "message": "Data saved successfully",
  "messageAr": "تم حفظ البيانات بنجاح",
  "key": "user:123"
}
```

### استرجاع البيانات | Fetch Data (GET)

**Endpoint**: `GET /api/redis-example?key=user:123`

**Response**:

```json
{
  "success": true,
  "key": "user:123",
  "result": {
    "name": "أحمد",
    "email": "ahmed@example.com"
  }
}
```

---

## الملفات الرئيسية | Key Files

### 1. `server/_core/redisClient.ts`

عميل Redis الرئيسي للسيرفر Express

Main Redis client for Express server

```typescript
import { createClient } from "redis";

export const redis = createClient({
  url: process.env.REDIS_URL,
});

export const connectRedis = async () => {
  if (!redis.isOpen) {
    await redis.connect();
  }
};
```

### 2. `api/redis-example.ts`

مثال على Serverless Function يستخدم Redis

Example Serverless Function using Redis

### 3. `server/_core/index.ts`

تهيئة Redis عند بدء السيرفر

Redis initialization on server startup

---

## Health Check Endpoints

### Database Health Check

```
GET /health
```

### Redis Health Check

```
GET /health/redis
```

**Response**:

```json
{
  "status": "ok",
  "message": "Redis is healthy",
  "timestamp": "2025-11-05T19:09:34.893Z"
}
```

---

## أفضل الممارسات | Best Practices

### 1. استخدام Singleton Pattern

في بيئة Serverless، استخدم نمط Singleton للحفاظ على اتصال واحد:

```typescript
let redis: ReturnType<typeof createClient> | null = null;

async function getRedisClient() {
  if (!redis || !redis.isOpen) {
    redis = createClient({ url: process.env.REDIS_URL });
    await redis.connect();
  }
  return redis;
}
```

### 2. معالجة الأخطاء | Error Handling

```typescript
try {
  const client = await getRedisClient();
  const result = await client.get("key");
  return result;
} catch (error) {
  console.error("Redis error:", error);
  // Handle gracefully - don't crash the app
  return null;
}
```

### 3. استخدام TTL (Time To Live)

```typescript
// Set data with expiration (3600 seconds = 1 hour)
await redis.setEx("key", 3600, "value");
```

### 4. استخدام JSON للبيانات المعقدة

```typescript
// Save complex data
await redis.set("user:123", JSON.stringify({ name: "أحمد" }));

// Retrieve and parse
const data = await redis.get("user:123");
const user = JSON.parse(data);
```

---

## الاختبار المحلي | Local Testing

### استخدام Redis محلي

1. تثبيت Redis محلياً:

   ```bash
   # macOS
   brew install redis
   brew services start redis

   # Ubuntu/Debian
   sudo apt-get install redis-server
   sudo systemctl start redis
   ```

2. تحديث `.env.development.local`:

   ```
   REDIS_URL=redis://localhost:6379
   ```

3. تشغيل السيرفر:
   ```bash
   pnpm dev
   ```

---

## استكشاف الأخطاء | Troubleshooting

### خطأ: "Redis Client Error: ECONNREFUSED"

**السبب**: عدم القدرة على الاتصال بـ Redis

**الحل**:

1. تأكد من أن `REDIS_URL` صحيح
2. تأكد من أن Redis يعمل
3. تحقق من الجدار الناري والاتصال بالشبكة

### خطأ: "Redis URL not configured"

**السبب**: `REDIS_URL` غير مُعرّف

**الحل**:

```bash
vercel env add REDIS_URL
# أو عبر Dashboard
```

### خطأ: "Connection timeout"

**السبب**: Redis بطيء في الاستجابة

**الحل**: زيادة timeout:

```typescript
const redis = createClient({
  url: process.env.REDIS_URL,
  socket: {
    connectTimeout: 10000, // 10 seconds
  },
});
```

---

## الموارد الإضافية | Additional Resources

- [Redis Official Documentation](https://redis.io/docs/)
- [Node Redis Client](https://github.com/redis/node-redis)
- [Vercel Storage Redis](https://vercel.com/docs/storage/vercel-kv)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)

---

## الدعم | Support

للمساعدة أو الأسئلة:

- افتح issue في المستودع
- راجع وثائق Vercel
- تواصل مع فريق الدعم

For help or questions:

- Open an issue in the repository
- Check Vercel documentation
- Contact support team
