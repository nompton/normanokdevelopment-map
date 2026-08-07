// Multi-tenant config for the Development News Network map. One codebase serves
// each city's map (map.normanokdevelopment.com, map.bixbyokdevelopment.com …).
//
// Selection order:
//   1. NEXT_PUBLIC_MAP_SITE at build time (cleanest for a static export — build
//      one bundle per domain), else
//   2. the request hostname at runtime (so a single deployment can serve both).
export type MapSiteKey = "norman" | "bixby" | "noble";

export interface MapSiteConfig {
  key: MapSiteKey;
  name: string;          // "Norman Development"
  homeUrl: string;       // news site
  homeLabel: string;     // display text for the link
  apiOrigin: string;     // where /api/sites lives (the news backend)
  center: [number, number];
  zoom: number;
  brand: string;         // header + accent colour
  logo: string;          // wordmark shown in the header
  icon: string;          // square mark shown in the header
  // County parcel ArcGIS FeatureServer (layer 1). Omit to hide the parcel
  // overlay for cities we don't have a source for yet.
  parcelService?: string;
}

export const MAP_SITES: Record<MapSiteKey, MapSiteConfig> = {
  norman: {
    key: "norman",
    name: "Norman Development",
    homeUrl: "https://normanokdevelopment.com",
    homeLabel: "normanokdevelopment.com",
    apiOrigin: "https://normanokdevelopment.com",
    center: [35.2226, -97.4395],
    zoom: 13,
    brand: "#3a8a6e",
    logo: "/logo.png",
    icon: "/icon.png",
    parcelService:
      "https://services.arcgis.com/rt1leD4Hj3sLGHNL/arcgis/rest/services/Parcels/FeatureServer/1",
  },
  bixby: {
    key: "bixby",
    name: "Bixby Development",
    homeUrl: "https://bixbyokdevelopment.com",
    homeLabel: "bixbyokdevelopment.com",
    apiOrigin: "https://bixbyokdevelopment.com",
    center: [35.942, -95.8833], // Bixby, OK
    zoom: 13,
    brand: "#c8203a",
    logo: "/logo-bixby.svg",
    icon: "/icon-bixby.svg",
    // Bixby is in Tulsa County — drop the Tulsa County parcel FeatureServer URL
    // here to enable the parcel overlay. Hidden until then.
    parcelService: undefined,
  },
  noble: {
    key: "noble",
    name: "Noble Development",
    homeUrl: "https://nobleokdevelopment.com",
    homeLabel: "nobleokdevelopment.com",
    apiOrigin: "https://nobleokdevelopment.com",
    center: [35.1387, -97.3939], // Noble, OK
    zoom: 14,
    brand: "#1e5fbf",
    logo: "/logo-noble.svg",
    icon: "/icon-noble.svg",
    // Noble is in Cleveland County — same parcel FeatureServer as Norman.
    parcelService:
      "https://services.arcgis.com/rt1leD4Hj3sLGHNL/arcgis/rest/services/Parcels/FeatureServer/1",
  },
};

export function resolveMapSite(): MapSiteConfig {
  const override = process.env.NEXT_PUBLIC_MAP_SITE as MapSiteKey | undefined;
  if (override && MAP_SITES[override]) return MAP_SITES[override];
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (/bixby/i.test(host)) return MAP_SITES.bixby;
    if (/noble/i.test(host)) return MAP_SITES.noble;
  }
  return MAP_SITES.norman;
}
