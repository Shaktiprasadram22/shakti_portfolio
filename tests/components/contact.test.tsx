import React from "react";
import { render, screen } from "@testing-library/react";
import { Contact } from "@/components/Contact";

describe("Contact component", () => {
  it("renders form fields and contact links", () => {
    render(<Contact />);

    expect(screen.getByText(/Let's Build Something Great/i)).toBeInTheDocument();
    expect(document.querySelector('input[name="name"]')).toBeInTheDocument();
    expect(document.querySelector('input[name="email"]')).toBeInTheDocument();
    expect(document.querySelector('textarea[name="message"]')).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /github\.com\/Shaktiprasadram22/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /linkedin\.com\/in\/shaktiram22/i })).toBeInTheDocument();
  });
});

