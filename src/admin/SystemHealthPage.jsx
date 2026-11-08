import React, { useEffect, useState } from 'react';
import { CircleCheck, CircleAlert, RefreshCw, Server, Database } from 'lucide-react';
import { fetchHealth, fetchCampaigns, getBackendUrl } from '../services/api';

export default function SystemHealthPage() {
  const [health, setHealth] = useState(null);
  const [campaignTotal, setCampaignTotal] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const [h, c] = await Promise.allSettled([
      fetchHealth(),
      fetchCampaigns({ page: 0, size: 1 })
    ]);
    setHealth(h.status === 'fulfilled' ? { ok: true, ...h.value } : { ok: false, message: h.reason?.message });
    setCampaignTotal(c.status === 'fulfilled' ? c.value?.totalElements ?? 0 : null);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">System & Backend Health</h1>
          <p className="text-slate-500 text-sm mt-1">Live status of Spring Boot microservices and database poolers.</p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Primary API Status</p>
          <div className="mt-2 flex items-center gap-2 text-xl font-black text-slate-900">
            {health === null ? (
              'Checking...'
            ) : health.ok ? (
              <><CircleCheck className="w-5 h-5 text-emerald-500" /> Online</>
            ) : (
              <><CircleAlert className="w-5 h-5 text-rose-500" /> Unreachable</>
            )}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Ingested Campaigns</p>
          <p className="mt-2 text-2xl font-black text-slate-900">{campaignTotal ?? '-'}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Database Architecture</p>
          <p className="mt-2 text-base font-black text-blue-600 flex items-center gap-2">
            <Database className="w-4 h-4" /> Dual Supabase Pooler
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Server className="w-4 h-4 text-slate-500" /> Health Check Endpoint
          </h2>
          <span className="text-xs font-mono text-slate-400">{getBackendUrl()}/api/v1/health</span>
        </div>
        <pre className="mt-3 p-4 rounded-xl bg-slate-900 text-emerald-400 text-xs font-mono overflow-x-auto">
          {JSON.stringify(health || { status: 'Checking...' }, null, 2)}
        </pre>
      </div>
    </div>
  );
}