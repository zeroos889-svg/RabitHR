import { useState, useEffect, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ImageOptimizedProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  aspectRatio?: string;
  loading?: "lazy" | "eager";
}

/**
 * Optimized Image Component
 * 
 * Features:
 * - Lazy loading by default
 * - Blur placeholder
 * - WebP format support (fallback to original)
 * - Responsive images
 * - Error handling
 * - Loading state
 * 
 * @example
 * <ImageOptimized 
 *   src="/images/profile.jpg"
 *   alt="Profile"
 *   className="w-full rounded-lg"
 *   placeholder="blur"
 * />
 */
export function ImageOptimized({
  src,
  alt,
  placeholder = "blur",
  aspectRatio,
  loading = "lazy",
  className,
  ...props
}: ImageOptimizedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true);
    setHasError(false);
    setImageSrc(src);
  }, [src]);

  // Try WebP first if available
  const getWebPSrc = (originalSrc: string) => {
    if (originalSrc.match(/\.(jpg|jpeg|png)$/i)) {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    }
    return originalSrc;
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    // Fallback to original format if WebP fails
    if (imageSrc.endsWith(".webp")) {
      setImageSrc(src);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  if (hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted rounded",
          className
        )}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <div className="text-center text-muted-foreground p-4">
          <svg
            className="w-12 h-12 mx-auto mb-2 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm">فشل تحميل الصورة</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={aspectRatio ? { aspectRatio } : undefined}>
      {/* Blur Placeholder */}
      {isLoading && placeholder === "blur" && (
        <div
          className={cn(
            "absolute inset-0 bg-muted animate-pulse rounded",
            className
          )}
        />
      )}

      {/* Actual Image */}
      <img
        src={getWebPSrc(imageSrc)}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        {...props}
      />
    </div>
  );
}
