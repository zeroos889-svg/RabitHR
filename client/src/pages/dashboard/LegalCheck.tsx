import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Scale,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Upload,
  Download,
  Sparkles,
  TrendingUp,
  Clock,
  Search,
  Filter,
  AlertCircle,
  Info,
} from "lucide-react";
import { useState } from "react";

// بيانات تجريبية للموظفين
const employeesData = [
  {
    id: "EMP-001",
    name: "أحمد محمد العلي",
    position: "مهندس برمجيات",
    joinDate: "2020-01-15",
    warnings: 2,
  },
  {
    id: "EMP-002",
    name: "فاطمة علي السالم",
    position: "مديرة موارد بشرية",
    joinDate: "2019-03-20",
    warnings: 0,
  },
];

// بيانات القرارات المراجعة
const reviewedDecisions = [
  {
    id: "DEC-001",
    type: "فصل موظف",
    employee: "أحمد محمد العلي",
    status: "safe",
    date: "2024-11-01",
    risk: "منخفض",
  },
  {
    id: "DEC-002",
    type: "خصم من الراتب",
    employee: "فاطمة علي السالم",
    status: "warning",
    date: "2024-10-28",
    risk: "متوسط",
  },
  {
    id: "DEC-003",
    type: "إنذار",
    employee: "أحمد محمد العلي",
    status: "danger",
    date: "2024-10-25",
    risk: "عالي",
  },
];

export default function LegalCheck() {
  const [isCheckDialogOpen, setIsCheckDialogOpen] = useState(false);
  const [selectedDecisionType, setSelectedDecisionType] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [showResult, setShowResult] = useState(false);

  // إحصائيات
  const stats = {
    total: reviewedDecisions.length,
    safe: reviewedDecisions.filter((d) => d.status === "safe").length,
    warning: reviewedDecisions.filter((d) => d.status === "warning").length,
    danger: reviewedDecisions.filter((d) => d.status === "danger").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
              <Scale className="h-8 w-8 text-blue-600" />
              التحقق القانوني من القرارات
            </h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              تحقق من قانونية قراراتك قبل إصدارها
            </p>
          </div>

          <Dialog open={isCheckDialogOpen} onOpenChange={setIsCheckDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Shield className="h-4 w-4 ml-2" />
                تحقق من قرار جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-blue-600" />
                  التحقق من قانونية القرار
                </DialogTitle>
                <DialogDescription>
                  أدخل تفاصيل القرار وسنحلل قانونيته حسب نظام العمل السعودي
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="decision-type">نوع القرار *</Label>
                  <Select
                    value={selectedDecisionType}
                    onValueChange={setSelectedDecisionType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع القرار" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="termination">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          فصل موظف
                        </div>
                      </SelectItem>
                      <SelectItem value="warning">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          إنذار (أول/ثاني/ثالث)
                        </div>
                      </SelectItem>
                      <SelectItem value="deduction">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-orange-600" />
                          خصم من الراتب
                        </div>
                      </SelectItem>
                      <SelectItem value="transfer">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          نقل موظف
                        </div>
                      </SelectItem>
                      <SelectItem value="suspension">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-purple-600" />
                          إيقاف عن العمل
                        </div>
                      </SelectItem>
                      <SelectItem value="salary-reduction">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-pink-600" />
                          تخفيض راتب
                        </div>
                      </SelectItem>
                      <SelectItem value="probation-end">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-600" />
                          إنهاء فترة تجريبية
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employee">الموظف *</Label>
                  <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الموظف" />
                    </SelectTrigger>
                    <SelectContent>
                      {employeesData.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.name} - {emp.position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">سبب القرار *</Label>
                  <Textarea
                    id="reason"
                    placeholder="اشرح سبب القرار بالتفصيل..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="previous-warnings">الإنذارات السابقة</Label>
                    <Input
                      id="previous-warnings"
                      type="number"
                      placeholder="0"
                      min="0"
                      max="10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="work-duration">مدة العمل (بالأشهر)</Label>
                    <Input
                      id="work-duration"
                      type="number"
                      placeholder="12"
                      min="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documents">المستندات الداعمة (اختياري)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      اسحب الملفات هنا أو انقر للرفع
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, DOC, JPG, PNG (حتى 10 ميجابايت)
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                        ما الذي سيتم تحليله؟
                      </p>
                      <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                        <li>• مدى توافق القرار مع نظام العمل السعودي</li>
                        <li>• الإجراءات المطلوبة قبل التنفيذ</li>
                        <li>• المستندات الناقصة</li>
                        <li>• المخاطر القانونية المحتملة</li>
                        <li>• التوصيات والبدائل</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCheckDialogOpen(false)}
                >
                  إلغاء
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-indigo-600"
                  onClick={() => {
                    setShowResult(true);
                    setIsCheckDialogOpen(false);
                  }}
                >
                  <Sparkles className="h-4 w-4 ml-2" />
                  تحليل القرار
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
                <Scale className="h-4 w-4" />
                إجمالي القرارات
              </CardDescription>
              <CardTitle className="text-3xl text-blue-600">{stats.total}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <Clock className="h-3 w-3 inline ml-1" />
                تم تحليلها
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                قرارات آمنة
              </CardDescription>
              <CardTitle className="text-3xl text-green-600">{stats.safe}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <Shield className="h-3 w-3 inline ml-1" />
                قانونية 100%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                تحذيرات
              </CardDescription>
              <CardTitle className="text-3xl text-yellow-600">
                {stats.warning}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3 inline ml-1" />
                تحتاج مراجعة
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                مخاطر عالية
              </CardDescription>
              <CardTitle className="text-3xl text-red-600">{stats.danger}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <AlertTriangle className="h-3 w-3 inline ml-1" />
                غير مُنصح
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Result Card (shown after analysis) */}
        {showResult && (
          <Card className="border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  نتيجة التحليل: تحذير
                </CardTitle>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                  مخاطر متوسطة
                </Badge>
              </div>
              <CardDescription>
                تم تحليل القرار حسب نظام العمل السعودي
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Summary */}
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  ملخص القرار
                </h3>
                <p className="text-sm text-muted-foreground">
                  فصل موظف: أحمد محمد العلي - السبب: غياب متكرر
                </p>
              </div>

              {/* Legal Analysis */}
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  التحليل القانوني
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground">تحذير:</span> الموظف
                      لديه إنذارين فقط. حسب المادة 80 من نظام العمل، يجب إصدار 3
                      إنذارات قبل الفصل.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">
                      يجب الانتظار 30 يوماً بعد الإنذار الثالث قبل اتخاذ قرار الفصل.
                    </p>
                  </div>
                </div>
              </div>

              {/* Missing Documents */}
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  المستندات المطلوبة
                </h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <XCircle className="h-3 w-3 text-red-600" />
                    الإنذار الثالث (مطلوب)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    محضر التحقيق (متوفر)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    سجل الغياب (متوفر)
                  </li>
                </ul>
              </div>

              {/* Recommendations */}
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  التوصيات
                </h3>
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                  <li>إصدار الإنذار الثالث للموظف</li>
                  <li>الانتظار 30 يوماً بعد الإنذار الثالث</li>
                  <li>توثيق جميع الإجراءات كتابياً</li>
                  <li>إعطاء الموظف فرصة للرد والدفاع</li>
                </ol>
              </div>

              {/* Legal Articles */}
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  المواد القانونية ذات الصلة
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">المادة 80:</span>{" "}
                    يجوز للعامل أن يترك العمل دون إشعار مع احتفاظه بحقوقه النظامية
                    كلها...
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">المادة 77:</span>{" "}
                    إذا أنهى أحد الطرفين العقد لسبب غير مشروع...
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4 ml-2" />
                  تحميل التقرير PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowResult(false)}
                  className="flex-1"
                >
                  إغلاق
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs defaultValue="history" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="history">سجل القرارات</TabsTrigger>
            <TabsTrigger value="guide">دليل الاستخدام</TabsTrigger>
          </TabsList>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="بحث في القرارات..." className="pr-10" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 ml-2" />
                فلترة
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>القرارات المراجعة مؤخراً</CardTitle>
                <CardDescription>آخر 10 قرارات تم تحليلها</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reviewedDecisions.map((decision) => (
                    <div
                      key={decision.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                            decision.status === "safe"
                              ? "bg-green-100 dark:bg-green-950"
                              : decision.status === "warning"
                              ? "bg-yellow-100 dark:bg-yellow-950"
                              : "bg-red-100 dark:bg-red-950"
                          }`}
                        >
                          {decision.status === "safe" ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : decision.status === "warning" ? (
                            <AlertTriangle className="h-5 w-5 text-yellow-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{decision.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {decision.employee}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="secondary"
                          className={
                            decision.status === "safe"
                              ? "bg-green-100 text-green-700"
                              : decision.status === "warning"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {decision.risk}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {decision.date}
                        </span>
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guide Tab */}
          <TabsContent value="guide" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>كيفية استخدام النظام</CardTitle>
                <CardDescription>
                  دليل شامل للتحقق من قانونية القرارات
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-blue-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">اختر نوع القرار</h4>
                      <p className="text-sm text-muted-foreground">
                        حدد نوع القرار الذي تريد إصداره (فصل، إنذار، خصم، إلخ)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-blue-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">أدخل التفاصيل</h4>
                      <p className="text-sm text-muted-foreground">
                        املأ جميع المعلومات المطلوبة عن الموظف والقرار
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-blue-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">ارفع المستندات</h4>
                      <p className="text-sm text-muted-foreground">
                        أرفق المستندات الداعمة (عقد، إنذارات، محاضر تحقيق)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-blue-600">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">احصل على التحليل</h4>
                      <p className="text-sm text-muted-foreground">
                        سيتم تحليل القرار فوراً وإعطاؤك تقرير مفصل
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
