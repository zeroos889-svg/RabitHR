import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";

/**
 * Tap Payment Callback Handler
 * This page is loaded when Tap redirects back after payment
 */
export default function TapCallback() {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<"processing" | "success" | "failed">(
    "processing"
  );

  useEffect(() => {
    const handleCallback = async () => {
      // Get query parameters
      const params = new URLSearchParams(window.location.search);
      const tapId = params.get("tap_id");
      const chargeStatus = params.get("status");

      if (!tapId) {
        console.error("No Tap ID in callback");
        setStatus("failed");
        setTimeout(() => setLocation("/payment-failed"), 2000);
        return;
      }

      // Check status from URL parameter
      // Tap uses "CAPTURED" for successful payments
      if (chargeStatus === "CAPTURED" || chargeStatus === "captured") {
        setStatus("success");
        // Redirect to success page with payment reference
        setTimeout(
          () => setLocation(`/payment-success?ref=${tapId}&gateway=tap`),
          1500
        );
      } else {
        setStatus("failed");
        // Redirect to failure page
        setTimeout(
          () => setLocation(`/payment-failed?ref=${tapId}&gateway=tap`),
          1500
        );
      }
    };

    handleCallback();
  }, [setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
      <div className="text-center space-y-4">
        <Loader2 className="w-16 h-16 animate-spin mx-auto text-primary" />
        <h2 className="text-2xl font-bold">
          {status === "processing" && "جاري معالجة الدفع..."}
          {status === "success" && "تم الدفع بنجاح!"}
          {status === "failed" && "فشل الدفع"}
        </h2>
        <p className="text-muted-foreground">
          {status === "processing" && "الرجاء الانتظار بينما نتحقق من الدفع"}
          {status === "success" && "جاري تحويلك..."}
          {status === "failed" && "جاري تحويلك..."}
        </p>
      </div>
    </div>
  );
}
