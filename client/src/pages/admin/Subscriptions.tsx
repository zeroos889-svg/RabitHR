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

export default function AdminSubscriptions() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<
    "active" | "inactive" | "trial" | "cancelled" | undefined
  >();

  const { data, isLoading, refetch } = trpc.admin.getAllSubscriptions.useQuery({
    page,
    limit: 20,
    status: statusFilter,
  });

  const updateSubscriptionMutation = trpc.admin.updateSubscription.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث الاشتراك بنجاح");
      refetch();
    },
    onError: error => {
      toast.error("فشل تحديث الاشتراك: " + error.message);
    },
  });

  const handleStatusChange = (id: number, status: string) => {
    updateSubscriptionMutation.mutate({
      id,
      status: status as "active" | "inactive" | "trial" | "cancelled",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      active: { variant: "default", label: "نشط" },
      inactive: { variant: "secondary", label: "غير نشط" },
      trial: { variant: "outline", label: "تجريبي" },
      cancelled: { variant: "destructive", label: "ملغي" },
    };
    const config = variants[status] || { variant: "secondary", label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPlanLabel = (planType: string) => {
    const labels: Record<string, string> = {
      free: "مجاني",
      individual: "مستقل HR",
      starter: "Starter",
      professional: "Professional",
      enterprise: "Enterprise",
      custom: "مخصص",
    };
    return labels[planType] || planType;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">إدارة الاشتراكات</h1>
        <p className="text-muted-foreground mt-2">
          عرض وإدارة جميع اشتراكات المستخدمين
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>الاشتراكات</CardTitle>
          <CardDescription>{data?.total || 0} اشتراك في المنصة</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <Select
              value={statusFilter}
              onValueChange={value => setStatusFilter(value as any)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="جميع الحالات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
                <SelectItem value="trial">تجريبي</SelectItem>
                <SelectItem value="cancelled">ملغي</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المعرف</TableHead>
                  <TableHead>المستخدم</TableHead>
                  <TableHead>الباقة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>تاريخ البداية</TableHead>
                  <TableHead>تاريخ الانتهاء</TableHead>
                  <TableHead>السعر</TableHead>
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
                ) : data?.subscriptions.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-muted-foreground"
                    >
                      لا توجد اشتراكات
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.subscriptions.map(item => (
                    <TableRow key={item.subscription.id}>
                      <TableCell className="font-medium">
                        {item.subscription.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {item.user?.name || "-"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {item.user?.email || "-"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getPlanLabel(item.subscription.planType || "")}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(item.subscription.status || "")}
                      </TableCell>
                      <TableCell>
                        {item.subscription.startDate
                          ? new Date(
                              item.subscription.startDate
                            ).toLocaleDateString("ar-SA")
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {item.subscription.endDate
                          ? new Date(
                              item.subscription.endDate
                            ).toLocaleDateString("ar-SA")
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {item.subscription.price
                          ? `${item.subscription.price} ﷼`
                          : "-"}
                      </TableCell>
                      <TableCell className="text-left">
                        <Select
                          value={item.subscription.status || ""}
                          onValueChange={value =>
                            handleStatusChange(item.subscription.id, value)
                          }
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">نشط</SelectItem>
                            <SelectItem value="inactive">غير نشط</SelectItem>
                            <SelectItem value="trial">تجريبي</SelectItem>
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
