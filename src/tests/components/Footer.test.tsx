import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders the brand name", () => {
    render(<Footer />);
    expect(screen.getByText("NOVO CICLO")).toBeDefined();
  });

  it("renders the tagline", () => {
    render(<Footer />);
    expect(screen.getByText(/Rumo à Copa do Mundo 2030/)).toBeDefined();
  });

  it("renders social links", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(2);
  });
});
