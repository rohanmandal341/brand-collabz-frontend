import React from 'react';
import { ShieldAlert, CheckCircle2, Info, X } from 'lucide-react';

const TONES = {
  error: { Icon: ShieldAlert, wrap: 'bg-rose-50 text-rose-600 ring-rose-100' },
  info: { Icon: Info, wrap: 'bg-blue-50 text-blue-600 ring-blue-100' },
  success: { Icon: CheckCircle2, wrap: 'bg-emerald-50 text-emerald-600 ring-emerald-100' },
};

export default function CheckoutOverlay({ loading, notice, onClose }) {
  if (!loading && !notice) return null;

  const base =
    'fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-5 backdrop-blur-md';

  const style = `
    @keyframes co-fade { from { opacity: 0 } to { opacity: 1 } }
    @keyframes co-pop { from { opacity: 0; transform: translateY(8px) scale(.97) } to { opacity: 1; transform: none } }
  `;

  if (notice) {
    const { Icon, wrap } = TONES[notice.tone] || TONES.info;
    const run = (fn) => () => {
      onClose();
      fn && fn();
    };
    return (
      <div
        className={base}
        style={{ animation: 'co-fade .2s ease-out' }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="co-title"
      >
        <style>{style}</style>
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-sm rounded-[1.6rem] border border-slate-200/80 bg-white p-7 text-center shadow-2xl shadow-black/30"
          style={{ animation: 'co-pop .25s cubic-bezier(.2,.7,.2,1)' }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
          <span className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl ring-8 ${wrap}`}>
            <Icon className="h-6 w-6" />
          </span>
          <h3 id="co-title" className="mt-5 text-lg font-bold tracking-tight text-slate-950">
            {notice.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{notice.message}</p>
          <div className="mt-6 flex flex-col gap-2.5">
            {notice.primary && (
              <button
                type="button"
                onClick={run(notice.primary.onClick)}
                className="h-11 w-full rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm shadow-blue-500/25 transition hover:bg-blue-700 active:scale-[0.99]"
              >
                {notice.primary.label}
              </button>
            )}
            {notice.secondary && (
              <button
                type="button"
                onClick={run(notice.secondary.onClick)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                {notice.secondary.label}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={base} style={{ animation: 'co-fade .2s ease-out' }} role="status" aria-live="polite">
      <style>{style}</style>
      <div
        className="flex w-full max-w-[260px] flex-col items-center rounded-[1.6rem] border border-white/10 bg-white px-8 py-9 text-center shadow-2xl shadow-black/30"
        style={{ animation: 'co-pop .25s cubic-bezier(.2,.7,.2,1)' }}
      >
        <span className="relative block h-14 w-14">
          <span className="absolute inset-0 rounded-full border-[3px] border-blue-100" />
          <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-blue-600" />
        </span>
        <p className="mt-6 text-sm font-bold text-slate-900">{typeof loading === 'string' ? loading : 'Please wait…'}</p>
        <p className="mt-1 text-xs text-slate-500">Please don’t close this window</p>
      </div>
    </div>
  );
}