import React, { useEffect, useMemo, useState } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';

// npm i d3-geo topojson-client
// For zero third-party runtime requests, `npm i world-atlas` and replace loadLand()
// with: import topo from 'world-atlas/countries-110m.json'; feature(topo, topo.objects.countries)
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json';

/* One shared request for every mount; a failed request is retried on next mount. */
let landPromise = null;
function loadLand() {
  if (!landPromise) {
    landPromise = fetch(GEO_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`Map data ${r.status}`);
        return r.json();
      })
      .then((t) => feature(t, t.objects.countries))
      .catch((e) => {
        landPromise = null;
        throw e;
      });
  }
  return landPromise;
}

// [longitude, latitude]
const CITY = {
  mumbai: [72.88, 19.08], 'navi mumbai': [73.02, 19.03], thane: [72.98, 19.22], pune: [73.86, 18.52],
  delhi: [77.21, 28.61], 'new delhi': [77.21, 28.61], bengaluru: [77.59, 12.97], bangalore: [77.59, 12.97],
  hyderabad: [78.49, 17.39], chennai: [80.27, 13.08], kolkata: [88.36, 22.57], ahmedabad: [72.57, 23.02],
  surat: [72.83, 21.17], jaipur: [75.79, 26.91], lucknow: [80.95, 26.85], kanpur: [80.35, 26.45],
  nagpur: [79.09, 21.15], indore: [75.86, 22.72], bhopal: [77.41, 23.26], patna: [85.14, 25.59],
  chandigarh: [76.78, 30.73], gurugram: [77.03, 28.46], gurgaon: [77.03, 28.46], noida: [77.39, 28.54],
  ghaziabad: [77.45, 28.67], kochi: [76.27, 9.93], thiruvananthapuram: [76.94, 8.52], coimbatore: [76.96, 11.02],
  visakhapatnam: [83.22, 17.69], vadodara: [73.18, 22.31], nashik: [73.79, 20.0], goa: [73.83, 15.5],
  panaji: [73.83, 15.5], ludhiana: [75.85, 30.9], amritsar: [74.87, 31.63], ranchi: [85.33, 23.34],
  bhubaneswar: [85.82, 20.3], guwahati: [91.74, 26.14], dehradun: [78.03, 30.32], raipur: [81.63, 21.25],
  dubai: [55.27, 25.2], 'abu dhabi': [54.37, 24.45], singapore: [103.82, 1.35], london: [-0.13, 51.51],
  'new york': [-74.0, 40.71], 'san francisco': [-122.42, 37.77], 'los angeles': [-118.24, 34.05],
  toronto: [-79.38, 43.65], sydney: [151.21, -33.87], berlin: [13.4, 52.52], paris: [2.35, 48.85],
  'hong kong': [114.17, 22.32], tokyo: [139.69, 35.69], doha: [51.53, 25.29], riyadh: [46.68, 24.71],
  kathmandu: [85.32, 27.72], dhaka: [90.41, 23.81], colombo: [79.86, 6.93], 'kuala lumpur': [101.69, 3.14],
};

const COUNTRY = {
  IN: [78.9, 22.6], US: [-98, 39], GB: [-2, 54], AE: [54, 24], SG: [103.8, 1.35], CA: [-96, 57],
  AU: [134, -25], DE: [10, 51], FR: [2, 46], SA: [45, 24], QA: [51.2, 25.3], NP: [84, 28], BD: [90, 24],
  LK: [80.7, 7.8], MY: [102, 4], PK: [69, 30], JP: [138, 36], HK: [114.2, 22.3], NL: [5.3, 52.1],
  ID: [113, -2], PH: [122, 12], ZA: [24, -29], BR: [-52, -10], NG: [8, 9],
};

export function locate(city, country) {
  const c = (city || '').toLowerCase().trim();
  if (c && CITY[c]) return CITY[c];
  const k = (country || '').toUpperCase();
  return COUNTRY[k] || null;
}

const W = 900;
const H = 430;
const INDIA_ZOOM = 6;
const VIEWS = [['world', 'World'], ['india', 'India']];

export default function WorldMap({ points = [], className = '', dark = false }) {
  const [land, setLand] = useState(null);
  const [mapError, setMapError] = useState(false);
  const [view, setView] = useState('world');
  const [tip, setTip] = useState(null);

  useEffect(() => {
    let alive = true;
    loadLand()
      .then((f) => alive && setLand(f))
      .catch(() => alive && setMapError(true));
    return () => {
      alive = false;
    };
  }, []);

  const projection = useMemo(() => geoNaturalEarth1().fitSize([W, H], { type: 'Sphere' }), []);
  const path = useMemo(() => geoPath(projection), [projection]);

  const landPaths = useMemo(() => (land ? land.features.map((f) => path(f)) : []), [land, path]);

  // Largest first so small dots are never hidden under big ones; live dots always on top.
  const dots = useMemo(
    () =>
      points
        .map((p) => {
          const ll = locate(p.city, p.country);
          if (!ll) return null;
          const xy = projection(ll);
          return xy ? { ...p, x: xy[0], y: xy[1] } : null;
        })
        .filter(Boolean)
        .sort((a, b) => Number(a.live) - Number(b.live) || b.count - a.count),
    [points, projection]
  );

  const unplotted = points.length - dots.length;
  const maxCount = Math.max(1, ...dots.map((d) => d.count));
  const [cx, cy] = useMemo(() => projection([80, 22.5]), [projection]);
  const isIndia = view === 'india';
  const viewBox = isIndia
    ? `${cx - W / INDIA_ZOOM / 2} ${cy - H / INDIA_ZOOM / 2} ${W / INDIA_ZOOM} ${H / INDIA_ZOOM}`
    : `0 0 ${W} ${H}`;
  const k = isIndia ? 1.5 / INDIA_ZOOM : 1;

  return (
    <div className={`relative flex h-full min-h-0 flex-col ${className}`}>
      <div className={`absolute top-0 right-0 z-10 inline-flex rounded-md border p-0.5 ${dark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}>
        {VIEWS.map(([v, label]) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            aria-pressed={view === v}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
              view === v ? (dark ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white') : dark ? 'text-slate-300 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="pointer-events-none absolute top-0 left-0 z-10">
        {tip && (
          <div className={`rounded-md text-xs px-2.5 py-1.5 shadow-lg ${dark ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}`}>
            <div className="flex items-center gap-2">
              <span className="font-medium">{tip.city && tip.city !== 'Unknown' ? tip.city : tip.country}</span>
              {tip.live && <span className={`font-medium ${dark ? 'text-emerald-600' : 'text-emerald-400'}`}>Live</span>}
            </div>
            <div className={`mt-0.5 tabular-nums ${dark ? 'text-slate-500' : 'text-slate-300'}`}>
              {tip.count.toLocaleString('en-IN')} sessions, {(tip.applies || 0).toLocaleString('en-IN')} applies
            </div>
          </div>
        )}
      </div>

      <div className="min-h-0 flex-1 pt-6">
      <svg viewBox={viewBox} className="block h-full w-full" role="img" aria-label="Map of visitor locations">
        {landPaths.map((d, i) => (
          <path key={i} d={d} fill={dark ? '#1a2740' : '#e4ebf6'} stroke={dark ? '#0b1220' : '#ffffff'} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        ))}

        {dots.map((d, i) => {
          const r = (3.5 + Math.sqrt(d.count / maxCount) * 7) * k;
          const color = d.live ? (dark ? '#34d399' : '#10b981') : dark ? '#3b82f6' : '#2563eb';
          return (
            <g
              key={d.id || i}
              onMouseEnter={() => setTip(d)}
              onMouseLeave={() => setTip(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={d.x} cy={d.y} r={r} fill={color} opacity="0.25">
                {d.live && (
                  <>
                    <animate attributeName="r" from={r} to={r * 3.2} dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="1.8s" repeatCount="indefinite" />
                  </>
                )}
              </circle>
              <circle cx={d.x} cy={d.y} r={r * 0.75} fill={color} stroke={dark ? '#0b1220' : '#fff'} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </g>
          );
        })}
      </svg>
      </div>

      <div className={`mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Live now
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${dark ? 'bg-blue-500' : 'bg-blue-600'}`} /> Recent
        </span>
        <span className="text-slate-500">Larger dot, more sessions</span>
        {unplotted > 0 && <span className="text-slate-400">{unplotted} not plotted</span>}
        {!land && !mapError && <span className="text-slate-400">Loading map</span>}
        {mapError && <span className="text-amber-600">Map outlines could not load</span>}
      </div>
    </div>
  );
}