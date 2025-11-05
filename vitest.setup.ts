import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// تنظيف بعد كل اختبار
afterEach(() => {
  cleanup();
});
