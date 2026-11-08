import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Search, RefreshCw, ChevronLeft, ChevronRight, Mail, Phone, X, ExternalLink,
  MessageCircle, Building2, BadgeCheck, Globe2,
} from 'lucide-react';
import { fetchInquiries, updateInquiryStatus, fetchAnalyticsSessionById, fetchAnalyticsLeads } from '../services/api';

const ROUTES = { analytics: '/analytics' }; // change if your route differs

const ROLES = [
  ['', 'All segments'],
  ['CREATOR', 'Creators'],
  ['BRAND', 'Brands'],
  ['AGENCY', 'Agencies'],
];
const STATUSES = [
  ['NEW', 'New'],
  ['IN_REVIEW', 'In review'],
  ['CONTACTED', 'Contacted'],
  ['RESOLVED', 'Resolved'],
];
const CHANNELS = ['Social', 'Direct', 'Paid', 'Organic Search', 'Referral', 'Email', 'Influencer', 'Other Campaign'];

const card = 'bg-white rounded-xl border border-slate-200 shadow-sm';
const btnPrimary = 'px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition';

const fmtDur = (s) => {
  s = Math.round(s || 0);
  if (s <= 0) return '0s';
  const m = Math.floor(s / 60);
  const r = s % 60;
  return m ? `${m}m ${String(r).padStart(2, '0')}s` : `${r}s`;
};
const isLive = (d) => !!d && Date.now() - new Date(d).getTime() < 300000;
const ago = (d) => {
  if (!d) return '—';
  const sec = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (sec < 60) return 'Just now';
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

const roleBadge = (r) =>
  ({
    BRAND: 'bg-blue-50 text-blue-700 border-blue-200',
    AGENCY: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    CREATOR: 'bg-slate-100 text-slate-700 border-slate-200',
  }[r] || 'bg-slate-100 text-slate-700 border-slate-200');

const statusStyle = (s) =>
  ({
    NEW: 'bg-blue-600 text-white border-blue-600',
    IN_REVIEW: 'bg-amber-50 text-amber-700 border-amber-200',
    CONTACTED: 'bg-sky-50 text-sky-700 border-sky-200',
    RESOLVED: 'bg-slate-100 text-slate-500 border-slate-200',
  }[s] || 'bg-slate-50 text-slate-600 border-slate-200');

function LiveDot({ on = true, size = 'h-2.5 w-2.5' }) {
  if (!on) return <span className={`inline-flex rounded-full bg-slate-300 ${size}`} />;
  return (
    <span className={`relative inline-flex ${size}`}>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className={`relative inline-flex rounded-full bg-emerald-500 ${size}`} />
    </span>
  );
}

function Field({ label, children }) {
  return (
    <div className="min-w-0 w-full overflow-hidden rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 sm:px-3.5">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <div className="mt-0.5 min-w-0 break-words [overflow-wrap:anywhere] text-sm font-semibold text-slate-900">
        {children}
      </div>
    </div>
  );
}

export default function InquiriesPage() {
  const params = new URLSearchParams(window.location.search);
  const pendingOpen = useRef(params.get('inquiry'));

  const [data, setData] = useState({ content: [], totalElements: 0, totalPages: 1 });
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [channel, setChannel] = useState('');
  const [search, setSearch] = useState(params.get('q') || '');
  const [debounced, setDebounced] = useState(params.get('q') || '');
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [leadByEmail, setLeadByEmail] = useState({});

  // Opt-in leads carry email + sessionId, used when the inquiry itself has no sessionId
  useEffect(() => {
    fetchAnalyticsLeads()
      .then((rows) => {
        const m = {};
        (rows || []).forEach((l) => { if (l.email && l.session_id) m[l.email.trim().toLowerCase()] = l.session_id; });
        setLeadByEmail(m);
      })
      .catch(() => {});
  }, []);
  const sidOf = (i) => i.sessionId || leadByEmail[(i.email || '').trim().toLowerCase()] || null;

  useEffect(() => {
    const t = setTimeout(() => { setDebounced(search); setPage(0); }, 350);
    return () => clearTimeout(t);
  }, [search]);

  const loadCounts = useCallback(() => {
    Promise.all(
      STATUSES.map(([s]) =>
        fetchInquiries({ role, status: s, size: 1, page: 0 })
          .then((r) => [s, r.totalElements || 0])
          .catch(() => [s, 0])
      )
    ).then((pairs) => setCounts(Object.fromEntries(pairs)));
  }, [role]);

  const loadData = useCallback(() => {
    setLoading(true);
    fetchInquiries({ role, status, search: debounced, page, size: 12 })
      .then((res) => {
        setData(res);
        if (pendingOpen.current) {
          const found = (res.content || []).find((i) => String(i.id) === String(pendingOpen.current));
          if (found) setSelected(found);
          pendingOpen.current = null;
        }
      })
      .catch((err) => console.error('Inquiries load error:', err))
      .finally(() => setLoading(false));
  }, [role, status, debounced, page]);

  useEffect(() => { loadData(); }, [loadData]);
  useEffect(() => { loadCounts(); }, [loadCounts]);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await updateInquiryStatus(id, newStatus);
      setData((prev) => ({
        ...prev,
        content: prev.content.map((i) => (i.id === id ? { ...i, status: newStatus } : i)),
      }));
      setSelected((prev) => (prev && prev.id === id ? { ...prev, status: newStatus } : prev));
      loadCounts();
    } catch (err) {
      alert('Could not update status: ' + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const items = (data?.content || [])
    .map((i) => ({ ...i, sessionId: sidOf(i) }))
    .filter((i) => !channel || (i.channel || 'Direct') === channel);

  return (
    <div className="space-y-6 text-slate-800 antialiased" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Inquiries and leads</h1>
          <p className="text-sm text-slate-500 mt-1">
            Briefs from creators, brands and agencies, with the visitor journey behind each one.
          </p>
        </div>
        <button onClick={() => { loadData(); loadCounts(); }} className={`${btnPrimary} flex items-center gap-2 w-fit`}>
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {/* Status cards (click to filter) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <button
          onClick={() => { setStatus(''); setPage(0); }}
          className={`text-left rounded-xl p-5 border transition ${status === '' ? 'bg-slate-900 text-white border-slate-900' : `${card} hover:border-blue-300`}`}
        >
          <p className={`text-sm font-medium ${status === '' ? 'text-slate-300' : 'text-slate-500'}`}>All inquiries</p>
          <p className="text-3xl font-semibold mt-2 tabular-nums">{total}</p>
        </button>
        {STATUSES.map(([v, label]) => (
          <button
            key={v}
            onClick={() => { setStatus(status === v ? '' : v); setPage(0); }}
            className={`text-left rounded-xl p-5 border transition ${status === v ? 'bg-blue-600 text-white border-blue-600' : `${card} hover:border-blue-300`}`}
          >
            <p className={`text-sm font-medium ${status === v ? 'text-blue-100' : 'text-slate-500'}`}>{label}</p>
            <p className="text-3xl font-semibold mt-2 tabular-nums">{counts[v] ?? 0}</p>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className={`${card} p-4 flex flex-wrap items-center gap-3`}>
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, company or keywords"
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5">
          {ROLES.map(([v, label]) => (
            <button
              key={v}
              onClick={() => { setRole(v); setPage(0); }}
              className={`px-3 py-1.5 text-sm font-semibold rounded-md transition ${role === v ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <select
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 outline-none cursor-pointer focus:border-blue-500"
        >
          <option value="">All sources</option>
          {CHANNELS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className={`${card} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-semibold border-b border-slate-100">
                <th className="py-3 px-5">Contact</th>
                <th className="py-3 px-4">Segment</th>
                <th className="py-3 px-4">Organization</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && items.length === 0 ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}><td colSpan={8} className="p-4"><div className="h-6 bg-slate-100 rounded animate-pulse" /></td></tr>
                ))
              ) : items.length === 0 ? (
                <tr><td colSpan={8} className="py-14 text-center text-slate-400">No inquiries match these filters.</td></tr>
              ) : (
                items.map((inq) => (
                  <tr key={inq.id} onClick={() => setSelected(inq)} className="hover:bg-blue-50/40 cursor-pointer transition">
                    <td className="py-3.5 px-5">
                      <p className="font-semibold text-slate-900">{inq.name}</p>
                      <p className="text-xs text-slate-500">{inq.email}{inq.phone ? ` · ${inq.phone}` : ''}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${roleBadge(inq.role)}`}>{inq.role}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">{inq.companyName || <span className="text-slate-300">—</span>}</td>
                    <td className="py-3.5 px-4 text-slate-600">{inq.budget || <span className="text-slate-300">—</span>}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">{inq.channel || 'Direct'}</span>
                      <p className="text-xs text-slate-500 mt-1">
                        {inq.utmCampaign ? <span className="text-blue-600">{inq.utmCampaign}</span> : null}
                        {inq.utmCampaign && inq.city ? ' · ' : ''}
                        {inq.city || ''}
                      </p>
                    </td>
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={inq.status}
                        disabled={updatingId === inq.id}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className={`px-2.5 py-1.5 rounded-md text-xs font-semibold border cursor-pointer outline-none ${statusStyle(inq.status)}`}
                      >
                        {STATUSES.map(([v, l]) => <option key={v} value={v} className="bg-white text-slate-800">{l}</option>)}
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'}
                    </td>
                    <td className="py-3.5 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        {inq.sessionId && (
                          <a
                            href={`${ROUTES.analytics}?session=${inq.sessionId}`}
                            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold"
                          >
                            Analytics
                          </a>
                        )}
                        <button onClick={() => setSelected(inq)} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold">
                          View brief
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
          <span>{data.totalElements} records</span>
          <div className="flex items-center gap-2">
            <button disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))} className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>Page {page + 1} of {Math.max(1, data.totalPages)}</span>
            <button disabled={page >= data.totalPages - 1} onClick={() => setPage((p) => p + 1)} className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {selected && (
        <InquiryModal
          inquiry={{ ...selected, sessionId: sidOf(selected) }}
          onClose={() => setSelected(null)}
          onStatus={handleStatusChange}
        />
      )}
    </div>
  );
}

function InquiryModal({ inquiry: inq, onClose, onStatus }) {
  const [sess, setSess] = useState(null);
  const [sessLoading, setSessLoading] = useState(false);

  useEffect(() => {
    setSess(null);
    if (!inq.sessionId) return;
    setSessLoading(true);
    fetchAnalyticsSessionById(inq.sessionId)
      .then(setSess)
      .catch(() => setSess(null))
      .finally(() => setSessLoading(false));
  }, [inq.id, inq.sessionId]);

  const live = sess && isLive(sess.lastActiveAt);
  const waNumber = (inq.phone || '').replace(/\D/g, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-2 sm:p-4" onClick={onClose}>
      <div
        className="flex max-h-[92dvh] w-full max-w-5xl min-w-0 flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-slate-900">{inq.name}</h3>
              <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${roleBadge(inq.role)}`}>{inq.role}</span>
              {live && (
                <span className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  <LiveDot size="h-2 w-2" /> On the site now
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Submitted {inq.createdAt ? new Date(inq.createdAt).toLocaleString('en-IN') : '—'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><X className="w-5 h-5" /></button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6">
          <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Brief */}
          <div className="min-w-0 space-y-4">
            <h4 className="text-sm font-semibold text-slate-900">Contact and brief</h4>
            <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Email">
                <a className="flex min-w-0 max-w-full items-start gap-1.5 text-blue-600 hover:underline" href={`mailto:${inq.email}`}>
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span className="min-w-0 break-all [overflow-wrap:anywhere]">{inq.email}</span>
                </a>
              </Field>
              <Field label="Phone / WhatsApp">
                {inq.phone ? (
                  <a className="flex min-w-0 max-w-full items-start gap-1.5 text-blue-600 hover:underline" href={`tel:${inq.phone}`}>
                    <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span className="min-w-0 break-all [overflow-wrap:anywhere]">{inq.phone}</span>
                  </a>
                ) : 'Not provided'}
              </Field>
              <Field label="Company">
                <span className="flex min-w-0 items-start gap-1.5">
                  {inq.companyName ? <><Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" /><span className="min-w-0 break-words [overflow-wrap:anywhere]">{inq.companyName}</span></> : '—'}
                </span>
              </Field>
              <Field label="Budget">{inq.budget || '—'}</Field>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1.5">Requirement</p>
              <div className="max-h-52 min-w-0 overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words [overflow-wrap:anywhere] rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-sm leading-relaxed text-slate-700">
                {inq.message || 'No message.'}
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="min-w-0 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-900">Visitor analytics</h4>
              {inq.sessionId && (
                <a href={`${ROUTES.analytics}?session=${inq.sessionId}`} className="text-sm font-semibold text-blue-600 hover:underline inline-flex items-center gap-1.5">
                  Open in Analytics <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {!inq.sessionId ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                No tracking session was attached to this inquiry, so there are no visitor analytics for it.
              </div>
            ) : sessLoading ? (
              <div className="space-y-2">{[0, 1, 2].map((i) => <div key={i} className="h-14 rounded-lg bg-slate-100 animate-pulse" />)}</div>
            ) : (
              <>
                <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-3">
                  <Field label="Time on site">{sess ? fmtDur(sess.durationSeconds) : '—'}</Field>
                  <Field label="Focused">{sess ? fmtDur(sess.activeDwellSeconds) : '—'}</Field>
                  <Field label="Pages">{sess ? sess.pageViews : '—'}</Field>
                </div>
                <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Channel">{sess?.channel || inq.channel || 'Direct'}</Field>
                  <Field label="Campaign">{sess?.utmCampaign || inq.utmCampaign || 'None'}</Field>
                  <Field label="Referrer">{sess?.referrerDomain || 'Direct entry'}</Field>
                  <Field label="Creator / content">{sess?.utmContent || '—'}</Field>
                  <Field label="Location">
                    <span className="flex min-w-0 items-start gap-1.5">
                      <Globe2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span className="min-w-0 break-words [overflow-wrap:anywhere]">{sess?.city || inq.city || 'Unknown'}{sess?.region ? `, ${sess.region}` : ''}</span>
                    </span>
                  </Field>
                  <Field label="Device">
                    {sess ? `${sess.deviceType} · ${sess.browser || '—'}` : '—'}
                    {sess?.inAppBrowser && <span className="block text-xs text-blue-600 font-medium">via {sess.inAppSource || 'in-app'} browser</span>}
                  </Field>
                  <Field label="Landed on"><span className="block min-w-0 break-all font-mono text-xs [overflow-wrap:anywhere]">{sess?.entryPath || '—'}</span></Field>
                  <Field label="Visitor type">{sess ? (sess.returningVisitor ? 'Returning' : 'New') : '—'}</Field>
                </div>
                {sess?.appliedAt && (
                  <p className="flex items-center gap-2 text-sm text-blue-700 font-medium">
                    <BadgeCheck className="w-4 h-4" /> Applied on {new Date(sess.appliedAt).toLocaleString('en-IN')}
                  </p>
                )}
                {!sess && <p className="text-xs text-slate-400">Showing the source saved with the inquiry. Full session details could not be loaded.</p>}
              </>
            )}
          </div>
        </div>

        </div>
        <div className="flex shrink-0 flex-col gap-3 border-t border-slate-100 bg-white px-4 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-6">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="text-sm text-slate-500">Status</span>
            <select
              value={inq.status}
              onChange={(e) => onStatus(inq.id, e.target.value)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold border outline-none cursor-pointer ${statusStyle(inq.status)}`}
            >
              {STATUSES.map(([v, l]) => <option key={v} value={v} className="bg-white text-slate-800">{l}</option>)}
            </select>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            {waNumber && (
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            )}
            <a href={`mailto:${inq.email}?subject=Re:%20Brand%20Collabz%20Inquiry`} className={`${btnPrimary} inline-flex items-center gap-2`}>
              <Mail className="w-4 h-4" /> Reply by email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}