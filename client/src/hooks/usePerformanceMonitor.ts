import { useEffect, useRef } from "react";
import { performanceMonitor } from "@/lib/performance";

/**
 * Hook to monitor component performance
 *
 * @example
 * function MyComponent() {
 *   usePerformanceMonitor("MyComponent");
 *   return <div>...</div>;
 * }
 */
export function usePerformanceMonitor(componentName: string) {
  const renderCount = useRef(0);
  const mountTime = useRef(0);

  useEffect(() => {
    // Mark component mount
    mountTime.current = performance.now();
    performanceMonitor.mark(`${componentName}-mount`);

    return () => {
      // Measure component lifetime
      const lifetime = performance.now() - mountTime.current;
      performanceMonitor.mark(`${componentName}-unmount`);
      performanceMonitor.measure(
        `${componentName}-lifetime`,
        `${componentName}-mount`,
        `${componentName}-unmount`
      );

      if (renderCount.current > 10) {
        console.warn(
          `⚠️ ${componentName} rendered ${renderCount.current} times in ${lifetime.toFixed(2)}ms`
        );
      }
    };
  }, [componentName]);

  useEffect(() => {
    renderCount.current += 1;
  });
}

/**
 * Hook to measure effect performance
 *
 * @example
 * usePerformanceEffect(() => {
 *   // expensive operation
 * }, [deps], "MyEffect");
 */
export function usePerformanceEffect(
  effect: () => void | (() => void),
  deps: any[],
  effectName: string
) {
  useEffect(() => {
    const start = performance.now();
    const cleanup = effect();
    const duration = performance.now() - start;

    if (duration > 16) {
      console.warn(
        `⚠️ Slow effect: ${effectName} took ${duration.toFixed(2)}ms`
      );
    }

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
