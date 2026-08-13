import { useEffect, useState } from "react";
import { Check, Loader2, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import SectionHeading from "@/components/SectionHeading";
import { SectionDivider } from "@/components/Ornaments";
import { CONTACT, UNITS, type UnitId } from "@shared/venue";
import { useI18n } from "@/i18n";

type Interest = "cottage" | "event" | "pool" | "restaurant" | "whole";

const INTERESTS: Interest[] = ["cottage", "event", "pool", "restaurant", "whole"];

const FIELD =
  "min-h-12 w-full border border-line bg-white px-4 text-[0.9375rem] text-ink placeholder:text-muted-foreground focus:border-pistachio focus:outline-none";

export default function Booking() {
  const { t, lang } = useI18n();
  const [done, setDone] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    interest: "cottage" as Interest,
    unit: "" as "" | UnitId,
    guests: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const selectedUnit = UNITS.find(candidate => candidate.id === form.unit);

  // Accommodation cards link here with a preselected unit or whole-complex enquiry.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const interest = params.get("interest");
    const unit = params.get("unit");
    const guests = params.get("guests");
    if (interest !== "cottage" && interest !== "whole") return;
    setForm(current => ({
      ...current,
      interest,
      unit: interest === "cottage" && UNITS.some(candidate => candidate.id === unit) ? (unit as UnitId) : "",
      guests: guests && /^\d+$/.test(guests) ? guests : current.guests,
    }));
  }, []);

  const [delivered, setDelivered] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (k: keyof typeof form, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: "" }));
  };

  const setInterest = (i: Interest) =>
    // Only a cottage enquiry can carry a specific unit.
    setForm(f => ({ ...f, interest: i, unit: i === "cottage" ? f.unit : "" }));

  const validate = () => {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = t.booking.required;
    if (!/^[+()\d\s-]{6,40}$/.test(form.phone.trim())) next.phone = t.booking.invalidPhone;
    if (form.guests && selectedUnit && Number(form.guests) > selectedUnit.maxGuests) {
      next.guests = `${t.common.upTo} ${selectedUnit.maxGuests} ${t.common.guests}`;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const payload = () => ({
    name: form.name.trim(),
    phone: form.phone.trim(),
    checkIn: form.checkIn || undefined,
    checkOut: form.checkOut || undefined,
    interest: form.interest,
    unit: form.interest === "cottage" && form.unit ? form.unit : undefined,
    guests: form.guests ? Number(form.guests) : undefined,
    notes: form.notes.trim() || undefined,
    lang,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload()),
      });
      if (!response.ok) throw new Error("Booking request failed");
      const result = (await response.json()) as { delivered: boolean };
      setDelivered(result.delivered);
      setDone(true);
      if (result.delivered) toast.success(t.booking.successTitle);
      else toast.warning(t.booking.fallbackTitle);
    } catch {
      toast.error(t.booking.errorTitle);
    } finally {
      setIsSubmitting(false);
    }
  };

  /** Direct WhatsApp fallback — no server round trip required. */
  const openWhatsapp = () => {
    if (!validate()) return;
    const p = payload();
    const lines = [
      `${t.booking.name}: ${p.name}`,
      `${t.booking.phone}: ${p.phone}`,
      `${t.booking.unit}: ${t.booking.interestOptions[p.interest]}`,
    ];
    if (p.unit) {
      lines.push(`${t.stay.eyebrow}: ${t.stay.units[p.unit].title}`);
    }
    if (p.checkIn || p.checkOut) {
      lines.push(`${t.booking.checkIn} → ${t.booking.checkOut}: ${p.checkIn || "—"} → ${p.checkOut || "—"}`);
    }
    if (p.guests) lines.push(`${t.booking.guests}: ${p.guests}`);
    if (p.notes) lines.push(`${t.booking.notes}: ${p.notes}`);
    window.open(
      `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener",
    );
  };

  if (done) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center py-20">
        <div className="max-w-md text-center">
          <span className="mx-auto flex size-14 items-center justify-center border border-pistachio">
            <Check className="size-6 text-pistachio" strokeWidth={1.5} />
          </span>
          <h1 className="mt-7 text-[1.6rem] text-ink">{t.booking.successTitle}</h1>
          <p className="mt-4 text-[0.9375rem] text-muted-foreground">
            {delivered ? t.booking.successBody : t.booking.fallbackBody}
          </p>
          {!delivered && (
            <button
              type="button"
              onClick={openWhatsapp}
              data-press
              className="mt-6 inline-flex min-h-12 items-center bg-turquoise px-7 text-[0.875rem] text-white transition-colors hover:bg-deep">
              {t.booking.orWhatsapp}
            </button>
          )}
          <a
            href={`tel:${CONTACT.phone}`}
            dir="ltr"
            data-press
            className="mt-4 flex min-h-12 items-center justify-center gap-2.5 border border-line bg-white px-7 text-[0.875rem] text-ink transition-colors hover:border-pistachio">
            <Phone className="size-4 text-turquoise" strokeWidth={1.5} />
            {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-16 md:py-20">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          eyebrow={t.booking.eyebrow}
          title={t.booking.title}
          intro={t.booking.intro}
        />

        <form onSubmit={onSubmit} className="mt-12 space-y-7" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="sv-eyebrow mb-2.5 block">
                {t.booking.name} *
              </label>
              <input
                id="name"
                value={form.name}
                onChange={e => set("name", e.target.value)}
                placeholder={t.booking.namePlaceholder}
                autoComplete="name"
                className={FIELD}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="mt-2 text-[0.75rem] text-destructive">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="sv-eyebrow mb-2.5 block">
                {t.booking.phone} *
              </label>
              <input
                id="phone"
                type="tel"
                dir="ltr"
                value={form.phone}
                onChange={e => set("phone", e.target.value)}
                placeholder={t.booking.phonePlaceholder}
                autoComplete="tel"
                className={FIELD}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && (
                <p className="mt-2 text-[0.75rem] text-destructive">{errors.phone}</p>
              )}
            </div>
          </div>

          <div>
            <label className="sv-eyebrow mb-2.5 block">{t.booking.unit}</label>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {INTERESTS.map(i => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setInterest(i)}
                  className={`min-h-12 border px-4 text-start text-[0.875rem] transition-colors ${
                    form.interest === i
                      ? "border-turquoise bg-turquoise/8 text-turquoise"
                      : "border-line bg-white text-ink hover:border-pistachio"
                  }`}>
                  {t.booking.interestOptions[i]}
                </button>
              ))}
            </div>
          </div>

          {/* Exact unit — only relevant for an overnight cottage enquiry. */}
          {form.interest === "cottage" && (
            <div>
              <label htmlFor="unit" className="sv-eyebrow mb-2.5 block">
                {t.stay.eyebrow}
              </label>
              <select
                id="unit"
                value={form.unit}
                onChange={e => {
                  const nextUnit = UNITS.find(candidate => candidate.id === e.target.value);
                  setForm(current => ({
                    ...current,
                    unit: e.target.value as "" | UnitId,
                    guests: nextUnit && Number(current.guests) > nextUnit.maxGuests ? String(nextUnit.maxGuests) : current.guests,
                  }));
                  if (errors.unit || errors.guests) setErrors(current => ({ ...current, unit: "", guests: "" }));
                }}
                className={FIELD}>
                <option value="">{t.booking.anyUnit}</option>
                {UNITS.map(u => (
                  <option key={u.id} value={u.id}>
                    {t.stay.units[u.id as UnitId].title} — {t.common.upTo} {u.maxGuests}{" "}
                    {t.common.guests} — {u.nightlyPrice} {t.common.lari} / {t.common.perNight}
                  </option>
                ))}
              </select>
              {selectedUnit && (
                <p className="mt-2 text-[0.75rem] text-muted-foreground">
                  {selectedUnit.nightlyPrice} {t.common.lari} / {t.common.perNight} · {t.common.upTo} {selectedUnit.maxGuests} {t.common.guests}
                </p>
              )}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label htmlFor="checkIn" className="sv-eyebrow mb-2.5 block">
                {t.booking.checkIn}
              </label>
              <input
                id="checkIn"
                type="date"
                value={form.checkIn}
                onChange={e => set("checkIn", e.target.value)}
                className={FIELD}
              />
            </div>
            <div>
              <label htmlFor="checkOut" className="sv-eyebrow mb-2.5 block">
                {t.booking.checkOut}
              </label>
              <input
                id="checkOut"
                type="date"
                value={form.checkOut}
                onChange={e => set("checkOut", e.target.value)}
                className={FIELD}
              />
            </div>
            <div>
              <label htmlFor="guests" className="sv-eyebrow mb-2.5 block">
                {t.booking.guests}
              </label>
              <input
                id="guests"
                type="number"
                min={1}
                max={selectedUnit?.maxGuests ?? 200}
                inputMode="numeric"
                value={form.guests}
                onChange={e => set("guests", e.target.value)}
                className={FIELD}
                aria-invalid={!!errors.guests}
              />
              {errors.guests && <p className="mt-2 text-[0.75rem] text-destructive">{errors.guests}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="sv-eyebrow mb-2.5 block">
              {t.booking.notes}
            </label>
            <textarea
              id="notes"
              rows={4}
              value={form.notes}
              onChange={e => set("notes", e.target.value)}
              placeholder={t.booking.notesPlaceholder}
              className="w-full resize-y border border-line bg-white p-4 text-[0.9375rem] text-ink placeholder:text-muted-foreground focus:border-pistachio focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              data-press
              className="flex min-h-12 flex-1 items-center justify-center gap-2.5 bg-turquoise px-7 text-[0.875rem] text-white transition-colors hover:bg-deep disabled:opacity-60">
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" strokeWidth={1.5} />
                  {t.booking.submitting}
                </>
              ) : (
                <>
                  <Send className="rtl-flip size-4" strokeWidth={1.5} />
                  {t.booking.submit}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={openWhatsapp}
              data-press
              className="flex min-h-12 items-center justify-center border border-line bg-white px-7 text-[0.875rem] text-ink transition-colors hover:border-pistachio">
              {t.booking.orWhatsapp}
            </button>
          </div>
        </form>

        <SectionDivider motif="vine" className="mt-14" />

        <a
          href={`tel:${CONTACT.phone}`}
          dir="ltr"
          data-press
          className="mt-8 flex min-h-12 items-center justify-center gap-2.5 text-[0.9375rem] text-ink">
          <Phone className="size-4 text-turquoise" strokeWidth={1.5} />
          {CONTACT.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
