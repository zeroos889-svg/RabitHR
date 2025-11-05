# 🚀 Vercel Deployment Guide - Complete & Error-Free

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Pre-Deployment Checklist](#pre-deployment-checklist)
3. [Step-by-Step Deployment](#step-by-step-deployment)
4. [Environment Variables Configuration](#environment-variables-configuration)
5. [Deployment Verification](#deployment-verification)
6. [Post-Deployment Testing](#post-deployment-testing)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Prerequisites

### Required Accounts

- ✅ [GitHub Account](https://github.com) with repository access
- ✅ [Vercel Account](https://vercel.com) (sign up with GitHub)
- ✅ Database service (Railway, TiDB Cloud, or PlanetScale)

### Required Tools (for local testing)

```bash
# Node.js 18+ and pnpm
node --version  # Should be v18.0.0 or higher
pnpm --version  # Should be 8.0.0 or higher

# If pnpm is not installed:
npm install -g pnpm
```

---

## ✅ Pre-Deployment Checklist

### 1. Verify Project Configuration

#### Check `vercel.json` Format

The file must have `env` as an **object**, not an array:

```json
{
  "env": {
    "DATABASE_URL": "@database_url",
    "JWT_SECRET": "@jwt_secret"
  }
}
```

✅ **Correct** - env is an object with key-value pairs  
❌ **Incorrect** - env as array like `["DATABASE_URL", "JWT_SECRET"]`

#### Verify Build Settings

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### 2. Local Testing (Critical!)

Run these commands to ensure zero errors:

```bash
# Install dependencies
pnpm install

# TypeScript check (must show 0 errors)
pnpm check

# Build the project (must complete successfully)
pnpm build

# Optional: Preview the build
pnpm preview
```

**Expected Results:**

```
✅ TypeScript: 0 errors
✅ Build: Completed in ~16 seconds
✅ Output: dist/ directory created
```

### 3. Security Verification

Check for exposed secrets:

```bash
# Search for potential secrets in code
grep -r "sk_" client/ server/
grep -r "password" client/ server/
grep -r "secret" client/ server/ | grep -v ".example"

# Verify .gitignore includes .env files
cat .gitignore | grep "\.env"
```

**Must verify:**

- [ ] No hardcoded API keys
- [ ] No database credentials in code
- [ ] `.env` files are in `.gitignore`
- [ ] All sensitive data uses environment variables

---

## 🚀 Step-by-Step Deployment

### Step 1: Connect to Vercel

#### Option A: Vercel Dashboard (Recommended)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repository: `zeroos889-svg/RabitHR`
5. Click **"Import"**

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd /path/to/RabitHR
vercel
```

### Step 2: Configure Project Settings

In Vercel Dashboard → Project Settings:

#### Build & Development Settings

- **Framework Preset:** Vite
- **Build Command:** `pnpm build`
- **Output Directory:** `dist`
- **Install Command:** `pnpm install`
- **Node.js Version:** 18.x

#### Root Directory

- Leave as default (root of repository)

### Step 3: Set Environment Variables

Go to: **Settings → Environment Variables**

Add each variable for **Production** environment:

#### Essential Variables (Required)

| Key              | Value                                | Description                     |
| ---------------- | ------------------------------------ | ------------------------------- |
| `NODE_ENV`       | `production`                         | Environment mode                |
| `DATABASE_URL`   | `mysql://user:pass@host:3306/db`     | Your database connection string |
| `JWT_SECRET`     | Generate: `openssl rand -base64 32`  | JWT signing secret (32+ chars)  |
| `SESSION_SECRET` | Generate: `openssl rand -base64 32`  | Session encryption secret       |
| `VITE_APP_URL`   | `https://your-app.vercel.app`        | Your Vercel deployment URL      |
| `VITE_APP_TITLE` | `رابِط - منصة إدارة الموارد البشرية` | Application title               |
| `VITE_APP_LOGO`  | `/logo.png`                          | Logo path                       |

#### Optional Variables (Add as needed)

| Key                     | Value                         | Required For          |
| ----------------------- | ----------------------------- | --------------------- |
| `REDIS_URL`             | `redis://user:pass@host:6379` | Performance & caching |
| `RESEND_API_KEY`        | `re_xxxxx`                    | Email notifications   |
| `RESEND_FROM_EMAIL`     | `noreply@yourdomain.com`      | Email sender          |
| `AWS_ACCESS_KEY_ID`     | Your AWS key                  | S3 file storage       |
| `AWS_SECRET_ACCESS_KEY` | Your AWS secret               | S3 file storage       |
| `AWS_REGION`            | `us-east-1`                   | AWS region            |
| `AWS_S3_BUCKET`         | `your-bucket-name`            | S3 bucket             |
| `OPENAI_API_KEY`        | `sk-xxxxx`                    | AI features           |
| `VITE_SENTRY_DSN`       | `https://xxx@sentry.io/xxx`   | Error tracking        |
| `MOYASAR_API_KEY`       | Your Moyasar key              | Payment processing    |
| `TAP_API_KEY`           | Your Tap key                  | Payment processing    |
| `SMS_API_KEY`           | Your SMS key                  | SMS notifications     |
| `GOOGLE_MAPS_API_KEY`   | Your Google key               | Maps integration      |

### Step 4: Deploy

1. Click **"Deploy"** button in Vercel Dashboard
2. Wait for build to complete (typically 2-5 minutes)
3. Check build logs for any errors

**Build Process:**

```
⏳ Installing dependencies... (30-60s)
⏳ Building application...     (15-30s)
⏳ Optimizing assets...        (5-10s)
✅ Deployment successful!
```

---

## 🔍 Deployment Verification

### 1. Check Build Logs

In Vercel Dashboard → Deployments → [Your Deployment] → Logs

Look for:

```
✅ Build Completed
✅ Serverless Functions Created
✅ Static Files Deployed
✅ Domain Assigned
```

### 2. Verify Deployment URL

You'll receive a URL like: `https://rabithr-xyz.vercel.app`

Test the URL:

```bash
curl -I https://your-deployment.vercel.app
```

Expected response:

```
HTTP/2 200
content-type: text/html
x-vercel-id: ...
```

### 3. Check Environment Variables

In Vercel Dashboard:

- Go to: **Settings → Environment Variables**
- Verify all required variables are set
- Check that secrets are not exposed in logs

---

## 🧪 Post-Deployment Testing

### 1. Basic Functionality Test

Visit your deployment URL and test:

- [ ] Homepage loads correctly
- [ ] Login page is accessible
- [ ] Static assets load (CSS, images, fonts)
- [ ] API endpoints respond
- [ ] Database connection works

### 2. Authentication Test

```bash
# Test login endpoint
curl -X POST https://your-app.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test"}'
```

### 3. Database Connection Test

Check logs for database connection messages:

```
✅ Database connected successfully
✅ Running migrations...
✅ Application ready
```

### 4. Performance Check

- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms
- [ ] No JavaScript errors in console
- [ ] All images load properly

---

## 🎉 Success Criteria

Your deployment is successful if:

✅ **Build Status:** Completed without errors  
✅ **TypeScript:** 0 compilation errors  
✅ **Deployment:** Live and accessible  
✅ **Environment Variables:** All required variables set  
✅ **Security:** No exposed secrets in logs  
✅ **Functionality:** Core features working  
✅ **Performance:** Page loads in < 3 seconds  
✅ **Database:** Connection established

---

## 🔧 Common Issues and Quick Fixes

### Issue 1: "env should be object" Error

**Solution:** Update `vercel.json`:

```json
{
  "env": {
    "DATABASE_URL": "@database_url"
  }
}
```

### Issue 2: Build Timeout

**Solution:** Increase timeout in `vercel.json`:

```json
{
  "functions": {
    "server/_core/index.ts": {
      "maxDuration": 60
    }
  }
}
```

### Issue 3: Missing Environment Variables

**Solution:** Check Vercel Dashboard → Settings → Environment Variables

- Ensure all required variables are set
- Verify variable names match exactly (case-sensitive)
- Redeploy after adding variables

### Issue 4: Database Connection Failed

**Solution:**

1. Verify DATABASE_URL format: `mysql://user:pass@host:port/db`
2. Check database credentials
3. Ensure database allows connections from Vercel IPs
4. Test connection locally first

### Issue 5: TypeScript Errors During Build

**Solution:**

```bash
# Run locally to see detailed errors
pnpm check

# Fix all TypeScript errors before deploying
```

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)
- [Troubleshooting Guide](./VERCEL_TROUBLESHOOTING_EN.md)
- [Security Best Practices](./SECURITY_NOTE.md)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

---

## 🆘 Need Help?

### Troubleshooting Steps

1. Check [VERCEL_TROUBLESHOOTING_EN.md](./VERCEL_TROUBLESHOOTING_EN.md)
2. Review deployment logs in Vercel Dashboard
3. Test locally with `pnpm build`
4. Check environment variables configuration
5. Verify database connectivity

### Support Channels

- GitHub Issues: [Create an issue](https://github.com/zeroos889-svg/RabitHR/issues)
- Vercel Support: [support.vercel.com](https://vercel.com/support)
- Community Forum: [Vercel Community](https://github.com/vercel/vercel/discussions)

---

## ✅ Deployment Completion Checklist

Before marking deployment as complete:

- [ ] Local build succeeds (`pnpm build`)
- [ ] TypeScript check passes (`pnpm check`)
- [ ] All environment variables configured in Vercel
- [ ] Deployment completed successfully
- [ ] Application accessible at deployment URL
- [ ] Login functionality works
- [ ] Database connection established
- [ ] No secrets exposed in logs
- [ ] Security headers configured
- [ ] Performance is acceptable
- [ ] Error tracking configured (optional)
- [ ] Custom domain configured (optional)

---

**Deployment Status:** ✅ Ready for Production  
**Last Updated:** 2025-11-04  
**Maintained by:** RabitHR Development Team

---

🎯 **Next Steps After Deployment:**

1. Monitor deployment logs for issues
2. Set up custom domain (optional)
3. Configure CDN and caching
4. Enable error tracking with Sentry
5. Set up monitoring and analytics
6. Create production database backups
7. Document deployment procedures for team
