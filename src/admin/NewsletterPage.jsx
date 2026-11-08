import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Mail, Users, CheckCircle2, XCircle, Search, RefreshCw, AlertCircle,
  ChevronLeft, ChevronRight, X, Phone, Building2, BadgeCheck, Plus, Send
} from 'lucide-react';
import {
  fetchNewsletterSubscribers,
  subscribeNewsletterAdmin,
  fetchInquiries,
} from '../services/api';

const PAGE_SIZE = 15;
const panel = 'rounded-xl border border-slate-200 bg-white shadow-sm';
const inputClass = 'h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-xs text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100';
const buttonFocus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2';
const cx = (...v) => v.filter(Boolean).join(' ');
const n = (v) => Number(v ?? 0).toLocaleString('en-IN');

const ago = (v) => {
  if (!v) return '—';
  const sec = Math.max(0, Math.floor((Date.now() - new Date(v).getTime()) / 1000));
  if (sec < 60) return 'Just now';
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
  return new Date(v).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

function PanelHead({ title, subtitle, action }) {
  return (
    <div className="flex min-h-[54px] items-center justify-between gap-3 border-b border-slate-100 px-3.5 py-2.5">
      <div className="min-w-0">
        <h2 className="truncate text-[13px] font-semibold tracking-tight text-slate-900">{title}</h2>
        {subtitle && <p className="mt-0.5 truncate text-[11px] text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function Kpi({ icon: Icon, label, value, detail, color = 'blue' }) {
  const isEmerald = color === 'emerald';
  const isPurple = color === 'purple';
  return (
    <section className={cx(panel, 'flex min-w-0 items-center gap-3 px-3.5 py-3')}>
      <span className={cx('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', 
        isEmerald ? 'bg-emerald-50 text-emerald-600' : isPurple ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
      )}>
        <Icon size={17} strokeWidth={1.9} />
      </span>
      <div className="min-w-0">
        <div className="text-[11px] font-medium text-slate-500">{label}</div>
        <div className="mt-0.5 truncate text-xl font-bold leading-tight tracking-tight tabular-nums text-slate-900">{value}</div>
        <div className="mt-0.5 truncate text-[10px] text-slate-400">{detail}</div>
      </div>
    </section>
  );
}

function Empty({ children = 'No subscribers found.' }) {
  return <div className="flex min-h-24 items-center justify-center px-4 py-8 text-center text-xs text-slate-400">{children}</div>;
}

// Subscriber Drawer: exact design of the inquiry section from AnalyticsDashboardPage
function SubscriberDrawer({ subscriber: s, inquiry: inq, onClose }) {
  useEffect(() => {
    const key = (e) => { if (e.key === 'Escape') onClose(); };
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', key);
    return () => { document.body.style.overflow = old; window.removeEventListener('keydown', key); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Subscriber details">
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-slate-950/25 backdrop-blur-[2px]" />
      <aside className="relative z-10 h-full w-full max-w-[420px] overflow-y-auto border-l border-slate-200 bg-slate-50 shadow-2xl">
        <header className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-slate-900">{inq?.name || s.email}</h3>
            <div className="mt-1 flex items-center gap-2">
              {s.isActive ? (
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                  <CheckCircle2 size={11} /> Active subscriber
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">
                  <XCircle size={11} /> Unsubscribed
                </span>
              )}
              {inq && (
                <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700">
                  <BadgeCheck size={11} /> Has inquiry
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50" aria-label="Close">
            <X size={16} />
          </button>
        </header>

        <div className="space-y-3 p-3 text-[12px]">
          {/* Linked Inquiry Details (styled identically to AnalyticsDashboardPage) */}
          {inq ? (
            <section className={cx(panel, 'overflow-hidden')}>
              <div className="border-b border-blue-100 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-900">
                Inquiry details
              </div>
              <div className="space-y-2 p-3 text-xs">
                <p><b className="text-slate-500">Status:</b> <span className="font-semibold text-slate-800">{inq.status || '—'}</span></p>
                <p className="flex items-center gap-2">
                  <Mail size={13} className="text-slate-400" />
                  <a className="text-blue-600 hover:underline" href={`mailto:${inq.email}`}>{inq.email || '—'}</a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={13} className="text-slate-400" />
                  <span>{inq.phone || 'Not provided'}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Building2 size={13} className="text-slate-400" />
                  <span>{inq.companyName || 'Not provided'}</span>
                </p>
                <p><b className="text-slate-500">Budget:</b> <span className="font-semibold text-slate-800">{inq.budget || '—'}</span></p>
                {inq.role && <p><b className="text-slate-500">Role:</b> {inq.role}</p>}
                {inq.message && (
                  <p className="rounded-lg bg-slate-50 p-2.5 leading-relaxed text-slate-600 border border-slate-100">
                    {inq.message}
                  </p>
                )}
              </div>
            </section>
          ) : (
            <section className={cx(panel, 'p-4 text-center text-xs text-slate-400')}>
              No commercial inquiry associated with this subscriber email.
            </section>
          )}

          {/* Subscription Meta */}
          <section className={cx(panel, 'overflow-hidden')}>
            <h4 className="border-b border-slate-100 bg-slate-50 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-slate-600">
              Subscription record
            </h4>
            <dl className="divide-y divide-slate-100 px-3">
              {[
                ['Email address', s.email],
                ['Current status', s.isActive ? 'Active' : 'Unsubscribed'],
                ['Subscribed on', s.subscribedAt ? new Date(s.subscribedAt).toLocaleString('en-IN') : '—'],
                ['Time in list', ago(s.subscribedAt)],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start justify-between gap-4 py-2 text-[11px]">
                  <dt className="shrink-0 text-slate-500">{k}</dt>
                  <dd className="max-w-[65%] break-words text-right font-semibold text-slate-800">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          {s.id && <p className="break-all px-1 font-mono text-[10px] text-slate-400">Subscription ID: {s.id}</p>}
        </div>
      </aside>
    </div>
  );
}

export default function NewsletterPage() {
  const [subscribersData, setSubscribersData] = useState(null);
  const [inqData, setInqData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Filters & controls
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(null);

  // Add subscriber modal/form state
  const [newEmail, setNewEmail] = useState('');
  const [adding, setAdding] = useState(false);
  const [addMsg, setAddMsg] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setDebounced(search.trim()); setPage(0); }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const activeParam = activeFilter === 'true' ? true : activeFilter === 'false' ? false : null;
      const [subsRes, inqRes] = await Promise.all([
        fetchNewsletterSubscribers({
          search: debounced || undefined,
          activeOnly: activeParam,
          page,
          size: PAGE_SIZE,
        }),
        fetchInquiries({ size: 200, page: 0 }).catch(() => null),
      ]);

      setSubscribersData(subsRes || { content: [], totalElements: 0, totalPages: 1 });
      if (inqRes) setInqData(inqRes);
    } catch (err) {
      setError(err?.message || 'Failed to load newsletter subscribers');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [debounced, activeFilter, page]);

  useEffect(() => { loadData(); }, [loadData]);

  const refresh = () => {
    setRefreshing(true);
    loadData();
  };

  // Map inquiries by email to check if a subscriber has also submitted an inquiry
  const inquiryByEmail = useMemo(() => {
    const map = {};
    (inqData?.content || []).forEach((i) => {
      const email = (i.email || '').trim().toLowerCase();
      if (email) map[email] = i;
    });
    return map;
  }, [inqData]);

  const handleAddSubscriber = async (e) => {
    e.preventDefault();
    if (!newEmail.trim() || adding) return;
    setAdding(true);
    setAddMsg(null);
    try {
      await subscribeNewsletterAdmin(newEmail.trim());
      setAddMsg({ type: 'success', text: `Subscribed ${newEmail.trim()} successfully!` });
      setNewEmail('');
      loadData();
      setTimeout(() => { setShowAddModal(false); setAddMsg(null); }, 1500);
    } catch (err) {
      setAddMsg({ type: 'error', text: err?.message || 'Failed to subscribe email.' });
    } finally {
      setAdding(false);
    }
  };

  const subscribers = subscribersData?.content || [];
  const totalElements = subscribersData?.totalElements || 0;
  const totalPages = Math.max(1, subscribersData?.totalPages || 1);
  const activeCount = subscribers.filter(s => s.isActive).length;
  const linkedInquiryCount = subscribers.filter(s => inquiryByEmail[(s.email || '').toLowerCase()]).length;

  return (
    <main className="min-h-screen space-y-3 bg-slate-50/70 p-2.5 text-[12px] text-slate-800 sm:p-4 lg:p-5" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">Newsletter Subscribers</h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700">
              <Mail size={12} /> {n(totalElements)} Total
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            Subscribers directory, subscription status, and linked commercial inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className={cx('inline-flex h-8 items-center gap-1.5 rounded-lg bg-blue-600 px-3 text-[11px] font-semibold text-white shadow-sm hover:bg-blue-700 transition', buttonFocus)}
          >
            <Plus size={13} /> Add subscriber
          </button>
          <button
            onClick={refresh}
            className={cx('inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm', buttonFocus)}
          >
            <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>
      </header>

      {error && (
        <div role="alert" className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] text-rose-700">
          <AlertCircle size={14} />
          <span className="flex-1">Unable to load subscribers: {error}</span>
          <button onClick={refresh} className="font-bold underline">Retry</button>
        </div>
      )}

      {/* KPI Cards Strip */}
      <section className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        <Kpi icon={Mail} label="Total subscribers" value={n(totalElements)} detail="Registered in database" color="blue" />
        <Kpi icon={CheckCircle2} label="Active on list" value={n(activeCount)} detail={`${totalElements ? Math.round((activeCount / totalElements) * 100) : 100}% delivery rate`} color="emerald" />
        <Kpi icon={BadgeCheck} label="Linked inquiries" value={n(linkedInquiryCount)} detail="Subscribers who sent briefs" color="purple" />
        <Kpi icon={Users} label="Current page" value={`${page + 1} of ${totalPages}`} detail={`${PAGE_SIZE} per page`} color="blue" />
      </section>

      {/* Main Panel */}
      <section className={cx(panel, 'min-w-0 overflow-hidden')}>
        <PanelHead
          title="Subscriber records"
          subtitle="All audience emails opted-in through platform capture points"
          action={
            (search || activeFilter) ? (
              <button
                onClick={() => { setSearch(''); setDebounced(''); setActiveFilter(''); setPage(0); }}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-700"
              >
                Clear filters
              </button>
            ) : null
          }
        />

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-100 px-3 py-2.5">
          <div className="relative min-w-[200px] flex-1">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by subscriber email..."
              aria-label="Search subscribers"
              className={cx(inputClass, 'w-full pl-8')}
            />
          </div>

          <select
            value={activeFilter}
            onChange={(e) => { setActiveFilter(e.target.value); setPage(0); }}
            aria-label="Filter status"
            className={inputClass}
          >
            <option value="">All statuses</option>
            <option value="true">Active subscribers</option>
            <option value="false">Unsubscribed</option>
          </select>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block">
          <table className="w-full table-fixed text-left">
            <colgroup>
              <col className="w-[38%]" />
              <col className="w-[18%]" />
              <col className="w-[20%]" />
              <col className="w-[14%]" />
              <col className="w-[10%]" />
            </colgroup>
            <thead className="bg-slate-50 text-[9px] font-bold uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-3 py-2.5">Subscriber Email</th>
                <th className="px-2 py-2.5">Status</th>
                <th className="px-2 py-2.5">Linked Inquiry</th>
                <th className="px-2 py-2.5">Subscribed Date</th>
                <th className="px-3 py-2.5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && subscribers.length === 0 ? (
                <tr><td colSpan="5"><Empty>Loading subscriber directory…</Empty></td></tr>
              ) : !subscribers.length ? (
                <tr><td colSpan="5"><Empty>No subscribers match these criteria.</Empty></td></tr>
              ) : (
                subscribers.map((s) => {
                  const inquiry = inquiryByEmail[(s.email || '').toLowerCase()];
                  return (
                    <tr
                      key={s.id || s.email}
                      onClick={() => setSelected(s)}
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setSelected(s)}
                      className="cursor-pointer transition hover:bg-blue-50/40 focus:bg-blue-50/50"
                    >
                      <td className="px-3 py-2">
                        <div className="flex min-w-0 items-center gap-2">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-bold text-[11px]">
                            {s.email?.charAt(0).toUpperCase()}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-[11px] font-bold text-slate-900">{s.email}</p>
                            <p className="truncate font-mono text-[9px] text-slate-400">{s.id ? s.id.slice(0, 8) + '...' : ''}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-2 py-2">
                        {s.isActive ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                            <CheckCircle2 size={11} /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">
                            <XCircle size={11} /> Unsubscribed
                          </span>
                        )}
                      </td>

                      <td className="px-2 py-2">
                        {inquiry ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700">
                            <BadgeCheck size={12} /> {inquiry.name || 'Commercial inquiry'}
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">None</span>
                        )}
                      </td>

                      <td className="px-2 py-2">
                        <p className="text-[10px] font-semibold text-slate-700">{ago(s.subscribedAt)}</p>
                        <p className="text-[9px] text-slate-400">{s.subscribedAt ? new Date(s.subscribedAt).toLocaleDateString('en-IN') : '—'}</p>
                      </td>

                      <td className="px-3 py-2 text-right">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setSelected(s); }}
                          className="rounded bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="divide-y divide-slate-100 md:hidden">
          {loading && subscribers.length === 0 ? (
            <Empty>Loading subscribers…</Empty>
          ) : !subscribers.length ? (
            <Empty>No subscribers found.</Empty>
          ) : (
            subscribers.map((s) => {
              const inquiry = inquiryByEmail[(s.email || '').toLowerCase()];
              return (
                <button
                  key={s.id || s.email}
                  onClick={() => setSelected(s)}
                  className="block w-full px-3 py-2.5 text-left hover:bg-blue-50/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <b className="block truncate text-[11px] text-slate-900">{s.email}</b>
                      <span className="block text-[10px] text-slate-400 mt-0.5">Subscribed {ago(s.subscribedAt)}</span>
                    </div>
                    {s.isActive ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                        <CheckCircle2 size={11} /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">
                        <XCircle size={11} /> Off
                      </span>
                    )}
                  </div>
                  {inquiry && (
                    <div className="mt-2 text-[10px] text-blue-700 font-semibold flex items-center gap-1">
                      <BadgeCheck size={11} /> Linked inquiry: {inquiry.name} ({inquiry.companyName || 'Brand'})
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Pagination Footer */}
        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-3 py-2 text-[10px] text-slate-500">
          <span className="tabular-nums">
            {subscribers.length ? `${page * PAGE_SIZE + 1}–${Math.min((page + 1) * PAGE_SIZE, totalElements)}` : 0} of {n(totalElements)} subscribers
          </span>
          <div className="flex items-center gap-2">
            <button
              aria-label="Previous page"
              disabled={page === 0}
              onClick={() => setPage(p => Math.max(0, p - 1))}
              className="rounded-md border border-slate-200 p-1.5 disabled:opacity-30"
            >
              <ChevronLeft size={13} />
            </button>
            <span className="tabular-nums font-semibold text-slate-700">
              Page {page + 1} / {totalPages}
            </span>
            <button
              aria-label="Next page"
              disabled={page >= totalPages - 1}
              onClick={() => setPage(p => p + 1)}
              className="rounded-md border border-slate-200 p-1.5 disabled:opacity-30"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </footer>
      </section>

      {/* Manual Add Subscriber Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/30 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Add subscriber manually</h3>
              <button onClick={() => setShowAddModal(false)} className="rounded-lg p-1 text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleAddSubscriber} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Subscriber email address</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="creator@gmail.com"
                  className={cx(inputClass, 'w-full !h-9 text-xs')}
                />
              </div>

              {addMsg && (
                <div className={cx('p-2 rounded-lg text-xs font-semibold', addMsg.type === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700')}>
                  {addMsg.text}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adding}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  <Send size={12} /> {adding ? 'Adding...' : 'Subscribe'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Drawer */}
      {selected && (
        <SubscriberDrawer
          subscriber={selected}
          inquiry={inquiryByEmail[(selected.email || '').toLowerCase()]}
          onClose={() => setSelected(null)}
        />
      )}
    </main>
  );
}