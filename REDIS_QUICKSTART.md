# دليل البدء السريع لـ Redis
# Redis Quick Start Guide

## 🚀 البدء السريع | Quick Start

### 1️⃣ إضافة REDIS_URL في Vercel

```bash
# عبر CLI
vercel env add REDIS_URL

# أو في Dashboard
Settings → Environment Variables
KEY: REDIS_URL
VALUE: redis://default:password@host:port
```

### 2️⃣ النشر | Deploy

```bash
git push origin main
vercel --prod
```

### 3️⃣ اختبار الاتصال | Test Connection

```bash
# Health Check
curl https://your-app.vercel.app/health/redis

# الرد المتوقع:
{
  "status": "ok",
  "message": "Redis is healthy",
  "timestamp": "2025-11-05T19:09:34.893Z"
}
```

---

## 📝 استخدام Redis في الكود | Using Redis in Code

### في Express Server

```typescript
import { connectRedis, testRedisConnection } from "./redisClient.js";

// يتم تلقائياً في server/_core/index.ts
await connectRedis();
await testRedisConnection();
```

### في Vercel Serverless Function

راجع الملف: `api/redis-example.ts`

```typescript
import { createClient } from "redis";

let redis: ReturnType<typeof createClient> | null = null;

async function getRedisClient() {
  if (!redis || !redis.isOpen) {
    redis = createClient({ url: process.env.REDIS_URL });
    await redis.connect();
  }
  return redis;
}

// الاستخدام
const client = await getRedisClient();
await client.set("key", "value");
const value = await client.get("key");
```

---

## 🔍 API Examples

### حفظ البيانات | Save Data

```bash
curl -X POST https://your-app.vercel.app/api/redis-example \
  -H "Content-Type: application/json" \
  -d '{
    "key": "user:123",
    "value": {
      "name": "أحمد",
      "email": "ahmed@example.com"
    }
  }'
```

**الرد | Response:**
```json
{
  "success": true,
  "message": "Data saved successfully",
  "messageAr": "تم حفظ البيانات بنجاح",
  "key": "user:123"
}
```

### استرجاع البيانات | Fetch Data

```bash
curl https://your-app.vercel.app/api/redis-example?key=user:123
```

**الرد | Response:**
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

## 📚 للمزيد | More Information

راجع الدليل الشامل: [REDIS_VERCEL_GUIDE.md](./REDIS_VERCEL_GUIDE.md)

---

## ✅ Checklist

- [ ] إضافة `REDIS_URL` في Vercel
- [ ] نشر التطبيق
- [ ] اختبار `/health/redis`
- [ ] اختبار `/api/redis-example`

---

## 🆘 مشاكل شائعة | Common Issues

### ❌ "Redis Client Error: ECONNREFUSED"

**الحل:**
- تأكد من صحة `REDIS_URL`
- تأكد من تشغيل Redis
- تحقق من الـ firewall

### ❌ "Redis URL not configured"

**الحل:**
```bash
# إضافة المتغير في Vercel
vercel env add REDIS_URL
```

---

## 🎉 جاهز!

Redis الآن متصل ويعمل على Vercel! 🚀
