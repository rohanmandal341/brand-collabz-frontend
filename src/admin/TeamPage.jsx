import React, { useEffect, useState } from 'react';
import { Users, CheckCircle2, Shield, Calendar, RefreshCw } from 'lucide-react';
import { fetchTeamMembers } from '../services/collectorApi';

export default function TeamPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetchTeamMembers()
      .then((data) => setMembers(data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-5 text-slate-800 antialiased font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Team Members</h1>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Verified team members collecting creators and submitting campaign leads.
          </p>
        </div>

        <button
          onClick={load}
          className="flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m) => (
          <div key={m.id} className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                    {m.displayName?.slice(0, 2).toUpperCase() || 'TM'}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-tight">{m.displayName}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {m.telegramUsername ? `@${m.telegramUsername}` : 'Telegram Member'}
                    </p>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                  m.role === 'admin' ? 'bg-purple-50 text-purple-700 border border-purple-100' : 'bg-slate-100 text-slate-600'
                }`}>
                  {m.role || 'Member'}
                </span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-slate-400" /> Telegram ID</span>
                <span className="font-mono text-slate-700">{m.telegramUserId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Status</span>
                <span className="font-semibold text-emerald-600">{m.active ? 'Active' : 'Inactive'}</span>
              </div>
              {m.createdAt && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> Joined</span>
                  <span className="text-slate-600">{new Date(m.createdAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}