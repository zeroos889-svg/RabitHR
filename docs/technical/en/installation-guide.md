# Installation Guide - Rabit Platform

**Version:** 1.0.0  
**Date:** November 2025  
**Author:** Rabit Technical Team

---

## Overview

This guide provides comprehensive instructions for installing and configuring the Rabit HR Management Platform. The platform is built on modern technologies ensuring high performance, security, and full compliance with Saudi Labor Law.

## Prerequisites

Before beginning the installation process, ensure the following requirements are met in your environment:

### Hardware Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | 2 cores | 4+ cores |
| RAM | 4 GB | 8+ GB |
| Storage | 20 GB | 50+ GB |
| Internet Connection | 10 Mbps | 100+ Mbps |

### Software Requirements

The Rabit platform depends on several modern technologies and tools that must be installed beforehand:

**Node.js**: Version 22.13.0 or newer must be installed to run the server and application. You can verify the installed version using the command `node --version` in the terminal.

**pnpm**: The package manager used in the project. Version 9.0.0 or newer is required. It can be installed via npm using the command `npm install -g pnpm`.

**Database**: The platform uses MySQL or TiDB as the primary database. MySQL 8.0+ or TiDB 7.0+ must be installed.

**Git**: For version control and obtaining the source code, Git 2.30 or newer must be installed.

## Installation Steps

### 1. Obtain Source Code

Clone the repository from GitHub to get the platform source code:

```bash
git clone https://github.com/rabit-hr/rabit-platform.git
cd rabit-platform
```

### 2. Install Dependencies

After obtaining the source code, install all required packages and dependencies:

```bash
pnpm install
```

This command will automatically download and install all required packages, including React, TypeScript, Tailwind CSS, and other essential libraries.

### 3. Database Setup

Create a new database for the platform and configure the connection:

```bash
# Create new database
mysql -u root -p -e "CREATE DATABASE rabit_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Grant privileges to user
mysql -u root -p -e "GRANT ALL PRIVILEGES ON rabit_db.* TO 'rabit_user'@'localhost' IDENTIFIED BY 'secure_password';"
```

### 4. Configure Environment Variables

Create a `.env` file in the project root directory and populate it with appropriate values:

```env
# Database
DATABASE_URL=mysql://rabit_user:secure_password@localhost:3306/rabit_db

# Authentication
JWT_SECRET=your_jwt_secret_key_here
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im

# Application
VITE_APP_ID=your_app_id_here
VITE_APP_TITLE=Rabit - Saudi HR Management Assistant
VITE_APP_LOGO=/rabit-logo.svg

# Manus APIs
BUILT_IN_FORGE_API_URL=https://forge.manus.im
BUILT_IN_FORGE_API_KEY=your_api_key_here
```

### 5. Apply Database Schema

After configuring the database connection, apply the base schema:

```bash
pnpm db:push
```

This command will automatically create all necessary tables and relationships in the database.

### 6. Seed Initial Data (Optional)

To create test data for testing purposes:

```bash
npx tsx scripts/seed-test-users.mjs
```

This command will create test accounts for admins, consultants, and companies.

### 7. Run the Platform

After completing all previous steps, run the platform in development mode:

```bash
pnpm dev
```

The platform will be available at `http://localhost:3000`.

## Verification

To ensure successful installation, follow these steps:

**Open Browser**: Open a web browser and navigate to `http://localhost:3000`. The platform's homepage should display correctly.

**Test Login**: Try logging in using one of the test accounts (admin@admin.com / admin). You should be able to log in successfully and access the dashboard.

**Verify Database**: Ensure all tables are created correctly using the command:

```bash
mysql -u rabit_user -p rabit_db -e "SHOW TABLES;"
```

At least 55 tables should be displayed.

## Production Deployment

To run the platform in a production environment, follow these steps:

### 1. Build Application

```bash
pnpm build
```

### 2. Start Server

```bash
pnpm start
```

### 3. Use PM2 (Recommended)

To ensure continuous operation and automatic restart:

```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Troubleshooting

If you encounter issues during installation, review the following solutions:

### Database Connection Error

Verify the connection details in the `.env` file and ensure the MySQL server is running properly. You can check the server status using:

```bash
systemctl status mysql
```

### Package Installation Error

If package installation fails, try deleting the `node_modules` folder and `pnpm-lock.yaml` file, then reinstall:

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Performance Issues

If the platform is slow, ensure sufficient resources (CPU, RAM) are available and the database is properly optimized.

## Technical Support

For technical assistance, contact the support team via:

- **Email**: support@rabit.sa
- **Website**: https://rabit.sa/support
- **Phone**: +966 11 234 5678

---

**Note**: This guide is updated periodically. Make sure to refer to the latest version on the official website.
