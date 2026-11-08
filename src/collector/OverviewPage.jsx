import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Mail, UserCheck, Target, TrendingUp, PieChart, MapPin,
  ExternalLink, Download, Search, ArrowRight, Zap, Trophy, Inbox,
  AlertCircle, RefreshCw, Flame, CalendarDays,
} from 'lucide-react';
import { fetchDashboardOverview, fetchTeamMembers, getExportCsvUrl } from '../services/collectorApi';

/* ───────────────────────── Config & helpers ───────────────────────── */

const CURRENT_USER = { name: 'Rohan Mandal', role: 'Admin' };

const RANGES = [
  { value: 'TODAY', label: 'Today', quota: 50, caption: 'today', days: 1 },
  { value: 'LAST_7_DAYS', label: 'Last 7 Days', quota: 100, caption: 'in the last 7 days', days: 7 },
  { value: 'THIS_MONTH', label: 'This Month', quota: 500, caption: 'this month', days: 30 },
];

const DONUT_COLORS = ['#2563eb', '#38bdf8', '#818cf8', '#c084fc', '#2dd4bf'];
const DOT_COLORS = ['bg-blue-600', 'bg-sky-400', 'bg-indigo-400', 'bg-purple-400', 'bg-teal-400'];
const SHARE_COLORS = ['bg-blue-600', 'bg-sky-400', 'bg-indigo-400', 'bg-purple-400', 'bg-teal-400'];

const CARD =
  'bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.06)]';

const getInitials = (name) => {
  if (!name) return 'TM';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
};

const getNicheBadgeStyle = (niche) => {
  const n = (niche || '').toLowerCase();
  if (n.includes('model')) return 'bg-purple-50 text-purple-700 border-purple-100/80';
  if (n.includes('fashion')) return 'bg-amber-50 text-amber-700 border-amber-100/80';
  if (n.includes('fitness')) return 'bg-emerald-50 text-emerald-700 border-emerald-100/80';
  if (n.includes('travel')) return 'bg-sky-50 text-sky-700 border-sky-100/80';
  if (n.includes('beauty')) return 'bg-rose-50 text-rose-600 border-rose-100/80';
  if (n.includes('food')) return 'bg-orange-50 text-orange-700 border-orange-100/80';
  if (n.includes('tech')) return 'bg-blue-50 text-blue-700 border-blue-100/80';
  return 'bg-slate-50 text-slate-700 border-slate-200';
};

const formatFollowers = (n) => {
  if (n == null) return '—';
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return Number(n).toLocaleString();
};

const num = (v) => (typeof v === 'number' && !Number.isNaN(v) ? v : 0);

const smoothPath = (pts) => {
  if (pts.length < 2) return '';
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    d += ` C ${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  return d;
};

/* API: TrendDataPointDto { date, totalCreators, uniqueEmails } */
const normalizeTrend = (trend) =>
  (trend || []).map((t) => ({
    date: String(t.date || t.label || '').trim(),
    total: num(t.totalCreators ?? t.total ?? t.creators ?? t.count),
    emails: num(t.uniqueEmails ?? t.emails ?? t.withEmail),
  }));

const dayLabel = (d) => new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short' }).format(d);

/* The API only returns days that have data. Build the full day axis for the
   selected range and fill the gaps with 0 so the chart shows a real timeline. */
const fillSeries = (points, rangeValue) => {
  if (rangeValue === 'TODAY') return points;
  const today = new Date();
  const days = [];
  if (rangeValue === 'THIS_MONTH') {
    for (let day = 1; day <= today.getDate(); day++) {
      days.push(new Date(today.getFullYear(), today.getMonth(), day));
    }
  } else {
    for (let i = 6; i >= 0; i--) {
      days.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() - i));
    }
  }
  const labels = days.map(dayLabel);
  const byDate = new Map(points.map((p) => [p.date, p]));
  // If the backend's date labels don't match this format, don't guess — show them as sent.
  if (points.length > 0 && !points.some((p) => labels.includes(p.date))) return points;
  return labels.map((label) => byDate.get(label) || { date: label, total: 0, emails: 0 });
};

/* ───────────────────────── Small building blocks ───────────────────────── */

const Skeleton = ({ className = '' }) => <div className={`animate-pulse rounded-md bg-slate-100 ${className}`} />;

const Sparkline = ({ values, color = '#3b82f6' }) => {
  if (!values || values.length < 2) return null;
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const pts = values.map((v, i) => [2 + (i / (values.length - 1)) * 76, 18 - ((v - min) / range) * 16]);
  return (
    <svg className="w-20 h-6" viewBox="0 0 80 20" fill="none" aria-hidden="true">
      <path d={smoothPath(pts)} stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

const Delta = ({ value }) => {
  if (!value) return null;
  const str = String(value);
  const negative = str.trim().startsWith('-');
  return (
    <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-md ${negative ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
      {negative ? '↓' : '↑'} {str.replace(/^[+-]/, '')}
    </span>
  );
};

const CardTitle = ({ icon: Icon, title, subtitle, right, tint = 'bg-blue-50 text-blue-600' }) => (
  <div className="flex items-start justify-between gap-3">
    <div className="flex items-center gap-2.5">
      <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${tint}`}>
        <Icon className="w-4 h-4" />
      </span>
      <div>
        <h3 className="text-sm font-bold text-slate-900 leading-tight">{title}</h3>
        {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
    {right}
  </div>
);

const EmptyState = ({ icon: Icon = Inbox, title, hint }) => (
  <div className="flex flex-col items-center justify-center text-center py-8 px-4 h-full">
    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-300 flex items-center justify-center mb-3">
      <Icon className="w-5 h-5" />
    </div>
    <p className="text-xs font-semibold text-slate-700">{title}</p>
    {hint && <p className="text-[11px] text-slate-400 mt-1 max-w-[220px]">{hint}</p>}
  </div>
);

const Ring = ({ pct, size = 'w-36 h-36', stroke = 4, color = '#2563eb', children }) => (
  <div className={`relative ${size} shrink-0`}>
    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" role="img" aria-label={`${pct}% complete`}>
      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth={stroke} />
      <circle
        cx="18" cy="18" r="15.915" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={`${Math.max(0, Math.min(100, pct))} 100`}
        style={{ transition: 'stroke-dasharray 700ms ease' }}
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
  </div>
);

/* ───────────────────────── Trend chart ───────────────────────── */

const TrendChart = ({ data }) => {
  const [hover, setHover] = useState(null);
  const W = 640, H = 220, PX = 12, PT = 16, PB = 10;

  const { totalPts, emailPts } = useMemo(() => {
    const m = Math.max(...data.map((d) => Math.max(d.total, d.emails)), 1);
    const x = (i) => PX + (data.length === 1 ? (W - PX * 2) / 2 : (i / (data.length - 1)) * (W - PX * 2));
    const y = (v) => PT + (1 - v / m) * (H - PT - PB);
    return {
      totalPts: data.map((d, i) => [x(i), y(d.total)]),
      emailPts: data.map((d, i) => [x(i), y(d.emails)]),
    };
  }, [data]);

  if (data.length === 0) {
    return <EmptyState icon={TrendingUp} title="No collection activity yet" hint="Creators added by your team will show up here." />;
  }

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const idx = Math.round(((e.clientX - rect.left) / rect.width) * (data.length - 1));
    setHover(Math.max(0, Math.min(data.length - 1, idx)));
  };

  const baseY = H - PB;
  const area = `${smoothPath(totalPts)} L ${totalPts[totalPts.length - 1][0]},${baseY} L ${totalPts[0][0]},${baseY} Z`;
  const grid = [0, 1, 2, 3].map((i) => PT + (i / 3) * (H - PT - PB));

  return (
    <div className="flex flex-col h-full">
      <div className="relative flex-1 min-h-[14rem]" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label="Collection trend chart">
          <defs>
            <linearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {grid.map((gy, i) => (
            <line key={i} x1="0" y1={gy} x2={W} y2={gy} stroke="#f1f5f9" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
          ))}
          {data.length > 1 && <path d={area} fill="url(#trendArea)" />}
          {data.length > 1 && (
            <>
              <path d={smoothPath(emailPts)} fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <path d={smoothPath(totalPts)} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </>
          )}
          {hover != null && (
            <line x1={totalPts[hover][0]} y1={PT} x2={totalPts[hover][0]} y2={baseY} stroke="#cbd5e1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
          )}
        </svg>

        {totalPts.map((p, i) => {
          const active = hover === i || (hover == null && i === totalPts.length - 1);
          return (
            <span
              key={i}
              className={`absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 ring-2 ring-white transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`}
              style={{ left: `${(p[0] / W) * 100}%`, top: `${(p[1] / H) * 100}%` }}
            />
          );
        })}

        {hover != null && (
          <div
            className="absolute -translate-x-1/2 -translate-y-full pointer-events-none bg-slate-900 text-white rounded-lg px-2.5 py-1.5 text-[10px] shadow-lg whitespace-nowrap z-10"
            style={{ left: `${Math.min(90, Math.max(10, (totalPts[hover][0] / W) * 100))}%`, top: `${(totalPts[hover][1] / H) * 100 - 4}%` }}
          >
            <p className="text-slate-300 font-medium">{data[hover].date}</p>
            <p className="font-semibold">{data[hover].total} creators · {data[hover].emails} emails</p>
          </div>
        )}
      </div>

      <div className="flex justify-between text-[10px] text-slate-400 mt-2 px-1">
        {data.map((t, i) => (
          <span key={i} className={data.length > 10 && i % 2 ? 'hidden sm:inline' : ''}>{t.date}</span>
        ))}
      </div>
    </div>
  );
};

/* ───────────────────────── Page ───────────────────────── */

export default function OverviewPage() {
  const [data, setData] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('LAST_7_DAYS');
  const [loadedRange, setLoadedRange] = useState('LAST_7_DAYS');
  const [searchQuery, setSearchQuery] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const membersRef = useRef([]);

  const range = RANGES.find((r) => r.value === timeRange) || RANGES[1];

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);

    Promise.all([
      fetchDashboardOverview(timeRange),
      membersRef.current.length > 0 ? Promise.resolve(membersRef.current) : fetchTeamMembers(),
    ])
      .then(([overviewRes, membersRes]) => {
        if (!alive) return;
        const members = membersRes || [];
        membersRef.current = members;
        setTeamMembers(members);
        setData(overviewRes);
        setLoadedRange(timeRange);
      })
      .catch((err) => {
        console.error('Dashboard load error:', err);
        if (alive) setError('We couldn’t load the dashboard. Check your connection and try again.');
      })
      .finally(() => alive && setLoading(false));

    return () => { alive = false; };
  }, [timeRange, reloadKey]);

  const kpis = data?.kpis;
  const trend = useMemo(
    () => fillSeries(normalizeTrend(data?.collectionTrend), loadedRange),
    [data, loadedRange]
  );
  const niches = data?.nicheDistribution || [];
  const locations = data?.locationInsights || [];
  const recentCreators = data?.recentCreators || [];

  const competition = useMemo(() => {
    const countMap = {};
    (data?.teamCompetition || []).forEach((c) => {
      if (c.memberId) countMap[c.memberId] = c.creators;
      if (c.name) countMap[c.name.toLowerCase()] = c.creators;
    });
    const list = teamMembers.map((m) => ({
      memberId: m.id,
      name: m.displayName || 'Member',
      username: m.telegramUsername ? `@${m.telegramUsername}` : null,
      role: m.role || 'member',
      initials: getInitials(m.displayName),
      creators: countMap[m.id] ?? countMap[m.displayName?.toLowerCase()] ?? 0,
    }));
    const total = list.reduce((a, c) => a + c.creators, 0);
    list.sort((a, b) => b.creators - a.creators);
    return list.map((item, idx) => ({
      ...item,
      rank: idx + 1,
      share: total > 0 ? Math.round((item.creators / total) * 100) : 0,
      progress: Math.min(100, Math.round((item.creators / range.quota) * 100)),
    }));
  }, [data, teamMembers, range.quota]);

  const totalTeamCollected = competition.reduce((a, c) => a + c.creators, 0);
  const first = competition[0] || null;

  const totalCreators = num(kpis?.totalCreators);
  const uniqueEmails = num(kpis?.uniqueEmails);
  const emailHitRate = totalCreators > 0 ? Math.round((uniqueEmails / totalCreators) * 100) : null;

  const targetGoal = num(kpis?.todayTargetGoal) || 100;
  const targetProgress = num(kpis?.todayTargetProgress);
  const targetPct = Math.min(100, kpis?.todayTargetPercentage ?? Math.round((targetProgress / targetGoal) * 100));
  const targetLeft = Math.max(0, targetGoal - targetProgress);

  const trendStats = useMemo(() => {
    if (trend.length === 0) return null;
    const sum = trend.reduce((a, t) => a + t.total, 0);
    const peak = trend.reduce((a, t) => (t.total > a.total ? t : a), trend[0]);
    return { sum, avg: Math.round((sum / trend.length) * 10) / 10, peak };
  }, [trend]);

  const donut = useMemo(() => {
    const items = niches.slice(0, 5);
    const sum = items.reduce((a, n) => a + num(n.percentage), 0) || 1;
    let offset = 0;
    return items.map((n, i) => {
      const pct = (num(n.percentage) / sum) * 100;
      const seg = { ...n, pct, offset, color: DONUT_COLORS[i % DONUT_COLORS.length] };
      offset += pct;
      return seg;
    });
  }, [niches]);

  const filteredCreators = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return recentCreators;
    return recentCreators.filter((c) => [c.username, c.name, c.email, c.location].some((f) => f && f.toLowerCase().includes(q)));
  }, [recentCreators, searchQuery]);

  const showSkeleton = loading && !data;

  if (error && !data) {
    return (
      <div className={`${CARD} p-10 flex flex-col items-center text-center max-w-md mx-auto mt-16 text-slate-800 antialiased font-sans`}>
        <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center mb-4">
          <AlertCircle className="w-5 h-5" />
        </div>
        <h2 className="text-base font-bold text-slate-900">Dashboard unavailable</h2>
        <p className="text-xs text-slate-500 mt-1.5">{error}</p>
        <button
          type="button"
          onClick={() => setReloadKey((k) => k + 1)}
          className="mt-5 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg px-4 py-2 shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-slate-800 antialiased font-sans max-w-[1400px] mx-auto">

      {/* ───── Header ───── */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Team Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">Track creator collection, team performance and competition in real time.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex bg-slate-100/90 p-0.5 rounded-lg text-xs font-medium" role="tablist" aria-label="Time range">
            {RANGES.map((r) => {
              const active = timeRange === r.value;
              return (
                <button
                  key={r.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTimeRange(r.value)}
                  className={`px-3.5 py-2 rounded-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 ${
                    active ? 'bg-white text-blue-600 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>

          <a
            href={getExportCsvUrl({ timeRange })}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3.5 py-2 shadow-sm text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            Export CSV
          </a>

          <div className="flex items-center gap-2.5 pl-3 ml-1 border-l border-slate-200">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-semibold text-xs flex items-center justify-center shadow-sm ring-2 ring-white">
              {getInitials(CURRENT_USER.name)}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-slate-900 leading-tight">{CURRENT_USER.name}</p>
              <p className="text-[11px] text-slate-400">{CURRENT_USER.role}</p>
            </div>
          </div>
        </div>
      </header>

      {/* ───── KPI strip (single compact card) ───── */}
      <section aria-label="Key metrics" className={`${CARD} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-slate-100`}>
        {/* Total creators */}
        <div className="p-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center"><Users className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Creators</p>
              <div className="flex items-center gap-2 mt-0.5">
                {showSkeleton ? <Skeleton className="h-7 w-12" /> : <p className="text-2xl font-bold text-slate-900 tracking-tight leading-none">{totalCreators.toLocaleString()}</p>}
                <Delta value={kpis?.totalCreatorsGrowth} />
              </div>
            </div>
          </div>
          <Sparkline values={trend.map((t) => t.total)} color="#0ea5e9" />
        </div>

        {/* Unique emails */}
        <div className="p-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center"><Mail className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Unique Emails</p>
              <div className="flex items-center gap-2 mt-0.5">
                {showSkeleton ? <Skeleton className="h-7 w-12" /> : <p className="text-2xl font-bold text-slate-900 tracking-tight leading-none">{uniqueEmails.toLocaleString()}</p>}
                <Delta value={kpis?.uniqueEmailsGrowth} />
              </div>
            </div>
          </div>
          <Sparkline values={trend.map((t) => t.emails)} color="#6366f1" />
        </div>

        {/* Active members */}
        <div className="p-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center"><UserCheck className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Active Members</p>
              {showSkeleton ? <Skeleton className="h-7 w-8 mt-0.5" /> : (
                <p className="text-2xl font-bold text-slate-900 tracking-tight leading-none mt-0.5">{teamMembers.length || num(kpis?.activeMembers)}</p>
              )}
            </div>
          </div>
          <div className="flex -space-x-2">
            {competition.slice(0, 4).map((m) => (
              <span key={m.memberId} title={m.name} className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                {m.initials}
              </span>
            ))}
          </div>
        </div>

        {/* Today's target */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center"><Target className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Today's Target</p>
                {showSkeleton ? <Skeleton className="h-7 w-16 mt-0.5" /> : (
                  <p className="text-2xl font-bold text-slate-900 tracking-tight leading-none mt-0.5">
                    {targetProgress}<span className="text-sm font-normal text-slate-400"> / {targetGoal}</span>
                  </p>
                )}
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-700">{targetPct}%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3.5 overflow-hidden" role="progressbar" aria-valuenow={targetPct} aria-valuemin={0} aria-valuemax={100} aria-label="Today's target">
            <div className="bg-blue-600 h-full rounded-full transition-all duration-700" style={{ width: `${targetPct}%` }} />
          </div>
        </div>
      </section>

      {/* ───── Trend (wide) + Competition ───── */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch" aria-label="Collection and competition">
        {/* Trend */}
        <div className={`${CARD} xl:col-span-7 p-5 flex flex-col`}>
          <CardTitle
            icon={TrendingUp}
            title="Collection Trend"
            subtitle={`Creators collected ${range.caption}`}
            right={
              <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium pt-1.5">
                <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-blue-600" /> Total</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-sky-400" /> Emails</span>
              </div>
            }
          />

          <div className="grid grid-cols-3 gap-3 mt-5">
            {[
              { label: 'Collected', value: trendStats ? trendStats.sum.toLocaleString() : '—' },
              { label: 'Daily average', value: trendStats ? trendStats.avg : '—' },
              { label: 'Best day', value: trendStats ? `${trendStats.peak.total}` : '—', sub: trendStats?.peak.date },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-slate-50/80 border border-slate-100 px-3.5 py-2.5">
                <p className="text-[11px] text-slate-400">{s.label}</p>
                <p className="text-lg font-bold text-slate-900 leading-tight tabular-nums">
                  {s.value} {s.sub && <span className="text-[11px] font-medium text-slate-400">· {s.sub}</span>}
                </p>
              </div>
            ))}
          </div>

          <div className="flex-1 mt-5">
            {showSkeleton ? <Skeleton className="h-64 w-full" /> : <TrendChart data={trend} />}
          </div>
        </div>

        {/* Competition */}
        <div className={`${CARD} xl:col-span-5 p-5 flex flex-col`}>
          <CardTitle
            icon={Trophy}
            tint="bg-amber-50 text-amber-500"
            title="Team Competition"
            subtitle={`Unique creators collected ${range.caption}`}
          />

          {showSkeleton ? (
            <div className="space-y-3 mt-5"><Skeleton className="h-3" /><Skeleton className="h-16" /><Skeleton className="h-16" /></div>
          ) : competition.length === 0 ? (
            <EmptyState icon={Users} title="No team members yet" hint="Add members to start tracking collection." />
          ) : (
            <>
              {/* Share-of-total bar */}
              <div className="mt-5">
                <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
                  <span>Share of team output</span>
                  <span className="tabular-nums">{totalTeamCollected.toLocaleString()} total</span>
                </div>
                <div className="flex h-2.5 rounded-full overflow-hidden bg-slate-100 gap-0.5">
                  {competition.map((m, i) => m.creators > 0 && (
                    <div key={m.memberId} className={`${SHARE_COLORS[i % SHARE_COLORS.length]} transition-all duration-700`} style={{ width: `${m.share}%` }} title={`${m.name} ${m.share}%`} />
                  ))}
                </div>
              </div>

              {/* Leaderboard rows */}
              <ul className="mt-4 space-y-2.5 flex-1">
                {competition.map((m, i) => (
                  <li key={m.memberId} className={`rounded-xl border p-3.5 ${m.rank === 1 ? 'border-blue-100 bg-[#f8faff]' : 'border-slate-100 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <span className={`w-10 h-10 rounded-xl text-xs font-bold flex items-center justify-center ${m.rank === 1 ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25' : 'bg-blue-100 text-blue-700'}`}>
                          {m.initials}
                        </span>
                        <span className={`absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-white ${m.rank === 1 ? 'bg-amber-400 text-white' : 'bg-slate-200 text-slate-600'}`}>
                          {m.rank}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-900 truncate">{m.name}</p>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase ${m.role === 'admin' ? 'bg-purple-50 text-purple-600' : 'bg-slate-100 text-slate-600'}`}>{m.role}</span>
                          {m.rank === 1 && m.creators > 0 && <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />}
                        </div>
                        {m.username && <p className="text-[11px] text-slate-400 truncate">{m.username}</p>}
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-slate-900 leading-none tabular-nums">{m.creators.toLocaleString()}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{m.share}% of team</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 mt-3">
                      <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-700 ${m.rank === 1 ? 'bg-blue-600' : 'bg-sky-500'}`} style={{ width: `${m.progress}%` }} />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600 w-20 text-right tabular-nums">{m.progress}% of {range.quota}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 rounded-xl bg-[#f8faff] border border-blue-100/70 px-3 py-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0"><Zap className="w-4 h-4" /></div>
                  <div>
                    <p className="text-[11px] text-slate-500">Leading</p>
                    <p className="text-xs font-bold text-blue-600 truncate">{first ? `${first.name} · ${first.creators}` : '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100/70 px-3 py-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0"><Mail className="w-4 h-4" /></div>
                  <div>
                    <p className="text-[11px] text-slate-500">Email hit rate</p>
                    <p className="text-xs font-bold text-emerald-600">{emailHitRate != null ? `${emailHitRate}%` : '—'}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ───── Niche / Location / Target ring ───── */}
      <section aria-label="Insights" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Niche */}
        <div className={`${CARD} p-5`}>
          <CardTitle icon={PieChart} title="Niche Distribution" subtitle="Share of creators by niche" />
          {showSkeleton ? <Skeleton className="h-36 mt-5" /> : donut.length === 0 ? (
            <EmptyState icon={PieChart} title="No niche data yet" hint="Niches appear once creators are tagged." />
          ) : (
            <div className="flex items-center gap-6 mt-5">
              <div className="relative w-36 h-36 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" role="img" aria-label="Niche distribution">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="4.5" />
                  {donut.map((s) => {
                    const len = Math.max(0, s.pct - 0.8);
                    return (
                      <circle key={s.niche} cx="18" cy="18" r="15.915" fill="none" stroke={s.color} strokeWidth="4.5" strokeDasharray={`${len} ${100 - len}`} strokeDashoffset={-s.offset} />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-slate-900 leading-none">{totalCreators.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 mt-1">Creators</span>
                </div>
              </div>
              <ul className="space-y-3 w-full min-w-0">
                {donut.map((item, idx) => (
                  <li key={item.niche} className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-slate-600 text-xs min-w-0">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${DOT_COLORS[idx % DOT_COLORS.length]}`} />
                      <span className="truncate">{item.niche}</span>
                    </span>
                    <span className="text-xs font-semibold text-slate-800 tabular-nums">{item.percentage}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Location */}
        <div className={`${CARD} p-5`}>
          <CardTitle icon={MapPin} title="Location Insights" subtitle="Where your creators are based" />
          {showSkeleton ? <Skeleton className="h-36 mt-5" /> : locations.length === 0 ? (
            <EmptyState icon={MapPin} title="No location data yet" hint="Locations appear once creators are added." />
          ) : (
            <ul className="space-y-4 mt-5">
              {locations.slice(0, 5).map((loc) => (
                <li key={loc.location} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-slate-300" />{loc.location}</span>
                    <span className="font-semibold text-slate-900 tabular-nums">{loc.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-sky-400 h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(100, num(loc.percentage))}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Target ring */}
        <div className={`${CARD} p-5 md:col-span-2 xl:col-span-1`}>
          <CardTitle icon={CalendarDays} tint="bg-teal-50 text-teal-600" title="Daily Goal" subtitle="Progress toward today's target" />
          <div className="flex items-center gap-6 mt-5">
            <Ring pct={targetPct} size="w-36 h-36" stroke={4.5}>
              <span className="text-2xl font-bold text-slate-900 leading-none">{targetPct}%</span>
              <span className="text-[10px] text-slate-400 mt-1">complete</span>
            </Ring>
            <div className="w-full space-y-3">
              {[
                { label: 'Collected', value: targetProgress, cls: 'text-slate-900' },
                { label: 'Goal', value: targetGoal, cls: 'text-slate-900' },
                { label: 'Remaining', value: targetLeft, cls: targetLeft === 0 ? 'text-emerald-600' : 'text-blue-600' },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                  <span className="text-xs text-slate-500">{r.label}</span>
                  <span className={`text-sm font-bold tabular-nums ${r.cls}`}>{r.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── Recent creators ───── */}
      <section className={`${CARD} p-5`} aria-label="Recent creators">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <CardTitle icon={Users} title="Recent Creators" subtitle="Latest creators added by the team" />
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search username, email or location"
                aria-label="Search recent creators"
                className="pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 w-56 sm:w-72 transition"
              />
            </div>
            <Link to="/admin/creators" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 whitespace-nowrap transition">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/80 text-slate-400 font-semibold text-[11px]">
                {['Username', 'Name', 'Email', 'Followers', 'Posts', 'Niche', 'Location', 'Added By', 'Added At'].map((h, i, arr) => (
                  <th key={h} className={`py-2.5 px-3 ${i === 0 ? 'rounded-l-lg' : ''} ${i === arr.length - 1 ? 'rounded-r-lg' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {showSkeleton ? (
                Array.from({ length: 5 }).map((_, i) => <tr key={i}><td colSpan={9} className="py-2"><Skeleton className="h-8" /></td></tr>)
              ) : filteredCreators.length > 0 ? (
                filteredCreators.map((creator) => (
                  <tr key={creator.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-100 to-slate-50 border border-slate-200/70 text-slate-600 font-semibold text-[11px] flex items-center justify-center shrink-0">
                          {(creator.name || creator.username || 'C').replace('@', '').charAt(0).toUpperCase()}
                        </div>
                        <a
                          href={`https://instagram.com/${(creator.username || '').replace('@', '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="group font-medium text-slate-900 hover:text-blue-600 flex items-center gap-1 transition"
                        >
                          {creator.username || '—'}
                          <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-blue-500 transition" />
                        </a>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-700">{creator.name || 'Unknown'}</td>
                    <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">{creator.email || '—'}</td>
                    <td className="py-3 px-3 font-semibold text-slate-900 tabular-nums">{formatFollowers(creator.followers)}</td>
                    <td className="py-3 px-3 text-slate-700 tabular-nums">{creator.posts?.toLocaleString() || '—'}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium inline-block border ${getNicheBadgeStyle(creator.niche)}`}>{creator.niche || 'General'}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-500">
                      {creator.location ? (
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-300 shrink-0" />{creator.location}</span>
                      ) : '—'}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2 font-medium text-slate-800">
                        <span className="w-6 h-6 rounded-md bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
                          {creator.addedByInitials || getInitials(creator.addedBy)}
                        </span>
                        <span>{creator.addedBy || '—'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-400 text-[11px]">{creator.addedAt || '—'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9}>
                    <EmptyState
                      icon={searchQuery ? Search : Inbox}
                      title={searchQuery ? 'No creators match your search' : 'No creators added yet'}
                      hint={searchQuery ? 'Try a different username, email or location.' : 'New creators from the team will appear here.'}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}