import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
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
import { Badge } from "@/components/ui/badge";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Loader2,
  Plus,
  Trash2,
  Edit,
  Tag,
  TrendingUp,
  Users,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminDiscountCodes() {
  const { user, loading: authLoading } = useAuth();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newCode, setNewCode] = useState({
    code: "",
    description: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: 10,
    maxUses: undefined as number | undefined,
    validFrom: undefined as Date | undefined,
    validUntil: undefined as Date | undefined,
  });

  // Fetch all codes
  const { data, isLoading, refetch } = trpc.discountCodes.getAll.useQuery(
    undefined,
    {
      enabled: user?.role === "admin",
    }
  );
  const codes = data?.codes || [];

  // Create mutation
  const createMutation = trpc.discountCodes.create.useMutation({
    onSuccess: () => {
      toast.success("تم إنشاء الكود بنجاح");
      setCreateDialogOpen(false);
      resetForm();
      refetch();
    },
    onError: error => {
      toast.error("فشل إنشاء الكود: " + error.message);
    },
  });

  // Delete mutation
  const deleteMutation = trpc.discountCodes.delete.useMutation({
    onSuccess: () => {
      toast.success("تم حذف الكود بنجاح");
      refetch();
    },
    onError: error => {
      toast.error("فشل حذف الكود: " + error.message);
    },
  });

  // Update mutation (toggle active)
  const updateMutation = trpc.discountCodes.update.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث الكود بنجاح");
      refetch();
    },
    onError: error => {
      toast.error("فشل تحديث الكود: " + error.message);
    },
  });

  const resetForm = () => {
    setNewCode({
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: 10,
      maxUses: undefined,
      validFrom: undefined,
      validUntil: undefined,
    });
  };

  const handleCreate = () => {
    if (!newCode.code.trim()) {
      toast.error("الرجاء إدخال الكود");
      return;
    }
    if (newCode.discountValue <= 0) {
      toast.error("قيمة الخصم يجب أن تكون أكبر من صفر");
      return;
    }
    if (newCode.discountType === "percentage" && newCode.discountValue > 100) {
      toast.error("نسبة الخصم يجب ألا تتجاوز 100%");
      return;
    }

    createMutation.mutate(newCode);
  };

  const toggleActive = (id: number, currentStatus: boolean) => {
    updateMutation.mutate({ id, isActive: !currentStatus });
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>غير مصرح</CardTitle>
            <CardDescription>هذه الصفحة مخصصة للمديرين فقط</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Calculate stats
  const totalCodes = codes.length;
  const activeCodes = codes.filter((c: any) => c.isActive).length;
  const totalUsage = codes.reduce(
    (sum: number, c: any) => sum + (c.usedCount || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">إدارة أكواد الخصم</h1>
              <p className="text-muted-foreground">
                إنشاء وإدارة أكواد الخصم للاشتراكات
              </p>
            </div>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="ml-2 h-4 w-4" />
                  كود جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>إنشاء كود خصم جديد</DialogTitle>
                  <DialogDescription>
                    أضف كود خصم جديد للاشتراكات
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>الكود *</Label>
                    <Input
                      placeholder="SUMMER2024"
                      value={newCode.code}
                      onChange={e =>
                        setNewCode({
                          ...newCode,
                          code: e.target.value.toUpperCase(),
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>الوصف</Label>
                    <Input
                      placeholder="خصم الصيف"
                      value={newCode.description}
                      onChange={e =>
                        setNewCode({ ...newCode, description: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>نوع الخصم *</Label>
                    <Select
                      value={newCode.discountType}
                      onValueChange={(value: "percentage" | "fixed") =>
                        setNewCode({ ...newCode, discountType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">
                          نسبة مئوية (%)
                        </SelectItem>
                        <SelectItem value="fixed">مبلغ ثابت (﷼)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>قيمة الخصم *</Label>
                    <Input
                      type="number"
                      min="1"
                      max={
                        newCode.discountType === "percentage" ? 100 : undefined
                      }
                      value={newCode.discountValue}
                      onChange={e =>
                        setNewCode({
                          ...newCode,
                          discountValue: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {newCode.discountType === "percentage"
                        ? "نسبة الخصم (1-100%)"
                        : "المبلغ بالريال السعودي"}
                    </p>
                  </div>
                  <div>
                    <Label>الحد الأقصى للاستخدام</Label>
                    <Input
                      type="number"
                      min="1"
                      placeholder="غير محدود"
                      value={newCode.maxUses || ""}
                      onChange={e =>
                        setNewCode({
                          ...newCode,
                          maxUses: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setCreateDialogOpen(false)}
                  >
                    إلغاء
                  </Button>
                  <Button
                    onClick={handleCreate}
                    disabled={createMutation.isPending}
                  >
                    {createMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "إنشاء"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-blue-100">
                    <Tag className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      إجمالي الأكواد
                    </p>
                    <p className="text-2xl font-bold">{totalCodes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-green-100">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">أكواد نشطة</p>
                    <p className="text-2xl font-bold">{activeCodes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-purple-100">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      مرات الاستخدام
                    </p>
                    <p className="text-2xl font-bold">{totalUsage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Codes List */}
        {codes.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">لا توجد أكواد خصم</h3>
              <p className="text-muted-foreground mb-4">
                ابدأ بإنشاء كود خصم جديد
              </p>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="ml-2 h-4 w-4" />
                إنشاء كود جديد
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {codes.map((code: any) => (
              <Card
                key={code.id}
                className={!code.isActive ? "opacity-60" : ""}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge
                          variant="secondary"
                          className="font-mono text-lg px-3 py-1"
                        >
                          {code.code}
                        </Badge>
                        <Badge
                          variant={code.isActive ? "default" : "secondary"}
                        >
                          {code.isActive ? "نشط" : "غير نشط"}
                        </Badge>
                        {code.maxUses && (
                          <Badge variant="outline">
                            {code.usedCount}/{code.maxUses} استخدام
                          </Badge>
                        )}
                      </div>
                      {code.description && (
                        <p className="text-sm text-muted-foreground mb-3">
                          {code.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">الخصم: </span>
                          <span className="font-semibold">
                            {code.discountType === "percentage"
                              ? `${code.discountValue}%`
                              : `${code.discountValue} ﷼`}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            الاستخدام:{" "}
                          </span>
                          <span className="font-semibold">
                            {code.usedCount || 0}{" "}
                            {code.maxUses ? `/ ${code.maxUses}` : ""}
                          </span>
                        </div>
                        {code.validUntil && (
                          <div>
                            <span className="text-muted-foreground">
                              ينتهي:{" "}
                            </span>
                            <span className="font-semibold">
                              {new Date(code.validUntil).toLocaleDateString(
                                "ar-SA"
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleActive(code.id, code.isActive)}
                        disabled={updateMutation.isPending}
                      >
                        {code.isActive ? "تعطيل" : "تفعيل"}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                            <AlertDialogDescription>
                              سيتم حذف كود الخصم "{code.code}" نهائياً
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                deleteMutation.mutate({ id: code.id })
                              }
                              className="bg-red-600 hover:bg-red-700"
                            >
                              حذف
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
