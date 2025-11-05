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
  Ticket,
  Clock,
  CheckCircle2,
  AlertCircle,
  Mail,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Users,
  FileText,
} from "lucide-react";
import { useState } from "react";

// بيانات تجريبية للتذاكر
const ticketsData = [
  {
    id: "TKT-001",
    title: "طلب شهادة راتب",
    description: "أحتاج شهادة راتب للبنك",
    category: "شهادات",
    priority: "عادي",
    status: "مفتوح",
    createdBy: "أحمد محمد",
    assignedTo: "فريق HR",
    createdAt: "2024-11-01 09:30",
    source: "نموذج ويب",
  },
  {
    id: "TKT-002",
    title: "استفسار عن الإجازة السنوية",
    description: "كم يوم متبقي من رصيد إجازتي؟",
    category: "إجازات",
    priority: "متوسط",
    status: "قيد المعالجة",
    createdBy: "فاطمة علي",
    assignedTo: "سارة أحمد",
    createdAt: "2024-11-01 10:15",
    source: "بريد إلكتروني",
  },
  {
    id: "TKT-003",
    title: "شكوى - تأخر صرف الراتب",
    description: "لم يتم صرف راتب شهر أكتوبر",
    category: "رواتب",
    priority: "عاجل",
    status: "قيد المعالجة",
    createdBy: "محمد عبدالله",
    assignedTo: "قسم المالية",
    createdAt: "2024-11-01 11:00",
    source: "واتساب",
  },
  {
    id: "TKT-004",
    title: "طلب تحديث بيانات الاتصال",
    description: "تغيير رقم الجوال والعنوان",
    category: "بيانات شخصية",
    priority: "عادي",
    status: "محلول",
    createdBy: "سارة خالد",
    assignedTo: "فريق HR",
    createdAt: "2024-10-31 14:20",
    source: "نموذج ويب",
  },
  {
    id: "TKT-005",
    title: "استفسار عن التأمينات",
    description: "كيف أحصل على شهادة التأمينات؟",
    category: "تأمينات",
    priority: "متوسط",
    status: "مغلق",
    createdBy: "خالد أحمد",
    assignedTo: "فريق HR",
    createdAt: "2024-10-30 16:45",
    source: "بريد إلكتروني",
  },
];

export default function Tickets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");

  // إحصائيات
  const stats = {
    total: ticketsData.length,
    open: ticketsData.filter(t => t.status === "مفتوح").length,
    inProgress: ticketsData.filter(t => t.status === "قيد المعالجة").length,
    resolved: ticketsData.filter(t => t.status === "محلول").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
              <Ticket className="h-8 w-8 text-pink-600" />
              نظام التذاكر
            </h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              إدارة تذاكر الدعم مع ذكاء اصطناعي
            </p>
          </div>

          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                <Plus className="h-4 w-4 ml-2" />
                إنشاء تذكرة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5 text-pink-600" />
                  إنشاء تذكرة جديدة
                </DialogTitle>
                <DialogDescription>
                  املأ التفاصيل وسيتم تصنيف التذكرة تلقائياً بالذكاء الاصطناعي
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">عنوان التذكرة *</Label>
                  <Input id="title" placeholder="مثال: طلب شهادة راتب" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">الوصف *</Label>
                  <Textarea
                    id="description"
                    placeholder="اشرح المشكلة أو الطلب بالتفصيل..."
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">الفئة</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="certificates">شهادات</SelectItem>
                        <SelectItem value="leaves">إجازات</SelectItem>
                        <SelectItem value="salaries">رواتب</SelectItem>
                        <SelectItem value="insurance">تأمينات</SelectItem>
                        <SelectItem value="personal">بيانات شخصية</SelectItem>
                        <SelectItem value="complaints">شكاوى</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">الأولوية</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الأولوية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">عادي</SelectItem>
                        <SelectItem value="medium">متوسط</SelectItem>
                        <SelectItem value="high">عاجل</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attachments">المرفقات (اختياري)</Label>
                  <Input id="attachments" type="file" multiple />
                  <p className="text-xs text-muted-foreground">
                    يمكنك إرفاق صور أو مستندات (حتى 10 ميجابايت)
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    سيتم تصنيف التذكرة وتعيينها تلقائياً بالذكاء الاصطناعي
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  إلغاء
                </Button>
                <Button className="bg-gradient-to-r from-pink-600 to-purple-600">
                  إنشاء التذكرة
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
                <Ticket className="h-4 w-4" />
                إجمالي التذاكر
              </CardDescription>
              <CardTitle className="text-3xl text-pink-600">
                {stats.total}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline ml-1" />
                +12 هذا الأسبوع
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                تذاكر مفتوحة
              </CardDescription>
              <CardTitle className="text-3xl text-blue-600">
                {stats.open}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <Clock className="h-3 w-3 inline ml-1" />
                تحتاج متابعة
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                قيد المعالجة
              </CardDescription>
              <CardTitle className="text-3xl text-yellow-600">
                {stats.inProgress}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <Users className="h-3 w-3 inline ml-1" />
                يتم العمل عليها
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                تذاكر محلولة
              </CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {stats.resolved}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 inline ml-1" />
                هذا الشهر
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Ticket Sources Info */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              قنوات استقبال التذاكر
            </CardTitle>
            <CardDescription>
              يمكن فتح التذاكر من خلال القنوات التالية
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-3 rounded-lg">
                <Mail className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-semibold">البريد الإلكتروني</p>
                  <p className="text-sm text-muted-foreground">
                    info@rbithr.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-3 rounded-lg">
                <MessageSquare className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-semibold">واتساب</p>
                  <p className="text-sm text-muted-foreground">0570700355</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-3 rounded-lg">
                <FileText className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="font-semibold">نموذج ويب</p>
                  <p className="text-sm text-muted-foreground">
                    من داخل النظام
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="بحث عن تذكرة..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="open">مفتوح</SelectItem>
              <SelectItem value="in-progress">قيد المعالجة</SelectItem>
              <SelectItem value="resolved">محلول</SelectItem>
              <SelectItem value="closed">مغلق</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tickets Table */}
        <Card>
          <CardHeader>
            <CardTitle>التذاكر</CardTitle>
            <CardDescription>جميع تذاكر الدعم والطلبات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">رقم التذكرة</TableHead>
                    <TableHead className="text-right">العنوان</TableHead>
                    <TableHead className="text-right">الفئة</TableHead>
                    <TableHead className="text-right">المصدر</TableHead>
                    <TableHead className="text-right">الأولوية</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">المسؤول</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ticketsData.map(ticket => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-mono font-semibold">
                        {ticket.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {ticket.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{ticket.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {ticket.source === "بريد إلكتروني" && (
                            <Mail className="h-4 w-4 text-blue-600" />
                          )}
                          {ticket.source === "واتساب" && (
                            <MessageSquare className="h-4 w-4 text-green-600" />
                          )}
                          {ticket.source === "نموذج ويب" && (
                            <FileText className="h-4 w-4 text-purple-600" />
                          )}
                          <span className="text-sm">{ticket.source}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            ticket.priority === "عاجل"
                              ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                              : ticket.priority === "متوسط"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          }
                        >
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            ticket.status === "مفتوح"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                              : ticket.status === "قيد المعالجة"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
                                : ticket.status === "محلول"
                                  ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          }
                        >
                          {ticket.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {ticket.assignedTo}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {ticket.createdAt}
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
      </div>
    </DashboardLayout>
  );
}
