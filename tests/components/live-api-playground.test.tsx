import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LiveApiPlayground } from "@/components/LiveApiPlayground";
import { createJsonResponse } from "@/tests/test-utils";
import { mockAuthSuccess, mockStocksPayload } from "@/tests/mock-data";

describe("LiveApiPlayground component", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("runs default GET request and shows response", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(createJsonResponse(mockStocksPayload, 200));
    const user = userEvent.setup();

    render(<LiveApiPlayground />);
    await user.click(screen.getByRole("button", { name: "Send Request" }));

    await waitFor(() => expect(screen.getByText(/Status: 200/i)).toBeInTheDocument());
    expect(screen.getByText(/AAPL/i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith("/api/stocks", expect.any(Object));
  });

  it("shows validation error for invalid JSON request body", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(createJsonResponse(mockAuthSuccess, 200));
    const user = userEvent.setup();

    render(<LiveApiPlayground />);

    await user.click(screen.getByRole("button", { name: /Auth Login/i }));
    const editor = document.querySelector("textarea.request-editor") as HTMLTextAreaElement;
    expect(editor).toBeInTheDocument();
    fireEvent.change(editor, { target: { value: "{invalid-json}" } });
    await waitFor(() => expect(editor).toHaveValue("{invalid-json}"));
    await user.click(screen.getByRole("button", { name: "Send Request" }));

    await waitFor(() => expect(screen.getByText(/Invalid JSON in request body/i)).toBeInTheDocument());
    expect(screen.getByText(/Status: 400/i)).toBeInTheDocument();
  });

  it("shows validation error for empty POST body", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(createJsonResponse(mockAuthSuccess, 200));
    const user = userEvent.setup();

    render(<LiveApiPlayground />);
    await user.click(screen.getByRole("button", { name: /Auth Login/i }));

    const editor = document.querySelector("textarea.request-editor") as HTMLTextAreaElement;
    expect(editor).toBeInTheDocument();
    await user.clear(editor);
    await user.click(screen.getByRole("button", { name: "Send Request" }));

    await waitFor(() => expect(screen.getByText(/Request body is empty/i)).toBeInTheDocument());
    expect(screen.getByText(/Status: 400/i)).toBeInTheDocument();
  });

  it("shows fallback server error message on fetch failure", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("network"));
    const user = userEvent.setup();

    render(<LiveApiPlayground />);
    await user.click(screen.getByRole("button", { name: "Send Request" }));

    await waitFor(() => expect(screen.getByText(/Request failed. Please retry/i)).toBeInTheDocument());
    expect(screen.getByText(/Status: 500/i)).toBeInTheDocument();
  });
});
