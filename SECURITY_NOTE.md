# 🔐 Security Note: Environment Variables Management

## Overview
This document explains how to securely manage environment variables and secrets for the RabitHR platform deployment on Vercel and other platforms.

## ⚠️ Important Security Rules

### 1. Never Commit Secrets to Git
- **NEVER** commit `.env` files containing actual secrets
- **NEVER** hardcode API keys, passwords, or tokens in source code
- **ALWAYS** use `.gitignore` to exclude sensitive files

### 2. Files Already Protected
The following files are automatically ignored by Git:
- `.env`
- `.env.local`
- `.env.development.local`
- `.env.test.local`
- `.env.production.local`
- `.env.production`
- `*.key`
- `*.pem`

## 🔑 Environment Variables on Vercel

### How Vercel Handles Environment Variables

Vercel uses **secret references** in `vercel.json` with the `@` prefix:

```json
{
  "env": {
    "DATABASE_URL": "@database_url",
    "JWT_SECRET": "@jwt_secret",
    "SESSION_SECRET": "@session_secret"
  }
}
```

### Setting Up Secrets in Vercel

#### Method 1: Vercel Dashboard (Recommended)
1. Go to your project on Vercel Dashboard
2. Navigate to: **Settings → Environment Variables**
3. Add each variable:
   - **Key**: `DATABASE_URL`
   - **Value**: Your actual database connection string
   - **Environment**: Select Production, Preview, or Development

#### Method 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to your account
vercel login

# Add secrets
vercel env add database_url
vercel env add jwt_secret
vercel env add session_secret
```

## 📋 Required Environment Variables

### Essential Variables (Required for Deployment)
| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MySQL database connection string | `mysql://user:pass@host:3306/db` |
| `JWT_SECRET` | Secret key for JWT tokens (min 32 chars) | Generate with: `openssl rand -base64 32` |
| `SESSION_SECRET` | Secret key for sessions | Generate with: `openssl rand -base64 32` |
| `NODE_ENV` | Environment mode | `production` |

### Optional Variables (For Full Functionality)
| Variable | Description | Required For |
|----------|-------------|--------------|
| `REDIS_URL` | Redis connection string | Caching & performance |
| `RESEND_API_KEY` | Resend email service API key | Email notifications |
| `RESEND_FROM_EMAIL` | Sender email address | Email notifications |
| `AWS_ACCESS_KEY_ID` | AWS access key | File storage (S3) |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | File storage (S3) |
| `AWS_REGION` | AWS region | File storage (S3) |
| `AWS_S3_BUCKET` | S3 bucket name | File storage |
| `OPENAI_API_KEY` | OpenAI API key | AI features |
| `VITE_SENTRY_DSN` | Sentry DSN | Error tracking |
| `MOYASAR_API_KEY` | Moyasar payment gateway key | Payment processing |
| `TAP_API_KEY` | Tap payment gateway key | Payment processing |
| `SMS_API_KEY` | SMS service API key | SMS notifications |
| `GOOGLE_MAPS_API_KEY` | Google Maps API key | Maps integration |

## 🛡️ Best Practices

### 1. Generate Strong Secrets
```bash
# Generate a secure JWT secret (32+ characters)
openssl rand -base64 32

# Generate a session secret
openssl rand -base64 32

# Generate a random UUID
uuidgen
```

### 2. Use Different Secrets for Each Environment
- **Development**: Use separate secrets for local development
- **Preview/Staging**: Use different secrets from production
- **Production**: Use the strongest, unique secrets

### 3. Rotate Secrets Regularly
- Change JWT and session secrets every 3-6 months
- Rotate API keys if any breach is suspected
- Update database passwords periodically

### 4. Limit Secret Access
- Only share secrets with team members who need them
- Use Vercel's team permissions to control access
- Never share secrets via email or chat

## 📝 Local Development Setup

### 1. Copy the Example File
```bash
cp .env.example .env
```

### 2. Fill in Your Local Values
Edit `.env` with your development credentials:
```env
NODE_ENV=development
DATABASE_URL=mysql://root:password@localhost:3306/rabithr_dev
JWT_SECRET=your-local-dev-secret-min-32-characters
SESSION_SECRET=your-session-secret-for-dev
VITE_APP_URL=http://localhost:3000
```

### 3. Never Commit the .env File
The `.env` file is already in `.gitignore` - keep it that way!

## 🚨 Security Checklist

Before deploying to production, verify:

- [ ] All secrets use the `@secret_name` format in `vercel.json`
- [ ] No hardcoded credentials in source code
- [ ] `.env` files are in `.gitignore`
- [ ] All required environment variables are set in Vercel
- [ ] JWT_SECRET is at least 32 characters long
- [ ] SESSION_SECRET is unique and secure
- [ ] Database credentials are not exposed
- [ ] API keys are valid and active
- [ ] Different secrets for dev/staging/production

## 📞 What to Do If Secrets Are Exposed

If you accidentally commit secrets to Git:

### 1. Immediate Actions
```bash
# Remove the file from Git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Or use git-filter-repo (recommended)
git filter-repo --path .env --invert-paths
```

### 2. Rotate All Exposed Secrets
- Generate new JWT_SECRET and SESSION_SECRET
- Update all API keys that were exposed
- Change database passwords
- Update all secrets in Vercel

### 3. Monitor for Unauthorized Access
- Check database logs for suspicious activity
- Review API usage for unusual patterns
- Monitor error tracking for security issues

## 🔗 Additional Resources

- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel Secrets CLI Reference](https://vercel.com/docs/cli#commands/secrets)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)
- [Generate Strong Passwords](https://www.random.org/passwords/)

## 📌 Summary

**Remember:**
1. ✅ Use `@secret_name` references in `vercel.json`
2. ✅ Store actual values in Vercel Dashboard
3. ✅ Keep `.env` files out of Git
4. ✅ Use strong, unique secrets for production
5. ✅ Rotate secrets regularly
6. ❌ Never hardcode secrets in code
7. ❌ Never commit `.env` to Git
8. ❌ Never share secrets insecurely

---

**Last Updated:** 2025-11-04  
**Maintained by:** RabitHR Development Team
