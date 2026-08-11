import { describe, expect, it } from "vitest";
import ar from "../client/src/i18n/locales/ar";
import en from "../client/src/i18n/locales/en";
import es from "../client/src/i18n/locales/es";
import fr from "../client/src/i18n/locales/fr";
import ka from "../client/src/i18n/locales/ka";
import ru from "../client/src/i18n/locales/ru";
import { AUTHENTIC_COPY } from "../client/src/i18n/authenticCopy";

const locales = { ka, en, ru, ar, fr, es };

function leafStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(leafStrings);
  if (value && typeof value === "object") return Object.values(value).flatMap(leafStrings);
  return [];
}

function assertAuthenticBlocks(copy: typeof ka, language: string) {
  expect(copy.meta.description, `${language}: meta description`).toBeTruthy();
  expect(copy.brand.tagline, `${language}: local tagline`).toBeTruthy();
  expect(copy.hero.title, `${language}: hero title`).toBeTruthy();
  expect(copy.hero.subtitle, `${language}: hero subtitle`).toBeTruthy();
  expect(copy.highlights.title, `${language}: highlights title`).toBeTruthy();
  expect(copy.highlights.items, `${language}: highlights`).toHaveLength(4);
  expect(copy.services.subtitle, `${language}: services subtitle`).toBeTruthy();
  expect(copy.services.events.body, `${language}: events`).toBeTruthy();
  expect(copy.services.pool.body, `${language}: pool service`).toBeTruthy();
  expect(copy.services.restaurant.body, `${language}: restaurant service`).toBeTruthy();
  expect(copy.services.stay.body, `${language}: stay service`).toBeTruthy();
  expect(copy.stay.intro, `${language}: stay introduction`).toBeTruthy();
  expect(copy.events.intro, `${language}: event introduction`).toBeTruthy();
  expect(copy.pool.intro, `${language}: pool introduction`).toBeTruthy();
  expect(copy.restaurant.intro, `${language}: restaurant introduction`).toBeTruthy();
  expect(copy.location.intro, `${language}: location introduction`).toBeTruthy();
  expect(copy.about.body1, `${language}: first about paragraph`).toBeTruthy();
  expect(copy.about.body2, `${language}: second about paragraph`).toBeTruthy();
  expect(copy.booking.intro, `${language}: booking invitation`).toBeTruthy();
}

describe("authentic Facebook-informed copy", () => {
  it("keeps the researched identity across all six languages", () => {
    for (const [language, copy] of Object.entries(locales)) {
      assertAuthenticBlocks(copy, language);
    }
  });

  it("uses confirmed local themes rather than unsupported décor or cooking claims", () => {
    expect(ka.hero.title).toContain("მწვანე");
    expect(ka.highlights.items[1]?.body).toContain("ეზოში მოყვანილი ბოსტნეული");
    expect(ka.restaurant.intro).toContain("კეცის ჭადი");
    expect(ka.location.title).toContain("პრომეთეს მღვიმის გზაზე");
    expect(ka.restaurant.intro).not.toContain("ვენახის ნაფოტებზე");
    expect(ka.about.body1).not.toContain("თაობებით გადადის");
  });

  it("does not leave an accidental English brand phrase in Arabic updated copy", () => {
    expect(ar.about.body1).not.toContain("Sweet Village");
    expect(ar.hero.title).toContain("إيميريتي");
    expect(ar.highlights.items[1]?.title).toContain("الحديقة");
  });

  it("applies every researched copy block to the final locale dictionaries", () => {
    for (const [language, patch] of Object.entries(AUTHENTIC_COPY)) {
      const finalDictionary = JSON.stringify(locales[language as keyof typeof locales]);
      for (const phrase of leafStrings(patch)) {
        expect(finalDictionary, `${language}: missing authentic copy block “${phrase}”`).toContain(phrase);
      }
    }
  });
});
