import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DeveloperTerminalMode } from "@/components/DeveloperTerminalMode";

describe("DeveloperTerminalMode component", () => {
  it("opens and closes the terminal overlay", async () => {
    const user = userEvent.setup();
    render(<DeveloperTerminalMode />);

    await user.click(screen.getByRole("button", { name: /Open Dev Terminal/i }));
    expect(screen.getByText(/Developer Terminal Mode/i)).toBeInTheDocument();
    expect(screen.getByText(/Developer Terminal initialized/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Close terminal/i }));
    expect(screen.queryByText(/Developer Terminal Mode/i)).not.toBeInTheDocument();
  });
});

