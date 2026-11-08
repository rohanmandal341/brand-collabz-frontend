import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, BadgeCheck, Wallet, ShieldCheck, Sliders, Clock, ChevronDown,
  Check, X, Calculator, FileText, Banknote, Send, Camera, ThumbsUp, Users, FileCheck2,
} from 'lucide-react';

/* SAMPLE data: swap for real numbers / creators (with permission) before launch */
const STATS = [
  ['₹4.2 Cr+', 'Paid to creators'],
  ['2,400+', 'Briefs posted'],
  ['0%', 'Cut from payouts'],
];

const LIVE_BRIEFS = [
  ['Skincare', 'Reel + 2 Stories', '₹18,000'],
  ['Headphones', '1 Reel', '₹25,000'],
  ['Activewear', '2 Reels', '₹12,000'],
  ['Travel app', 'YouTube integration', '₹40,000'],
  ['Protein snacks', 'Reel', 'Barter + ₹6,000'],
  ['Fintech', '3 Reels', '₹65,000'],
  ['Home decor', 'Reel + Story', '₹9,500'],
];

const BRIEF_TABS = [
  { id: 'money', label: 'Money', icon: Wallet, title: 'You see the fee before you apply', body: 'Fixed fee, barter value, or both. A brief that hides the number does not get listed.', rows: [['Fee', '₹25,000'], ['Payment', '7 days after go-live'], ['Method', 'Bank transfer']] },
  { id: 'work', label: 'Deliverables', icon: Camera, title: 'Exactly what you need to make', body: 'Format, length, revision rounds and what the brand wants in the first 3 seconds.', rows: [['Reel', '1 × 45–60s'], ['Stories', '2 frames + link'], ['Revisions', 'Up to 2 rounds']] },
  { id: 'rights', label: 'Usage rights', icon: ShieldCheck, title: 'Who can reuse your content, and for how long', body: 'Organic reposting and paid ads are priced differently. Every brief says which one it asks for.', rows: [['Organic reuse', '30 days'], ['Paid ads', 'Optional, extra fee'], ['Exclusivity', 'None']] },
  { id: 'time', label: 'Timeline', icon: Clock, title: 'Dates you can plan around', body: 'Ship date, draft deadline and go-live date. No "can you post tomorrow?" surprises.', rows: [['Apply by', '12 Dec'], ['Draft due', '20 Dec'], ['Go-live', '27 Dec']] },
];

const GOOD = ['Fee or barter value written in the brief', 'Clear usage rights and duration', 'Payment window stated up front', 'A real brand contact, not a middleman', 'Revision limit agreed before you start'];
const BAD = ['"Great exposure" instead of a number', 'Unlimited reposting and ads, no extra fee', 'Pay only if you hit a sales target', 'Payment "when the campaign wraps up"', 'Edits that keep going after approval'];

const JOURNEY = [
  [Send, 'Apply', 'Day 0', 'Pitch the brand with your profile, past work and idea. It goes straight to them.'],
  [ThumbsUp, 'Get shortlisted', 'Day 1–5', 'The brand reviews applicants and messages the ones they want.'],
  [Camera, 'Create', 'Day 5–15', 'Shoot to the brief and send a draft. Revisions stay within the agreed limit.'],
  [BadgeCheck, 'Publish', 'Go-live date', 'Post on the agreed date and share the live link with the brand.'],
  [Banknote, 'Get paid', '+7 to 15 days', 'The full fee reaches your bank account. Nothing deducted by us.'],
];

const STORIES = [
  { name: 'Pooja Verma', meta: 'Beauty · 68K on Instagram', amount: '₹32,000', quote: 'My DMs were full of free-product requests. Here every brief had a fee and a date, and I was paid in 10 days.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=85' },
  { name: 'Aman Singhania', meta: 'Tech · 142K on YouTube', amount: '₹75,000', quote: 'I knew the usage rights before I applied. That alone saved me three rounds of back-and-forth.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=85' },
  { name: 'Ritu Deshmukh', meta: 'Fitness · 34K on Instagram', amount: '₹22,000', quote: 'Under 50K followers and I still landed two paid activewear briefs in my first week.', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=85' },
];

const FAQS = [
  ['Do I need a minimum follower count?', 'There is no platform-wide minimum. Each brief sets its own threshold, and many start at 5,000 genuine followers. Filter by your range and you only see briefs you qualify for.'],
  ['Does it cost anything to apply?', 'No. Signing up, browsing briefs and applying are free. Brands pay to post; you never pay to pitch.'],
  ['When do I get paid?', 'Each brief states its payment window, usually 7 to 15 business days after your content goes live. The money goes to your bank account without deductions from us.'],
  ['What is barter versus paid?', 'Paid means a guaranteed fee once you deliver. Barter means products or experiences in exchange for content. Some briefs combine both, and the brief always says which.'],
  ['Can I apply to several briefs at once?', 'Yes. Just avoid taking two briefs from directly competing brands in the same window if either asks for exclusivity.'],
  ['Do I need a manager or agency?', 'No. The platform is built for independent creators. If you have a manager, they can review briefs and apply for you.'],
];

/* Brand icons were removed from newer lucide-react, so they are inline */
const Instagram = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const Youtube = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
  </svg>
);

const fmtINR = (n) => '₹' + (Math.round(n / 500) * 500).toLocaleString('en-IN');

function Estimator() {
  const [pos, setPos] = useState(45);
  const [platform, setPlatform] = useState('instagram');
  const [engagement, setEngagement] = useState('avg');
  const followers = Math.round((5000 * Math.pow(200, pos / 100)) / 500) * 500;
  const est = useMemo(() => {
    const k = followers / 1000;
    const scale = followers > 100000 ? Math.pow(100000 / followers, 0.15) : 1;
    const m = (platform === 'youtube' ? 1.4 : 1) * { low: 0.7, avg: 1, high: 1.35 }[engagement] * scale;
    return { low: k * 350 * m, high: k * 650 * m };
  }, [followers, platform, engagement]);
  const label = followers >= 1e6 ? '1M+' : (followers / 1000).toFixed(followers % 1000 ? 1 : 0) + 'K';
  const pill = (on) => `rounded-full px-4 py-2 text-xs font-bold transition ${on ? 'bg-white text-slate-950' : 'border border-white/15 text-slate-300 hover:bg-white/10'}`;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
      <div className="space-y-8">
        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <label htmlFor="fol" className="text-sm text-slate-300">Your followers</label>
            <span className="font-['Manrope'] text-4xl font-extrabold tracking-tight">{label}</span>
          </div>
          <input id="fol" type="range" min="0" max="100" value={pos} onChange={(e) => setPos(+e.target.value)} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-blue-500" />
          <div className="mt-2 flex justify-between text-[11px] text-slate-500"><span>5K</span><span>50K</span><span>200K</span><span>1M</span></div>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-5">
          <div>
            <p className="mb-2 text-xs text-slate-400">Main platform</p>
            <div className="flex gap-2">
              <button onClick={() => setPlatform('instagram')} className={pill(platform === 'instagram')}><Instagram className="mr-1.5 -mt-0.5 inline h-3.5 w-3.5" />Instagram</button>
              <button onClick={() => setPlatform('youtube')} className={pill(platform === 'youtube')}><Youtube className="mr-1.5 -mt-0.5 inline h-3.5 w-3.5" />YouTube</button>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs text-slate-400">Engagement on recent posts</p>
            <div className="flex gap-2">
              {[['low', 'Under 2%'], ['avg', '2–5%'], ['high', 'Over 5%']].map(([k, l]) => (
                <button key={k} onClick={() => setEngagement(k)} className={pill(engagement === k)}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[1.6rem] bg-white p-7 text-slate-900 shadow-2xl shadow-black/30">
        <p className="text-xs font-semibold text-slate-400">A typical paid {platform === 'youtube' ? 'video' : 'Reel'} could pay</p>
        <p className="mt-2 font-['Manrope'] text-4xl font-extrabold leading-none tracking-[-.04em] text-slate-950 sm:text-[2.6rem]">
          {fmtINR(est.low)}<span className="mx-1 text-slate-300">–</span>{fmtINR(est.high)}
        </p>
        <p className="mt-4 text-xs leading-6 text-slate-500">Based on typical fixed-fee briefs in your range. Real fees depend on niche, usage rights and the brand, so use this as a starting point for your rate card.</p>
        <Link to="/campaigns" className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700">
          See briefs in this range <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default function ForCreators() {
  const [tab, setTab] = useState('money');
  const [openFaq, setOpenFaq] = useState(0);
  const active = BRIEF_TABS.find((t) => t.id === tab);

  return (
    <div className="ih-page bg-[#fafbfc] text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
        .ih-page{font-family:'DM Sans',sans-serif;background:#fafbfc;color:#0f172a}
        .ih-page h1,.ih-page h2,.ih-page h3,.ih-page .font-display{font-family:'Manrope','DM Sans',sans-serif}
        .ih-page img{display:block}
        .ih-page .ih-image{transition:transform .7s cubic-bezier(.2,.7,.2,1)}
        .ih-page a:focus-visible,.ih-page button:focus-visible,.ih-page input:focus-visible{outline:3px solid #2563eb;outline-offset:3px}
        .ih-page .ih-kicker{letter-spacing:.16em;text-transform:uppercase}
        @keyframes ih-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .ih-page .ih-marquee{animation:ih-marquee 45s linear infinite}
        .ih-page .ih-marquee:hover{animation-play-state:paused}
        @media(prefers-reduced-motion:reduce){.ih-page *{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
      `}</style>

      {/* ============ 1. HERO ============ */}
      <section className="relative isolate overflow-hidden border-b border-slate-200/70 bg-white">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[60rem] -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 lg:pb-20 lg:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[.17em] text-blue-700 shadow-2xs">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-40" /><span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" /></span>
              Free for creators
            </div>
            <h1 className="mt-7 text-[2.5rem] font-extrabold leading-[1.06] tracking-[-.05em] text-slate-950 sm:text-6xl lg:text-[4.2rem]">
              <span className="block sm:whitespace-nowrap">Brands post the price.</span>
              <span className="block text-blue-600 sm:whitespace-nowrap">You pick the brief.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base font-normal leading-8 text-slate-600 sm:text-lg">
              Every brief shows the fee, deliverables, usage rights and payment date before you apply. No DM haggling, no “exposure” deals, no cut taken from your payout.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/campaigns" className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-sm shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
                Browse open briefs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/signup?role=creator" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-4 text-sm font-bold text-slate-800 shadow-2xs transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50">
                Create creator profile
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-slate-600">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-blue-600" /> Usage rights spelled out</span>
              <span className="inline-flex items-center gap-2"><Wallet className="h-4 w-4 text-blue-600" /> Fee shown upfront</span>
              <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-blue-600" /> Direct to the brand</span>
            </div>
          </div>

          {/* Fan of brief cards */}
          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {[
              ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=85', 'Skincare', '1 Reel + 2 Stories', '₹18,000', 'lg:-rotate-3 lg:translate-y-4'],
              ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85', 'Audio launch', '1 Reel · usage 30 days', '₹25,000', 'lg:rotate-2 lg:-translate-y-2'],
              ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85', 'Footwear', '2 Reels · paid ads optional', '₹12,000', 'lg:-rotate-2 lg:translate-y-2'],
              ['https://tse4.mm.bing.net/th/id/OIP.zLO0bD_9sO6BocbKNidIRAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', 'Food delivery', 'Reel + Story', '₹10,000', 'lg:rotate-3 lg:-translate-y-1'],
            ].map(([img, cat, fmt, fee, tilt]) => (
              <Link to="/campaigns" key={cat} className={`group overflow-hidden rounded-[1.6rem] border border-slate-200/90 bg-white shadow-[0_16px_40px_rgba(15,23,42,.07)] transition duration-300 hover:z-10 hover:!rotate-0 hover:!-translate-y-2 hover:shadow-xl ${tilt}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img src={img} alt={`${cat} brief`} className="ih-image h-full w-full object-cover group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full border border-slate-200/80 bg-white/95 px-2.5 py-1 text-[10px] font-bold text-slate-800 shadow-2xs">{cat}</span>
                </div>
                <div className="p-4">
                  <p className="text-[11px] text-slate-500">{fmt}</p>
                  <div className="mt-2 flex items-end justify-between">
                    <div><p className="text-[9px] text-slate-400">Fee shown upfront</p><p className="font-['Manrope'] text-xl font-extrabold leading-none text-slate-950">{fee}</p></div>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-900 text-white transition group-hover:bg-blue-600"><ArrowUpRight className="h-4 w-4" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>


      {/* ============ 3. RATE CHECK ============ */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-900 bg-slate-950 p-7 text-white shadow-xl sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -right-20 -top-32 h-[28rem] w-[28rem] rounded-full border border-blue-500/10" />
          <div className="pointer-events-none absolute -right-4 -top-16 h-[20rem] w-[20rem] rounded-full border border-blue-500/10" />
          <div className="relative mb-12 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-blue-400"><Calculator className="h-3.5 w-3.5" /> Rate check</span>
            <h2 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-[-.05em] sm:text-5xl">What should one post cost?</h2>
            <p className="mt-4 max-w-lg text-sm font-normal leading-7 text-slate-300">Slide to your follower count and get a realistic range before you quote anyone.</p>
          </div>
          <div className="relative"><Estimator /></div>
        </div>
      </section>

      {/* ============ 4. PERKS BENTO ============ */}
      <section className="border-y border-slate-200/70 bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <span className="ih-kicker text-[10px] font-bold text-blue-600">Why creators stay</span>
              <h2 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-[-.05em] text-slate-950 sm:text-5xl">Less chasing.<br /><span className="text-blue-600">More creating.</span></h2>
            </div>
            <p className="max-w-xl text-sm font-normal leading-7 text-slate-600 lg:justify-self-end">A collaboration should not need five follow-ups to learn the fee. The important details sit in the brief, so you can decide in minutes.</p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-12">
            <article className="group relative min-h-[320px] overflow-hidden rounded-[1.8rem] border border-slate-900 bg-slate-950 text-white md:col-span-7">
              <img src="https://tse1.mm.bing.net/th/id/OIP.nbKLgJ5kuMEyhHxHxtVhCgHaE8?r=0&w=1400&h=934&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Creator preparing a content shoot" className="ih-image absolute inset-0 h-full w-full object-cover opacity-80 group-hover:scale-[1.035]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/10" />
              <div className="relative flex h-full min-h-[320px] flex-col justify-end p-7 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-blue-300">Your content, your rights</p>
                <h3 className="mt-3 max-w-md text-3xl font-extrabold leading-tight tracking-[-.04em]">You decide how long a brand can reuse your work.</h3>
                <p className="mt-3 max-w-md text-sm font-normal leading-7 text-slate-300">Organic reposting, paid ads and exclusivity are listed separately, with their own fees.</p>
              </div>
            </article>

            <article className="rounded-[1.8rem] border border-slate-200/90 bg-slate-50 p-7 shadow-xs sm:p-9 md:col-span-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600"><Wallet className="h-5 w-5" /></span>
              <h3 className="mt-7 text-2xl font-extrabold tracking-[-.035em] text-slate-950">We never take a cut.</h3>
              <p className="mt-3 text-sm font-normal leading-6 text-slate-600">Brands pay to post. The fee in the brief is the fee that reaches your account.</p>
              <div className="mt-6 flex items-end justify-between rounded-2xl border border-slate-200 bg-white p-4">
                <div><p className="text-[10px] text-slate-400">Brief fee</p><p className="font-['Manrope'] text-xl font-extrabold text-slate-950">₹25,000</p></div>
                <ArrowRight className="mb-1.5 h-4 w-4 text-slate-300" />
                <div className="text-right"><p className="text-[10px] text-slate-400">You receive</p><p className="font-['Manrope'] text-xl font-extrabold text-blue-600">₹25,000</p></div>
              </div>
            </article>

            {[
              [Sliders, 'Briefs that fit you', 'Filter by follower range, niche, platform and minimum payout.'],
              [Send, 'Straight to the brand', 'Your application goes to the person who makes the decision.'],
              [FileCheck2, 'Clear briefs', 'Format, dates and rights are known before you commit.'],
            ].map(([Icon, t, d]) => (
              <article key={t} className="rounded-[1.8rem] border border-slate-200/90 bg-white p-7 shadow-xs transition-colors hover:border-slate-300 sm:p-8 md:col-span-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-6 text-xl font-extrabold text-slate-950">{t}</h3>
                <p className="mt-2 text-sm font-normal leading-6 text-slate-600">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. ANATOMY OF A BRIEF ============ */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className="ih-kicker text-[10px] font-bold text-blue-600">Anatomy of a brief</span>
            <h2 className="mt-4 max-w-lg text-4xl font-extrabold leading-[1.08] tracking-[-.05em] text-slate-950 sm:text-5xl">What a good brief looks like.</h2>
            <p className="mt-4 max-w-md text-sm font-normal leading-7 text-slate-600">Four things decide whether a collab is worth your time. Every brief here answers all four.</p>
            <div role="tablist" className="mt-8 space-y-2.5">
              {BRIEF_TABS.map((t) => {
                const Icon = t.icon;
                const on = t.id === tab;
                return (
                  <button key={t.id} role="tab" aria-selected={on} onClick={() => setTab(t.id)} className={`flex w-full gap-4 rounded-2xl border p-4 text-left transition ${on ? 'border-slate-900 bg-white shadow-sm' : 'border-slate-200 bg-white/60 hover:border-slate-300'}`}>
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${on ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}><Icon className="h-5 w-5" /></span>
                    <span>
                      <span className="block text-sm font-extrabold text-slate-950">{t.label}</span>
                      {on && <span className="mt-1 block text-xs font-normal leading-6 text-slate-600">{t.body}</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 sm:p-8">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white"><FileText className="h-5 w-5" /></span>
                  <div><p className="font-['Manrope'] text-sm font-extrabold text-slate-950">Headphone launch</p><p className="text-xs text-slate-500">Instagram · Paid collab</p></div>
                </div>
                <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-700">Open</span>
              </div>
              <h3 className="mt-5 font-['Manrope'] text-xl font-extrabold tracking-[-.03em] text-slate-950">{active.title}</h3>
              <dl className="mt-3 divide-y divide-slate-100">
                {active.rows.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-3 text-sm"><dt className="text-slate-500">{k}</dt><dd className="text-right font-bold text-slate-950">{v}</dd></div>
                ))}
              </dl>
              <Link to="/campaigns" className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white shadow-xs transition hover:-translate-y-0.5 hover:bg-slate-800">Apply directly <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6. GOOD VS BAD DEALS ============ */}
      <section className="border-y border-slate-200/80 bg-slate-50/70 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="ih-kicker text-[10px] font-bold text-blue-600">Deal checklist</span>
            <h2 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-[-.05em] text-slate-950 sm:text-5xl">Spot a bad deal in ten seconds.</h2>
            <p className="mt-4 text-sm font-normal leading-7 text-slate-600">Use this on any collab offer, including ones that do not come from us.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.8rem] border border-slate-200/90 bg-white p-7 shadow-xs sm:p-9">
              <h3 className="text-2xl font-extrabold tracking-[-.035em] text-slate-950">What every brief here has</h3>
              <ul className="mt-6 space-y-4">
                {GOOD.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-slate-700"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white"><Check className="h-3 w-3" /></span>{f}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.8rem] border border-slate-900 bg-slate-950 p-7 text-white shadow-sm sm:p-9">
              <h3 className="text-2xl font-extrabold tracking-[-.035em]">What we keep off the board</h3>
              <ul className="mt-6 space-y-4">
                {BAD.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-slate-300"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-slate-300"><X className="h-3 w-3" /></span>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7. JOURNEY ============ */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <span className="ih-kicker text-[10px] font-bold text-blue-600">How it works</span>
          <h2 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-[-.05em] text-slate-950 sm:text-5xl">From first click to <span className="text-blue-600">money in your account.</span></h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-5">
            {JOURNEY.map(([Icon, t, time, d], i) => (
              <li key={t} className="rounded-[1.6rem] border border-slate-200/90 bg-[#fafbfc] p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Icon className="h-5 w-5" /></span>
                  <span className="font-['Manrope'] text-sm font-bold text-slate-300">0{i + 1}</span>
                </div>
                <p className="mt-5 text-[11px] font-bold text-blue-600">{time}</p>
                <h3 className="mt-1 text-base font-extrabold text-slate-950">{t}</h3>
                <p className="mt-2 text-xs font-normal leading-6 text-slate-600">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ 8. STORIES ============ */}
      <section className="border-y border-slate-200/80 bg-slate-50/80 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <span className="ih-kicker text-[10px] font-bold text-blue-600">Community voices</span>
          <h2 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-[-.05em] text-slate-950 sm:text-5xl">Creators who got paid, in their words.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {STORIES.map((s) => (
              <figure key={s.name} className="flex flex-col rounded-[1.8rem] border border-slate-200/90 bg-white p-7 shadow-xs">
                <p className="font-['Manrope'] text-3xl font-extrabold tracking-[-.04em] text-slate-950">{s.amount}</p>
                <p className="text-xs text-slate-500">from one collab</p>
                <blockquote className="mt-5 flex-1 text-sm font-normal leading-7 text-slate-700">“{s.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <img src={s.img} alt={s.name} className="h-11 w-11 rounded-full border border-slate-200 bg-slate-100 object-cover" />
                  <span><span className="block text-sm font-extrabold text-slate-900">{s.name}</span><span className="block text-xs text-slate-500">{s.meta}</span></span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 9. FAQ ============ */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <span className="ih-kicker text-[10px] font-bold text-blue-600">Got questions?</span>
            <h2 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-[-.05em] text-slate-950 sm:text-5xl">Questions creators ask first.</h2>
          </div>
          <p className="max-w-sm text-sm font-normal leading-7 text-slate-600">Still unsure about something? Open a brief and read it end to end. If a detail is missing, the brand has to add it.</p>
        </div>
        <div className="grid items-start gap-3 md:grid-cols-2 md:gap-4">
          {[0, 1].map((col) => (
            <div key={col} className="space-y-3 md:space-y-4">
              {FAQS.map(([q, a], i) => {
                if (i % 2 !== col) return null;
                const open = openFaq === i;
                return (
                  <div key={q} className={`overflow-hidden rounded-2xl border bg-white transition-colors ${open ? 'border-slate-900' : 'border-slate-200/90'}`}>
                    <button onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-bold text-slate-900">
                      {q}
                      <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                    </button>
                    {open && <p className="-mt-1 px-5 pb-5 text-sm font-normal leading-7 text-slate-600">{a}</p>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* ============ 10. FINAL CTA ============ */}
      <section className="bg-white pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-900 bg-slate-950 px-7 py-16 text-center text-white shadow-xl sm:py-20">
            <div className="pointer-events-none absolute -right-20 -top-32 h-[28rem] w-[28rem] rounded-full border border-blue-500/10" />
            <div className="pointer-events-none absolute -left-20 -bottom-32 h-[24rem] w-[24rem] rounded-full border border-blue-500/10" />
            <h2 className="relative mx-auto max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-[-.05em] sm:text-5xl">Your next paid collab is already posted.</h2>
            <p className="relative mx-auto mt-5 max-w-lg text-sm font-normal leading-7 text-slate-300">Set up your profile in a few minutes and start applying to briefs with the fee in plain sight.</p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/signup?role=creator" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-500">Create creator profile <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/campaigns" className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900">Browse open briefs</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}