import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SkipLink } from "@/components/SkipLink";

function resolveAnchor(pathname: string, hash: string) {
  if (hash && hash.length > 1) {
    return hash.slice(1);
  }
  const raw = window.location.hash;
  const parts = raw.split("#").filter(Boolean);
  if (parts.length >= 2) {
    const last = parts[parts.length - 1].replace(/^\//, "");
    if (last && last !== pathname.replace(/^\//, "")) return last;
  }
  return "";
}

export function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const id = resolveAnchor(pathname, hash);
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        const timer = window.setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
        return () => window.clearTimeout(timer);
      }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div key={pathname} className="page-in" data-testid="page-container" data-route={pathname}>
          <Outlet />
        </div>
      </main>
      <BackToTop />
      <Footer />
    </>
  );
}
