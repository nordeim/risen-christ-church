/**
 * Round-12 — audit finding F-3: path-style deep links silently rendered Home.
 *
 * The app ships as a single static dist/index.html with no host rewrites, so
 * HashRouter stays (documented rationale in App.tsx). Links shared without
 * the hash — copied from a chat app, printed in a bulletin — arrive as
 * path-style URLs and previously rendered the Home page (a soft-404;
 * reproduced locally 2026-08-31 before this fix).
 *
 * `resolveHashRedirect` rewrites known path-style routes to their hash
 * equivalents before React mounts; `main.tsx` applies it via
 * location.replace so the SPA boots straight into the requested route.
 * Unknown paths keep the existing behavior — this deliberately mirrors the
 * audit's recommendation ("rewrites known path routes to their hash
 * equivalents"), not an open redirect.
 */

/**
 * Every concrete path declared in src/App.tsx (9 canonical + 7 aliases).
 * Kept in lockstep with App.tsx by the drift guard in
 * src/utils/deepLinks.test.ts — adding a route there without extending this
 * list fails that test.
 */
export const knownRoutePaths: readonly string[] = [
  "/",
  "/about",
  "/history",
  "/worship",
  "/mass-times",
  "/hours-location",
  "/visit",
  "/ministries",
  "/ministry",
  "/news-events",
  "/news-and-events",
  "/serve",
  "/volunteer",
  "/give",
  "/donate",
  "/faq",
];

/**
 * Resolve a path-style URL to its hash-route equivalent.
 *
 * @param pathname - window.location.pathname, e.g. "/worship"
 * @param hash - window.location.hash, e.g. "#/give" or "" or "#"
 * @returns the target to location.replace(), or null when no rewrite is
 *   needed (hash present, root path, or an unknown path).
 */
export function resolveHashRedirect(pathname: string, hash: string): string | null {
  // A real hash route means the router already owns the URL. A bare "#"
  // carries no route information, so the path is still authoritative.
  if (hash && hash !== "#") return null;

  const clean = pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;

  if (clean === "" || clean === "/") return null;
  if (!knownRoutePaths.includes(clean)) return null;

  return `/#${clean}`;
}
