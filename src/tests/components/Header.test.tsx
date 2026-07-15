import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@/components/layout/Header";

describe("Header", () => {
  it("renders the site name", () => {
    render(<Header />);
    expect(screen.getByText((content) => content.includes("NOVO"))).toBeDefined();
    expect(screen.getByText((content) => content.includes("CICLO"))).toBeDefined();
  });

  it("links to home", () => {
    render(<Header />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/");
  });

  it("renders menu button", () => {
    render(<Header />);
    expect(screen.getByLabelText("Menu")).toBeDefined();
  });
});
