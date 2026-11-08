// Talks to the Adrovis Security API (see authConfig.js for paths).
// Flow: GET /csrf -> POST (with X-XSRF-TOKEN) -> accessToken kept in memory,
// refresh token lives in the HttpOnly cookie and is used via /refresh.
//
// user shape used by the UI: { id, name, email, role, roles, status, emailVerified, onboardingComplete }
import { AUTH_ENDPOINTS as E, AUTH_API_BASE, GOOGLE_CLIENT_ID } from "./authConfig";

let accessToken = null;
let refreshing = null;

/* ---------------- low-level ---------------- */

function errorFrom(json, fallback) {
  const first = Array.isArray(json?.errors) ? json.errors[0] : null;
  const m =
    json?.message ||
    json?.detail ||
    json?.error_description ||
    (typeof first === "string" ? first : first?.message || first?.defaultMessage) ||
    (typeof json?.error === "string" ? json.error : "");
  return m || fallback;
}

async function raw(path, { method = "GET", body, headers = {} } = {}) {
  let res;
  try {
    res = await fetch(`${AUTH_API_BASE}${path}`, {
      method,
      credentials: "include",
      headers: { Accept: "application/json", ...(body ? { "Content-Type": "application/json" } : {}), ...headers },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    const err = new Error("Can’t reach the server. Check your connection and try again.");
    err.network = true;
    throw err;
  }
  const text = await res.text().catch(() => "");
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch { json = null; }
  if (!res.ok) {
    const err = new Error(errorFrom(json, res.status === 401 ? "Invalid email or password." : "Something went wrong. Please try again."));
    err.status = res.status;
    throw err;
  }
  return json;
}

// Step 1 of every public POST: get a fresh CSRF token (cookie is set by this call).
async function csrfHeaders() {
  const j = await raw(E.csrf);
  if (!j?.token) throw new Error("Security check failed. Please refresh the page.");
  return { [j.headerName || "X-XSRF-TOKEN"]: j.token };
}

async function publicPost(path, body) {
  const headers = await csrfHeaders();
  return raw(path, { method: "POST", body, headers });
}

async function privateRequest(path, opts = {}, retried = false) {
  try {
    return await raw(path, { ...opts, headers: { ...(opts.headers || {}), ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}) } });
  } catch (err) {
    if ((err.status === 401 || err.status === 403) && !retried) {
      try { await refreshSession(); } catch { throw err; }
      return privateRequest(path, opts, true);
    }
    throw err;
  }
}

/* ---------------- tokens & user mapping ---------------- */

// Find the access token anywhere in the response (ignores refresh tokens)
function pickToken(j) {
  const seen = new Set();
  const walk = (o) => {
    if (!o || typeof o !== "object" || seen.has(o)) return null;
    seen.add(o);
    for (const [k, v] of Object.entries(o)) {
      if (typeof v === "string" && /token|jwt/i.test(k) && !/refresh|csrf|type/i.test(k) && v.length > 20) return v;
    }
    for (const v of Object.values(o)) {
      const f = walk(v);
      if (f) return f;
    }
    return null;
  };
  return walk(j);
}

function mapUser(u) {
  if (!u) return null;
  const roles = (Array.isArray(u.roles) ? u.roles : u.role ? [u.role] : []).map((r) => String(r).toLowerCase());
  const role = roles.find((r) => r !== "admin") || roles[0] || "";
  return {
    id: u.userId || u.id,
    name: u.fullName || u.name || "",
    email: u.email || "",
    role,
    roles,
    status: u.status,
    emailVerified: !!u.emailVerified,
    phone: u.mobileNumber || "",   // <-- add this
    onboardingComplete: !!(u.profileCompleted ?? u.onboardingComplete),
  };
}

async function fetchMe() {
  const j = await privateRequest(E.me);
  return mapUser(j?.user || j?.data || j);
}

function refreshSession() {
  if (!refreshing) {
    refreshing = (async () => {
      try {
        const j = await publicPost(E.refresh);
        const t = pickToken(j);
        if (!t) throw new Error("Session expired.");
        accessToken = t;
        return j;
      } finally {
        refreshing = null;
      }
    })();
  }
  return refreshing;
}

async function finishAuth(j) {
  if (import.meta.env.DEV) console.log("[auth] response keys:", j && Object.keys(j));
  const t = pickToken(j);
  if (t) accessToken = t;
  else {
    // No token in the body: the session may be cookie-only. Try the refresh cookie.
    try { await refreshSession(); } catch {
      throw new Error("Login succeeded but no session was returned. Please try again.");
    }
  }
  const fromBody = mapUser(j?.user);
  return fromBody && fromBody.role ? fromBody : await fetchMe();
}

/* ---------------- Google Identity Services ---------------- */

let gsiPromise = null;
const loadGsi = () =>
  (gsiPromise ||= new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) return resolve();
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => { gsiPromise = null; reject(new Error("Couldn’t load Google sign-in.")); };
    document.head.appendChild(s);
  }));

/* ---------------- public API ---------------- */

export const authService = {
  async signup({ name, email, password, role }) {
    const j = await publicPost(E.signup, { name, email, password, role });
    if (pickToken(j)) return { user: await finishAuth(j) };
    // No token returned (e.g. email verification required) -> try logging in.
    try {
      return await authService.login({ email, password, remember: true });
    } catch {
      return { user: null, verificationRequired: true };
    }
  },

  async login({ email, password, remember = true }) {
    const j = await publicPost(E.login, { email, password, remember });
    return { user: await finishAuth(j) };
  },

  async google(credential, role) {
    const j = await publicPost(E.google, { credential, ...(role ? { role } : {}) });
    return { user: await finishAuth(j) };
  },

  async mountGoogleButton(el, width, onCredential) {
    if (!GOOGLE_CLIENT_ID) throw new Error("Google sign-in isn’t configured yet.");
    await loadGsi();
    if (!el) return;
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (r) => r?.credential && onCredential(r.credential),
    });
    el.innerHTML = "";
    window.google.accounts.id.renderButton(el, { type: "standard", theme: "outline", size: "large", width });
  },

  forgotPassword: (email) => publicPost(E.forgotPassword, { email }),
  resetPassword: ({ token, password, confirmPassword }) => publicPost(E.resetPassword, { token, password, confirmPassword }),
  verifyEmail: (token) => publicPost(E.verifyEmail, { token }),
  resendVerification: (email) => publicPost(E.resendVerification, { email }),

  async completeOnboarding(payload) {
    // drop empty optional values so backend validation doesn't trip on ""
    const body = Object.fromEntries(
      Object.entries(payload).filter(([, v]) => (Array.isArray(v) ? v.length : v !== "" && v != null))
    );
    await privateRequest(E.onboarding, { method: "PUT", body });
    const user = await fetchMe();
    return { user, dashboardUrl: `/dashboard/${user?.role || payload.role}` };
  },

  async currentUser() {
    try {
      if (!accessToken) await refreshSession();
      return await fetchMe();
    } catch (err) {
      if (err.network) throw err;
      accessToken = null;
      return null;
    }
  },

  async logout() {
    try { await publicPost(E.logout); } catch { /* ignore */ }
    accessToken = null;
  },
};