# GitHub Actions CI Workflow Guide 🚀

## Overview

This document explains the Continuous Integration (CI) workflow for the RabitHR project. The workflow automatically validates code quality on every push or pull request to the `main` branch.

## Quick Summary

The CI workflow performs the following checks:

1. ✅ **TypeScript validation** - Ensures type safety
2. ✅ **Code linting** - Checks code formatting with Prettier
3. ✅ **Tests** - Runs unit and integration tests
4. ✅ **Production build** - Verifies the project builds successfully

## Workflow Configuration

### Trigger Events

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

### Environment Variables

The workflow uses the following GitHub Secrets:

- `DATABASE_URL` - MySQL database connection string (Railway)
- `JWT_SECRET` - Secret key for JWT token generation
- `SESSION_SECRET` - Secret key for session management
- `NODE_ENV` - Runtime environment (development/production)
- `PORT` - Server port number

### Workflow Steps

| Step                    | Command                          | Purpose                              |
| ----------------------- | -------------------------------- | ------------------------------------ |
| ⬇️ Checkout             | `actions/checkout@v4`            | Clone repository                     |
| 🟢 Setup Node.js 20     | `actions/setup-node@v4`          | Install Node.js 20 with pnpm caching |
| 📦 Enable Corepack      | `corepack enable`                | Enable pnpm package manager          |
| 📥 Install dependencies | `pnpm install --frozen-lockfile` | Install all dependencies             |
| 🧠 TypeScript Check     | `pnpm tsc --noEmit`              | Validate TypeScript types            |
| 🎨 Lint                 | `pnpm lint`                      | Check code formatting                |
| 🧪 Tests                | `pnpm test`                      | Run test suite                       |
| 🏗️ Build                | `pnpm build`                     | Build for production                 |

## Important Notes

### Environment Secrets Usage

All secrets are referenced via `${{ secrets.SECRET_NAME }}` and are:

- ✅ Used only for CI testing and builds
- ✅ NOT printed in logs
- ✅ NOT hardcoded in code
- ✅ Production values are stored separately on Railway and Vercel

### Test Handling

The workflow handles Redis-dependent tests gracefully:

- Tests that require Redis (like `cache.test.ts`) may fail in CI
- The workflow continues even if Redis tests fail
- Non-Redis tests (like `db.test.ts`) run normally
- A warning message is displayed when Redis tests fail

## Future Enhancements

### Adding Automatic Deployment

#### Option 1: Vercel Frontend Deployment

Add a deployment job for Vercel:

```yaml
deploy-frontend:
  name: Deploy Frontend to Vercel
  runs-on: ubuntu-latest
  needs: ci
  if: github.ref == 'refs/heads/main'

  steps:
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

**Requirements**:

- Create a Vercel token at [vercel.com/account/tokens](https://vercel.com/account/tokens)
- Get `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` from project settings
- Add these as GitHub Secrets

**Note**: Vercel supports automatic deployment from GitHub without GitHub Actions.

#### Option 2: Railway Backend Deployment

Add a deployment job for Railway:

```yaml
deploy-backend:
  name: Deploy Backend to Railway
  runs-on: ubuntu-latest
  needs: ci
  if: github.ref == 'refs/heads/main'

  steps:
    - name: Deploy to Railway
      uses: bervProject/railway-deploy@main
      with:
        railway_token: ${{ secrets.RAILWAY_TOKEN }}
        service: "backend"
```

**Requirements**:

- Create a Railway token at [railway.app/account/tokens](https://railway.app/account/tokens)
- Add `RAILWAY_TOKEN` as a GitHub Secret

**Note**: Railway supports automatic deployment from GitHub without GitHub Actions.

### Adding Redis Service

To enable Redis-dependent tests in CI:

```yaml
services:
  redis:
    image: redis:7-alpine
    ports:
      - 6379:6379
    options: >-
      --health-cmd "redis-cli ping"
      --health-interval 10s
      --health-timeout 5s
      --health-retries 5
```

### Adding Code Coverage

```yaml
- name: Test Coverage
  run: pnpm test:coverage

- name: Upload to Codecov
  uses: codecov/codecov-action@v4
  with:
    token: ${{ secrets.CODECOV_TOKEN }}
```

### Adding Security Scanning

```yaml
- name: Security Audit
  run: pnpm audit --audit-level=moderate
  continue-on-error: true
```

## Troubleshooting

### Tests Failing

**Problem**: Tests fail in CI but work locally

**Solution**:

1. Check if Redis-dependent tests are failing (expected)
2. Verify all environment variables are set
3. Run tests locally with same Node.js version (20)

### Build Failing

**Problem**: Build fails with errors

**Solution**:

1. Check GitHub Actions logs for details
2. Test build locally: `pnpm build`
3. Ensure all required environment variables are set

### TypeScript Errors

**Problem**: TypeScript check fails

**Solution**:

1. Run locally: `pnpm tsc --noEmit`
2. Fix all TypeScript errors
3. Ensure all type definitions are up to date

## Architecture

### Frontend

- **Build**: pnpm + Vite
- **Deploy**: Vercel
- **Env vars**: Prefixed with `VITE_` (e.g., `VITE_API_URL`)

### Backend

- **Stack**: Node.js/TypeScript + Express + tRPC + Drizzle
- **Host**: Railway
- **Database**: MySQL on Railway
- **Env vars**: Managed on Railway, not in GitHub

### Database

- **Type**: MySQL
- **Location**: Railway
- **Connection**: via `DATABASE_URL` secret

## Best Practices

1. ✅ **Use caching** - pnpm caching speeds up installations
2. ✅ **Fail fast** - Workflow stops on first failure (except tests)
3. ✅ **Clear naming** - Use emojis and descriptive step names
4. ✅ **Security first** - Never print or hardcode secrets
5. ✅ **Minimal scope** - CI only tests and builds, no deployment

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [pnpm Documentation](https://pnpm.io/)
- [Vercel Deployment Docs](https://vercel.com/docs/deployments/overview)
- [Railway Deployment Docs](https://docs.railway.app/)

---

**Created**: 2025-11-05  
**Version**: 1.0  
**Author**: GitHub Copilot Agent

For detailed Arabic documentation, see [CI_WORKFLOW_GUIDE.md](./CI_WORKFLOW_GUIDE.md)
