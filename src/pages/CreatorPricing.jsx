import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../auth/authService';import {
  Check, Minus, ChevronDown, ArrowRight, ArrowUpRight, UserPlus, Send, Search,
  Lock, ShieldCheck, Wallet, BadgeCheck, Zap, Sparkles, Video
} from 'lucide-react';
import { createPaymentOrder, verifyPaymentSignature } from '../services/api';
import CheckoutOverlay from '../components/CheckoutOverlay';

const PLANS = [
  { 
    id: 'free', 
    name: 'Free', 
    price: '₹0', 
    perDay: 'Free forever', 
    blurb: 'For creators starting out', 
    features: [
      'Apply to 50 campaigns per day', 
      'Keep 100% of your earnings (0% fee)', 
      'Direct pitch messaging on applications', 
      'Standard creator profile & portfolio', 
      'Campaign status notifications'
    ], 
    cta: 'Get started free', 
    to: '/signup?role=creator',
    amount: 0
  },
  { 
    id: 'pro', 
    name: 'Pro', 
    badge: 'Most popular', 
    price: '₹149', 
    perDay: 'About ₹5 a day', 
    blurb: 'For active creators landing regular deals', 
    features: [
      'Unlimited campaign applications per day', 
      'Featured Applicant badge on brand dashboards', 
      'Early access to high-budget briefs (24 hrs early)', 
      'Attach custom pitch deck or media kit PDF', 
      'Direct brand follow-up chat after applying', 
      'Profile view counts and analytics'
    ], 
    cta: 'Choose Pro', 
    dark: true,
    amount: 149
  },
  { 
    id: 'elite', 
    name: 'Elite', 
    price: '₹299', 
    perDay: 'About ₹10 a day', 
    blurb: 'For full-time creators and talent managers', 
    features: [
      'Everything in Pro', 
      'Verified creator badge on profile', 
      'Top-of-inbox pitch placement', 
      'Priority payment clearance (within 24 hrs)', 
      'Priority brand matching', 
      'Dedicated 1-on-1 collaboration support'
    ], 
    cta: 'Get Elite',
    amount: 299
  },
];

const ROWS = [
  ['Daily campaign applications', '50 per day', 'Unlimited', 'Unlimited'],
  ['Platform fee on earnings', '0% (Keep 100%)', '0% (Keep 100%)', '0% (Keep 100%)'],
  ['Brand dashboard visibility', 'Standard queue', 'Featured badge', 'Top of inbox'],
  ['Early access to new briefs', false, '24 hours early', '48 hours early'],
  ['Media kit & pitch PDF upload', false, true, true],
  ['Direct brand follow-up chat', false, true, true],
  ['Verified creator badge', false, false, true],
  ['Payout release timeline', 'Standard (7 days)', 'Priority (3 days)', 'Express (24 hrs)'],
  ['Dedicated support manager', false, false, true],
];

const UNLOCK = {
  free: { queue: 'Standard Queue', badge: false, early: false, chat: false },
  pro: { queue: 'Featured Applicant', badge: true, early: true, chat: true },
  elite: { queue: 'Top-of-Inbox Priority', badge: true, early: true, chat: true },
};

const STEPS = [
  [UserPlus, 'Create your creator profile', 'Sign up in 2 minutes, link your Instagram or YouTube, and set your primary niches.'],
  [Search, 'Discover brand campaigns', 'Browse open briefs filtered by category, deliverables, location, and upfront payout.'],
  [Send, 'Apply and pitch directly', 'Send your pitch directly to brand decision-makers with your proposed fee.'],
  [Wallet, 'Create and get paid', 'Deliver your content, get approved, and receive 100% of your payout securely.'],
];

const FAQS = [
  ['Is Brand Collabz free for creators?', 'Yes. You can apply to up to 50 brand campaigns every single day completely free, with 0% platform cuts taken from your earnings.'],
  ['Why would I upgrade to Creator Pro or Elite?', 'Paid plans give you unlimited daily applications, place a "Featured" badge on your pitches so brands review you first, and unlock 24-hour early access to new briefs.'],
  ['When do I get paid for my campaigns?', 'Brands fund milestones upfront before work starts. Once the brand approves your final post link, payout is credited directly to your bank account.'],
  ['Does Brand Collabz take any commission on my deals?', 'Zero. We take 0% cut on creator earnings. We only charge a small software subscription if you choose to upgrade to Pro.'],
  ['Can I cancel my Pro plan anytime?', 'Yes. Cancel or downgrade anytime from your billing settings. There are no contracts or hidden cancellation fees.'],
];

const NEEDS = [
  ['unlimited', 'More than 50 applications a day'],
  ['featured', 'Featured pitch badge or early brief access'],
  ['verified', 'Verified checkmark or express payouts'],
];

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function Hero() {
  const [plan, setPlan] = useState('free');
  const u = UNLOCK[plan];
  
  const Field = ({ label, value, open }) => (
    <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3">
      <p className="flex items-center justify-between text-[10px] text-slate-400">
        {label}
        {!open && <Lock className="h-3 w-3" />}
      </p>
      <p className={`mt-1 text-sm font-bold text-slate-900 transition ${open ? '' : 'select-none blur-[4px]'}`}>
        {value}
      </p>
    </div>
  );

  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200/70 bg-white">
      <div className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-blue-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 -top-24 h-[34rem] w-[34rem] rounded-full bg-slate-200/50 blur-3xl" />
      
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[1fr_.9fr] lg:gap-14 lg:pb-24 lg:pt-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[.17em] text-blue-700">
            <span className="h-2 w-2 rounded-full bg-blue-600" /> Pricing for creators
          </div>
          <h1 className="mt-7 text-[2.5rem] font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-6xl lg:text-[3.8rem]">
            Apply free.
            <span className="block text-blue-600">Get hired faster.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base font-normal leading-8 text-slate-600 sm:text-lg">
            Apply to up to 50 campaigns every day for ₹0. Upgrade to Pro when you want unlimited applications, featured pitch visibility, and direct brand messaging.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link 
              to="/signup?role=creator" 
              className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-sm shadow-blue-500/20 transition hover:bg-blue-700"
            >
              Start for free <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a 
              href="#plans" 
              className="inline-flex min-h-13 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-4 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Compare plans
            </a>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-600">
            <span className="inline-flex items-center gap-2"><Wallet className="h-4 w-4 text-blue-600" /> 0% commission on payouts</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-blue-600" /> Free 50 applies daily</span>
            <span className="inline-flex items-center gap-2"><Zap className="h-4 w-4 text-blue-600" /> No hidden fees</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] lg:ml-auto">
          <div className="relative rounded-[2rem] border border-slate-200/90 bg-white p-5 shadow-xl sm:p-6">
            <div role="tablist" className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1">
              {PLANS.map((p) => (
                <button 
                  key={p.id} 
                  role="tab" 
                  aria-selected={plan === p.id} 
                  onClick={() => setPlan(p.id)} 
                  className={`rounded-lg py-2 text-xs font-bold transition ${
                    plan === p.id ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=85" 
                alt="Creator portrait" 
                className="h-14 w-14 rounded-2xl border border-slate-200 bg-slate-100 object-cover" 
              />
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-base font-bold text-slate-950">
                  Your Pitch Preview {u.badge && <BadgeCheck className="h-4 w-4 text-blue-600" />}
                </p>
                <p className="text-xs text-slate-500">How brand marketing leads see your application</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <Field label="Daily Applications" value={plan === 'free' ? '50 / day' : 'Unlimited'} open={true} />
              <Field label="Brand Review Placement" value={u.queue} open={true} />
              <Field label="Early Brief Access" value="24 Hours Early" open={u.early} />
              <Field label="Direct Brand Follow-up" value="Active Messaging" open={u.chat} />
            </div>

            <button 
              disabled={!u.chat} 
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition ${
                u.chat ? 'bg-blue-600 text-white hover:bg-blue-700' : 'cursor-not-allowed bg-slate-100 text-slate-400'
              }`}
            >
              {u.chat ? <>Direct Brand Chat Enabled <Check className="h-4 w-4" /></> : <>Direct Chat Unlocks on Pro <Lock className="h-4 w-4" /></>}
            </button>
            <p className="mt-3 text-center text-[11px] text-slate-400">Interactive preview of tier benefits</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlanFinder() {
  const [appCount, setAppCount] = useState('50');
  const [needs, setNeeds] = useState([]);
  
  const toggle = (k) => setNeeds((n) => (n.includes(k) ? n.filter((x) => x !== k) : [...n, k]));

  let id = 'free';
  let why = '50 free applications per day and standard pitching give you everything you need to start landing deals.';
  
  if (needs.includes('unlimited') || appCount === 'unlimited' || needs.includes('featured')) { 
    id = 'pro'; 
    why = 'You want to apply without limits and appear at the top of brand queues. Creator Pro is the ideal fit.'; 
  }
  if (needs.includes('verified') || appCount === 'elite') { 
    id = 'elite'; 
    why = 'For high-volume creators needing top-of-inbox placement, verified badges, and express 24-hr payouts.'; 
  }

  const plan = PLANS.find((p) => p.id === id);
  const chip = (on) => `rounded-full px-4 py-2 text-xs font-bold transition ${on ? 'bg-white text-slate-950' : 'border border-white/15 text-slate-300 hover:bg-white/10'}`;

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
      <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-900 bg-slate-950 p-7 text-white shadow-xl sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute -right-20 -top-32 h-[28rem] w-[28rem] rounded-full border border-blue-500/10" />
        <div className="pointer-events-none absolute -right-4 -top-16 h-[20rem] w-[20rem] rounded-full border border-blue-500/10" />
        
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-blue-400">
              Plan finder
            </span>
            <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Not sure which plan fits you? Answer two questions.
            </h2>
            
            <div className="mt-8 space-y-6">
              <div>
                <p className="mb-2 text-xs text-slate-400">How many campaigns do you want to apply to each day?</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    ['50', 'Up to 50 applies (Free)'], 
                    ['unlimited', '50 to 100+ applies'], 
                    ['elite', 'High volume & talent team']
                  ].map(([k, l]) => (
                    <button key={k} onClick={() => setAppCount(k)} className={chip(appCount === k)}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs text-slate-400">What perks matter to you most?</p>
                <div className="flex flex-wrap gap-2">
                  {NEEDS.map(([k, l]) => (
                    <button key={k} onClick={() => toggle(k)} aria-pressed={needs.includes(k)} className={chip(needs.includes(k))}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.6rem] bg-white p-7 text-slate-900 shadow-2xl">
            <p className="text-xs font-semibold text-slate-400">Our recommendation for you</p>
            <p className="mt-1 text-3xl sm:text-4xl font-bold text-slate-950">{plan.name}</p>
            <p className="mt-1 text-sm font-bold text-blue-600">{plan.price}<span className="font-normal text-slate-400"> / month</span></p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{why}</p>
            {plan.id === 'free' ? (
              <Link to={plan.to} className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700">{plan.cta} <ArrowRight className="h-4 w-4" /></Link>
            ) : (
              <button onClick={() => window.handleCreatorCheckout(plan)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700">{plan.cta} <ArrowRight className="h-4 w-4" /></button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const Cell = ({ v, bold }) =>
  typeof v === 'boolean' ? (
    v ? <Check className="mx-auto h-4 w-4 text-blue-600" aria-label="Included" /> : <Minus className="mx-auto h-4 w-4 text-slate-300" aria-label="Not included" />
  ) : (
    <span className={bold ? 'font-bold text-slate-900' : 'font-medium text-slate-600'}>{v}</span>
  );

export default function CreatorPricing() {
  const [openFaq, setOpenFaq] = useState(0);
  const [loading, setLoading] = useState(false); // false or a message string
  const [notice, setNotice] = useState(null);
  const navigate = useNavigate();

  const closeNotice = () => setNotice(null);
  const showNotice = (n) => {
    setLoading(false);
    setNotice(n);
  };

  const handleCheckout = async (plan) => {
    if (loading) return;
    setLoading('Preparing secure checkout…');

    let user = null;
    try {
      user = await authService.currentUser();
    } catch {
      return showNotice({
        tone: 'error',
        title: 'Connection problem',
        message: 'We couldn’t reach the server. Check your internet connection and try again.',
        primary: { label: 'Try again', onClick: () => handleCheckout(plan) },
        secondary: { label: 'Close' },
      });
    }

    if (!user) {
      return showNotice({
        tone: 'info',
        title: 'Log in to continue',
        message: 'Please log in to your creator account to upgrade your plan.',
        primary: { label: 'Log in', onClick: () => navigate('/login') },
        secondary: { label: 'Not now' },
      });
    }

    if (user.role !== 'creator') {
      return showNotice({
        tone: 'error',
        title: 'Creator plans only',
        message: `You’re signed in as a ${user.role || 'different'} account. These plans are for creator accounts. Please view the brand plans instead.`,
        primary: { label: 'View brand plans', onClick: () => navigate('/brand-pricing') },
        secondary: { label: 'Got it' },
      });
    }

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      return showNotice({
        tone: 'error',
        title: 'Payment unavailable',
        message: 'The payment window failed to load. Please check your connection and try again.',
        primary: { label: 'Try again', onClick: () => handleCheckout(plan) },
        secondary: { label: 'Close' },
      });
    }

    const email = user.email;
    const fullName = user.name || 'Creator Member';
    const contact = (user.phone || '').replace(/^\+91/, '');

    try {
      const orderData = await createPaymentOrder({
        email,
        fullName,
        planId: `creator_${plan.id}`,
        userRole: 'CREATOR',
        amount: plan.amount,
      });

      const options = {
        key: orderData.razorpayKeyId,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        name: 'Brand Collabz',
        description: `Creator Membership - ${plan.name}`,
        order_id: orderData.razorpayOrderId,
        handler: async function (response) {
          setLoading('Confirming your payment…');
          try {
            await verifyPaymentSignature({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            showNotice({
              tone: 'success',
              title: 'Payment successful',
              message: `Welcome to Creator ${plan.name}. Your plan is now active.`,
              primary: { label: 'Continue', onClick: () => window.location.reload() },
            });
          } catch (err) {
            showNotice({
              tone: 'error',
              title: 'Couldn’t confirm payment',
              message: `${err.message}. If money was deducted, contact support with your payment ID: ${response.razorpay_payment_id}.`,
              primary: { label: 'Close' },
            });
          }
        },
        prefill: { email, name: fullName, ...(contact ? { contact } : {}) },
        theme: { color: '#2563eb' },
      };

      const rzp = new window.Razorpay(options);
      setLoading(false); // hide our overlay right as Razorpay opens
      rzp.open();
    } catch (err) {
      showNotice({
        tone: 'error',
        title: 'Checkout failed',
        message: err.message || 'Something went wrong while starting your payment. Please try again.',
        primary: { label: 'Try again', onClick: () => handleCheckout(plan) },
        secondary: { label: 'Close' },
      });
    }
  };

  // Attach to window for PlanFinder
  window.handleCreatorCheckout = handleCheckout;

  return (
    <div className="bc-page bg-[#fafbfc] text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
    <CheckoutOverlay loading={loading} notice={notice} onClose={closeNotice} />
      <style>{`
        .bc-page {
          font-family: Arial, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
      `}</style>

      <Hero />

      {/* ============ PLANS ============ */}
      <section id="plans" className="mx-auto max-w-7xl scroll-mt-6 px-5 py-20 lg:px-8 lg:py-24">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_.65fr] lg:items-end">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[.16em] text-blue-600">Creator Memberships</span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-slate-950">
              Apply free. <span className="text-blue-600">Upgrade when you want an edge.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600 lg:justify-self-end">
            All plans include 0% commission on your brand deals. Cancel or switch anytime.
          </p>
        </div>

        <div className="grid items-stretch gap-5 md:grid-cols-3">
          {PLANS.map((p) => (
            <article 
              key={p.id} 
              className={`relative flex flex-col justify-between rounded-[1.8rem] border p-7 sm:p-8 ${
                p.dark 
                  ? 'border-slate-900 bg-slate-950 text-white shadow-xl md:-translate-y-2' 
                  : 'border-slate-200/90 bg-white shadow-xs hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex min-h-7 items-center justify-between">
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  {p.badge && (
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      {p.badge}
                    </span>
                  )}
                </div>
                <p className={`mt-1 text-xs ${p.dark ? 'text-slate-400' : 'text-slate-500'}`}>{p.blurb}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-bold tracking-tight">{p.price}</span>
                  <span className={`text-sm ${p.dark ? 'text-slate-400' : 'text-slate-400'}`}>/ month</span>
                </div>
                <p className={`mt-1 text-xs font-semibold ${p.dark ? 'text-blue-300' : 'text-blue-600'}`}>{p.perDay}</p>
                
                <ul className={`mt-6 space-y-3.5 border-t pt-6 text-sm ${p.dark ? 'border-white/10 text-slate-300' : 'border-slate-100 text-slate-600'}`}>
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${p.dark ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {p.id === 'free' ? (
                <Link 
                  to={p.to} 
                  className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3.5 text-sm font-bold text-slate-800 hover:bg-slate-50 transition"
                >
                  {p.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <button 
                  onClick={() => handleCheckout(p)} 
                  className={`mt-8 flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition ${
                    p.dark 
                      ? 'bg-blue-600 text-white hover:bg-blue-500' 
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {p.cta} <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ============ COMPARE TABLE ============ */}
      <section className="border-y border-slate-200/80 bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[.16em] text-blue-600">Side by side</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Every feature, every plan.
            </h2>
          </div>

          <div className="overflow-hidden rounded-[1.8rem] border border-slate-200/90 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 font-bold text-slate-900">
                    <th className="px-6 py-4 font-bold">Feature</th>
                    <th className="px-4 py-4 text-center font-bold">Free</th>
                    <th className="bg-blue-50/60 px-4 py-4 text-center font-bold text-blue-700">Pro</th>
                    <th className="px-4 py-4 text-center font-bold">Elite</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ROWS.map(([f, a, b, c]) => (
                    <tr key={f} className="transition-colors hover:bg-slate-50/60">
                      <td className="px-6 py-4 font-medium text-slate-800">{f}</td>
                      <td className="px-4 py-4 text-center"><Cell v={a} /></td>
                      <td className="bg-blue-50/30 px-4 py-4 text-center"><Cell v={b} bold /></td>
                      <td className="px-4 py-4 text-center"><Cell v={c} bold /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <PlanFinder />

      {/* ============ HOW IT WORKS ============ */}
      <section className="border-y border-slate-200/80 bg-slate-50/70 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-slate-900 bg-slate-950 shadow-xl">
              <img 
                src="/images/campaign-banners/workinglady.png" 
                alt="Creator reviewing campaigns" 
                className="absolute inset-0 h-full w-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="relative flex h-full min-h-[360px] flex-col justify-end p-7 text-white sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-blue-300">Fast Track</p>
                <h3 className="mt-2 max-w-sm text-2xl sm:text-3xl font-bold leading-tight">
                  From application to approved payout.
                </h3>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-[.16em] text-blue-600">How it works</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
                Four simple steps to your next collab.
              </h2>
              <ol className="mt-8 space-y-3">
                {STEPS.map(([Icon, t, d], i) => (
                  <li key={t} className="flex items-start gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-950">{t}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{d}</p>
                    </div>
                    <span className="text-sm font-bold text-slate-300">0{i + 1}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[.16em] text-blue-600">Got questions?</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Creator pricing questions, answered.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-slate-600">
            Apply to up to 50 brand campaigns daily for ₹0 with zero fees on payouts.
          </p>
        </div>

        <div className="grid items-start gap-3 md:grid-cols-2 md:gap-4">
          {[0, 1].map((col) => (
            <div key={col} className="space-y-3 md:space-y-4">
              {FAQS.map(([q, a], i) => {
                if (i % 2 !== col) return null;
                const open = openFaq === i;
                return (
                  <div 
                    key={q} 
                    className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                      open ? 'border-slate-900' : 'border-slate-200/90'
                    }`}
                  >
                    <button 
                      onClick={() => setOpenFaq(open ? null : i)} 
                      aria-expanded={open} 
                      className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-bold text-slate-900"
                    >
                      {q}
                      <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                    </button>
                    {open && <p className="-mt-1 px-5 pb-5 text-sm font-normal leading-relaxed text-slate-600">{a}</p>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-white pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-900 bg-slate-950 px-7 py-16 text-center text-white shadow-xl sm:py-20">
            <h2 className="relative mx-auto max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Ready to land your next collaboration?
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-sm text-slate-300">
              Join thousands of creators pitching Brand Collabz briefs. Apply for free today.
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link 
                to="/signup?role=creator" 
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-500"
              >
                Start for free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                to="/campaigns" 
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-200 transition hover:bg-slate-900"
              >
                Browse campaigns <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}