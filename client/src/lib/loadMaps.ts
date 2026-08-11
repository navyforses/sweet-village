/**
 * Loads the Google Maps JS API through our own server hop
 * (`/api/maps/js`), which sidesteps the Forge proxy's browser-Origin
 * allowlist. Resolves false when maps are unavailable so callers can fall
 * back to a static alternative instead of showing an empty box forever.
 */
let pending: Promise<boolean> | null = null;

export function loadGoogleMaps(
  libraries = "marker",
): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.google?.maps?.marker) return Promise.resolve(true);
  if (pending) return pending;

  pending = new Promise<boolean>(resolve => {
    const script = document.createElement("script");
    script.src = `/api/maps/js?libraries=${encodeURIComponent(libraries)}`;
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

