import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface SkeletonLoaderProps {
  type?: "card" | "list" | "table" | "profile" | "blog";
  count?: number;
}

export function SkeletonLoader({
  type = "card",
  count = 1,
}: SkeletonLoaderProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (type === "card") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skeletons.map(i => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="skeleton skeleton-title" />
              <div className="skeleton skeleton-text w-3/4" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="skeleton skeleton-text" />
                <div className="skeleton skeleton-text w-5/6" />
                <div className="skeleton skeleton-text w-4/6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className="space-y-4">
        {skeletons.map(i => (
          <Card key={i} className="animate-pulse">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="skeleton skeleton-avatar" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton skeleton-text w-1/2" />
                  <div className="skeleton skeleton-text w-3/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (type === "table") {
    return (
      <Card className="animate-pulse">
        <CardContent className="pt-6">
          <div className="space-y-3">
            {skeletons.map(i => (
              <div key={i} className="flex items-center gap-4">
                <div className="skeleton skeleton-avatar" />
                <div className="flex-1 grid grid-cols-4 gap-4">
                  <div className="skeleton skeleton-text" />
                  <div className="skeleton skeleton-text" />
                  <div className="skeleton skeleton-text" />
                  <div className="skeleton skeleton-text" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (type === "profile") {
    return (
      <Card className="animate-pulse">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4">
            <div className="skeleton rounded-full w-24 h-24" />
            <div className="w-full space-y-2">
              <div className="skeleton skeleton-title mx-auto w-1/2" />
              <div className="skeleton skeleton-text mx-auto w-1/3" />
            </div>
            <div className="w-full space-y-2 mt-4">
              <div className="skeleton skeleton-text" />
              <div className="skeleton skeleton-text w-5/6" />
              <div className="skeleton skeleton-text w-4/6" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (type === "blog") {
    return (
      <div className="space-y-6">
        {skeletons.map(i => (
          <Card key={i} className="animate-pulse">
            <div className="skeleton h-48 rounded-t-lg" />
            <CardHeader>
              <div className="skeleton skeleton-title" />
              <div className="skeleton skeleton-text w-3/4" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="skeleton skeleton-text" />
                <div className="skeleton skeleton-text w-5/6" />
                <div className="skeleton skeleton-text w-4/6" />
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="skeleton skeleton-avatar" />
                <div className="flex-1 space-y-1">
                  <div className="skeleton skeleton-text w-1/3" />
                  <div className="skeleton skeleton-text w-1/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return null;
}

// Individual skeleton components for custom layouts
export function SkeletonText({ className = "" }: { className?: string }) {
  return <div className={`skeleton skeleton-text ${className}`} />;
}

export function SkeletonTitle({ className = "" }: { className?: string }) {
  return <div className={`skeleton skeleton-title ${className}`} />;
}

export function SkeletonAvatar({ className = "" }: { className?: string }) {
  return <div className={`skeleton skeleton-avatar ${className}`} />;
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return <div className={`skeleton skeleton-card ${className}`} />;
}
