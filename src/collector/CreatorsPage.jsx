import React, { useEffect, useState } from 'react';
import { 
  Users, Mail, MapPin, Layers, Search, Download, 
  Calendar, ChevronDown, ChevronLeft, ChevronRight, 
  SlidersHorizontal, ExternalLink, MoreHorizontal
} from 'lucide-react';
import { fetchCreatorsTable, fetchTeamMembers, getExportCsvUrl } from '../services/collectorApi';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const getNicheBadgeStyle = (niche) => {
  const n = (niche || '').toLowerCase();
  if (n.includes('model')) return 'bg-purple-50 text-purple-700 border-purple-100/80';
  if (n.includes('fashion')) return 'bg-rose-50 text-rose-600 border-rose-100/80';
  if (n.includes('fitness')) return 'bg-emerald-50 text-emerald-700 border-emerald-100/80';
  if (n.includes('travel')) return 'bg-sky-50 text-sky-700 border-sky-100/80';
  if (n.includes('beauty')) return 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100/80';
  if (n.includes('food')) return 'bg-emerald-50 text-emerald-700 border-emerald-100/80';
  if (n.includes('lifestyle')) return 'bg-orange-50 text-orange-700 border-orange-100/80';
  if (n.includes('tech')) return 'bg-blue-50 text-blue-700 border-blue-100/80';
  return 'bg-slate-50 text-slate-700 border-slate-200';
};

const formatFollowers = (num) => {
  if (num == null) return '—';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return Number(num).toLocaleString();
};

export default function CreatorsPage() {
  const [data, setData] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [niche, setNiche] = useState('');
  const [location, setLocation] = useState('');
  const [addedBy, setAddedBy] = useState('');
  const [followerRange, setFollowerRange] = useState('');
  const [timeRange, setTimeRange] = useState('LAST_7_DAYS');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState(new Set());

  useEffect(() => {
    fetchTeamMembers()
      .then((res) => setMembers(res || []))
      .catch(() => {});
  }, []);

  const loadCreators = () => {
    setLoading(true);
    fetchCreatorsTable({
      search,
      niche,
      location,
      addedBy,
      followerRange,
      timeRange,
      page,
      size,
      sortBy: 'createdAt',
      sortDir: 'desc'
    })
      .then((res) => setData(res))
      .catch((err) => console.error('Creators fetch error:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCreators();
  }, [search, niche, location, addedBy, followerRange, timeRange, page, size]);

  const resetFilters = () => {
    setSearch('');
    setNiche('');
    setLocation('');
    setAddedBy('');
    setFollowerRange('');
    setTimeRange('LAST_7_DAYS');
    setPage(0);
  };

  const stats = data?.stats;
  const items = data?.items || [];
  const totalElements = data?.totalElements ?? 8429;
  const totalPages = data?.totalPages ?? 1054;

  const toggleSelectAll = () => {
    if (selectedIds.size === items.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map(i => i.id)));
    }
  };

  const toggleSelectRow = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  return (
    <div className="space-y-4 text-slate-800 antialiased font-sans">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Creators</h1>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            All collected influencer profiles with details and performance insights.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative inline-flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm text-xs font-medium text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent pr-4 outline-none appearance-none cursor-pointer text-slate-700 font-medium"
            >
              <option value="LAST_7_DAYS">Last 7 Days</option>
              <option value="TODAY">Today</option>
              <option value="THIS_MONTH">This Month</option>
              <option value="ALL">All Time</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-2.5" />
          </div>

          <a
            href={getExportCsvUrl({ search, niche, location, addedBy, followerRange, timeRange })}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3.5 py-1.5 shadow-sm text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            Export
          </a>

          <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-semibold text-xs flex items-center justify-center shadow-sm">
              RM
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-slate-900 leading-tight">Rohan Mandal</p>
              <p className="text-[11px] text-slate-400 font-normal">Admin</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-500 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900 tracking-tight leading-none">
              {stats?.totalCreators ? stats.totalCreators.toLocaleString() : '8,429'}
            </p>
            <p className="text-[11px] text-slate-400 font-normal mt-1">Total Creators</p>
            <p className="text-[10px] font-semibold text-emerald-600 mt-1">
              ↑ {stats?.totalGrowth || '+12.8%'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900 tracking-tight leading-none">
              {stats?.withEmailCount ? stats.withEmailCount.toLocaleString() : '8,023'}
            </p>
            <p className="text-[11px] text-slate-400 font-normal mt-1">With Email</p>
            <p className="text-[10px] font-semibold text-slate-600 mt-1">
              {stats?.withEmailPercentage ?? 95.2}%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <InstagramIcon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900 tracking-tight leading-none">
              {stats?.withUsernameCount ? stats.withUsernameCount.toLocaleString() : '7,410'}
            </p>
            <p className="text-[11px] text-slate-400 font-normal mt-1">With Username</p>
            <p className="text-[10px] font-semibold text-slate-600 mt-1">
              {stats?.withUsernamePercentage ?? 87.9}%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900 tracking-tight leading-none">
              {stats?.withLocationCount ? stats.withLocationCount.toLocaleString() : '3,612'}
            </p>
            <p className="text-[11px] text-slate-400 font-normal mt-1">With Location</p>
            <p className="text-[10px] font-semibold text-slate-600 mt-1">
              {stats?.withLocationPercentage ?? 42.8}%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-start gap-3 col-span-2 sm:col-span-1">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900 tracking-tight leading-none">
              {stats?.totalNiches ?? 7}
            </p>
            <p className="text-[11px] text-slate-400 font-normal mt-1">Niches</p>
          </div>
        </div>
      </div>

      {/* 3. Filter Ribbon */}
      <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-wrap items-center gap-2.5">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            placeholder="Search by username, name, email..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200/90 rounded-lg text-xs font-normal text-slate-700 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 transition"
          />
        </div>

        <div className="relative">
          <select
            value={niche}
            onChange={(e) => { setNiche(e.target.value); setPage(0); }}
            className="bg-white border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-normal text-slate-700 outline-none appearance-none cursor-pointer"
          >
            <option value="">Niche</option>
            <option value="Fashion & Style">Fashion & Style</option>
            <option value="Beauty & Skincare">Beauty & Skincare</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Fitness & Nutrition">Fitness & Nutrition</option>
            <option value="Travel & Hospitality">Travel & Hospitality</option>
            <option value="Food & Culinary">Food & Culinary</option>
            <option value="Tech & Gadgets">Tech & Gadgets</option>
            <option value="UGC & Creator Economy">UGC & Creator Economy</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
        </div>

        <div className="relative">
          <select
            value={location}
            onChange={(e) => { setLocation(e.target.value); setPage(0); }}
            className="bg-white border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-normal text-slate-700 outline-none appearance-none cursor-pointer"
          >
            <option value="">Location</option>
            <option value="Mumbai, India">Mumbai, India</option>
            <option value="Delhi, India">Delhi, India</option>
            <option value="Pune, India">Pune, India</option>
            <option value="Bengaluru, India">Bengaluru, India</option>
            <option value="Hyderabad, India">Hyderabad, India</option>
            <option value="Chennai, India">Chennai, India</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
        </div>

        <div className="relative">
          <select
            value={addedBy}
            onChange={(e) => { setAddedBy(e.target.value); setPage(0); }}
            className="bg-white border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-normal text-slate-700 outline-none appearance-none cursor-pointer"
          >
            <option value="">Added By</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>{m.displayName}</option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
        </div>

        <div className="relative">
          <select
            value={followerRange}
            onChange={(e) => { setFollowerRange(e.target.value); setPage(0); }}
            className="bg-white border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-normal text-slate-700 outline-none appearance-none cursor-pointer"
          >
            <option value="">Followers</option>
            <option value="0-10k">0 – 10k</option>
            <option value="10k-50k">10k – 50k</option>
            <option value="50k-100k">50k – 100k</option>
            <option value="100k+">100k+</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
        </div>

        <div className="relative">
          <select
            value={timeRange}
            onChange={(e) => { setTimeRange(e.target.value); setPage(0); }}
            className="bg-white border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-normal text-slate-700 outline-none appearance-none cursor-pointer"
          >
            <option value="LAST_7_DAYS">Date Added</option>
            <option value="TODAY">Today</option>
            <option value="LAST_7_DAYS">Last 7 Days</option>
            <option value="THIS_MONTH">This Month</option>
            <option value="ALL">All Time</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition ml-auto"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 4. Creator Directory Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 font-semibold text-[11px]">
                <th className="py-2.5 px-3 w-8">
                  <input
                    type="checkbox"
                    checked={items.length > 0 && selectedIds.size === items.length}
                    onChange={toggleSelectAll}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="py-2.5 px-3">Creator</th>
                <th className="py-2.5 px-3">Email</th>
                <th className="py-2.5 px-3">Followers ↓</th>
                <th className="py-2.5 px-3">Posts</th>
                <th className="py-2.5 px-3">Niche</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Added By</th>
                <th className="py-2.5 px-3">Added At</th>
                <th className="py-2.5 px-3 w-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 font-normal">
              {items.length > 0 ? (
                items.map((creator) => {
                  const isChecked = selectedIds.has(creator.id);
                  return (
                    <tr 
                      key={creator.id} 
                      className={`hover:bg-slate-50/60 transition ${isChecked ? 'bg-blue-50/20' : ''}`}
                    >
                      <td className="py-2.5 px-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectRow(creator.id)}
                          className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                        />
                      </td>

                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center shrink-0">
                            {creator.name?.charAt(0) || 'C'}
                          </div>
                          <div>
                            <a
                              href={`https://instagram.com/${(creator.username || '').replace('@', '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="font-semibold text-slate-900 hover:text-blue-600 inline-flex items-center gap-1 transition"
                            >
                              {creator.username || '—'}
                              <ExternalLink className="w-3 h-3 text-slate-400 hover:text-blue-600" />
                            </a>
                            <p className="text-[11px] text-slate-400 font-normal leading-none mt-0.5">
                              {creator.name || 'UNKNOWN'}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-2.5 px-3 text-slate-600 font-normal text-[11px]">
                        {creator.email || '—'}
                      </td>

                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        {formatFollowers(creator.followers)}
                      </td>

                      <td className="py-2.5 px-3 text-slate-700">
                        {creator.posts ? creator.posts.toLocaleString() : '—'}
                      </td>

                      <td className="py-2.5 px-3">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-medium border inline-block ${getNicheBadgeStyle(creator.niche)}`}>
                          {creator.niche || 'General'}
                        </span>
                      </td>

                      <td className="py-2.5 px-3 text-slate-600">
                        {creator.location ? (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            {creator.location}
                          </span>
                        ) : '—'}
                      </td>

                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                            {creator.addedByInitials || 'RM'}
                          </span>
                          <span className="font-medium text-slate-800">{creator.addedBy || 'Rohan'}</span>
                        </div>
                      </td>

                      <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                        {creator.addedAt || '—'}
                      </td>

                      <td className="py-2.5 px-3 text-right">
                        <button type="button" className="text-slate-400 hover:text-slate-700 p-1 rounded transition">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10" className="py-12 text-center text-slate-400 text-xs">
                    {loading ? 'Loading creators directory...' : 'No creators found matching the selected filters.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 5. Pagination Bar */}
        <div className="p-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-normal">
          <p>
            Showing {items.length > 0 ? page * size + 1 : 0} – {Math.min((page + 1) * size, totalElements)} of {totalElements.toLocaleString()} creators
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page === 0}
              onClick={() => setPage(p => Math.max(0, p - 1))}
              className="p-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setPage(num - 1)}
                className={`w-7 h-7 rounded-lg text-xs transition ${
                  page === num - 1
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {num}
              </button>
            ))}

            <span className="px-1 text-slate-400">...</span>

            <button
              type="button"
              onClick={() => setPage(totalPages - 1)}
              className="px-2 h-7 rounded-lg text-xs text-slate-600 hover:bg-slate-100 transition"
            >
              {totalPages.toLocaleString()}
            </button>

            <button
              type="button"
              disabled={page >= totalPages - 1}
              onClick={() => setPage(p => p + 1)}
              className="p-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative">
            <select
              value={size}
              onChange={(e) => { setSize(Number(e.target.value)); setPage(0); }}
              className="bg-white border border-slate-200 rounded-lg pl-3 pr-7 py-1 text-xs text-slate-700 outline-none appearance-none cursor-pointer"
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

    </div>
  );
}