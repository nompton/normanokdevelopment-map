"use client";

import { useEffect, useRef, useState } from "react";
import { SITES, DevelopmentSite, SiteStatus } from "../data/sites";

const STATUS_CONFIG: Record<SiteStatus, { label: string; color: string; dot: string; tip: string }> = {
  proposed:             { label: "Proposed",           color: "bg-amber-100 text-amber-800 border-amber-200",        dot: "#f59e0b", tip: "Announced or rumored — no city filing yet" },
  planned:              { label: "Planned",             color: "bg-blue-100 text-blue-800 border-blue-200",          dot: "#3b82f6", tip: "Platted, city council approved, or permits filed" },
  "under-construction": { label: "Under Construction",  color: "bg-orange-100 text-orange-800 border-orange-200",    dot: "#f97316", tip: "Actively being built" },
  completed:            { label: "Completed",           color: "bg-green-100 text-green-800 border-green-200",       dot: "#22c55e", tip: "Open / finished" },
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
  const [selected, setSelected] = useState<DevelopmentSite | null>(null);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Set<SiteStatus>>(new Set(ALL_STATUSES));
  const [search, setSearch] = useState("");

  // Show/hide markers when filters change
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
    // Deselect if filtered out
    if (selected && !activeFilters.has(selected.status)) setSelected(null);
  }, [activeFilters, selected]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    function initMap(L: any) {
      const map = L.map(mapRef.current!, { scrollWheelZoom: true }).setView([35.2226, -97.4395], 13);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

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

    if ((window as any).L) {
      initMap((window as any).L);
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => initMap((window as any).L);
      document.head.appendChild(script);
    }

    return () => { mapInstanceRef.current?.remove(); mapInstanceRef.current = null; };
  }, []);

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
      <header className="shrink-0 border-b border-black/10 bg-white px-4 py-3 flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <a
            href="https://normanokdevelopment.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-75 transition-opacity"
          >
            <span className="font-bold text-sm text-neutral-900 tracking-tight">Norman Development</span>
            <span className="text-black/30 text-xs">↗</span>
          </a>
          <span className="text-black/20 text-sm">|</span>
          <span className="text-sm font-medium text-neutral-600">Development Map</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg border border-black/15 px-3 py-1.5 text-xs font-medium hover:bg-black/5 transition-colors"
        >
          {sidebarOpen ? "Hide list" : "Show list"}
        </button>
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
                className="w-full rounded-lg border border-black/15 px-3 py-2 text-xs focus:outline-none focus:border-black/30 transition-colors"
              />
            </div>

            {/* FILTERS */}
            <div className="px-3 py-2.5 border-b border-black/10 space-y-1.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-black/40">Filter by status</span>
                <button
                  onClick={toggleAll}
                  className="text-[10px] text-black/40 hover:text-black transition-colors"
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
                    <span className="text-black/40">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* SITE LIST */}
            <div className="px-3 py-2 border-b border-black/10">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-black/40">
                {filteredSites.length} of {SITES.length} sites
              </span>
            </div>
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
                      isActive ? "bg-neutral-100" : "hover:bg-black/[0.03]"
                    }`}
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
            <div className="absolute bottom-0 left-0 right-0 sm:bottom-4 sm:left-4 sm:right-auto sm:w-96 bg-white border border-black/10 rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden z-[1000]">
              <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3">
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

              <div className="px-5 pb-2">
                <p className="text-sm text-neutral-700 leading-6">{selected.description}</p>
              </div>

              {selected.articles.length > 0 && (
                <div className="px-5 pb-3">
                  <div className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-2">Coverage</div>
                  <div className="space-y-1.5">
                    {selected.articles.map((a) => (
                      <a
                        key={a.url}
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 group"
                      >
                        <span className="text-blue-600 text-xs mt-0.5 shrink-0">↗</span>
                        <div>
                          <div className="text-sm text-blue-600 group-hover:underline leading-snug">{a.title}</div>
                          <div className="text-xs text-black/40">{a.date}</div>
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
                    className="w-full rounded-xl border border-black/15 px-4 py-2.5 text-sm font-medium hover:bg-black/5 transition-colors text-left flex items-center gap-2"
                  >
                    <span className="text-black/40">📄</span>
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
            <div className="flex items-center justify-between px-5 py-3 border-b border-black/10 shrink-0">
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
