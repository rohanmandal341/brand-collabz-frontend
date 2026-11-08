import React, { useEffect, useMemo, useState } from 'react';
import { Search, Phone, Mail, RefreshCw } from 'lucide-react';
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

  const renderContent = () => {
    if (agencies === null) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-44 bg-white rounded-2xl border border-slate-100 shadow-sm animate-pulse"
            />
          ))}
        </div>
      );
    }

    if (filtered.length === 0) {
      return (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <p className="font-extrabold text-slate-800">No agencies found</p>
          <p className="text-xs text-slate-400 mt-1">
            Agencies are registered automatically when verified campaigns are parsed.
          </p>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between gap-4 shadow-sm"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-black text-slate-900 text-base">{a.agencyName}</h3>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-600">
                  {a.activeCampaignsCount || 0} active
                </span>
              </div>
              {a.notes && <p className="text-xs text-slate-500 mt-2 line-clamp-2">{a.notes}</p>}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs font-medium text-slate-600">
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
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Agencies CRM</h1>
          <p className="text-slate-500 text-sm mt-1">Verified agency and brand partners submitting campaigns.</p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm w-fit"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, phone, email or handle"
          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-blue-500 shadow-sm"
        />
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold">
          Could not load agencies: {error}
        </div>
      )}

      {renderContent()}
    </div>
  );
}