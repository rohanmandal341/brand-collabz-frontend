const BASE = (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'https://adrovis-influencer-backend.onrender.com').replace(/\/$/, '');
const API = `${BASE}/api/v1/analytics`;

// Persistent Visitor ID across sessions
export const getVisitorId = () => {
  let vid = localStorage.getItem('collabhub:visitor_id');
  if (!vid) {
    vid = 'v_' + Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
    localStorage.setItem('collabhub:visitor_id', vid);
  }
  return vid;
};

// Session ID tied to active browser tab/session
export const getSessionId = () => {
  let sid = sessionStorage.getItem('collabhub:session_id');
  if (!sid) {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      sid = crypto.randomUUID();
    } else {
      sid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
    sessionStorage.setItem('collabhub:session_id', sid);
  }
  return sid;
};

// 1. Tracks every path, tab, and campaign view
export const trackPageView = async (path, campaignId = null) => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const payload = {
      visitorId: getVisitorId(),
      sessionId: getSessionId(),
      path: path || window.location.pathname,
      referrer: document.referrer || '',
      utmSource: urlParams.get('utm_source') || '',
      utmMedium: urlParams.get('utm_medium') || '',
      utmCampaign: urlParams.get('utm_campaign') || '',
      utmContent: urlParams.get('utm_content') || '',
      utmTerm: urlParams.get('utm_term') || '',
      campaignId: campaignId || null,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    };

    fetch(`${API}/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {}
};

// 2. Tracks "Apply Now" conversions
export const trackConversion = async (campaignId = null) => {
  try {
    const sessionId = getSessionId();

    fetch(`${API}/conversion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
      keepalive: true,
    }).catch(() => {});

    if (campaignId) {
      trackPageView(window.location.pathname, campaignId);
    }
  } catch {}
};

// 3. Heartbeat & Active Dwell Time Manager
let heartbeatInterval = null;
let activeDwellSeconds = 0;
let totalDurationSeconds = 0;
let isTabActive = true;

export const initHeartbeat = () => {
  if (heartbeatInterval) return;

  const onActivity = () => { isTabActive = true; };
  window.addEventListener('mousemove', onActivity, { passive: true });
  window.addEventListener('keydown', onActivity, { passive: true });
  window.addEventListener('scroll', onActivity, { passive: true });

  document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
  });

  heartbeatInterval = setInterval(() => {
    totalDurationSeconds += 15;
    if (isTabActive && !document.hidden) {
      activeDwellSeconds += 15;
    }

    const payload = {
      sessionId: getSessionId(),
      durationSeconds: totalDurationSeconds,
      activeDwellSeconds: activeDwellSeconds,
    };

    fetch(`${API}/heartbeat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }, 15000);
};