import React, { useEffect, useMemo, useState } from 'react';
import { Search, Phone, Mail, RefreshCw, ChevronDown } from 'lucide-react';
import { fetchAgencies } from '../services/api';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function AgenciesPage() {
  const [agencies, setAgencies] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAgencies();
      setAgencies(data || []);
    } catch (e) {
      setError(e.message);
      setAgencies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const t = q.toLowerCase();
    return (agencies || []).filter((a) =>
      [a.agencyName, a.contactPhone, a.contactEmail, a.instagramHandle].some(
        (v) => v && v.toLowerCase().includes(t)
      )
    );
  }, [agencies, q]);

  return (
    <div className="space-y-6">
      {/* Top Header Matching CreatorHub */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Agencies</h1>
          <p className="text-slate-500 text-xs font-semibold mt-1">
            Registered agency partners and direct campaign submission sources.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={load}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200/80 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center">
              RM
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-black text-slate-900 leading-none">Rohan Mandal</p>
              <p className="text-[11px] font-bold text-slate-400 mt-0.5">Admin</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, phone, email or handle"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold">
          Could not load agencies: {error}
        </div>
      )}

      {/* Grid of Agencies */}
      {agencies === null ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-44 bg-white rounded-2xl border border-slate-200/80 shadow-sm animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-sm">
          <p className="font-extrabold text-slate-800">No agencies found</p>
          <p className="text-xs text-slate-400 mt-1">Agencies appear here as new campaign briefs are ingested.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between gap-4 shadow-sm hover:border-blue-200 transition"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-black text-slate-900 text-base">{a.agencyName}</h3>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-blue-50 text-blue-600">
                    {a.activeCampaignsCount || 0} active
                  </span>
                </div>
                {a.notes && <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">{a.notes}</p>}
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs font-semibold text-slate-600">
                {a.contactPhone && (
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {a.contactPhone}
                  </p>
                )}
                {a.contactEmail && (
                  <p className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{a.contactEmail}</span>
                  </p>
                )}
                {a.instagramHandle && (
                  <p className="flex items-center gap-2">
                    <InstagramIcon className="w-3.5 h-3.5 text-slate-400" />
                    @{a.instagramHandle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}