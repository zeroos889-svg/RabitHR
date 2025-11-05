import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";
import {
  BarChart3,
  Download,
  Users,
  DollarSign,
  Calendar,
  Briefcase,
  Ticket,
  TrendingUp,
  TrendingDown,
  FileText,
  PieChart,
} from "lucide-react";
import { useState } from "react";

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              التقارير والإحصائيات
            </h1>
            <p className="text-muted-foreground mt-1">
              تقارير شاملة عن جميع جوانب الموارد البشرية
            </p>
          </div>

          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="اختر الفترة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">هذا الأسبوع</SelectItem>
                <SelectItem value="month">هذا الشهر</SelectItem>
                <SelectItem value="quarter">هذا الربع</SelectItem>
                <SelectItem value="year">هذا العام</SelectItem>
                <SelectItem value="custom">فترة مخصصة</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <Download className="h-4 w-4 ml-2" />
              تصدير جميع التقارير
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                إجمالي الموظفين
              </CardDescription>
              <CardTitle className="text-3xl text-blue-600">156</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">+12%</span> عن الشهر الماضي
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                إجمالي الرواتب
              </CardDescription>
              <CardTitle className="text-3xl text-green-600">﷼ 2.4M</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">+5%</span> عن الشهر الماضي
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                الإجازات المستخدمة
              </CardDescription>
              <CardTitle className="text-3xl text-yellow-600">342</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-red-600" />
                <span className="text-red-600">-8%</span> عن الشهر الماضي
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                الوظائف النشطة
              </CardDescription>
              <CardTitle className="text-3xl text-purple-600">18</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">+3</span> وظائف جديدة
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Reports Tabs */}
        <Tabs defaultValue="employees" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="employees">الموظفين</TabsTrigger>
            <TabsTrigger value="salaries">الرواتب</TabsTrigger>
            <TabsTrigger value="leaves">الإجازات</TabsTrigger>
            <TabsTrigger value="recruitment">التوظيف</TabsTrigger>
            <TabsTrigger value="tickets">التذاكر</TabsTrigger>
          </TabsList>

          {/* Employees Report */}
          <TabsContent value="employees" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    توزيع الموظفين حسب القسم
                  </CardTitle>
                  <CardDescription>عدد الموظفين في كل قسم</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                        <span className="text-sm">تقنية المعلومات</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600"
                            style={{ width: "65%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold">45</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-600"></div>
                        <span className="text-sm">المبيعات</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-600"
                            style={{ width: "50%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold">35</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-purple-600"></div>
                        <span className="text-sm">الموارد البشرية</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-600"
                            style={{ width: "40%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold">28</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-yellow-600"></div>
                        <span className="text-sm">المالية</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-600"
                            style={{ width: "35%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold">25</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-pink-600"></div>
                        <span className="text-sm">التسويق</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-pink-600"
                            style={{ width: "33%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold">23</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-green-600" />
                    معدل الحضور والغياب
                  </CardTitle>
                  <CardDescription>نسبة الحضور خلال الشهر</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">حضور</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-600"
                            style={{ width: "92%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-green-600">
                          92%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">إجازة</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600"
                            style={{ width: "5%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-blue-600">
                          5%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">غياب</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-600"
                            style={{ width: "3%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-red-600">
                          3%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      معدل الحضور ممتاز! استمر في الحفاظ على هذا المستوى
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>الموظفون الجدد</CardTitle>
                <CardDescription>آخر 10 موظفين تم تعيينهم</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      name: "أحمد محمد",
                      dept: "تقنية المعلومات",
                      date: "2024-11-01",
                    },
                    { name: "فاطمة علي", dept: "المبيعات", date: "2024-10-28" },
                    {
                      name: "محمد عبدالله",
                      dept: "الموارد البشرية",
                      date: "2024-10-25",
                    },
                    { name: "سارة خالد", dept: "التسويق", date: "2024-10-20" },
                    { name: "خالد أحمد", dept: "المالية", date: "2024-10-15" },
                  ].map((emp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold">{emp.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {emp.dept}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {emp.date}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button variant="outline">
                <Download className="h-4 w-4 ml-2" />
                تصدير تقرير الموظفين
              </Button>
            </div>
          </TabsContent>

          {/* Salaries Report */}
          <TabsContent value="salaries" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>إجمالي الرواتب الشهرية</CardDescription>
                  <CardTitle className="text-2xl text-green-600">
                    ﷼ 2,450,000
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    متوسط الراتب: ﷼ 15,705
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>البدلات والمكافآت</CardDescription>
                  <CardTitle className="text-2xl text-blue-600">
                    ﷼ 320,000
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    13% من إجمالي الرواتب
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>الخصومات</CardDescription>
                  <CardTitle className="text-2xl text-red-600">
                    ﷼ 180,000
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    7.3% من إجمالي الرواتب
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>توزيع الرواتب حسب القسم</CardTitle>
                <CardDescription>إجمالي الرواتب لكل قسم</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      dept: "تقنية المعلومات",
                      amount: "﷼ 850,000",
                      percent: 35,
                    },
                    { dept: "المبيعات", amount: "﷼ 650,000", percent: 27 },
                    {
                      dept: "الموارد البشرية",
                      amount: "﷼ 420,000",
                      percent: 17,
                    },
                    { dept: "المالية", amount: "﷼ 350,000", percent: 14 },
                    { dept: "التسويق", amount: "﷼ 180,000", percent: 7 },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium">{item.dept}</span>
                      <div className="flex items-center gap-4">
                        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-600 to-emerald-600"
                            style={{ width: `${item.percent}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold w-24 text-left">
                          {item.amount}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button variant="outline">
                <Download className="h-4 w-4 ml-2" />
                تصدير تقرير الرواتب
              </Button>
            </div>
          </TabsContent>

          {/* Leaves Report */}
          <TabsContent value="leaves" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>إجازات سنوية</CardDescription>
                  <CardTitle className="text-2xl text-blue-600">142</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    41% من الإجمالي
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>إجازات مرضية</CardDescription>
                  <CardTitle className="text-2xl text-yellow-600">89</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    26% من الإجمالي
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>إجازات طارئة</CardDescription>
                  <CardTitle className="text-2xl text-red-600">67</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    20% من الإجمالي
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>إجازات أخرى</CardDescription>
                  <CardTitle className="text-2xl text-purple-600">44</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    13% من الإجمالي
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>الإجازات حسب الشهر</CardTitle>
                <CardDescription>عدد الإجازات المستخدمة شهرياً</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[
                    { month: "يناير", count: 28 },
                    { month: "فبراير", count: 32 },
                    { month: "مارس", count: 25 },
                    { month: "أبريل", count: 38 },
                    { month: "مايو", count: 42 },
                    { month: "يونيو", count: 35 },
                    { month: "يوليو", count: 45 },
                    { month: "أغسطس", count: 40 },
                    { month: "سبتمبر", count: 30 },
                    { month: "أكتوبر", count: 27 },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <div
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg"
                        style={{ height: `${(item.count / 45) * 100}%` }}
                      ></div>
                      <span className="text-xs text-muted-foreground">
                        {item.month}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button variant="outline">
                <Download className="h-4 w-4 ml-2" />
                تصدير تقرير الإجازات
              </Button>
            </div>
          </TabsContent>

          {/* Recruitment Report */}
          <TabsContent value="recruitment" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>الوظائف النشطة</CardDescription>
                  <CardTitle className="text-2xl text-purple-600">18</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    في 8 أقسام مختلفة
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>إجمالي المتقدمين</CardDescription>
                  <CardTitle className="text-2xl text-blue-600">342</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    متوسط 19 لكل وظيفة
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>تحت المراجعة</CardDescription>
                  <CardTitle className="text-2xl text-yellow-600">89</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    26% من المتقدمين
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>تم التوظيف</CardDescription>
                  <CardTitle className="text-2xl text-green-600">12</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    معدل قبول 3.5%
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>مراحل التوظيف</CardTitle>
                <CardDescription>توزيع المتقدمين حسب المرحلة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { stage: "طلبات جديدة", count: 156, color: "blue" },
                    { stage: "فحص السيرة الذاتية", count: 89, color: "purple" },
                    { stage: "مقابلة أولية", count: 52, color: "yellow" },
                    { stage: "مقابلة فنية", count: 28, color: "orange" },
                    { stage: "عرض توظيف", count: 17, color: "green" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium">{item.stage}</span>
                      <div className="flex items-center gap-4">
                        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-${item.color}-600`}
                            style={{ width: `${(item.count / 156) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold w-12 text-left">
                          {item.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button variant="outline">
                <Download className="h-4 w-4 ml-2" />
                تصدير تقرير التوظيف
              </Button>
            </div>
          </TabsContent>

          {/* Tickets Report */}
          <TabsContent value="tickets" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>إجمالي التذاكر</CardDescription>
                  <CardTitle className="text-2xl text-pink-600">87</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">هذا الشهر</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>تذاكر مفتوحة</CardDescription>
                  <CardTitle className="text-2xl text-blue-600">23</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    26% من الإجمالي
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>تذاكر محلولة</CardDescription>
                  <CardTitle className="text-2xl text-green-600">58</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    67% من الإجمالي
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>متوسط وقت الحل</CardDescription>
                  <CardTitle className="text-2xl text-purple-600">
                    2.3
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">يوم عمل</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>التذاكر حسب الفئة</CardTitle>
                <CardDescription>
                  توزيع التذاكر على الفئات المختلفة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "شهادات", count: 28, color: "blue" },
                    { category: "إجازات", count: 22, color: "green" },
                    { category: "رواتب", count: 15, color: "yellow" },
                    { category: "بيانات شخصية", count: 12, color: "purple" },
                    { category: "أخرى", count: 10, color: "gray" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-4">
                        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-${item.color}-600`}
                            style={{ width: `${(item.count / 28) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold w-12 text-left">
                          {item.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button variant="outline">
                <Download className="h-4 w-4 ml-2" />
                تصدير تقرير التذاكر
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Export All */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              تصدير التقارير
            </CardTitle>
            <CardDescription>
              يمكنك تصدير جميع التقارير بصيغ مختلفة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 ml-2" />
                تصدير PDF
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 ml-2" />
                تصدير Excel
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 ml-2" />
                تصدير CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
