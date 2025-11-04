# Build arguments for flexibility
ARG NODE_VERSION=18
ARG PNPM_VERSION=10.4.1

# Build stage
FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /app

# Install pnpm using corepack (built-in with Node 18)
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Copy patches used by pnpm (required for patched dependencies)
COPY patches ./patches

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Pruner stage - remove unnecessary files
FROM node:${NODE_VERSION}-alpine AS pruner

WORKDIR /app

# Copy built files
COPY --from=builder /app/dist ./dist

# Remove source maps in production
RUN find dist -name "*.map" -delete

# Production stage
FROM node:${NODE_VERSION}-alpine

# Re-declare build arguments for production stage
ARG PNPM_VERSION=10.4.1

WORKDIR /app

# Install pnpm using corepack (built-in with Node 18)
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Copy patches used by pnpm (required for patched dependencies)
COPY patches ./patches

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# Copy built files from pruner (optimized) and builder
COPY --from=pruner --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/drizzle ./drizzle

# Copy public assets if they exist separately
# Note: dist/public is already included in the dist copy above

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production
ENV PORT=3000

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Switch to non-root user
USER nodejs

# Start the application
CMD ["node", "dist/index.js"]
