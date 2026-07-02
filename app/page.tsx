"use client";

import { useEffect, useRef, useState } from "react";
import { SITES, DevelopmentSite, SiteStatus } from "../data/sites";

const BRAND = "#3a8a6e";

const STATUS_CONFIG: Record<SiteStatus, { label: string; color: string; dot: string; tip: string }> = {
  proposed:             { label: "Proposed",           color: "bg-amber-50 text-amber-800 border-amber-200",        dot: "#f59e0b", tip: "Announced or rumored — no city filing yet" },
  planned:              { label: "Planned",             color: "bg-blue-50 text-blue-800 border-blue-200",          dot: "#3b82f6", tip: "Platted, city council approved, or permits filed" },
  "under-construction": { label: "Under Construction",  color: "bg-orange-50 text-orange-800 border-orange-200",    dot: "#f97316", tip: "Actively being built" },
  completed:            { label: "Completed",           color: "bg-emerald-50 text-emerald-800 border-emerald-200", dot: "#3a8a6e", tip: "Open / finished" },
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

export default function Page() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const baseLayerRef = useRef<any>(null);
  const aerialLayerRef = useRef<any>(null);
  const parcelLayerRef = useRef<any>(null);
  const [selected, setSelected] = useState<DevelopmentSite | null>(null);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Set<SiteStatus>>(new Set(ALL_STATUSES));
  const [search, setSearch] = useState("");
  const [baseLayer, setBaseLayer] = useState<"map" | "aerial">("map");
  const [showParcels, setShowParcels] = useState(false);

  useEffect(() => {
    if (!mapInstanceRef.current) return;
    SITES.forEach((site) => {
      const marker = markersRef.current[site.id];
      if (!marker) return;
      if (activeFilters.has(site.status)) {
        marker.addTo(mapInstanceRef.current);
      } else {
        marker.remove();
      }
    });
    if (selected && !activeFilters.has(selected.status)) setSelected(null);
  }, [activeFilters, selected]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    function initMap(L: any) {
      const map = L.map(mapRef.current!, { scrollWheelZoom: true }).setView([35.2226, -97.4395], 13);
      mapInstanceRef.current = map;

      const base = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      });
      base.addTo(map);
      baseLayerRef.current = base;

      aerialLayerRef.current = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "Tiles © Esri — Source: Esri, USGS, NOAA",
          maxZoom: 19,
        }
      );

      SITES.forEach((site) => {
        const cfg = STATUS_CONFIG[site.status];
        const icon = L.divIcon({
          className: "",
          html: `<div style="width:14px;height:14px;background:${cfg.dot};border:2.5px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,.35)"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
        const marker = L.marker([site.lat, site.lng], { icon }).addTo(map);
        marker.on("click", () => { setSelected(site); setSidebarOpen(true); });
        markersRef.current[site.id] = marker;
      });
    }

    if (!document.querySelector("#leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    function loadLeaflet(cb: (L: any) => void) {
      if ((window as any).L) { cb((window as any).L); return; }
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => cb((window as any).L);
      document.head.appendChild(script);
    }

    loadLeaflet(initMap);

    return () => { mapInstanceRef.current?.remove(); mapInstanceRef.current = null; };
  }, []);

  // Switch base layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !baseLayerRef.current || !aerialLayerRef.current) return;
    if (baseLayer === "aerial") {
      map.removeLayer(baseLayerRef.current);
      aerialLayerRef.current.addTo(map);
    } else {
      map.removeLayer(aerialLayerRef.current);
      baseLayerRef.current.addTo(map);
    }
  }, [baseLayer]);

  // Toggle parcel overlay
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const L = (window as any).L;
    if (!L) return;

    if (showParcels) {
      if (!parcelLayerRef.current) {
        parcelLayerRef.current = L.tileLayer(
          `https://services.arcgis.com/rt1leD4Hj3sLGHNL/arcgis/rest/services/Parcels/FeatureServer/1/query?where=1%3D1&outFields=*&f=geojson&resultRecordCount=0`,
        );
        // Use WMS-style dynamic tile approach via ArcGIS export
        parcelLayerRef.current = L.tileLayer(
          "https://tiles.arcgis.com/tiles/rt1leD4Hj3sLGHNL/arcgis/rest/services/Parcels/MapServer/tile/{z}/{y}/{x}",
          { opacity: 0.5, maxZoom: 19 }
        );
      }
      parcelLayerRef.current.addTo(map);
    } else {
      if (parcelLayerRef.current) map.removeLayer(parcelLayerRef.current);
    }
  }, [showParcels]);

  function flyTo(site: DevelopmentSite) {
    setSelected(site);
    setSidebarOpen(true);
    mapInstanceRef.current?.flyTo([site.lat, site.lng], 16, { duration: 0.8 });
  }

  function toggleFilter(status: SiteStatus) {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(status)) { next.delete(status); } else { next.add(status); }
      return next;
    });
  }

  function toggleAll() {
    setActiveFilters((prev) =>
      prev.size === ALL_STATUSES.length ? new Set() : new Set(ALL_STATUSES)
    );
  }

  const filteredSites = SITES.filter(
    (s) =>
      activeFilters.has(s.status) &&
      (search === "" ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.address.toLowerCase().includes(search.toLowerCase()))
  );

  const sans = { fontFamily: "Arial, Helvetica, sans-serif" };

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden" style={sans}>

      {/* HEADER */}
      <header className="shrink-0 z-50" style={{ background: BRAND }}>
        <div className="px-4 py-3 flex items-center justify-between">
          <a
            href="https://normanokdevelopment.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:opacity-85 transition-opacity"
          >
            <img src="/icon.png" alt="Norman Development" className="h-8 w-8 object-contain rounded" />
            <div style={sans}>
              <div className="text-white font-bold text-sm leading-tight tracking-tight">Norman Development</div>
              <div className="text-white/70 text-[10px] tracking-wide uppercase">Development Map</div>
            </div>
          </a>
          <div className="flex items-center gap-2">
            {/* Base layer toggle */}
            <div className="hidden sm:flex items-center rounded-lg border border-white/30 bg-white/10 overflow-hidden text-xs font-medium" style={sans}>
              <button
                onClick={() => setBaseLayer("map")}
                className={`px-3 py-1.5 transition-colors ${baseLayer === "map" ? "bg-white text-black" : "text-white hover:bg-white/20"}`}
              >
                Map
              </button>
              <button
                onClick={() => setBaseLayer("aerial")}
                className={`px-3 py-1.5 transition-colors ${baseLayer === "aerial" ? "bg-white text-black" : "text-white hover:bg-white/20"}`}
              >
                Aerial
              </button>
            </div>
            {/* Parcels toggle */}
            <button
              onClick={() => setShowParcels(!showParcels)}
              className={`hidden sm:block rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${showParcels ? "bg-white text-black border-white" : "border-white/30 bg-white/10 text-white hover:bg-white/20"}`}
              style={sans}
            >
              Parcels
            </button>
            <a
              href="https://normanokdevelopment.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block text-white/80 hover:text-white text-xs transition-colors"
              style={sans}
            >
              ← Back to site
            </a>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-medium text-white transition-colors"
              style={sans}
            >
              {sidebarOpen ? "Hide list" : "Show list"}
            </button>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR */}
        {sidebarOpen && (
          <aside className="w-72 shrink-0 border-r border-black/10 bg-white flex flex-col overflow-hidden">

            {/* SEARCH */}
            <div className="px-3 pt-3 pb-2 border-b border-black/10">
              <input
                type="text"
                placeholder="Search sites…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-black/15 px-3 py-2 text-xs focus:outline-none transition-colors"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                onFocus={(e) => e.target.style.borderColor = BRAND}
                onBlur={(e) => e.target.style.borderColor = "rgba(0,0,0,0.15)"}
              />
            </div>

            {/* FILTERS */}
            <div className="px-3 py-2.5 border-b border-black/10 space-y-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-black/40">Filter by status</span>
                <button
                  onClick={toggleAll}
                  className="text-[10px] font-medium transition-colors hover:opacity-70"
                  style={{ color: BRAND }}
                >
                  {activeFilters.size === ALL_STATUSES.length ? "clear all" : "select all"}
                </button>
              </div>
              {ALL_STATUSES.map((status) => {
                const cfg = STATUS_CONFIG[status];
                const count = SITES.filter((s) => s.status === status).length;
                const active = activeFilters.has(status);
                return (
                  <button
                    key={status}
                    onClick={() => toggleFilter(status)}
                    title={cfg.tip}
                    className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-all border ${
                      active ? "border-black/15 bg-white" : "border-transparent bg-black/[0.02] opacity-40"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: cfg.dot }} />
                      <span className="font-medium">{cfg.label}</span>
                    </span>
                    <span className="text-black/40 tabular-nums">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* COUNT */}
            <div className="px-4 py-2 border-b border-black/10">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-black/40">
                {filteredSites.length} of {SITES.length} sites
              </span>
            </div>

            {/* SITE LIST */}
            <div className="flex-1 overflow-y-auto">
              {filteredSites.length === 0 && (
                <div className="px-4 py-8 text-center text-xs text-black/40">No sites match your filters.</div>
              )}
              {filteredSites.map((site) => {
                const cfg = STATUS_CONFIG[site.status];
                const isActive = selected?.id === site.id;
                return (
                  <button
                    key={site.id}
                    onClick={() => flyTo(site)}
                    className={`w-full text-left px-4 py-3.5 border-b border-black/5 transition-colors ${
                      isActive ? "bg-neutral-50 border-l-2" : "hover:bg-black/[0.02]"
                    }`}
                    style={isActive ? { borderLeftColor: BRAND } : {}}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-semibold text-neutral-900 leading-snug">{site.name}</span>
                      <span className="w-2.5 h-2.5 rounded-full shrink-0 mt-1" style={{ background: cfg.dot }} />
                    </div>
                    <div className="mt-1 text-xs text-black/50 truncate">{site.address}</div>
                    <div className="mt-1.5">
                      <StatusBadge status={site.status} />
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        {/* MAP */}
        <div className="relative flex-1">
          <div ref={mapRef} className="w-full h-full" />

          {/* DETAIL PANEL */}
          {selected && (
            <div className="absolute bottom-0 left-0 right-0 sm:bottom-4 sm:left-4 sm:right-auto sm:w-96 bg-white border border-black/10 rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden z-[1000]" style={sans}>
              {/* green top bar */}
              <div className="h-1 w-full" style={{ background: BRAND }} />
              <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3">
                <div>
                  <StatusBadge status={selected.status} />
                  <h2 className="mt-2 text-base font-bold text-neutral-900 leading-snug">{selected.name}</h2>
                  <p className="mt-0.5 text-xs text-black/50">{selected.address}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="shrink-0 rounded-full w-7 h-7 flex items-center justify-center text-black/40 hover:bg-black/10 transition-colors text-sm mt-0.5"
                >
                  ✕
                </button>
              </div>

              <div className="px-5 pb-3">
                <p className="text-sm text-neutral-700 leading-6">{selected.description}</p>
              </div>

              {selected.articles.length > 0 && (
                <div className="px-5 pb-3">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-black/40 mb-2">Coverage</div>
                  <div className="space-y-2">
                    {selected.articles.map((a) => (
                      <a
                        key={a.url}
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 group"
                      >
                        <span className="text-xs mt-0.5 shrink-0 font-bold" style={{ color: BRAND }}>↗</span>
                        <div>
                          <div className="text-sm group-hover:underline leading-snug" style={{ color: BRAND }}>{a.title}</div>
                          <div className="text-xs text-black/40 mt-0.5">{a.date}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {selected.planPdf ? (
                <div className="px-5 pb-5">
                  <button
                    onClick={() => setPdfOpen(true)}
                    className="w-full rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors text-left flex items-center gap-2"
                    style={{ borderColor: BRAND, color: BRAND }}
                  >
                    <span>📄</span>
                    View site plan
                  </button>
                </div>
              ) : (
                <div className="px-5 pb-5">
                  <div className="rounded-xl border border-black/10 bg-black/[0.02] px-4 py-2.5 text-xs text-black/40">
                    No site plan on file yet
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* PDF MODAL */}
      {pdfOpen && selected?.planPdf && (
        <div className="fixed inset-0 z-[2000] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl h-[85vh] flex flex-col">
            <div className="flex items-center justify-between px-5 py-3 border-b border-black/10 shrink-0" style={sans}>
              <span className="font-semibold text-sm">{selected.name} — Site Plan</span>
              <button
                onClick={() => setPdfOpen(false)}
                className="rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/10 transition-colors text-black/60"
              >
                ✕
              </button>
            </div>
            <iframe
              src={`/plans/${selected.planPdf}`}
              className="flex-1 w-full"
              title={`${selected.name} site plan`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
