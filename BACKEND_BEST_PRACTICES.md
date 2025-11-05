# 🏗️ Backend Best Practices - RabitHR

## هيكل Backend

تم إعداد الـ Backend باتباع أفضل الممارسات (Best Practices) للأنظمة الإنتاجية.

## 📋 جدول المحتويات

- [Architecture Overview](#architecture-overview)
- [Health Check](#health-check)
- [Request Logging](#request-logging)
- [Error Handling](#error-handling)
- [Security](#security)
- [Environment Variables](#environment-variables)
- [Testing](#testing)

---

## Architecture Overview

### Entry Point

الملف الرئيسي للـ backend:

```
server/_core/index.ts
```

### Key Components

```
server/
├── _core/                    # Core backend functionality
│   ├── index.ts             # Main entry point (improved)
│   ├── auth.ts              # Authentication logic
│   ├── errorHandler.ts      # Centralized error handling
│   ├── healthCheck.ts       # Health check utilities
│   ├── env.ts               # Environment validation
│   ├── rateLimit.ts         # Rate limiting
│   ├── csrf.ts              # CSRF protection
│   ├── jwt.ts               # JWT tokens
│   └── ...
├── routers.ts               # tRPC routers
├── db.ts                    # Database operations
└── ...
```

---

## Health Check

### Endpoint

```
GET /health
```

### Purpose

- يستخدمه Railway وload balancers للتحقق من صحة الخادم
- يتحقق من اتصال قاعدة البيانات
- يعيد استجابة سريعة للمراقبة

### Implementation

```typescript
// server/_core/index.ts
app.get("/health", async (req, res) => {
  try {
    const isHealthy = await simpleHealthCheck();
    if (isHealthy) {
      res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
      });
    } else {
      res.status(503).json({
        status: "error",
        message: "Database connection failed",
      });
    }
  } catch (error) {
    res.status(503).json({
      status: "error",
      message: "Health check failed",
    });
  }
});
```

### Usage

```bash
# من command line
curl https://your-app.railway.app/health

# في Kubernetes/Docker health checks
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
  interval: 30s
  timeout: 10s
  retries: 3
```

### Response Format

**Success (200 OK)**:

```json
{
  "status": "ok",
  "timestamp": "2025-11-05T12:45:00.000Z"
}
```

**Failure (503 Service Unavailable)**:

```json
{
  "status": "error",
  "message": "Database connection failed"
}
```

---

## Request Logging

### Library

استخدام `morgan` - أشهر middleware للـ HTTP request logging في Node.js.

### Configuration

```typescript
// server/_core/index.ts
const logFormat =
  process.env.NODE_ENV === "production"
    ? "combined" // Apache combined log format
    : "dev"; // Colorful, concise format

app.use(morgan(logFormat));
```

### Log Formats

**Development (`dev`)**:

```
GET /api/users 200 15.234 ms - 1234
```

**Production (`combined`)**:

```
::1 - - [05/Nov/2025:12:45:00 +0000] "GET /api/users HTTP/1.1" 200 1234 "-" "Mozilla/5.0..."
```

### Benefits

- ✅ تتبع جميع الطلبات HTTP
- ✅ تحديد الطلبات البطيئة
- ✅ اكتشاف الأخطاء والمشاكل
- ✅ مراقبة الأداء
- ✅ Audit trail للأمان

---

## Error Handling

### Centralized Error Handler

```typescript
// server/_core/errorHandler.ts
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  err.statusCode = err.statusCode || 500;

  // Log error
  logError(err, req);

  // Send response based on environment
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else {
    sendErrorProd(err, req, res);
  }
}
```

### Error Types

```typescript
// Predefined error classes
-AppError - // Base error class
  ValidationError - // 400 - Bad Request
  AuthenticationError - // 401 - Unauthorized
  AuthorizationError - // 403 - Forbidden
  NotFoundError - // 404 - Not Found
  ConflictError - // 409 - Conflict
  RateLimitError; // 429 - Too Many Requests
```

### Usage Example

```typescript
import { NotFoundError } from "./errorHandler";

// في router أو controller
if (!user) {
  throw new NotFoundError("User");
}

// سيتم معالجته تلقائياً من error handler
```

### Unhandled Errors

```typescript
// server/_core/errorHandler.ts
export function initializeErrorHandling(server?: any) {
  // Uncaught exceptions
  handleUncaughtException();

  // Unhandled promise rejections
  handleUnhandledRejection();

  // Graceful shutdown
  if (server) {
    setupGracefulShutdown(server);
  }
}
```

### Graceful Shutdown

```typescript
// Handles SIGTERM and SIGINT
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

// Closes server gracefully
// Allows pending requests to complete
// Timeout after 30 seconds
```

---

## Security

### Security Headers (Helmet)

```typescript
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
);
```

### Rate Limiting

```typescript
// server/_core/rateLimit.ts
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // Max requests per window
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,                    // Stricter for auth routes
});

// Usage
app.use("/api/", apiLimiter);
app.post("/api/auth/login", authLimiter, ...);
```

### CSRF Protection

```typescript
// server/_core/csrf.ts
export const doubleSubmitCsrfProtection = ...;

// Applied to all routes
app.use(doubleSubmitCsrfProtection);
```

### Input Validation

```typescript
// Using Zod with tRPC
import { z } from "zod";

export const userRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(2),
      })
    )
    .mutation(async ({ input }) => {
      // Input is validated automatically
      return createUser(input);
    }),
});
```

---

## Environment Variables

### Validation

```typescript
// server/_core/env.ts
export function checkEnv() {
  const required = ["DATABASE_URL", "JWT_SECRET", "SESSION_SECRET"];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }
}

// Called at startup
checkEnv();
```

### Required Variables

```env
# Database
DATABASE_URL=mysql://user:pass@host:3306/db

# Authentication
JWT_SECRET=your-32-char-secret
SESSION_SECRET=your-session-secret

# Environment
NODE_ENV=production

# Port (set by Railway automatically)
PORT=3000
```

### Optional Variables

```env
# Redis Cache
REDIS_URL=redis://localhost:6379

# Email
RESEND_API_KEY=re_...

# Storage
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...

# Monitoring
SENTRY_DSN=...
```

### Security Best Practices

- ✅ **Never hardcode secrets** في الكود
- ✅ **Use .env.example** لتوثيق المتغيرات المطلوبة
- ✅ **Never commit .env** إلى git
- ✅ **Validate all env vars** عند البدء
- ✅ **Use strong secrets** (32+ characters)
- ✅ **Rotate secrets** بشكل دوري

---

## Testing

### Running Tests

```bash
# Type checking
pnpm tsc --noEmit

# Linting
pnpm lint

# Unit/Integration tests
pnpm test

# Build verification
pnpm build
```

### Test Structure

```
server/
├── __tests__/           # Integration tests
│   └── db-integration.test.ts
└── _core/
    └── __tests__/       # Unit tests
        └── cache.test.ts
```

### CI/CD

```yaml
# .github/workflows/ci.yml
- name: Type Check
  run: pnpm tsc --noEmit

- name: Lint
  run: pnpm lint

- name: Test
  run: pnpm test

- name: Build
  run: pnpm build
```

---

## PORT Configuration

### Implementation

```typescript
// server/_core/index.ts
function getPort(): number {
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  if (isNaN(port) || port < 1 || port > 65535) {
    console.warn(`Invalid PORT value: ${process.env.PORT}, using default 3000`);
    return 3000;
  }

  return port;
}

// Listen on all interfaces for containers
server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${port}/`);
});
```

### Why This Matters

- ✅ **Railway sets PORT automatically** - يجب استخدامه مباشرة
- ✅ **0.0.0.0 vs localhost** - containers تحتاج 0.0.0.0
- ✅ **Validation** - تحقق من صحة القيمة
- ✅ **Default fallback** - استخدام 3000 في development

### Previous Issue

```typescript
// ❌ المنطق السابق (معقد وغير ضروري)
async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found`);
}

// ✅ المنطق الجديد (بسيط ومناسب لـ Railway)
function getPort(): number {
  return process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
}
```

---

## Database Operations

### Best Practices

```typescript
// ✅ Always use transactions for multi-step operations
await db.transaction(async tx => {
  await tx.insert(users).values(userData);
  await tx.insert(profiles).values(profileData);
});

// ✅ Always handle errors
try {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
} catch (error) {
  logger.error("Database error:", error);
  throw new AppError("Failed to fetch user", 500);
}

// ✅ Use prepared statements (Drizzle does this automatically)
const getUserByEmail = db.query.users
  .findFirst({
    where: eq(users.email, sql.placeholder("email")),
  })
  .prepare();
```

---

## API Best Practices

### tRPC Routers

```typescript
// Organized by domain
export const appRouter = router({
  user: userRouter,
  auth: authRouter,
  admin: adminRouter,
  ...
});

// Each router is focused
export const userRouter = router({
  list: protectedProcedure.query(...),
  get: protectedProcedure.input(...).query(...),
  create: protectedProcedure.input(...).mutation(...),
  update: protectedProcedure.input(...).mutation(...),
  delete: protectedProcedure.input(...).mutation(...),
});
```

### Error Responses

```typescript
// Development (detailed)
{
  "status": "error",
  "error": { ... },
  "message": "User not found",
  "stack": "Error: User not found\n    at ..."
}

// Production (safe)
{
  "status": "error",
  "code": "NOT_FOUND",
  "message": "User not found"
}
```

---

## Monitoring & Observability

### Logs

```bash
# Development
[dev] GET /api/users 200 15.234 ms

# Production
::1 - - [05/Nov/2025:12:45:00 +0000] "GET /api/users HTTP/1.1" 200 1234
[ERROR] {"timestamp":"2025-11-05T12:45:00.000Z","error":{"name":"ValidationError","message":"Invalid email"},"request":{"method":"POST","url":"/api/auth/login"}}
```

### Metrics

Railway provides:

- CPU usage
- Memory usage
- Network traffic
- Response times

### External Monitoring

Integrations:

- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Datadog** - APM
- **New Relic** - Application monitoring

---

## Deployment Checklist

قبل النشر إلى production:

- [ ] جميع environment variables مضبوطة
- [ ] `pnpm tsc --noEmit` يمر بنجاح
- [ ] `pnpm lint` يمر بنجاح
- [ ] `pnpm test` يمر بنجاح
- [ ] `pnpm build` يمر بنجاح
- [ ] Health check endpoint يعمل
- [ ] Database migrations محدثة
- [ ] Secrets محمية (لا توجد في الكود)
- [ ] Rate limiting مفعّل
- [ ] Error handling يعمل
- [ ] Logging مفعّل

---

## Resources

### Documentation

- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [tRPC Documentation](https://trpc.io/docs)
- [Drizzle ORM](https://orm.drizzle.team/)

### Related Files

- `RAILWAY_DEPLOYMENT.md` - نشر على Railway
- `VERCEL_README.md` - نشر Frontend على Vercel
- `DEPLOYMENT_ARCHITECTURE.md` - معمارية الـ deployment
- `.env.example` - قائمة بجميع environment variables

---

## Contributing

عند إضافة ميزات جديدة للـ backend:

1. **Follow existing patterns** - استخدم نفس النمط الموجود
2. **Add error handling** - تعامل مع جميع الأخطاء المحتملة
3. **Validate input** - استخدم Zod schemas
4. **Add tests** - اختبر الوظائف الجديدة
5. **Update docs** - حدّث التوثيق
6. **Review security** - تحقق من الأمان

---

تم التحديث: 2025-11-05
