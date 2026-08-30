import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "@/pages/Home";
import { NewsEvents } from "@/pages/NewsEvents";

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("event category chips", () => {
  it("Home featured events render a rounded-full chip with the category", () => {
    renderWithRouter(<Home />);
    const chips = screen.getAllByText(/^(Parish|Devotion|Formation|Archdiocese)$/);
    expect(chips.length).toBeGreaterThanOrEqual(4);
    chips.forEach((chip) => {
      expect(chip.className).toContain("rounded-full");
      expect(chip.className).toContain("border");
    });
  });

  it("NewsEvents events render a rounded-full chip with the category", () => {
    renderWithRouter(<NewsEvents />);
    const chips = screen.getAllByText(/^(Parish|Devotion|Formation|Archdiocese)$/);
    expect(chips.length).toBe(6);
    chips.forEach((chip) => {
      expect(chip.className).toContain("rounded-full");
    });
  });

  it("the date renders outside the chip in display serif", () => {
    renderWithRouter(<NewsEvents />);
    const chip = screen.getAllByText(/^(Parish|Devotion|Formation|Archdiocese)$/)[0]!;
    const wrapper = chip.closest("div");
    expect(wrapper).not.toBeNull();
    const time = wrapper!.querySelector("time");
    expect(time).not.toBeNull();
    expect(time!.className).toContain("font-display");
  });
});
