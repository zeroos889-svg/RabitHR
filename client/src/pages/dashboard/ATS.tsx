import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Search,
  Plus,
  Eye,
  Users,
  Briefcase,
  Calendar,
  Star,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

// بيانات تجريبية للوظائف
const jobsData = [
  {
    id: 1,
    title: "مطور Full Stack",
    department: "تقنية المعلومات",
    location: "الرياض",
    type: "دوام كامل",
    status: "نشط",
    applicants: 45,
    newApplicants: 12,
    postedDate: "2024-10-15",
    salary: "12,000 - 18,000 ﷼",
  },
  {
    id: 2,
    title: "محاسب رئيسي",
    department: "المالية",
    location: "جدة",
    type: "دوام كامل",
    status: "نشط",
    applicants: 28,
    newApplicants: 5,
    postedDate: "2024-10-20",
    salary: "10,000 - 15,000 ﷼",
  },
  {
    id: 3,
    title: "مدير مبيعات",
    department: "المبيعات",
    location: "الدمام",
    type: "دوام كامل",
    status: "نشط",
    applicants: 33,
    newApplicants: 8,
    postedDate: "2024-10-18",
    salary: "15,000 - 20,000 ﷼",
  },
  {
    id: 4,
    title: "مصمم UI/UX",
    department: "التصميم",
    location: "الرياض",
    type: "دوام كامل",
    status: "مغلق",
    applicants: 52,
    newApplicants: 0,
    postedDate: "2024-09-25",
    salary: "8,000 - 12,000 ﷼",
  },
];

// بيانات تجريبية للمتقدمين
const applicantsData = [
  {
    id: 1,
    name: "أحمد محمد السعيد",
    email: "ahmed.saeed@email.com",
    phone: "+966 50 123 4567",
    position: "مطور Full Stack",
    appliedDate: "2024-10-28",
    status: "جديد",
    rating: 0,
    stage: "فحص السيرة الذاتية",
  },
  {
    id: 2,
    name: "فاطمة علي الغامدي",
    email: "fatima.ali@email.com",
    phone: "+966 55 234 5678",
    position: "مطور Full Stack",
    appliedDate: "2024-10-27",
    status: "قيد المراجعة",
    rating: 4,
    stage: "مقابلة فنية",
  },
  {
    id: 3,
    name: "محمد عبدالله القحطاني",
    email: "mohammed.abdullah@email.com",
    phone: "+966 56 345 6789",
    position: "محاسب رئيسي",
    appliedDate: "2024-10-26",
    status: "مقبول",
    rating: 5,
    stage: "عرض العمل",
  },
  {
    id: 4,
    name: "سارة خالد الشهري",
    email: "sara.khaled@email.com",
    phone: "+966 50 456 7890",
    position: "مدير مبيعات",
    appliedDate: "2024-10-25",
    status: "مرفوض",
    rating: 2,
    stage: "مرفوض",
  },
];

export default function ATS() {
  const [activeTab, setActiveTab] = useState<"jobs" | "applicants">("jobs");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddJobDialogOpen, setIsAddJobDialogOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
              نظام رحلة التوظيف ATS
            </h1>
            <p className="text-muted-foreground mt-1">
              إدارة الوظائف وتتبع المتقدمين بذكاء اصطناعي
            </p>
          </div>

          <Dialog
            open={isAddJobDialogOpen}
            onOpenChange={setIsAddJobDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="h-4 w-4 ml-2" />
                نشر وظيفة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  نشر وظيفة جديدة
                </DialogTitle>
                <DialogDescription>
                  أدخل تفاصيل الوظيفة وسيقوم الذكاء الاصطناعي بتحسين الوصف
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="job-title">المسمى الوظيفي *</Label>
                  <Input id="job-title" placeholder="مثال: مطور Full Stack" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">القسم *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر القسم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="it">تقنية المعلومات</SelectItem>
                        <SelectItem value="hr">الموارد البشرية</SelectItem>
                        <SelectItem value="finance">المالية</SelectItem>
                        <SelectItem value="sales">المبيعات</SelectItem>
                        <SelectItem value="marketing">التسويق</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">الموقع *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المدينة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="riyadh">الرياض</SelectItem>
                        <SelectItem value="jeddah">جدة</SelectItem>
                        <SelectItem value="dammam">الدمام</SelectItem>
                        <SelectItem value="remote">عن بعد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-type">نوع الوظيفة *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر النوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">دوام كامل</SelectItem>
                        <SelectItem value="part-time">دوام جزئي</SelectItem>
                        <SelectItem value="contract">عقد</SelectItem>
                        <SelectItem value="internship">تدريب</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">سنوات الخبرة *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الخبرة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 سنة</SelectItem>
                        <SelectItem value="1-3">1-3 سنوات</SelectItem>
                        <SelectItem value="3-5">3-5 سنوات</SelectItem>
                        <SelectItem value="5+">5+ سنوات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary-min">الراتب من (﷼) *</Label>
                    <Input id="salary-min" type="number" placeholder="8000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary-max">الراتب إلى (﷼) *</Label>
                    <Input id="salary-max" type="number" placeholder="15000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">وصف الوظيفة *</Label>
                  <Textarea
                    id="description"
                    placeholder="اكتب وصفاً مختصراً وسيقوم الذكاء الاصطناعي بتحسينه..."
                    rows={4}
                  />
                  <Button variant="outline" size="sm" className="mt-2">
                    <Sparkles className="h-4 w-4 ml-2" />
                    تحسين بالذكاء الاصطناعي
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirements">المتطلبات *</Label>
                  <Textarea
                    id="requirements"
                    placeholder="المهارات والمؤهلات المطلوبة..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddJobDialogOpen(false)}
                >
                  إلغاء
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  نشر الوظيفة
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                الوظائف النشطة
              </CardDescription>
              <CardTitle className="text-3xl text-blue-600">12</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline ml-1" />
                +3 هذا الشهر
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                إجمالي المتقدمين
              </CardDescription>
              <CardTitle className="text-3xl text-green-600">158</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <Clock className="h-3 w-3 inline ml-1" />
                25 جديد اليوم
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                المقابلات المجدولة
              </CardDescription>
              <CardTitle className="text-3xl text-purple-600">8</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 inline ml-1" />3 هذا الأسبوع
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                التوظيفات الناجحة
              </CardDescription>
              <CardTitle className="text-3xl text-orange-600">23</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <Star className="h-3 w-3 inline ml-1" />
                هذا الشهر
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b">
          <Button
            variant={activeTab === "jobs" ? "default" : "ghost"}
            onClick={() => setActiveTab("jobs")}
            className={
              activeTab === "jobs"
                ? "bg-gradient-to-r from-blue-600 to-purple-600"
                : ""
            }
          >
            <Briefcase className="h-4 w-4 ml-2" />
            الوظائف ({jobsData.length})
          </Button>
          <Button
            variant={activeTab === "applicants" ? "default" : "ghost"}
            onClick={() => setActiveTab("applicants")}
            className={
              activeTab === "applicants"
                ? "bg-gradient-to-r from-blue-600 to-purple-600"
                : ""
            }
          >
            <Users className="h-4 w-4 ml-2" />
            المتقدمين ({applicantsData.length})
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={
              activeTab === "jobs" ? "بحث عن وظيفة..." : "بحث عن متقدم..."
            }
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>

        {/* Jobs Table */}
        {activeTab === "jobs" && (
          <Card>
            <CardHeader>
              <CardTitle>الوظائف المنشورة</CardTitle>
              <CardDescription>جميع الوظائف المتاحة في الشركة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">
                        المسمى الوظيفي
                      </TableHead>
                      <TableHead className="text-right">القسم</TableHead>
                      <TableHead className="text-right">الموقع</TableHead>
                      <TableHead className="text-right">النوع</TableHead>
                      <TableHead className="text-right">المتقدمين</TableHead>
                      <TableHead className="text-right">تاريخ النشر</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-center">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobsData.map(job => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">
                          {job.title}
                        </TableCell>
                        <TableCell>{job.department}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{job.type}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              {job.applicants}
                            </span>
                            {job.newApplicants > 0 && (
                              <Badge
                                variant="secondary"
                                className="bg-blue-100 text-blue-700"
                              >
                                +{job.newApplicants} جديد
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{job.postedDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              job.status === "نشط" ? "default" : "secondary"
                            }
                            className={
                              job.status === "نشط"
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-gray-500 hover:bg-gray-600"
                            }
                          >
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="عرض المتقدمين"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Applicants Table */}
        {activeTab === "applicants" && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    المتقدمين
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                      <Sparkles className="h-3 w-3 ml-1" />
                      فرز ذكي
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    جميع المتقدمين مع الفرز بالذكاء الاصطناعي
                  </CardDescription>
                </div>
                <Button variant="outline">
                  <Sparkles className="h-4 w-4 ml-2" />
                  فرز بالذكاء الاصطناعي
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">الاسم</TableHead>
                      <TableHead className="text-right">
                        الوظيفة المتقدم لها
                      </TableHead>
                      <TableHead className="text-right">
                        البريد الإلكتروني
                      </TableHead>
                      <TableHead className="text-right">
                        تاريخ التقديم
                      </TableHead>
                      <TableHead className="text-right">المرحلة</TableHead>
                      <TableHead className="text-right">التقييم</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-center">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicantsData.map(applicant => (
                      <TableRow key={applicant.id}>
                        <TableCell className="font-medium">
                          {applicant.name}
                        </TableCell>
                        <TableCell>{applicant.position}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {applicant.email}
                        </TableCell>
                        <TableCell>{applicant.appliedDate}</TableCell>
                        <TableCell>{applicant.stage}</TableCell>
                        <TableCell>
                          {applicant.rating > 0 ? (
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < applicant.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">
                              لم يتم التقييم
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              applicant.status === "جديد"
                                ? "bg-blue-100 text-blue-700"
                                : applicant.status === "قيد المراجعة"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : applicant.status === "مقبول"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }
                          >
                            {applicant.status === "مقبول" && (
                              <CheckCircle2 className="h-3 w-3 ml-1" />
                            )}
                            {applicant.status === "مرفوض" && (
                              <XCircle className="h-3 w-3 ml-1" />
                            )}
                            {applicant.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="عرض التفاصيل"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
