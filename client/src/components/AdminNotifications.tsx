import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { AlertTriangle, Clock, Shield, ChevronRight, Bell } from "lucide-react";
import { Link } from "wouter";

/**
 * مكون الإشعارات للأدمن - يعرض التنبيهات المهمة
 * PDPL: تنبيهات الطلبات (30 يوم) والحوادث (72 ساعة)
 */
export function AdminNotifications() {
  const { data: requests } = trpc.adminPdpl.getRequests.useQuery();
  const { data: incidents } = trpc.adminPdpl.getIncidents.useQuery();

  // حساب الطلبات القريبة من 30 يوم
  const urgentRequests =
    requests?.requests?.filter((r: any) => {
      if (r.status === "done" || r.status === "rejected") return false;

      const created = new Date(r.createdAt);
      const now = new Date();
      const diffDays = Math.floor(
        (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
      );
      const remaining = 30 - diffDays;

      return remaining <= 5; // آخر 5 أيام
    }) || [];

  // حساب الطلبات المتأخرة
  const lateRequests =
    requests?.requests?.filter((r: any) => {
      if (r.status === "done" || r.status === "rejected") return false;

      const created = new Date(r.createdAt);
      const now = new Date();
      const diffDays = Math.floor(
        (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
      );

      return diffDays > 30;
    }) || [];

  // حساب الحوادث القريبة من 72 ساعة
  const urgentIncidents =
    incidents?.incidents?.filter((i: any) => {
      if (i.reportedToSdaiaAt) return false;

      const detected = new Date(i.detectedAt);
      const now = new Date();
      const diffHours = Math.floor(
        (now.getTime() - detected.getTime()) / (1000 * 60 * 60)
      );
      const remaining = 72 - diffHours;

      return remaining <= 12; // آخر 12 ساعة
    }) || [];

  // حساب الحوادث المتأخرة
  const lateIncidents =
    incidents?.incidents?.filter((i: any) => {
      if (i.reportedToSdaiaAt) return false;

      const detected = new Date(i.detectedAt);
      const now = new Date();
      const diffHours = Math.floor(
        (now.getTime() - detected.getTime()) / (1000 * 60 * 60)
      );

      return diffHours > 72;
    }) || [];

  const totalAlerts =
    lateRequests.length +
    lateIncidents.length +
    urgentRequests.length +
    urgentIncidents.length;

  if (totalAlerts === 0) {
    return null; // لا تعرض شيئاً إذا لم تكن هناك تنبيهات
  }

  return (
    <Card className="border-amber-200 bg-amber-50">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Bell className="h-5 w-5 text-amber-600" />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-amber-900">
                تنبيهات PDPL ({totalAlerts})
              </h3>
              <Badge variant="destructive" className="bg-amber-600">
                يتطلب انتباه
              </Badge>
            </div>

            <div className="space-y-2">
              {/* Late Requests */}
              {lateRequests.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-red-100 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-900">
                      {lateRequests.length} طلب متأخر (أكثر من 30 يوم)
                    </span>
                  </div>
                  <Link href="/admin/data-requests">
                    <Button size="sm" variant="destructive">
                      عرض
                      <ChevronRight className="h-3 w-3 mr-1" />
                    </Button>
                  </Link>
                </div>
              )}

              {/* Urgent Requests */}
              {urgentRequests.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-amber-100 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-900">
                      {urgentRequests.length} طلب عاجل (أقل من 5 أيام)
                    </span>
                  </div>
                  <Link href="/admin/data-requests">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-300"
                    >
                      عرض
                      <ChevronRight className="h-3 w-3 mr-1" />
                    </Button>
                  </Link>
                </div>
              )}

              {/* Late Incidents */}
              {lateIncidents.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-red-100 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-900">
                      {lateIncidents.length} حادث متأخر (أكثر من 72 ساعة)
                    </span>
                  </div>
                  <Link href="/admin/security-incidents">
                    <Button size="sm" variant="destructive">
                      عرض
                      <ChevronRight className="h-3 w-3 mr-1" />
                    </Button>
                  </Link>
                </div>
              )}

              {/* Urgent Incidents */}
              {urgentIncidents.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-amber-100 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-900">
                      {urgentIncidents.length} حادث عاجل (أقل من 12 ساعة)
                    </span>
                  </div>
                  <Link href="/admin/security-incidents">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-300"
                    >
                      عرض
                      <ChevronRight className="h-3 w-3 mr-1" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            <p className="text-xs text-amber-800">
              <strong>تذكير:</strong> يجب الرد على طلبات الحقوق خلال 30 يوم،
              والإبلاغ عن الخروقات خلال 72 ساعة (متطلبات PDPL)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
