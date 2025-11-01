import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  BookOpen,
  MessageSquare,
  FileText,
  Settings,
  BarChart3,
  UserPlus,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const stats = {
    totalUsers: 1250,
    activeConsultations: 45,
    totalRevenue: 125000,
    coursesEnrolled: 890,
    pendingApprovals: 12,
    newSignups: 23,
  };

  const recentConsultations = [
    {
      id: 1,
      client: "شركة النور",
      consultant: "د. أحمد السالم",
      service: "مراجعة عقد عمل",
      status: "جارية",
      date: "2024-01-20",
      amount: 800,
    },
    {
      id: 2,
      client: "مؤسسة الفجر",
      consultant: "أ. سارة الأحمدي",
      service: "استشارة سريعة",
      status: "مكتملة",
      date: "2024-01-19",
      amount: 300,
    },
    {
      id: 3,
      client: "شركة الأمل",
      consultant: "د. محمد العتيبي",
      service: "دراسة حالة",
      status: "معلقة",
      date: "2024-01-18",
      amount: 1500,
    },
  ];

  const topConsultants = [
    {
      name: "د. أحمد السالم",
      consultations: 45,
      rating: 4.9,
      revenue: 35000,
    },
    {
      name: "أ. سارة الأحمدي",
      consultations: 38,
      rating: 4.8,
      revenue: 28000,
    },
    {
      name: "د. محمد العتيبي",
      consultations: 32,
      rating: 4.7,
      revenue: 24000,
    },
  ];

  const topCourses = [
    {
      title: "أساسيات الموارد البشرية",
      enrollments: 450,
      rating: 4.8,
      revenue: 224550,
    },
    {
      title: "نظام العمل السعودي",
      enrollments: 320,
      rating: 4.7,
      revenue: 159680,
    },
    {
      title: "إدارة الأداء",
      enrollments: 280,
      rating: 4.6,
      revenue: 139720,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">لوحة تحكم المدير</h1>
              <p className="text-gray-600 mt-1">مرحباً بك في لوحة التحكم الرئيسية</p>
            </div>
            <Button>
              <Settings className="ml-2 h-4 w-4" />
              الإعدادات
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">إجمالي المستخدمين</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalUsers}</p>
                  <p className="text-sm text-green-600 mt-1">
                    +{stats.newSignups} هذا الأسبوع
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">الاستشارات النشطة</p>
                  <p className="text-2xl font-bold mt-1">{stats.activeConsultations}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {stats.pendingApprovals} في الانتظار
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">إجمالي الإيرادات</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalRevenue.toLocaleString()} ﷼</p>
                  <p className="text-sm text-green-600 mt-1">+12.5% هذا الشهر</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">التسجيلات في الدورات</p>
                  <p className="text-2xl font-bold mt-1">{stats.coursesEnrolled}</p>
                  <p className="text-sm text-green-600 mt-1">+8.3% هذا الشهر</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="consultations">الاستشارات</TabsTrigger>
            <TabsTrigger value="courses">الدورات</TabsTrigger>
            <TabsTrigger value="users">المستخدمين</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Consultations */}
              <Card>
                <CardHeader>
                  <CardTitle>الاستشارات الأخيرة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentConsultations.map((consultation) => (
                      <div
                        key={consultation.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{consultation.client}</p>
                          <p className="text-sm text-gray-600">{consultation.service}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {consultation.consultant} • {consultation.date}
                          </p>
                        </div>
                        <div className="text-left">
                          <Badge
                            variant={
                              consultation.status === "مكتملة"
                                ? "default"
                                : consultation.status === "جارية"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {consultation.status}
                          </Badge>
                          <p className="text-sm font-medium mt-2">
                            {consultation.amount} ﷼
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    عرض الكل
                  </Button>
                </CardContent>
              </Card>

              {/* Top Consultants */}
              <Card>
                <CardHeader>
                  <CardTitle>أفضل المستشارين</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topConsultants.map((consultant, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{consultant.name}</p>
                            <p className="text-sm text-gray-600">
                              {consultant.consultations} استشارة
                            </p>
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="font-medium">{consultant.revenue.toLocaleString()} ﷼</p>
                          <p className="text-sm text-gray-600">⭐ {consultant.rating}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Courses */}
            <Card>
              <CardHeader>
                <CardTitle>الدورات الأكثر مبيعاً</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCourses.map((course, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{course.title}</p>
                          <p className="text-sm text-gray-600">
                            {course.enrollments} طالب • ⭐ {course.rating}
                          </p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{course.revenue.toLocaleString()} ﷼</p>
                        <p className="text-sm text-gray-600">إجمالي الإيرادات</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Consultations Tab */}
          <TabsContent value="consultations" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>إدارة الاستشارات</CardTitle>
                  <Button>
                    <UserPlus className="ml-2 h-4 w-4" />
                    إضافة مستشار
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">قريباً: نظام إدارة الاستشارات الكامل</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>إدارة الدورات</CardTitle>
                  <Button>
                    <BookOpen className="ml-2 h-4 w-4" />
                    إضافة دورة
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">قريباً: نظام إدارة الدورات الكامل</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة المستخدمين</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">قريباً: نظام إدارة المستخدمين الكامل</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>التقارير والإحصائيات</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">قريباً: نظام التقارير المتقدم</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
