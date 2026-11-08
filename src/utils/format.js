export const FALLBACK_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ede9fe"/><stop offset="1" stop-color="#c4b5fd"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/></svg>`
  );

export const compact = (n) => {
  if (n == null) return '';
  if (n >= 1e6) return `${+(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${+(n / 1e3).toFixed(1)}k`;
  return String(n);
};

export const comp = (c) => c?.compensation || {};
export const elig = (c) => c?.eligibility || {};
export const sched = (c) => c?.schedule || {};
export const isPaid = (c) => c?.campaignType === 'PAID';

export const payoutLabel = (c) => comp(c).summary || (isPaid(c) ? 'Cash payout' : 'Product barter');

export const followersLabel = (c) => {
  const e = elig(c);
  return e.followers_label || (e.min_followers ? `${compact(e.min_followers)}+` : 'Open to all');
};

export const genderLabel = (c) => {
  const g = elig(c).gender;
  if (!g || g === 'NOT_SPECIFIED' || g.toLowerCase() === 'any') return 'Any';
  return g.replace(/_/g, ' ').toLowerCase().replace(/^\w/, (m) => m.toUpperCase());
};

export const formatDate = (v) => {
  if (!v) return null;
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return String(v);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const money = (n) => (typeof n === 'number' ? `\u20B9${n.toLocaleString('en-IN')}` : n);
export const initials = (s = '') => s.trim().charAt(0).toUpperCase() || 'B';
