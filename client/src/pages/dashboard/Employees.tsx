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
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Filter,
} from "lucide-react";
import { useState } from "react";

// بيانات تجريبية للموظفين
const employeesData = [
  {
    id: 1,
    name: "أحمد محمد علي",
    email: "ahmed.mohamed@company.com",
    phone: "+966 50 123 4567",
    position: "مدير تقني",
    department: "تقنية المعلومات",
    joinDate: "2020-01-15",
    salary: 15000,
    status: "نشط",
  },
  {
    id: 2,
    name: "فاطمة أحمد السعيد",
    email: "fatima.ahmed@company.com",
    phone: "+966 55 234 5678",
    position: "محاسبة رئيسية",
    department: "المالية",
    joinDate: "2019-06-20",
    salary: 12000,
    status: "نشط",
  },
  {
    id: 3,
    name: "محمد عبدالله الغامدي",
    email: "mohammed.abdullah@company.com",
    phone: "+966 56 345 6789",
    position: "مطور برمجيات",
    department: "تقنية المعلومات",
    joinDate: "2021-03-10",
    salary: 10000,
    status: "نشط",
  },
  {
    id: 4,
    name: "سارة علي الشهري",
    email: "sara.ali@company.com",
    phone: "+966 50 456 7890",
    position: "مديرة موارد بشرية",
    department: "الموارد البشرية",
    joinDate: "2018-09-05",
    salary: 13000,
    status: "نشط",
  },
  {
    id: 5,
    name: "خالد سعد القحطاني",
    email: "khaled.saad@company.com",
    phone: "+966 55 567 8901",
    position: "مدير مبيعات",
    department: "المبيعات",
    joinDate: "2020-11-12",
    salary: 11000,
    status: "إجازة",
  },
];

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // فلترة الموظفين
  const filteredEmployees = employeesData.filter(emp => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      filterDepartment === "all" || emp.department === filterDepartment;

    const matchesStatus = filterStatus === "all" || emp.status === filterStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              إدارة الموظفين
            </h1>
            <p className="text-muted-foreground mt-1">
              عرض وإدارة جميع موظفي الشركة
            </p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="h-4 w-4 ml-2" />
                إضافة موظف جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>إضافة موظف جديد</DialogTitle>
                <DialogDescription>أدخل بيانات الموظف الجديد</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل *</Label>
                    <Input id="name" placeholder="أحمد محمد علي" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ahmed@company.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الجوال *</Label>
                    <Input id="phone" placeholder="+966 50 123 4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="national-id">رقم الهوية *</Label>
                    <Input id="national-id" placeholder="1234567890" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">المسمى الوظيفي *</Label>
                    <Input id="position" placeholder="مطور برمجيات" />
                  </div>
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
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="join-date">تاريخ المباشرة *</Label>
                    <Input id="join-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">الراتب الأساسي (﷼) *</Label>
                    <Input id="salary" type="number" placeholder="10000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contract-type">نوع العقد *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع العقد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="permanent">دائم</SelectItem>
                      <SelectItem value="temporary">مؤقت</SelectItem>
                      <SelectItem value="contract">عقد محدد المدة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  إلغاء
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  إضافة الموظف
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="بحث عن موظف..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <Select
                value={filterDepartment}
                onValueChange={setFilterDepartment}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="h-4 w-4 ml-2" />
                  <SelectValue placeholder="القسم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأقسام</SelectItem>
                  <SelectItem value="تقنية المعلومات">
                    تقنية المعلومات
                  </SelectItem>
                  <SelectItem value="الموارد البشرية">
                    الموارد البشرية
                  </SelectItem>
                  <SelectItem value="المالية">المالية</SelectItem>
                  <SelectItem value="المبيعات">المبيعات</SelectItem>
                  <SelectItem value="التسويق">التسويق</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="نشط">نشط</SelectItem>
                  <SelectItem value="إجازة">إجازة</SelectItem>
                  <SelectItem value="معلق">معلق</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 ml-2" />
                تصدير
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>إجمالي الموظفين</CardDescription>
              <CardTitle className="text-3xl text-blue-600">156</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>الموظفين النشطين</CardDescription>
              <CardTitle className="text-3xl text-green-600">142</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>في إجازة</CardDescription>
              <CardTitle className="text-3xl text-orange-600">14</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>موظفين جدد (هذا الشهر)</CardDescription>
              <CardTitle className="text-3xl text-purple-600">8</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Employees Table */}
        <Card>
          <CardHeader>
            <CardTitle>قائمة الموظفين ({filteredEmployees.length})</CardTitle>
            <CardDescription>جميع الموظفين المسجلين في النظام</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">المسمى الوظيفي</TableHead>
                    <TableHead className="text-right">القسم</TableHead>
                    <TableHead className="text-right">
                      البريد الإلكتروني
                    </TableHead>
                    <TableHead className="text-right">تاريخ المباشرة</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map(employee => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">
                        {employee.name}
                      </TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {employee.email}
                      </TableCell>
                      <TableCell>{employee.joinDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            employee.status === "نشط" ? "default" : "secondary"
                          }
                          className={
                            employee.status === "نشط"
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-orange-500 hover:bg-orange-600"
                          }
                        >
                          {employee.status}
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
                          <Button variant="ghost" size="icon" title="تعديل">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="حذف"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
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
