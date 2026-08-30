import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { site } from "@/data/site";

/**
 * Round-2 contract: index.html must ship a complete social/identity head —
 * favicon, theme-color, Open Graph (url/site_name/image/locale), Twitter
 * card, and Church JSON-LD whose contact data cannot drift from site.ts.
 * All fields verified missing on the live site (2026-08-29 DOM probe).
 */
const root = resolve(__dirname, "..");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const htmlFlat = html.replace(/\s+/g, " ");

function headIncludes(needle: string) {
  expect(htmlFlat).toContain(needle.replace(/\s+/g, " "));
}

describe("index.html head completeness", () => {
  it("references an SVG favicon", () => {
    headIncludes('rel="icon"');
    headIncludes("/favicon.svg");
  });

  it("declares a maroon-950 theme-color", () => {
    headIncludes('<meta name="theme-color" content="#200a0a" />');
  });

  it("has canonical Open Graph url + site_name + locale", () => {
    headIncludes(`<meta property="og:url" content="${site.url}" />`);
    headIncludes(`<meta property="og:site_name" content="${site.name}" />`);
    headIncludes('<meta property="og:locale" content="en_SG" />');
  });

  it("has an absolute og:image (share card renders on social platforms)", () => {
    headIncludes(`<meta property="og:image" content="${site.ogImage}" />`);
  });

  it("og:url and og:image are derived from site.origin (no drift)", () => {
    expect(site.url).toBe(`${site.origin}/`);
    expect(site.ogImage).toBe(`${site.origin}/images/hero-church.jpg`);
    headIncludes(`<meta property="og:url" content="${site.url}" />`);
    headIncludes(`<meta property="og:image" content="${site.ogImage}" />`);
  });

  it("JSON-LD url matches site.url (no drift)", () => {
    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(match).not.toBeNull();
    const json = JSON.parse(match![1]!) as { url: string };
    expect(json.url).toBe(site.url);
  });

  it("declares a twitter:card", () => {
    headIncludes('<meta name="twitter:card" content="summary_large_image" />');
  });

  it("embeds Church JSON-LD that matches site.ts (no drift)", () => {
    const match = html.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    );
    expect(match).not.toBeNull();
    const json = JSON.parse(match![1]!) as {
      "@type": string;
      name: string;
      telephone: string;
      address: { streetAddress: string; postalCode: string };
    };
    expect(json["@type"]).toBe("Church");
    expect(json.name).toBe(site.name);
    expect(json.telephone).toBe(site.contact.officePhone);
    expect(json.address.streetAddress).toBe(site.address.street);
    expect(json.address.postalCode).toBe(site.address.zip);
  });
});

/**
 * Round-3 hardening contract: the CSP meta must deny plugin/base-tag
 * injection vectors, allow the Cloudflare Pages-injected analytics beacon
 * (blocked in the wild on the live deploy — see round-3 audit H-2), and the
 * document must pin a Referrer-Policy the static host does not send.
 */
describe("index.html CSP & referrer hardening", () => {
  const cspMatch = html.match(
    /http-equiv="Content-Security-Policy"\s+content="([^"]+)"/,
  );
  const csp = cspMatch?.[1] ?? "";

  it("parses the CSP meta tag", () => {
    expect(csp).not.toBe("");
  });

  it("denies plugin content via object-src 'none'", () => {
    expect(csp).toContain("object-src 'none'");
  });

  it("pins base-uri to 'self' (blocks <base> hijacking)", () => {
    expect(csp).toContain("base-uri 'self'");
  });

  it("allows the Cloudflare Pages analytics beacon in script-src", () => {
    expect(csp).toContain("https://static.cloudflareinsights.com");
  });

  it("declares a Referrer-Policy meta (host does not send the header)", () => {
    headIncludes('<meta name="referrer" content="strict-origin-when-cross-origin" />');
  });
});
