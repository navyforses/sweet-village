import { describe, expect, it } from "vitest";
import { EVENT_TYPES } from "@shared/venue";
import { getEventPageCopy } from "./eventDetailCopy";

const languages = ["ka", "en", "ru", "ar", "fr", "es"] as const;

describe("event experience pages", () => {
  it("provides complete localized copy for every event", () => {
    for (const lang of languages) {
      const copy = getEventPageCopy(lang);

      expect(copy.overviewTitle).toBeTruthy();
      for (const event of EVENT_TYPES) {
        const text = copy.events[event.id];
        expect(text.title).toBeTruthy();
        expect(text.body).toBeTruthy();
        expect(text.experience).toBeTruthy();
        expect(text.highlights).toHaveLength(3);
      }
    }
  });

  it("keeps the culinary masterclass as a dedicated bookable format", () => {
    const masterclass = EVENT_TYPES.find(event => event.id === "masterclass");

    expect(masterclass).toMatchObject({ minGuests: 4, maxGuests: 16 });
    expect(masterclass?.gallery).toHaveLength(6);
    expect(getEventPageCopy("ka").events.masterclass.title).toBe(
      "კულინარიული მასტერკლასი"
    );
  });

  it("adds the poolside pavilion as a versatile real venue space", () => {
    const poolside = EVENT_TYPES.find(event => event.id === "poolside");

    expect(poolside).toMatchObject({ minGuests: 8, maxGuests: 30 });
    expect(poolside?.gallery).toHaveLength(6);
    expect(getEventPageCopy("ka").events.poolside.title).toBe(
      "აუზისპირა პავილიონი"
    );
  });
});
