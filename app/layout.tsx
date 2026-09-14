import type { Metadata, Viewport } from "next";
import "./globals.css";

// Per-city metadata, chosen at build time via NEXT_PUBLIC_MAP_SITE (defaults to
// Norman). Keep in sync with data/mapSite.ts.
const META = {
  norman: {
    name: "Norman Development",
    place: "Norman, Oklahoma",
    mapUrl: "https://map.normanokdevelopment.com",
    icon: "/icon.png",
    brand: "#3a8a6e",
  },
  bixby: {
    name: "Bixby Development",
    place: "Bixby, Oklahoma",
    mapUrl: "https://map.bixbyokdevelopment.com",
    icon: "/icon-bixby.png",
    brand: "#c8203a",
  },
  noble: {
    name: "Noble Development",
    place: "Noble, Oklahoma",
    mapUrl: "https://map.nobleokdevelopment.com",
    icon: "/icon-noble.png",
    brand: "#1e5fbf",
  },
};

const MAP_SITE = process.env.NEXT_PUBLIC_MAP_SITE as keyof typeof META | undefined;
const m = (MAP_SITE && META[MAP_SITE]) || META.norman;

export const metadata: Metadata = {
  title: `${m.name} Map — ${m.place}`,
  description: `Interactive map of commercial and residential development projects across ${m.place}. Track proposed, planned, and under-construction projects with site plans and coverage from ${m.name}.`,
  metadataBase: new URL(m.mapUrl),
  // Canonical bakes to the default (Norman) build; the Pages middleware rewrites
  // the href per hostname so each city map self-canonicalises (and the
  // *.pages.dev preview points at the real custom domain).
  alternates: { canonical: m.mapUrl },
  robots: { index: true, follow: true, "max-image-preview": "large" } as Metadata["robots"],
  applicationName: `${m.name} Map`,
  keywords: [
    `${m.place} development`, `${m.place} construction`, `${m.place} new businesses`,
    `${m.place} real estate`, `${m.place} development map`, "commercial development", "residential development",
  ],
  // Raster icons per city so the browser tab / search result shows the brand
  // mark instead of a generic globe.
  icons: { icon: [{ url: m.icon, type: "image/png" }], apple: m.icon, shortcut: m.icon },
  openGraph: {
    title: `${m.name} Map`,
    description: `Track development projects across ${m.place}.`,
    url: m.mapUrl,
    siteName: m.name,
    images: [{ url: m.icon, width: 512, height: 512, alt: `${m.name} Map` }],
  },
  twitter: {
    card: "summary",
    title: `${m.name} Map`,
    description: `Track development projects across ${m.place}.`,
    images: [m.icon],
  },
};

export const viewport: Viewport = { themeColor: m.brand };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
