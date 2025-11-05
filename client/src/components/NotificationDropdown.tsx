import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Check,
  CheckCheck,
  Clock,
  AlertCircle,
  Info,
  X,
} from "lucide-react";
import { Link } from "wouter";

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: "success",
    title: "تم إصدار شهادة جديدة",
    message: "تم إصدار شهادة خبرة للموظف أحمد محمد",
    time: "منذ 5 دقائق",
    read: false,
    icon: CheckCheck,
  },
  {
    id: 2,
    type: "warning",
    title: "تذكير: إجازة قادمة",
    message: "لديك 3 طلبات إجازة تحتاج للمراجعة",
    time: "منذ ساعة",
    read: false,
    icon: Clock,
  },
  {
    id: 3,
    type: "info",
    title: "متقدم جديد",
    message: "تم استلام طلب توظيف جديد لوظيفة مدير مبيعات",
    time: "منذ ساعتين",
    read: true,
    icon: Info,
  },
  {
    id: 4,
    type: "error",
    title: "تنبيه: عقد منتهي",
    message: "عقد الموظفة سارة أحمد سينتهي خلال 7 أيام",
    time: "منذ 3 ساعات",
    read: true,
    icon: AlertCircle,
  },
];

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-600 bg-green-100";
      case "warning":
        return "text-yellow-600 bg-yellow-100";
      case "error":
        return "text-red-600 bg-red-100";
      default:
        return "text-blue-600 bg-blue-100";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-600">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 max-h-[500px] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-3 border-b">
          <div className="font-semibold">الإشعارات</div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={markAllAsRead}
            >
              <Check className="h-3 w-3 ml-1" />
              تحديد الكل كمقروء
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>لا توجد إشعارات</p>
          </div>
        ) : (
          <div className="py-1">
            {notifications.map(notification => (
              <div key={notification.id}>
                <DropdownMenuItem
                  className={`p-3 cursor-pointer flex items-start gap-3 ${
                    !notification.read ? "bg-blue-50/50" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div
                    className={`h-8 w-8 rounded-full ${getTypeColor(notification.type)} flex items-center justify-center flex-shrink-0`}
                  >
                    <notification.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-medium text-sm">
                        {notification.title}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 flex-shrink-0"
                        onClick={e => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                      {!notification.read && (
                        <Badge
                          variant="secondary"
                          className="h-4 px-1.5 text-xs bg-blue-600 text-white"
                        >
                          جديد
                        </Badge>
                      )}
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>
            ))}
          </div>
        )}

        <div className="p-2 border-t">
          <Link href="/dashboard/notifications">
            <Button variant="ghost" className="w-full text-sm">
              عرض جميع الإشعارات
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
