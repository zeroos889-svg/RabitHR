# 📚 دليل الأكواد الشامل ثنائي اللغة

# Comprehensive Bilingual Code Guide

## منصة رابِط للموارد البشرية | Rabit HR Platform

---

## 📋 المحتويات | Table of Contents

1. [نظرة عامة | Overview](#overview)
2. [Docker & Containerization](#docker)
3. [Database | قاعدة البيانات](#database)
4. [API & Backend | الخادم](#backend)
5. [Security | الأمان](#security)
6. [Performance | الأداء](#performance)
7. [Monitoring | المراقبة](#monitoring)

---

<a name="overview"></a>

## 🎯 نظرة عامة | Overview

### عربي:

هذا الدليل يشرح جميع الأكواد والملفات في المشروع بالتفصيل. كل قسم يحتوي على:

- شرح الغرض من الكود
- كيفية عمله
- أمثلة الاستخدام
- نصائح للتطوير

### English:

This guide explains all code and files in the project in detail. Each section contains:

- Explanation of code purpose
- How it works
- Usage examples
- Development tips

---

<a name="docker"></a>

## 🐳 Docker & Containerization

### Dockerfile الشرح الكامل | Complete Dockerfile Explanation

#### 1. Build Arguments | متغيرات البناء

```dockerfile
ARG NODE_VERSION=18
ARG PNPM_VERSION=latest
```

**عربي:**

- `ARG` تسمح بتمرير متغيرات عند بناء الصورة
- `NODE_VERSION=18` الإصدار الافتراضي لـ Node.js
- يمكن تغييرها: `docker build --build-arg NODE_VERSION=20`

**English:**

- `ARG` allows passing variables during image build
- `NODE_VERSION=18` is the default Node.js version
- Can be changed: `docker build --build-arg NODE_VERSION=20`

**الفائدة | Benefit:**

- 🔧 مرونة في اختيار الإصدارات | Flexibility in version selection
- 🧪 سهولة اختبار إصدارات مختلفة | Easy testing of different versions

---

#### 2. Builder Stage | مرحلة البناء

```dockerfile
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
```

**عربي:**

- `FROM node:18-alpine` استخدام صورة Node.js خفيفة (Alpine Linux)
- `AS builder` تسمية هذه المرحلة "builder"
- `WORKDIR /app` تحديد مجلد العمل
- `corepack` أداة مدمجة في Node.js لإدارة package managers

**English:**

- `FROM node:18-alpine` uses lightweight Node.js image (Alpine Linux)
- `AS builder` names this stage "builder"
- `WORKDIR /app` sets working directory
- `corepack` is built-in Node.js tool for managing package managers

**لماذا Alpine؟ | Why Alpine?**

- ✅ حجم صغير (~5MB مقابل ~900MB) | Small size (~5MB vs ~900MB)
- ✅ أسرع في التحميل | Faster to download
- ✅ أكثر أماناً (أقل مكونات) | More secure (fewer components)

---

#### 3. Dependencies Installation | تثبيت التبعيات

```dockerfile
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
```

**عربي:**

- نسخ ملفات الـ dependencies أولاً (استفادة من Docker cache)
- `--frozen-lockfile` يضمن استخدام نفس الإصدارات المحددة في lock file
- إذا لم تتغير هذه الملفات، Docker يستخدم cache ولا يعيد التثبيت

**English:**

- Copy dependency files first (leverage Docker cache)
- `--frozen-lockfile` ensures using exact versions from lock file
- If these files don't change, Docker uses cache and doesn't reinstall

**الفائدة | Benefit:**

- ⚡ بناء أسرع (من دقائق إلى ثواني) | Faster builds (from minutes to seconds)
- 🎯 نتائج متسقة | Consistent results

---

#### 4. Pruner Stage | مرحلة التنظيف

```dockerfile
FROM node:${NODE_VERSION}-alpine AS pruner
WORKDIR /app
COPY --from=builder /app/dist ./dist
RUN find dist -name "*.map" -delete
```

**عربي:**

- مرحلة منفصلة لتنظيف الملفات غير الضرورية
- `find dist -name "*.map" -delete` يحذف source maps
- source maps مفيدة للتطوير لكن غير مطلوبة في الإنتاج

**English:**

- Separate stage to clean unnecessary files
- `find dist -name "*.map" -delete` removes source maps
- source maps are useful for development but not needed in production

**التوفير | Savings:**

- 📦 تقليل حجم الصورة 10-20% | Reduces image size by 10-20%
- 🚀 تحميل أسرع | Faster deployment

---

#### 5. Production Stage | المرحلة النهائية

```dockerfile
FROM node:${NODE_VERSION}-alpine
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile
```

**عربي:**

- صورة جديدة نظيفة للإنتاج
- `--prod` يثبت فقط dependencies الإنتاج (بدون devDependencies)
- devDependencies تشمل أدوات التطوير والاختبار (لا نحتاجها في الإنتاج)

**English:**

- Fresh, clean image for production
- `--prod` installs only production dependencies (no devDependencies)
- devDependencies include development and testing tools (not needed in production)

**الفائدة | Benefit:**

- 💾 توفير مساحة (~50% أقل) | Saves space (~50% less)
- 🔒 أمان أفضل (أقل كود = أقل نقاط ضعف) | Better security (less code = fewer vulnerabilities)

---

#### 6. Security: Non-root User | مستخدم غير root

```dockerfile
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
COPY --from=pruner --chown=nodejs:nodejs /app/dist ./dist
USER nodejs
```

**عربي:**

- إنشاء مستخدم `nodejs` بـ UID=1001, GID=1001
- `--chown` يغير ملكية الملفات للمستخدم nodejs
- `USER nodejs` التبديل إلى المستخدم nodejs
- **لماذا؟** تشغيل التطبيق كـ root خطر أمني كبير

**English:**

- Create `nodejs` user with UID=1001, GID=1001
- `--chown` changes file ownership to nodejs user
- `USER nodejs` switches to nodejs user
- **Why?** Running as root is a major security risk

**السيناريو الخطر | Risk Scenario:**

```
❌ إذا اُخترق التطبيق وهو root → المهاجم يملك كامل السيرفر
✅ إذا اُخترق التطبيق وهو nodejs → المهاجم محدود الصلاحيات

❌ If app is hacked as root → Attacker owns entire server
✅ If app is hacked as nodejs → Attacker has limited permissions
```

---

#### 7. Health Check | فحص الصحة

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1
```

**عربي:**

- `--interval=30s` فحص كل 30 ثانية
- `--timeout=3s` انتظار 3 ثواني للرد
- `--start-period=40s` منح التطبيق 40 ثانية للبدء قبل الفحص
- `--retries=3` إذا فشل 3 مرات متتالية → الحاوية غير صحية
- يرسل GET request إلى `/health` ويفحص status code 200

**English:**

- `--interval=30s` check every 30 seconds
- `--timeout=3s` wait 3 seconds for response
- `--start-period=40s` give app 40 seconds to start before checking
- `--retries=3` if fails 3 times in a row → container unhealthy
- Sends GET request to `/health` and checks for status code 200

**ماذا يحدث عند الفشل؟ | What happens on failure?**

```
Docker/Kubernetes يعيد تشغيل الحاوية تلقائياً
Docker/Kubernetes automatically restarts the container

Load Balancer يوقف إرسال الطلبات لهذه الحاوية
Load Balancer stops sending requests to this container
```

---

### docker-compose.yml الشرح الكامل | Complete docker-compose.yml Explanation

#### 1. Service Dependencies | اعتماديات الخدمات

```yaml
app:
  depends_on:
    db:
      condition: service_healthy
    redis:
      condition: service_healthy
```

**عربي:**

- التطبيق ينتظر حتى تكون قاعدة البيانات و Redis "صحية"
- `service_healthy` يعتمد على healthcheck المعرّف في الخدمة
- بدون هذا، قد يبدأ التطبيق قبل جاهزية قاعدة البيانات → أخطاء

**English:**

- App waits until database and Redis are "healthy"
- `service_healthy` depends on healthcheck defined in service
- Without this, app might start before database is ready → errors

**تدفق البدء | Startup Flow:**

```
1️⃣ MySQL يبدأ → يستغرق ~30 ثانية | MySQL starts → takes ~30 seconds
2️⃣ healthcheck يفحص → ينتظر حتى mysqladmin ping ينجح | healthcheck verifies → waits for successful mysqladmin ping
3️⃣ Redis يبدأ → يستغرق ~5 ثواني | Redis starts → takes ~5 seconds
4️⃣ healthcheck يفحص → ينتظر حتى redis-cli ping ينجح | healthcheck verifies → waits for successful redis-cli ping
5️⃣ الآن فقط التطبيق يبدأ | Only now the app starts
```

---

#### 2. Resource Limits | حدود الموارد

```yaml
deploy:
  resources:
    limits:
      cpus: "2"
      memory: 2G
    reservations:
      cpus: "0.5"
      memory: 512M
```

**عربي:**

- **limits:** الحد الأقصى المسموح
  - لن يتجاوز 2 CPU cores و 2GB RAM أبداً
- **reservations:** الحد الأدنى المضمون
  - مضمون الحصول على 0.5 CPU و 512MB دائماً
- إذا حاول استخدام أكثر من الحد → Docker يمنعه

**English:**

- **limits:** Maximum allowed
  - Will never exceed 2 CPU cores and 2GB RAM
- **reservations:** Minimum guaranteed
  - Guaranteed to get 0.5 CPU and 512MB always
- If tries to use more than limit → Docker prevents it

**لماذا هذا مهم؟ | Why is this important?**

```
✅ منع تطبيق واحد من استهلاك جميع موارد السيرفر
   Prevents one app from consuming all server resources

✅ توزيع عادل للموارد بين التطبيقات
   Fair resource distribution among apps

✅ استقرار أفضل تحت الضغط
   Better stability under load
```

---

#### 3. Volumes | التخزين الدائم

```yaml
volumes:
  - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
    driver: local
```

**عربي:**

- **Named Volume:** تخزين يُدار بواسطة Docker
- البيانات محفوظة حتى لو:
  - أعدت تشغيل الحاوية
  - حذفت الحاوية
  - أعدت بناء الصورة
- فقط `docker volume rm mysql_data` يحذف البيانات

**English:**

- **Named Volume:** Storage managed by Docker
- Data persists even if you:
  - Restart container
  - Delete container
  - Rebuild image
- Only `docker volume rm mysql_data` deletes data

**بدون volumes:**

```
❌ كل إعادة تشغيل = فقدان جميع البيانات
   Every restart = lose all data
```

**مع volumes:**

```
✅ البيانات محفوظة للأبد
   Data saved forever
```

---

<a name="database"></a>

## 🗄️ Database | قاعدة البيانات

### database-optimization.sql شرح كامل | Complete Explanation

#### 1. Simple Index | فهرس بسيط

```sql
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
```

**عربي:**

- فهرس على عمود واحد (email)
- يُستخدم في: `SELECT * FROM users WHERE email = 'user@example.com'`
- **قبل:** يفحص كل الصفوف واحدة واحدة (Full Table Scan)
- **بعد:** يقفز مباشرة للصف المطلوب (Index Seek)

**English:**

- Index on single column (email)
- Used in: `SELECT * FROM users WHERE email = 'user@example.com'`
- **Before:** Checks every row one by one (Full Table Scan)
- **After:** Jumps directly to required row (Index Seek)

**مثال توضيحي | Visual Example:**

```
بدون فهرس (100,000 صف) | Without Index (100,000 rows):
🐌 يفحص: 1, 2, 3, 4, ... 99,998, 99,999, 100,000
   Time: ~500ms

مع فهرس | With Index:
⚡ يقفز مباشرة للصف رقم 45,231
   Time: ~5ms

التحسين: 100x أسرع! | Improvement: 100x faster!
```

---

#### 2. Composite Index | فهرس مركب

```sql
CREATE INDEX IF NOT EXISTS idx_employees_dept_status
ON employees(department, status);
```

**عربي:**

- فهرس على عمودين معاً
- يُستخدم في: `SELECT * FROM employees WHERE department = 'IT' AND status = 'active'`
- **ترتيب الأعمدة مهم جداً!**
- القاعدة: ضع العمود الأكثر تحديداً أولاً

**English:**

- Index on two columns together
- Used in: `SELECT * FROM employees WHERE department = 'IT' AND status = 'active'`
- **Column order matters a lot!**
- Rule: Put most selective column first

**مثال الترتيب | Order Example:**

```sql
-- ✅ جيد | Good
-- department has 10 values, status has 3 values
CREATE INDEX idx_employees_dept_status ON employees(department, status);

-- ❌ أقل كفاءة | Less efficient
CREATE INDEX idx_employees_status_dept ON employees(status, department);
```

**لماذا الترتيب مهم؟ | Why order matters?**

```
department = 'IT' → يصفي من 100,000 إلى 5,000 (95% تصفية)
department = 'IT' → filters from 100,000 to 5,000 (95% filtering)

status = 'active' → يصفي من 100,000 إلى 70,000 (30% تصفية)
status = 'active' → filters from 100,000 to 70,000 (30% filtering)

البدء بـ department أفضل!
Starting with department is better!
```

---

#### 3. Index Usage Rules | قواعد استخدام الفهارس

**عربي:**
الفهرس `idx_emp_dept_status` على `(department, status)` يُستخدم في:

✅ **يُستخدم:**

```sql
WHERE department = 'IT'
WHERE department = 'IT' AND status = 'active'
WHERE department IN ('IT', 'HR')
```

❌ **لا يُستخدم:**

```sql
WHERE status = 'active'  -- يبدأ بالعمود الثاني
WHERE department LIKE '%IT%'  -- يستخدم wildcard في البداية
WHERE YEAR(hire_date) = 2023  -- function على العمود
```

**English:**
Index `idx_emp_dept_status` on `(department, status)` is used for:

✅ **Used:**

```sql
WHERE department = 'IT'
WHERE department = 'IT' AND status = 'active'
WHERE department IN ('IT', 'HR')
```

❌ **Not used:**

```sql
WHERE status = 'active'  -- starts with second column
WHERE department LIKE '%IT%'  -- wildcard at start
WHERE YEAR(hire_date) = 2023  -- function on column
```

---

#### 4. Index Maintenance | صيانة الفهارس

```sql
ANALYZE TABLE employees;
```

**عربي:**

- يحدّث إحصائيات الجدول
- MySQL يستخدم هذه الإحصائيات لاختيار أفضل فهرس
- يُشغّل بعد:
  - إضافة فهرس جديد
  - إدخال/تحديث/حذف كمية كبيرة من البيانات
  - انخفاض الأداء

**English:**

- Updates table statistics
- MySQL uses these statistics to choose best index
- Run after:
  - Adding new index
  - Inserting/updating/deleting large amounts of data
  - Performance degradation

**متى تشغله؟ | When to run it?**

```
🔄 أسبوعياً → إذا البيانات تتغير باستمرار
   Weekly → if data changes constantly

🔄 شهرياً → إذا البيانات مستقرة نسبياً
   Monthly → if data is relatively stable

🔄 بعد migration كبيرة → دائماً
   After large migration → always
```

---

<a name="backend"></a>

## ⚙️ API & Backend | الخادم

### server/\_core/errorHandler.ts شرح كامل | Complete Explanation

#### 1. Custom Error Classes | أصناف الأخطاء المخصصة

```typescript
export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, true, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}
```

**عربي:**

- `extends AppError` ترث من الصنف الأساسي
- `400` هو HTTP status code للـ Bad Request
- `true` يعني operational error (خطأ متوقع وليس bug)
- `VALIDATION_ERROR` كود مخصص للتطبيق

**English:**

- `extends AppError` inherits from base class
- `400` is HTTP status code for Bad Request
- `true` means operational error (expected, not a bug)
- `VALIDATION_ERROR` is custom application code

**الفرق بين أنواع الأخطاء | Difference between error types:**

```typescript
// ✅ Operational Error (متوقع | expected)
throw new ValidationError("Email is required");
// → نعرضه للمستخدم | Show to user

// ❌ Programming Error (bug)
const result = null.someMethod(); // TypeError
// → لا نعرضه للمستخدم | Don't show to user
// → نسجله ونعرض رسالة عامة | Log it and show generic message
```

---

#### 2. Error Handler Middleware | وسيط معالجة الأخطاء

```typescript
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  err.statusCode = err.statusCode || 500;

  logError(err, req);

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else {
    sendErrorProd(err, req, res);
  }
}
```

**عربي:**

- يُضاف في آخر middleware stack في Express
- يُستدعى تلقائياً عند حدوث أي خطأ
- يسجل الخطأ أولاً
- يرسل رد مناسب حسب البيئة

**English:**

- Added at end of middleware stack in Express
- Called automatically when any error occurs
- Logs error first
- Sends appropriate response based on environment

**التدفق | Flow:**

```
1️⃣ يحدث خطأ في أي route | Error occurs in any route
2️⃣ Express يقفز إلى errorHandler | Express jumps to errorHandler
3️⃣ يسجل الخطأ | Logs error
4️⃣ يرسل رد للمستخدم | Sends response to user
```

---

#### 3. Development vs Production Errors | أخطاء التطوير vs الإنتاج

```typescript
// Development - شرح مفصل | detailed explanation
function sendErrorDev(err: any, req: Request, res: Response) {
  res.status(err.statusCode).json({
    status: "error",
    error: err,
    message: err.message,
    stack: err.stack, // ⚠️ حساس | sensitive
    request: {
      // ⚠️ حساس | sensitive
      body: req.body,
      params: req.params,
    },
  });
}

// Production - مختصر وآمن | concise and safe
function sendErrorProd(err: any, req: Request, res: Response) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: "error",
      code: err.code,
      message: err.message, // ✅ آمن | safe
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong", // ✅ رسالة عامة | generic
    });
  }
}
```

**لماذا الفرق؟ | Why the difference?**

```
Development | التطوير:
✅ نحتاج كل التفاصيل للتشخيص
   We need all details for debugging
✅ stack trace مفيد جداً
   stack trace is very helpful

Production | الإنتاج:
❌ stack trace يكشف بنية الكود
   stack trace reveals code structure
❌ req.body قد يحتوي بيانات حساسة
   req.body may contain sensitive data
❌ معلومات زائدة = خطر أمني
   Too much info = security risk
```

---

#### 4. Async Error Wrapper | غلاف الأخطاء غير المتزامنة

```typescript
export function asyncHandler(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
```

**عربي:**

- يغلف async functions لالتقاط الأخطاء تلقائياً
- بدونه، أخطاء async تُتجاهل ويُعلق الـ request

**English:**

- Wraps async functions to catch errors automatically
- Without it, async errors are ignored and request hangs

**الاستخدام | Usage:**

```typescript
// ❌ بدون asyncHandler | Without asyncHandler
app.get("/users", async (req, res) => {
  const users = await db.getUsers(); // إذا فشل، يُتجاهل | if fails, ignored
  res.json(users);
});

// ✅ مع asyncHandler | With asyncHandler
app.get(
  "/users",
  asyncHandler(async (req, res) => {
    const users = await db.getUsers(); // إذا فشل، يُمرر لـ errorHandler | if fails, passed to errorHandler
    res.json(users);
  })
);
```

---

<a name="security"></a>

## 🔒 Security | الأمان

### Security Best Practices | أفضل ممارسات الأمان

#### 1. Environment Variables | متغيرات البيئة

**عربي:**

- ❌ لا تضع أبداً secrets في الكود
- ✅ استخدم environment variables
- ✅ استخدم .env.example للتوثيق (بدون قيم حقيقية)
- ✅ أضف .env إلى .gitignore

**English:**

- ❌ Never put secrets in code
- ✅ Use environment variables
- ✅ Use .env.example for documentation (without real values)
- ✅ Add .env to .gitignore

**مثال | Example:**

```bash
# ❌ خطأ | Wrong - secrets in code
const DB_PASSWORD = 'mySecretPassword123';

# ✅ صحيح | Correct - secrets in .env
DATABASE_URL=******root:mySecretPassword123@localhost/mydb
```

---

#### 2. Rate Limiting | تحديد المعدل

**عربي:**

- يمنع الهجمات بالقوة الغاشمة (brute force)
- يمنع إساءة استخدام API
- مستويات مختلفة حسب الحساسية

**English:**

- Prevents brute force attacks
- Prevents API abuse
- Different levels based on sensitivity

**التكوين في nginx.conf:**

```nginx
# معدل عام | General rate
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=100r/m;

# معدل صارم للمصادقة | Strict rate for auth
limit_req_zone $binary_remote_addr zone=auth_limit:10m rate=5r/m;

location /api/ {
  limit_req zone=api_limit burst=20 nodelay;
}

location /auth/ {
  limit_req zone=auth_limit burst=3 nodelay;
}
```

**الشرح | Explanation:**

```
api_limit: 100 requests/minute
- يسمح بـ 100 طلب في الدقيقة | Allows 100 requests per minute
- burst=20 يسمح بـ 20 طلب إضافي مؤقتاً | burst=20 allows 20 extra temporarily

auth_limit: 5 requests/minute
- فقط 5 محاولات تسجيل دخول في الدقيقة | Only 5 login attempts per minute
- يمنع brute force على كلمات المرور | Prevents password brute force
```

---

#### 3. SQL Injection Prevention | منع حقن SQL

**عربي:**

- ❌ لا تُركب SQL queries يدوياً
- ✅ استخدم prepared statements دائماً
- ✅ استخدم ORM (مثل Drizzle)

**English:**

- ❌ Never manually build SQL queries
- ✅ Always use prepared statements
- ✅ Use ORM (like Drizzle)

**مثال الخطر | Danger Example:**

```typescript
// ❌ خطر جداً | Very dangerous
const email = req.body.email;
const query = `SELECT * FROM users WHERE email = '${email}'`;
// إذا email = "' OR '1'='1"
// Query becomes: SELECT * FROM users WHERE email = '' OR '1'='1'
// → يرجع جميع المستخدمين! | Returns all users!

// ✅ آمن | Safe
const email = req.body.email;
const users = await db.query("SELECT * FROM users WHERE email = ?", [email]);
// ? يُستبدل بقيمة آمنة | ? is safely replaced
```

---

<a name="performance"></a>

## ⚡ Performance | الأداء

### Caching Strategy | استراتيجية التخزين المؤقت

#### 1. Redis Cache Layers | طبقات Redis Cache

**عربي:**
نظام تخزين مؤقت متعدد المستويات:

**English:**
Multi-level caching system:

```
🔹 Level 1: Static Data (1 ساعة | 1 hour)
- قوائم الدول | Country lists
- الإعدادات الثابتة | Static settings

🔹 Level 2: Frequently Accessed (15 دقيقة | 15 minutes)
- بيانات المستخدم | User data
- الأدوار والصلاحيات | Roles and permissions

🔹 Level 3: Real-time (1 دقيقة | 1 minute)
- الإحصائيات | Statistics
- العدادات | Counters

🔹 Level 4: Temporary (30 ثانية | 30 seconds)
- نتائج البحث | Search results
- القوائم المصفاة | Filtered lists
```

**مثال الاستخدام | Usage Example:**

```typescript
// التحقق من Cache أولاً | Check cache first
const cached = await redis.get(`user:${userId}`);
if (cached) {
  return JSON.parse(cached); // ⚡ سريع جداً | Very fast
}

// إذا لم يوجد، اجلب من DB | If not found, fetch from DB
const user = await db.getUser(userId); // 🐢 بطيء نسبياً | Relatively slow

// احفظ في Cache للمرة القادمة | Save in cache for next time
await redis.setex(`user:${userId}`, 900, JSON.stringify(user)); // 900s = 15min

return user;
```

**التوفير المتوقع | Expected Savings:**

```
بدون cache | Without cache:
- كل request → database query
- 100 requests/sec → 100 DB queries/sec
- وقت الاستجابة: ~200ms | Response time: ~200ms

مع cache (70% hit rate) | With cache (70% hit rate):
- 70 requests/sec من cache | 70 requests/sec from cache
- 30 requests/sec من DB | 30 requests/sec from DB
- وقت الاستجابة: ~50ms | Response time: ~50ms

التحسين: 4x أسرع! | Improvement: 4x faster!
```

---

<a name="monitoring"></a>

## 📊 Monitoring | المراقبة

### Health Check System | نظام فحص الصحة

#### الأنواع | Types

**عربي:**

1. **Simple Health Check:** فحص سريع (load balancer)
2. **Comprehensive Health Check:** فحص شامل (monitoring)
3. **Component Health Check:** فحص مكون محدد

**English:**

1. **Simple Health Check:** Quick check (load balancer)
2. **Comprehensive Health Check:** Full check (monitoring)
3. **Component Health Check:** Check specific component

---

## 📚 مصطلحات مهمة | Important Terms

| عربي       | English    | الشرح                          | Explanation                                    |
| ---------- | ---------- | ------------------------------ | ---------------------------------------------- |
| حاوية      | Container  | بيئة معزولة لتشغيل التطبيق     | Isolated environment to run app                |
| صورة       | Image      | قالب لإنشاء حاويات             | Template to create containers                  |
| مجلد       | Volume     | تخزين دائم للبيانات            | Persistent data storage                        |
| شبكة       | Network    | اتصال بين الحاويات             | Connection between containers                  |
| فهرس       | Index      | بنية بيانات لتسريع الاستعلامات | Data structure to speed up queries             |
| تخزين مؤقت | Cache      | حفظ البيانات للوصول السريع     | Store data for fast access                     |
| وسيط       | Middleware | دالة تُنفذ بين الطلب والرد     | Function executed between request and response |

---

## 🎯 النصائح الذهبية | Golden Tips

### عربي:

1. ✅ اقرأ التعليقات في الكود - توفر وقتاً
2. ✅ استخدم health checks - تكتشف المشاكل مبكراً
3. ✅ طبّق resource limits - تمنع الكوارث
4. ✅ استخدم indexes - تسرع الاستعلامات 100x
5. ✅ فعّل caching - توفر 70% من الحمل
6. ✅ سجّل الأخطاء - تسهل التشخيص
7. ✅ اختبر في بيئة مشابهة للإنتاج

### English:

1. ✅ Read code comments - saves time
2. ✅ Use health checks - detect issues early
3. ✅ Apply resource limits - prevent disasters
4. ✅ Use indexes - speed up queries 100x
5. ✅ Enable caching - saves 70% of load
6. ✅ Log errors - easier diagnosis
7. ✅ Test in production-like environment

---

## 📞 الدعم | Support

**للأسئلة | For Questions:**

- راجع التعليقات inline في الكود | Check inline comments in code
- راجع `PROJECT_STATUS.md` | Check `PROJECT_STATUS.md`
- راجع `DEVELOPMENT_ENHANCEMENTS.md` | Check `DEVELOPMENT_ENHANCEMENTS.md`

---

**آخر تحديث | Last Updated:** 4 نوفمبر 2025 | November 4, 2025  
**الإصدار | Version:** 2.0.0  
**الحالة | Status:** ✅ موثق بالكامل | Fully Documented
