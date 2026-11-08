
==============================
FILE: .\adrovis-web\src\App.css
==============================
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}


==============================
FILE: .\adrovis-web\src\App.jsx
==============================
import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App


==============================
FILE: .\adrovis-web\src\index.css
==============================
:root {
  --text: #6b6375;
  --text-h: #08060d;
  --bg: #fff;
  --border: #e5e4e7;
  --code-bg: #f4f3ec;
  --accent: #aa3bff;
  --accent-bg: rgba(170, 59, 255, 0.1);
  --accent-border: rgba(170, 59, 255, 0.5);
  --social-bg: rgba(244, 243, 236, 0.5);
  --shadow:
    rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;

  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
  --heading: system-ui, 'Segoe UI', Roboto, sans-serif;
  --mono: ui-monospace, Consolas, monospace;

  font: 18px/145% var(--sans);
  letter-spacing: 0.18px;
  color-scheme: light dark;
  color: var(--text);
  background: var(--bg);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --text: #9ca3af;
    --text-h: #f3f4f6;
    --bg: #16171d;
    --border: #2e303a;
    --code-bg: #1f2028;
    --accent: #c084fc;
    --accent-bg: rgba(192, 132, 252, 0.15);
    --accent-border: rgba(192, 132, 252, 0.5);
    --social-bg: rgba(47, 48, 58, 0.5);
    --shadow:
      rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px;
  }

  #social .button-icon {
    filter: invert(1) brightness(2);
  }
}

body {
  margin: 0;
}

#root {
  width: 1126px;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  border-inline: 1px solid var(--border);
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

h1,
h2 {
  font-family: var(--heading);
  font-weight: 500;
  color: var(--text-h);
}

h1 {
  font-size: 56px;
  letter-spacing: -1.68px;
  margin: 32px 0;
  @media (max-width: 1024px) {
    font-size: 36px;
    margin: 20px 0;
  }
}
h2 {
  font-size: 24px;
  line-height: 118%;
  letter-spacing: -0.24px;
  margin: 0 0 8px;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
}
p {
  margin: 0;
}

code,
.counter {
  font-family: var(--mono);
  display: inline-flex;
  border-radius: 4px;
  color: var(--text-h);
}

code {
  font-size: 15px;
  line-height: 135%;
  padding: 4px 8px;
  background: var(--code-bg);
}


==============================
FILE: .\adrovis-web\src\main.jsx
==============================
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


==============================
FILE: .\adrovis-web\.oxlintrc.json
==============================
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}


==============================
FILE: .\adrovis-web\index.html
==============================
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>adrovis-web</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>


==============================
FILE: .\adrovis-web\package.json
==============================
{
  "name": "adrovis-web",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.3.1",
    "react-dom": "^19.3.1"
  },
  "devDependencies": {
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.1.2",
    "oxlint": "^1.89.0",
    "vite": "^8.3.5"
  }
}


==============================
FILE: .\adrovis-web\vite.config.js
==============================
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


==============================
FILE: .\src\admin\AdminPage.jsx
==============================
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { LayoutDashboard, Building2, Braces, RefreshCw, Search, Copy, Check, Phone, Mail, Instagram, CircleCheck, CircleAlert } from 'lucide-react';
import { fetchHealth, fetchCampaigns, fetchAgencies, getBackendUrl } from '../services/api';

const samplePayload = {
  brand_name: 'Minimalist',
  campaign_title: 'Minimalist 8% Glycolic Acid Exfoliating Glow Campaign 2026',
  campaign_type: 'PAID',
  brand_instagram_url: 'https://www.instagram.com/beminimalist__',
  application_form_url: 'https://forms.gle/HWCd4DqUaEEB6ryr9',
  images: ['https://example.com/image-1.jpg'],
  compensation: {
    summary: '\u20B93,000 - \u20B98,000', product_value: '\u20B9899', product_provided: true,
    terms: 'Payment cleared within 15 business days',
    tiers: [
      { range: '5k to 10k', min_followers: 5000, max_followers: 10000, payout: 3000 },
      { range: '25k+', min_followers: 25000, max_followers: null, payout: 8000 },
    ],
  },
  deliverables: ['1 IG Reel', '1 IG Story'],
  ad_rights: '60 Days Digital Ad Rights',
  categories: ['Skincare', 'Beauty', 'Lifestyle'],
};

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'agencies', label: 'Agencies', icon: Building2 },
  { id: 'payload', label: 'Payload reference', icon: Braces },
];

export default function AdminPage() {
  const [tab, setTab] = useState('overview');
  const [health, setHealth] = useState(null);
  const [campaignTotal, setCampaignTotal] = useState(null);
  const [agencies, setAgencies] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = 'Admin | Adrovis';
    const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex,nofollow';
    document.head.appendChild(m);
    return () => { document.head.removeChild(m); document.title = 'Adrovis'; };
  }, []);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    const [h, c, a] = await Promise.allSettled([fetchHealth(), fetchCampaigns({ page: 0, size: 1 }), fetchAgencies()]);
    setHealth(h.status === 'fulfilled' ? { ok: true, ...h.value } : { ok: false, message: h.reason?.message });
    setCampaignTotal(c.status === 'fulfilled' ? c.value?.totalElements ?? 0 : null);
    if (a.status === 'fulfilled') setAgencies(a.value); else { setAgencies([]); setError(a.reason?.message); }
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    const t = q.toLowerCase();
    return (agencies || []).filter((a) => [a.agencyName, a.contactPhone, a.contactEmail, a.instagramHandle].some((v) => v && v.toLowerCase().includes(t)));
  }, [agencies, q]);

  const copy = () => { navigator.clipboard.writeText(JSON.stringify(samplePayload, null, 2)); setCopied(true); setTimeout(() => setCopied(false), 1800); };

  return (
    <div className="min-h-screen bg-[#f4f4f7] text-[#17122f] md:flex">
      <aside className="md:w-64 md:min-h-screen bg-[#150f33] text-white p-5 md:p-6 flex md:block items-center justify-between gap-4">
        <div>
          <p className="text-xl font-extrabold">Adrovis admin</p>
          <p className="hidden md:block text-sm text-white/50 mt-1">Internal tools</p>
        </div>
        <nav className="flex md:flex-col gap-1 md:mt-8" aria-label="Admin">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)} className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-left transition-colors ${tab === id ? 'bg-violet-600 text-white' : 'text-white/70 hover:bg-white/10'}`}>
              <Icon className="w-4 h-4" /><span className="hidden sm:inline md:inline">{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-5 md:p-10 max-w-6xl">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-extrabold">{tabs.find((t) => t.id === tab).label}</h1>
          <button onClick={load} className="btn btn-outline"><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />Refresh</button>
        </div>

        {tab === 'overview' && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="card p-5">
                <p className="text-sm text-[#5d5877]">API status</p>
                <p className="mt-2 flex items-center gap-2 text-xl font-extrabold">
                  {health === null ? 'Checking' : health.ok ? <><CircleCheck className="w-5 h-5 text-emerald-500" />Online</> : <><CircleAlert className="w-5 h-5 text-rose-500" />Unreachable</>}
                </p>
              </div>
              <div className="card p-5"><p className="text-sm text-[#5d5877]">Live campaigns</p><p className="mt-2 text-xl font-extrabold">{campaignTotal ?? '-'}</p></div>
              <div className="card p-5"><p className="text-sm text-[#5d5877]">Agencies in CRM</p><p className="mt-2 text-xl font-extrabold">{agencies ? agencies.length : '-'}</p></div>
            </div>
            <div className="card p-6">
              <h2 className="font-extrabold">Health check response</h2>
              <p className="text-sm text-[#5d5877] mt-1 break-all">{getBackendUrl()}/api/v1/health</p>
              <pre className="mt-4 p-4 rounded-xl bg-[#150f33] text-violet-100 text-sm overflow-x-auto">{JSON.stringify(health || { status: 'Checking' }, null, 2)}</pre>
            </div>
          </div>
        )}

        {tab === 'agencies' && (
          <div className="space-y-5">
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, phone, email or handle" className="input !pl-10" aria-label="Search agencies" />
            </div>
            {error && <div className="card p-4 text-sm text-rose-700 border-rose-200">Could not load agencies: {error}</div>}
            {agencies === null ? <div className="skeleton h-40" /> : filtered.length === 0 ? (
              <div className="card p-10 text-center"><p className="font-bold">No agencies found</p><p className="text-sm text-[#5d5877] mt-1">Agencies are added automatically when a campaign brief with verified contact details is ingested.</p></div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((a) => (
                  <div key={a.id} className="card p-5 flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-extrabold text-lg">{a.agencyName}</h3>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 whitespace-nowrap">{a.activeCampaignsCount || 0} active</span>
                    </div>
                    {a.notes && <p className="text-sm text-[#5d5877] line-clamp-3">{a.notes}</p>}
                    <div className="mt-auto pt-4 border-t border-[#e7e3f2] space-y-2 text-sm">
                      {a.contactPhone && <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-400" />{a.contactPhone}</p>}
                      {a.contactEmail && <p className="flex items-center gap-2 min-w-0"><Mail className="w-4 h-4 text-slate-400 shrink-0" /><span className="truncate">{a.contactEmail}</span></p>}
                      {a.instagramHandle && <p className="flex items-center gap-2"><Instagram className="w-4 h-4 text-slate-400" />@{a.instagramHandle}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'payload' && (
          <div className="card p-6">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm text-[#5d5877] max-w-xl">The JSON contract the ingestion bot sends to the Spring Boot service. The public site reads the stored result.</p>
              <button onClick={copy} className="btn btn-outline">{copied ? <><Check className="w-4 h-4" />Copied</> : <><Copy className="w-4 h-4" />Copy JSON</>}</button>
            </div>
            <pre className="mt-5 p-4 rounded-xl bg-[#150f33] text-violet-100 text-sm overflow-x-auto max-h-[520px]">{JSON.stringify(samplePayload, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
}


==============================
FILE: .\src\components\campaign\CampaignCard.jsx
==============================
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowUpRight } from 'lucide-react';
import SafeImg from './SafeImg';
import PaidBadge from './PaidBadge';
import { payoutLabel, followersLabel, initials } from '../../utils/format';

export default function CampaignCard({ campaign }) {
  return (
    <Link to={`/campaigns/${campaign.id}`} className="card group overflow-hidden flex flex-col hover:-translate-y-0.5 transition-transform">
      <div className="relative aspect-[4/3] bg-violet-50 overflow-hidden">
        <SafeImg src={campaign.images?.[0]} alt={campaign.brandName} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
        <div className="absolute top-3 left-3"><PaidBadge campaign={campaign} /></div>
      </div>
      <div className="p-5 flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-[#150f33] text-white text-xs font-extrabold grid place-items-center">{initials(campaign.brandName)}</span>
          <span className="font-bold text-sm">{campaign.brandName}</span>
        </div>
        <h3 className="font-extrabold text-lg leading-snug line-clamp-2">{campaign.campaignTitle}</h3>
        <div className="mt-auto flex items-end justify-between pt-4 border-t border-[#e7e3f2]">
          <div>
            <p className="text-xs text-[#5d5877] font-medium">Payout</p>
            <p className="text-lg font-extrabold text-violet-700">{payoutLabel(campaign)}</p>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-[#3d3856]"><Users className="w-4 h-4 text-violet-600" />{followersLabel(campaign)}</div>
          <ArrowUpRight className="w-5 h-5 text-violet-600" />
        </div>
      </div>
    </Link>
  );
}

export function CampaignCardSkeleton() {
  return <div className="card overflow-hidden"><div className="skeleton h-48 rounded-none" /><div className="p-5 space-y-3"><div className="skeleton h-5 w-1/3" /><div className="skeleton h-6" /><div className="skeleton h-10" /></div></div>;
}


==============================
FILE: .\src\components\campaign\CampaignRow.jsx
==============================
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, FileText, Wallet, Package, CalendarDays, Users, UserRound, MapPin } from 'lucide-react';
import SafeImg from './SafeImg';
import PaidBadge from './PaidBadge';
import { applyUrl } from '../../services/api';
import { comp, elig, sched, payoutLabel, followersLabel, genderLabel, formatDate, initials } from '../../utils/format';

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <span className="w-11 h-11 shrink-0 rounded-xl bg-violet-50 text-violet-600 grid place-items-center"><Icon className="w-5 h-5" /></span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-[#5d5877]">{label}</p>
        <p className="text-[15px] font-extrabold truncate">{value}</p>
      </div>
    </div>
  );
}

export default function CampaignRow({ campaign }) {
  const [i, setI] = useState(0);
  const images = campaign.images?.length ? campaign.images : [null];
  const c = comp(campaign), e = elig(campaign), s = sched(campaign);
  const notes = (campaign.importantRequirements?.length ? campaign.importantRequirements : campaign.deliverables || []).slice(0, 3);
  const locations = e.locations || [];
  const go = (d) => (ev) => { ev.preventDefault(); setI((p) => (p + d + images.length) % images.length); };
  const detail = `/campaigns/${campaign.id}`;

  return (
    <article className="card p-3 lg:p-4 grid gap-5 lg:grid-cols-[340px_1fr_330px]">
      {/* Gallery */}
      <div className="relative rounded-2xl overflow-hidden bg-violet-50 aspect-[4/3] lg:aspect-auto lg:min-h-[230px]">
        <Link to={detail} aria-label={`View ${campaign.campaignTitle}`}>
          <SafeImg src={images[i]} alt={campaign.brandName} className="absolute inset-0 w-full h-full object-cover" />
        </Link>
        {images.length > 1 && (
          <>
            <button onClick={go(-1)} aria-label="Previous image" className="absolute left-3 bottom-3 w-9 h-9 rounded-full bg-white/95 shadow grid place-items-center hover:bg-white"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={go(1)} aria-label="Next image" className="absolute right-3 bottom-3 w-9 h-9 rounded-full bg-white/95 shadow grid place-items-center hover:bg-white"><ChevronRight className="w-4 h-4" /></button>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.slice(0, 6).map((_, k) => (
                <span key={k} className={`h-1.5 rounded-full transition-all ${k === i ? 'w-4 bg-white' : 'w-1.5 bg-white/60'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Main info */}
      <div className="min-w-0 flex flex-col justify-between gap-4 lg:py-1">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#150f33] text-white text-sm font-extrabold grid place-items-center">{initials(campaign.brandName)}</span>
            <span className="font-bold text-[15px]">{campaign.brandName}</span>
          </div>
          <div className="mt-3 flex items-start justify-between gap-3">
            <h3 className="text-xl font-extrabold leading-snug">
              <Link to={detail} className="hover:text-violet-700 transition-colors">{campaign.campaignTitle}</Link>
            </h3>
            <PaidBadge campaign={campaign} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#e7e3f2]">
          <Stat icon={Wallet} label="Payout" value={payoutLabel(campaign)} />
          <Stat icon={Package} label="Product provided" value={c.product_provided ? 'Yes' : 'No'} />
          <Stat icon={CalendarDays} label="Go live date" value={formatDate(s.go_live_date) || 'To be announced'} />
        </div>

        <div className="grid sm:grid-cols-3 gap-4 rounded-2xl border border-[#e7e3f2] bg-[#faf9fe] p-4">
          <Stat icon={Users} label="Followers" value={followersLabel(campaign)} />
          <Stat icon={UserRound} label="Gender" value={genderLabel(campaign)} />
          <Stat icon={MapPin} label="Location" value={locations.length ? locations.slice(0, 3).join(', ') : 'Pan India'} />
        </div>
      </div>

      {/* Requirements + actions */}
      <div className="rounded-2xl bg-violet-50/70 p-4 flex flex-col justify-between gap-4">
        <div>
          <h4 className="flex items-center gap-2 font-extrabold text-[15px]"><FileText className="w-4 h-4 text-violet-600" />Key requirements</h4>
          {notes.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm text-[#3d3856] leading-snug">
              {notes.map((n, k) => (
                <li key={k} className="flex gap-2.5"><span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" /><span className="line-clamp-2">{n}</span></li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-[#5d5877]">Full brief is on the details page.</p>
          )}
        </div>
        <div className="flex gap-2">
          <Link to={detail} className="btn btn-outline flex-1">View details</Link>
          <a href={campaign.applyProxyUrl || applyUrl(campaign.id)} target="_blank" rel="noreferrer" className="btn btn-primary flex-1">
            Apply now <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function CampaignRowSkeleton() {
  return (
    <div className="card p-4 grid gap-5 lg:grid-cols-[340px_1fr_330px]">
      <div className="skeleton h-56" />
      <div className="space-y-4"><div className="skeleton h-6 w-1/3" /><div className="skeleton h-8 w-4/5" /><div className="skeleton h-16" /><div className="skeleton h-20" /></div>
      <div className="skeleton h-56" />
    </div>
  );
}


==============================
FILE: .\src\components\campaign\PaidBadge.jsx
==============================
import React from 'react';
import { Banknote, Package } from 'lucide-react';
import { isPaid } from '../../utils/format';

export default function PaidBadge({ campaign }) {
  const paid = isPaid(campaign);
  const Icon = paid ? Banknote : Package;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-bold ${paid ? 'bg-violet-600 text-white' : 'bg-amber-100 text-amber-900'}`}>
      <Icon className="w-3.5 h-3.5" />
      {paid ? 'Paid' : 'Barter'}
    </span>
  );
}


==============================
FILE: .\src\components\campaign\SafeImg.jsx
==============================
import React from 'react';
import { FALLBACK_IMG } from '../../utils/format';

export default function SafeImg({ src, alt = '', className = '' }) {
  return (
    <img
      src={src || FALLBACK_IMG}
      alt={alt}
      loading="lazy"
      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }}
      className={className}
    />
  );
}


==============================
FILE: .\src\components\layout\Footer.jsx
==============================
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const cols = [
  { title: 'Discover', items: [['Campaigns', '/campaigns'], ['Brands', '/brands'], ['How it works', '/how-it-works']] },
  { title: 'Creators', items: [['For creators', '/for-creators'], ['Paid collaborations', '/campaigns?type=PAID'], ['Barter campaigns', '/campaigns?type=BARTER']] },
];

export default function Footer() {
  return (
    <footer className="bg-[#150f33] text-white/70 mt-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4 max-w-xs">
          <Logo />
          <p className="text-sm leading-relaxed">
            Verified brand collaborations for Indian creators, with the payout, deliverables and deadlines laid out before you apply.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-white font-bold text-sm mb-4">{c.title}</h4>
            <ul className="space-y-2.5 text-sm">
              {c.items.map(([label, to]) => (
                <li key={label}><Link to={to} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="text-white font-bold text-sm mb-4">Contact</h4>
          <a href="mailto:contact@adrovis.com" className="text-sm hover:text-white transition-colors">contact@adrovis.com</a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 text-xs text-white/50">
          {new Date().getFullYear()} Adrovis Technologies. All rights reserved.
        </div>
      </div>
    </footer>
  );
}


==============================
FILE: .\src\components\layout\Logo.jsx
==============================
import React from 'react';

export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="lg" x1="4" y1="4" x2="28" y2="28">
            <stop stopColor="#a78bfa" />
            <stop offset="1" stopColor="#6d28d9" />
          </linearGradient>
        </defs>
        <path d="M16 3 4 28h6.2l1.9-4.4h7.8l1.9 4.4H28L16 3Zm0 9.8 2.6 6H13.4l2.6-6Z" fill="url(#lg)" />
      </svg>
      <span className="text-[22px] font-extrabold tracking-tight text-white">Adrovis</span>
    </span>
  );
}


==============================
FILE: .\src\components\layout\Navbar.jsx
==============================
import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/campaigns', label: 'Campaigns' },
  { to: '/brands', label: 'Brands' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/for-creators', label: 'For creators' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [q, setQ] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searching) inputRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && setSearching(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searching]);

  const submit = (e) => {
    e.preventDefault();
    navigate(q.trim() ? `/campaigns?brand=${encodeURIComponent(q.trim())}` : '/campaigns');
    setSearching(false);
    setQ('');
  };

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full text-[14px] font-semibold transition-colors ${
      isActive ? 'bg-violet-600 text-white shadow-[0_6px_18px_-8px_rgba(124,58,237,.9)]' : 'text-white/80 hover:text-white hover:bg-white/10'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all ${
        scrolled ? 'bg-[#150f33]/90 backdrop-blur-xl border-white/10' : 'bg-[#150f33] border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-[68px] flex items-center justify-between gap-6">
        <Link to="/" aria-label="Adrovis home"><Logo /></Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>{l.label}</NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearching(true)}
            className="w-10 h-10 rounded-full grid place-items-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Search campaigns"
          >
            <Search className="w-5 h-5" />
          </button>
          <Link to="/campaigns" className="hidden sm:inline-flex btn btn-primary !py-2.5">
            Explore campaigns <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 rounded-full grid place-items-center text-white hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[#150f33] px-5 py-4 space-y-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setOpen(false)} className={({ isActive }) =>
              `block px-4 py-3 rounded-xl text-[15px] font-semibold ${isActive ? 'bg-violet-600 text-white' : 'text-white/80 hover:bg-white/10'}`}>
              {l.label}
            </NavLink>
          ))}
        </div>
      )}

      {searching && (
        <div className="fixed inset-0 z-50 bg-[#0c0820]/70 backdrop-blur-sm" onClick={() => setSearching(false)}>
          <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="max-w-2xl mx-auto mt-24 px-5">
            <div className="bg-white rounded-3xl p-3 shadow-2xl flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400 ml-3" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search campaigns by brand name"
                className="flex-1 py-3 text-[16px] outline-none text-slate-900 placeholder-slate-400 bg-transparent"
              />
              <button type="submit" className="btn btn-primary">Search</button>
            </div>
            <p className="text-center text-white/60 text-sm mt-3">Press Escape to close</p>
          </form>
        </div>
      )}
    </header>
  );
}


==============================
FILE: .\src\components\layout\PageHero.jsx
==============================
import React from 'react';

export default function PageHero({ title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden bg-[#150f33] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(60%_90%_at_85%_0%,rgba(139,92,246,.55),transparent_60%),radial-gradient(40%_60%_at_0%_100%,rgba(79,70,229,.35),transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-14 lg:py-20">
        <h1 className="text-4xl lg:text-5xl font-extrabold leading-[1.08] max-w-2xl">{title}</h1>
        {subtitle && <p className="mt-4 text-lg text-white/75 max-w-xl leading-relaxed">{subtitle}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}


==============================
FILE: .\src\components\layout\PublicLayout.jsx
==============================
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}


==============================
FILE: .\src\pages\Brands.jsx
==============================
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/layout/PageHero';
import { fetchCampaigns } from '../services/api';
import { initials } from '../utils/format';

export default function Brands() {
  const [items, setItems] = useState(null);
  useEffect(() => { fetchCampaigns({ page: 0, size: 100 }).then((d) => setItems(d?.content || [])).catch(() => setItems([])); }, []);

  const brands = useMemo(() => {
    const map = new Map();
    (items || []).forEach((c) => {
      const b = map.get(c.brandName) || { name: c.brandName, count: 0, image: c.images?.[0] };
      b.count += 1; map.set(c.brandName, b);
    });
    return [...map.values()].sort((a, b) => b.count - a.count);
  }, [items]);

  return (
    <>
      <PageHero title="Brands hiring creators" subtitle="Every brand with an open campaign right now. Pick one to see all of its collaborations." />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 mt-12">
        {items === null && <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton h-36" />)}</div>}
        {items && brands.length === 0 && <p className="text-[#5d5877]">No brands have live campaigns yet.</p>}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {brands.map((b) => (
            <Link key={b.name} to={`/campaigns?brand=${encodeURIComponent(b.name)}`} className="card p-6 group hover:-translate-y-0.5 transition-transform">
              <div className="flex items-start justify-between">
                <span className="w-12 h-12 rounded-xl bg-[#150f33] text-white text-lg font-extrabold grid place-items-center">{initials(b.name)}</span>
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-violet-600 transition-colors" />
              </div>
              <h3 className="mt-5 font-extrabold text-lg">{b.name}</h3>
              <p className="text-sm text-[#5d5877] mt-1">{b.count} live {b.count === 1 ? 'campaign' : 'campaigns'}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}


==============================
FILE: .\src\pages\CampaignDetails.jsx
==============================
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ChevronRight, ExternalLink, Wallet, Package, Users, UserRound, MapPin, CheckCircle2, CalendarDays, ShieldAlert, Share2, Check, Eye, MousePointerClick, AlertCircle, ArrowLeft } from 'lucide-react';
import SafeImg from '../components/campaign/SafeImg';
import PaidBadge from '../components/campaign/PaidBadge';
import CampaignCard from '../components/campaign/CampaignCard';
import { fetchCampaign, fetchCampaigns, applyUrl } from '../services/api';
import { comp, elig, sched, payoutLabel, followersLabel, genderLabel, formatDate, money, compact, initials } from '../utils/format';

function Section({ title, children }) {
  return <section className="card p-6 lg:p-7"><h2 className="text-xl font-extrabold mb-4">{title}</h2>{children}</section>;
}

function Fact({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <span className="w-11 h-11 shrink-0 rounded-xl bg-violet-50 text-violet-600 grid place-items-center"><Icon className="w-5 h-5" /></span>
      <div className="min-w-0"><p className="text-xs font-medium text-[#5d5877]">{label}</p><p className="font-extrabold truncate">{value}</p></div>
    </div>
  );
}

export default function CampaignDetails() {
  const { id } = useParams();
  const [c, setC] = useState(null);
  const [err, setErr] = useState(null);
  const [active, setActive] = useState(0);
  const [related, setRelated] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    setC(null); setErr(null); setActive(0); setRelated([]);
    fetchCampaign(id)
      .then((d) => {
        if (!alive) return;
        setC(d);
        document.title = `${d.campaignTitle} | Adrovis`;
        const cat = d.categories?.[0];
        return fetchCampaigns({ category: cat, size: 4 }).then((p) => alive && setRelated((p?.content || []).filter((x) => x.id !== d.id).slice(0, 3)));
      })
      .catch((e) => alive && setErr(e.message));
    return () => { alive = false; document.title = 'Adrovis'; };
  }, [id]);

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: c.campaignTitle, url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    } catch { /* cancelled */ }
  };

  if (err) {
    return (
      <div className="max-w-xl mx-auto px-5 py-28 text-center">
        <span className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 grid place-items-center mx-auto"><AlertCircle className="w-7 h-7" /></span>
        <h1 className="mt-5 text-2xl font-extrabold">This campaign is not available</h1>
        <p className="mt-2 text-[#5d5877]">It may have expired or been removed. Browse the live campaigns instead.</p>
        <Link to="/campaigns" className="btn btn-primary mt-6"><ArrowLeft className="w-4 h-4" />Back to campaigns</Link>
      </div>
    );
  }

  if (!c) {
    return (
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10 grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-6"><div className="skeleton h-[420px]" /><div className="skeleton h-40" /><div className="skeleton h-56" /></div>
        <div className="skeleton h-80" />
      </div>
    );
  }

  const cp = comp(c), e = elig(c), s = sched(c);
  const images = c.images?.length ? c.images : [null];
  const tiers = cp.tiers || [];
  const apply = c.applyProxyUrl || applyUrl(c.id);
  const timeline = [
    ['Applications close', s.application_deadline],
    ['Draft submission', s.submission_deadline],
    ['Go live', s.go_live_date],
  ].filter(([, v]) => v);

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8">
      <nav className="flex items-center gap-1.5 text-sm text-[#5d5877]" aria-label="Breadcrumb">
        <Link to="/campaigns" className="hover:text-violet-700 font-medium">Campaigns</Link><ChevronRight className="w-4 h-4" />
        <span className="font-medium">{c.brandName}</span>
      </nav>

      <div className="mt-5 grid lg:grid-cols-[1fr_380px] gap-8 items-start">
        <div className="space-y-6 min-w-0">
          {/* Gallery */}
          <div className="card p-3">
            <div className="relative rounded-2xl overflow-hidden bg-violet-50 aspect-[16/10]">
              <SafeImg src={images[active]} alt={c.brandName} className="absolute inset-0 w-full h-full object-contain" />
            </div>
            {images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
                {images.map((img, k) => (
                  <button key={k} onClick={() => setActive(k)} aria-label={`Show image ${k + 1}`} className={`w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${k === active ? 'border-violet-600' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                    <SafeImg src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title block */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-[#150f33] text-white font-extrabold grid place-items-center">{initials(c.brandName)}</span>
              <span className="font-bold">{c.brandName}</span>
              <PaidBadge campaign={c} />
              {c.brandInstagramUrl && <a href={c.brandInstagramUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-violet-700 hover:underline inline-flex items-center gap-1">Brand Instagram<ExternalLink className="w-3.5 h-3.5" /></a>}
            </div>
            <h1 className="mt-4 text-3xl lg:text-4xl font-extrabold leading-tight">{c.campaignTitle}</h1>
            {c.productName && <p className="mt-2 text-[#5d5877]">Product: <span className="font-semibold text-[#17122f]">{c.productName}</span></p>}
            {c.categories?.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{c.categories.map((x) => <Link key={x} to={`/campaigns?category=${encodeURIComponent(x)}`} className="chip !py-1.5">{x}</Link>)}</div>}
          </div>

          <div className="card p-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Fact icon={Wallet} label="Payout" value={payoutLabel(c)} />
            <Fact icon={Package} label="Product provided" value={cp.product_provided ? (cp.product_value ? `Yes, worth ${cp.product_value}` : 'Yes') : 'No'} />
            <Fact icon={Users} label="Followers" value={followersLabel(c)} />
            <Fact icon={UserRound} label="Gender" value={genderLabel(c)} />
          </div>

          {tiers.length > 0 && (
            <Section title="Payout by follower count">
              <div className="overflow-x-auto -mx-2">
                <table className="w-full text-left text-[15px]">
                  <thead><tr className="text-sm text-[#5d5877] border-b border-[#e7e3f2]"><th className="px-2 py-3 font-semibold">Tier</th><th className="px-2 py-3 font-semibold">Followers</th><th className="px-2 py-3 font-semibold text-right">Fixed payout</th></tr></thead>
                  <tbody>
                    {tiers.map((t, k) => (
                      <tr key={k} className="border-b border-[#f0edf8] last:border-0">
                        <td className="px-2 py-3.5 font-bold">{t.range}</td>
                        <td className="px-2 py-3.5 text-[#3d3856]">{t.min_followers ? compact(t.min_followers) : '0'} to {t.max_followers ? compact(t.max_followers) : 'no upper limit'}</td>
                        <td className="px-2 py-3.5 text-right font-extrabold text-violet-700">{money(t.payout)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {cp.terms && <p className="mt-4 text-sm text-[#5d5877]">{cp.terms}</p>}
            </Section>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <Section title="What you need to deliver">
              {c.deliverables?.length ? (
                <ul className="space-y-3">{c.deliverables.map((d, k) => <li key={k} className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" /><span>{d}</span></li>)}</ul>
              ) : <p className="text-[#5d5877]">Deliverables will be shared once you apply.</p>}
              {c.adRights && <p className="mt-5 pt-4 border-t border-[#e7e3f2] text-sm"><span className="font-bold">Ad rights: </span>{c.adRights}</p>}
            </Section>
            <Section title="Who can apply">
              <dl className="space-y-3 text-[15px]">
                <div className="flex justify-between gap-4"><dt className="text-[#5d5877]">Followers</dt><dd className="font-bold text-right">{followersLabel(c)}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-[#5d5877]">Gender</dt><dd className="font-bold text-right">{genderLabel(c)}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-[#5d5877] flex items-center gap-1.5"><MapPin className="w-4 h-4" />Cities</dt><dd className="font-bold text-right">{e.locations?.length ? e.locations.join(', ') : 'Pan India'}</dd></div>
              </dl>
              {e.requirements?.length > 0 && <ul className="mt-5 pt-4 border-t border-[#e7e3f2] space-y-2 text-sm text-[#3d3856]">{e.requirements.map((r, k) => <li key={k} className="flex gap-2.5"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />{r}</li>)}</ul>}
            </Section>
          </div>

          {timeline.length > 0 && (
            <Section title="Timeline">
              <ol className="relative border-l-2 border-violet-100 ml-2 space-y-6">
                {timeline.map(([label, v], k) => (
                  <li key={k} className="pl-6 relative">
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-violet-600 ring-4 ring-white" />
                    <p className="text-sm text-[#5d5877]">{label}</p>
                    <p className="font-extrabold">{formatDate(v)}</p>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {c.importantRequirements?.length > 0 && (
            <section className="rounded-[22px] border border-amber-200 bg-amber-50 p-6 lg:p-7">
              <h2 className="text-xl font-extrabold flex items-center gap-2 text-amber-900"><ShieldAlert className="w-5 h-5" />Read before you apply</h2>
              <ul className="mt-4 space-y-2.5 text-amber-950/90">{c.importantRequirements.map((r, k) => <li key={k} className="flex gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />{r}</li>)}</ul>
            </section>
          )}

          {c.referenceLinks?.length > 0 && (
            <Section title="Reference links">
              <div className="flex flex-wrap gap-2">{c.referenceLinks.map((l, k) => <a key={k} href={l} target="_blank" rel="noreferrer" className="chip">Reference {k + 1}<ExternalLink className="w-3.5 h-3.5" /></a>)}</div>
            </Section>
          )}
        </div>

        {/* Sticky apply panel */}
        <aside className="lg:sticky lg:top-24 space-y-4">
          <div className="card p-6">
            <p className="text-sm font-medium text-[#5d5877]">Estimated payout</p>
            <p className="text-3xl font-extrabold text-violet-700 mt-1">{payoutLabel(c)}</p>
            {cp.product_value && <p className="mt-1 text-sm text-[#5d5877]">Plus a free product worth {cp.product_value}</p>}
            {cp.terms && <p className="mt-4 text-sm text-[#3d3856] leading-relaxed">{cp.terms}</p>}
            <a href={apply} target="_blank" rel="noreferrer" className="btn btn-primary w-full mt-6 !py-3.5 text-[15px]">Apply on official form<ArrowRight className="w-4 h-4" /></a>
            <button onClick={share} className="btn btn-outline w-full mt-3">{copied ? <><Check className="w-4 h-4" />Link copied</> : <><Share2 className="w-4 h-4" />Share this campaign</>}</button>
            <div className="mt-5 pt-4 border-t border-[#e7e3f2] grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-[#5d5877]"><Eye className="w-4 h-4" /><span><b className="text-[#17122f]">{compact(c.viewsCount || 0) || 0}</b> views</span></div>
              <div className="flex items-center gap-2 text-[#5d5877]"><MousePointerClick className="w-4 h-4" /><span><b className="text-[#17122f]">{compact(c.clicksCount || 0) || 0}</b> applications</span></div>
              {c.expiresAt && <div className="col-span-2 flex items-center gap-2 text-[#5d5877]"><CalendarDays className="w-4 h-4" />Listing expires {formatDate(c.expiresAt)}</div>}
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <div className="flex items-end justify-between mb-6"><h2 className="text-2xl font-extrabold">More campaigns like this</h2><Link to="/campaigns" className="text-sm font-bold text-violet-700 hover:underline">See all</Link></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{related.map((r) => <CampaignCard key={r.id} campaign={r} />)}</div>
        </section>
      )}
    </div>
  );
}


==============================
FILE: .\src\pages\Campaigns.jsx
==============================
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, LayoutGrid, Sparkles, Shirt, Leaf, MonitorSmartphone, UtensilsCrossed, Plane, Camera, ChevronLeft, ChevronRight, RefreshCw, AlertCircle, SearchX, X } from 'lucide-react';
import PageHero from '../components/layout/PageHero';
import CampaignRow, { CampaignRowSkeleton } from '../components/campaign/CampaignRow';
import { fetchCampaigns } from '../services/api';

const CATEGORIES = [
  { label: 'All campaigns', value: '', icon: LayoutGrid },
  { label: 'Beauty and skincare', value: 'Beauty', icon: Sparkles },
  { label: 'Fashion', value: 'Fashion', icon: Shirt },
  { label: 'Lifestyle', value: 'Lifestyle', icon: Leaf },
  { label: 'Tech', value: 'Tech', icon: MonitorSmartphone },
  { label: 'Food and beverage', value: 'Food', icon: UtensilsCrossed },
  { label: 'Travel', value: 'Travel', icon: Plane },
  { label: 'UGC', value: 'UGC', icon: Camera },
];
const SORTS = [
  { label: 'Newest first', value: 'createdAt:desc' },
  { label: 'Most viewed', value: 'viewsCount:desc' },
  { label: 'Closing soon', value: 'expiresAt:asc' },
];
const PAGE_SIZE = 8;

export default function Campaigns() {
  const [params, setParams] = useSearchParams();
  const get = (k, d = '') => params.get(k) || d;
  const page = Number(get('page', 0));
  const category = get('category');
  const type = get('type');
  const brand = get('brand');
  const maxFollowers = get('maxFollowers');
  const minPayout = get('minPayout');
  const sort = get('sort', 'createdAt:desc');

  const [q, setQ] = useState(brand);
  const [showFilters, setShowFilters] = useState(false);
  const [state, setState] = useState({ loading: true, error: null, items: [], pages: 1, total: 0 });
  const [nonce, setNonce] = useState(0);

  const update = (patch, keepPage = false) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => (v === '' || v == null ? next.delete(k) : next.set(k, v)));
    if (!keepPage) next.delete('page');
    setParams(next, { replace: true });
  };

  useEffect(() => { setQ(brand); }, [brand]);
  useEffect(() => {
    const t = setTimeout(() => { if (q !== brand) update({ brand: q.trim() }); }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [q]);

  useEffect(() => {
    let alive = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    const [sortBy, sortDirection] = sort.split(':');
    fetchCampaigns({
      page, size: PAGE_SIZE, brand, category, campaignType: type,
      maxFollowers, minPayout, sortBy, sortDirection,
    })
      .then((d) => alive && setState({ loading: false, error: null, items: d?.content || [], pages: d?.totalPages || 1, total: d?.totalElements || 0 }))
      .catch((err) => alive && setState((s) => ({ ...s, loading: false, error: err.message })));
    return () => { alive = false; };
  }, [page, category, type, brand, maxFollowers, minPayout, sort, nonce]);

  const activeCount = [type, maxFollowers, minPayout].filter(Boolean).length;
  const clearAll = () => { setQ(''); setParams({}, { replace: true }); };

  return (
    <>
      <PageHero
        title="Discover brand campaigns and collaborations"
        subtitle="Paid opportunities, barter collaborations and product campaigns from verified brands, all in one place."
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Category rail */}
        <div className="-mt-7 relative z-10 card !rounded-full p-2.5 flex gap-2 overflow-x-auto no-scrollbar" role="tablist" aria-label="Categories">
          {CATEGORIES.map(({ label, value, icon: Icon }) => (
            <button key={label} role="tab" aria-selected={category === value} data-active={category === value} onClick={() => update({ category: value })} className="chip">
              <Icon className="w-4 h-4" />{label}
            </button>
          ))}
        </div>

        {/* Title + search */}
        <div className="mt-10 flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div>
            <h2 className="text-3xl font-extrabold">Campaigns for creators</h2>
            <p className="text-[#5d5877] mt-1">
              {state.loading ? 'Loading campaigns' : `${state.total} live ${state.total === 1 ? 'campaign' : 'campaigns'}, each with transparent details.`}
            </p>
          </div>
          <div className="flex gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-[420px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by brand name" className="input !rounded-full !pl-11 !py-3" aria-label="Search by brand name" />
            </div>
            <button onClick={() => setShowFilters((v) => !v)} className="btn btn-outline" aria-expanded={showFilters}>
              <SlidersHorizontal className="w-4 h-4" />Filters
              {activeCount > 0 && <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-xs grid place-items-center">{activeCount}</span>}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="card mt-5 p-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block text-sm font-semibold">Campaign type
              <select className="input mt-2" value={type} onChange={(e) => update({ type: e.target.value })}>
                <option value="">All types</option><option value="PAID">Paid</option><option value="BARTER">Barter</option>
              </select>
            </label>
            <label className="block text-sm font-semibold">Follower range
              <select className="input mt-2" value={maxFollowers} onChange={(e) => update({ maxFollowers: e.target.value })}>
                <option value="">Any follower count</option><option value="5000">Up to 5k</option><option value="10000">Up to 10k</option><option value="25000">Up to 25k</option><option value="50000">Up to 50k</option>
              </select>
            </label>
            <label className="block text-sm font-semibold">Minimum payout
              <select className="input mt-2" value={minPayout} onChange={(e) => update({ minPayout: e.target.value })}>
                <option value="">Any payout</option><option value="1000">1,000 and above</option><option value="3000">3,000 and above</option><option value="5000">5,000 and above</option><option value="8000">8,000 and above</option>
              </select>
            </label>
            <label className="block text-sm font-semibold">Sort by
              <select className="input mt-2" value={sort} onChange={(e) => update({ sort: e.target.value })}>
                {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </label>
          </div>
        )}

        {(brand || category || activeCount > 0) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {brand && <button className="chip" onClick={() => update({ brand: '' })}>Brand: {brand}<X className="w-3.5 h-3.5" /></button>}
            {category && <button className="chip" onClick={() => update({ category: '' })}>Category: {category}<X className="w-3.5 h-3.5" /></button>}
            <button onClick={clearAll} className="text-sm font-semibold text-violet-700 hover:underline px-2">Clear all</button>
          </div>
        )}

        {/* List */}
        <div className="mt-6 space-y-5">
          {state.error && (
            <div className="card p-6 flex items-center justify-between gap-4 border-rose-200">
              <div className="flex items-center gap-3"><AlertCircle className="w-5 h-5 text-rose-500" /><div><p className="font-bold">We could not load campaigns</p><p className="text-sm text-[#5d5877]">{state.error}. Check your connection and try again.</p></div></div>
              <button className="btn btn-outline" onClick={() => setNonce((n) => n + 1)}><RefreshCw className="w-4 h-4" />Try again</button>
            </div>
          )}
          {state.loading && Array.from({ length: 3 }).map((_, i) => <CampaignRowSkeleton key={i} />)}
          {!state.loading && !state.error && state.items.length === 0 && (
            <div className="card py-20 text-center px-6">
              <span className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 grid place-items-center mx-auto"><SearchX className="w-7 h-7" /></span>
              <h3 className="mt-5 text-xl font-extrabold">No campaigns match these filters</h3>
              <p className="mt-2 text-[#5d5877] max-w-sm mx-auto">Widen the follower or payout range, or clear the search to see every live campaign.</p>
              <button onClick={clearAll} className="btn btn-primary mt-6">Clear all filters</button>
            </div>
          )}
          {!state.loading && state.items.map((c) => <CampaignRow key={c.id} campaign={c} />)}
        </div>

        {state.pages > 1 && (
          <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Pagination">
            <button disabled={page === 0} onClick={() => update({ page: page - 1 }, true)} className="btn btn-outline disabled:opacity-40"><ChevronLeft className="w-4 h-4" />Previous</button>
            <span className="text-sm font-semibold text-[#5d5877]">Page {page + 1} of {state.pages}</span>
            <button disabled={page >= state.pages - 1} onClick={() => update({ page: page + 1 }, true)} className="btn btn-outline disabled:opacity-40">Next<ChevronRight className="w-4 h-4" /></button>
          </nav>
        )}
      </div>
    </>
  );
}


==============================
FILE: .\src\pages\ForCreators.jsx
==============================
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import PageHero from '../components/layout/PageHero';

const faqs = [
  ['Do I need a minimum follower count?', 'It depends on the campaign. Each listing shows its follower requirement, and you can filter by follower range.'],
  ['Is there a fee to apply?', 'No. Applying is free and happens on the brand or agency form.'],
  ['When do I get paid?', 'Payment terms are stated on every paid campaign, for example payment within 15 business days of go live.'],
  ['What is barter?', 'Barter campaigns give you a product in exchange for content. There is no cash payout.'],
];
const perks = ['Payout and tiers shown before you apply', 'Filters for follower range, payout and category', 'Deliverables and ad rights spelled out', 'Direct application with the brand or agency'];

export default function ForCreators() {
  return (
    <>
      <PageHero title="Built for creators of every size" subtitle="From 5k followers to 500k, find collaborations that respect your time and your audience." />
      <div className="max-w-5xl mx-auto px-5 lg:px-8 mt-14 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-extrabold">What you get</h2>
          <ul className="mt-5 space-y-4">{perks.map((p) => <li key={p} className="flex gap-3"><span className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 grid place-items-center shrink-0"><Check className="w-3.5 h-3.5" /></span>{p}</li>)}</ul>
          <Link to="/campaigns" className="btn btn-primary mt-8">Find your campaign<ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold">Common questions</h2>
          <div className="mt-5 space-y-3">
            {faqs.map(([q, a]) => (
              <details key={q} className="card px-5 py-4 group">
                <summary className="font-bold cursor-pointer list-none flex justify-between gap-3">{q}<span className="text-violet-600 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
                <p className="mt-3 text-[#5d5877] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}


==============================
FILE: .\src\pages\Home.jsx
==============================
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, ShieldCheck, Wallet, FileText } from 'lucide-react';
import CampaignCard, { CampaignCardSkeleton } from '../components/campaign/CampaignCard';
import SafeImg from '../components/campaign/SafeImg';
import { fetchCampaigns } from '../services/api';
import { payoutLabel } from '../utils/format';

const steps = [
  { t: 'Browse verified campaigns', d: 'Every listing shows payout, deliverables, eligibility and dates up front.' },
  { t: 'Check that you qualify', d: 'Filter by follower count, location and minimum payout so you only see deals that fit.' },
  { t: 'Apply on the official form', d: 'You apply directly with the brand or agency. No middlemen, no sign-up wall.' },
];

export default function Home() {
  const [items, setItems] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCampaigns({ page: 0, size: 6 })
      .then((d) => { setItems(d?.content || []); setTotal(d?.totalElements || 0); })
      .catch(() => setItems([]));
  }, []);

  const featured = (items || []).slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden bg-[#150f33] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(55%_80%_at_80%_20%,rgba(139,92,246,.6),transparent_62%),radial-gradient(40%_60%_at_5%_100%,rgba(79,70,229,.35),transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-[1.1fr_.9fr] gap-14 items-center">
          <div>
            <h1 className="text-[40px] sm:text-5xl lg:text-[58px] font-extrabold leading-[1.05]">Brand deals with the payout in plain sight</h1>
            <p className="mt-6 text-lg text-white/75 max-w-lg leading-relaxed">
              Paid collaborations, barter deals and product campaigns from brands you know, with every requirement spelled out before you apply.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/campaigns" className="btn btn-primary !py-3.5 !px-7 text-[15px]">Explore campaigns<ArrowRight className="w-4 h-4" /></Link>
              <Link to="/how-it-works" className="btn btn-light !py-3.5 !px-7 text-[15px]"><Play className="w-4 h-4" />How it works</Link>
            </div>
            <p className="mt-8 text-sm text-white/60">{total > 0 ? `${total} campaigns live right now` : 'New campaigns are added every week'}</p>
          </div>

          {/* The memorable moment: real campaigns, stacked */}
          <div className="relative h-[360px] hidden lg:block" aria-hidden="true">
            {items === null && <div className="skeleton h-full opacity-20" />}
            {featured.map((c, k) => (
              <Link key={c.id} to={`/campaigns/${c.id}`} tabIndex={-1}
                className={`absolute w-[300px] rounded-3xl bg-white text-[#17122f] shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)] overflow-hidden transition-transform hover:-translate-y-1 ${k === 0 ? 'right-0 top-0 rotate-[3deg]' : 'left-0 bottom-0 -rotate-[4deg]'}`}>
                <div className="h-40 bg-violet-50"><SafeImg src={c.images?.[0]} alt="" className="w-full h-full object-cover" /></div>
                <div className="p-4">
                  <p className="text-xs font-semibold text-[#5d5877]">{c.brandName}</p>
                  <p className="font-extrabold leading-snug line-clamp-2 mt-0.5">{c.campaignTitle}</p>
                  <p className="mt-3 text-violet-700 font-extrabold">{payoutLabel(c)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 mt-20">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div><h2 className="text-3xl font-extrabold">Latest campaigns</h2><p className="text-[#5d5877] mt-1">Freshly verified and open for applications.</p></div>
          <Link to="/campaigns" className="btn btn-outline hidden sm:inline-flex">View all<ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items === null ? Array.from({ length: 3 }).map((_, i) => <CampaignCardSkeleton key={i} />) : items.slice(0, 3).map((c) => <CampaignCard key={c.id} campaign={c} />)}
        </div>
        {items && items.length === 0 && <p className="text-[#5d5877]">No campaigns are live at the moment. Check back soon.</p>}
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 mt-24 grid lg:grid-cols-[.8fr_1.2fr] gap-12">
        <div>
          <h2 className="text-3xl font-extrabold leading-tight">Three steps from scroll to apply</h2>
          <p className="mt-3 text-[#5d5877] max-w-sm">We keep the process short because your time is better spent creating.</p>
        </div>
        <ol className="space-y-4">
          {steps.map((s, i) => (
            <li key={s.t} className="card p-6 flex gap-5">
              <span className="w-10 h-10 shrink-0 rounded-full bg-violet-600 text-white font-extrabold grid place-items-center">{i + 1}</span>
              <div><h3 className="font-extrabold text-lg">{s.t}</h3><p className="mt-1 text-[#5d5877]">{s.d}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 mt-24 grid md:grid-cols-3 gap-6">
        {[
          [Wallet, 'Clear payouts', 'Fixed amounts and follower tiers are shown on every campaign.'],
          [FileText, 'Full briefs', 'Deliverables, ad rights and deadlines before you commit.'],
          [ShieldCheck, 'Verified listings', 'Campaigns come from brands and agencies we have checked.'],
        ].map(([Icon, t, d]) => (
          <div key={t} className="card p-7"><span className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 grid place-items-center"><Icon className="w-6 h-6" /></span><h3 className="mt-5 text-lg font-extrabold">{t}</h3><p className="mt-2 text-[#5d5877]">{d}</p></div>
        ))}
      </section>
    </>
  );
}


==============================
FILE: .\src\pages\HowItWorks.jsx
==============================
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/layout/PageHero';

const steps = [
  ['Find a campaign', 'Browse by category or search by brand. Filter by follower count and minimum payout to see only what fits your profile.'],
  ['Read the full brief', 'The details page lists the payout, follower tiers, deliverables, ad rights, eligibility and every deadline.'],
  ['Apply on the official form', 'Apply Now takes you to the brand or agency form. Your application goes straight to them.'],
  ['Create and get paid', 'Follow the brief, submit your draft by the deadline and go live on the date given. Payment terms are shown on each campaign.'],
];

export default function HowItWorks() {
  return (
    <>
      <PageHero title="How Adrovis works" subtitle="A simple path from finding a campaign to getting paid for it." />
      <div className="max-w-3xl mx-auto px-5 lg:px-8 mt-14">
        <ol className="space-y-5">
          {steps.map(([t, d], i) => (
            <li key={t} className="card p-7 flex gap-6">
              <span className="w-11 h-11 shrink-0 rounded-full bg-violet-600 text-white font-extrabold grid place-items-center">{i + 1}</span>
              <div><h2 className="text-xl font-extrabold">{t}</h2><p className="mt-2 text-[#5d5877] leading-relaxed">{d}</p></div>
            </li>
          ))}
        </ol>
        <div className="text-center mt-12"><Link to="/campaigns" className="btn btn-primary !py-3.5 !px-8">Browse campaigns<ArrowRight className="w-4 h-4" /></Link></div>
      </div>
    </>
  );
}


==============================
FILE: .\src\pages\NotFound.jsx
==============================
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-5 py-32 text-center">
      <h1 className="text-4xl font-extrabold">Page not found</h1>
      <p className="mt-3 text-[#5d5877]">The page you are looking for does not exist or has moved.</p>
      <Link to="/campaigns" className="btn btn-primary mt-8">Browse campaigns</Link>
    </div>
  );
}


==============================
FILE: .\src\services\api.js
==============================
const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '');
const API = `${BASE}/api/v1`;

export const getBackendUrl = () => BASE;
export const applyUrl = (id) => `${API}/campaigns/${id}/apply`;

async function request(path, params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.set(k, v);
  });
  const url = `${API}${path}${qs.toString() ? `?${qs}` : ''}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const body = await res.json();
  if (body && body.success === false) throw new Error(body.message || 'Request failed');
  return body;
}

export const fetchHealth = () => request('/health');
export const fetchCampaigns = async (filter) => (await request('/campaigns', filter)).data;
export const fetchCampaign = async (id) => (await request(`/campaigns/${id}`)).data;
export const fetchAgencies = async () => (await request('/agencies')).data || [];


==============================
FILE: .\src\utils\format.js
==============================
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


==============================
FILE: .\src\App.jsx
==============================
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import CampaignDetails from './pages/CampaignDetails';
import Brands from './pages/Brands';
import HowItWorks from './pages/HowItWorks';
import ForCreators from './pages/ForCreators';
import NotFound from './pages/NotFound';
import AdminPage from './admin/AdminPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Admin is fully separate: own layout, no public navbar */}
        <Route path="/admin" element={<AdminPage />} />

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:id" element={<CampaignDetails />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/for-creators" element={<ForCreators />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


==============================
FILE: .\src\index.css
==============================
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --ink: #17122f;
  --ink-soft: #5d5877;
  --line: #e7e3f2;
  --surface: #ffffff;
  --canvas: #f6f4fb;
  --night: #150f33;
  --violet: #6d28d9;
  --violet-deep: #4c1d95;
  --violet-tint: #f1ebfd;
}

html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--canvas);
  color: var(--ink);
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.005em;
}
h1, h2, h3, h4 { letter-spacing: -0.02em; }
:focus-visible { outline: 2px solid #8b5cf6; outline-offset: 2px; }

.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 11px 20px; border-radius: 999px; font-weight: 700; font-size: 14px;
  transition: transform .15s ease, background .2s ease, box-shadow .2s ease, border-color .2s ease;
  cursor: pointer; white-space: nowrap;
}
.btn:active { transform: scale(.98); }
.btn-primary {
  color: #fff; background: linear-gradient(180deg, #7c3aed 0%, #5b21b6 100%);
  box-shadow: 0 6px 18px -6px rgba(91, 33, 182, .65), inset 0 1px 0 rgba(255,255,255,.18);
}
.btn-primary:hover { background: linear-gradient(180deg, #8b5cf6 0%, #6d28d9 100%); }
.btn-outline { color: var(--ink); background: #fff; border: 1px solid var(--line); }
.btn-outline:hover { border-color: #c4b5fd; background: var(--violet-tint); }
.btn-light { color: #fff; border: 1px solid rgba(255,255,255,.35); background: rgba(255,255,255,.06); }
.btn-light:hover { background: rgba(255,255,255,.14); }

.card { background: var(--surface); border: 1px solid var(--line); border-radius: 22px; box-shadow: 0 1px 2px rgba(23,18,47,.04), 0 12px 32px -18px rgba(23,18,47,.18); }
.chip { display: inline-flex; align-items: center; gap: 8px; padding: 9px 16px; border-radius: 999px; font-size: 13px; font-weight: 600; background: #fff; border: 1px solid var(--line); color: var(--ink); transition: all .2s ease; cursor: pointer; white-space: nowrap; }
.chip:hover { border-color: #c4b5fd; }
.chip[data-active='true'] { background: linear-gradient(180deg, #6d28d9, #4c1d95); color: #fff; border-color: transparent; box-shadow: 0 8px 20px -10px rgba(76,29,149,.8); }
.input { width: 100%; padding: 11px 14px; border-radius: 14px; border: 1px solid var(--line); background: #fff; font-size: 14px; color: var(--ink); }
.input:focus { outline: none; border-color: #8b5cf6; box-shadow: 0 0 0 3px rgba(139,92,246,.18); }
.skeleton { background: linear-gradient(90deg, #eeeaf8 25%, #f7f5fc 50%, #eeeaf8 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: 14px; }
@keyframes shimmer { to { background-position: -200% 0; } }
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { scrollbar-width: none; }
@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; scroll-behavior: auto !important; } }


==============================
FILE: .\package.json
==============================
{
  "dependencies": {
    "framer-motion": "^11.18.2",
    "lucide-react": "^1.66.0",
    "react-router-dom": "^7.18.5"
  }
}


==============================
FILE: .\vercel.json
==============================
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }

