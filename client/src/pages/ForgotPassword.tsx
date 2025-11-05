import { useState } from "react";
import { BackButton } from "@/components/BackButton";
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
import { Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("الرجاء إدخال بريد إلكتروني صحيح");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call - TODO: Implement actual password reset
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      toast.success("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 flex items-center justify-center p-4">
      <BackButton />
      
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">استرجاع كلمة المرور</CardTitle>
          <CardDescription>
            {emailSent 
              ? "تم إرسال رابط إعادة التعيين"
              : "أدخل بريدك الإلكتروني لإرسال رابط إعادة تعيين كلمة المرور"
            }
          </CardDescription>
        </CardHeader>

        <CardContent>
          {emailSent ? (
            <div className="text-center space-y-6">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  تم إرسال رابط إعادة تعيين كلمة المرور إلى
                </p>
                <p className="font-semibold text-primary">{email}</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2">
                <p className="font-medium">ملاحظات مهمة:</p>
                <ul className="text-muted-foreground space-y-1 text-right">
                  <li>• تحقق من صندوق البريد الوارد</li>
                  <li>• قد تجد الرسالة في البريد المزعج</li>
                  <li>• الرابط صالح لمدة 24 ساعة</li>
                  <li>• يمكنك طلب رابط جديد إذا انتهت صلاحيته</li>
                </ul>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => setEmailSent(false)}
                  variant="outline"
                  className="w-full"
                >
                  إرسال مرة أخرى
                </Button>
                
                <Link href="/login">
                  <Button variant="default" className="w-full group">
                    العودة لتسجيل الدخول
                    <ArrowRight className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    className="pr-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
                <p>
                  سنرسل لك رسالة تحتوي على رابط لإعادة تعيين كلمة المرور.
                  الرجاء التأكد من البريد الإلكتروني المدخل.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading || !email}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    إرسال رابط الاسترجاع
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="text-center space-y-2">
                <Link href="/login">
                  <Button variant="ghost" className="text-sm">
                    تذكرت كلمة المرور؟ تسجيل الدخول
                  </Button>
                </Link>
                
                <div className="text-sm text-muted-foreground">
                  ليس لديك حساب؟{" "}
                  <Link href="/signup" className="text-primary hover:underline">
                    سجل الآن
                  </Link>
                </div>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Trust Indicators */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border">
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-green-600" />
          <span>آمن 100%</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-green-600" />
          <span>مشفر</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-green-600" />
          <span>محمي</span>
        </div>
      </div>
    </div>
  );
}
