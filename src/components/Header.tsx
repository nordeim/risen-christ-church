import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Emblem } from "@/components/Emblem";
import { primaryNav } from "@/data/nav";
import { site } from "@/data/site";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/utils/cn";

export function Header() {
  const { pathname, hash } = useLocation();
  const scrolled = useScrolled(16);
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerWasOpenRef = useRef(false);

  const solid = scrolled || !isHome || mobileOpen;

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
    if (mobileOpen) {
      drawerWasOpenRef.current = true;
      drawerRef.current?.focus();
    } else if (drawerWasOpenRef.current) {
      drawerWasOpenRef.current = false;
      hamburgerRef.current?.focus();
    }
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setOpenDesktopMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (drawerRef.current?.contains(target)) return;
      if (hamburgerRef.current?.contains(target)) return;
      setMobileOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [mobileOpen]);

  function handleDrawerKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const root = drawerRef.current;
    if (!root) return;
    const focusable = root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function parentCurrent(item: (typeof primaryNav)[number]) {
    if (!item.children) return pathname === item.to;
    return item.children.some((child) => child.to.split("#")[0] === pathname);
  }

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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2 text-[0.7rem] tracking-[0.14em] text-shrine-cream/70 uppercase">
          <p>
            {site.address.street} · {site.feast.name} · {site.feast.date}
          </p>
          <Link to="/give" className="link-underline text-shrine-gold-300">
            Give
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <Link to="/" className="flex items-center gap-3 text-shrine-cream">
          <Emblem className="text-shrine-gold-300" />
          <span className="font-display text-lg leading-tight font-semibold sm:text-xl">
            Risen Christ
            <span className="mt-0.5 block text-[0.7rem] font-normal tracking-[0.18em] text-shrine-gold-300 uppercase">
              Toa Payoh
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const isParentCurrent = parentCurrent(item);
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
                    aria-current={isParentCurrent ? "true" : undefined}
                    className={cn(
                      "relative inline-flex items-center gap-1 px-3 py-2 text-sm tracking-wide text-shrine-cream/85 transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-shrine-gold-300 after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100 hover:text-shrine-gold-300",
                      isParentCurrent && "text-shrine-gold-300 after:scale-x-100",
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
                      "relative inline-flex px-3 py-2 text-sm tracking-wide text-shrine-cream/85 transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-shrine-gold-300 after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100 hover:text-shrine-gold-300",
                      pathname === item.to && "text-shrine-gold-300 after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {item.children && openDesktopMenu === item.label ? (
                  <div
                    className="menu-in absolute top-full left-0 z-50 min-w-[16rem] border border-shrine-stone/40 bg-shrine-cream p-2 shadow-shrine-lg"
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
                            "block rounded-sm px-3 py-2.5 transition-colors hover:bg-shrine-parchment",
                            current && "bg-shrine-parchment",
                          )}
                        >
                          <span className="font-display text-shrine-maroon-700">{child.label}</span>
                          {child.description ? (
                            <span className="mt-0.5 block text-xs leading-relaxed text-shrine-charcoal/75">
                              {child.description}
                            </span>
                          ) : null}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <button
          ref={hamburgerRef}
          type="button"
          className="flex h-11 w-11 items-center justify-center text-shrine-cream lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen ? (
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          tabIndex={-1}
          className="drawer-in border-t border-shrine-cream/10 bg-shrine-maroon-950 px-5 py-6 outline-none lg:hidden"
          onKeyDown={handleDrawerKeyDown}
          onClickCapture={(event) => {
            if ((event.target as HTMLElement).closest("a")) {
              setMobileOpen(false);
            }
          }}
        >
          <nav aria-label="Mobile">
            <ul className="space-y-4">
              {primaryNav.map((item, index) => {
                const isParentCurrent = parentCurrent(item);
                return (
                  <li
                    key={item.label}
                    className="drawer-item-in"
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    <Link
                      to={item.to}
                      aria-current={isParentCurrent ? "page" : undefined}
                      className={cn(
                        "font-display text-xl text-shrine-cream",
                        isParentCurrent && "text-shrine-gold-300",
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.children ? (
                      <ul className="mt-2 space-y-1.5 pl-3">
                        {item.children.map((child) => (
                          <li key={child.to}>
                            <Link
                              to={child.to}
                              className="text-sm text-shrine-cream/70 hover:text-shrine-gold-300"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
              <li>
                <Link to="/give" className="font-display text-xl text-shrine-gold-300">
                  Give
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
