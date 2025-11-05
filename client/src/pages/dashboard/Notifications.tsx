import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle,
  Trash2,
  Check,
  Filter,
  Settings,
} from "lucide-react";

// Notification types
type NotificationType = "success" | "warning" | "error" | "info";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "تم قبول طلب الإجازة",
    message: "تم الموافقة على طلب إجازتك من 15 إلى 20 يناير 2025",
    time: "منذ 5 دقائق",
    read: false,
    actionUrl: "/dashboard/leaves",
  },
  {
    id: "2",
    type: "info",
    title: "مقابلة جديدة مجدولة",
    message:
      "تم جدولة مقابلة مع أحمد محمد لوظيفة مطور واجهات أمامية - غداً الساعة 10 صباحاً",
    time: "منذ ساعة",
    read: false,
    actionUrl: "/dashboard/ats",
  },
  {
    id: "3",
    type: "warning",
    title: "اقتراب موعد التقييم السنوي",
    message:
      "موعد التقييم السنوي للموظفين بعد 3 أيام. يرجى إكمال نماذج التقييم",
    time: "منذ 3 ساعات",
    read: false,
    actionUrl: "/dashboard/performance",
  },
  {
    id: "4",
    type: "success",
    title: "تم إضافة موظف جديد",
    message: "تم إضافة سارة أحمد إلى قسم التسويق بنجاح",
    time: "منذ 5 ساعات",
    read: true,
    actionUrl: "/dashboard/employees",
  },
  {
    id: "5",
    type: "error",
    title: "فشل معالجة الرواتب",
    message: "حدث خطأ أثناء معالجة رواتب شهر ديسمبر. يرجى المراجعة",
    time: "أمس",
    read: true,
    actionUrl: "/dashboard/payroll",
  },
  {
    id: "6",
    type: "info",
    title: "تحديث النظام",
    message: "تم تحديث نظام رابِط إلى الإصدار 2.5 مع ميزات جديدة",
    time: "منذ يومين",
    read: true,
  },
  {
    id: "7",
    type: "warning",
    title: "انتهاء صلاحية العقد قريباً",
    message: "عقد محمد علي سينتهي خلال 30 يوم. يرجى التجديد أو الإنهاء",
    time: "منذ 3 أيام",
    read: true,
    actionUrl: "/dashboard/contracts",
  },
  {
    id: "8",
    type: "success",
    title: "تم إغلاق التذكرة",
    message: "تم حل التذكرة #1234 وإغلاقها بنجاح",
    time: "منذ أسبوع",
    read: true,
    actionUrl: "/dashboard/tickets",
  },
];

export default function Notifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications =
    filter === "unread" ? notifications.filter(n => !n.read) : notifications;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getNotificationBgColor = (type: NotificationType) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "info":
        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Bell className="h-8 w-8 text-primary" />
            الإشعارات
          </h1>
          <p className="text-muted-foreground mt-2">
            جميع التحديثات والإشعارات المهمة
          </p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline">
              <Check className="ml-2 h-4 w-4" />
              تحديد الكل كمقروء
            </Button>
          )}
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الكل</p>
                <p className="text-2xl font-bold">{notifications.length}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">غير مقروءة</p>
                <p className="text-2xl font-bold text-blue-600">
                  {unreadCount}
                </p>
              </div>
              <Badge
                variant="default"
                className="h-8 w-8 rounded-full flex items-center justify-center"
              >
                {unreadCount}
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">مقروءة</p>
                <p className="text-2xl font-bold text-green-600">
                  {notifications.length - unreadCount}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">اليوم</p>
                <p className="text-2xl font-bold text-purple-600">
                  {
                    notifications.filter(
                      n => n.time.includes("دقائق") || n.time.includes("ساعة")
                    ).length
                  }
                </p>
              </div>
              <Bell className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <CardTitle>تصفية الإشعارات</CardTitle>
            </div>
            <Tabs
              value={filter}
              onValueChange={v => setFilter(v as "all" | "unread")}
            >
              <TabsList>
                <TabsTrigger value="all">
                  الكل ({notifications.length})
                </TabsTrigger>
                <TabsTrigger value="unread">
                  غير مقروءة ({unreadCount})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">لا توجد إشعارات</h3>
              <p className="text-muted-foreground">
                {filter === "unread"
                  ? "جميع الإشعارات مقروءة! 🎉"
                  : "لا توجد إشعارات حالياً"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map(notification => (
            <Card
              key={notification.id}
              className={`transition-all hover:shadow-md ${
                !notification.read ? "border-r-4 border-r-primary" : ""
              } ${getNotificationBgColor(notification.type)}`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <Badge variant="default" className="text-xs">
                              جديد
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => markAsRead(notification.id)}
                            title="تحديد كمقروء"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteNotification(notification.id)}
                          title="حذف"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>

                    {/* Action Button */}
                    {notification.actionUrl && (
                      <div className="mt-3">
                        <Button variant="outline" size="sm">
                          عرض التفاصيل
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
