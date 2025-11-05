# 🔧 Vercel Troubleshooting Guide - Complete Solutions

## 📋 Table of Contents

1. [Schema Validation Errors](#schema-validation-errors)
2. [Build Failures](#build-failures)
3. [Runtime Errors](#runtime-errors)
4. [Database Connection Issues](#database-connection-issues)
5. [Environment Variable Problems](#environment-variable-problems)
6. [Performance Issues](#performance-issues)
7. [TypeScript Errors](#typescript-errors)
8. [Deployment Timeout](#deployment-timeout)

---

## 🚨 Schema Validation Errors

### Error: "env should be object"

**Error Message:**

```
The vercel.json schema validation failed with the following message:
"env" should be object.
```

**Root Cause:**
The `env` field in `vercel.json` was defined as an array instead of an object.

**❌ Incorrect Configuration:**

```json
{
  "env": ["DATABASE_URL", "JWT_SECRET"]
}
```

**✅ Correct Configuration:**

```json
{
  "env": {
    "DATABASE_URL": "@database_url",
    "JWT_SECRET": "@jwt_secret"
  }
}
```

**Solution Steps:**

1. Open `vercel.json`
2. Change `env` from array to object format
3. Use `@secret_name` references for sensitive values
4. Commit and push changes
5. Redeploy on Vercel

**Verification:**

```bash
# Validate JSON syntax
cat vercel.json | jq .

# Check env format
grep -A 5 '"env"' vercel.json
```

---

## 🏗️ Build Failures

### Error: "Build exceeded maximum duration"

**Error Message:**

```
Error: The build exceeded the maximum duration of 45 minutes
```

**Solution 1: Increase Timeout**

```json
{
  "functions": {
    "server/_core/index.ts": {
      "maxDuration": 60
    }
  }
}
```

**Solution 2: Optimize Build**

```bash
# Clear build cache
rm -rf .next dist node_modules/.cache

# Reinstall dependencies
pnpm install --frozen-lockfile

# Test build locally
pnpm build
```

### Error: "Command failed with exit code 1"

**Common Causes:**

1. TypeScript compilation errors
2. Missing dependencies
3. Build script issues
4. Insufficient memory

**Diagnostic Steps:**

```bash
# Check TypeScript errors
pnpm check

# Test build locally
pnpm build

# Check build logs
tail -f dist/build.log
```

**Solution:**

```bash
# Fix TypeScript errors first
pnpm check

# Clean and rebuild
rm -rf dist node_modules
pnpm install
pnpm build
```

### Error: "Cannot find module"

**Error Message:**

```
Error: Cannot find module '@/components/ui/button'
Module not found: Can't resolve './lib/utils'
```

**Solution:**

1. Check `tsconfig.json` paths configuration:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./client/src/*"],
      "@shared/*": ["./shared/*"]
    }
  }
}
```

2. Verify file exists:

```bash
ls -la client/src/components/ui/button.tsx
```

3. Check import paths:

```typescript
// Use absolute paths
import { Button } from "@/components/ui/button";

// Not relative paths from wrong location
import { Button } from "../../../components/ui/button";
```

---

## 💥 Runtime Errors

### Error: "Internal Server Error (500)"

**Diagnostic Steps:**

```bash
# Check Vercel logs
vercel logs your-deployment-url

# Look for error stack traces
grep "Error:" deployment.log
```

**Common Causes & Solutions:**

#### 1. Database Connection Failed

```javascript
// Check DATABASE_URL is set correctly
console.log("Database URL:", process.env.DATABASE_URL ? "Set" : "Missing");

// Verify connection
import { db } from "./db";
await db.raw("SELECT 1");
```

#### 2. Missing Environment Variables

```javascript
// Add validation
const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET", "SESSION_SECRET"];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required env var: ${envVar}`);
  }
});
```

#### 3. Unhandled Promise Rejection

```javascript
// Add global error handlers
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", error => {
  console.error("Uncaught Exception:", error);
});
```

### Error: "Function execution timed out"

**Error Message:**

```
Task timed out after 10.00 seconds
```

**Solution:**

```json
{
  "functions": {
    "server/_core/index.ts": {
      "maxDuration": 60,
      "memory": 1024
    }
  }
}
```

---

## 🗄️ Database Connection Issues

### Error: "connect ETIMEDOUT"

**Error Message:**

```
Error: connect ETIMEDOUT
    at Connection._handleConnectTimeout
```

**Causes:**

1. Database server is down
2. Firewall blocking Vercel IPs
3. Incorrect connection string
4. SSL/TLS configuration issue

**Solution Steps:**

#### 1. Verify Connection String

```bash
# Format check
DATABASE_URL=mysql://username:password@host:port/database

# Test connection locally
mysql -h host -P port -u username -p database
```

#### 2. Check Firewall/Whitelist

```bash
# For Railway
# Add 0.0.0.0/0 in Railway Dashboard → Settings → Network

# For TiDB Cloud
# Add Vercel IPs or use 0.0.0.0/0 for testing
```

#### 3. SSL Configuration

```javascript
// Add SSL config if required
const connection = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
};
```

### Error: "Too many connections"

**Solution:**

```javascript
// Limit connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  queueLimit: 0,
  waitForConnections: true,
});
```

---

## 🔐 Environment Variable Problems

### Error: "Environment variable not found"

**Diagnostic:**

```bash
# List all environment variables in Vercel
vercel env ls

# Check specific variable
vercel env pull .env.local
cat .env.local | grep DATABASE_URL
```

**Solution:**

#### 1. Add Missing Variables

```bash
# Via Vercel CLI
vercel env add DATABASE_URL production

# Via Vercel Dashboard
# Settings → Environment Variables → Add
```

#### 2. Verify Variable Names

```bash
# Case-sensitive check
# ❌ database_url
# ✅ DATABASE_URL
```

#### 3. Check Environment Scope

Variables must be set for:

- ✅ Production
- ✅ Preview (optional)
- ✅ Development (optional)

### Error: "Invalid environment variable value"

**Common Issues:**

#### 1. Special Characters in Values

```bash
# Escape special characters
PASSWORD='MyP@ss$word!'

# Or use quotes
vercel env add DB_PASSWORD
# Enter: "MyP@ss$word!"
```

#### 2. Multiline Values

```bash
# For certificates or long values
vercel env add PRIVATE_KEY
# Paste entire content including newlines
```

---

## ⚡ Performance Issues

### Issue: "Slow page load times"

**Diagnostic:**

```bash
# Check bundle size
pnpm build
ls -lh dist/

# Analyze bundle
npx vite-bundle-visualizer
```

**Solutions:**

#### 1. Code Splitting

```typescript
// Use dynamic imports
const Dashboard = lazy(() => import("./pages/Dashboard"));
```

#### 2. Optimize Images

```bash
# Use next/image or optimize manually
npm install sharp
sharp input.png -o output.webp
```

#### 3. Enable Caching

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Issue: "High memory usage"

**Solution:**

```json
{
  "functions": {
    "server/_core/index.ts": {
      "memory": 3008
    }
  }
}
```

---

## 📝 TypeScript Errors

### Error: "Type 'X' is not assignable to type 'Y'"

**Solution:**

```bash
# Run type check locally
pnpm check

# Fix errors before deploying
# Check specific file
npx tsc --noEmit server/index.ts
```

### Error: "Cannot find type definition"

**Solution:**

```bash
# Install missing type definitions
pnpm add -D @types/express
pnpm add -D @types/node
```

### Error: "Implicit 'any' type"

**Solution:**

```typescript
// Add explicit types
function processData(data: unknown): Result {
  // Type guard
  if (typeof data === "string") {
    return { value: data };
  }
  throw new Error("Invalid data type");
}
```

---

## ⏱️ Deployment Timeout

### Error: "Deployment timed out after 20 minutes"

**Solutions:**

#### 1. Reduce Bundle Size

```bash
# Analyze dependencies
pnpm list --depth=0

# Remove unused dependencies
pnpm remove unused-package
```

#### 2. Optimize Build Process

```json
{
  "build": {
    "env": {
      "NODE_OPTIONS": "--max_old_space_size=4096"
    }
  }
}
```

#### 3. Use Build Cache

```json
{
  "buildCommand": "pnpm build --cache",
  "cacheDirectories": [".next/cache", "node_modules/.cache"]
}
```

---

## 🧪 Testing & Validation

### Pre-Deployment Testing Script

Create `scripts/pre-deploy-check.sh`:

```bash
#!/bin/bash

echo "🔍 Running pre-deployment checks..."

# 1. TypeScript check
echo "✅ Checking TypeScript..."
pnpm check || exit 1

# 2. Build test
echo "✅ Testing build..."
pnpm build || exit 1

# 3. Environment variables check
echo "✅ Checking environment variables..."
if [ ! -f .env ]; then
  echo "❌ .env file not found"
  exit 1
fi

# 4. Security check
echo "✅ Checking for exposed secrets..."
if git grep -i "password\|secret\|api_key" | grep -v ".example\|.md"; then
  echo "❌ Potential secrets found in code"
  exit 1
fi

# 5. Lint check (optional)
echo "✅ Running linter..."
pnpm lint --max-warnings 0 || echo "⚠️  Lint warnings found"

echo "✅ All pre-deployment checks passed!"
```

Run before deploying:

```bash
chmod +x scripts/pre-deploy-check.sh
./scripts/pre-deploy-check.sh
```

---

## 📊 Monitoring & Debugging

### Enable Detailed Logging

```typescript
// server/_core/index.ts
if (process.env.NODE_ENV === "production") {
  console.log("Environment:", {
    nodeEnv: process.env.NODE_ENV,
    databaseConfigured: !!process.env.DATABASE_URL,
    redisConfigured: !!process.env.REDIS_URL,
    // Don't log actual values!
  });
}
```

### Check Vercel Logs

```bash
# View recent logs
vercel logs

# Follow logs in real-time
vercel logs --follow

# Filter by function
vercel logs --function server/_core/index.ts
```

### Enable Error Tracking

```typescript
// Add Sentry or similar
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

---

## 🆘 Emergency Rollback

### Rollback to Previous Deployment

```bash
# Via Vercel Dashboard
# Deployments → [Previous Deployment] → Promote to Production

# Via CLI
vercel rollback [deployment-url]
```

### Quick Fix Process

1. Identify the issue
2. Fix locally and test
3. Create hotfix branch
4. Deploy to preview
5. Test preview deployment
6. Promote to production

---

## 📞 Getting Help

### Information to Provide

When asking for help, include:

1. **Error message** (full text)
2. **Build logs** (from Vercel Dashboard)
3. **Steps to reproduce**
4. **vercel.json** configuration
5. **Package versions** (package.json)
6. **Environment** (Node.js version, etc.)

### Support Resources

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues:** [Your repo issues](https://github.com/zeroos889-svg/RabitHR/issues)
- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **Community:** [Vercel Discord](https://vercel.com/discord)

---

## ✅ Troubleshooting Checklist

Before asking for help, verify:

- [ ] `vercel.json` syntax is valid (check with JSON validator)
- [ ] All environment variables are set in Vercel Dashboard
- [ ] Local build succeeds (`pnpm build`)
- [ ] TypeScript check passes (`pnpm check`)
- [ ] Database connection works locally
- [ ] No secrets exposed in code or logs
- [ ] Git repository is up to date
- [ ] Dependencies are installed (`pnpm install`)
- [ ] Build cache is cleared if needed
- [ ] Deployment logs reviewed for specific errors

---

**Last Updated:** 2025-11-04  
**Maintained by:** RabitHR Development Team

---

**Related Documents:**

- [Deployment Guide](./VERCEL_DEPLOYMENT_EN.md)
- [Security Guide](./SECURITY_NOTE.md)
- [README](./README.md)
