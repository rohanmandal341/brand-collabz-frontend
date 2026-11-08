import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../auth/authService';
import CheckoutOverlay from '../components/CheckoutOverlay';
import {
  Check, Minus, ChevronDown, ArrowRight, ArrowUpRight, UserPlus, Send, Search, Users,
  Lock, ShieldCheck, Wallet, BadgeCheck, Zap,
} from 'lucide-react';
import { createPaymentOrder, verifyPaymentSignature } from '../services/api';

const PLANS = [
  { id: 'free', name: 'Free', price: '₹0', perDay: 'Free forever to start', blurb: 'For brands getting started', features: ['Publish 1 campaign per day', 'Basic creator discovery', 'Browse creator profiles', 'Limited search filters', 'Basic campaign management'], cta: 'Get started free', to: '/signup', amount: 0 },
  { id: 'pro', name: 'Pro', badge: 'Most popular', price: '₹250', perDay: 'About ₹8 a day', blurb: 'For growing brands running regular collabs', features: ['Publish 50+ campaigns per day', 'Advanced discovery and filters', 'Complete creator profiles', 'Save creators to shortlists', 'Campaign tracking and insights', 'Creator contact details'], cta: 'Choose Pro', dark: true, amount: 250 },
  { id: 'unlimited', name: 'Unlimited', price: '₹499', perDay: 'About ₹17 a day', blurb: 'For teams with high-volume outreach', features: ['Unlimited campaign publishing', 'Full creator directory access', 'Audience demographics and engagement', 'Creator contact details', 'Team collaboration', 'Priority support'], cta: 'Get Unlimited', amount: 499 },
];

const ROWS = [
  ['Campaigns you can publish', '1 per day', '50+ per day', 'Unlimited'],
  ['Creator discovery', true, true, true],
  ['Profile detail', 'Basic overview', 'Complete profiles', 'Full profiles'],
  ['Contact details', false, true, true],
  ['Engagement analytics', false, true, true],
  ['Audience demographics', false, false, true],
  ['Shortlists', false, true, true],
  ['Team collaboration', false, false, true],
  ['Priority support', false, false, true],
];

const UNLOCK = {
  free: { eng: false, aud: false, contact: false, save: false },
  pro: { eng: true, aud: false, contact: true, save: true },
  unlimited: { eng: true, aud: true, contact: true, save: true },
};

const STEPS = [
  [UserPlus, 'Create your account', 'Sign up, set your brand preferences and add your team.'],
  [Send, 'Publish a campaign', 'Post a brief with deliverables, required reach and terms.'],
  [Search, 'Discover creators', 'Filter by niche, location, follower range and engagement.'],
  [Users, 'Connect and manage', 'Invite creators, get in touch and track deliverables in one place.'],
];

const FAQS = [
  ['What can I do on the free plan?', 'Browse creator cards, see metrics at a high level and publish 1 campaign per day. There are no setup fees.'],
  ['Can I upgrade or downgrade anytime?', 'Yes. Change or cancel your plan from the billing dashboard. Changes apply immediately and there is no contract lock-in.'],
  ['How does creator discovery work?', 'Search creators by location, engagement, follower range and niche. Paid plans unlock full profiles and contact details.'],
  ['Can I see creators’ contact details?', 'Verified emails and phone numbers are unlocked on Pro and Unlimited, so outreach stays vetted and spam-free.'],
  ['Do you take a commission on collaborations?', 'No. We charge for the software only. We take 0% of creator payments and sponsorship deals.'],
];

const NEEDS = [
  ['contacts', 'Creator contact details'],
  ['analytics', 'Engagement analytics or shortlists'],
  ['team', 'Team access or priority support'],
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
      <p className="flex items-center justify-between text-[10px] text-slate-400">{label}{!open && <Lock className="h-3 w-3" />}</p>
      <p className={`mt-1 text-sm font-extrabold text-slate-900 transition ${open ? '' : 'select-none blur-[5px]'}`}>{value}</p>
    </div>
  );
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200/70 bg-white">
      <div className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-blue-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 -top-24 h-[34rem] w-[34rem] rounded-full bg-slate-200/50 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[1fr_.9fr] lg:gap-14 lg:pb-24 lg:pt-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[.17em] text-blue-700 shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-blue-600" /> Pricing for brands
          </div>
          <h1 className="mt-7 text-[2.5rem] font-extrabold leading-[1.06] tracking-[-.05em] text-slate-950 sm:text-6xl lg:text-[3.9rem]">
            Start free.
            <span className="block text-blue-600">Pay when you need more.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base font-normal leading-8 text-slate-600 sm:text-lg">
            Publish campaigns and browse creators for free. Upgrade to unlock full profiles, contact details and analytics. Flip the switch on the right to see exactly what changes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/signup" className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-sm shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700">Start for free <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
            <a href="#plans" className="inline-flex min-h-13 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-4 text-sm font-bold text-slate-800 shadow-2xs transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50">Compare plans</a>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-600">
            <span className="inline-flex items-center gap-2"><Wallet className="h-4 w-4 text-blue-600" /> 0% commission on deals</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-blue-600" /> Cancel anytime</span>
            <span className="inline-flex items-center gap-2"><Zap className="h-4 w-4 text-blue-600" /> No setup fees</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] lg:ml-auto">
          <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-blue-100/60 via-slate-100 to-slate-200/60 opacity-80 blur-xl" />
          <div className="relative rounded-[2rem] border border-slate-200/90 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,.08)] sm:p-6">
            <div role="tablist" className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1">
              {PLANS.map((p) => (
                <button key={p.id} role="tab" aria-selected={plan === p.id} onClick={() => setPlan(p.id)} className={`rounded-lg py-2 text-xs font-bold transition ${plan === p.id ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>{p.name}</button>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=85" alt="Sample creator" className="h-14 w-14 rounded-2xl border border-slate-200 bg-slate-100 object-cover" />
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 font-['Manrope'] text-base font-extrabold text-slate-950">Sample creator <BadgeCheck className="h-4 w-4 text-blue-600" /></p>
                <p className="text-xs text-slate-500">Beauty · Mumbai · 68K followers</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <Field label="Engagement rate" value="4.8%" open={u.eng} />
              <Field label="Audience: women 18–34" value="71%" open={u.aud} />
              <Field label="Email" value="name@creator.in" open={u.contact} />
              <Field label="Phone" value="+91 98••• ••210" open={u.contact} />
            </div>
            <button disabled={!u.save} className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition ${u.save ? 'bg-blue-600 text-white hover:bg-blue-700' : 'cursor-not-allowed bg-slate-100 text-slate-400'}`}>
              {u.save ? <>Save to shortlist <Check className="h-4 w-4" /></> : <>Shortlists unlock on Pro <Lock className="h-4 w-4" /></>}
            </button>
            <p className="mt-3 text-center text-[11px] text-slate-400">Sample data for illustration</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlanFinder() {
  const [perDay, setPerDay] = useState('1');
  const [needs, setNeeds] = useState([]);
  const toggle = (k) => setNeeds((n) => (n.includes(k) ? n.filter((x) => x !== k) : [...n, k]));
  let id = 'free';
  let why = 'One campaign a day and basic discovery cover you. Upgrade later when you need contact details.';
  if (needs.includes('analytics') || needs.includes('contacts') || perDay === '50') { id = 'pro'; why = 'You need more campaigns, contact details, analytics or shortlists. Pro covers all of that.'; }
  if (perDay === '50+' || needs.includes('team')) { id = 'unlimited'; why = 'High volume or team workflows need Unlimited: no publishing cap, team collaboration and priority support.'; }
  const plan = PLANS.find((p) => p.id === id);
  const chip = (on) => `rounded-full px-4 py-2 text-xs font-bold transition ${on ? 'bg-white text-slate-950' : 'border border-white/15 text-slate-300 hover:bg-white/10'}`;
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
      <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-900 bg-slate-950 p-7 text-white shadow-xl sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute -right-20 -top-32 h-[28rem] w-[28rem] rounded-full border border-blue-500/10" />
        <div className="pointer-events-none absolute -right-4 -top-16 h-[20rem] w-[20rem] rounded-full border border-blue-500/10" />
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-blue-400">Plan finder</span>
            <h2 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-[-.05em] sm:text-5xl">Not sure which plan? Answer two questions.</h2>
            <div className="mt-8 space-y-6">
              <div>
                <p className="mb-2 text-xs text-slate-400">How many campaigns will you publish in a day?</p>
                <div className="flex flex-wrap gap-2">{[['1', '1 or fewer'], ['50', '2 to 50'], ['50+', 'More than 50']].map(([k, l]) => <button key={k} onClick={() => setPerDay(k)} className={chip(perDay === k)}>{l}</button>)}</div>
              </div>
              <div>
                <p className="mb-2 text-xs text-slate-400">What else do you need? (pick any)</p>
                <div className="flex flex-wrap gap-2">{NEEDS.map(([k, l]) => <button key={k} onClick={() => toggle(k)} aria-pressed={needs.includes(k)} className={chip(needs.includes(k))}>{l}</button>)}</div>
              </div>
            </div>
          </div>
          <div className="rounded-[1.6rem] bg-white p-7 text-slate-900 shadow-2xl shadow-black/30">
            <p className="text-xs font-semibold text-slate-400">We would pick</p>
            <p className="mt-1 font-['Manrope'] text-4xl font-extrabold tracking-[-.04em] text-slate-950">{plan.name}</p>
            <p className="mt-1 text-sm font-bold text-blue-600">{plan.price}<span className="font-medium text-slate-400"> / month</span></p>
            <p className="mt-4 text-sm leading-7 text-slate-600">{why}</p>
            {plan.id === 'free' ? (
              <Link to="/signup" className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700">{plan.cta} <ArrowRight className="h-4 w-4" /></Link>
            ) : (
              <button onClick={() => window.handleBrandCheckout(plan)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700">{plan.cta} <ArrowRight className="h-4 w-4" /></button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const Cell = ({ v, bold }) =>
  typeof v === 'boolean' ? (v ? <Check className="mx-auto h-4 w-4 text-blue-600" aria-label="Included" /> : <Minus className="mx-auto h-4 w-4 text-slate-300" aria-label="Not included" />)
    : <span className={bold ? 'font-bold text-slate-900' : 'font-medium text-slate-600'}>{v}</span>;

export default function HowItWorks() {
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
        message: 'Please log in to your brand account to upgrade your plan.',
        primary: { label: 'Log in', onClick: () => navigate('/login') },
        secondary: { label: 'Not now' },
      });
    }

    if (user.role !== 'brand') {
      return showNotice({
        tone: 'error',
        title: 'Brand plans only',
        message: `You’re signed in as a ${user.role || 'different'} account. These plans are for brand accounts. Please view the creator plans instead.`,
        primary: { label: 'View creator plans', onClick: () => navigate('/creator-pricing') },
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
    const fullName = user.name || 'Brand Owner';
    const contact = (user.phone || '').replace(/^\+91/, '');

    try {
      const orderData = await createPaymentOrder({
        email,
        fullName,
        planId: `brand_${plan.id}`,
        userRole: 'BRAND',
        amount: plan.amount,
      });

      const options = {
        key: orderData.razorpayKeyId,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        name: 'Brand Collabz',
        description: `Brand Subscription - ${plan.name}`,
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
              message: `Welcome to Brand ${plan.name}. Your plan is now active.`,
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
  window.handleBrandCheckout = handleCheckout;

  return (
    <div className="ih-page bg-[#fafbfc] text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      <CheckoutOverlay loading={loading} notice={notice} onClose={closeNotice} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
        .ih-page{font-family:'DM Sans',sans-serif;background:#fafbfc;color:#0f172a}
        .ih-page h1,.ih-page h2,.ih-page h3,.ih-page .font-display{font-family:'Manrope','DM Sans',sans-serif}
        .ih-page img{display:block}
        .ih-page .ih-image{transition:transform .7s cubic-bezier(.2,.7,.2,1)}
        .ih-page a:focus-visible,.ih-page button:focus-visible,.ih-page input:focus-visible{outline:3px solid #2563eb;outline-offset:3px}
        .ih-page .ih-kicker{letter-spacing:.16em;text-transform:uppercase}
        @media(prefers-reduced-motion:reduce){.ih-page *{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
      `}</style>

      <Hero />

      {/* ============ PLANS ============ */}
      <section id="plans" className="mx-auto max-w-7xl scroll-mt-6 px-5 py-20 lg:px-8 lg:py-24">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_.65fr] lg:items-end">
          <div>
            <span className="ih-kicker text-[10px] font-bold text-blue-600">Plans</span>
            <h2 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-[-.05em] text-slate-950 sm:text-5xl">Pick the access you need. <span className="text-blue-600">Nothing more.</span></h2>
          </div>
          <p className="max-w-md text-sm font-normal leading-7 text-slate-600 lg:justify-self-end">Prices are per month. Switch or cancel anytime, and we never take a cut of your creator deals.</p>
        </div>
        <div className="grid items-stretch gap-4 md:grid-cols-3">
          {PLANS.map((p) => (
            <article key={p.id} className={`relative flex flex-col justify-between rounded-[1.8rem] border p-7 sm:p-8 ${p.dark ? 'border-slate-900 bg-slate-950 text-white shadow-xl md:-translate-y-3' : 'border-slate-200/90 bg-white shadow-xs transition-colors hover:border-slate-300'}`}>
              <div>
                <div className="flex min-h-7 items-center justify-between">
                  <h3 className="text-lg font-extrabold">{p.name}</h3>
                  {p.badge && <span className="rounded-full bg-blue-600 px-3 py-1 text-[11px] font-bold text-white">{p.badge}</span>}
                </div>
                <p className={`mt-1 text-xs ${p.dark ? 'text-slate-400' : 'text-slate-500'}`}>{p.blurb}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-['Manrope'] text-5xl font-extrabold tracking-[-.05em]">{p.price}</span>
                  <span className={`text-sm ${p.dark ? 'text-slate-400' : 'text-slate-400'}`}>/ month</span>
                </div>
                <p className={`mt-1 text-xs font-semibold ${p.dark ? 'text-blue-300' : 'text-blue-600'}`}>{p.perDay}</p>
                <ul className={`mt-6 space-y-3.5 border-t pt-6 text-sm ${p.dark ? 'border-white/10 text-slate-300' : 'border-slate-100 text-slate-600'}`}>
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3"><span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${p.dark ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}><Check className="h-3 w-3" /></span>{f}</li>
                  ))}
                </ul>
              </div>
              {p.id === 'free' ? (
                <Link to={p.to} className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3.5 text-sm font-bold text-slate-800 shadow-2xs transition hover:-translate-y-0.5 hover:bg-slate-50">{p.cta} <ArrowRight className="h-4 w-4" /></Link>
              ) : (
                <button onClick={() => handleCheckout(p)} className={`mt-8 flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition hover:-translate-y-0.5 ${p.dark ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-500' : 'bg-slate-900 text-white shadow-xs hover:bg-slate-800'}`}>{p.cta} <ArrowRight className="h-4 w-4" /></button>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ============ COMPARE TABLE ============ */}
      <section className="border-y border-slate-200/80 bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="mb-10 text-center">
            <span className="ih-kicker text-[10px] font-bold text-blue-600">Side by side</span>
            <h2 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-[-.05em] text-slate-950 sm:text-5xl">Every feature, every plan.</h2>
          </div>
          <div className="overflow-hidden rounded-[1.8rem] border border-slate-200/90 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 font-['Manrope'] text-sm font-extrabold text-slate-900">
                    <th className="px-6 py-4 font-extrabold">Feature</th>
                    <th className="px-4 py-4 text-center font-extrabold">Free</th>
                    <th className="bg-blue-50/60 px-4 py-4 text-center font-extrabold text-blue-700">Pro</th>
                    <th className="px-4 py-4 text-center font-extrabold">Unlimited</th>
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
            <div className="group relative min-h-[360px] overflow-hidden rounded-[2rem] border border-slate-900 bg-slate-950 shadow-xl">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85" alt="Marketing team planning a creator campaign" className="ih-image absolute inset-0 h-full w-full object-cover opacity-80 group-hover:scale-[1.035]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
              <div className="relative flex h-full min-h-[360px] flex-col justify-end p-7 text-white sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-blue-300">Live in minutes</p>
                <h3 className="mt-3 max-w-sm text-3xl font-extrabold leading-tight tracking-[-.04em]">From sign-up to your first creator reply.</h3>
              </div>
            </div>
            <div>
              <span className="ih-kicker text-[10px] font-bold text-blue-600">How it works</span>
              <h2 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-[-.05em] text-slate-950 sm:text-5xl">Four steps to a running campaign.</h2>
              <ol className="mt-8 space-y-3">
                {STEPS.map(([Icon, t, d], i) => (
                  <li key={t} className="flex items-start gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Icon className="h-5 w-5" /></span>
                    <div className="min-w-0 flex-1"><p className="text-sm font-extrabold text-slate-950">{t}</p><p className="mt-0.5 text-xs leading-6 text-slate-500">{d}</p></div>
                    <span className="font-['Manrope'] text-sm font-bold text-slate-300">0{i + 1}</span>
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
            <span className="ih-kicker text-[10px] font-bold text-blue-600">Got questions?</span>
            <h2 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-[-.05em] text-slate-950 sm:text-5xl">Pricing questions, answered.</h2>
          </div>
          <p className="max-w-sm text-sm font-normal leading-7 text-slate-600">Start on Free and upgrade only when a limit gets in your way.</p>
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
                      {q}<ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                    </button>
                    {open && <p className="-mt-1 px-5 pb-5 text-sm font-normal leading-7 text-slate-600">{a}</p>}
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
            <div className="pointer-events-none absolute -right-20 -top-32 h-[28rem] w-[28rem] rounded-full border border-blue-500/10" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-[24rem] w-[24rem] rounded-full border border-blue-500/10" />
            <h2 className="relative mx-auto max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-[-.05em] sm:text-5xl">Ready to find your next creator?</h2>
            <p className="relative mx-auto mt-5 max-w-lg text-sm font-normal leading-7 text-slate-300">Publish your first campaign today. It costs nothing to start.</p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/signup" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-500">Start for free <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/campaigns" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900">Browse campaigns <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}