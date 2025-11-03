import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AdminAuditLogs() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = trpc.admin.getAuditLogs.useQuery({
    page,
    limit: 50,
  });

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      create_user: "إنشاء مستخدم",
      update_user: "تحديث مستخدم",
      delete_user: "حذف مستخدم",
      update_subscription: "تحديث اشتراك",
      update_booking: "تحديث حجز",
      login: "تسجيل دخول",
      logout: "تسجيل خروج",
    };
    return labels[action] || action;
  };

  const getActionBadge = (action: string) => {
    if (action.includes("delete")) {
      return <Badge variant="destructive">{getActionLabel(action)}</Badge>;
    } else if (action.includes("create")) {
      return <Badge variant="default">{getActionLabel(action)}</Badge>;
    } else if (action.includes("update")) {
      return <Badge variant="secondary">{getActionLabel(action)}</Badge>;
    }
    return <Badge variant="outline">{getActionLabel(action)}</Badge>;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">سجل النشاطات</h1>
        <p className="text-muted-foreground mt-2">عرض جميع النشاطات والتغييرات في المنصة</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>سجل النشاطات</CardTitle>
          <CardDescription>
            {data?.total || 0} نشاط مسجل
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المعرف</TableHead>
                  <TableHead>المستخدم</TableHead>
                  <TableHead>الإجراء</TableHead>
                  <TableHead>نوع الكيان</TableHead>
                  <TableHead>معرف الكيان</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>التغييرات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      جاري التحميل...
                    </TableCell>
                  </TableRow>
                ) : data?.logs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      لا توجد نشاطات
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.logs.map((item) => (
                    <TableRow key={item.log.id}>
                      <TableCell className="font-medium">{item.log.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.user?.name || "-"}</div>
                          <div className="text-sm text-muted-foreground">{item.user?.email || "-"}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getActionBadge(item.log.action || "")}</TableCell>
                      <TableCell>{item.log.entityType || "-"}</TableCell>
                      <TableCell>{item.log.entityId || "-"}</TableCell>
                      <TableCell>
                        {new Date(item.log.createdAt).toLocaleString("ar-SA")}
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                        {item.log.changes || "-"}
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
    </div>
  );
}
