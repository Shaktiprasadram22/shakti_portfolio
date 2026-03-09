import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from "@/components/theme/ThemeProvider";

function ThemeProbe() {
  const { theme, mounted, toggleTheme, setTheme } = useTheme();

  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <div data-testid="mounted">{String(mounted)}</div>
      <button type="button" onClick={toggleTheme}>
        toggle
      </button>
      <button type="button" onClick={() => setTheme("light")}>
        light
      </button>
    </div>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.dataset.theme = "dark";
  });

  it("loads theme from localStorage and applies it", async () => {
    localStorage.setItem("portfolio-theme", "light");

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    await waitFor(() => expect(screen.getByTestId("mounted")).toHaveTextContent("true"));
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(document.documentElement.classList.contains("theme-light")).toBe(true);
  });

  it("toggles theme and persists new value", async () => {
    localStorage.setItem("portfolio-theme", "light");
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    await waitFor(() => expect(screen.getByTestId("mounted")).toHaveTextContent("true"));
    await user.click(screen.getByRole("button", { name: "toggle" }));

    await waitFor(() => expect(screen.getByTestId("theme")).toHaveTextContent("dark"));
    expect(localStorage.getItem("portfolio-theme")).toBe("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("throws when useTheme is used outside ThemeProvider", () => {
    const ConsoleError = jest.spyOn(console, "error").mockImplementation(() => {});

    function InvalidConsumer() {
      useTheme();
      return null;
    }

    expect(() => render(<InvalidConsumer />)).toThrow("useTheme must be used inside ThemeProvider");

    ConsoleError.mockRestore();
  });
});

