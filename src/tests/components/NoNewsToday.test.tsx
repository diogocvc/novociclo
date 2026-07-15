import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NoNewsToday from "@/components/home/NoNewsToday";

describe("NoNewsToday", () => {
  it("renders the message", () => {
    render(
      <NoNewsToday
        latestDate={new Date("2026-07-13")}
        latestSlug="2026/07/13"
      />
    );

    expect(
      screen.getByText(/não há nenhuma novidade do novo ciclo hoje/i)
    ).toBeDefined();
  });

  it("renders a link to the latest chapter", () => {
    render(
      <NoNewsToday
        latestDate={new Date("2026-07-13")}
        latestSlug="2026/07/13"
      />
    );

    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/2026/07/13");
  });

  it("displays the date on the button", () => {
    render(
      <NoNewsToday
        latestDate={new Date("2026-07-13")}
        latestSlug="2026/07/13"
      />
    );

    expect(screen.getByText("13/07/2026")).toBeDefined();
  });
});
