import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { resolveHashRedirect } from "./utils/deepLinks";

/**
 * Round-12 (audit F-3): a path-style deep link such as /worship must land on
 * Worship, not silently render Home (soft-404; reproduced locally before this
 * fix). Rewrite known path routes to their hash equivalents before the router
 * mounts; render still proceeds so the module never dead-ends while
 * location.replace reloads into the hash route.
 */
const hashRedirect = resolveHashRedirect(
  window.location.pathname,
  window.location.hash,
);
if (hashRedirect) {
  window.location.replace(hashRedirect);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
