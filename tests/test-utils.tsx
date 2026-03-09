import React, { PropsWithChildren } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

function AppProviders({ children }: PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

export function renderWithProviders(ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, { wrapper: AppProviders, ...options });
}

export function createJsonResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    async json() {
      return body;
    },
    async text() {
      return JSON.stringify(body);
    },
  } as Response;
}

export async function flushPromises() {
  await Promise.resolve();
}
