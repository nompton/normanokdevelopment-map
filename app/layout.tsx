import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Norman Development Map — normanokdevelopment.com",
  description:
    "Interactive map of commercial and residential development projects across Norman, Oklahoma. Track proposed, planned, and under-construction projects with site plans and coverage from Norman Development.",
  metadataBase: new URL("https://map.normanokdevelopment.com"),
  openGraph: {
    title: "Norman Development Map",
    description: "Track development projects across Norman, Oklahoma.",
    url: "https://map.normanokdevelopment.com",
    siteName: "Norman Development",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
