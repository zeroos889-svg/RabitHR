// Conditional setup based on test environment
// Only load React testing library for client tests
if (typeof window !== "undefined") {
  // Client-side tests
  import("@testing-library/jest-dom");
  const { cleanup } = await import("@testing-library/react");
  const { afterEach } = await import("vitest");

  // تنظيف بعد كل اختبار
  afterEach(() => {
    cleanup();
  });
}
