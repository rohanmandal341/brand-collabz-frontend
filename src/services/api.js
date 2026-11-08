const API_BASE = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'https://adrovis-influencer-backend.onrender.com';
const ADMIN_KEY = import.meta.env.VITE_ANALYTICS_ADMIN_KEY || 'brand_collabz_admin_secret_99';

export function getBackendUrl() {
  return API_BASE;
}

export function applyUrl(id) {
  return `${API_BASE}/api/v1/campaigns/${id}/apply`;
}

// =========================================================================
// 1. CAMPAIGNS & MARKETPLACE APIS
// =========================================================================

export async function fetchCampaigns({
  page = 0,
  size = 12,
  brand = '',
  category = '',
  campaignType = '',
  maxFollowers = '',
  minPayout = '',
  sortBy = 'createdAt',
  sortDirection = 'desc',
} = {}) {
  const params = new URLSearchParams();

  if (page !== undefined && page !== null) params.set('page', String(page));
  if (size !== undefined && size !== null) params.set('size', String(size));
  if (brand) params.set('brand', brand);
  if (category) params.set('category', category);
  if (campaignType) params.set('campaignType', campaignType);
  if (maxFollowers) params.set('maxFollowers', String(maxFollowers));
  if (minPayout) params.set('minPayout', String(minPayout));
  if (sortBy) params.set('sortBy', sortBy);
  if (sortDirection) params.set('sortDirection', sortDirection);

  const res = await fetch(`${API_BASE}/api/v1/campaigns?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to load campaigns');
  const json = await res.json();
  return json?.data || { content: [], totalElements: 0, totalPages: 1 };
}

export async function fetchCampaignById(id) {
  const res = await fetch(`${API_BASE}/api/v1/campaigns/${id}`);
  if (!res.ok) throw new Error('Failed to load campaign details');
  const json = await res.json();
  return json?.data || null;
}

export const fetchCampaign = fetchCampaignById;

// =========================================================================
// 2. AGENCIES & SYSTEM HEALTH APIS
// =========================================================================

export async function fetchAgencies() {
  const res = await fetch(`${API_BASE}/api/v1/agencies`);
  if (!res.ok) throw new Error('Failed to load agencies');
  const json = await res.json();
  return json?.data || [];
}

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/api/v1/health`);
  if (!res.ok) throw new Error('Health check failed');
  const json = await res.json();
  return json?.data || { status: 'UP' };
}

// =========================================================================
// 3. ANALYTICS & LEAD ATTRIBUTION APIS
// =========================================================================

export async function fetchAnalyticsOverview(days = 30) {
  const res = await fetch(`${API_BASE}/api/v1/analytics/overview?days=${days}`, {
    headers: { 'X-Admin-Key': ADMIN_KEY },
  });
  if (!res.ok) throw new Error('Failed to load analytics overview');
  const json = await res.json();
  return json?.data || null;
}

export async function fetchAnalyticsSessions({
  search = '',
  deviceType = '',
  channel = '',
  applied,
  activeNow,
  from = '',
  to = '',
  page = 0,
  size = 15,
  sortBy = 'createdAt',
  direction = 'desc',
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
    sortBy,
    direction,
  });

  if (search) params.set('q', search);
  if (deviceType) params.set('deviceType', deviceType);
  if (channel) params.set('channel', channel);
  if (applied !== undefined && applied !== null && applied !== '') params.set('applied', String(applied));
  if (activeNow) params.set('activeNow', 'true');
  if (from) params.set('from', from);
  if (to) params.set('to', to);

  const res = await fetch(`${API_BASE}/api/v1/analytics/sessions?${params.toString()}`, {
    headers: { 'X-Admin-Key': ADMIN_KEY },
  });
  if (!res.ok) throw new Error('Failed to load user sessions');
  const json = await res.json();
  return json?.data || { content: [], totalElements: 0, totalPages: 1 };
}

export async function fetchAnalyticsSessionById(id) {
  const res = await fetch(`${API_BASE}/api/v1/analytics/sessions/${id}`, {
    headers: { 'X-Admin-Key': ADMIN_KEY },
  });
  if (!res.ok) throw new Error('Failed to load session details');
  const json = await res.json();
  return json?.data || null;
}

export async function fetchAnalyticsLeads() {
  const res = await fetch(`${API_BASE}/api/v1/analytics/leads`, {
    headers: { 'X-Admin-Key': ADMIN_KEY },
  });
  if (!res.ok) throw new Error('Failed to load leads');
  const json = await res.json();
  return json?.data || [];
}

export async function submitAnalyticsLead({
  sessionId,
  email,
  fullName,
  phone,
  userType,
  consent = true,
  consentText = 'Agreed to receive campaign briefs and platform updates.',
}) {
  const normalizedRole = userType === 'CREATOR' ? 'INFLUENCER' : (userType === 'BRAND' ? 'BRAND' : 'OTHER');

  const res = await fetch(`${API_BASE}/api/v1/analytics/lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      email: email.trim().toLowerCase(),
      fullName: fullName?.trim() || null,
      phone: phone?.trim() || null,
      userType: normalizedRole,
      consent: Boolean(consent),
      consentText,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to save lead attribution');
  }
  return res.json();
}

// =========================================================================
// 4. INQUIRIES & LEAD MANAGEMENT APIS
// =========================================================================

export async function fetchInquiries({
  role = '',
  status = '',
  search = '',
  page = 0,
  size = 15,
} = {}) {
  const params = new URLSearchParams({ page: String(page), size: String(size) });

  if (role) params.set('role', role);
  if (status) params.set('status', status);
  if (search) params.set('search', search);

  const res = await fetch(`${API_BASE}/api/v1/inquiries?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to load inquiries');
  const json = await res.json();
  return json?.data || { content: [], totalElements: 0, totalPages: 1 };
}

export async function updateInquiryStatus(id, status) {
  const res = await fetch(`${API_BASE}/api/v1/inquiries/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update inquiry status');
  return res.json();
}

export async function submitInquiry(payload) {
  const res = await fetch(`${API_BASE}/api/v1/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to submit inquiry');
  return res.json();
}

// =========================================================================
// 5. NEWSLETTER APIS
// =========================================================================

export async function fetchNewsletterSubscribers({
  activeOnly = null,
  search = '',
  page = 0,
  size = 20,
} = {}) {
  const params = new URLSearchParams({ page: String(page), size: String(size) });

  if (activeOnly !== null && activeOnly !== undefined && activeOnly !== '') {
    params.set('activeOnly', String(activeOnly));
  }
  if (search) params.set('search', search);

  const res = await fetch(`${API_BASE}/api/v1/newsletter/subscribers?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to load subscribers');
  const json = await res.json();
  return json?.data || { content: [], totalElements: 0, totalPages: 1 };
}

export async function subscribeNewsletterAdmin(email) {
  const res = await fetch(`${API_BASE}/api/v1/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error('Failed to subscribe email');
  return res.json();
}

// =========================================================================
// 6. PAYMENT & MEMBERSHIP SUBSCRIPTION APIS (Razorpay)
// =========================================================================

export async function createPaymentOrder({ email, fullName, planId, userRole, amount }) {
  const res = await fetch(`${API_BASE}/api/v1/payments/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, fullName, planId, userRole, amount }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || 'Failed to create payment order');
  }
  const json = await res.json();
  return json?.data || null;
}

export async function verifyPaymentSignature({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) {
  const res = await fetch(`${API_BASE}/api/v1/payments/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ razorpayOrderId, razorpayPaymentId, razorpaySignature }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || 'Payment signature verification failed');
  }
  const json = await res.json();
  return json?.data || null;
}

export async function fetchAdminPaymentStats() {
  const res = await fetch(`${API_BASE}/api/v1/admin/payments/stats`, {
    headers: { 'X-Admin-Key': ADMIN_KEY },
  });
  if (!res.ok) throw new Error('Failed to load payment statistics');
  const json = await res.json();
  return json?.data || null;
}

export async function fetchAdminTransactions({ search = '', page = 0, size = 20 } = {}) {
  const params = new URLSearchParams({ page: String(page), size: String(size) });
  if (search) params.set('search', search);

  const res = await fetch(`${API_BASE}/api/v1/admin/payments/transactions?${params.toString()}`, {
    headers: { 'X-Admin-Key': ADMIN_KEY },
  });
  if (!res.ok) throw new Error('Failed to load transaction records');
  const json = await res.json();
  return json?.data || { content: [], totalElements: 0, totalPages: 1 };
}