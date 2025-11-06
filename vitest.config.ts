import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  root: path.resolve(import.meta.dirname),
  test: {
    environment: "node",
    // Run unit tests only (integration tests require external services)
    include: ["server/db.test.ts"],
    // Excluded integration tests (require Redis/DB):
    // - server/__tests__/db-integration.test.ts
    // - server/_core/__tests__/cache.test.ts
    // - server/_core/__tests__/redisClient.test.ts
    // These tests conflict with vite-plugin-manus-runtime
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/mockData/",
      ],
    },
    testTimeout: 15000,
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
});
