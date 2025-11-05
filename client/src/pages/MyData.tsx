import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Download,
  Edit,
  Trash2,
  Ban,
  Shield,
  AlertCircle,
  CheckCircle,
  ChevronLeft,
} from "lucide-react";
import { Link, useLocation } from "wouter";

/**
 * صفحة "بياناتي" - حقوق صاحب البيانات (PDPL)
 * تتيح للمستخدم ممارسة حقوقه: الوصول، التصحيح، الحذف، الاعتراض، سحب الموافقة
 */
export default function MyData() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [requestPayload, setRequestPayload] = useState("");
  const [activeRequest, setActiveRequest] = useState<string | null>(null);

  // Queries
  const { data: consentStatus } = trpc.privacy.getConsentStatus.useQuery();
  const { data: userData } = trpc.privacy.getMyData.useQuery();

  // Mutations
  const withdrawConsentMutation = trpc.privacy.withdrawConsent.useMutation({
    onSuccess: () => {
      toast.success("تم سحب الموافقة بنجاح");
    },
  });

  const createRequestMutation = trpc.privacy.createRequest.useMutation({
    onSuccess: () => {
      toast.success("تم إرسال الطلب بنجاح. سنرد عليك خلال 30 يوم عمل.");
      setRequestPayload("");
      setActiveRequest(null);
    },
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    setLocation("/login");
    return null;
  }

  const handleRequest = (
    type: "access" | "correct" | "delete" | "withdraw" | "object"
  ) => {
    if (type === "access") {
      // تحميل البيانات مباشرة
      const dataStr = JSON.stringify(userData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `my-data-${new Date().toISOString()}.json`;
      link.click();
      toast.success("تم تحميل بياناتك بنجاح");
      return;
    }

    if (type === "withdraw") {
      if (
        confirm(
          "هل أنت متأكد من سحب موافقتك؟ قد يؤثر ذلك على قدرتك على استخدام بعض الخدمات."
        )
      ) {
        withdrawConsentMutation.mutate();
      }
      return;
    }

    // باقي الطلبات تحتاج نموذج
    setActiveRequest(type);
  };

  const submitRequest = () => {
    if (!activeRequest) return;

    createRequestMutation.mutate({
      type: activeRequest as any,
      payload: requestPayload,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              بياناتي
            </h1>
            <p className="text-muted-foreground">
              إدارة بياناتك الشخصية وممارسة حقوقك
            </p>
          </div>
        </div>

        {/* Consent Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {consentStatus?.hasConsent ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-600" />
              )}
              حالة الموافقة
            </CardTitle>
          </CardHeader>
          <CardContent>
            {consentStatus?.hasConsent ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  لديك موافقة نشطة على سياسة الخصوصية
                </p>
                <div className="bg-slate-50 p-3 rounded-lg text-sm space-y-1">
                  <p>
                    <strong>الإصدار:</strong> {consentStatus.policyVersion}
                  </p>
                  <p>
                    <strong>تاريخ الموافقة:</strong>{" "}
                    {new Date(consentStatus.consentedAt).toLocaleDateString(
                      "ar-SA"
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-amber-700">
                  تم سحب موافقتك على سياسة الخصوصية
                </p>
                {consentStatus?.withdrawnAt && (
                  <p className="text-sm text-muted-foreground">
                    تاريخ السحب:{" "}
                    {new Date(consentStatus.withdrawnAt).toLocaleDateString(
                      "ar-SA"
                    )}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Rights */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">حقوقك في بياناتك</h2>

          {/* Access */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Download className="h-5 w-5 text-blue-600" />
                الحق في الوصول
              </CardTitle>
              <CardDescription>
                احصل على نسخة كاملة من جميع بياناتك الشخصية بصيغة JSON
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => handleRequest("access")}
                className="w-full md:w-auto"
              >
                <Download className="h-4 w-4 mr-2" />
                تحميل بياناتي
              </Button>
            </CardContent>
          </Card>

          {/* Correct */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Edit className="h-5 w-5 text-green-600" />
                الحق في التصحيح
              </CardTitle>
              <CardDescription>
                اطلب تصحيح أي بيانات غير صحيحة أو غير كاملة
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeRequest === "correct" ? (
                <div className="space-y-3">
                  <Textarea
                    placeholder="اذكر البيانات التي تريد تصحيحها والتصحيح المطلوب..."
                    value={requestPayload}
                    onChange={e => setRequestPayload(e.target.value)}
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={submitRequest}
                      disabled={
                        !requestPayload || createRequestMutation.isPending
                      }
                    >
                      إرسال الطلب
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setActiveRequest(null);
                        setRequestPayload("");
                      }}
                    >
                      إلغاء
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => handleRequest("correct")}
                  variant="outline"
                  className="w-full md:w-auto"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  طلب تصحيح
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Delete */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Trash2 className="h-5 w-5 text-red-600" />
                الحق في الحذف
              </CardTitle>
              <CardDescription>
                اطلب حذف بياناتك الشخصية (قد يؤدي لإغلاق حسابك)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeRequest === "delete" ? (
                <div className="space-y-3">
                  <div className="bg-red-50 border border-red-200 p-3 rounded-lg text-sm text-red-900">
                    <AlertCircle className="h-4 w-4 inline mr-2" />
                    تنبيه: حذف بياناتك سيؤدي لإغلاق حسابك بشكل دائم
                  </div>
                  <Textarea
                    placeholder="اذكر سبب طلب الحذف (اختياري)..."
                    value={requestPayload}
                    onChange={e => setRequestPayload(e.target.value)}
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={submitRequest}
                      variant="destructive"
                      disabled={createRequestMutation.isPending}
                    >
                      تأكيد طلب الحذف
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setActiveRequest(null);
                        setRequestPayload("");
                      }}
                    >
                      إلغاء
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => handleRequest("delete")}
                  variant="destructive"
                  className="w-full md:w-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  طلب حذف البيانات
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Object */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Ban className="h-5 w-5 text-amber-600" />
                الحق في الاعتراض
              </CardTitle>
              <CardDescription>اعترض على معالجة معينة لبياناتك</CardDescription>
            </CardHeader>
            <CardContent>
              {activeRequest === "object" ? (
                <div className="space-y-3">
                  <Textarea
                    placeholder="اذكر المعالجة التي تعترض عليها والسبب..."
                    value={requestPayload}
                    onChange={e => setRequestPayload(e.target.value)}
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={submitRequest}
                      disabled={
                        !requestPayload || createRequestMutation.isPending
                      }
                    >
                      إرسال الاعتراض
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setActiveRequest(null);
                        setRequestPayload("");
                      }}
                    >
                      إلغاء
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => handleRequest("object")}
                  variant="outline"
                  className="w-full md:w-auto"
                >
                  <Ban className="h-4 w-4 mr-2" />
                  تقديم اعتراض
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Withdraw Consent */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5 text-purple-600" />
                سحب الموافقة
              </CardTitle>
              <CardDescription>
                اسحب موافقتك على معالجة بياناتك (قد يؤثر على الخدمات)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => handleRequest("withdraw")}
                variant="outline"
                className="w-full md:w-auto"
                disabled={
                  !consentStatus?.hasConsent ||
                  withdrawConsentMutation.isPending
                }
              >
                <Shield className="h-4 w-4 mr-2" />
                سحب الموافقة
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm text-blue-900">
                <p className="font-semibold">معلومات مهمة:</p>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>سنرد على طلبك خلال 30 يوم عمل</li>
                  <li>قد نطلب منك تأكيد هويتك قبل تنفيذ الطلب</li>
                  <li>بعض الطلبات قد تؤثر على قدرتك على استخدام الخدمة</li>
                  <li>
                    للاستفسارات:{" "}
                    <a
                      href="mailto:dpo@rabit.sa"
                      className="text-blue-700 hover:underline"
                    >
                      dpo@rabit.sa
                    </a>
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
