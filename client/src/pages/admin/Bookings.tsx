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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export default function AdminBookings() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"pending" | "assigned" | "in-progress" | "completed" | "cancelled" | undefined>();

  const { data, isLoading, refetch } = trpc.admin.getAllBookings.useQuery({
    page,
    limit: 20,
    status: statusFilter,
  });

  const updateBookingMutation = trpc.admin.updateBooking.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث الحجز بنجاح");
      refetch();
    },
    onError: (error) => {
      toast.error("فشل تحديث الحجز: " + error.message);
    },
  });

  const handleStatusChange = (id: number, status: string) => {
    updateBookingMutation.mutate({ 
      id, 
      status: status as "pending" | "assigned" | "in-progress" | "completed" | "cancelled"
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      pending: { variant: "outline", label: "معلق" },
      assigned: { variant: "secondary", label: "معين" },
      "in-progress": { variant: "default", label: "قيد التنفيذ" },
      completed: { variant: "default", label: "مكتمل" },
      cancelled: { variant: "destructive", label: "ملغي" },
    };
    const config = variants[status] || { variant: "secondary", label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">إدارة الحجوزات</h1>
        <p className="text-muted-foreground mt-2">عرض وإدارة جميع حجوزات الاستشارات</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>الحجوزات</CardTitle>
          <CardDescription>
            {data?.total || 0} حجز في المنصة
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="جميع الحالات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">معلق</SelectItem>
                <SelectItem value="assigned">معين</SelectItem>
                <SelectItem value="in-progress">قيد التنفيذ</SelectItem>
                <SelectItem value="completed">مكتمل</SelectItem>
                <SelectItem value="cancelled">ملغي</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم التذكرة</TableHead>
                  <TableHead>المستخدم</TableHead>
                  <TableHead>الباقة</TableHead>
                  <TableHead>التاريخ المفضل</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>السعر</TableHead>
                  <TableHead>تاريخ الإنشاء</TableHead>
                  <TableHead className="text-left">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      جاري التحميل...
                    </TableCell>
                  </TableRow>
                ) : data?.bookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      لا توجد حجوزات
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.bookings.map((item) => (
                    <TableRow key={item.booking.id}>
                      <TableCell className="font-medium">{item.booking.ticketNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.user?.name || "-"}</div>
                          <div className="text-sm text-muted-foreground">{item.user?.email || "-"}</div>
                        </div>
                      </TableCell>
                      <TableCell>{item.package?.name || "-"}</TableCell>
                      <TableCell>
                        {item.booking.scheduledAt
                          ? new Date(item.booking.scheduledAt).toLocaleDateString("ar-SA")
                          : "-"}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.booking.status || "")}</TableCell>
                      <TableCell>
                        {item.package?.priceSAR ? `${item.package.priceSAR} ﷼` : "-"}
                      </TableCell>
                      <TableCell>
                        {new Date(item.booking.createdAt).toLocaleDateString("ar-SA")}
                      </TableCell>
                      <TableCell className="text-left">
                        <Select
                          value={item.booking.status || ""}
                          onValueChange={(value) => handleStatusChange(item.booking.id, value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">معلق</SelectItem>
                            <SelectItem value="assigned">معين</SelectItem>
                            <SelectItem value="in-progress">قيد التنفيذ</SelectItem>
                            <SelectItem value="completed">مكتمل</SelectItem>
                            <SelectItem value="cancelled">ملغي</SelectItem>
                          </SelectContent>
                        </Select>
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
