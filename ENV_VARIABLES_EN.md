# 🔐 Environment Variables Guide - RabitHR Platform

## 📋 Table of Contents

- [Overview](#overview)
- [Quick Setup](#quick-setup)
- [Required Variables](#required-variables)
- [Optional Variables](#optional-variables)
- [Configuration by Environment](#configuration-by-environment)

---

## 🌟 Overview

The RabitHR application uses **44 environment variables** to configure various services and features. They are divided into **required** and **optional** variables to make setup easier.

---

## ⚡ Quick Setup

### Basic Steps:

```bash
# 1. Copy the example file
cp .env.example .env

# 2. Edit the .env file with appropriate values
nano .env

# 3. Generate a secure JWT key
openssl rand -base64 32

# 4. Run the application
pnpm install
pnpm dev
```

---

## ✅ Required Variables

These variables are **essential** for running the application:

### 🗄️ Database

| Variable       | Description                   | Example                          |
| -------------- | ----------------------------- | -------------------------------- |
| `DATABASE_URL` | MySQL database connection URL | `mysql://user:pass@host:3306/db` |

**Database Options:**

1. **Railway MySQL**: Get the URL from Railway Dashboard
2. **TiDB Cloud**: Use connection URL from TiDB Dashboard
3. **Local MySQL**: `mysql://root:password@localhost:3306/rabithr_dev`

### 🔒 Security & Authentication

| Variable         | Description                                  | How to Generate           |
| ---------------- | -------------------------------------------- | ------------------------- |
| `JWT_SECRET`     | Secret key for JWT encryption (min 32 chars) | `openssl rand -base64 32` |
| `SESSION_SECRET` | Secret key for sessions                      | `openssl rand -base64 32` |
| `ADMIN_EMAIL`    | Email for first admin user                   | `admin@rabit.sa`          |
| `ADMIN_PASSWORD` | Password for first admin user                | Strong password           |

### 🌐 Application URLs

| Variable   | Description         | Default Value                 |
| ---------- | ------------------- | ----------------------------- |
| `NODE_ENV` | Runtime environment | `development` or `production` |
| `PORT`     | Server port         | `3000`                        |

---

## 🎨 Optional Variables

### 🖥️ User Interface

| Variable         | Description       | Default Value                        |
| ---------------- | ----------------- | ------------------------------------ |
| `VITE_APP_URL`   | Frontend URL      | `http://localhost:3000`              |
| `VITE_API_URL`   | Backend API URL   | `http://localhost:3000`              |
| `VITE_APP_TITLE` | Application title | `رابِط - منصة إدارة الموارد البشرية` |
| `VITE_APP_LOGO`  | Application logo  | `/logo.png`                          |

### 📧 Email Service

#### Resend (Recommended)

| Variable            | Description    | How to Get                                         |
| ------------------- | -------------- | -------------------------------------------------- |
| `RESEND_API_KEY`    | Resend API key | [resend.com/api-keys](https://resend.com/api-keys) |
| `RESEND_FROM_EMAIL` | Sender email   | `noreply@rabit.sa`                                 |

#### SMTP (Alternative)

| Variable        | Description             |
| --------------- | ----------------------- |
| `SMTP_HOST`     | SMTP server             |
| `SMTP_PORT`     | SMTP port (587 for TLS) |
| `SMTP_USER`     | Username                |
| `SMTP_PASSWORD` | Password                |
| `SMTP_FROM`     | Sender email            |

### 💬 SMS Service

| Variable              | Description         | Service                 |
| --------------------- | ------------------- | ----------------------- |
| `SMS_API_KEY`         | Generic API key     | -                       |
| `SMS_SENDER_ID`       | Sender ID           | `Rabit`                 |
| `TWILIO_PHONE_NUMBER` | Twilio phone number | Twilio                  |
| `TWILIO_AUTH_TOKEN`   | Auth token          | Twilio                  |
| `UNIFONIC_APP_SID`    | App SID             | Unifonic (Saudi Arabia) |

### 💳 Payment Gateways

#### Moyasar

| Variable                 | Description    |
| ------------------------ | -------------- |
| `MOYASAR_API_KEY`        | API key        |
| `MOYASAR_SECRET_KEY`     | Secret key     |
| `MOYASAR_WEBHOOK_SECRET` | Webhook secret |

#### Tap Payments

| Variable         | Description |
| ---------------- | ----------- |
| `TAP_API_KEY`    | API key     |
| `TAP_SECRET_KEY` | Secret key  |

### ☁️ Cloud Storage (AWS S3)

| Variable                | Description       | Default Value     |
| ----------------------- | ----------------- | ----------------- |
| `AWS_ACCESS_KEY_ID`     | Access key ID     | -                 |
| `AWS_SECRET_ACCESS_KEY` | Secret access key | -                 |
| `AWS_REGION`            | AWS region        | `us-east-1`       |
| `AWS_S3_BUCKET`         | Bucket name       | `rabithr-storage` |

### 🗺️ Google Maps

| Variable              | Description | How to Get                                                |
| --------------------- | ----------- | --------------------------------------------------------- |
| `GOOGLE_MAPS_API_KEY` | API key     | [Google Cloud Console](https://console.cloud.google.com/) |

### 🤖 Artificial Intelligence

| Variable         | Description    | How to Get                                                  |
| ---------------- | -------------- | ----------------------------------------------------------- |
| `OPENAI_API_KEY` | OpenAI API key | [platform.openai.com](https://platform.openai.com/api-keys) |

### 🔧 Forge Storage API

| Variable                      | Description      | Usage             |
| ----------------------------- | ---------------- | ----------------- |
| `BUILT_IN_FORGE_API_URL`      | Server API URL   | Server operations |
| `BUILT_IN_FORGE_API_KEY`      | Server API key   | Server operations |
| `VITE_FRONTEND_FORGE_API_URL` | Frontend API URL | Map operations    |
| `VITE_FRONTEND_FORGE_API_KEY` | Frontend API key | Map operations    |

### 📊 Analytics & Monitoring

#### Analytics

| Variable                    | Description        |
| --------------------------- | ------------------ |
| `VITE_ANALYTICS_ENDPOINT`   | Analytics endpoint |
| `VITE_ANALYTICS_WEBSITE_ID` | Website ID         |

#### Sentry (Error Tracking)

| Variable            | Description | How to Get                                        |
| ------------------- | ----------- | ------------------------------------------------- |
| `VITE_SENTRY_DSN`   | Sentry DSN  | [sentry.io](https://sentry.io/settings/projects/) |
| `SENTRY_AUTH_TOKEN` | Auth token  | Sentry Settings                                   |
| `VITE_SENTRY_DEBUG` | Debug mode  | `false` (default)                                 |

### 🚀 Redis (Caching)

| Variable    | Description          | Default Value            |
| ----------- | -------------------- | ------------------------ |
| `REDIS_URL` | Redis connection URL | `redis://localhost:6379` |

**Redis Benefits:**

- Performance improvement
- Session storage
- Data caching

### 🔐 OAuth (Optional)

| Variable                | Description      |
| ----------------------- | ---------------- |
| `VITE_OAUTH_PORTAL_URL` | OAuth portal URL |
| `VITE_APP_ID`           | Application ID   |

### 🐳 Docker (Local Development)

| Variable              | Description              | Default Value  |
| --------------------- | ------------------------ | -------------- |
| `MYSQL_ROOT_PASSWORD` | MySQL password in Docker | `rootpassword` |

---

## 🎯 Configuration by Environment

### Development Environment

```env
NODE_ENV=development
DATABASE_URL=mysql://root:password@localhost:3306/rabithr_dev
JWT_SECRET=your-dev-secret-min-32-chars
SESSION_SECRET=your-dev-session-secret
ADMIN_EMAIL=admin@localhost
ADMIN_PASSWORD=DevPassword123!
VITE_APP_URL=http://localhost:3000
VITE_API_URL=http://localhost:3000
PORT=3000
REDIS_URL=redis://localhost:6379
```

### Production Environment

#### Frontend (Vercel)

```env
NODE_ENV=production
VITE_APP_URL=https://rabit-hr.vercel.app
VITE_API_URL=https://your-backend.railway.app
VITE_APP_TITLE=رابِط - منصة إدارة الموارد البشرية
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

#### Backend (Railway)

```env
NODE_ENV=production
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=your-super-secure-production-secret-min-32-chars
SESSION_SECRET=your-super-secure-session-secret
SESSION_MAX_AGE=604800000
ADMIN_EMAIL=admin@rabit.sa
ADMIN_PASSWORD=SecureProductionPassword123!
PORT=3000
REDIS_URL=redis://user:password@host:port

# Optional services
RESEND_API_KEY=re_your_production_key
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
MOYASAR_API_KEY=your_moyasar_key
OPENAI_API_KEY=sk-your_openai_key
```

### Docker Compose

```env
NODE_ENV=production
DATABASE_URL=mysql://root:rootpassword@db:3306/rabithr
MYSQL_ROOT_PASSWORD=rootpassword
JWT_SECRET=your-docker-secret-min-32-chars
SESSION_SECRET=your-docker-session-secret
REDIS_URL=redis://redis:6379
```

---

## 🔒 Security Best Practices

### ✅ Do:

- Use long, random secret keys (32+ characters)
- Change default admin password immediately
- Use HTTPS in production
- Keep `.env` file in `.gitignore`
- Use secret management services (Vercel Environment Variables, Railway Environment Variables)
- Review and update secret keys regularly

### ❌ Don't:

- Don't share `.env` file with others
- Don't commit `.env` to GitHub or any public repository
- Don't use default values in production
- Don't put secrets in source code
- Don't reuse same keys between different environments

---

## 📝 Important Notes

1. **Required Variables**: Only `DATABASE_URL` and `JWT_SECRET` are required to run the basic application
2. **Optional Variables**: Enable additional features (payments, SMS, cloud storage, etc.)
3. **VITE\_\* Variables**: Frontend variables must start with `VITE_`
4. **Multiple Environments**: Use `.env.development` and `.env.production` files to separate environments

---

## 🆘 Help & Support

If you encounter any issues:

1. Check that all required variables are present
2. Verify database URL format is correct
3. Review application error logs
4. Check connection permissions to external services

---

## 📚 Additional Resources

- [Installation Guide (INSTALLATION.md)](./INSTALLATION.md)
- [Deployment Guide (DEPLOYMENT_GUIDE_FULL.md)](./DEPLOYMENT_GUIDE_FULL.md)
- [Security (SECURITY.md)](./SECURITY.md)
- [Quick Start (QUICK_START.md)](./QUICK_START.md)

---

**Last Updated:** 2025-11-05  
**Version:** 1.0.0
