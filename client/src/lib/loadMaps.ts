/** Loads Google Maps directly with a browser-restricted public API key. */
let pending: Promise<boolean> | null = null;

export function mapsScriptUrl(apiKey: string, libraries: string) {
  return `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly&libraries=${encodeURIComponent(libraries)}`;
}

export function loadGoogleMaps(
  libraries = "marker",
): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.google?.maps?.marker) return Promise.resolve(true);
  if (pending) return pending;
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) return Promise.resolve(false);

  pending = new Promise<boolean>(resolve => {
    const script = document.createElement("script");
    script.src = mapsScriptUrl(apiKey, libraries);
    script.async = true;

    script.onload = () => {
      // A stub response (missing config, upstream error) parses fine but
      // never defines the API, so verify before reporting success.
      resolve(Boolean(window.google?.maps));
    };
    script.onerror = () => resolve(false);

    document.head.appendChild(script);
  });

  return pending;
}
