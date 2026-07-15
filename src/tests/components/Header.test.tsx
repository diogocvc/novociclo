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
    const links = screen.getAllByRole("link");
    const homeLink = links.find((l) => l.getAttribute("href") === "/");
    expect(homeLink).toBeDefined();
  });

  it("renders menu button", () => {
    render(<Header />);
    expect(screen.getByLabelText("Menu")).toBeDefined();
  });
});
