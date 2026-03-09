import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "@/components/Navbar";

const mockUseTheme = jest.fn();

jest.mock("@/components/theme/ThemeProvider", () => ({
  useTheme: () => mockUseTheme(),
}));

describe("Navbar component", () => {
  it("renders navigation links", () => {
    mockUseTheme.mockReturnValue({
      theme: "dark",
      mounted: true,
      toggleTheme: jest.fn(),
    });

    render(<Navbar />);

    expect(screen.getByRole("link", { name: "Experience" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  it("calls toggleTheme when theme button is clicked", async () => {
    const toggleTheme = jest.fn();
    const user = userEvent.setup();

    mockUseTheme.mockReturnValue({
      theme: "dark",
      mounted: true,
      toggleTheme,
    });

    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: "Switch to light mode" }));

    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });

  it("opens and closes mobile menu", async () => {
    const toggleTheme = jest.fn();
    const user = userEvent.setup();

    mockUseTheme.mockReturnValue({
      theme: "dark",
      mounted: true,
      toggleTheme,
    });

    render(<Navbar />);

    await user.click(screen.getByRole("button", { name: "Toggle menu" }));
    expect(screen.getAllByRole("link", { name: "Contact" }).length).toBeGreaterThan(1);

    const mobileContactLink = screen.getAllByRole("link", { name: "Contact" })[1];
    await user.click(mobileContactLink);

    expect(screen.getAllByRole("link", { name: "Contact" })).toHaveLength(1);
  });
});

