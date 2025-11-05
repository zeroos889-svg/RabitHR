# RabitHR Platform - Complete Deployment Guide

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Environment Setup](#environment-setup)
4. [Vercel Deployment](#vercel-deployment)
5. [Docker Deployment](#docker-deployment)
6. [Database Configuration](#database-configuration)
7. [Security Best Practices](#security-best-practices)
8. [Troubleshooting](#troubleshooting)
9. [Maintenance](#maintenance)

---

## 🎯 Overview

RabitHR is a comprehensive Human Resources Management platform built with modern technologies:

- **Frontend**: React 19 + Vite
- **Backend**: Node.js + Express + tRPC
- **Database**: MySQL (compatible with TiDB, Railway, PlanetScale)
- **ORM**: Drizzle ORM
- **Package Manager**: pnpm 10.4.1

---

## 📦 Prerequisites

### Required Tools

- Node.js 18.x or higher
- pnpm 10.4.1
- Git
- MySQL database (local or cloud)

### Optional Tools

- Docker & Docker Compose
- Vercel CLI
- Redis (for caching)

### Installation Commands

```bash
# Install Node.js (if not installed)
# Visit: https://nodejs.org/

# Install pnpm
npm install -g pnpm@10.4.1

# Verify installations
node --version  # Should be v18.x or higher
pnpm --version  # Should be 10.4.1
```

---

## 🔧 Environment Setup

### 1. Clone Repository

```bash
git clone https://github.com/zeroos889-svg/RabitHR.git
cd RabitHR
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

```bash
# Copy example file
cp .env.example .env

# Edit .env with your actual values
nano .env
```

### Required Environment Variables

#### Database (Required)

```env
DATABASE_URL=mysql://username:password@host:port/database
```

#### Security (Required)

```env
JWT_SECRET=your-secret-key-min-32-chars
SESSION_SECRET=your-session-secret-key
```

#### Application (Required)

```env
NODE_ENV=production
VITE_APP_URL=https://your-domain.com
```

#### Optional Services

```env
# Redis Cache
REDIS_URL=redis://host:port

# Email Service (Resend)
RESEND_API_KEY=your_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# AWS S3 Storage
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# Payment Gateways
MOYASAR_API_KEY=your_moyasar_key
TAP_API_KEY=your_tap_key

# Sentry Error Tracking
VITE_SENTRY_DSN=your_sentry_dsn
```

### 4. Generate Secrets

```bash
# Generate JWT_SECRET
openssl rand -base64 32

# Generate SESSION_SECRET
openssl rand -base64 32
```

---

## 🚀 Vercel Deployment

### Method 1: Deploy via GitHub (Recommended)

#### Step 1: Push to GitHub

```bash
git add .
git commit -m "feat: prepare for deployment"
git push origin main
```

#### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Select the RabitHR project

#### Step 3: Configure Build Settings

Vercel will automatically detect settings from `vercel.json`:

- **Framework**: Vite
- **Build Command**: `pnpm build`
- **Install Command**: `pnpm install`
- **Output Directory**: `dist`

#### Step 4: Add Environment Variables

In Vercel Dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add all required variables from `.env.example`
3. For each variable:
   - **Key**: Variable name (e.g., `DATABASE_URL`)
   - **Value**: Actual value
   - **Environments**: Select Production, Preview, Development

**Critical Variables to Add:**

```
NODE_ENV=production
DATABASE_URL=mysql://user:pass@host:port/db
JWT_SECRET=your-generated-secret
SESSION_SECRET=your-generated-secret
VITE_APP_URL=https://your-domain.vercel.app
```

#### Step 5: Deploy

Click **"Deploy"** and wait for the build to complete.

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Pull environment variables (if already configured)
vercel env pull .env.local

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 🐳 Docker Deployment

### Prerequisites

- Docker installed
- Docker Compose installed

### Using Docker Compose (Recommended)

#### 1. Update docker-compose.yml

Ensure `docker-compose.yml` has correct environment variables:

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=mysql://user:pass@mysql:3306/rabithr
      - JWT_SECRET=${JWT_SECRET}
      - SESSION_SECRET=${SESSION_SECRET}
    depends_on:
      - mysql

  mysql:
    image: mysql:8
    environment:
      - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
      - MYSQL_DATABASE=rabithr
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

#### 2. Build and Run

```bash
# Build image
docker-compose build

# Start services
docker-compose up -d

# Check logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### Using Docker Only

#### 1. Build Image

```bash
docker build -t rabithr:latest .
```

#### 2. Run Container

```bash
docker run -d \
  --name rabithr \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=mysql://user:pass@host:3306/db \
  -e JWT_SECRET=your-secret \
  -e SESSION_SECRET=your-secret \
  rabithr:latest
```

#### 3. Verify

```bash
# Check if container is running
docker ps

# Check logs
docker logs rabithr

# Access shell
docker exec -it rabithr sh
```

---

## 💾 Database Configuration

### Option 1: Railway MySQL

1. Create Railway account: [railway.app](https://railway.app)
2. Create new MySQL database
3. Copy connection string from Railway dashboard
4. Add to environment variables:
   ```env
   DATABASE_URL=mysql://root:password@host.railway.app:port/railway
   ```

### Option 2: TiDB Cloud

1. Create TiDB Cloud account: [tidbcloud.com](https://tidbcloud.com)
2. Create new cluster
3. Get connection string
4. Add to environment variables:
   ```env
   DATABASE_URL=mysql://user:password@host.tidbcloud.com:4000/database
   ```

### Option 3: Local MySQL

```bash
# Install MySQL
# macOS
brew install mysql

# Ubuntu
sudo apt install mysql-server

# Start MySQL
mysql -u root -p

# Create database
CREATE DATABASE rabithr_prod;
CREATE USER 'rabithr'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON rabithr_prod.* TO 'rabithr'@'localhost';
FLUSH PRIVILEGES;
```

### Run Database Migrations

```bash
# Push schema to database
pnpm db:push

# Or manually run migrations
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

---

## 🔒 Security Best Practices

### 1. Secrets Management

**DO:**

- ✅ Store secrets in environment variables
- ✅ Use `.env` for local development
- ✅ Use Vercel Environment Variables for production
- ✅ Rotate secrets regularly (every 90 days)
- ✅ Use strong, randomly generated secrets

**DON'T:**

- ❌ Commit `.env` to Git
- ❌ Share secrets in code or comments
- ❌ Use weak or predictable secrets
- ❌ Hardcode credentials

### 2. Database Security

- Enable SSL/TLS for database connections
- Use strong database passwords
- Whitelist only necessary IPs
- Regular backups
- Monitor for suspicious activity

### 3. Application Security

- Keep dependencies updated: `pnpm update`
- Run security audits: `pnpm audit`
- Use HTTPS only
- Enable CORS properly
- Implement rate limiting
- Use security headers (already configured in `vercel.json`)

### 4. Access Control

- Use strong admin passwords
- Implement 2FA for admin accounts
- Regular security audits
- Principle of least privilege

---

## 🔍 Troubleshooting

### Build Failures

#### Issue: "Module not found"

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### Issue: "TypeScript errors"

```bash
# Check for errors
pnpm check

# Fix automatically if possible
pnpm format
```

### Database Connection Issues

#### Issue: "ETIMEDOUT" or "ECONNREFUSED"

- Verify DATABASE_URL is correct
- Check if database server is running
- Verify IP whitelist includes your server
- Check firewall settings

#### Issue: "Access denied"

- Verify username and password
- Check user has correct permissions
- Ensure SSL settings are correct

### Vercel Deployment Issues

#### Issue: "env should be object"

- **Solution**: This has been fixed in `vercel.json`
- Ensure environment variables are set in Vercel Dashboard
- Not in `vercel.json` file

#### Issue: "Build timeout"

- Upgrade to Vercel Pro for longer build times
- Optimize build process
- Enable caching

### Docker Issues

#### Issue: "ENOENT: no such file or directory, open '/app/patches/...'"

- **Solution**: Already fixed in Dockerfile
- Ensure `COPY patches ./patches` is before `pnpm install`

#### Issue: "Network error during pnpm install"

- Check internet connection
- Try using npm registry mirror
- Increase Docker build timeout

---

## 🔄 Maintenance

### Regular Tasks

#### Daily

- Monitor application logs
- Check error rates
- Verify backup success

#### Weekly

- Review security alerts
- Check database performance
- Update dependencies (if needed)

#### Monthly

- Security audit
- Performance optimization
- Database cleanup
- Review and rotate secrets

### Update Application

```bash
# Pull latest changes
git pull origin main

# Install new dependencies
pnpm install

# Run migrations
pnpm db:push

# Build
pnpm build

# Test
pnpm test

# Deploy
vercel --prod
```

### Backup Database

```bash
# MySQL backup
mysqldump -u username -p database_name > backup_$(date +%Y%m%d).sql

# Restore
mysql -u username -p database_name < backup_20250105.sql
```

### Monitor Application

#### Using Vercel Dashboard

1. Go to your project in Vercel
2. Click "Analytics"
3. Monitor:
   - Request count
   - Error rate
   - Response time
   - Cache hit rate

#### Using Sentry (if configured)

1. Check error reports
2. Monitor performance
3. Set up alerts

---

## 📞 Support & Resources

### Documentation

- [Main README](./README.md)
- [Vercel Deployment (Arabic)](./VERCEL_DEPLOYMENT_AR.md)
- [Vercel Deployment (English)](./VERCEL_DEPLOYMENT_EN.md)
- [Troubleshooting Guide](./VERCEL_TROUBLESHOOTING_EN.md)
- [Security Review](./SECURITY_REVIEW.md)

### External Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/docs/)

### Community

- GitHub Issues: Report bugs and request features
- GitHub Discussions: Ask questions and share ideas

---

## ✅ Deployment Checklist

Before going live, ensure:

### Pre-Deployment

- [ ] All environment variables configured
- [ ] Database is set up and accessible
- [ ] Secrets are strong and secure
- [ ] `.env` is in `.gitignore`
- [ ] All tests pass: `pnpm test`
- [ ] Build succeeds: `pnpm build`
- [ ] TypeScript check passes: `pnpm check`

### Deployment

- [ ] Code pushed to GitHub
- [ ] Vercel project linked
- [ ] Environment variables added in Vercel
- [ ] Database migrations run
- [ ] Initial deployment successful

### Post-Deployment

- [ ] Application accessible at production URL
- [ ] Database connection working
- [ ] Authentication working
- [ ] Core features tested
- [ ] SSL/HTTPS enabled
- [ ] Monitoring set up
- [ ] Backup configured
- [ ] Documentation updated

---

## 🎉 Success!

Your RabitHR platform is now deployed and ready to use!

**Production URL**: `https://your-project.vercel.app`

**Next Steps**:

1. Test all features thoroughly
2. Set up monitoring and alerts
3. Configure regular backups
4. Train your team
5. Start using the platform!

---

**Version**: 1.0.0  
**Last Updated**: 2025-11-05  
**Maintainer**: RabitHR Team
