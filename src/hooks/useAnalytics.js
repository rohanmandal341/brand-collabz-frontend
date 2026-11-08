import { useEffect, useRef } from 'react';
import { submitAnalyticsLead } from '../services/api';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://adrovis-influencer-backend.onrender.com';

function getOrCreateStorage(storage, key, generator) {
  try {
    let val = storage.getItem(key);
    if (!val) {
      val = generator();
      storage.setItem(key, val);
    }
    return val;
  } catch {
    return generator();
  }
}

export function useAnalytics(campaignId = null) {
  const startTimeRef = useRef(Date.now());
  const activeDwellRef = useRef(0);
  const lastActiveTimestampRef = useRef(Date.now());
  const isDocumentVisibleRef = useRef(typeof document !== 'undefined' ? !document.hidden : true);
  const sessionIdRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Identity Management
    const visitorId = getOrCreateStorage(localStorage, 'bc_visitor_id', () => crypto.randomUUID());
    const sessionId = getOrCreateStorage(sessionStorage, 'bc_session_id', () => crypto.randomUUID());
    sessionIdRef.current = sessionId;

    // 2. Extract UTM & Traffic Parameters
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium');
    const utmCampaign = params.get('utm_campaign');
    const utmContent = params.get('utm_content');
    const utmTerm = params.get('utm_term');

    // 3. Track Initial Visit
    fetch(`${API_BASE}/api/v1/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId,
        sessionId,
        path: window.location.pathname,
        referrer: document.referrer || null,
        utmSource,
        utmMedium,
        utmCampaign,
        utmContent,
        utmTerm,
        campaignId,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata',
      }),
    }).catch(() => {});

    // 4. Tab Visibility Engine
    const handleVisibilityChange = () => {
      const now = Date.now();
      if (document.hidden) {
        if (isDocumentVisibleRef.current) {
          activeDwellRef.current += Math.floor((now - lastActiveTimestampRef.current) / 1000);
        }
        isDocumentVisibleRef.current = false;
      } else {
        lastActiveTimestampRef.current = now;
        isDocumentVisibleRef.current = true;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 5. Heartbeat Every 20s
    const heartbeatTimer = setInterval(() => {
      const now = Date.now();
      if (isDocumentVisibleRef.current) {
        activeDwellRef.current += Math.floor((now - lastActiveTimestampRef.current) / 1000);
        lastActiveTimestampRef.current = now;
      }
      const totalDuration = Math.floor((now - startTimeRef.current) / 1000);

      fetch(`${API_BASE}/api/v1/analytics/heartbeat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          durationSeconds: totalDuration,
          activeDwellSeconds: activeDwellRef.current,
        }),
      }).catch(() => {});
    }, 20000);

    // 6. Asynchronous Beacon on Tab Close / Unload
    const handleUnload = () => {
      const now = Date.now();
      if (isDocumentVisibleRef.current) {
        activeDwellRef.current += Math.floor((now - lastActiveTimestampRef.current) / 1000);
      }
      const totalDuration = Math.floor((now - startTimeRef.current) / 1000);

      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          `${API_BASE}/api/v1/analytics/heartbeat`,
          new Blob(
            [
              JSON.stringify({
                sessionId,
                durationSeconds: totalDuration,
                activeDwellSeconds: activeDwellRef.current,
              }),
            ],
            { type: 'application/json' }
          )
        );
      }
    };
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearInterval(heartbeatTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [campaignId]);

  const trackApplyConversion = () => {
    if (!sessionIdRef.current) return;
    fetch(`${API_BASE}/api/v1/analytics/conversion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: sessionIdRef.current }),
    }).catch(() => {});
  };

  const captureLead = (leadInfo) => {
    if (!sessionIdRef.current) return Promise.reject(new Error('Session not active'));
    return submitAnalyticsLead({
      sessionId: sessionIdRef.current,
      ...leadInfo,
    });
  };

  const getSessionId = () => sessionIdRef.current;

  return { trackApplyConversion, captureLead, getSessionId };
}