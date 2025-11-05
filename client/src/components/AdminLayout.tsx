import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE } from "@/const";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Calendar,
  FileText,
  MessageCircle,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Redirect if not admin
  if (user && user.role !== "admin") {
    window.location.href = "/";
    return null;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: "لوحة التحكم", href: "/admin" },
    { icon: Users, label: "المستخدمون", href: "/admin/users" },
    { icon: CreditCard, label: "الاشتراكات", href: "/admin/subscriptions" },
    { icon: Calendar, label: "الحجوزات", href: "/admin/bookings" },
    { icon: MessageCircle, label: "الدردشة المباشرة", href: "/admin/chat" },
    { icon: FileText, label: "سجل النشاطات", href: "/admin/audit-logs" },
    { icon: Settings, label: "الإعدادات", href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-40 h-screen transition-transform bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {sidebarOpen && (
              <Link href="/admin">
                <a className="flex items-center gap-2">
                  {APP_LOGO && (
                    <img src={APP_LOGO} alt={APP_TITLE} className="h-8" />
                  )}
                  <span className="font-bold text-lg">{APP_TITLE}</span>
                </a>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <a
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {sidebarOpen && <span>{item.label}</span>}
                  </a>
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {sidebarOpen && (
              <div className="mb-3">
                <p className="text-sm font-medium">
                  {user?.name || "مدير النظام"}
                </p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            )}
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => logout()}
            >
              <LogOut className="h-5 w-5 ml-2" />
              {sidebarOpen && <span>تسجيل الخروج</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn("transition-all", sidebarOpen ? "mr-64" : "mr-20")}>
        {children}
      </main>
    </div>
  );
}
