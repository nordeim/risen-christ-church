import { defineConfig } from "@playwright/test";
import base from "./playwright.config";

/**
 * Built-artifact E2E — runs the suite against the SINGLEFILE BUILD OUTPUT
 * (`vite preview` serving `dist/`), the same artifact the live host serves.
 *
 * Why it exists (round-9, E2E-L1): the suite's `webServer` historically ran
 * `pnpm dev`, so specs could pass on dev-server artifacts and fail on the
 * built one (the singlefile pipeline rewrites root-relative asset refs —
 * e.g. the favicon href `/favicon.svg` → `./favicon.svg`). This config makes
 * "run the suite against the built artifact" a first-class command:
 *
 *   pnpm test:e2e:built                                     # vs dist/ via vite preview
 *   E2E_BASE_URL=https://risen-christ.jesspete.shop pnpm test:e2e:built   # vs live
 *
 * Everything else (testDir, projects, expect timeout, trace/video policy,
 * reporter) is inherited from `playwright.config.ts`.
 */
const liveBaseURL = process.env.E2E_BASE_URL;

export default defineConfig({
  ...base,
  use: {
    ...base.use,
    baseURL: liveBaseURL ?? "http://127.0.0.1:4173",
  },
  // Against the live host there is nothing to boot locally.
  webServer: liveBaseURL
    ? undefined
    : {
        command: "pnpm exec vite preview --port 4173 --host 127.0.0.1 --strictPort",
        url: "http://127.0.0.1:4173",
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
});
