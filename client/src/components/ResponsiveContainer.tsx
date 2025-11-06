import { ReactNode } from "react";
import { useBreakpoint } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  /**
   * Show only on mobile (< 768px)
   */
  mobile?: boolean;
  /**
   * Show only on tablet (768px - 1024px)
   */
  tablet?: boolean;
  /**
   * Show only on desktop (>= 1024px)
   */
  desktop?: boolean;
  /**
   * Hide on mobile
   */
  hideMobile?: boolean;
  /**
   * Hide on tablet
   */
  hideTablet?: boolean;
  /**
   * Hide on desktop
   */
  hideDesktop?: boolean;
}

/**
 * Responsive Container Component
 *
 * Conditionally renders children based on viewport size
 *
 * @example
 * // Show only on mobile
 * <ResponsiveContainer mobile>
 *   <MobileMenu />
 * </ResponsiveContainer>
 *
 * // Hide on mobile
 * <ResponsiveContainer hideMobile>
 *   <DesktopSidebar />
 * </ResponsiveContainer>
 *
 * // Show only on desktop
 * <ResponsiveContainer desktop>
 *   <DesktopFeatures />
 * </ResponsiveContainer>
 */
export function ResponsiveContainer({
  children,
  className,
  mobile,
  tablet,
  desktop,
  hideMobile,
  hideTablet,
  hideDesktop,
}: ResponsiveContainerProps) {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  // Check show conditions
  const shouldShow =
    (mobile && isMobile) ||
    (tablet && isTablet) ||
    (desktop && isDesktop) ||
    (!mobile && !tablet && !desktop); // Show by default if no specific flag

  // Check hide conditions
  const shouldHide =
    (hideMobile && isMobile) ||
    (hideTablet && isTablet) ||
    (hideDesktop && isDesktop);

  if (!shouldShow || shouldHide) {
    return null;
  }

  return <div className={cn(className)}>{children}</div>;
}

/**
 * Mobile-only component
 */
export function MobileOnly({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ResponsiveContainer mobile className={className}>
      {children}
    </ResponsiveContainer>
  );
}

/**
 * Tablet-only component
 */
export function TabletOnly({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ResponsiveContainer tablet className={className}>
      {children}
    </ResponsiveContainer>
  );
}

/**
 * Desktop-only component
 */
export function DesktopOnly({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ResponsiveContainer desktop className={className}>
      {children}
    </ResponsiveContainer>
  );
}

/**
 * Hide on mobile
 */
export function HideMobile({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ResponsiveContainer hideMobile className={className}>
      {children}
    </ResponsiveContainer>
  );
}

/**
 * Hide on desktop
 */
export function HideDesktop({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ResponsiveContainer hideDesktop className={className}>
      {children}
    </ResponsiveContainer>
  );
}
