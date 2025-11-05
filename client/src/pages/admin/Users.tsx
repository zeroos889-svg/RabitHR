import { useState } from "react";
import { trpc } from "@/lib/trpc";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, Trash2, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export default function AdminUsers() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"admin" | "user" | undefined>();
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  const { data, isLoading, refetch } = trpc.admin.getAllUsers.useQuery({
    page,
    limit: 20,
    search: search || undefined,
    role: roleFilter,
  });

  const deleteUserMutation = trpc.admin.deleteUser.useMutation({
    onSuccess: () => {
      toast.success("تم حذف المستخدم بنجاح");
      refetch();
      setDeleteUserId(null);
    },
    onError: error => {
      toast.error("فشل حذف المستخدم: " + error.message);
    },
  });

  const handleDelete = () => {
    if (deleteUserId) {
      deleteUserMutation.mutate({ id: deleteUserId });
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">إدارة المستخدمين</h1>
        <p className="text-muted-foreground mt-2">
          عرض وإدارة جميع مستخدمي المنصة
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>المستخدمون</CardTitle>
          <CardDescription>
            {data?.total || 0} مستخدم مسجل في المنصة
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="بحث بالاسم أو البريد الإلكتروني..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select
              value={roleFilter}
              onValueChange={value => setRoleFilter(value as any)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="جميع الأدوار" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأدوار</SelectItem>
                <SelectItem value="admin">مدير</SelectItem>
                <SelectItem value="user">مستخدم</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المعرف</TableHead>
                  <TableHead>الاسم</TableHead>
                  <TableHead>البريد الإلكتروني</TableHead>
                  <TableHead>الدور</TableHead>
                  <TableHead>نوع المستخدم</TableHead>
                  <TableHead>تاريخ التسجيل</TableHead>
                  <TableHead className="text-left">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      جاري التحميل...
                    </TableCell>
                  </TableRow>
                ) : data?.users.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-muted-foreground"
                    >
                      لا توجد نتائج
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name || "-"}</TableCell>
                      <TableCell>{user.email || "-"}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.role === "admin" ? "default" : "secondary"
                          }
                        >
                          {user.role === "admin" ? "مدير" : "مستخدم"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.userType === "employee"
                          ? "موظف"
                          : user.userType === "individual"
                            ? "مستقل"
                            : user.userType === "company"
                              ? "شركة"
                              : "-"}
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString("ar-SA")}
                      </TableCell>
                      <TableCell className="text-left">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" title="تعديل">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="حذف"
                            onClick={() => setDeleteUserId(user.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                صفحة {page} من {data.totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  <ChevronRight className="h-4 w-4" />
                  السابق
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={page === data.totalPages}
                >
                  التالي
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteUserId !== null}
        onOpenChange={() => setDeleteUserId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم حذف المستخدم نهائياً ولا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
