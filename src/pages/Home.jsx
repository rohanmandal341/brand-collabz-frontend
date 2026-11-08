import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Building2, Users, Megaphone,
  Heart, ShieldCheck, Wallet, Compass, FileCheck2,
  Video, BarChart2, Mail, Briefcase,
  Check, AlertCircle, Send, Clock, Sparkles
} from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';
// Prefetch helpers: load campaigns in the background while user is on Home
import { loadCampaigns, DEFAULT_PARAMS } from '../services/campaignCache';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://adrovis-influencer-backend.onrender.com';

const CATEGORIES = ['All Campaigns', 'Beauty', 'Fashion', 'Food & Beverage', 'Lifestyle', 'Tech'];

const HARDCODED_CAMPAIGNS = [
  {
    id: 'mamaearth-1',
    brandName: 'mamaearth',
    brandColor: 'text-[#128848]',
    badge: '★ Featured',
    badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    campaignTitle: 'New Sunscreen Campaign',
    category: 'Beauty',
    tags: ['Instagram Reel', 'Pan India'],
    payout: '₹20,000',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=90',
  },
  {
    id: 'puma-2',
    brandName: 'PUMA',
    brandColor: 'text-black',
    badge: '🔥 Trending',
    badgeStyle: 'bg-white text-slate-800 border-slate-200/90',
    campaignTitle: 'Fall Collection Promo',
    category: 'Fashion',
    tags: ['Instagram + YouTube', 'Activewear'],
    payout: '₹25,000',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=90',
  },
  {
    id: 'swiggy-3',
    brandName: 'Swiggy',
    brandColor: 'text-[#FC8019]',
    badge: 'Verified',
    badgeStyle: 'bg-white text-slate-800 border-slate-200/90',
    campaignTitle: 'Food Delivery Creator Campaign',
    category: 'Food & Beverage',
    tags: ['Instagram Reel', 'Metro Cities'],
    payout: '₹10,000',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=90',
  },
  {
    id: 'boat-4',
    brandName: 'boAt',
    brandColor: 'text-[#DF2628]',
    badge: 'Verified',
    badgeStyle: 'bg-white text-slate-800 border-slate-200/90',
    campaignTitle: 'New Audio Series Launch',
    category: 'Tech',
    tags: ['Instagram + YouTube', 'Pan India'],
    payout: '₹18,000',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=90',
  }
];

const MARQUEE_BRANDS = [
  { name: 'PUMA', color: 'text-[#111111]', style: 'font-black tracking-tighter text-xl' },
  { name: 'mamaearth', color: 'text-[#128848]', style: 'font-black tracking-tight text-lg' },
  { name: 'boAt', color: 'text-[#DF2628]', style: 'font-black tracking-wider text-xl' },
  { name: 'NYKAA', color: 'text-[#FC2779]', style: 'font-extrabold italic tracking-tight text-xl' },
  { name: 'Swiggy', color: 'text-[#FC8019]', style: 'font-black tracking-tight text-lg' },
  { name: 'zomato', color: 'text-[#E23744]', style: 'font-black italic tracking-tighter text-xl' },
  { name: "L'ORÉAL", color: 'text-[#A37A3E]', style: 'font-serif tracking-widest text-sm font-bold' },
  { name: 'Myntra', color: 'text-[#FF3F6C]', style: 'font-black tracking-tight text-lg' },
  { name: 'SUGAR', color: 'text-[#1C1C1C]', style: 'font-black tracking-widest text-base' },
  { name: 'zepto', color: 'text-[#7B1FA2]', style: 'font-black lowercase tracking-tight text-xl' },
  { name: 'amazon', color: 'text-[#FF9900]', style: 'font-black tracking-tight text-lg' },
];

const INQUIRY_TABS = [
  { id: 'CREATOR', label: 'Creator', icon: Users },
  { id: 'BRAND', label: 'Brand', icon: Building2 },
  { id: 'AGENCY', label: 'Agency', icon: Briefcase },
];

const INQUIRY_COPY = {
  CREATOR: {
    kicker: 'Creators',
    title: 'Get matched with brand briefs.',
    sub: 'Tell us your niche and handles. We’ll send campaigns that fit.',
  },
  BRAND: {
    kicker: 'Brands',
    title: 'Launch your next creator campaign.',
    sub: 'Share your goal and budget. We’ll shortlist the right creators.',
  },
  AGENCY: {
    kicker: 'Agencies',
    title: 'Onboard your client roster.',
    sub: 'Run multiple brands from one workspace with a dedicated manager.',
  },
};

const inputCls =
  'h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-[13px] text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 font-normal';

export default function Home() {
   // 1. Update the hook call near the top of the Home component:
  const { captureLead, getSessionId, trackApplyConversion } = useAnalytics();

  const [activeCategory, setActiveCategory] = useState('All Campaigns');
  const [favorites, setFavorites] = useState(new Set());

  const [inquiryRole, setInquiryRole] = useState('CREATOR');
  const [inquiryForm, setInquiryForm] = useState({
    name: '', email: '', phone: '', companyName: '', budget: '', message: '',
  });
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState(null);
  const [inquiryErrorMsg, setInquiryErrorMsg] = useState('');

  const inquiryRef = useRef(null);
  const [inquiryVisible, setInquiryVisible] = useState(false);

  useEffect(() => {
    const el = inquiryRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setInquiryVisible(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // PREFETCH: quietly load the first 12 campaigns while the user reads Home.
  // When they click "Explore campaigns", the data is already cached.
  useEffect(() => {
    // Errors are ignored on purpose: this is only a speed-up, not required.
    const run = () => loadCampaigns(DEFAULT_PARAMS).catch(() => {});

    // requestIdleCallback = "run when the browser is idle", so it never
    // slows down Home's own rendering. Safari lacks it, so we fall back.
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(run, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(run, 800);
    return () => clearTimeout(t);
  }, []);

  const toggleFavorite = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };



  // 2. Replace the handleInquirySubmit function with this:
  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setInquiryLoading(true);
    setInquiryStatus(null);
    setInquiryErrorMsg('');

    try {
      const activeSessionId = getSessionId();

      const payload = {
        name: inquiryForm.name.trim(),
        email: inquiryForm.email.trim(),
        phone: inquiryForm.phone.trim() || null,
        role: inquiryRole,
        companyName: inquiryRole === 'CREATOR' ? null : (inquiryForm.companyName.trim() || null),
        budget: inquiryRole === 'CREATOR' ? null : (inquiryForm.budget.trim() || null),
        message: inquiryForm.message.trim(),
        sessionId: activeSessionId, // Links inquiry directly to visitor clickstream
      };

      // A. Submit inquiry to CRM / business inbox
      const res = await fetch(`${API_BASE}/api/v1/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Submission failed');
      trackApplyConversion();

      // B. Record first-touch attribution lead (captures UTM, channel, city from session)
      if (activeSessionId) {
        captureLead({
          email: payload.email,
          fullName: payload.name,
          phone: payload.phone,
          userType: inquiryRole, // Helper maps CREATOR -> INFLUENCER
          consent: true,
          consentText: 'Inquiry submitted on Brand Collabz website',
        }).catch((err) => console.warn('Lead attribution sync skipped:', err));
      }

      setInquiryStatus('success');
      setInquiryForm({ name: '', email: '', phone: '', companyName: '', budget: '', message: '' });
    } catch {
      setInquiryStatus('error');
      setInquiryErrorMsg('Unable to submit inquiry. Please verify your details and try again.');
    } finally {
      setInquiryLoading(false);
    }
  };

  const filteredCampaigns = activeCategory === 'All Campaigns'
    ? HARDCODED_CAMPAIGNS
    : HARDCODED_CAMPAIGNS.filter(c => c.category === activeCategory);

  const copy = INQUIRY_COPY[inquiryRole];

  return (
    <div className="ih-page w-full overflow-x-hidden bg-[#fafbfc] pb-20 text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900 md:pb-0">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');

        html, body {
          touch-action: manipulation;
          -webkit-text-size-adjust: 100%;
          overscroll-behavior-y: none;
          scroll-behavior: smooth;
        }

        .ih-page { font-family: 'DM Sans', sans-serif; background: #fafbfc; color: #0f172a; }
        .ih-page h1, .ih-page h2, .ih-page h3 { font-family: 'Manrope', 'DM Sans', sans-serif; }
        .ih-page .ih-kicker { letter-spacing: .16em; text-transform: uppercase; }

        @keyframes marquee-lr {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-lr { display: flex; width: max-content; animation: marquee-lr 28s linear infinite; }
        .animate-marquee-lr:hover { animation-play-state: paused; }

        .ih-noscroll { scrollbar-width: none; -ms-overflow-style: none; }
        .ih-noscroll::-webkit-scrollbar { display: none; }

        @keyframes ih-pop { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .ih-pop { animation: ih-pop .25s ease-out both; }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-lr, .ih-pop { animation: none; }
          html, body { scroll-behavior: auto; }
        }
      `}</style>

      {/* 1. HERO */}
      <section className="relative isolate overflow-hidden bg-white border-b border-slate-200/70">
        <div className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-blue-500/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 -top-24 h-[34rem] w-[34rem] rounded-full bg-slate-200/50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16 lg:grid-cols-[1.02fr_.98fr] lg:gap-8 lg:pb-24 lg:pt-20">
          <div className="relative z-10 max-w-2xl">
            <h1 className="mt-5 max-w-[680px] font-['Manrope'] text-[2.4rem] font-extrabold leading-[1.06] tracking-[-.05em] text-slate-950 sm:text-5xl lg:text-[4.2rem]">
              Make your influence
              <span className="mt-1 block text-blue-600">work for you.</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base font-normal">
              Discover real brand campaigns, pitch your creativity, and build partnerships that value your work. One place for creators, brands and agencies to grow together.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/campaigns"
                className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
              >
                Explore campaigns
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#inquiry"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-sm font-bold text-slate-800 transition-all hover:bg-slate-50 active:scale-[0.98]"
              >
                <Building2 className="h-4 w-4 text-blue-600" />
                Contact / Inquire
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs font-semibold text-slate-600">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-blue-600" /> Clear campaign details</span>
              <span className="inline-flex items-center gap-1.5"><Wallet className="h-4 w-4 text-blue-600" /> Payouts shown upfront</span>
              <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-blue-600" /> Creator-first platform</span>
            </div>

            <div className="mt-9 grid max-w-[480px] grid-cols-3 border-t border-slate-200 pt-5">
              <div className="pr-3">
                <p className="font-['Manrope'] text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">10K<span className="text-blue-600">+</span></p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-500">Creator community</p>
              </div>
              <div className="border-l border-slate-200 px-3.5">
                <p className="font-['Manrope'] text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">500<span className="text-blue-600">+</span></p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-500">Brands & agencies</p>
              </div>
              <div className="border-l border-slate-200 pl-3.5">
                <p className="font-['Manrope'] text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">2K+</p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-500">Campaign opportunities</p>
              </div>
            </div>
          </div>

          {/* Hero Collage */}
          <div className="relative mx-auto w-full max-w-[540px] lg:ml-auto">
            <div className="relative grid grid-cols-[1.1fr_.82fr] items-center gap-3 sm:gap-4">
              <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-100 shadow-md border border-slate-200/80">
                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1100&q=90"
                  alt="Fashion creator in editorial shoot"
                  className="aspect-[4/5] w-full object-cover object-center"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent p-4 pt-14 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Create with confidence</p>
                  <p className="mt-0.5 font-['Manrope'] text-base font-extrabold">Your next big collab.</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100 shadow-sm border border-slate-200/80">
                  <img
                    src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=85"
                    alt="Premium beauty skincare"
                    className="aspect-[1/1.05] w-full object-cover"
                  />
                  <span className="absolute bottom-2.5 left-2.5 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold text-slate-800 shadow-sm">Beauty campaigns</span>
                </div>
                <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100 shadow-sm border border-slate-200/80">
                  <img
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85"
                    alt="Activewear sneaker campaign"
                    className="aspect-[1/1.05] w-full object-cover"
                  />
                  <span className="absolute bottom-2.5 left-2.5 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold text-slate-800 shadow-sm">Fashion & lifestyle</span>
                </div>
              </div>
            </div>

            <div className="absolute -left-2 top-[46%] z-20 max-w-[195px] rounded-2xl border border-slate-200/90 bg-white/95 p-3 shadow-lg backdrop-blur-md sm:-left-6 sm:max-w-[215px] sm:p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Live opportunity</span>
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-blue-700">Open</span>
              </div>
              <p className="mt-1.5 font-['Manrope'] text-xs font-bold text-slate-900">Beauty creator campaign</p>
              <div className="mt-1.5 flex items-end justify-between">
                <div>
                  <p className="text-[9px] text-slate-400">Creator payout</p>
                  <p className="font-['Manrope'] text-base font-extrabold text-slate-950">₹15,000</p>
                </div>
                <Link to="/campaigns" aria-label="View campaigns" className="grid h-7 w-7 place-items-center rounded-full bg-slate-900 text-white transition hover:bg-blue-600"><ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
            </div>

            <div className="absolute -bottom-4 right-2 z-20 flex items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white/95 px-3.5 py-2.5 shadow-md sm:right-4">
              <div className="flex -space-x-1.5">
                <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80" alt="" className="h-7 w-7 rounded-full border-2 border-white object-cover" />
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="" className="h-7 w-7 rounded-full border-2 border-white object-cover" />
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="" className="h-7 w-7 rounded-full border-2 border-white object-cover" />
              </div>
              <div>
                <p className="text-[11px] font-extrabold leading-tight text-slate-900">Made for creators</p>
                <p className="text-[9px] text-slate-500">And the brands they love</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 pb-8 sm:pb-12">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-[26px] border border-slate-200/80 min-h-[220px] lg:min-h-[260px] shadow-sm flex items-center p-6 sm:p-10">
          <img
            src="/images/campaign-banners/thumbnail.png"
            alt="Campaign banner showcase"
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-lg text-white">
            <p className="ih-kicker text-[10px] font-bold text-blue-300 mb-1.5">A better way to collaborate</p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
              Your next brand story starts here.
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed font-normal max-w-md">
              Discover briefs that fit your niche, create content you are proud of, and build lasting brand relationships.
            </p>
            <Link
              to="/campaigns"
              className="inline-flex items-center gap-2 mt-5 rounded-xl bg-blue-600 text-white px-5 py-2.5 text-xs font-bold hover:bg-blue-700 transition active:scale-95 shadow-lg shadow-blue-600/30"
            >
              Explore creator opportunities <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. MARQUEE */}
      <section className="py-5 border-y border-slate-200/80 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-4 sm:gap-6">
          <div className="shrink-0 flex items-center gap-2.5 border-b md:border-b-0 md:border-r border-slate-200 pb-2 md:pb-0 md:pr-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-800 whitespace-nowrap">Trusted by 500+ brands</p>
          </div>

          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="animate-marquee-lr flex items-center gap-8 sm:gap-12 py-1">
              {[...MARQUEE_BRANDS, ...MARQUEE_BRANDS].map((brand, i) => (
                <span
                  key={`${brand.name}-${i}`}
                  className={`${brand.color} ${brand.style} select-none transition-transform hover:scale-110 cursor-pointer whitespace-nowrap`}
                >
                  {brand.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. LIVE CAMPAIGNS */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-[-.035em]">Explore Live Campaigns</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Apply to handpicked brand campaigns and start creating.</p>
          </div>

          <div className="ih-noscroll -mx-4 flex items-center gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 lg:flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition active:scale-95 ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="ih-noscroll -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 sm:gap-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0">
          {(filteredCampaigns.length > 0 ? filteredCampaigns : HARDCODED_CAMPAIGNS).map((c) => {
            const isFav = favorites.has(c.id);

            return (
              <div
                key={c.id}
                className="group flex w-[68%] min-w-[220px] max-w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:w-[42%] lg:w-auto lg:max-w-none"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Link to="/campaigns" className="block h-full w-full">
                    <img
                      src={c.image}
                      alt={c.brandName}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>

                  <span className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${c.badgeStyle}`}>
                    {c.badge}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(c.id, e)}
                    aria-label="Save to favorites"
                    className={`absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition ${
                      isFav ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`h-3.5 w-3.5 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
                  <div>
                    <div className="mb-1 flex items-center gap-1.5 text-xs font-bold">
                      <span className={c.brandColor || 'text-slate-900'}>{c.brandName}</span>
                      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-600 text-[8px] font-black text-white">✓</span>
                    </div>

                    <h3 className="text-sm font-bold leading-snug text-slate-900 line-clamp-1">
                      <Link to="/campaigns" className="transition-colors hover:text-blue-600">{c.campaignTitle}</Link>
                    </h3>

                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {c.tags.map((t, i) => (
                        <span key={i} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-3">
                    <div>
                      <p className="text-[9px] font-medium uppercase tracking-wider text-slate-400">Payout</p>
                      <p className="text-base font-extrabold leading-none text-slate-950">{c.payout}</p>
                    </div>
                    <Link
                      to="/campaigns"
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-blue-700 active:scale-95"
                    >
                      Apply now
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-2 text-center text-[11px] text-slate-400 lg:hidden">Swipe to see more →</p>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="relative overflow-hidden bg-slate-50/70 border-y border-slate-200/80 py-14 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 grid gap-5 lg:grid-cols-[1fr_.65fr] lg:items-end">
            <div>
              <span className="ih-kicker text-[10px] font-bold text-blue-600">A simpler way to collaborate</span>
              <h2 className="mt-3 font-['Manrope'] text-3xl font-extrabold leading-tight tracking-[-.04em] text-slate-950 sm:text-4xl">
                From first click to
                <span className="text-blue-600"> great collaboration.</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 lg:justify-self-end font-normal max-w-md">
              Whether you create content or build a brand, everything you need to start a meaningful partnership is in one place.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 items-stretch">
            <article className="group relative flex min-h-[460px] sm:min-h-[520px] flex-col justify-between overflow-hidden rounded-2xl sm:rounded-[2rem] border border-slate-200/60 shadow-sm">
              <img
                src="/images/campaign-banners/workinglady.png"
                alt="Creator working on campaign"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between p-5 sm:p-7">
                <span className="rounded-full border border-white/25 bg-black/40 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">For creators</span>
                <span className="rounded-full border border-white/25 bg-black/40 px-2.5 py-0.5 text-xs font-bold text-white">01 / 02</span>
              </div>

              <div className="relative z-10 p-5 sm:p-7 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-300">Your creativity. Your next opportunity.</p>
                <h3 className="mt-1 font-['Manrope'] text-xl sm:text-2xl font-extrabold leading-snug tracking-tight text-white drop-shadow-md">
                  Find brands that fit your voice.
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-200 font-normal max-w-md">
                  Explore real briefs, understand the deliverables and payout before applying, then manage your collaboration with clarity.
                </p>

                <div className="mt-5 grid grid-cols-4 gap-2 border-t border-white/20 pt-4">
                  {[
                    [Compass, 'Discover'],
                    [FileCheck2, 'Apply'],
                    [Video, 'Create'],
                    [Wallet, 'Get paid'],
                  ].map(([Icon, label], index) => (
                    <div key={label} className="min-w-0 text-center sm:text-left">
                      <span className="mb-1.5 mx-auto flex h-7 w-7 items-center justify-center rounded-lg border border-white/20 bg-black/40 text-white sm:mx-0 sm:h-8 sm:w-8">
                        <Icon className="h-3.5 w-3.5 text-white" />
                      </span>
                      <span className="block text-[11px] font-bold text-white">{label}</span>
                      <span className="text-[9px] font-medium text-slate-300">0{index + 1}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Link
                    to="/campaigns"
                    className="inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 active:scale-95"
                  >
                    Explore creator campaigns <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>

            <article className="flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-[2rem] border border-slate-200 bg-white p-5 sm:p-8 shadow-sm">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-blue-700">For brands & agencies</span>
                  <span className="font-['Manrope'] text-xs font-bold text-slate-400">02 / 02</span>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[.16em] text-blue-600">One brief. The right creators.</p>
                  <h3 className="mt-2 font-['Manrope'] text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-slate-950">
                    Build campaigns people want to be part of.
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                    Publish your campaign, discover creators who match your audience, review applications and keep every collaboration moving.
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200/90 bg-slate-50 p-4 sm:p-5">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Campaign workspace</p>
                      <p className="mt-0.5 font-['Manrope'] text-xs sm:text-sm font-extrabold text-slate-900">Summer product launch</p>
                    </div>
                    <span className="rounded-full bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">In review</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-3">
                    {[['Applications', '24'], ['Shortlisted', '08'], ['Deliverables', '12']].map(([l, v]) => (
                      <div key={l} className="rounded-xl bg-white border border-slate-200/80 p-2.5 text-center sm:text-left">
                        <p className="text-[9px] text-slate-400">{l}</p>
                        <p className="font-['Manrope'] text-base sm:text-lg font-extrabold text-slate-900">{v}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {[
                      ['Creator discovery', 'Find profiles aligned with your brief', '✓'],
                      ['Application review', 'Compare creator applications', '✓'],
                      ['Campaign tracking', 'Keep deliverables and timelines visible', '↗'],
                    ].map(([title, desc, mark]) => (
                      <div key={title} className="flex items-center gap-2.5 rounded-xl bg-white border border-slate-200/60 px-3 py-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[10px] font-bold text-blue-600">{mark}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 leading-none">{title}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/signup?role=brand"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-xs sm:text-sm font-bold text-white transition hover:bg-slate-800 active:scale-95"
                >
                  Start a brand campaign <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 6. BENEFITS */}
      <section className="bg-white py-14 sm:py-24 border-b border-slate-200/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <span className="ih-kicker text-[10px] font-bold text-blue-600">Made for better partnerships</span>
              <h2 className="mt-3 font-['Manrope'] text-3xl font-extrabold leading-tight tracking-[-.05em] text-slate-950 sm:text-4xl lg:text-5xl">
                Less chasing.<br /><span className="text-blue-600">More creating.</span>
              </h2>
            </div>
            <p className="max-w-xl text-xs sm:text-sm leading-relaxed text-slate-600 lg:justify-self-end font-normal">
              A collaboration should feel exciting, not confusing. Brand Collabz brings the important details together so both sides can focus on doing great work.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid gap-4 md:grid-cols-12">
            <article className="relative min-h-[220px] overflow-hidden rounded-2xl sm:rounded-[1.8rem] bg-slate-50 border border-slate-200/90 p-6 sm:p-8 md:col-span-7">
              <div className="relative z-10 max-w-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100"><ShieldCheck className="h-5 w-5" /></span>
                <h3 className="mt-6 font-['Manrope'] text-xl sm:text-2xl font-extrabold tracking-[-.035em] text-slate-950">Know what you're signing up for.</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">Campaign expectations, deliverables, timelines and payout details are presented upfront, before you apply.</p>
              </div>
              <div className="pointer-events-none absolute -bottom-24 -right-8 h-64 w-64 rounded-full border-[30px] border-slate-200/40" />
            </article>

            <article className="relative min-h-[220px] overflow-hidden rounded-2xl sm:rounded-[1.8rem] bg-slate-950 p-6 sm:p-8 text-white md:col-span-5 border border-slate-900">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white"><Wallet className="h-5 w-5" /></span>
              <p className="mt-6 text-[10px] font-bold uppercase tracking-[.15em] text-slate-300">Clarity at every step</p>
              <h3 className="mt-1 font-['Manrope'] text-xl sm:text-2xl font-extrabold tracking-[-.035em]">A smoother way to work together.</h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal">Keep applications, communication and campaign progress organised in one experience.</p>
              <div className="absolute -bottom-12 -right-8 h-40 w-40 rounded-full border border-white/10" />
            </article>

            {[
              [Users, 'Better-fit connections', 'Bring creators and brands together around shared niches, audiences and campaign goals.'],
              [FileCheck2, 'Clear campaign briefs', 'Know the content format, expectations and important dates before you commit.'],
              [BarChart2, 'One organised workflow', 'Move from discovery to application and delivery with less back-and-forth.'],
            ].map(([Icon, title, desc]) => (
              <article key={title} className="rounded-2xl sm:rounded-[1.8rem] border border-slate-200/90 bg-white p-6 sm:p-7 md:col-span-4 hover:border-slate-300 transition-colors">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-5 font-['Manrope'] text-lg font-extrabold text-slate-950">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 font-normal">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIAL */}
      <section className="bg-slate-50/80 py-14 sm:py-20 border-b border-slate-200/80">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.75fr_1.25fr] lg:items-center lg:px-8">
          <div>
            <span className="ih-kicker text-[10px] font-bold text-blue-600">Community voices</span>
            <h2 className="mt-3 font-['Manrope'] text-3xl font-extrabold leading-tight tracking-[-.05em] text-slate-950 sm:text-4xl">
              Good work starts with a good connection.
            </h2>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal max-w-sm">
              A creator-first experience built around clear briefs, relevant opportunities and better collaboration.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] bg-white p-6 sm:p-9 shadow-sm border border-slate-200/90">
            <span className="absolute right-6 top-1 font-serif text-[8rem] sm:text-[9rem] leading-none text-slate-100 select-none pointer-events-none">“</span>
            <div className="relative">
              <div className="flex items-center gap-1 text-amber-500">
                <span>★★★★★</span>
                <span className="ml-2 text-[10px] font-bold uppercase tracking-[.14em] text-slate-400">Creator experience</span>
              </div>
              <blockquote className="mt-5 font-['Manrope'] text-lg sm:text-2xl font-semibold leading-snug tracking-tight text-slate-900">
                Brand Collabz makes it easier to discover genuine brand campaigns. I can understand the brief, apply with confidence and focus on creating content.
              </blockquote>
              <div className="mt-7 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=240&q=90"
                    alt="Creator portrait"
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900">Creator community</p>
                    <p className="text-[10px] sm:text-xs text-slate-500">Brand Collabz creator</p>
                  </div>
                </div>
                <Link to="/campaigns" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 transition hover:text-blue-700">
                  Find your next campaign <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INQUIRY */}
      <section
        id="inquiry"
        ref={inquiryRef}
        className="scroll-mt-20 border-b border-slate-200/80 bg-gradient-to-b from-white to-slate-50 py-12 sm:py-16"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_50px_-24px_rgba(15,23,42,.25)] lg:grid-cols-[1.1fr_.9fr] lg:rounded-3xl">

            {/* LEFT: form */}
            <div className="p-5 sm:p-7 lg:p-8">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="ih-kicker text-[10px] font-bold text-blue-600">Get in touch</span>
                  <h2 className="mt-1 font-['Manrope'] text-xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-2xl">
                    Submit an inquiry
                  </h2>
                </div>
                <span className="mt-1 hidden shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 sm:inline-flex">
                  <Clock className="h-3 w-3" /> Reply in 24h
                </span>
              </div>

              <div className="sticky top-0 z-20 -mx-5 mt-4 bg-white/95 px-5 py-2 backdrop-blur sm:-mx-7 sm:px-7 lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
                <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1">
                  {INQUIRY_TABS.map(tab => {
                    const Icon = tab.icon;
                    const active = inquiryRole === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => { setInquiryRole(tab.id); setInquiryStatus(null); }}
                        className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition ${
                          active ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {inquiryStatus === 'success' ? (
                <div className="ih-pop py-10 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-600">
                    <Check className="h-6 w-6 stroke-[2.5]" />
                  </div>
                  <h3 className="mt-3 font-['Manrope'] text-lg font-bold text-slate-950">Inquiry received</h3>
                  <p className="mx-auto mt-1 max-w-xs text-xs leading-relaxed text-slate-500">
                    Thanks! Our partnership team will review your details and reach out within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setInquiryStatus(null)}
                    className="mt-4 text-xs font-semibold text-blue-600 underline hover:text-blue-700"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="mt-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="inq-name" className="mb-1 block text-[11px] font-semibold text-slate-700">
                        Full name <span className="text-blue-600">*</span>
                      </label>
                      <input
                        id="inq-name" type="text" required autoComplete="name"
                        placeholder="First and last name"
                        value={inquiryForm.name}
                        onChange={e => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label htmlFor="inq-email" className="mb-1 block text-[11px] font-semibold text-slate-700">
                        Email <span className="text-blue-600">*</span>
                      </label>
                      <input
                        id="inq-email" type="email" required autoComplete="email" inputMode="email"
                        placeholder="you@domain.com"
                        value={inquiryForm.email}
                        onChange={e => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="inq-phone" className="mb-1 block text-[11px] font-semibold text-slate-700">
                        Phone / WhatsApp <span className="font-normal text-slate-400">(optional)</span>
                      </label>
                      <input
                        id="inq-phone" type="tel" autoComplete="tel" inputMode="tel"
                        placeholder="+91 98765 43210"
                        value={inquiryForm.phone}
                        onChange={e => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        className={inputCls}
                      />
                    </div>

                    {inquiryRole !== 'CREATOR' && (
                      <div>
                        <label htmlFor="inq-company" className="mb-1 block text-[11px] font-semibold text-slate-700">
                          {inquiryRole === 'BRAND' ? 'Brand / company' : 'Agency name'} <span className="text-blue-600">*</span>
                        </label>
                        <input
                          id="inq-company" type="text" required autoComplete="organization"
                          placeholder={inquiryRole === 'BRAND' ? 'Your brand' : 'Agency Media LLC'}
                          value={inquiryForm.companyName}
                          onChange={e => setInquiryForm({ ...inquiryForm, companyName: e.target.value })}
                          className={inputCls}
                        />
                      </div>
                    )}
                  </div>

                  {inquiryRole !== 'CREATOR' && (
                    <div>
                      <label htmlFor="inq-budget" className="mb-1 block text-[11px] font-semibold text-slate-700">
                        Estimated budget <span className="font-normal text-slate-400">(optional)</span>
                      </label>
                      <select
                        id="inq-budget"
                        value={inquiryForm.budget}
                        onChange={e => setInquiryForm({ ...inquiryForm, budget: e.target.value })}
                        className={`${inputCls} cursor-pointer`}
                      >
                        <option value="">Select budget range</option>
                        <option value="Under ₹50,000">Under ₹50,000</option>
                        <option value="₹50,000 - ₹2,00,000">₹50,000 – ₹2,00,000</option>
                        <option value="₹2,00,000 - ₹5,00,000">₹2,00,000 – ₹5,00,000</option>
                        <option value="₹5,00,000+">₹5,00,000+</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label htmlFor="inq-msg" className="mb-1 block text-[11px] font-semibold text-slate-700">
                      {inquiryRole === 'CREATOR' ? 'Your niche & social handles' : 'Campaign brief'} <span className="text-blue-600">*</span>
                    </label>
                    <textarea
                      id="inq-msg" rows={3} required
                      placeholder={
                        inquiryRole === 'CREATOR'
                          ? 'Niches (Beauty, Tech…), profile links, and the collabs you want.'
                          : 'Campaign goal, number of creators, audience and launch timeline.'
                      }
                      value={inquiryForm.message}
                      onChange={e => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      className="w-full resize-none rounded-lg border border-slate-200 bg-white p-3 text-[13px] text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 font-normal"
                    />
                  </div>

                  {inquiryStatus === 'error' && (
                    <div role="alert" className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs font-medium text-rose-700">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{inquiryErrorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={inquiryLoading}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98] disabled:opacity-60"
                  >
                    {inquiryLoading ? 'Sending…' : (<><span>Send inquiry</span><Send className="h-3.5 w-3.5" /></>)}
                  </button>
                </form>
              )}
            </div>

            {/* RIGHT: illustration panel */}
            <aside className="order-first border-b border-slate-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 lg:order-none lg:border-b-0 lg:border-l">
              <div className="flex h-40 items-center justify-center overflow-hidden p-4 sm:h-48 lg:sticky lg:top-6 lg:h-auto lg:min-h-[480px] lg:flex-col lg:justify-between lg:p-7">
                <div className="pointer-events-none absolute -right-10 -top-10 hidden h-40 w-40 rounded-full bg-blue-500/10 blur-2xl lg:block" />

                <div className="hidden w-full lg:block">
                  <span className="inline-flex w-fit items-center gap-1 rounded-full border border-blue-100 bg-white px-2.5 py-1 text-[10px] font-bold text-blue-700 shadow-sm">
                    <Sparkles className="h-3 w-3" /> {copy.kicker}
                  </span>
                  <h3 key={inquiryRole} className="ih-pop mt-3 font-['Manrope'] text-xl font-extrabold leading-snug tracking-tight text-slate-950 lg:text-2xl">
                    {copy.title}
                  </h3>
                  <p key={`${inquiryRole}-s`} className="ih-pop mt-1.5 max-w-xs text-xs leading-relaxed text-slate-600">
                    {copy.sub}
                  </p>
                </div>

                <img
                  src="https://img.freepik.com/premium-photo/front-view-company-office-with-large-windows_198067-183906.jpg"
                  alt="Brand and creator collaboration illustration"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-auto max-w-full object-contain mix-blend-multiply lg:my-4 lg:h-auto lg:max-h-[260px] lg:w-full"
                />

                <div className="hidden w-full items-center gap-3 border-t border-slate-200 pt-4 lg:flex">
                  <div className="flex -space-x-1.5">
                    <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80" alt="" className="h-7 w-7 rounded-full border-2 border-white object-cover" />
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="" className="h-7 w-7 rounded-full border-2 border-white object-cover" />
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="" className="h-7 w-7 rounded-full border-2 border-white object-cover" />
                  </div>
                  <p className="text-[11px] font-semibold leading-tight text-slate-900">
                    Join 10K+ creators<br /><span className="font-normal text-slate-500">and 500+ brands</span>
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 9. BRAND & AGENCY CTA */}
      <section className="relative overflow-hidden bg-white py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[2.25rem] bg-slate-950 text-white shadow-xl border border-slate-900">
            <div className="pointer-events-none absolute -right-20 -top-32 h-[28rem] w-[28rem] rounded-full border border-blue-500/10" />
            <div className="pointer-events-none absolute -right-4 -top-16 h-[20rem] w-[20rem] rounded-full border border-blue-500/10" />

            <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_.85fr] lg:items-center lg:p-14">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-blue-400">
                  <Megaphone className="h-3 w-3" /> For brands & agencies
                </span>
                <h2 className="mt-5 font-['Manrope'] text-3xl font-extrabold leading-tight tracking-[-.04em] sm:text-4xl lg:text-5xl">
                  Have a campaign in mind?
                </h2>
                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-300 font-normal">
                  Tell us what you're looking to create. Whether it's your first creator campaign or your next big launch, our team can help you get started.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/signup?role=brand"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-xs font-bold text-white transition hover:bg-blue-700 active:scale-95 shadow-sm"
                  >
                    Create a brand account <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href="#inquiry"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 text-xs font-bold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900 active:scale-95"
                  >
                    <Mail className="h-3.5 w-3.5" /> Submit brief directly
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5 backdrop-blur-sm sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[.15em] text-slate-300">Let's build something meaningful</p>
                  <div className="mt-5 space-y-4">
                    {[
                      [Building2, 'Introduce your brand', 'Tell us about your business and audience.'],
                      [Megaphone, 'Share your campaign goal', 'Launch, awareness, product seeding or more.'],
                      [Users, 'Meet relevant creators', 'Find creators who align with your campaign.'],
                    ].map(([Icon, title, desc], index) => (
                      <div key={title} className="flex gap-3.5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white">{title}</p>
                          <p className="mt-0.5 text-[11px] leading-relaxed text-slate-400">{desc}</p>
                        </div>
                        <span className="ml-auto text-xs font-bold text-slate-600">0{index + 1}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400">Prefer direct email?</p>
                    <a
                      href="mailto:contact@brandcollabz.in"
                      className="mt-1 inline-flex items-center gap-1.5 break-all text-xs font-semibold text-blue-400 transition-colors hover:text-white"
                    >
                      contact@brandcollabz.in <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY MOBILE ACTION BAR */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 pt-2.5 backdrop-blur transition-transform duration-300 md:hidden ${
          inquiryVisible ? 'translate-y-full' : 'translate-y-0'
        }`}
        style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="mx-auto flex max-w-md gap-2">
          <Link
            to="/campaigns"
            className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 text-xs font-bold text-white active:scale-95"
          >
            Explore campaigns <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <a
            href="#inquiry"
            className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 active:scale-95"
          >
            <Mail className="h-3.5 w-3.5 text-blue-600" /> Inquire
          </a>
        </div>
      </div>
    </div>
  );
}