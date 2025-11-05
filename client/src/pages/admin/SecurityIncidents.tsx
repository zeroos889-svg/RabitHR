import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  AlertTriangle,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Send,
  Users,
} from "lucide-react";
import { useLocation } from "wouter";

/**
 * صفحة إدارة الحوادث الأمنية (للأدمن)
 * PDPL Requirement: الإخطار عن الخروقات خلال 72 ساعة
 */
export default function AdminSecurityIncidents() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form state
  const [description, setDescription] = useState("");
  const [cause, setCause] = useState("");
  const [affectedDataCategories, setAffectedDataCategories] = useState("");
  const [affectedUsersCount, setAffectedUsersCount] = useState("");
  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">(
    "medium"
  );

  // Queries
  const { data, isLoading, refetch } = trpc.adminPdpl.getIncidents.useQuery();

  // Mutations
  const createIncidentMutation = trpc.adminPdpl.createIncident.useMutation({
    onSuccess: () => {
      toast.success("تم تسجيل الحادث بنجاح");
      setIsDialogOpen(false);
      resetForm();
      refetch();
    },
  });

  const updateIncidentMutation = trpc.adminPdpl.updateIncident.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث الحادث بنجاح");
      refetch();
    },
  });

  const resetForm = () => {
    setDescription("");
    setCause("");
    setAffectedDataCategories("");
    setAffectedUsersCount("");
    setRiskLevel("medium");
  };

  const handleCreateIncident = () => {
    if (!description) {
      toast.error("يرجى إدخال وصف الحادث");
      return;
    }

    createIncidentMutation.mutate({
      description,
      cause: cause || undefined,
      affectedDataCategories: affectedDataCategories || undefined,
      affectedUsersCount: affectedUsersCount
        ? parseInt(affectedUsersCount)
        : undefined,
      riskLevel,
    });
  };

  const handleReportToSdaia = (incidentId: number) => {
    if (confirm("هل تم إبلاغ سدايا فعلياً عن هذا الحادث؟")) {
      updateIncidentMutation.mutate({
        incidentId,
        reportedToSdaiaAt: new Date(),
        status: "reported",
      });
    }
  };

  const handleReportToUsers = (incidentId: number) => {
    if (confirm("هل تم إخطار المستخدمين المتضررين؟")) {
      updateIncidentMutation.mutate({
        incidentId,
        reportedToUsersAt: new Date(),
      });
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    setLocation("/");
    return null;
  }

  const getRiskBadge = (level: string) => {
    const variants: Record<string, any> = {
      low: {
        variant: "secondary",
        label: "منخفض",
        className: "bg-green-100 text-green-800",
      },
      medium: {
        variant: "default",
        label: "متوسط",
        className: "bg-amber-100 text-amber-800",
      },
      high: {
        variant: "destructive",
        label: "عالي",
        className: "bg-red-100 text-red-800",
      },
    };
    const config = variants[level] || variants.medium;

    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      new: { label: "جديد", className: "bg-blue-100 text-blue-800" },
      investigating: {
        label: "قيد التحقيق",
        className: "bg-purple-100 text-purple-800",
      },
      reported: {
        label: "تم الإبلاغ",
        className: "bg-amber-100 text-amber-800",
      },
      resolved: { label: "محلول", className: "bg-green-100 text-green-800" },
    };
    const config = variants[status] || variants.new;

    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getHoursRemaining = (detectedAt: string) => {
    const detected = new Date(detectedAt);
    const now = new Date();
    const diffHours = Math.floor(
      (now.getTime() - detected.getTime()) / (1000 * 60 * 60)
    );
    const remaining = 72 - diffHours;

    if (remaining < 0) {
      return (
        <span className="text-red-600 font-semibold">
          متأخر {Math.abs(remaining)} ساعة ⚠️
        </span>
      );
    } else if (remaining <= 12) {
      return (
        <span className="text-amber-600 font-semibold">
          متبقي {remaining} ساعة
        </span>
      );
    } else {
      return (
        <span className="text-muted-foreground">متبقي {remaining} ساعة</span>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
              الحوادث الأمنية
            </h1>
            <p className="text-muted-foreground">
              إدارة خروقات البيانات (الإبلاغ خلال 72 ساعة)
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="h-4 w-4 mr-2" />
                تسجيل حادث جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>تسجيل حادث أمني جديد</DialogTitle>
                <DialogDescription>
                  املأ جميع التفاصيل المتعلقة بالحادث. سيبدأ العد التنازلي للـ
                  72 ساعة فوراً.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="description">وصف الحادث *</Label>
                  <Textarea
                    id="description"
                    placeholder="اشرح ما حدث بالتفصيل..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="cause">السبب (إن كان معروفاً)</Label>
                  <Textarea
                    id="cause"
                    placeholder="ما الذي تسبب في الحادث؟"
                    value={cause}
                    onChange={e => setCause(e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="categories">فئات البيانات المتأثرة</Label>
                  <Input
                    id="categories"
                    placeholder="مثال: أسماء، أرقام هواتف، عناوين"
                    value={affectedDataCategories}
                    onChange={e => setAffectedDataCategories(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="usersCount">
                    عدد المستخدمين المتأثرين (تقريبي)
                  </Label>
                  <Input
                    id="usersCount"
                    type="number"
                    placeholder="0"
                    value={affectedUsersCount}
                    onChange={e => setAffectedUsersCount(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="riskLevel">مستوى الخطورة *</Label>
                  <Select
                    value={riskLevel}
                    onValueChange={(value: any) => setRiskLevel(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">منخفض</SelectItem>
                      <SelectItem value="medium">متوسط</SelectItem>
                      <SelectItem value="high">عالي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleCreateIncident}
                  disabled={createIncidentMutation.isPending}
                  className="w-full"
                >
                  تسجيل الحادث
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600">
                  {data?.incidents?.filter((i: any) => {
                    const detected = new Date(i.detectedAt);
                    const now = new Date();
                    const diffHours = Math.floor(
                      (now.getTime() - detected.getTime()) / (1000 * 60 * 60)
                    );
                    return diffHours > 72 && !i.reportedToSdaiaAt;
                  }).length || 0}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  متأخرة (72+ ساعة)
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-600">
                  {data?.incidents?.filter(
                    (i: any) => i.status === "investigating"
                  ).length || 0}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  قيد التحقيق
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">
                  {data?.incidents?.filter((i: any) => i.status === "reported")
                    .length || 0}
                </p>
                <p className="text-sm text-muted-foreground mt-1">تم الإبلاغ</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">
                  {data?.incidents?.filter((i: any) => i.status === "resolved")
                    .length || 0}
                </p>
                <p className="text-sm text-muted-foreground mt-1">محلولة</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Incidents List */}
        <Card>
          <CardHeader>
            <CardTitle>جميع الحوادث</CardTitle>
          </CardHeader>
          <CardContent>
            {!data?.incidents || data.incidents.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>لا توجد حوادث مسجلة (هذا جيد! 🎉)</p>
              </div>
            ) : (
              <div className="space-y-4">
                {data.incidents.map((incident: any) => (
                  <Card
                    key={incident.id}
                    className={`border-2 ${incident.isLate ? "border-red-300 bg-red-50" : ""}`}
                  >
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="h-5 w-5 text-red-600" />
                              <h3 className="font-semibold">
                                حادث #{incident.id}
                              </h3>
                              {getRiskBadge(incident.riskLevel)}
                              {getStatusBadge(incident.status)}
                              {incident.isLate && (
                                <Badge className="bg-red-600 text-white">
                                  متأخر!
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {incident.description}
                            </p>
                            {incident.cause && (
                              <p className="text-sm bg-slate-100 p-2 rounded">
                                <strong>السبب:</strong> {incident.cause}
                              </p>
                            )}
                          </div>

                          <div className="text-right space-y-2">
                            <p className="text-sm text-muted-foreground">
                              {new Date(incident.detectedAt).toLocaleString(
                                "ar-SA"
                              )}
                            </p>
                            {!incident.reportedToSdaiaAt && (
                              <p className="text-sm">
                                {getHoursRemaining(incident.detectedAt)}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3">
                          {incident.affectedUsersCount && (
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {incident.affectedUsersCount} مستخدم متأثر
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 pt-3 border-t">
                          {!incident.reportedToSdaiaAt && (
                            <Button
                              size="sm"
                              onClick={() => handleReportToSdaia(incident.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              <Send className="h-3 w-3 mr-1" />
                              إبلاغ سدايا
                            </Button>
                          )}
                          {incident.reportedToSdaiaAt &&
                            !incident.reportedToUsersAt && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReportToUsers(incident.id)}
                              >
                                <Send className="h-3 w-3 mr-1" />
                                إخطار المستخدمين
                              </Button>
                            )}
                          {incident.reportedToSdaiaAt && (
                            <Badge
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              <CheckCircle className="h-3 w-3" />
                              تم الإبلاغ لسدايا
                            </Badge>
                          )}
                          {incident.reportedToUsersAt && (
                            <Badge
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              <CheckCircle className="h-3 w-3" />
                              تم إخطار المستخدمين
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Warning */}
        <Card className="mt-6 bg-red-50 border-red-200">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm text-red-900">
                <p className="font-semibold">تحذير هام - متطلبات PDPL:</p>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>
                    <strong>72 ساعة:</strong> يجب إبلاغ سدايا عن أي خرق خلال 72
                    ساعة من اكتشافه
                  </li>
                  <li>
                    <strong>إخطار المتضررين:</strong> يجب إخطار المستخدمين
                    المتأثرين بدون تأخير غير مبرر
                  </li>
                  <li>
                    <strong>التوثيق:</strong> يجب توثيق جميع الخروقات حتى لو لم
                    تتطلب إبلاغ سدايا
                  </li>
                  <li>
                    <strong>العقوبات:</strong> التأخير في الإبلاغ قد يعرض المنصة
                    لغرامات كبيرة
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
