import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Emblem } from "@/components/Emblem";
import { Container } from "@/components/ui/Container";
import { primaryNav } from "@/data/nav";
import { site } from "@/data/site";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/utils/cn";

export function Header() {
  const scrolled = useScrolled(16);
  const { pathname, hash } = useLocation();
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerWasOpenRef = useRef(false);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDesktopMenu(null);
  }, [pathname, hash]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDesktopMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Modal drawer focus management (round-4, audit L-5): focus the panel on
  // open, restore focus to the toggle on close, and close on outside taps so
  // pointer focus cannot slip behind the aria-modal surface.
  useEffect(() => {
    if (!mobileOpen) {
      if (drawerWasOpenRef.current) {
        drawerWasOpenRef.current = false;
        toggleRef.current?.focus();
      }
      return;
    }
    drawerWasOpenRef.current = true;
    drawerRef.current?.focus();
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (drawerRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;
      setMobileOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [mobileOpen]);

  const handleDrawerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const drawer = drawerRef.current;
    if (!drawer) return;
    const focusables = Array.from(
      drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
    if (focusables.length === 0) return;
    const first = focusables[0]!;
    const last = focusables[focusables.length - 1]!;
    const active = document.activeElement;
    if (event.shiftKey) {
      if (active === first || active === drawer) {
        event.preventDefault();
        last.focus();
      }
    } else if (active === last || active === drawer) {
      event.preventDefault();
      first.focus();
    }
  };

  const isHome = pathname === "/";
  const solid = scrolled || !isHome || mobileOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        solid
          ? "bg-shrine-maroon-950/92 shadow-shrine backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="hidden border-b border-shrine-cream/10 lg:block">
        <Container className="flex items-center justify-between py-2 text-xs tracking-wide text-shrine-cream/70">
          <p>
            {site.address.street} · {site.feast.name} · {site.feast.date}
          </p>
          <Link to="/give" className="link-underline text-shrine-gold-300">
            Give
          </Link>
        </Container>
      </div>

      <Container className="flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3 text-shrine-cream">
          <Emblem className="text-shrine-gold-300" />
          <span className="font-display text-lg font-semibold leading-tight sm:text-xl">
            St Mary of the Angels
            <span className="mt-0.5 block text-xs font-normal tracking-wide text-shrine-gold-300">
              Bukit Batok · {site.chineseName}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => {
            const parentActive =
              item.children?.some((child) => child.to.split("#")[0] === pathname) ??
              pathname === item.to;
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDesktopMenu(item.label)}
                onMouseLeave={() => item.children && setOpenDesktopMenu(null)}
                onFocusCapture={() => item.children && setOpenDesktopMenu(item.label)}
                onBlurCapture={(event) => {
                  if (!item.children) return;
                  const next = event.relatedTarget as HTMLElement | null;
                  if (next && event.currentTarget.contains(next)) return;
                  setOpenDesktopMenu(null);
                }}
              >
                {item.children ? (
                  <button
                    type="button"
                    aria-expanded={openDesktopMenu === item.label}
                    aria-current={parentActive ? "true" : undefined}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 text-sm font-semibold uppercase tracking-wide text-shrine-cream/85 transition-colors hover:text-shrine-gold-300",
                      parentActive && "text-shrine-gold-300",
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                ) : (
                  <Link
                    to={item.to}
                    aria-current={pathname === item.to ? "page" : undefined}
                    className={cn(
                      "block px-3 py-2 text-sm font-semibold uppercase tracking-wide text-shrine-cream/85 transition-colors hover:text-shrine-gold-300",
                      pathname === item.to && "text-shrine-gold-300",
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {item.children && openDesktopMenu === item.label ? (
                  <div className="menu-in absolute left-0 top-full z-50 w-72 pt-2">
                    <div
                      className="rounded-sm border border-shrine-gold-400/30 bg-shrine-maroon-950 py-2 shadow-shrine-lg"
                      onClickCapture={(event) => {
                        if ((event.target as HTMLElement).closest("a")) {
                          setOpenDesktopMenu(null);
                        }
                      }}
                    >
                      {item.children.map((child) => {
                        const current = `${pathname}${hash}` === child.to || pathname === child.to;
                        return (
                          <Link
                            key={child.to}
                            to={child.to}
                            aria-current={current ? "page" : undefined}
                            className={cn(
                              "block px-4 py-2.5 transition-colors hover:bg-shrine-maroon-800",
                              current && "bg-shrine-maroon-800",
                            )}
                          >
                            <span className="block text-sm font-semibold text-shrine-cream">
                              {child.label}
                            </span>
                            {child.description ? (
                              <span className="mt-0.5 block text-xs text-shrine-cream/60">
                                {child.description}
                              </span>
                            ) : null}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="flex h-11 w-11 items-center justify-center text-shrine-cream lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {mobileOpen ? (
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          tabIndex={-1}
          className="drawer-in border-t border-shrine-cream/10 bg-shrine-maroon-950 focus:outline-none lg:hidden"
          onKeyDown={handleDrawerKeyDown}
          onClickCapture={(event) => {
            if ((event.target as HTMLElement).closest("a")) {
              setMobileOpen(false);
            }
          }}
        >
          <nav className="max-h-[calc(100vh-5rem)] overflow-y-auto px-5 py-4" aria-label="Mobile">
            {primaryNav.map((item, index) => {
              const mobileParentActive =
                item.children?.some((child) => child.to.split("#")[0] === pathname) ??
                pathname === item.to;
              return (
                <div
                  key={item.label}
                  className="drawer-item-in border-b border-shrine-cream/10 py-3"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <Link
                    to={item.to}
                    aria-current={mobileParentActive ? "page" : undefined}
                    className={cn(
                      "block text-sm font-semibold uppercase tracking-wide text-shrine-cream",
                      mobileParentActive && "text-shrine-gold-300",
                    )}
                  >
                    {item.label}
                  </Link>
                {item.children ? (
                  <ul className="mt-2 space-y-1 pl-3">
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <Link
                          to={child.to}
                          className="block py-1.5 text-sm text-shrine-cream/70"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
                </div>
              );
            })}
            <Link
              to="/give"
              className="mt-4 block py-3 text-sm font-semibold uppercase tracking-wide text-shrine-gold-300"
            >
              Give
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
