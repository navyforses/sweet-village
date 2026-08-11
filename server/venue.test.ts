import { describe, expect, it } from "vitest";
import { ATTRACTIONS, CAPACITY, CONTACT, POOL, UNITS, VENUE_SPACE } from "../shared/venue";

describe("accommodation inventory", () => {
  it("matches what the owner confirmed: 5 units, 17 beds, 22 guests", () => {
    expect(CAPACITY.units).toBe(5);
    expect(CAPACITY.beds).toBe(17);
    expect(CAPACITY.maxGuests).toBe(22);
  });

  it("describes two small cottages sleeping 2 and taking up to 4", () => {
    const small = UNITS.filter(u => u.id.startsWith("small"));
    expect(small).toHaveLength(2);
    for (const u of small) {
      expect(u.beds).toBe(2);
      expect(u.maxGuests).toBe(4);
    }
  });

  it("splits the large cottage into two two-storey rooms of four", () => {
    const large = UNITS.filter(u => u.id === "large-a" || u.id === "large-b");
    expect(large).toHaveLength(2);
    for (const u of large) {
      expect(u.beds).toBe(4);
      expect(u.maxGuests).toBe(4);
      expect(u.floors).toBe(2);
    }
  });

  it("gives the grand room five beds and a sixth place on the sofa", () => {
    const grand = UNITS.find(u => u.id === "grand")!;
    expect(grand.beds).toBe(5);
    expect(grand.maxGuests).toBe(6);
  });

  it("gives every cottage or room a three-photo exterior/interior detail gallery", () => {
    for (const unit of UNITS) {
      expect(unit.gallery).toHaveLength(3);
      expect(new Set(unit.gallery).size).toBe(3);
      for (const photo of unit.gallery) {
        expect(photo).toMatch(/^\/manus-storage\//);
      }
    }
  });

  it("never lets a unit sleep more on beds than its stated maximum", () => {
    for (const u of UNITS) {
      expect(u.maxGuests).toBeGreaterThanOrEqual(u.beds);
      expect(u.priceHigh).toBeGreaterThan(u.priceLow);
    }
  });
});

describe("pool policy", () => {
  it("caps day visitors and prices adults above children", () => {
    expect(POOL.dailyLimit).toBe(40);
    expect(POOL.adult).toBeGreaterThan(POOL.child);
    expect(POOL.guestFree).toBe(true);
  });
});

describe("event policy", () => {
  it("requires a whole-property buyout above 20 guests", () => {
    expect(VENUE_SPACE.buyoutThreshold).toBe(20);
    expect(VENUE_SPACE.coveredSeats).toBeGreaterThan(VENUE_SPACE.restaurantSeats);
  });
});

describe("location data", () => {
  it("puts Prometheus Cave 2 minutes away and lists it first", () => {
    expect(ATTRACTIONS[0].id).toBe("prometheus");
    expect(ATTRACTIONS[0].minutes).toBe(2);
  });

  it("orders nothing closer than the cave and keeps coordinates in Georgia", () => {
    for (const a of ATTRACTIONS) {
      expect(a.minutes).toBeGreaterThanOrEqual(2);
      expect(a.lat).toBeGreaterThan(41);
      expect(a.lat).toBeLessThan(44);
      expect(a.lng).toBeGreaterThan(40);
      expect(a.lng).toBeLessThan(47);
    }
  });

  it("includes Khvamli and Martvili, the wider-region draws", () => {
    const ids = ATTRACTIONS.map(a => a.id);
    expect(ids).toContain("khvamli");
    expect(ids).toContain("martvili");
  });
});

describe("contact details", () => {
  it("keeps the phone number and WhatsApp handle in sync", () => {
    expect(CONTACT.phone).toBe("+995599639614");
    expect(CONTACT.whatsapp).toBe("995599639614");
  });
});
