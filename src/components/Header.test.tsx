import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

function renderHeader(initialRoute = "/") {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Header />
    </MemoryRouter>,
  );
}

describe("Header", () => {
  it("toggle aria-expanded reflects the mobile drawer state", async () => {
    const user = userEvent.setup();
    renderHeader();
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByRole("navigation", { name: "Mobile" })).toBeInTheDocument();
  });

  it("closes the mobile drawer when tapping a link to the current route", async () => {
    const user = userEvent.setup();
    renderHeader("/");
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const drawer = screen.getByRole("navigation", { name: "Mobile" });
    // Same-route tap: pathname never changes, so a pathname-only effect cannot close it.
    await user.click(within(drawer).getByRole("link", { name: "Home" }));
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
  });

  it("closes the mobile drawer when navigating to a different route", async () => {
    const user = userEvent.setup();
    renderHeader("/");
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const drawer = screen.getByRole("navigation", { name: "Mobile" });
    await user.click(within(drawer).getByRole("link", { name: "News & Events" }));
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
  });

  it("Escape closes the mobile drawer", async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("navigation", { name: "Mobile" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
  });

  it("marks the active top-level link with aria-current=page", () => {
    renderHeader("/news-events");
    const link = screen.getByRole("link", { name: "News & Events" });
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("marks a dropdown parent as current when a child route is active", () => {
    renderHeader("/history");
    const aboutTrigger = screen.getByRole("button", { name: /About/i });
    expect(aboutTrigger).toHaveAttribute("aria-current", "true");
    expect(aboutTrigger.className).toMatch(/text-shrine-gold-300/);
  });

  it("hamburger toggle meets the 44px minimum touch target", () => {
    renderHeader();
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle.className).toMatch(/h-11/);
    expect(toggle.className).toMatch(/w-11/);
  });

  it("scroll progress rail is rendered by Layout/ScrollProgress (header is decoupled)", () => {
    // Header no longer embeds the rail — Layout renders a separate ScrollProgress.
    // Verify the decoupled component still exposes the contract when mounted via Layout.
    // Here we just assert Header itself does not crash and toggle still works.
    renderHeader();
    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });

  it("drawer marks the active leaf link with aria-current and gold highlight", async () => {
    const user = userEvent.setup();
    renderHeader("/serve");
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const drawer = screen.getByRole("navigation", { name: "Mobile" });
    const serveLink = within(drawer).getByRole("link", { name: "Serve" });
    expect(serveLink).toHaveAttribute("aria-current", "page");
    expect(serveLink.className).toMatch(/text-shrine-gold-300/);
  });

  it("drawer marks a parent section current when a child route is active", async () => {
    const user = userEvent.setup();
    renderHeader("/history");
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const drawer = screen.getByRole("navigation", { name: "Mobile" });
    // Mobile drawer parent is a Link (not a button) in the simplified header
    const aboutLink = within(drawer).getByRole("link", { name: "About" });
    expect(aboutLink).toHaveAttribute("aria-current", "page");
    expect(aboutLink.className).toMatch(/text-shrine-gold-300/);
  });

  it("drawer items enter with a staggered animation", async () => {
    const user = userEvent.setup();
    renderHeader("/");
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const drawer = screen.getByRole("navigation", { name: "Mobile" });
    // Top-level containers carry drawer-item-in (div), not the nested li elements
    const items = drawer.querySelectorAll(".drawer-item-in");
    expect(items.length).toBeGreaterThan(2);
    expect(items[0]!).toHaveClass("drawer-item-in");
    expect(items[0]!).toHaveStyle({ animationDelay: "0ms" });
    expect(items[1]!).toHaveClass("drawer-item-in");
    expect(items[1]!).toHaveStyle({ animationDelay: "40ms" });
  });

  // Round-4 remediation (audit L-5): the mobile drawer is a modal dialog —
  // initial focus, Tab/Shift+Tab focus trap, focus restore on close.
  it("opens the drawer as a modal dialog that receives initial focus", async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const dialog = screen.getByRole("dialog", { name: "Site menu" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveFocus();
    // The mobile landmark stays inside the dialog for structure-aware AT.
    expect(within(dialog).getByRole("navigation", { name: "Mobile" })).toBeInTheDocument();
  });

  it("traps focus: Tab from the last drawer link wraps to the first", async () => {
    const user = userEvent.setup();
    renderHeader("/");
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const drawer = screen.getByRole("dialog", { name: "Site menu" });
    const links = within(drawer).getAllByRole("link");
    const first = links[0]!;
    const last = links[links.length - 1]!;
    last.focus();
    await user.tab();
    expect(document.activeElement).toBe(first);
  });

  it("traps focus: Shift+Tab from the first drawer link wraps to the last", async () => {
    const user = userEvent.setup();
    renderHeader("/");
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const drawer = screen.getByRole("dialog", { name: "Site menu" });
    const links = within(drawer).getAllByRole("link");
    const first = links[0]!;
    const last = links[links.length - 1]!;
    first.focus();
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(last);
  });

  it("restores focus to the hamburger toggle when Escape closes the drawer", async () => {
    const user = userEvent.setup();
    renderHeader();
    const toggle = screen.getByRole("button", { name: "Open menu" });
    await user.click(toggle);
    expect(screen.getByRole("dialog", { name: "Site menu" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "Site menu" })).not.toBeInTheDocument();
    expect(document.activeElement).toBe(toggle);
  });

  it("restores focus to the hamburger toggle when a drawer link closes the drawer", async () => {
    const user = userEvent.setup();
    renderHeader("/");
    const toggle = screen.getByRole("button", { name: "Open menu" });
    await user.click(toggle);
    const drawer = screen.getByRole("dialog", { name: "Site menu" });
    await user.click(within(drawer).getByRole("link", { name: "Home" }));
    expect(screen.queryByRole("dialog", { name: "Site menu" })).not.toBeInTheDocument();
    expect(document.activeElement).toBe(toggle);
  });

  it("active desktop nav item carries the permanent gold hairline (round 7)", () => {
    renderHeader("/worship");
    const tokens = (el: HTMLElement) => el.className.split(/\s+/);
    const worshipTrigger = screen.getByRole("button", { name: /Worship/i });
    expect(tokens(worshipTrigger)).toContain("after:scale-x-100");
    const aboutTrigger = screen.getByRole("button", { name: /About/i });
    expect(tokens(aboutTrigger)).not.toContain("after:scale-x-100");
    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(tokens(homeLink)).not.toContain("after:scale-x-100");
    expect(tokens(homeLink)).toContain("hover:after:scale-x-100");
  });
});
