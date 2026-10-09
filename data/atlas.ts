// ATLAS (GRID Real Estate portal) parcel facts for a pin's tied story — a small
// TS port of the news site's lib/atlas.js so the map can show the property
// signal (a sale, a permit, a tenant) behind a development pin.
export const ATLAS = "https://portal.thegridre.com";

export interface Permit {
  permit: string;
  category?: string | null;
  date?: string | null;
  kind?: string | null; // "building" | "demolition"
  tenant?: string | null;
  valuation?: number | null;
}
export interface Parcel {
  account: string;
  address?: string | null;
  salePrice?: number | null;
  saleDate?: string | null;
  sqft?: number | null;
  pricePerSqft?: number | null;
  marketValue?: number | null;
  landUse?: string | null;
  accountType?: string | null;
  subdivision?: string | null;
  owner?: string | null;
  investorOwned?: boolean;
  permits?: Permit[];
}
export interface Lead {
  kind: string;
  icon: string;
  tone: "green" | "amber" | "neutral";
  label: string;
  detail: string;
  date: string;
}

export const usd = (n: number | null | undefined) => (n == null ? null : "$" + Number(n).toLocaleString());
export const num = (n: number | null | undefined) => (n == null ? null : Number(n).toLocaleString());
export function usdShort(n: number | null | undefined): string | null {
  if (n == null) return null;
  const v = Number(n);
  if (!Number.isFinite(v)) return null;
  if (v >= 1_000_000) return "$" + (v / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (v >= 10_000) return "$" + Math.round(v / 1000) + "K";
  return "$" + v.toLocaleString();
}
export function fmtMonth(d?: string | null): string {
  try {
    const [y, m] = String(d).split("-");
    return ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][+m] + " " + y;
  } catch { return String(d || ""); }
}
export function permitLabel(cat?: string | null): string | null {
  const s = String(cat || "").replace(/^commercial,\s*/i, "").trim();
  return s || null;
}
export function cap(s?: string | null): string | null {
  const t = String(s || "").trim();
  if (!t) return null;
  return t.replace(/\b([A-Z])([A-Z'&.]+)\b/g, (m, a, b) => (m.length <= 3 ? m : a + b.toLowerCase()));
}

export function leadSignal(p: Parcel): Lead | null {
  const permits = (Array.isArray(p.permits) ? p.permits : []).filter(Boolean);
  const latestPermit = permits.reduce<Permit | null>((best, pm) =>
    (!best || String(pm.date || "") > String(best.date || "")) ? pm : best, null);
  const permitYM = latestPermit?.date ? String(latestPermit.date).slice(0, 7) : null;
  const saleYM = p.saleDate ? String(p.saleDate).slice(0, 7) : null;
  const permitIsNewer = !!permitYM && (!saleYM || permitYM >= saleYM);

  if (latestPermit && permitIsNewer) {
    if (latestPermit.kind === "demolition") {
      return { kind: "demolition", icon: "🏚", tone: "amber", label: "Demolition permit", detail: latestPermit.date ? `Filed ${fmtMonth(latestPermit.date)}` : "Permit on file", date: latestPermit.date || "" };
    }
    const who = cap(latestPermit.tenant);
    const kind = permitLabel(latestPermit.category) || "Building permit";
    const bits = [latestPermit.date ? fmtMonth(latestPermit.date) : null, latestPermit.valuation ? usdShort(latestPermit.valuation) : null].filter(Boolean);
    return { kind: who ? "tenant" : "permit", icon: "🏗", tone: "green", label: who || kind, detail: [who ? kind : null, ...bits].filter(Boolean).join(" · "), date: latestPermit.date || "" };
  }
  if (p.salePrice) {
    const bits = [p.saleDate ? fmtMonth(p.saleDate) : null, p.investorOwned ? "investor buyer" : null].filter(Boolean);
    return { kind: "sale", icon: "💰", tone: "green", label: `Last sold for ${usdShort(p.salePrice)}`, detail: bits.join(" · "), date: p.saleDate || "" };
  }
  if (p.owner) {
    return { kind: "owner", icon: "🏢", tone: "neutral", label: p.owner, detail: p.investorOwned ? "Investor-owned" : "Owner of record", date: "" };
  }
  if (p.sqft) {
    return { kind: "size", icon: "📐", tone: "neutral", label: `${num(p.sqft)} sq ft`, detail: [p.accountType, p.landUse].filter(Boolean).join(" · "), date: "" };
  }
  return null;
}

// A pin links to its story via article URLs (post_id isn't populated). Parse the
// story slug from the first article on the news site's own domain.
export function slugFromArticles(articles: { url?: string }[] | undefined, newsOrigin: string): string | null {
  for (const a of articles || []) {
    const u = a?.url || "";
    if (!u.startsWith(newsOrigin)) continue;
    try {
      const seg = new URL(u).pathname.replace(/\/+$/, "").split("/").filter(Boolean).pop();
      if (seg) return seg;
    } catch { /* skip */ }
  }
  return null;
}

// Fetch the parcels tied to a story. Guards against ATLAS's per-site echo (so we
// never show another city's data). Returns [] on any error.
export async function fetchParcels(slug: string, siteKey: string): Promise<Parcel[]> {
  try {
    const r = await fetch(`${ATLAS}/api/public/development?slug=${encodeURIComponent(slug)}&site=${encodeURIComponent(siteKey)}`, { cache: "no-store" });
    const d = await r.json();
    if (d && (!d.site || d.site === siteKey) && Array.isArray(d.parcels)) return d.parcels as Parcel[];
    return [];
  } catch { return []; }
}
