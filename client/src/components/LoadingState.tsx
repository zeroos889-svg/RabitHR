import { LoadingSpinner } from "./LoadingSpinner";

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  variant?: "default" | "pulse" | "dots";
  title?: string;
}

export function LoadingState({
  message = "جاري التحميل...",
  size = "md",
  fullScreen = false,
  variant = "pulse",
  title,
}: LoadingStateProps) {
  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-background/90 backdrop-blur-md z-50"
    : "flex items-center justify-center p-8 min-h-[200px]";

  return (
    <div
      className={`${containerClasses} animate-in fade-in duration-300`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="flex flex-col items-center gap-4 max-w-md">
        {title && (
          <h3 className="text-lg font-semibold text-foreground animate-in slide-in-from-top-2 duration-500">
            {title}
          </h3>
        )}
        <LoadingSpinner
          size={size}
          text={message}
          variant={variant}
          fullScreen={false}
        />
      </div>
    </div>
  );
}
