import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Users,
  Briefcase,
  Ticket,
  TrendingUp,
  Calendar,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { Link } from "wouter";

export default function CompanyDashboard() {
  // Mock data - سيتم استبداله بـ API calls
  const stats = {
    totalEmployees: 156,
    activeJobs: 12,
    openTickets: 23,
    pendingApplicants: 45,
  };

  const recentActivities = [
    {
      id: 1,
      type: "employee",
      message: "تم تعيين موظف جديد: أحمد محمد",
      time: "منذ ساعتين",
      icon: Users,
      color: "text-green-500",
    },
    {
      id: 2,
      type: "job",
      message: "تم نشر وظيفة جديدة: مطور برمجيات",
      time: "منذ 3 ساعات",
      icon: Briefcase,
      color: "text-blue-500",
    },
    {
      id: 3,
      type: "ticket",
      message: "تذكرة جديدة: طلب إجازة - سارة علي",
      time: "منذ 5 ساعات",
      icon: Ticket,
      color: "text-purple-500",
    },
    {
      id: 4,
      type: "applicant",
      message: "15 متقدم جديد لوظيفة محاسب",
      time: "منذ يوم",
      icon: FileText,
      color: "text-orange-500",
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "مقابلة مع مرشح لوظيفة مدير مبيعات",
      date: "اليوم، 2:00 م",
      priority: "high",
    },
    {
      id: 2,
      title: "مراجعة طلبات الإجازات المعلقة",
      date: "غداً، 10:00 ص",
      priority: "medium",
    },
    {
      id: 3,
      title: "إعداد تقرير الرواتب الشهري",
      date: "15 نوفمبر",
      priority: "low",
    },
  ];

  const quickActions = [
    {
      title: "إضافة موظف",
      icon: Users,
      href: "/dashboard/employees/new",
      color: "bg-blue-500",
    },
    {
      title: "نشر وظيفة",
      icon: Briefcase,
      href: "/dashboard/jobs/new",
      color: "bg-green-500",
    },
    {
      title: "إنشاء تذكرة",
      icon: Ticket,
      href: "/dashboard/tickets/new",
      color: "bg-purple-500",
    },
    {
      title: "إنشاء خطاب",
      icon: FileText,
      href: "/tools/letter-generator",
      color: "bg-orange-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 p-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">لوحة التحكم</h1>
          <p className="text-muted-foreground">
            نظرة عامة على أداء الموارد البشرية في شركتك
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                إجمالي الموظفين
              </CardTitle>
              <Users className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalEmployees}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 inline-flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12%
                </span>{" "}
                عن الشهر الماضي
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                الوظائف النشطة
              </CardTitle>
              <Briefcase className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.activeJobs}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-blue-500">
                  {stats.pendingApplicants} متقدم
                </span>{" "}
                في الانتظار
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                التذاكر المفتوحة
              </CardTitle>
              <Ticket className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.openTickets}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-orange-500">8 عاجلة</span> تحتاج متابعة
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                المتقدمين الجدد
              </CardTitle>
              <FileText className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {stats.pendingApplicants}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">15 اليوم</span> متقدم جديد
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>إجراءات سريعة</CardTitle>
            <CardDescription>الوصول السريع للمهام الشائعة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {quickActions.map(action => (
                <Link key={action.title} href={action.href}>
                  <Button
                    variant="outline"
                    className="w-full h-24 flex-col gap-2 hover:shadow-md transition-all"
                  >
                    <div className={`p-3 rounded-lg ${action.color}`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-semibold">{action.title}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activities */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>النشاطات الأخيرة</CardTitle>
                <CardDescription>آخر التحديثات في النظام</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                عرض الكل
                <ArrowUpRight className="h-4 w-4 mr-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className={`p-2 rounded-lg bg-muted ${activity.color}`}
                    >
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>المهام القادمة</CardTitle>
                <CardDescription>المواعيد والمهام المجدولة</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                إضافة مهمة
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map(task => (
                  <div
                    key={task.id}
                    className="flex items-start gap-4 p-3 rounded-lg border hover:shadow-sm transition-all"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{task.title}</p>
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {task.priority === "high"
                            ? "عاجل"
                            : task.priority === "medium"
                              ? "متوسط"
                              : "عادي"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {task.date}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>حالة النظام</CardTitle>
            <CardDescription>معلومات سريعة عن استخدام النظام</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm font-medium">جميع الأنظمة تعمل</p>
                  <p className="text-xs text-muted-foreground">
                    آخر تحديث: الآن
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200">
                <Users className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">45 مستخدم نشط</p>
                  <p className="text-xs text-muted-foreground">متصلين الآن</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-orange-50 border border-orange-200">
                <AlertCircle className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">3 إشعارات جديدة</p>
                  <p className="text-xs text-muted-foreground">تحتاج مراجعة</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
