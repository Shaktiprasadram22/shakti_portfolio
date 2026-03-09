import React from "react";
import { render, screen } from "@testing-library/react";
import { Experience } from "@/components/Experience";

describe("Experience component", () => {
  it("renders timeline section and entries", () => {
    render(<Experience />);

    expect(screen.getByText("Timeline")).toBeInTheDocument();
    expect(screen.getByText("Accenture")).toBeInTheDocument();
    expect(screen.getByText("Vibeinn Technology")).toBeInTheDocument();
    expect(screen.getByText(/Jan 2026 - Present/i)).toBeInTheDocument();
    expect(screen.getByText(/May 2025 - Aug 2025/i)).toBeInTheDocument();
  });
});

