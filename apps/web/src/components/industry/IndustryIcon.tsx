import type { SVGProps } from "react";
import type { IndustryId } from "./industries";

interface Props extends Omit<SVGProps<SVGSVGElement>, "name" | "stroke"> {
  id: IndustryId;
  size?: number;
  /** Stroke width in px (default 1.6) */
  stroke?: number;
}

/**
 * One simple line-style SVG icon per industry. Matches the `@expertcont/ui`
 * Icon conventions (24×24 grid, currentColor stroke, round caps/joins).
 * Decorative — rendered aria-hidden.
 */
export function IndustryIcon({ id, size = 40, stroke = 1.6, ...rest }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor" as const,
    strokeWidth: stroke,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...rest,
  };
  const dot = { fill: "currentColor", stroke: "none" as const };

  switch (id) {
    case "tech-and-saas": // browser window with code — software in the cloud
      return (
        <svg {...common}>
          <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
          <path d="M2.5 8.5h19" />
          <circle cx="5.5" cy="6.25" r="0.5" {...dot} />
          <circle cx="7.6" cy="6.25" r="0.5" {...dot} />
          <circle cx="9.7" cy="6.25" r="0.5" {...dot} />
          <polyline points="9 12.5 6.8 14.5 9 16.5" />
          <polyline points="15 12.5 17.2 14.5 15 16.5" />
          <line x1="11.4" y1="17" x2="12.6" y2="12" />
        </svg>
      );
    case "e-commerce": // shopping cart with goods
      return (
        <svg {...common}>
          <path d="M2 3h2.3a1 1 0 0 1 1 .8L7.2 13.5a1.2 1.2 0 0 0 1.18.95h8.1a1.2 1.2 0 0 0 1.17-.92l1.45-6.1a1 1 0 0 0-.97-1.23H6" />
          <path d="M10 9.5h5.5" />
          <circle cx="9" cy="20" r="1.6" />
          <circle cx="17" cy="20" r="1.6" />
        </svg>
      );
    case "retail": // storefront with scalloped awning
      return (
        <svg {...common}>
          <path d="M4 10v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9" />
          <path d="M3 7l1.3-2.5A1 1 0 0 1 5.2 4h13.6a1 1 0 0 1 .9.5L21 7" />
          <path d="M3 7a2.1 2.1 0 0 0 4.5 0 2.1 2.1 0 0 0 4.5 0 2.1 2.1 0 0 0 4.5 0A2.1 2.1 0 0 0 21 7" />
          <path d="M9.5 20v-4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v4" />
        </svg>
      );
    case "horeca": // serving cloche on a tray
      return (
        <svg {...common}>
          <path d="M3.5 16.5a8.5 8.5 0 0 1 17 0" />
          <line x1="2" y1="16.5" x2="22" y2="16.5" />
          <path d="M4.5 19.5h15" />
          <line x1="12" y1="8" x2="12" y2="6.2" />
          <circle cx="12" cy="5.4" r="1" />
        </svg>
      );
    case "constructii": // hard hat with crown ridges
      return (
        <svg {...common}>
          <path d="M2 18h20" />
          <path d="M4.5 18a7.5 7.5 0 0 1 15 0" />
          <path d="M9 18V9.2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V18" />
          <line x1="12" y1="8" x2="12" y2="18" />
        </svg>
      );
    case "productie": // factory with saw-tooth roof, chimney and windows
      return (
        <svg {...common}>
          <path d="M3 21h18" />
          <path d="M3 21V10.5l5 3.3V10.5l5 3.3V8.2a1 1 0 0 1 1-1h3.6a1 1 0 0 1 1 .92L19 21" />
          <path d="M16.8 7V4h2.2v3" />
          <path d="M6.5 17.5h1.2M11 17.5h1.2M15.5 17.5h1.2" />
        </svg>
      );
    case "servicii-profesionale": // briefcase with handle, divider and clasp
      return (
        <svg {...common}>
          <rect x="2.5" y="7" width="19" height="13" rx="2" />
          <path d="M8 7V5.6A1.6 1.6 0 0 1 9.6 4h4.8A1.6 1.6 0 0 1 16 5.6V7" />
          <path d="M2.5 12.5h19" />
          <path d="M10.5 12v1.6a1.5 1.5 0 0 0 3 0V12" />
        </svg>
      );
    case "ong": // heart with a check — care you can trust
      return (
        <svg {...common}>
          <path d="M12 21C7.2 17 4 14 4 10.4A4.4 4.4 0 0 1 12 7.2 4.4 4.4 0 0 1 20 10.4C20 14 16.8 17 12 21z" />
          <polyline points="8.6 11.6 11 14 15.2 9.8" />
        </svg>
      );
    case "logistica-si-transport": // box van with cab and wheels
      return (
        <svg {...common}>
          <path d="M2 6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v9.5H2z" />
          <path d="M13 9h3.7a1 1 0 0 1 .8.4l2.3 3a1 1 0 0 1 .2.6v2.5h-7z" />
          <path d="M2 15.5h18.9" />
          <path d="M16.5 12.2h3" />
          <circle cx="6.5" cy="17.5" r="2" />
          <circle cx="17.5" cy="17.5" r="2" />
        </svg>
      );
    case "sanatate": // heart with an ECG pulse line
      return (
        <svg {...common}>
          <path d="M12 21C7.2 17 4 14 4 10.4A4.4 4.4 0 0 1 12 7.2 4.4 4.4 0 0 1 20 10.4C20 14 16.8 17 12 21z" />
          <polyline points="6.5 12.8 9.2 12.8 10.6 10.4 12.4 14.6 13.6 12.8 17.5 12.8" />
        </svg>
      );
    case "agricultura": // sprout with two leaves and the rising sun
      return (
        <svg {...common}>
          <path d="M5 21h14" />
          <path d="M12 21v-8.5" />
          <path d="M12 13C12 9.4 9.2 6.8 5.4 6.8 5.4 10.4 8.2 13 12 13z" />
          <path d="M12 13.6c0-3 2.4-5.6 5.6-5.6C17.6 11 15.2 13.6 12 13.6z" />
          <path d="M8.8 5a5.5 5.5 0 0 1 6.4 0" />
        </svg>
      );
    case "imobiliare": // house with roof, door, window and chimney
      return (
        <svg {...common}>
          <path d="M3 11.2 12 4l9 7.2" />
          <path d="M5.2 9.8V20a1 1 0 0 0 1 1h11.6a1 1 0 0 0 1-1V9.8" />
          <path d="M10 21v-4.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V21" />
          <rect x="7" y="12" width="2.6" height="2.6" rx="0.4" />
          <path d="M16.5 7.6V5h2v4.1" />
        </svg>
      );
  }
}
