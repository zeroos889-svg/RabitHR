/**
 * Vite Performance Configuration Guide
 *
 * This file contains recommended performance optimizations for Vite.
 * Copy these settings to vite.config.ts to apply them.
 */

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          // Vendor chunks
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-select",
          ],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-trpc": ["@trpc/client", "@trpc/react-query"],
          "vendor-forms": ["react-hook-form", "@hookform/resolvers"],
          "vendor-utils": ["date-fns", "zustand", "clsx"],
        },
        // Optimize chunk file names
        chunkFileNames: "chunks/[name]-[hash].js",
        entryFileNames: "entries/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },

    // Minification
    minify: "esbuild", // Faster than terser

    // Target modern browsers for smaller bundles
    target: "es2020",

    // Source maps (disable in production for smaller size)
    sourcemap: process.env.NODE_ENV !== "production",

    // Chunk size warnings
    chunkSizeWarningLimit: 1000, // KB

    // Asset inlining threshold
    assetsInlineLimit: 4096, // 4kb
  },

  // Optimize deps
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@tanstack/react-query",
      "@trpc/client",
      "@trpc/react-query",
    ],
    exclude: ["@vite/client", "@vite/env"],
  },

  // Server performance
  server: {
    // Warm up frequently used files
    warmup: {
      clientFiles: ["./src/main.tsx", "./src/App.tsx", "./src/pages/**/*.tsx"],
    },
  },
});

/**
 * Performance Checklist:
 *
 * ✅ 1. Code Splitting
 *    - Route-based splitting (already done with lazy())
 *    - Vendor chunks separated
 *    - Manual chunks for large libraries
 *
 * ✅ 2. Tree Shaking
 *    - Use ES modules imports
 *    - Avoid `import *`
 *    - Use named imports
 *
 * ✅ 3. Bundle Analysis
 *    - Run: `pnpm build --mode analyze`
 *    - Install: `pnpm add -D rollup-plugin-visualizer`
 *    - Check bundle sizes
 *
 * ✅ 4. Compression
 *    - Enable gzip/brotli in production server
 *    - Use `vite-plugin-compression` for pre-compression
 *
 * ✅ 5. Caching
 *    - Long cache headers for versioned assets
 *    - Service worker for offline support
 *
 * ⚠️ 6. Image Optimization
 *    - Use WebP format
 *    - Lazy load images
 *    - Use ImageOptimized component
 *
 * ⚠️ 7. Font Optimization
 *    - Preload critical fonts
 *    - Use font-display: swap
 *    - Subset fonts if possible
 */
