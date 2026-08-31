import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Serve } from "@/pages/Serve";
import { Give } from "@/pages/Give";
import { NewsEvents } from "@/pages/NewsEvents";
import { FAQ } from "@/pages/FAQ";
import { site } from "@/data/site";

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("CTA band headings carry correct explicit color", () => {
  it("Home dark band h2 on maroon-950 is cream (light heading)", () => {
    renderWithRouter(<Home />);
    const h2 = screen.getByRole("heading", {
      level: 2,
      name: /Unite your struggles to Him/i,
    });
    expect(h2.className).toContain("text-shrine-cream");
  });

  it("Serve heading on cream is maroon (not invisible)", () => {
    renderWithRouter(<Serve />);
    const h2 = screen.getByRole("heading", {
      level: 2,
      name: /Where the household needs hands/i,
    });
    expect(h2.className).toContain("text-shrine-maroon-700");
  });

  it("Give heading on cream is maroon (not invisible)", () => {
    renderWithRouter(<Give />);
    // Round-12 (audit F-4): the section title is human-language now; the UEN
    // moved into a copyable detail row inside the PayNow card. The heading's
    // explicit-color contract is unchanged.
    const giveH2 = screen.getByRole("heading", {
      level: 2,
      name: /Ways to give/i,
    });
    expect(giveH2.className).toContain("text-shrine-maroon-700");
  });

  it("Give closing band h2 on maroon-950 is cream (light heading)", () => {
    renderWithRouter(<Give />);
    const h2 = screen.getByRole("heading", {
      level: 2,
      name: /The 1971 church still needs its people/i,
    });
    expect(h2.className).toContain("text-shrine-cream");
    // The band surfaces canonical site.ts facts
    expect(screen.getByText(new RegExp(site.contact.officePhone.replace("+", "\\+")))).toBeInTheDocument();
  });

  it("News & Events closing band h2 on maroon-950 is cream (round 7)", () => {
    renderWithRouter(<NewsEvents />);
    const h2 = screen.getByRole("heading", {
      level: 2,
      name: /The bulletin keeps the household in one conversation/i,
    });
    expect(h2.className).toContain("text-shrine-cream");
    // The band carries the canonical bulletin link.
    const bulletin = screen.getByRole("link", { name: /Read this week's bulletin/i });
    expect(bulletin.getAttribute("href")).toBe(site.bulletin);
  });

  it("FAQ closing band loops back to the office (round 7)", () => {
    renderWithRouter(<FAQ />);
    const h2 = screen.getByRole("heading", {
      level: 2,
      name: /Still have questions/i,
    });
    expect(h2.className).toContain("text-shrine-maroon-700");
    expect(
      screen.getByRole("link", { name: new RegExp(site.contact.officePhone.replace("+", "\\+")) }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: new RegExp(site.contact.email.replace(".", "\\.")) }),
    ).toBeInTheDocument();
  });
});
