// @vitest-environment jsdom
import React from "react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import Home from "../pages/Home";

// Some transforms may still expect React to be on the global in tests
// Ensure it's available to avoid "React is not defined" at runtime
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).React = React;

// Mock i18n to avoid initializing translations in tests
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k }),
}));

// Mock TRPC hooks used on the Home page
vi.mock("@/lib/trpc", () => ({
  trpc: {
    consultant: {
      getConsultationTypes: {
        useQuery: () => ({ data: { consultationTypes: [] }, isLoading: false }),
      },
    },
  },
}));

// Mock components that rely on i18n instance or browser-only APIs
vi.mock("@/components/LanguageSwitcher", () => ({
  LanguageSwitcher: () => null,
}));

describe("Home page basics", () => {
  it("renders at least one header logo", () => {
    const { getAllByAltText } = render(<Home />);
    expect(getAllByAltText("Rabit").length).toBeGreaterThan(0);
  });

  it("has a link to /consulting", () => {
    const { container } = render(<Home />);
    const link = container.querySelector('a[href="/consulting"]');
    expect(link).toBeTruthy();
  });
});
