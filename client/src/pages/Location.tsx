import { useRef, useState } from "react";
import { Clock, MapPin, Navigation, Route } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ShareButton from "@/components/ShareButton";
import { MapView } from "@/components/Map";
import { ATTRACTIONS, LOCATION } from "@shared/venue";
import { useI18n } from "@/i18n";

export default function Location() {
  const { t } = useI18n();
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const center = { lat: LOCATION.lat, lng: LOCATION.lng };

  /** Property pin plus one pin per attraction, labelled with drive time. */
  const onMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    setMapReady(true);
    const g = window.google;
    if (!g?.maps?.marker) return;

    const propertyPin = document.createElement("div");
    propertyPin.style.cssText =
      "background:#2E7D74;color:#fff;padding:7px 13px;font:500 12px/1.2 sans-serif;border:2px solid #D4AF37;white-space:nowrap";
    propertyPin.textContent = t.brand.name;

    new g.maps.marker.AdvancedMarkerElement({
      map,
      position: center,
      title: t.brand.name,
      content: propertyPin,
      zIndex: 100,
    });

    const bounds = new g.maps.LatLngBounds();
    bounds.extend(center);

    for (const a of ATTRACTIONS) {
      const info = t.location.attractions[a.id as keyof typeof t.location.attractions];
      const el = document.createElement("div");
      el.style.cssText =
        "background:#fff;color:#2C3531;padding:5px 10px;font:400 11px/1.2 sans-serif;border:1px solid #93A889;white-space:nowrap";
      el.textContent = `${info.title} · ${a.minutes} ${t.common.minutes}`;

      const marker = new g.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: a.lat, lng: a.lng },
        title: info.title,
        content: el,
      });
      marker.addListener("click", () => {
        window.open(
          `https://www.google.com/maps/dir/?api=1&origin=${center.lat},${center.lng}&destination=${a.lat},${a.lng}`,
          "_blank",
          "noopener",
        );
      });
      bounds.extend({ lat: a.lat, lng: a.lng });
    }

    map.fitBounds(bounds, 56);
  };

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;

  return (
    <div className="container py-16 md:py-20">
      <SectionHeading
        eyebrow={t.location.eyebrow}
        title={t.location.title}
        intro={t.location.intro}
      />

      <div className="relative mt-12 border border-line">
        {!mapReady && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted">
            <span className="sv-eyebrow">{t.location.eyebrow}</span>
          </div>
        )}
        <MapView
          className="h-[24rem] w-full md:h-[32rem]"
          initialCenter={center}
          initialZoom={10}
          onMapReady={onMapReady}
        />
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="sv-eyebrow mb-3">{t.location.addressTitle}</h2>
          <p className="flex items-start gap-2.5 text-[0.9375rem] text-ink">
            <MapPin className="mt-1 size-4 shrink-0 text-turquoise" strokeWidth={1.5} />
            {t.location.addressValue}
          </p>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-press
            className="mt-5 inline-flex min-h-12 items-center gap-2.5 bg-turquoise px-7 text-[0.875rem] text-white transition-colors hover:bg-deep">
            <Navigation className="size-4" strokeWidth={1.5} />
            {t.location.driveTime}
          </a>
        </div>
        <div>
          <h2 className="sv-eyebrow mb-3">{t.location.openTitle}</h2>
          <p className="flex items-center gap-2.5 text-[0.9375rem] text-ink">
            <Clock className="size-4 shrink-0 text-turquoise" strokeWidth={1.5} />
            {t.location.openValue}
          </p>
        </div>
      </div>

      {/* Full distance table, ordered by drive time. */}
      <table className="mt-16 w-full border-collapse">
        <thead>
          <tr className="border-b border-ink/15">
            <th scope="col" className="sv-eyebrow py-3 text-start">
              {t.location.eyebrow}
            </th>
            <th scope="col" className="sv-eyebrow py-3 text-end whitespace-nowrap">
              {t.location.driveTime}
            </th>
            <th scope="col" className="sv-eyebrow hidden py-3 text-end sm:table-cell">
              {t.common.km}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {ATTRACTIONS.map(a => {
            const info = t.location.attractions[a.id as keyof typeof t.location.attractions];
            return (
              <tr key={a.id}>
                <td className="py-5 pe-4">
                  <p className="text-[1rem] text-ink">{info.title}</p>
                  <p className="mt-1.5 max-w-[52ch] text-[0.8125rem] text-muted-foreground">
                    {info.note}
                  </p>
                </td>
                <td className="py-5 text-end align-top font-serif text-[1.0625rem] whitespace-nowrap text-turquoise">
                  {a.minutes} {t.common.minutes}
                </td>
                <td className="hidden py-5 text-end align-top text-[0.875rem] whitespace-nowrap text-muted-foreground sm:table-cell">
                  <span className="inline-flex items-center gap-1.5">
                    <Route className="size-3.5" strokeWidth={1.5} />
                    {a.km}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ShareButton className="mt-16 justify-center" />
    </div>
  );
}
