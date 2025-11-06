import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
  variant?: "default" | "pulse" | "dots";
}

export function LoadingSpinner({
  size = "md",
  text,
  fullScreen = false,
  variant = "default",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const renderSpinner = () => {
    if (variant === "dots") {
      return (
        <div className="flex gap-1.5" dir="ltr">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={`${size === "sm" ? "w-1.5 h-1.5" : size === "lg" ? "w-3 h-3" : "w-2 h-2"} rounded-full bg-primary`}
              style={{
                animation: "bounce 1.4s ease-in-out infinite",
                animationDelay: `${i * 0.16}s`,
              }}
            />
          ))}
        </div>
      );
    }

    if (variant === "pulse") {
      return (
        <div className="relative">
          <Loader2
            className={`${sizeClasses[size]} animate-spin text-primary`}
          />
          <div
            className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-primary/20 animate-ping`}
          />
        </div>
      );
    }

    return (
      <Loader2
        className={`${sizeClasses[size]} animate-spin text-primary transition-all duration-300`}
        style={{
          animationDuration:
            size === "sm" ? "0.6s" : size === "lg" ? "1s" : "0.75s",
        }}
      />
    );
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-3 animate-in fade-in duration-300">
      {renderSpinner()}
      {text && (
        <p
          className={`${textSizeClasses[size]} text-muted-foreground text-center max-w-xs px-4 animate-in slide-in-from-bottom-2 duration-500`}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-background/90 backdrop-blur-md z-50 animate-in fade-in duration-200"
        role="status"
        aria-live="polite"
        aria-label={text || "جاري التحميل"}
      >
        {content}
      </div>
    );
  }

  return (
    <div role="status" aria-live="polite" aria-label={text || "جاري التحميل"}>
      {content}
    </div>
  );
}
