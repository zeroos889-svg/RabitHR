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
  CheckSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  User,
  TrendingUp,
  ListTodo,
  Target,
  Zap,
} from "lucide-react";
import { useState } from "react";

// بيانات تجريبية للمهام
const tasksData = [
  {
    id: "TSK-001",
    title: "مراجعة طلبات الإجازات",
    description: "مراجعة والموافقة على طلبات الإجازات المعلقة",
    assignedTo: "سارة أحمد",
    dueDate: "2024-11-05",
    priority: "عاجل",
    status: "قيد التنفيذ",
    progress: 60,
    createdAt: "2024-11-01",
  },
  {
    id: "TSK-002",
    title: "إعداد تقرير الرواتب الشهري",
    description: "إعداد تقرير الرواتب لشهر أكتوبر",
    assignedTo: "محمد علي",
    dueDate: "2024-11-03",
    priority: "متوسط",
    status: "قيد التنفيذ",
    progress: 80,
    createdAt: "2024-10-28",
  },
  {
    id: "TSK-003",
    title: "تحديث بيانات الموظفين",
    description: "تحديث بيانات الاتصال للموظفين الجدد",
    assignedTo: "فاطمة خالد",
    dueDate: "2024-11-02",
    priority: "عادي",
    status: "مكتملة",
    progress: 100,
    createdAt: "2024-10-30",
  },
  {
    id: "TSK-004",
    title: "إجراء مقابلات التوظيف",
    description: "مقابلة 5 مرشحين لوظيفة مطور",
    assignedTo: "أحمد محمد",
    dueDate: "2024-11-08",
    priority: "متوسط",
    status: "لم تبدأ",
    progress: 0,
    createdAt: "2024-11-01",
  },
  {
    id: "TSK-005",
    title: "مراجعة عقود الموظفين",
    description: "مراجعة وتحديث عقود الموظفين المنتهية",
    assignedTo: "سارة أحمد",
    dueDate: "2024-11-10",
    priority: "عادي",
    status: "لم تبدأ",
    progress: 0,
    createdAt: "2024-11-01",
  },
];

export default function Tasks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");

  // إحصائيات
  const stats = {
    total: tasksData.length,
    notStarted: tasksData.filter(t => t.status === "لم تبدأ").length,
    inProgress: tasksData.filter(t => t.status === "قيد التنفيذ").length,
    completed: tasksData.filter(t => t.status === "مكتملة").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-2">
              <CheckSquare className="h-8 w-8 text-green-600" />
              نظام المهام
            </h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <Target className="h-4 w-4" />
              إدارة وتتبع مهام الموارد البشرية
            </p>
          </div>

          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                <Plus className="h-4 w-4 ml-2" />
                إنشاء مهمة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-green-600" />
                  إنشاء مهمة جديدة
                </DialogTitle>
                <DialogDescription>
                  أضف مهمة جديدة وعيّنها لأحد أعضاء الفريق
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="task-title">عنوان المهمة *</Label>
                  <Input
                    id="task-title"
                    placeholder="مثال: مراجعة طلبات الإجازات"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-description">الوصف *</Label>
                  <Textarea
                    id="task-description"
                    placeholder="اشرح المهمة بالتفصيل..."
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assignee">تعيين إلى</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الموظف" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sara">سارة أحمد</SelectItem>
                        <SelectItem value="mohamed">محمد علي</SelectItem>
                        <SelectItem value="fatima">فاطمة خالد</SelectItem>
                        <SelectItem value="ahmed">أحمد محمد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="due-date">الموعد النهائي</Label>
                    <Input id="due-date" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-priority">الأولوية</Label>
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
                  <div className="space-y-2">
                    <Label htmlFor="task-status">الحالة</Label>
                    <Select defaultValue="not-started">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not-started">لم تبدأ</SelectItem>
                        <SelectItem value="in-progress">قيد التنفيذ</SelectItem>
                        <SelectItem value="completed">مكتملة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    سيتم إرسال إشعار للموظف المعيّن تلقائياً
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
                <Button className="bg-gradient-to-r from-green-600 to-teal-600">
                  إنشاء المهمة
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
                <ListTodo className="h-4 w-4" />
                إجمالي المهام
              </CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {stats.total}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline ml-1" />
                +8 هذا الأسبوع
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                لم تبدأ
              </CardDescription>
              <CardTitle className="text-3xl text-gray-600">
                {stats.notStarted}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <Clock className="h-3 w-3 inline ml-1" />
                في انتظار البدء
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                قيد التنفيذ
              </CardDescription>
              <CardTitle className="text-3xl text-yellow-600">
                {stats.inProgress}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <User className="h-3 w-3 inline ml-1" />
                يتم العمل عليها
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                مهام مكتملة
              </CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {stats.completed}
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

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-600" />
              إجراءات سريعة
            </CardTitle>
            <CardDescription>مهام شائعة يمكنك القيام بها</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2 bg-white dark:bg-gray-900 hover:bg-green-50 dark:hover:bg-green-950"
              >
                <Calendar className="h-6 w-6 text-green-600" />
                <div className="text-center">
                  <p className="font-semibold">مهام اليوم</p>
                  <p className="text-xs text-muted-foreground">3 مهام</p>
                </div>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2 bg-white dark:bg-gray-900 hover:bg-yellow-50 dark:hover:bg-yellow-950"
              >
                <AlertCircle className="h-6 w-6 text-yellow-600" />
                <div className="text-center">
                  <p className="font-semibold">مهام متأخرة</p>
                  <p className="text-xs text-muted-foreground">1 مهمة</p>
                </div>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2 bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-950"
              >
                <User className="h-6 w-6 text-blue-600" />
                <div className="text-center">
                  <p className="font-semibold">مهامي</p>
                  <p className="text-xs text-muted-foreground">5 مهام</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="بحث عن مهمة..."
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
              <SelectItem value="not-started">لم تبدأ</SelectItem>
              <SelectItem value="in-progress">قيد التنفيذ</SelectItem>
              <SelectItem value="completed">مكتملة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tasks Table */}
        <Card>
          <CardHeader>
            <CardTitle>المهام</CardTitle>
            <CardDescription>جميع مهام الموارد البشرية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">رقم المهمة</TableHead>
                    <TableHead className="text-right">العنوان</TableHead>
                    <TableHead className="text-right">المسؤول</TableHead>
                    <TableHead className="text-right">الموعد النهائي</TableHead>
                    <TableHead className="text-right">الأولوية</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">التقدم</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasksData.map(task => (
                    <TableRow key={task.id}>
                      <TableCell className="font-mono font-semibold">
                        {task.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {task.title}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{task.assignedTo}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{task.dueDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            task.priority === "عاجل"
                              ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                              : task.priority === "متوسط"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          }
                        >
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            task.status === "لم تبدأ"
                              ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                              : task.status === "قيد التنفيذ"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
                                : "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                          }
                        >
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-600 to-teal-600"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {task.progress}%
                          </span>
                        </div>
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
