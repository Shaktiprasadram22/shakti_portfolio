import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LiveApiPlayground } from "@/components/LiveApiPlayground";
import { createJsonResponse } from "@/tests/test-utils";
import { mockStocksPayload } from "@/tests/mock-data";

describe("Integration: LiveApiPlayground auth flow", () => {
  it("surfaces 401 status and message for invalid credentials", async () => {
    global.fetch = jest.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === "string" ? input : input.toString();

      if (url === "/api/stocks") {
        return createJsonResponse(mockStocksPayload, 200);
      }

      if (url === "/api/auth") {
        const payload = JSON.parse((init?.body as string) || "{}");
        if (payload.password !== "portfolio123") {
          return createJsonResponse({ status: "error", message: "Invalid credentials." }, 401);
        }
        return createJsonResponse({ status: "ok", token: "demo" }, 200);
      }

      return createJsonResponse({ status: "ok" }, 200);
    }) as jest.Mock;

    const user = userEvent.setup();
    render(<LiveApiPlayground />);

    await user.click(screen.getByRole("button", { name: /Auth Login/i }));
    const editor = document.querySelector("textarea.request-editor") as HTMLTextAreaElement;
    expect(editor).toBeInTheDocument();

    fireEvent.change(editor, {
      target: { value: '{"email":"demo@portfolio.dev","password":"wrong"}' },
    });
    await waitFor(() =>
      expect(editor).toHaveValue('{"email":"demo@portfolio.dev","password":"wrong"}')
    );
    await user.click(screen.getByRole("button", { name: "Send Request" }));

    await waitFor(() => expect(screen.getByText(/Status: 401/i)).toBeInTheDocument());
    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });
});
