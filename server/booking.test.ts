import { describe, expect, it } from "vitest";
import { bookingInput, formatBooking, whatsappLink, type BookingInput } from "./booking";
import { CONTACT } from "../shared/venue";

const base: BookingInput = {
  name: "ნინო ბერიძე",
  phone: "+995 555 12 34 56",
  interest: "cottage",
  lang: "ka",
};

describe("bookingInput validation", () => {
  it("accepts a minimal valid enquiry", () => {
    expect(bookingInput.safeParse(base).success).toBe(true);
  });

  it("accepts each of the five real accommodation units", () => {
    for (const unit of ["small-a", "small-b", "large-a", "large-b", "grand"]) {
      expect(bookingInput.safeParse({ ...base, unit }).success, unit).toBe(true);
    }
  });

  it("rejects a unit that does not exist", () => {
    expect(bookingInput.safeParse({ ...base, unit: "penthouse" }).success).toBe(false);
  });

  it("accepts phone numbers written with spaces, dashes and parentheses", () => {
    for (const phone of ["+995599639614", "599 63 96 14", "(995) 599-639-614"]) {
      expect(bookingInput.safeParse({ ...base, phone }).success).toBe(true);
    }
  });

  it("rejects a phone number containing letters", () => {
    expect(bookingInput.safeParse({ ...base, phone: "call me" }).success).toBe(false);
  });

  it("rejects a name that is too short", () => {
    expect(bookingInput.safeParse({ ...base, name: "N" }).success).toBe(false);
  });

  it("rejects an unknown interest", () => {
    expect(bookingInput.safeParse({ ...base, interest: "spa" }).success).toBe(false);
  });

  it("rejects an unsupported language", () => {
    expect(bookingInput.safeParse({ ...base, lang: "de" }).success).toBe(false);
  });

  it("accepts all six supported languages", () => {
    for (const lang of ["ka", "en", "ru", "ar", "fr", "es"]) {
      expect(bookingInput.safeParse({ ...base, lang }).success).toBe(true);
    }
  });

  it("rejects an implausible guest count", () => {
    expect(bookingInput.safeParse({ ...base, guests: 0 }).success).toBe(false);
    expect(bookingInput.safeParse({ ...base, guests: 500 }).success).toBe(false);
  });
});

describe("formatBooking", () => {
  it("includes the guest name, phone and browsing language", () => {
    const { body, subject } = formatBooking(base);
    expect(body).toContain("ნინო ბერიძე");
    expect(body).toContain("+995 555 12 34 56");
    expect(body).toContain("Georgian");
    expect(subject).toContain("ნინო ბერიძე");
  });

  it("names the browsing language for every locale", () => {
    expect(formatBooking({ ...base, lang: "ar" }).body).toContain("Arabic");
    expect(formatBooking({ ...base, lang: "fr" }).body).toContain("French");
    expect(formatBooking({ ...base, lang: "es" }).body).toContain("Spanish");
  });

  it("includes dates and the selected unit when supplied", () => {
    const { body } = formatBooking({
      ...base,
      checkIn: "2026-08-20",
      checkOut: "2026-08-22",
      interest: "whole",
      guests: 18,
    });
    expect(body).toContain("2026-08-20");
    expect(body).toContain("2026-08-22");
    expect(body).toContain("Whole property");
    expect(body).toContain("18");
  });

  it("omits optional lines that were not filled in", () => {
    const { body } = formatBooking(base);
    expect(body).not.toContain("Guests:");
    expect(body).not.toContain("Notes:");
  });

  it("names the exact unit when the guest picked one", () => {
    const { body, subject } = formatBooking({ ...base, unit: "grand" });
    expect(body).toContain("Unit:");
    expect(body).toContain("Grand room");
    expect(subject).toContain("დიდი ნომერი");
  });

  it("omits the unit line when the guest did not pick one", () => {
    expect(formatBooking(base).body).not.toContain("Unit:");
  });
});

describe("whatsappLink", () => {
  it("targets the venue number and carries the enquiry as text", () => {
    const link = whatsappLink(base);
    expect(link.startsWith(`https://wa.me/${CONTACT.whatsapp}?text=`)).toBe(true);
    expect(decodeURIComponent(link)).toContain("ნინო ბერიძე");
  });

  it("carries the chosen unit so the owner sees it in WhatsApp too", () => {
    const text = decodeURIComponent(whatsappLink({ ...base, unit: "large-a" }));
    expect(text).toContain("Family Duplex A");
  });
});

describe("owner notification target", () => {
  it("is the address the owner gave us", () => {
    expect(CONTACT.email).toBe("iobidzeioseb@gmail.com");
  });
});
