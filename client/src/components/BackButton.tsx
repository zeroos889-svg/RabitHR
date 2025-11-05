import { Button } from "@/components/ui/button";
import { ArrowRight, Home } from "lucide-react";
import { useLocation } from "wouter";

interface BackButtonProps {
  to?: string;
  label?: string;
  showHomeButton?: boolean;
}

export function BackButton({
  to,
  label = "الرجوع",
  showHomeButton = true,
}: BackButtonProps) {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    if (to) {
      setLocation(to);
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      setLocation("/");
    }
  };

  const handleHome = () => {
    setLocation("/");
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
        <ArrowRight className="h-4 w-4 rotate-180" />
        {label}
      </Button>

      {showHomeButton && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleHome}
          className="gap-2"
        >
          <Home className="h-4 w-4" />
          الصفحة الرئيسية
        </Button>
      )}
    </div>
  );
}
