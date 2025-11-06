import { useState, useEffect } from "react";

/**
 * Hook to detect media query changes
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * const isDesktop = useMediaQuery("(min-width: 1024px)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);

    // Update state
    setMatches(mediaQuery.matches);

    // Listen for changes
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
    // Legacy browsers
    else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [query]);

  return matches;
}

/**
 * Breakpoint constants (Tailwind CSS defaults)
 */
export const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
} as const;

/**
 * Predefined hooks for common breakpoints
 */
export function useBreakpoint() {
  const isSm = useMediaQuery(breakpoints.sm);
  const isMd = useMediaQuery(breakpoints.md);
  const isLg = useMediaQuery(breakpoints.lg);
  const isXl = useMediaQuery(breakpoints.xl);
  const is2Xl = useMediaQuery(breakpoints["2xl"]);

  // Determine current breakpoint
  const current = is2Xl
    ? "2xl"
    : isXl
      ? "xl"
      : isLg
        ? "lg"
        : isMd
          ? "md"
          : isSm
            ? "sm"
            : "xs";

  return {
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    current,
    // Convenience flags
    isMobile: !isMd, // < 768px
    isTablet: isMd && !isLg, // 768px - 1024px
    isDesktop: isLg, // >= 1024px
  };
}

/**
 * Hook to detect touch device
 */
export function useTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasTouchScreen =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0);

    setIsTouch(hasTouchScreen);
  }, []);

  return isTouch;
}
