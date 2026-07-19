import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NoNewsToday from "@/components/home/NoNewsToday";

describe("NoNewsToday", () => {
  it("renders 'hoje' message when date is today", () => {
    render(
      <NoNewsToday
        date={new Date()}
        latestDate={new Date("2026-07-13")}
        latestSlug="2026/07/13"
      />
    );

    expect(screen.getByText(/hoje/i)).toBeDefined();
  });

  it("renders 'neste dia' message when date is in the past", () => {
    render(
      <NoNewsToday
        date={new Date("2026-07-14")}
        latestDate={new Date("2026-07-13")}
        latestSlug="2026/07/13"
      />
    );

    expect(
      screen.getByText(/não houve notícias do novo ciclo neste dia/i)
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
