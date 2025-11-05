import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";
import {
  FileText,
  Download,
  Award,
  Briefcase,
  DollarSign,
  Globe,
  Sparkles,
  Clock,
  CheckCircle2,
  Search,
  Filter,
  Calendar,
  User,
  Building2,
} from "lucide-react";
import { useState } from "react";

// بيانات تجريبية للموظفين
const employeesData = [
  {
    id: "EMP-001",
    name: "أحمد محمد العلي",
    nameEn: "Ahmed Mohammed Al-Ali",
    position: "مهندس برمجيات",
    positionEn: "Software Engineer",
    department: "تقنية المعلومات",
    departmentEn: "Information Technology",
    salary: 15000,
    joinDate: "2020-01-15",
    nationalId: "1234567890",
  },
  {
    id: "EMP-002",
    name: "فاطمة علي السالم",
    nameEn: "Fatima Ali Al-Salem",
    position: "مديرة موارد بشرية",
    positionEn: "HR Manager",
    department: "الموارد البشرية",
    departmentEn: "Human Resources",
    salary: 18000,
    joinDate: "2019-03-20",
    nationalId: "9876543210",
  },
];

// بيانات الشهادات المصدرة
const issuedCertificates = [
  {
    id: "CERT-001",
    type: "شهادة راتب",
    employee: "أحمد محمد العلي",
    issuedDate: "2024-11-01",
    purpose: "للبنك",
  },
  {
    id: "CERT-002",
    type: "شهادة خبرة",
    employee: "فاطمة علي السالم",
    issuedDate: "2024-10-28",
    purpose: "للتوظيف",
  },
  {
    id: "CERT-003",
    type: "شهادة تعريف",
    employee: "أحمد محمد العلي",
    issuedDate: "2024-10-25",
    purpose: "للسفارة",
  },
];

export default function Certificates() {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [certificateType, setCertificateType] = useState("");

  // إحصائيات
  const stats = {
    total: issuedCertificates.length,
    thisMonth: 12,
    salary: issuedCertificates.filter(c => c.type === "شهادة راتب").length,
    experience: issuedCertificates.filter(c => c.type === "شهادة خبرة").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-2">
              <Award className="h-8 w-8 text-emerald-600" />
              نظام إصدار الشهادات
            </h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              إصدار الشهادات تلقائياً في ثوانٍ
            </p>
          </div>

          <Dialog
            open={isGenerateDialogOpen}
            onOpenChange={setIsGenerateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                <FileText className="h-4 w-4 ml-2" />
                إصدار شهادة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-emerald-600" />
                  إصدار شهادة جديدة
                </DialogTitle>
                <DialogDescription>
                  اختر الموظف ونوع الشهادة وسيتم إصدارها تلقائياً
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="employee">الموظف *</Label>
                  <Select
                    value={selectedEmployee}
                    onValueChange={setSelectedEmployee}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الموظف" />
                    </SelectTrigger>
                    <SelectContent>
                      {employeesData.map(emp => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.name} - {emp.position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cert-type">نوع الشهادة *</Label>
                  <Select
                    value={certificateType}
                    onValueChange={setCertificateType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الشهادة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          شهادة راتب (للبنوك)
                        </div>
                      </SelectItem>
                      <SelectItem value="experience">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          شهادة خبرة
                        </div>
                      </SelectItem>
                      <SelectItem value="definition">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          شهادة تعريف بالراتب
                        </div>
                      </SelectItem>
                      <SelectItem value="embassy">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          شهادة للسفارات
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">الغرض من الشهادة</Label>
                  <Input id="purpose" placeholder="مثال: للبنك الأهلي" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">اللغة</Label>
                    <Select defaultValue="ar">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="both">ثنائية اللغة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="copies">عدد النسخ</Label>
                    <Input
                      id="copies"
                      type="number"
                      defaultValue="1"
                      min="1"
                      max="10"
                    />
                  </div>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-950 p-3 rounded-lg">
                  <p className="text-sm text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    سيتم إنشاء الشهادة تلقائياً بالبيانات الصحيحة
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsGenerateDialogOpen(false)}
                >
                  إلغاء
                </Button>
                <Button
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                >
                  <FileText className="h-4 w-4 ml-2" />
                  معاينة وتعديل
                </Button>
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600">
                  <Download className="h-4 w-4 ml-2" />
                  إصدار مباشرة
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
                <FileText className="h-4 w-4" />
                إجمالي الشهادات
              </CardDescription>
              <CardTitle className="text-3xl text-emerald-600">
                {stats.total}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <Clock className="h-3 w-3 inline ml-1" />
                جميع الأوقات
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                هذا الشهر
              </CardDescription>
              <CardTitle className="text-3xl text-blue-600">
                {stats.thisMonth}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 inline ml-1" />
                شهادة مصدرة
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                شهادات راتب
              </CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {stats.salary}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">الأكثر طلباً</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                شهادات خبرة
              </CardDescription>
              <CardTitle className="text-3xl text-purple-600">
                {stats.experience}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">للموظفين السابقين</p>
            </CardContent>
          </Card>
        </div>

        {/* Certificate Templates */}
        <Tabs defaultValue="templates" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">قوالب الشهادات</TabsTrigger>
            <TabsTrigger value="issued">الشهادات المصدرة</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Salary Certificate */}
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-emerald-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    شهادة راتب
                  </CardTitle>
                  <CardDescription>
                    شهادة رسمية بالراتب الشهري للموظف (للبنوك والجهات المالية)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>✓ تتضمن: الراتب الأساسي والبدلات</p>
                    <p>✓ متوافقة مع متطلبات البنوك السعودية</p>
                    <p>✓ باللغتين العربية والإنجليزية</p>
                  </div>
                  <Button
                    className="w-full mt-4 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      setCertificateType("salary");
                      setIsGenerateDialogOpen(true);
                    }}
                  >
                    <FileText className="h-4 w-4 ml-2" />
                    إصدار الآن
                  </Button>
                </CardContent>
              </Card>

              {/* Experience Certificate */}
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-purple-600" />
                    </div>
                    شهادة خبرة
                  </CardTitle>
                  <CardDescription>
                    شهادة توثق فترة عمل الموظف ومهامه (للموظفين السابقين)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>✓ تتضمن: فترة العمل والمسمى الوظيفي</p>
                    <p>✓ وصف المهام والمسؤوليات</p>
                    <p>✓ باللغتين العربية والإنجليزية</p>
                  </div>
                  <Button
                    className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
                    onClick={() => {
                      setCertificateType("experience");
                      setIsGenerateDialogOpen(true);
                    }}
                  >
                    <FileText className="h-4 w-4 ml-2" />
                    إصدار الآن
                  </Button>
                </CardContent>
              </Card>

              {/* Definition Certificate */}
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    شهادة تعريف بالراتب
                  </CardTitle>
                  <CardDescription>
                    شهادة تعريف شاملة بالموظف وراتبه (للجهات الحكومية)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>✓ تتضمن: بيانات الموظف كاملة</p>
                    <p>✓ الراتب والبدلات والخصومات</p>
                    <p>✓ ختم وتوقيع رسمي</p>
                  </div>
                  <Button
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      setCertificateType("definition");
                      setIsGenerateDialogOpen(true);
                    }}
                  >
                    <FileText className="h-4 w-4 ml-2" />
                    إصدار الآن
                  </Button>
                </CardContent>
              </Card>

              {/* Embassy Certificate */}
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-950 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-orange-600" />
                    </div>
                    شهادة للسفارات
                  </CardTitle>
                  <CardDescription>
                    شهادة رسمية معتمدة للسفارات والقنصليات
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>✓ تتضمن: جميع بيانات الموظف</p>
                    <p>✓ متوافقة مع متطلبات السفارات</p>
                    <p>✓ جاهزة للتصديق</p>
                  </div>
                  <Button
                    className="w-full mt-4 bg-orange-600 hover:bg-orange-700"
                    onClick={() => {
                      setCertificateType("embassy");
                      setIsGenerateDialogOpen(true);
                    }}
                  >
                    <FileText className="h-4 w-4 ml-2" />
                    إصدار الآن
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  إجراءات سريعة
                </CardTitle>
                <CardDescription>
                  أدوات لتسريع عملية إصدار الشهادات
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="justify-start">
                    <User className="h-4 w-4 ml-2" />
                    إصدار لجميع الموظفين
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Building2 className="h-4 w-4 ml-2" />
                    إصدار حسب القسم
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Download className="h-4 w-4 ml-2" />
                    تحميل نماذج فارغة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Issued Certificates Tab */}
          <TabsContent value="issued" className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="بحث في الشهادات..." className="pr-10" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 ml-2" />
                فلترة
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>الشهادات المصدرة مؤخراً</CardTitle>
                <CardDescription>آخر 10 شهادات تم إصدارها</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {issuedCertificates.map(cert => (
                    <div
                      key={cert.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{cert.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {cert.employee} • {cert.purpose}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {cert.issuedDate}
                        </span>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الشهادات</CardTitle>
                <CardDescription>
                  تخصيص بيانات الشركة والتوقيعات
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name-cert">اسم الشركة</Label>
                  <Input
                    id="company-name-cert"
                    defaultValue="شركة التقنية المتقدمة"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-address-cert">عنوان الشركة</Label>
                  <Input
                    id="company-address-cert"
                    defaultValue="الرياض، حي الملقا، شارع الملك فهد"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cr-cert">السجل التجاري</Label>
                    <Input id="cr-cert" defaultValue="1234567890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-cert">الرقم الضريبي</Label>
                    <Input id="tax-cert" defaultValue="300123456789003" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-logo">شعار الشركة</Label>
                  <Input id="company-logo" type="file" accept="image/*" />
                  <p className="text-xs text-muted-foreground">
                    PNG أو JPG (خلفية شفافة مفضلة) - سيظهر في رأس الشهادة
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signature">التوقيع الإلكتروني</Label>
                  <Input id="signature" type="file" accept="image/*" />
                  <p className="text-xs text-muted-foreground">
                    PNG أو JPG (خلفية شفافة مفضلة) - سيظهر في أسفل الشهادة
                  </p>
                </div>
                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-emerald-600 to-teal-600">
                    حفظ الإعدادات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
