import { describe, expect, it } from "vitest";
import { site } from "@/data/site";

describe("site", () => {
  it("has canonical address street/city/zip with full and encoded query", () => {
    expect(site.address.street).toBe("91 Toa Payoh Central");
    expect(site.address.city).toBe("Singapore");
    expect(site.address.zip).toBe("319193");
    expect(site.address.full).toContain(site.address.street);
    expect(site.address.full).toContain(site.address.zip);
    expect(site.address.query).toBe(encodeURIComponent(site.address.full));
  });

  it("has mapsUrl and mapsEmbedSrc matching google.com/maps", () => {
    expect(site.mapsUrl).toMatch(/google\.com\/maps/);
    expect(site.mapsEmbedSrc).toMatch(/google\.com\/maps/);
    expect(site.mapsUrl).toMatch(/^https:\/\/www\.google\.com\/maps/);
  });

  it("has contact phones (+65), UEN, chequePayee, facebook, archdiocese", () => {
    expect(site.contact.parishPriestPhone).toMatch(/\+65/);
    expect(site.contact.officePhone).toMatch(/\+65/);
    expect(site.contact.mediaPhone).toMatch(/\+65/);
    expect(site.contact.email).toMatch(/@/);
    expect(site.uen).toBe("T08CC4042G");
    // no Poor & Needy HRSM for Risen Christ — just single UEN
    expect(site.chequePayee.length).toBeGreaterThan(0);
    expect(site.chequePayee).toBe("Church of the Risen Christ");
    expect(site.facebook).toMatch(/^https:\/\//);
    expect(site.archdiocese).toMatch(/^https:\/\//);
  });

  it("has hours for gates, mainChurch, chapel, parish office, mediaCentre, adorationRoom", () => {
    expect(site.hours.gates.length).toBeGreaterThan(0);
    expect(site.hours.mainChurch.length).toBeGreaterThan(0);
    expect(site.hours.chapel.length).toBeGreaterThan(0);
    expect(site.hours.reception.length).toBeGreaterThan(0);
    expect(site.hours.parishOffice.length).toBeGreaterThan(0);
    expect(site.hours.mediaCentre.length).toBeGreaterThan(0);
    expect(site.hours.adorationRoom.length).toBeGreaterThan(0);
    // columbarium is intentionally absent for Risen Christ
    expect((site.hours as Record<string, unknown>).columbarium).toBeUndefined();
  });

  it("has mass schedule with weekdayMorning/weekdayEvening/saturday/sunday[5]/confession/adoration/secondCollection", () => {
    expect(site.mass.weekdayMorning.length).toBeGreaterThan(0);
    expect(site.mass.weekdayEvening.length).toBeGreaterThan(0);
    expect(site.mass.saturday.length).toBeGreaterThan(0);
    expect(site.mass.sunday).toHaveLength(5);
    for (const slot of site.mass.sunday) {
      expect(slot.length).toBeGreaterThan(0);
    }
    expect(site.mass.confession.length).toBeGreaterThan(0);
    expect(site.mass.adoration.length).toBeGreaterThan(0);
    expect(site.mass.secondCollection.length).toBeGreaterThan(0);
    expect(site.mass.monthly.length).toBeGreaterThan(0);
  });

  it("has feast name and date — The Risen Christ Easter Sunday", () => {
    expect(site.feast.name).toBe("The Risen Christ");
    expect(site.feast.date).toBe("Easter Sunday");
  });

  it("has canonical origin with derived url and ogImage", () => {
    expect(site.origin).toBe("https://www.risenchrist.org.sg");
    expect(site.origin.endsWith("/")).toBe(false);
    expect(site.url).toBe(`${site.origin}/`);
    expect(site.ogImage).toBe(`${site.origin}/images/hero-church.jpg`);
    expect(site.ogImage.startsWith(site.origin)).toBe(true);
  });

  it("exposes Free Ministry, SSVP, bulletin and CEP links", () => {
    expect(site.freeMinistry).toMatch(/^https:\/\//);
    expect(site.ssvp).toMatch(/^https:\/\//);
    expect(site.bulletin).toMatch(/^https:\/\//);
    expect(site.cep).toMatch(/^https:\/\//);
  });
});
