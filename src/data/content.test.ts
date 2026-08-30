import { describe, expect, it } from "vitest";
import {
  devotions,
  faqs,
  givingOptions,
  grounds,
  images,
  lifeTimeline,
  ministries,
  ppcMembers,
  priests,
  serveRoles,
  upcomingEvents,
} from "@/data/content";

describe("content", () => {
  it("lifeTimeline has 8 entries each with year/title/description length>20", () => {
    expect(lifeTimeline).toHaveLength(8);
    for (const entry of lifeTimeline) {
      expect(entry.year.length).toBeGreaterThan(0);
      expect(entry.title.length).toBeGreaterThan(0);
      expect(entry.description.length).toBeGreaterThan(20);
    }
  });

  it("grounds has 3 sections each with id in allowlist, image/imageFallback/imageAlt non-empty, details >=3", () => {
    expect(grounds).toHaveLength(3);
    expect(grounds.map((g) => g.id)).toEqual(["main-church", "chapel", "parish-hall"]);
    for (const section of grounds) {
      expect(section.image.length).toBeGreaterThan(0);
      expect(section.imageFallback.length).toBeGreaterThan(0);
      expect(section.imageAlt.length).toBeGreaterThan(0);
      expect(section.details.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("ministries has 6 sections with expected ids, each imageAlt etc and details >=3", () => {
    expect(ministries).toHaveLength(6);
    expect(ministries.map((m) => m.id)).toEqual([
      "liturgical",
      "faith-formation",
      "pastoral-care",
      "family-life",
      "youth",
      "language-communities",
    ]);
    for (const section of ministries) {
      expect(section.image.length).toBeGreaterThan(0);
      expect(section.imageFallback.length).toBeGreaterThan(0);
      expect(section.imageAlt.length).toBeGreaterThan(0);
      expect(section.details.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("faqs has 6 entries each question ends with ? and answer length>20", () => {
    expect(faqs).toHaveLength(6);
    for (const faq of faqs) {
      expect(faq.question.endsWith("?")).toBe(true);
      expect(faq.answer.length).toBeGreaterThan(20);
    }
  });

  it("upcomingEvents has 6 entries each category in allowed set and title/summary non-empty", () => {
    expect(upcomingEvents).toHaveLength(6);
    const allowed = new Set(["Parish", "Devotion", "Formation", "Archdiocese"]);
    for (const event of upcomingEvents) {
      expect(allowed.has(event.category)).toBe(true);
      expect(event.title.length).toBeGreaterThan(0);
      expect(event.summary.length).toBeGreaterThan(0);
    }
    for (const event of upcomingEvents) {
      if (event.href !== undefined) {
        expect(event.href.length).toBeGreaterThan(0);
        expect(event.href).toMatch(/^https?:\/\//);
      }
    }
  });

  it("givingOptions has 8 entries each name/description length>0 and icons include globe and flame", () => {
    expect(givingOptions).toHaveLength(8);
    const icons = givingOptions.map((g) => g.icon);
    expect(icons).toContain("globe");
    expect(icons).toContain("flame");
    for (const option of givingOptions) {
      expect(option.name.length).toBeGreaterThan(0);
      expect(option.description.length).toBeGreaterThan(10);
    }
  });

  it("priests has 3 priests each name/role/email+phone non-empty", () => {
    expect(priests).toHaveLength(3);
    for (const priest of priests) {
      expect(priest.name.length).toBeGreaterThan(0);
      expect(priest.role.length).toBeGreaterThan(0);
      expect(priest.email?.length).toBeGreaterThan(0);
      expect(priest.phone?.length).toBeGreaterThan(0);
      expect(priest.email).toMatch(/@/);
      expect(priest.phone).toMatch(/\+65/);
    }
  });

  it("ppcMembers has 7 entries each role/name non-empty", () => {
    expect(ppcMembers).toHaveLength(7);
    for (const member of ppcMembers) {
      expect(member.role.length).toBeGreaterThan(0);
      expect(member.name.length).toBeGreaterThan(0);
    }
  });

  it("images object has required keys", () => {
    const required = [
      "hero",
      "heroFallback",
      "chapel",
      "sanctuary",
      "garden",
      "glass",
      "hall",
      "cemetery",
      "feast",
      "naveCdn",
      "courtyardCdn",
    ] as const;
    for (const key of required) {
      expect((images as Record<string, string>)[key]?.length).toBeGreaterThan(0);
    }
  });

  it("serveRoles has 4 entries and devotions has 6 entries", () => {
    expect(serveRoles).toHaveLength(4);
    expect(devotions).toHaveLength(6);
  });
});
