/**
 * Performance Utilities
 *
 * Collection of utilities for monitoring and optimizing performance
 */

// Performance monitoring
export const performanceMonitor = {
  /**
   * Measure component render time
   */
  measureRender: (componentName: string, callback: () => void) => {
    const start = performance.now();
    callback();
    const end = performance.now();
    const duration = end - start;

    if (duration > 16) {
      // More than 1 frame (60fps = 16.67ms per frame)
      console.warn(
        `⚠️ Slow render: ${componentName} took ${duration.toFixed(2)}ms`
      );
    }

    return duration;
  },

  /**
   * Mark performance milestone
   */
  mark: (name: string) => {
    if (typeof performance !== "undefined" && performance.mark) {
      performance.mark(name);
    }
  },

  /**
   * Measure performance between two marks
   */
  measure: (name: string, startMark: string, endMark: string) => {
    if (typeof performance !== "undefined" && performance.measure) {
      try {
        performance.measure(name, startMark, endMark);
        const measure = performance.getEntriesByName(name)[0];
        return measure?.duration || 0;
      } catch (e) {
        console.warn("Performance measurement failed:", e);
        return 0;
      }
    }
    return 0;
  },

  /**
   * Get Web Vitals
   */
  getWebVitals: () => {
    if (typeof performance === "undefined") return null;

    const navigation = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;

    if (!navigation) return null;

    return {
      // Largest Contentful Paint (target: < 2.5s)
      lcp: navigation.domContentLoadedEventEnd - navigation.fetchStart,

      // First Input Delay (target: < 100ms)
      fid: 0, // Requires interaction measurement

      // Cumulative Layout Shift (target: < 0.1)
      cls: 0, // Requires layout shift observer

      // Time to First Byte (target: < 600ms)
      ttfb: navigation.responseStart - navigation.requestStart,

      // DOM Content Loaded (target: < 1.5s)
      dcl: navigation.domContentLoadedEventEnd - navigation.fetchStart,

      // Load Complete (target: < 3s)
      load: navigation.loadEventEnd - navigation.fetchStart,
    };
  },
};

// Bundle size optimization
export const bundleOptimizer = {
  /**
   * Check if module is loaded
   */
  isModuleLoaded: (_moduleName: string): boolean => {
    // This would need build-time analysis
    return false;
  },

  /**
   * Get bundle statistics (placeholder for build-time analysis)
   */
  getBundleStats: () => {
    return {
      total: 0,
      chunks: [],
      largestChunks: [],
    };
  },
};

// Cache utilities
export const cacheManager = {
  /**
   * Cache API response
   */
  cacheResponse: async (key: string, data: any, ttl: number = 3600000) => {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
        ttl,
      };
      localStorage.setItem(`cache_${key}`, JSON.stringify(cacheData));
    } catch (e) {
      console.warn("Cache storage failed:", e);
    }
  },

  /**
   * Get cached response
   */
  getCachedResponse: (key: string) => {
    try {
      const cached = localStorage.getItem(`cache_${key}`);
      if (!cached) return null;

      const { data, timestamp, ttl } = JSON.parse(cached);

      // Check if expired
      if (Date.now() - timestamp > ttl) {
        localStorage.removeItem(`cache_${key}`);
        return null;
      }

      return data;
    } catch (e) {
      console.warn("Cache retrieval failed:", e);
      return null;
    }
  },

  /**
   * Clear expired cache entries
   */
  clearExpired: () => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith("cache_")) {
          const cached = localStorage.getItem(key);
          if (cached) {
            const { timestamp, ttl } = JSON.parse(cached);
            if (Date.now() - timestamp > ttl) {
              localStorage.removeItem(key);
            }
          }
        }
      });
    } catch (e) {
      console.warn("Cache cleanup failed:", e);
    }
  },
};

// Debounce and Throttle
export function debounce<T extends (..._args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(..._args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(..._args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle<T extends (..._args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function executedFunction(..._args: Parameters<T>) {
    if (!inThrottle) {
      func(..._args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: (_entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") {
    console.warn("IntersectionObserver not supported");
    return null;
  }

  return new IntersectionObserver(callback, {
    root: null,
    rootMargin: "50px", // Start loading 50px before viewport
    threshold: 0.01,
    ...options,
  });
}

// Resource hints
export const resourceHints = {
  /**
   * Preload critical resource
   */
  preload: (href: string, as: string) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  },

  /**
   * Prefetch resource for future navigation
   */
  prefetch: (href: string) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    document.head.appendChild(link);
  },

  /**
   * Preconnect to origin
   */
  preconnect: (href: string) => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;
    document.head.appendChild(link);
  },
};

// Report performance metrics (to analytics)
export function reportWebVitals(metric: {
  name: string;
  value: number;
  rating?: string;
}) {
  // Send to analytics
  if (process.env.NODE_ENV === "production") {
    console.log(`[Performance] ${metric.name}:`, metric.value, metric.rating);
    // Example: send to Google Analytics
    // gtag('event', metric.name, { value: metric.value });
  }
}
