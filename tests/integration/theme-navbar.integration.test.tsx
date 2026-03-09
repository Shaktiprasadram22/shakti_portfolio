import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

describe("Integration: ThemeProvider + Navbar", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.dataset.theme = "dark";
  });

  it("toggles theme through navbar button and persists preference", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );

    const toggleButton = await screen.findByRole("button", { name: /Switch to light mode|Switch to dark mode/i });
    const initialTheme = document.documentElement.dataset.theme;

    await user.click(toggleButton);

    await waitFor(() => {
      expect(document.documentElement.dataset.theme).not.toBe(initialTheme);
    });
    expect(localStorage.getItem("portfolio-theme")).toBe(document.documentElement.dataset.theme);
  });
});

