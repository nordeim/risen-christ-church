import { describe, expect, it } from "vitest";
import { site } from "@/data/site";

describe("site", () => {
  it("has canonical address street/city/zip with full and encoded query", () => {
    expect(site.address.street).toBe("5 Bukit Batok East Ave 2");
    expect(site.address.city).toBe("Singapore");
    expect(site.address.zip).toBe("659918");
    expect(site.address.full).toContain(site.address.street);
    expect(site.address.full).toContain(site.address.zip);
    expect(site.address.query).toBe(encodeURIComponent(site.address.full));
  });

  it("has mapsUrl and mapsEmbedSrc matching google.com/maps", () => {
    expect(site.mapsUrl).toMatch(/google\.com\/maps/);
    expect(site.mapsEmbedSrc).toMatch(/google\.com\/maps/);
    expect(site.mapsUrl).toMatch(/^https:\/\/www\.google\.com\/maps/);
  });

  it("has contact phones (+65), UEN (+ Poor & Needy), chequePayee, facebook, archdiocese", () => {
    expect(site.contact.parishPriestPhone).toMatch(/\+65/);
    expect(site.contact.officePhone).toMatch(/\+65/);
    // emergency + columbarium lines may be absent in tests but should be +65 when present
    if (site.contact.emergencyPhone) expect(site.contact.emergencyPhone).toMatch(/\+65/);
    expect(site.uen).toBe("T08CC4053H");
    expect(site.uenPoorNeedy).toBe("T08CC4053HRSM");
    expect(site.chequePayee.length).toBeGreaterThan(0);
    expect(site.facebook).toMatch(/^https:\/\//);
    expect(site.archdiocese).toMatch(/^https:\/\//);
  });

  it("has hours for gates, mainChurch, chapel, parish office, columbarium, adorationRoom", () => {
    expect(site.hours.gates.length).toBeGreaterThan(0);
    expect(site.hours.mainChurch.length).toBeGreaterThan(0);
    expect(site.hours.chapel.length).toBeGreaterThan(0);
    expect(site.hours.reception.length).toBeGreaterThan(0);
    expect(site.hours.parishOffice.length).toBeGreaterThan(0);
    expect(site.hours.columbarium.length).toBeGreaterThan(0);
    expect(site.hours.adorationRoom.length).toBeGreaterThan(0);
  });

  it("has mass schedule with weekdayMorning/weekdayEvening/saturday/sunday[6]/confession/adoration/secondCollection", () => {
    expect(site.mass.weekdayMorning.length).toBeGreaterThan(0);
    expect(site.mass.weekdayEvening.length).toBeGreaterThan(0);
    expect(site.mass.saturday.length).toBeGreaterThan(0);
    expect(site.mass.sunday).toHaveLength(6);
    for (const slot of site.mass.sunday) {
      expect(slot.length).toBeGreaterThan(0);
    }
    expect(site.mass.confession.length).toBeGreaterThan(0);
    expect(site.mass.adoration.length).toBeGreaterThan(0);
    expect(site.mass.secondCollection.length).toBeGreaterThan(0);
  });

  it("has feast name and date — Portiuncula 2 August", () => {
    expect(site.feast.name).toBe("Our Lady of the Angels · Portiuncula");
    expect(site.feast.date).toBe("2 August");
  });

  it("has canonical origin with derived url and ogImage", () => {
    expect(site.origin).toMatch(/^https:\/\//);
    expect(site.origin.endsWith("/")).toBe(false);
    expect(site.url).toBe(`${site.origin}/`);
    expect(site.ogImage).toBe(`${site.origin}/images/hero-church.jpg`);
    // ogImage is absolute and uses the same origin
    expect(site.ogImage.startsWith(site.origin)).toBe(true);
  });
});
