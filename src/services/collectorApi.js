const BASE = (import.meta.env.VITE_API_URL || 'https://adrovis-influencer-backend.onrender.com').replace(/\/$/, '');
const COLLECTOR_API = `${BASE}/api/v1/collector`;

async function request(path, params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.set(k, v);
  });
  const url = `${COLLECTOR_API}${path}${qs.toString() ? `?${qs.toString()}` : ''}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
  return res.json();
}

export const fetchDashboardOverview = (timeRange = 'LAST_7_DAYS') =>
  request('/dashboard/overview', { timeRange });

export const fetchCreatorsTable = (filters = {}) =>
  request('/creators', filters);

export const fetchTeamMembers = () =>
  request('/creators/members');

export const getExportCsvUrl = (filters = {}) => {
  const qs = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.set(k, v);
  });
  return `${COLLECTOR_API}/creators/export?${qs.toString()}`;
};