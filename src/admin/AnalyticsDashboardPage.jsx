import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity, Users, Clock3, MousePointerClick, RefreshCw, AlertCircle, Search,
  ChevronLeft, ChevronRight, BadgeCheck, CheckCircle2, Eye, X, Mail, Phone,
  Building2, ExternalLink
} from 'lucide-react';
import WorldMap from '../components/WorldMap';
import {
  fetchAnalyticsOverview,
  fetchAnalyticsSessions,
  fetchAnalyticsSessionById,
  fetchAnalyticsLeads,
  fetchInquiries,
} from '../services/api';

const POLL_MS = 30000;
const PAGE_SIZE = 10;
const LIVE_WINDOW_MS = 300000;
const RANGE_OPTIONS = [[7, '7D'], [30, '30D'], [90, '90D']];
const DEVICES = ['Mobile', 'Desktop', 'Tablet'];
const CHANNELS = ['Social', 'Direct', 'Paid', 'Organic Search', 'Referral', 'Email', 'Influencer', 'Other Campaign'];
const TABS = [
  ['cities', 'Cities'], ['channels', 'Channels'], ['campaigns', 'Campaigns'],
  ['referrers', 'Sources'], ['pages', 'Pages'], ['devices', 'Devices'],
];
const cx = (...v) => v.filter(Boolean).join(' ');
const n = (v) => Number(v ?? 0).toLocaleString('en-IN');
const num = (v) => Number(v) || 0;
const fmtDur = (v) => {
  const s = Math.max(0, Math.round(Number(v) || 0));
  return s >= 60 ? `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s` : `${s}s`;
};
const ago = (v) => {
  if (!v) return '—';
  const sec = Math.max(0, Math.floor((Date.now() - new Date(v).getTime()) / 1000));
  if (sec < 60) return 'Just now';
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
  return new Date(v).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};
const isLive = (v) => !!v && Date.now() - new Date(v).getTime() < LIVE_WINDOW_MS;
const isoDaysAgo = (days) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
};
const parseDay = (v) => typeof v === 'string' && v.length === 10 ? new Date(`${v}T00:00:00`) : new Date(v);

const panel = 'rounded-xl border border-slate-200 bg-white shadow-sm';
const muted = 'text-slate-500';
const inputClass = 'h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-xs text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100';
const buttonFocus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2';

function LiveDot({ active = true }) {
  return <span className={cx('relative inline-flex h-2 w-2 shrink-0 rounded-full', active ? 'bg-emerald-500' : 'bg-slate-300')}>
    {active && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-50" />}
  </span>;
}

function PanelHead({ title, subtitle, action }) {
  return <div className="flex min-h-[54px] items-center justify-between gap-3 border-b border-slate-100 px-3.5 py-2.5">
    <div className="min-w-0">
      <h2 className="truncate text-[13px] font-semibold tracking-tight text-slate-900">{title}</h2>
      {subtitle && <p className="mt-0.5 truncate text-[11px] text-slate-500">{subtitle}</p>}
    </div>
    {action}
  </div>;
}

function Kpi({ icon: Icon, label, value, detail, live }) {
  return <section className={cx(panel, 'flex min-w-0 items-center gap-3 px-3.5 py-3')}>
    <span className={cx('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', live ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600')}>
      <Icon size={17} strokeWidth={1.9} />
    </span>
    <div className="min-w-0">
      <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">{label}{live && <LiveDot />}</div>
      <div className="mt-0.5 truncate text-xl font-bold leading-tight tracking-tight tabular-nums text-slate-900">{value}</div>
      <div className="mt-0.5 truncate text-[10px] text-slate-400">{detail}</div>
    </div>
  </section>;
}

function Segmented({ value, onChange, options, label }) {
  return <div role="group" aria-label={label} className="inline-flex h-8 shrink-0 items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5">
    {options.map(([v, labelText]) => <button key={String(v)} type="button" aria-pressed={value === v} onClick={() => onChange(v)}
      className={cx('h-full rounded-md px-2.5 text-[11px] font-semibold transition', buttonFocus, value === v ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800')}>
      {labelText}
    </button>)}
  </div>;
}

function Empty({ children = 'No data available for this period.' }) {
  return <div className="flex min-h-24 items-center justify-center px-4 py-6 text-center text-xs text-slate-400">{children}</div>;
}

function TrendChart({ data }) {
  const [hover, setHover] = useState(null);
  const ref = useRef(null);
  const W = 600, H = 170, L = 32, R = 8, T = 12, B = 22;
  if (!data.length) return <Empty>No visitor activity in this date range.</Empty>;
  const max = Math.max(4, ...data.map(x => x.value));
  const top = Math.ceil(max / 4) * 4;
  const iw = W - L - R;
  const x = i => L + (data.length === 1 ? iw / 2 : i * iw / (data.length - 1));
  const y = v => T + (1 - v / top) * (H - T - B);
  let line = `M${x(0)},${y(data[0].value)}`;
  for (let i = 1; i < data.length; i++) {
    const c = (x(i - 1) + x(i)) / 2;
    line += ` C${c},${y(data[i - 1].value)} ${c},${y(data[i].value)} ${x(i)},${y(data[i].value)}`;
  }
  const area = `${line} L${x(data.length - 1)},${H - B} L${x(0)},${H - B} Z`;
  const onMove = e => {
    const r = ref.current?.getBoundingClientRect();
    if (!r?.width) return;
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = data.length === 1 ? 0 : Math.round(((px - L) / iw) * (data.length - 1));
    setHover(Math.max(0, Math.min(data.length - 1, i)));
  };
  const step = Math.max(1, Math.ceil(data.length / 6));
  return <div ref={ref} className="relative h-full w-full" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
    {hover !== null && <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-md bg-slate-900 px-2 py-1 text-[10px] text-white shadow-lg">
      {data[hover].label} · <b>{n(data[hover].value)}</b>
    </div>}
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label="Daily unique visitors">
      <defs><linearGradient id="analyticsTrendFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2563eb" stopOpacity=".16" /><stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
      </linearGradient></defs>
      {[0,1,2,3,4].map(t => <g key={t}>
        <line x1={L} x2={W-R} y1={y(top*t/4)} y2={y(top*t/4)} stroke="#eef2f7" />
        <text x={L-7} y={y(top*t/4)+3} textAnchor="end" fontSize="9" fill="#94a3b8">{Math.round(top*t/4)}</text>
      </g>)}
      <path d={area} fill="url(#analyticsTrendFill)" />
      <path d={line} fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" />
      {data.map((d,i) => i % step === 0 ? <text key={i} x={x(i)} y={H-5} textAnchor="middle" fontSize="9" fill="#94a3b8">{d.short}</text> : null)}
      {hover !== null && <g><line x1={x(hover)} x2={x(hover)} y1={T} y2={H-B} stroke="#bfdbfe" /><circle cx={x(hover)} cy={y(data[hover].value)} r="4" fill="#2563eb" stroke="white" strokeWidth="2" /></g>}
    </svg>
  </div>;
}

function RankList({ rows, empty, heading = 'Visits' }) {
  if (!rows?.length) return <Empty>{empty}</Empty>;
  const max = Math.max(1, ...rows.map(r => r.value));
  return <div className="space-y-1 px-3 pb-3">
    <div className="flex justify-between px-1.5 pb-1 text-[10px] font-medium uppercase tracking-wide text-slate-400"><span>Source</span><span>{heading}</span></div>
    {rows.slice(0, 8).map(r => <div key={r.key} className="relative overflow-hidden rounded-md px-2.5 py-2">
      <span className="absolute inset-y-0 left-0 rounded-md bg-blue-50" style={{ width: `${Math.max(3, r.value / max * 100)}%` }} />
      <div className="relative flex items-center justify-between gap-2">
        <div className="min-w-0"><p className="truncate text-[11px] font-semibold text-slate-800">{r.label}</p>{r.sub && <p className="mt-0.5 truncate text-[10px] text-slate-500">{r.sub}</p>}</div>
        <div className="shrink-0 text-right"><p className="text-[11px] font-bold tabular-nums text-slate-800">{n(r.value)}</p>{r.applies !== undefined && <p className="text-[10px] text-blue-600">{n(r.applies)} applies{r.rate != null ? ` · ${r.rate}%` : ''}</p>}</div>
      </div>
    </div>)}
  </div>;
}

function DeviceBreakdown({ env, segments }) {
  const total = segments.reduce((a, x) => a + x.value, 0);
  return <div className="px-4 pb-3">
    {total > 0 ? <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-slate-100">{segments.map(s => <span key={s.label} style={{ width: `${s.value / total * 100}%`, background: s.color }} />)}</div> : <Empty>No device data yet.</Empty>}
    {segments.map(s => <div key={s.label} className="flex items-center justify-between border-b border-slate-100 py-2 text-[11px]">
      <span className="flex items-center gap-2 text-slate-600"><i className="h-2 w-2 rounded-sm" style={{ background: s.color }} />{s.label}</span><b className="tabular-nums text-slate-800">{s.value}%</b>
    </div>)}
    <div className="flex justify-between gap-2 py-2 text-[11px]"><span className="text-slate-600">In-app browser</span><b className="text-blue-600">{env.inAppBrowserPercentage ?? 0}%</b></div>
  </div>;
}

function Outcome({ inquiry, applied }) {
  if (inquiry) return <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-1.5 py-1 text-[10px] font-semibold text-blue-700"><BadgeCheck size={12}/> Inquiry</span>;
  if (applied) return <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-1.5 py-1 text-[10px] font-semibold text-emerald-700"><CheckCircle2 size={12}/> Applied</span>;
  return <span className="inline-flex items-center gap-1 text-[10px] text-slate-400"><Eye size={12}/> Browsing</span>;
}

function SessionDrawer({ session: s, inquiry: inq, onClose }) {
  const [full, setFull] = useState(null);
  useEffect(() => {
    let active = true;
    setFull(null);
    if (s.sessionId) fetchAnalyticsSessionById(s.sessionId).then(v => { if (active) setFull(v); }).catch(() => {});
    return () => { active = false; };
  }, [s.sessionId]);
  useEffect(() => {
    const key = e => { if (e.key === 'Escape') onClose(); };
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', key);
    return () => { document.body.style.overflow = old; window.removeEventListener('keydown', key); };
  }, [onClose]);
  const data = full || s;
  const rows = [
    ['Time on site', fmtDur(data.durationSeconds)], ['Actively focused', fmtDur(data.activeDwellSeconds)],
    ['Pages viewed', `${data.pageViews || 1} pages`], ['Entry page', data.entryPath || '/'],
    ['Last page', data.lastPath || data.entryPath || '/'], ['First seen', data.createdAt ? new Date(data.createdAt).toLocaleString('en-IN') : '—'],
  ];
  const groups = [
    ['Session journey', rows],
    ['Marketing attribution', [['Channel', data.channel || 'Direct'], ['Referrer', data.referrerDomain || 'Direct entry'], ['Campaign', data.utmCampaign || '—'], ['UTM source', data.utmSource || '—'], ['UTM medium', data.utmMedium || '—'], ['UTM content', data.utmContent || '—']]],
    ['Device & location', [['Location', `${data.city || 'Unknown'}, ${data.region || 'Unknown'}`], ['Country', data.country || '—'], ['Visitor', data.returningVisitor ? 'Returning' : 'New'], ['Device', data.deviceType || '—'], ['Browser / OS', `${data.browser || '—'} / ${data.os || '—'}`], ['In-app browser', data.inAppBrowser ? data.inAppSource || 'Yes' : 'No']]],
  ];
  return <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Visitor session details">
    <button aria-label="Close session details" onClick={onClose} className="absolute inset-0 bg-slate-950/25 backdrop-blur-[2px]" />
    <aside className="relative z-10 h-full w-full max-w-[420px] overflow-y-auto border-l border-slate-200 bg-slate-50 shadow-2xl">
      <header className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="min-w-0"><h3 className="truncate text-sm font-bold text-slate-900">{inq?.name || 'Visitor session'}</h3><div className="mt-1 flex items-center gap-2"><LiveDot active={isLive(s.lastActiveAt)}/><span className="text-[11px] text-slate-500">{isLive(s.lastActiveAt) ? 'Active now' : `Last seen ${ago(s.lastActiveAt)}`}</span><Outcome inquiry={inq} applied={s.applied}/></div></div>
        <button onClick={onClose} className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50" aria-label="Close"><X size={16}/></button>
      </header>
      <div className="space-y-3 p-3">
        {inq && <section className={cx(panel, 'overflow-hidden')}>
          <div className="border-b border-blue-100 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-900">Inquiry details</div>
          <div className="space-y-2 p-3 text-xs">
            <p><b className="text-slate-500">Status:</b> {inq.status || '—'}</p>
            <p className="flex items-center gap-2"><Mail size={13}/><a className="text-blue-600 hover:underline" href={`mailto:${inq.email}`}>{inq.email || '—'}</a></p>
            <p className="flex items-center gap-2"><Phone size={13}/>{inq.phone || 'Not provided'}</p>
            <p className="flex items-center gap-2"><Building2 size={13}/>{inq.companyName || '—'}</p>
            <p><b className="text-slate-500">Budget:</b> {inq.budget || '—'}</p>
            {inq.message && <p className="rounded-lg bg-slate-50 p-2 leading-relaxed text-slate-600">{inq.message}</p>}
          </div>
        </section>}
        {groups.map(([title, items]) => <section key={title} className={cx(panel, 'overflow-hidden')}>
          <h4 className="border-b border-slate-100 bg-slate-50 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-slate-600">{title}</h4>
          <dl className="divide-y divide-slate-100 px-3">{items.map(([k,v]) => <div key={k} className="flex items-start justify-between gap-4 py-2 text-[11px]"><dt className="shrink-0 text-slate-500">{k}</dt><dd className="max-w-[65%] break-words text-right font-semibold text-slate-800">{v}</dd></div>)}</dl>
        </section>)}
        {s.sessionId && <p className="break-all px-1 font-mono text-[10px] text-slate-400">Session ID: {s.sessionId}</p>}
      </div>
    </aside>
  </div>;
}

export default function AnalyticsDashboardPage() {
  const [days, setDays] = useState(30);
  const [overview, setOverview] = useState(null);
  const [sessionsData, setSessionsData] = useState(null);
  const [liveList, setLiveList] = useState([]);
  const [inqData, setInqData] = useState(null);
  const [leadsData, setLeadsData] = useState([]);
  const [errors, setErrors] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [device, setDevice] = useState('');
  const [channel, setChannel] = useState('');
  const [outcome, setOutcome] = useState('');
  const [activeOnly, setActiveOnly] = useState(false);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState('cities');
  const requestIds = useRef({ overview: 0, sessions: 0, side: 0 });

  useEffect(() => {
    const t = setTimeout(() => { setDebounced(search.trim()); setPage(0); }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const loadOverview = useCallback(async () => {
    const id = ++requestIds.current.overview;
    try {
      const result = await fetchAnalyticsOverview(days);
      if (id !== requestIds.current.overview) return;
      setOverview(result); setUpdatedAt(new Date());
      setErrors(e => ({ ...e, overview: null }));
    } catch (e) {
      if (id === requestIds.current.overview) setErrors(v => ({ ...v, overview: e?.message || 'Unable to load overview' }));
    }
  }, [days]);

  const loadSessions = useCallback(async () => {
    const id = ++requestIds.current.sessions;
    try {
      const result = await fetchAnalyticsSessions({
        search: debounced || undefined, deviceType: device || undefined, channel: channel || undefined,
        applied: outcome === 'converted' ? true : outcome === 'browsing' ? false : undefined,
        activeNow: activeOnly || undefined, from: isoDaysAgo(days), page, size: PAGE_SIZE,
        sortBy: activeOnly ? 'lastActiveAt' : 'createdAt', direction: 'desc',
      });
      if (id !== requestIds.current.sessions) return;
      setSessionsData(result || { content: [], totalElements: 0, totalPages: 1 });
      setErrors(e => ({ ...e, sessions: null }));
    } catch (e) {
      if (id === requestIds.current.sessions) setErrors(v => ({ ...v, sessions: e?.message || 'Unable to load sessions' }));
    }
  }, [days, debounced, device, channel, outcome, activeOnly, page]);

  const loadSide = useCallback(async () => {
    const id = ++requestIds.current.side;
    const [live, inquiries, leads] = await Promise.all([
      fetchAnalyticsSessions({ activeNow: true, size: 50, sortBy: 'lastActiveAt', direction: 'desc' }).catch(() => null),
      fetchInquiries({ size: 200, page: 0 }).catch(() => null),
      fetchAnalyticsLeads().catch(() => null),
    ]);
    if (id !== requestIds.current.side) return;
    setLiveList((live?.content || []).filter(s => isLive(s.lastActiveAt)));
    if (inquiries) setInqData(inquiries);
    if (leads) setLeadsData(leads || []);
  }, []);

  useEffect(() => { loadOverview(); }, [loadOverview]);
  useEffect(() => { loadSessions(); }, [loadSessions]);
  useEffect(() => { loadSide(); }, [loadSide]);
  useEffect(() => {
    const tick = () => { if (!document.hidden) { loadOverview(); loadSessions(); loadSide(); } };
    const timer = setInterval(tick, POLL_MS);
    document.addEventListener('visibilitychange', tick);
    return () => { clearInterval(timer); document.removeEventListener('visibilitychange', tick); };
  }, [loadOverview, loadSessions, loadSide]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try { await Promise.all([loadOverview(), loadSessions(), loadSide()]); }
    finally { setRefreshing(false); }
  }, [loadOverview, loadSessions, loadSide]);

  const totalPages = Math.max(1, sessionsData?.totalPages || 1);
  useEffect(() => { if (sessionsData?.totalPages > 0 && page >= sessionsData.totalPages) setPage(sessionsData.totalPages - 1); }, [sessionsData, page]);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('session');
    if (id) fetchAnalyticsSessionById(id).then(setSelected).catch(() => {});
  }, []);

  const closeSession = useCallback(() => {
    setSelected(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('session');
    window.history.replaceState({}, '', url.pathname + url.search + url.hash);
  }, []);

  const inquiryBySession = useMemo(() => {
    const map = {};
    const emailToSession = {};
    (leadsData || []).forEach(l => {
      const email = (l.email || '').trim().toLowerCase();
      const sid = l.session_id || l.sessionId;
      if (email && sid) emailToSession[email] = sid;
    });
    (inqData?.content || []).forEach(i => {
      const email = (i.email || '').trim().toLowerCase();
      const sid = i.sessionId || i.session_id || emailToSession[email];
      if (sid) map[sid] = { ...i, sessionId: sid };
    });
    return map;
  }, [inqData, leadsData]);

  const ready = !!overview;
  const live = overview?.live || {};
  const volume = overview?.trafficVolume || {};
  const engagement = overview?.engagement || {};
  const env = overview?.environment || {};
  const funnel = overview?.funnelConversion || {};
  const channels = overview?.topTrafficChannels || [];
  const campaigns = overview?.topCampaigns || [];
  const referrers = overview?.topReferrers || [];
  const landing = overview?.topLandingPages || [];
  const cities = overview?.topCities || [];
  const sessions = sessionsData?.content || [];

  const trend = useMemo(() => (overview?.dailyVisitorTrend || []).map(d => {
    const date = parseDay(d.day);
    return { label: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), short: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), value: num(d.visitors) };
  }), [overview]);

  const mapPoints = useMemo(() => {
    const activeCities = new Set(liveList.map(s => (s.city || '').toLowerCase()));
    const points = cities.map(c => ({ id: `${c.city}-${c.country}`, city: c.city, country: c.country, count: num(c.sessions), applies: num(c.applies), live: activeCities.has((c.city || '').toLowerCase()) }));
    const known = new Set(points.map(p => (p.city || '').toLowerCase()));
    liveList.forEach(s => {
      const city = (s.city || '').toLowerCase();
      if (city && !known.has(city)) { known.add(city); points.push({ id: `live-${city}`, city: s.city, country: s.country, count: 1, applies: 0, live: true }); }
    });
    return points;
  }, [cities, liveList]);

  const deviceSegments = [
    { label: 'Mobile', value: num(env.mobilePercentage), color: '#2563eb' },
    { label: 'Desktop', value: num(env.desktopPercentage), color: '#0f172a' },
    { label: 'Tablet', value: num(env.tabletPercentage), color: '#93c5fd' },
  ];

  const breakdown = useMemo(() => {
    const total = channels.reduce((a,c) => a + num(c.sessions), 0) || 1;
    return {
      cities: cities.map((c,i) => ({ key: `${c.city}-${i}`, label: c.city || 'Unknown', sub: [c.region,c.country].filter(Boolean).join(', '), value: num(c.sessions), applies: num(c.applies) })),
      channels: channels.map((c,i) => ({ key: `${c.channel}-${i}`, label: c.channel, sub: `${Math.round(num(c.sessions)*100/total)}% of traffic · ${fmtDur(c.avg_active_seconds)} avg focus`, value: num(c.sessions), applies: num(c.applies), rate: c.conversion_rate })),
      campaigns: campaigns.map((c,i) => ({ key: `${c.utm_campaign}-${i}`, label: c.utm_campaign || '(not set)', sub: `${c.utm_source || '—'} / ${c.utm_medium || '—'}`, value: num(c.sessions), applies: num(c.applies), rate: c.conversion_rate })),
      referrers: referrers.map((r,i) => ({ key: `${r.referrer_domain}-${i}`, label: r.referrer_domain || 'Direct', value: num(r.sessions), applies: num(r.applies) })),
      pages: landing.map((p,i) => ({ key: `${p.entry_path}-${i}`, label: p.entry_path || '/', sub: `${fmtDur(p.avg_active_seconds)} average focus`, value: num(p.sessions) })),
    };
  }, [cities, channels, campaigns, referrers, landing]);

  const emptyLabels = { cities: 'No location data yet.', channels: 'No channel data yet.', campaigns: 'No campaign data yet.', referrers: 'No referral data yet.', pages: 'No page data yet.' };
  const hasFilters = !!(search || device || channel || outcome || activeOnly);
  const clearFilters = () => { setSearch(''); setDebounced(''); setDevice(''); setChannel(''); setOutcome(''); setActiveOnly(false); setPage(0); };
  const error = errors.overview || errors.sessions;

  return <main className="min-h-screen space-y-3 bg-slate-50/70 p-2.5 text-[12px] text-slate-800 sm:p-4 lg:p-5" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">Platform Analytics</h1>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700"><LiveDot/>{liveList.length} live</span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500">Traffic, acquisition, engagement and campaign conversions{updatedAt && ` · Updated ${updatedAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`}</p>
      </div>
      <div className="flex items-center gap-2">
        <Segmented label="Date range" value={days} onChange={v => { setDays(v); setPage(0); }} options={RANGE_OPTIONS}/>
        <button onClick={refresh} className={cx('inline-flex h-8 items-center gap-1.5 rounded-lg bg-blue-600 px-3 text-[11px] font-semibold text-white shadow-sm hover:bg-blue-700', buttonFocus)}><RefreshCw size={13} className={refreshing ? 'animate-spin' : ''}/>Refresh</button>
      </div>
    </header>

    {error && <div role="alert" className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] text-rose-700"><AlertCircle size={14}/><span className="flex-1">Unable to load analytics: {error}</span><button onClick={refresh} className="font-bold underline">Retry</button></div>}

    <section className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
      <Kpi icon={Activity} label="Active now" value={ready ? n(live.activeUsersRightNow) : '—'} detail={`${n(live.currentlyViewingCampaigns)} viewing campaigns`} live/>
      <Kpi icon={Users} label="Visitors today" value={ready ? n(volume.todayUniqueVisitors) : '—'} detail={`${n(volume.thisMonthUniqueVisitors)} this month`}/>
      <Kpi icon={Clock3} label="Average dwell time" value={ready ? engagement.averageEngagementDisplay || '0m 00s' : '—'} detail={`${engagement.averageActiveDwellDisplay || '0m 00s'} actively focused`}/>
      <Kpi icon={MousePointerClick} label="Applies & conversions" value={ready ? n(funnel.applyButtonClicks) : '—'} detail={`${funnel.overallConversionRate ?? 0}% apply rate · ${n(funnel.optInLeads)} opt-ins`}/>
    </section>

    <section className="grid gap-2.5 xl:grid-cols-12">
      <div className={cx(panel, 'flex min-h-[250px] flex-col xl:col-span-5')}>
        <PanelHead title="Unique visitors" subtitle={`Daily visitors · last ${days} days`}/>
        <div className="min-h-[145px] flex-1 px-2.5 py-2">{ready ? <TrendChart data={trend}/> : <Empty>Loading visitor trend…</Empty>}</div>
        <div className="grid grid-cols-4 divide-x divide-slate-100 border-t border-slate-100">
          {[
            ['Sessions', n(funnel.sessions ?? volume.sessionsInWindow)],
            ['Bounce', `${engagement.bounceRatePercentage ?? 0}%`],
            ['Pages / visit', engagement.averagePageViewsPerSession ?? 0],
            ['Returning', `${env.returningVisitorPercentage ?? 0}%`],
          ].map(([label,value]) => <div key={label} className="min-w-0 px-2 py-2"><p className="truncate text-[9px] text-slate-400">{label}</p><b className="mt-0.5 block truncate text-[11px] tabular-nums text-slate-800">{ready ? value : '—'}</b></div>)}
        </div>
      </div>
      <div className={cx(panel, 'flex min-h-[250px] flex-col xl:col-span-4')}>
        <PanelHead title="Visitor locations" subtitle="Geographic distribution · green indicates live"/>
        <div className="min-h-[190px] flex-1 p-2"><WorldMap points={mapPoints}/></div>
      </div>
      <div className={cx(panel, 'flex min-h-[250px] flex-col xl:col-span-3')}>
        <PanelHead title="Live visitors" subtitle="Active in the last 5 minutes" action={<span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600"><LiveDot/>{liveList.length}</span>}/>
        <div className="min-h-0 flex-1 divide-y divide-slate-100 overflow-y-auto px-2.5">
          {!liveList.length ? <Empty>Nobody is browsing right now.</Empty> : liveList.slice(0, 8).map(s => {
            const inq = inquiryBySession[s.sessionId];
            return <button key={s.sessionId} onClick={() => setSelected(s)} className={cx('flex w-full items-center justify-between gap-2 py-2 text-left hover:bg-slate-50', buttonFocus)}>
              <span className="min-w-0"><span className="flex items-center gap-1.5 truncate text-[11px] font-semibold text-slate-800"><LiveDot/>{inq?.name || `${s.city || 'Unknown'}, ${s.country || '—'}`}</span><span className="mt-0.5 block truncate pl-3.5 text-[10px] text-slate-400">{s.lastPath || s.entryPath || '/'} · {s.deviceType || '—'}</span></span>
              <span className="shrink-0 text-[10px] tabular-nums text-slate-500">{fmtDur(s.durationSeconds)}</span>
            </button>;
          })}
        </div>
      </div>
    </section>

    <section className="grid gap-2.5 xl:grid-cols-12">
      <div className={cx(panel, 'min-h-[280px] xl:col-span-3')}>
        <PanelHead title="Traffic breakdown" subtitle={`Top sources · ${days} days`}/>
        <div className="flex gap-0.5 overflow-x-auto border-b border-slate-100 px-2 py-2">
          {TABS.map(([id,label]) => <button key={id} onClick={() => setTab(id)} className={cx('shrink-0 rounded-md px-2 py-1.5 text-[10px] font-semibold', tab === id ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50')}>{label}</button>)}
        </div>
        <div className="pt-2">{!ready ? <Empty>Loading breakdown…</Empty> : tab === 'devices' ? <DeviceBreakdown env={env} segments={deviceSegments}/> : <RankList rows={breakdown[tab]} empty={emptyLabels[tab]} heading={tab === 'pages' ? 'Entries' : 'Visits'}/>}</div>
      </div>

      <div className={cx(panel, 'min-w-0 overflow-hidden xl:col-span-9')}>
        <PanelHead title="Visitor sessions" subtitle="Individual visitor activity, source and conversion status" action={hasFilters ? <button onClick={clearFilters} className="text-[11px] font-semibold text-blue-600 hover:text-blue-700">Clear filters</button> : null}/>
        <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-100 px-3 py-2.5">
          <div className="relative min-w-[170px] flex-1">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"/>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search visitor, city, UTM, page…" aria-label="Search sessions" className={cx(inputClass, 'w-full pl-8')}/>
          </div>
          <select value={device} onChange={e => { setDevice(e.target.value); setPage(0); }} aria-label="Filter device" className={inputClass}><option value="">All devices</option>{DEVICES.map(v => <option key={v}>{v}</option>)}</select>
          <select value={channel} onChange={e => { setChannel(e.target.value); setPage(0); }} aria-label="Filter channel" className={inputClass}><option value="">All channels</option>{CHANNELS.map(v => <option key={v}>{v}</option>)}</select>
          <select value={outcome} onChange={e => { setOutcome(e.target.value); setPage(0); }} aria-label="Filter outcome" className={inputClass}><option value="">All outcomes</option><option value="converted">Converted</option><option value="browsing">Browsing</option></select>
          <button aria-pressed={activeOnly} onClick={() => { setActiveOnly(v => !v); setPage(0); }} className={cx('h-8 rounded-lg border px-2.5 text-[10px] font-semibold', activeOnly ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50')}><span className="inline-flex items-center gap-1.5"><LiveDot active={activeOnly}/>{`Live (${liveList.length})`}</span></button>
        </div>

        {/* Desktop: compact fixed-layout table. Mobile: readable compact visitor cards. */}
        <div className="hidden md:block">
          <table className="w-full table-fixed text-left">
            <colgroup><col className="w-[22%]"/><col className="w-[17%]"/><col className="w-[16%]"/><col className="w-[20%]"/><col className="w-[12%]"/><col className="w-[13%]"/></colgroup>
            <thead className="bg-slate-50 text-[9px] font-bold uppercase tracking-wide text-slate-400">
              <tr><th className="px-3 py-2.5">Visitor</th><th className="px-2 py-2.5">Location</th><th className="px-2 py-2.5">Engagement</th><th className="px-2 py-2.5">Source</th><th className="px-2 py-2.5">Outcome</th><th className="px-3 py-2.5 text-right">Last active</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {!sessionsData ? <tr><td colSpan="6"><Empty>Loading sessions…</Empty></td></tr> : !sessions.length ? <tr><td colSpan="6"><Empty>No sessions match these filters.</Empty></td></tr> : sessions.map(s => {
                const inquiry = inquiryBySession[s.sessionId];
                const active = isLive(s.lastActiveAt);
                const visitor = inquiry?.name || `Visitor #${(s.visitorHash || s.sessionId || '').slice(0,7)}`;
                return <tr key={s.sessionId} onClick={() => setSelected(s)} tabIndex={0} onKeyDown={e => e.key === 'Enter' && setSelected(s)} className="cursor-pointer transition hover:bg-blue-50/40 focus:bg-blue-50/50">
                  <td className="px-3 py-2"><div className="flex min-w-0 items-center gap-2"><LiveDot active={active}/><div className="min-w-0"><p className="truncate text-[10px] font-bold text-slate-800">{visitor}</p><p className="truncate text-[9px] text-slate-400">{inquiry?.email || (s.returningVisitor ? 'Returning visitor' : 'New visitor')}</p></div></div></td>
                  <td className="px-2 py-2"><p className="truncate text-[10px] font-semibold text-slate-700">{s.city || 'Unknown'}</p><p className="truncate text-[9px] text-slate-400">{[s.region,s.country,s.deviceType].filter(Boolean).join(' · ')}</p></td>
                  <td className="px-2 py-2"><p className="text-[10px] font-bold tabular-nums text-slate-800">{fmtDur(s.durationSeconds)}</p><p className="truncate text-[9px] text-slate-400">{s.pageViews || 0} pages · {fmtDur(s.activeDwellSeconds)} focus</p></td>
                  <td className="px-2 py-2"><p className="truncate text-[10px] font-semibold text-slate-700">{s.channel || 'Direct'}{s.inAppBrowser ? ` · ${s.inAppSource || 'In-app'}` : ''}</p><p className="truncate text-[9px] text-slate-400">{s.utmCampaign || s.referrerDomain || s.entryPath || '/'}</p></td>
                  <td className="px-2 py-2"><Outcome inquiry={inquiry} applied={s.applied}/></td>
                  <td className="px-3 py-2 text-right"><span className={cx('text-[10px] font-medium', active ? 'text-emerald-600' : 'text-slate-400')}>{active ? 'Active now' : ago(s.lastActiveAt)}</span></td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>

        <div className="divide-y divide-slate-100 md:hidden">
          {!sessionsData ? <Empty>Loading sessions…</Empty> : !sessions.length ? <Empty>No sessions match these filters.</Empty> : sessions.map(s => {
            const inquiry = inquiryBySession[s.sessionId];
            const active = isLive(s.lastActiveAt);
            return <button key={s.sessionId} onClick={() => setSelected(s)} className="block w-full px-3 py-2.5 text-left hover:bg-blue-50/40">
              <div className="flex items-start justify-between gap-2"><span className="flex min-w-0 items-center gap-2"><LiveDot active={active}/><span className="min-w-0"><b className="block truncate text-[11px] text-slate-800">{inquiry?.name || `Visitor #${(s.visitorHash || s.sessionId || '').slice(0,7)}`}</b><span className="block truncate text-[10px] text-slate-400">{inquiry?.email || `${s.city || 'Unknown'} · ${s.country || '—'}`}</span></span></span><Outcome inquiry={inquiry} applied={s.applied}/></div>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 pl-4 text-[10px] text-slate-500"><span>{fmtDur(s.durationSeconds)}</span><span>{s.pageViews || 0} pages</span><span>{s.channel || 'Direct'}</span><span>{active ? 'Active now' : ago(s.lastActiveAt)}</span></div>
            </button>;
          })}
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-3 py-2 text-[10px] text-slate-500">
          <span className="tabular-nums">{sessions.length ? `${page * PAGE_SIZE + 1}–${page * PAGE_SIZE + sessions.length}` : 0} of {n(sessionsData?.totalElements)} sessions</span>
          <div className="flex items-center gap-2">
            <button aria-label="Previous page" disabled={page === 0} onClick={() => setPage(p => Math.max(0,p-1))} className="rounded-md border border-slate-200 p-1.5 disabled:opacity-30"><ChevronLeft size={13}/></button>
            <span className="tabular-nums">Page {page+1} / {totalPages}</span>
            <button aria-label="Next page" disabled={page >= totalPages-1} onClick={() => setPage(p => p+1)} className="rounded-md border border-slate-200 p-1.5 disabled:opacity-30"><ChevronRight size={13}/></button>
          </div>
        </footer>
      </div>
    </section>

    {selected && <SessionDrawer session={selected} inquiry={inquiryBySession[selected.sessionId]} onClose={closeSession}/>}
  </main>;
}
