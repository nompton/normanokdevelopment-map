import type { Metadata } from "next";
import "./globals.css";

// Per-city metadata, chosen at build time via NEXT_PUBLIC_MAP_SITE (defaults to
// Norman). Keep in sync with data/mapSite.ts.
const META = {
  norman: {
    name: "Norman Development",
    place: "Norman, Oklahoma",
    mapUrl: "https://map.normanokdevelopment.com",
  },
  bixby: {
    name: "Bixby Development",
    place: "Bixby, Oklahoma",
    mapUrl: "https://map.bixbyokdevelopment.com",
  },
  noble: {
    name: "Noble Development",
    place: "Noble, Oklahoma",
    mapUrl: "https://map.nobleokdevelopment.com",
  },
};

const MAP_SITE = process.env.NEXT_PUBLIC_MAP_SITE as keyof typeof META | undefined;
const m = (MAP_SITE && META[MAP_SITE]) || META.norman;

export const metadata: Metadata = {
  title: `${m.name} Map — ${m.place}`,
  description: `Interactive map of commercial and residential development projects across ${m.place}. Track proposed, planned, and under-construction projects with site plans and coverage from ${m.name}.`,
  metadataBase: new URL(m.mapUrl),
  openGraph: {
    title: `${m.name} Map`,
    description: `Track development projects across ${m.place}.`,
    url: m.mapUrl,
    siteName: m.name,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
