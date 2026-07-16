"use client";

import { useEffect, useRef, useState } from "react";
import { SITES as BUNDLED_SITES, DevelopmentSite, SiteStatus } from "../data/sites";

const BRAND = "#3a8a6e";
const GRID_URL = "https://thegridre.com";

const STATUS_CONFIG: Record<SiteStatus, { label: string; color: string; dot: string; tip: string }> = {
  proposed:             { label: "Proposed",           color: "bg-amber-50 text-amber-800 border-amber-200",         dot: "#f59e0b", tip: "Announced or rumored — no city filing yet" },
  planned:              { label: "Planned",             color: "bg-blue-50 text-blue-800 border-blue-200",           dot: "#3b82f6", tip: "Platted, city council approved, or permits filed" },
  "under-construction": { label: "Under Construction",  color: "bg-orange-50 text-orange-800 border-orange-200",     dot: "#f97316", tip: "Actively being built" },
  completed:            { label: "Completed",           color: "bg-emerald-50 text-emerald-800 border-emerald-200",  dot: "#3a8a6e", tip: "Open / finished" },
  cancelled:            { label: "Cancelled",           color: "bg-neutral-100 text-neutral-500 border-neutral-200", dot: "#9ca3af", tip: "Officially withdrawn or abandoned" },
};

const ALL_STATUSES = Object.keys(STATUS_CONFIG) as SiteStatus[];

function StatusBadge({ status }: { status: SiteStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${cfg.color}`}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
      {cfg.label}
    </span>
  );
}

const PARCEL_SERVICE = "https://services.arcgis.com/rt1leD4Hj3sLGHNL/arcgis/rest/services/Parcels/FeatureServer/1";

export default function Page() {
  const mapRef        = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef    = useRef<Record<string, any>>({});
  const baseLayerRef  = useRef<any>(null);
  const aerialLayerRef = useRef<any>(null);
  const parcelLayerRef = useRef<any>(null);
  const gridLayerRef  = useRef<any>(null);

  const [selected, setSelected]     = useState<DevelopmentSite | null>(null);
  const [pdfOpen, setPdfOpen]       = useState(false);
  const [listOpen, setListOpen]     = useState(true);           // desktop sidebar
  const [sheet, setSheet]           = useState<"hidden" | "list" | "detail">("hidden"); // mobile
  const [activeFilters, setActiveFilters] = useState<Set<SiteStatus>>(new Set(ALL_STATUSES));
  const [search, setSearch]         = useState("");
  const [baseMap, setBaseMap]       = useState<"street" | "aerial">("street");
  const [showParcels, setShowParcels] = useState(false);
  const [parcelLoading, setParcelLoading] = useState(false);
  const [showGrid, setShowGrid]     = useState(false);
  const [SITES, setSITES]           = useState<DevelopmentSite[]>(BUNDLED_SITES);
  const [mapReady, setMapReady]     = useState(false);

  // ── LIVE DATA ─────────────────────────────────────────────────────────────
  // Pull sites from the news-site backend so they can be managed from one admin.
  // Falls back to the bundled data/sites.ts list if the API is unreachable.
  useEffect(() => {
    let cancelled = false;
    const url = process.env.NEXT_PUBLIC_SITES_API || "https://normanokdevelopment.com/api/sites";
    fetch(url, { cache: "no-store" })
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then(data => {
        const list = Array.isArray(data) ? data : data?.sites;
        if (!cancelled && Array.isArray(list) && list.length) setSITES(list);
      })
      .catch(() => { /* keep bundled fallback */ });
    return () => { cancelled = true; };
  }, []);

  // ── MAP INIT ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    function initMap(L: any) {
      const map = L.map(mapRef.current!, { scrollWheelZoom: true, zoomControl: false })
        .setView([35.2226, -97.4395], 13);
      mapInstanceRef.current = map;

      L.control.zoom({ position: "bottomright" }).addTo(map);

      const street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      });
      street.addTo(map);
      baseLayerRef.current = street;

      aerialLayerRef.current = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { attribution: "Tiles © Esri", maxZoom: 19 }
      );

      setMapReady(true);
    }

    if (!document.querySelector("#leaflet-css")) {
      const link = Object.assign(document.createElement("link"), {
        id: "leaflet-css", rel: "stylesheet",
        href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
      });
      document.head.appendChild(link);
    }

    const load = (cb: (L: any) => void) => {
      if ((window as any).L) { cb((window as any).L); return; }
      const s = Object.assign(document.createElement("script"), {
        src: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
        onload: () => cb((window as any).L),
      });
      document.head.appendChild(s);
    };
    load(initMap);
    return () => { mapInstanceRef.current?.remove(); mapInstanceRef.current = null; };
  }, []);

  // ── BUILD / REBUILD MARKERS (runs once the map is ready, and whenever the
  //    live SITES list loads or changes) ──────────────────────────────────────
  useEffect(() => {
    const map = mapInstanceRef.current;
    const L = (window as any).L;
    if (!mapReady || !map || !L) return;
    Object.values(markersRef.current).forEach((m: any) => m.remove());
    markersRef.current = {};
    SITES.forEach((site) => {
      const cfg = STATUS_CONFIG[site.status];
      const icon = L.divIcon({
        className: "",
        html: `<div style="width:14px;height:14px;background:${cfg.dot};border:2.5px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,.4)"></div>`,
        iconSize: [14, 14], iconAnchor: [7, 7],
      });
      const marker = L.marker([site.lat, site.lng], { icon }).addTo(map);
      marker.on("click", () => { setSelected(site); setSheet("detail"); });
      markersRef.current[site.id] = marker;
    });
  }, [mapReady, SITES]);

  // ── INVALIDATE SIZE ───────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => mapInstanceRef.current?.invalidateSize(), 80);
    return () => clearTimeout(t);
  }, [listOpen, sheet]);

  // ── FILTER MARKERS ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    SITES.forEach((site) => {
      const m = markersRef.current[site.id];
      if (!m) return;
      activeFilters.has(site.status) ? m.addTo(mapInstanceRef.current) : m.remove();
    });
    if (selected && !activeFilters.has(selected.status)) setSelected(null);
  }, [activeFilters, selected, SITES, mapReady]);

  // ── BASE LAYER ────────────────────────────────────────────────────────────
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !baseLayerRef.current || !aerialLayerRef.current) return;
    if (baseMap === "aerial") {
      map.removeLayer(baseLayerRef.current);
      aerialLayerRef.current.addTo(map);
    } else {
      map.removeLayer(aerialLayerRef.current);
      baseLayerRef.current.addTo(map);
    }
  }, [baseMap]);

  // ── PLSS GRID ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const map = mapInstanceRef.current;
    const L = (window as any).L;
    if (!map || !L) return;
    if (showGrid) {
      gridLayerRef.current = L.tileLayer(
        "https://gis.blm.gov/arcgis/rest/services/Cadastral/BLM_Natl_PLSS_CadNSDI/MapServer/tile/{z}/{y}/{x}",
        { attribution: "BLM PLSS", maxZoom: 19, opacity: 0.55 }
      ).addTo(map);
    } else {
      if (gridLayerRef.current) { map.removeLayer(gridLayerRef.current); gridLayerRef.current = null; }
    }
  }, [showGrid]);

  // ── PARCELS ───────────────────────────────────────────────────────────────
  const showParcelsRef = useRef(false);
  const baseMapRef     = useRef<"street" | "aerial">("street");
  showParcelsRef.current = showParcels;
  baseMapRef.current     = baseMap;

  async function fetchParcels() {
    const map = mapInstanceRef.current;
    const L = (window as any).L;
    if (!map || !L) return;
    const b = map.getBounds();
    const bbox = [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()].join(",");
    const color = baseMapRef.current === "aerial" ? "#ffffff" : "#e67e22";
    setParcelLoading(true);
    try {
      const res = await fetch(
        `${PARCEL_SERVICE}/query?where=1%3D1&geometry=${encodeURIComponent(bbox)}` +
        `&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects` +
        `&outFields=F_ADD,STREET_NAME&f=geojson&resultRecordCount=500`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const geojson = await res.json();
      if (parcelLayerRef.current) { map.removeLayer(parcelLayerRef.current); parcelLayerRef.current = null; }
      if (!showParcelsRef.current) return;
      parcelLayerRef.current = L.geoJSON(geojson, {
        style: { color, weight: 1, opacity: 0.8, fillOpacity: 0.05, fillColor: color },
        onEachFeature: (f: any, layer: any) => {
          const p = f.properties;
          if (p?.STREET_NAME) layer.bindTooltip(`${p.F_ADD ?? ""} ${p.STREET_NAME}`.trim(), { sticky: true });
        },
      }).addTo(map);
    } catch (e) { console.error("Parcel fetch error", e); }
    setParcelLoading(false);
  }

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (!showParcels) {
      if (parcelLayerRef.current) { map.removeLayer(parcelLayerRef.current); parcelLayerRef.current = null; }
      return;
    }
    fetchParcels();
    map.on("moveend", fetchParcels);
    return () => { map.off("moveend", fetchParcels); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showParcels]);

  useEffect(() => {
    if (showParcelsRef.current) fetchParcels();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseMap]);

  // ── HELPERS ───────────────────────────────────────────────────────────────
  function flyTo(site: DevelopmentSite) {
    setSelected(site);
    mapInstanceRef.current?.flyTo([site.lat, site.lng], 17, { duration: 0.8 });
  }

  function toggleFilter(s: SiteStatus) {
    setActiveFilters(prev => { const n = new Set(prev); n.has(s) ? n.delete(s) : n.add(s); return n; });
  }

  const filteredSites = SITES.filter(s =>
    activeFilters.has(s.status) &&
    (search === "" || s.name.toLowerCase().includes(search.toLowerCase()) ||
     s.address.toLowerCase().includes(search.toLowerCase()))
  );

  const sans = { fontFamily: "Arial, Helvetica, sans-serif" };
  const sheetOpen = sheet !== "hidden";

  return (
    <div className="flex flex-col bg-white overflow-hidden" style={{ ...sans, height: "100dvh" }}>

      {/* ── HEADER ── */}
      <header className="shrink-0 z-50" style={{ background: BRAND }}>
        <div className="px-4 py-3 flex items-center justify-between gap-2">
          <button
            onClick={() => { setSelected(null); setSheet("hidden"); mapInstanceRef.current?.setView([35.2226, -97.4395], 13); }}
            className="flex items-center gap-2.5 hover:opacity-85 transition-opacity min-w-0">
            <img src="/icon.png" alt="ND" className="h-7 w-7 object-contain rounded shrink-0" />
            <div className="min-w-0">
              <div className="text-white font-bold text-sm leading-tight tracking-tight">Norman Development</div>
              <div className="text-white/60 text-[10px] tracking-wide uppercase hidden sm:block">Development Map</div>
            </div>
          </button>

          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex rounded-lg border border-white/30 bg-white/10 overflow-hidden text-xs font-medium">
              <button onClick={() => setBaseMap("street")}
                className={`px-2.5 py-1.5 transition-colors ${baseMap === "street" ? "bg-white text-black" : "text-white hover:bg-white/20"}`}>
                Map
              </button>
              <button onClick={() => setBaseMap("aerial")}
                className={`px-2.5 py-1.5 transition-colors ${baseMap === "aerial" ? "bg-white text-black" : "text-white hover:bg-white/20"}`}>
                Aerial
              </button>
            </div>
            <button onClick={() => setShowParcels(!showParcels)}
              className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors flex items-center gap-1 ${showParcels ? "bg-white text-black border-white" : "border-white/30 bg-white/10 text-white hover:bg-white/20"}`}>
              {parcelLoading && <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin inline-block" />}
              Parcels
            </button>
            <a href={GRID_URL} target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 transition-opacity opacity-80 hover:opacity-100">
              <img src="/grid-logo-white.png" alt="GRID Real Estate" className="h-5 object-contain" />
            </a>
            <a href="https://normanokdevelopment.com" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 transition-opacity opacity-80 hover:opacity-100">
              <img src="/logo.png" alt="Norman Development" className="h-5 object-contain" />
            </a>
            <button onClick={() => setListOpen(!listOpen)}
              className="hidden md:block rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 px-2.5 py-1.5 text-xs font-medium text-white transition-colors">
              {listOpen ? "Hide List" : "List View"}
            </button>
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="flex flex-row flex-1 overflow-hidden">

        {/* Desktop sidebar */}
        {listOpen && (
          <aside className="hidden md:flex w-80 shrink-0 border-r border-black/10 bg-white flex-col overflow-hidden z-40">
            {selected ? (
              <div className="flex flex-col h-full overflow-y-auto">
                <button onClick={() => setSelected(null)}
                  className="flex items-center gap-2 px-4 py-3 border-b border-black/10 text-sm font-medium hover:bg-black/[0.03] transition-colors shrink-0 text-left w-full"
                  style={{ color: BRAND }}>
                  ← All sites
                </button>
                <SiteDetail site={selected} onClose={() => setSelected(null)} onPdf={() => setPdfOpen(true)} />
              </div>
            ) : (
              <SiteList
                filteredSites={filteredSites} allSites={SITES}
                activeFilters={activeFilters} search={search} selected={selected}
                onSearch={setSearch} onToggleFilter={toggleFilter}
                onToggleAll={() => setActiveFilters(p => p.size === ALL_STATUSES.length ? new Set() : new Set(ALL_STATUSES))}
                onSelect={flyTo}
              />
            )}
          </aside>
        )}

        {/* Map — always fills remaining space */}
        <div className="relative flex-1 min-h-0">
          <div ref={mapRef} className="w-full h-full" />

          {/* Mobile: floating Sites button — only when sheet is hidden */}
          {!sheetOpen && (
            <button
              onClick={() => setSheet("list")}
              className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full shadow-lg text-sm font-semibold z-[1000]"
              style={{ background: BRAND, color: "white" }}>
              ☰ Sites
            </button>
          )}

          {/* Mobile bottom sheet — slides up over the map */}
          <div
            className={`md:hidden absolute inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-2xl flex flex-col z-[1000] transition-transform duration-300 ease-out ${sheetOpen ? "translate-y-0" : "translate-y-full"}`}
            style={{ height: sheet === "list" ? "82vh" : "auto", maxHeight: "90vh" }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0 cursor-pointer" onClick={() => setSheet("hidden")}>
              <div className="w-10 h-1 rounded-full bg-black/20" />
            </div>

            {/* List view */}
            {sheet === "list" && (
              <>
                <div className="flex items-center justify-between px-4 py-2 shrink-0">
                  <span className="text-base font-bold">Development Sites</span>
                  <button onClick={() => setSheet("hidden")} className="w-8 h-8 flex items-center justify-center rounded-full text-black/40 hover:bg-black/5 text-lg">✕</button>
                </div>
                <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                  <SiteList
                    filteredSites={filteredSites} allSites={SITES}
                    activeFilters={activeFilters} search={search} selected={selected}
                    onSearch={setSearch} onToggleFilter={toggleFilter}
                    onToggleAll={() => setActiveFilters(p => p.size === ALL_STATUSES.length ? new Set() : new Set(ALL_STATUSES))}
                    onSelect={(site) => { flyTo(site); setSheet("detail"); }}
                  />
                </div>
                {/* Sponsor footer inside sheet */}
                <div className="shrink-0 border-t border-black/10 flex items-center justify-between px-5 py-3">
                  <a href={GRID_URL} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                    <img src="/grid-icon.svg" alt="GRID" className="h-5 w-5 object-contain" />
                    <div className="text-xs font-semibold leading-tight">GRID Real Estate</div>
                  </a>
                  <a href="https://normanokdevelopment.com" target="_blank" rel="noopener noreferrer"
                    className="text-xs text-black/40 hover:text-black/70 transition-colors">
                    normanokdevelopment.com ↗
                  </a>
                </div>
              </>
            )}

            {/* Detail view */}
            {sheet === "detail" && selected && (
              <>
                <div className="flex items-center gap-3 px-4 py-2 border-b border-black/10 shrink-0">
                  <button onClick={() => setSheet("list")}
                    className="text-sm font-medium flex items-center gap-1"
                    style={{ color: BRAND }}>
                    ← Sites
                  </button>
                  <div className="flex-1" />
                  <button onClick={() => setSheet("hidden")}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-black/40 hover:bg-black/5 text-lg">✕</button>
                </div>
                <div className="overflow-y-auto">
                  <SiteDetail site={selected} onClose={() => setSheet("hidden")} onPdf={() => setPdfOpen(true)} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── PDF MODAL ── */}
      {pdfOpen && selected?.planPdf && (
        <div className="fixed inset-0 z-[3000] bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden w-full sm:max-w-4xl h-[90vh] sm:h-[85vh] flex flex-col">
            <div className="flex items-center justify-between px-5 py-3 border-b border-black/10 shrink-0" style={sans}>
              <span className="font-semibold text-sm">{selected.name} — Site Plan</span>
              <button onClick={() => setPdfOpen(false)}
                className="rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/10 transition-colors text-black/60">✕</button>
            </div>
            <iframe src={/^https?:\/\//.test(selected.planPdf) ? selected.planPdf : `/plans/${selected.planPdf}`} className="flex-1 w-full" title={`${selected.name} site plan`} />
          </div>
        </div>
      )}
    </div>
  );
}

// ── SITE DETAIL ───────────────────────────────────────────────────────────────
function SiteDetail({ site, onClose, onPdf }: { site: DevelopmentSite; onClose: () => void; onPdf: () => void }) {
  const sans = { fontFamily: "Arial, Helvetica, sans-serif" };
  return (
    <div className="flex flex-col" style={sans}>
      <div className="h-1 w-full shrink-0" style={{ background: BRAND }} />
      <div className="px-4 pt-4 pb-2">
        <StatusBadge status={site.status} />
        <h2 className="mt-2 text-base font-bold text-neutral-900 leading-snug">{site.name}</h2>
        <p className="mt-0.5 text-xs text-black/50">{site.address}</p>
      </div>
      <div className="px-4 pb-3">
        <p className="text-sm text-neutral-700 leading-5">{site.description}</p>
      </div>
      {site.articles.length > 0 && (
        <div className="px-4 pb-3">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-black/40 mb-2">Coverage</div>
          <div className="space-y-2">
            {site.articles.map((a) => (
              <a key={a.url} href={a.url} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-2 group">
                <span className="text-xs shrink-0 font-bold mt-0.5" style={{ color: BRAND }}>↗</span>
                <div>
                  <div className="text-xs group-hover:underline leading-snug" style={{ color: BRAND }}>{a.title}</div>
                  {a.date && <div className="text-[10px] text-black/40 mt-0.5">{a.date}</div>}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
      <div className="px-4 pb-5">
        {site.planPdf ? (
          <button onClick={onPdf}
            className="w-full rounded-xl border px-3 py-2 text-xs font-medium text-left flex items-center gap-2"
            style={{ borderColor: BRAND, color: BRAND }}>
            📄 View site plan
          </button>
        ) : (
          <div className="rounded-xl border border-black/10 bg-black/[0.02] px-3 py-2 text-xs text-black/40">
            No site plan on file yet
          </div>
        )}
      </div>
    </div>
  );
}

// ── SITE LIST ─────────────────────────────────────────────────────────────────
function SiteList({ filteredSites, allSites, activeFilters, search, selected, onSearch, onToggleFilter, onToggleAll, onSelect }: {
  filteredSites: DevelopmentSite[];
  allSites: DevelopmentSite[];
  activeFilters: Set<SiteStatus>;
  search: string;
  selected: DevelopmentSite | null;
  onSearch: (s: string) => void;
  onToggleFilter: (s: SiteStatus) => void;
  onToggleAll: () => void;
  onSelect: (s: DevelopmentSite) => void;
}) {
  const sans = { fontFamily: "Arial, Helvetica, sans-serif" };
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filtered = activeFilters.size < ALL_STATUSES.length;

  return (
    <div className="flex flex-col flex-1 overflow-hidden min-h-0" style={sans}>
      {/* Search + filter toggle row */}
      <div className="px-3 pt-2 pb-2 flex gap-2 shrink-0">
        <input type="text" placeholder="Search sites…" value={search} onChange={e => onSearch(e.target.value)}
          className="flex-1 rounded-lg border border-black/15 px-3 py-2 text-xs focus:outline-none"
          onFocus={e => e.target.style.borderColor = BRAND}
          onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.15)"} />
        <button
          onClick={() => setFiltersOpen(f => !f)}
          className={`shrink-0 flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-xs font-medium transition-colors ${filtersOpen ? "border-transparent text-white" : filtered ? "border-transparent text-white" : "border-black/15 text-black/50"}`}
          style={filtersOpen || filtered ? { background: BRAND } : {}}>
          {filtered && !filtersOpen && <span className="w-1.5 h-1.5 rounded-full bg-white/80" />}
          Filter{filtered && !filtersOpen ? ` (${activeFilters.size})` : ""}
        </button>
      </div>

      {/* Collapsible filters */}
      {filtersOpen && (
        <div className="px-3 pb-2 shrink-0">
          <div className="grid grid-cols-2 gap-1 mb-1.5">
            {ALL_STATUSES.map(status => {
              const cfg = STATUS_CONFIG[status];
              const count = allSites.filter(s => s.status === status).length;
              const active = activeFilters.has(status);
              return (
                <button key={status} onClick={() => onToggleFilter(status)} title={cfg.tip}
                  className={`flex items-center justify-between rounded-lg px-2 py-1.5 text-xs border transition-all ${active ? "border-black/15 bg-white" : "border-transparent bg-black/[0.02] opacity-40"}`}>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: cfg.dot }} />
                    <span className="font-medium truncate">{cfg.label}</span>
                  </span>
                  <span className="text-black/40 tabular-nums ml-1">{count}</span>
                </button>
              );
            })}
          </div>
          <button onClick={onToggleAll} className="text-[10px] font-medium hover:opacity-70" style={{ color: BRAND }}>
            {activeFilters.size === ALL_STATUSES.length ? "clear all" : "select all"}
          </button>
        </div>
      )}

      <div className="px-4 py-1.5 border-y border-black/5 shrink-0">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-black/40">
          {filteredSites.length} of {allSites.length} sites
        </span>
      </div>
      <div className="flex-1 overflow-y-auto min-h-0">
        {filteredSites.length === 0 && (
          <div className="px-4 py-8 text-center text-xs text-black/40">No sites match your filters.</div>
        )}
        {filteredSites.map(site => {
          const cfg = STATUS_CONFIG[site.status];
          const isActive = selected?.id === site.id;
          return (
            <button key={site.id} onClick={() => onSelect(site)}
              className={`w-full text-left px-4 py-3 border-b border-black/5 transition-colors ${isActive ? "bg-neutral-50 border-l-2" : "hover:bg-black/[0.02]"}`}
              style={isActive ? { borderLeftColor: BRAND } : {}}>
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-semibold text-neutral-900 leading-snug">{site.name}</span>
                <span className="w-2.5 h-2.5 rounded-full shrink-0 mt-1" style={{ background: cfg.dot }} />
              </div>
              <div className="mt-0.5 text-xs text-black/50 truncate">{site.address}</div>
              <div className="mt-1.5"><StatusBadge status={site.status} /></div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
