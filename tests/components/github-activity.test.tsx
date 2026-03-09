import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { GitHubActivity } from "@/components/GitHubActivity";
import { createJsonResponse } from "@/tests/test-utils";
import { mockGitHubPayload } from "@/tests/mock-data";

describe("GitHubActivity component", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("renders stats and source on successful fetch", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(createJsonResponse(mockGitHubPayload, 200));

    render(<GitHubActivity />);

    await waitFor(() => expect(screen.getByText(/Development Consistency Snapshot/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Source:/i)).toBeInTheDocument());

    expect(screen.getByText(/GitHub public APIs/i)).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders error state when fetch fails", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("request failed"));

    render(<GitHubActivity />);

    await waitFor(() => expect(screen.getByText(/GitHub data load nahi ho saka/i)).toBeInTheDocument());
  });
});

