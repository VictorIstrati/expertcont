import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

interface Props {
  latitude: number;
  longitude: number;
  /** Plain-text address shown in the popup body. */
  address: string;
  /** Bold heading line shown in the popup (e.g. "Biroul ExpertCont"). */
  label: string;
}

export function OfficeMap({ latitude, longitude, address, label }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    // Leaflet touches `window` at module load, so it can't be a top-level
    // import — Astro SSRs this component during build. Dynamic import keeps
    // the bundle browser-only.
    (async () => {
      const { default: L } = await import("leaflet");

      if (cancelled || !containerRef.current) return;

      // Brand-colored SVG pin — accent gold body, primary-deep ring + white
      // inner dot for max contrast on satellite imagery. Drop shadow lifts
      // the pin off the tile background.
      const pinSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 48" width="36" height="48">
  <defs>
    <filter id="ec-pin-shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-opacity="0.35"/>
    </filter>
  </defs>
  <path d="M18 2 C9.16 2 2 9.16 2 18 C2 26.46 12.4 39.6 16.6 44.66 C17.33 45.55 18.67 45.55 19.4 44.66 C23.6 39.6 34 26.46 34 18 C34 9.16 26.84 2 18 2 Z"
        fill="#dfb741" stroke="#1e2a4a" stroke-width="2" stroke-linejoin="round" filter="url(#ec-pin-shadow)"/>
  <circle cx="18" cy="18" r="6" fill="#ffffff" stroke="#1e2a4a" stroke-width="1.5"/>
</svg>`.trim();
      const iconDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(pinSvg)}`;
      const icon = L.icon({
        iconUrl: iconDataUrl,
        iconSize: [36, 48],
        iconAnchor: [18, 46],
        popupAnchor: [0, -42],
      });

      const map = L.map(containerRef.current, {
        center: [latitude, longitude],
        zoom: 17,
        scrollWheelZoom: false,
      });

      // CartoDB Positron — minimal grayscale, free, no API key. Lets the
      // brand-colored marker stand out against a neutral background.
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(map);

      const escape = (s: string) =>
        s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

      const popupHtml = `
        <div class="min-w-[180px]">
          <strong>${escape(label)}</strong>
          <div class="mt-1 text-xs text-text-secondary">${escape(address)}</div>
        </div>
      `;

      L.marker([latitude, longitude], { icon }).addTo(map).bindPopup(popupHtml).openPopup();

      cleanup = () => map.remove();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [latitude, longitude, address, label]);

  return (
    <div
      ref={containerRef}
      className="aspect-4/3 w-full overflow-hidden rounded-lg border border-border"
      aria-label={label}
    />
  );
}
