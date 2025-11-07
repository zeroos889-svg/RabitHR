import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  Home,
  User,
  FileText,
  Settings,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavigationItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  badge?: number;
}

const navigationItems: NavigationItem[] = [
  { icon: Home, label: "الرئيسية", href: "/" },
  { icon: FileText, label: "المستندات", href: "/my-documents" },
  { icon: Bell, label: "الإشعارات", href: "/notifications", badge: 3 },
  { icon: User, label: "الملف الشخصي", href: "/profile" },
  { icon: Settings, label: "الإعدادات", href: "/settings" },
];

/**
 * Mobile Bottom Navigation Bar
 *
 * Fixed bottom navigation with icons and labels
 * Shows on mobile devices only
 *
 * @example
 * <MobileNavigation />
 */
export function MobileNavigation() {
  const [location] = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="flex items-center justify-around h-16 px-2">
        {navigationItems.slice(0, 5).map(item => {
          const Icon = item.icon;
          const isActive = location === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <button
                className={cn(
                  "flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/**
 * Mobile Top Bar with Menu
 *
 * Contains logo, search, and hamburger menu
 *
 * @example
 * <MobileTopBar />
 */
export function MobileTopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="md:hidden sticky top-0 z-50 bg-background border-b border-border">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                HR
              </span>
            </div>
            <span className="font-bold text-lg">رابت</span>
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search Button */}
          <Button variant="ghost" size="icon" className="w-9 h-9">
            <Search className="w-4 h-4" />
          </Button>

          {/* Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="w-9 h-9">
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle>القائمة</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 mt-6">
                {navigationItems.map(item => {
                  const Icon = item.icon;
                  const isActive = location === item.href;

                  return (
                    <Link key={item.href} href={item.href}>
                      <button
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-right",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-accent"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <span className="mr-auto bg-destructive text-destructive-foreground text-xs font-bold rounded-full px-2 py-0.5">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

/**
 * Mobile Safe Area Spacer
 *
 * Adds padding for mobile bottom navigation
 *
 * @example
 * <div>
 *   <Content />
 *   <MobileSafeArea />
 * </div>
 */
export function MobileSafeArea() {
  return <div className="md:hidden h-16" />;
}
