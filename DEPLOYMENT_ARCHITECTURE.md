# 🏗️ معمارية النشر - RabitHR Platform

## نظرة عامة

يستخدم مشروع RabitHR معمارية منفصلة (Split Architecture) لتحقيق أفضل أداء وقابلية توسع:

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Frontend (Vercel)                              │
│  • Static React Application                    │
│  • Vite Build                                   │
│  • CDN Distribution                             │
│                                                 │
└────────────────┬────────────────────────────────┘
                 │
                 │ API Calls (Proxy)
                 │
                 ↓
┌─────────────────────────────────────────────────┐
│                                                 │
│  Backend (Railway)                              │
│  • Express.js Server                            │
│  • tRPC API                                     │
│  • Authentication & Authorization               │
│  • Rate Limiting & Security                     │
│                                                 │
└────────────────┬────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────┐
│                                                 │
│  Database (Railway)                             │
│  • MySQL / TiDB Cloud                           │
│  • Drizzle ORM                                  │
│                                                 │
└─────────────────────────────────────────────────┘
```

## 📁 هيكل المشروع

```
RabitHR/
├── client/              # Frontend - يتم نشره على Vercel
│   ├── src/            # مكونات React
│   └── public/         # الملفات الثابتة
│
├── server/             # Backend - يتم نشره على Railway
│   ├── _core/         # Express server setup
│   ├── routers.ts     # tRPC routers
│   └── services/      # Business logic
│
├── shared/            # الكود المشترك بين Frontend و Backend
│
├── vercel.json        # إعدادات نشر Vercel (Frontend فقط)
└── package.json       # التبعيات والسكريبتات
```

## 🚀 النشر

### Frontend (Vercel)

1. **البناء**: يقوم Vercel ببناء التطبيق باستخدام:

   ```bash
   pnpm vercel-build
   ```

2. **المخرجات**: الملفات الثابتة في `dist/public/`

3. **API Proxy**: يتم إعادة توجيه جميع طلبات `/api/*` إلى Railway backend:

   ```json
   {
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "https://your-railway-backend.railway.app/api/:path*"
       }
     ]
   }
   ```

4. **متغيرات البيئة المطلوبة في Vercel**:
   ```env
   VITE_APP_URL=https://your-app.vercel.app
   VITE_API_URL=https://your-railway-backend.railway.app
   VITE_APP_TITLE=رابِط - منصة إدارة الموارد البشرية
   ```

### Backend (Railway)

1. **البناء**: Railway يقوم ببناء وتشغيل Express server:

   ```bash
   pnpm install
   pnpm build
   pnpm start
   ```

2. **المتطلبات**:
   - Node.js 18+
   - MySQL Database (Railway أو TiDB Cloud)
   - Redis (اختياري للتخزين المؤقت)

3. **متغيرات البيئة المطلوبة في Railway**:
   ```env
   NODE_ENV=production
   DATABASE_URL=mysql://user:password@host:port/database
   JWT_SECRET=your-jwt-secret-key
   SESSION_SECRET=your-session-secret
   PORT=3000
   # ... باقي المتغيرات في .env.example
   ```

## 🔒 الأمان

### Frontend Security Headers (Vercel)

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security: max-age=31536000`
- `Content-Security-Policy: ...`
- `Referrer-Policy: strict-origin-when-cross-origin`

### Backend Security (Railway)

- Helmet.js لرؤوس الأمان
- CSRF Protection (Double Submit Cookie)
- Rate Limiting على API endpoints
- Input Validation باستخدام Zod
- JWT Authentication

## 📊 الأداء

### Frontend Optimizations

- ✅ Code Splitting (React, UI components, Charts)
- ✅ Static Asset Caching (1 year)
- ✅ CDN Distribution عبر Vercel
- ✅ Gzip/Brotli Compression

### Backend Optimizations

- ✅ Response Compression
- ✅ Redis Caching (اختياري)
- ✅ Database Connection Pooling
- ✅ Efficient Query Design with Drizzle ORM

## 🛠️ التطوير المحلي

### تشغيل كامل المشروع

```bash
# تثبيت التبعيات
pnpm install

# تشغيل الـ Backend + Frontend معاً
pnpm dev

# يعمل على:
# - Frontend: http://localhost:3000 (Vite dev server)
# - Backend: http://localhost:3000 (Express server)
```

### تشغيل منفصل

```bash
# Backend فقط
cd server && tsx watch _core/index.ts

# Frontend فقط (في نافذة طرفية أخرى)
cd client && vite
```

## 🔍 الفحص والاختبار

```bash
# TypeScript type checking
pnpm check

# Linting/Formatting
pnpm lint

# Unit Tests
pnpm test

# Production Build Test
pnpm build
```

## 📝 ملاحظات مهمة

1. **لا تقم بنشر Backend على Vercel Serverless Functions**
   - Backend معقد جداً لـ serverless constraints
   - يحتوي على migrations و long-running processes
   - Railway أفضل للـ stateful applications

2. **استخدم VITE_API_URL في Frontend**
   - في التطوير: `http://localhost:3000`
   - في Production: `https://your-railway-backend.railway.app`

3. **تحديث vercel.json rewrites**
   - عند نشر Backend على Railway، حدث URL في `vercel.json`

4. **متغيرات البيئة منفصلة**
   - Vercel: فقط VITE\_\* variables
   - Railway: جميع المتغيرات (Database, JWT, etc.)

## 🆘 المساعدة والدعم

للمزيد من التفاصيل، راجع:

- `VERCEL_DEPLOYMENT_AR.md` - دليل نشر Vercel
- `DATABASE_SETUP.md` - إعداد قاعدة البيانات
- `.env.example` - جميع متغيرات البيئة المطلوبة
