import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { trackConversion } from "../services/analytics";
import {
  ArrowLeft, ArrowUpRight, Camera, Check, ChevronLeft, ChevronRight, Clock3,
  ExternalLink, Gift, Heart, MapPin, Package, RotateCw, Share2, UserRound,
  Users, Wallet,
} from "lucide-react";
import { useAnalytics } from "../hooks/useAnalytics";

/* ------------------------------ Config ------------------------------ */

const API_BASE = "https://adrovis-influencer-backend.onrender.com";
const SAVED_KEY = "collabhub:saved-campaigns";
const DAY_MS = 86_400_000;
const ROTATE_MS = 4000;
const FONT = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";
const CARD = "rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]";
const BRAND_STYLES = {
  nykaa: { bg: "#fce8ee", color: "#d12c62" },
  plum: { bg: "#f3e8ff", color: "#7c3aed" },
  ponds: { bg: "#e8f3f8", color: "#397d9e" },
  minimalist: { bg: "#eeeeeb", color: "#55564e" },
  "earth rhythm": { bg: "#eef2f7", color: "#475a78" },
  mamaearth: { bg: "#eef2f7", color: "#475a78" },
  puma: { bg: "#eeeeee", color: "#252525" },
  swiggy: { bg: "#fff0e4", color: "#e87924" },
  boat: { bg: "#f0eafa", color: "#6741a0" },
};

const GENDER_LABELS = {
  ANY: "All creators",
  NOT_SPECIFIED: "All creators",
  FEMALE_ONLY: "Female only",
  MALE_ONLY: "Male only",
};

const EMPTY_VALUES = ["NOT SPECIFIED", "UNKNOWN", "NOT_SPECIFIED", "NONE"];

/* ------------------------------ Helpers ------------------------------ */

const brandStyle = (name = "") =>
  BRAND_STYLES[name.toLowerCase()] || { bg: "#eff6ff", color: "#1d4ed8" };
const unwrap = (result) => result?.data?.data ?? result?.data ?? null;
const inr = (value) => `₹${Number(value).toLocaleString("en-IN")}`;
const isPaidCampaign = (c) => c?.campaignType?.toUpperCase() === "PAID";

const typeLabel = (c) => {
  const t = String(c?.campaignType || "").toUpperCase();
  if (t === "PAID") return "Paid";
  if (t === "BARTER") return "Barter";
  return "Collaboration";
};

const hasText = (value) =>
  typeof value === "string" &&
  value.trim() !== "" &&
  !EMPTY_VALUES.includes(value.trim().toUpperCase());

const parseDate = (value) => {
  if (!value || typeof value !== "string") return null;
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T23:59:59`)
    : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDate = (date) =>
  date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const shortNum = (value) => {
  const n = Number(value);
  if (!n || Number.isNaN(n) || n <= 0) return null;
  return n >= 1000
    ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`
    : n.toLocaleString("en-IN");
};

const formatFollowers = (value) => {
  const s = shortNum(value);
  return s ? `${s}+` : null;
};

const uniqueStrings = (list) => [
  ...new Set(
    (list || [])
      .filter((item) => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean)
  ),
];

const getReward = (campaign) => {
  const comp = campaign?.compensation || {};

  if (isPaidCampaign(campaign)) {
    const payout = hasText(comp.creator_payout) ? comp.creator_payout : null;
    const amount =
      (payout && /\d/.test(payout) ? payout.replace(/\s*-\s*/g, " – ") : null) ||
      (comp.payout_amount_inr ? inr(comp.payout_amount_inr) : null);
    const hasTiers = comp.payout_tiers?.length > 1;
    const value = amount || payout || "Paid";
    return {
      value,
      caption: hasTiers ? "Cash payout, by followers" : "Cash payout",
      short: value,
    };
  }

  const raw = hasText(comp.product_value) ? comp.product_value.trim() : null;
  const amount = comp.product_value_inr
    ? inr(comp.product_value_inr)
    : raw && /\d/.test(raw)
    ? raw.replace(/^upto\s*/i, "Up to ").replace(/^Rs\.?\s*/i, "₹")
    : null;
  return {
    value: amount || "Free product",
    caption: amount ? "Free product, worth" : "Product barter",
    short: amount ? `Product ${amount}` : "Free product",
  };
};

const getStatus = (campaign) => {
  const rawDeadline = campaign?.schedule?.application_deadline;
  if (hasText(rawDeadline) && /rolling/i.test(rawDeadline)) {
    return { closed: false, urgent: false, label: "Rolling applications" };
  }

  const applyBy = parseDate(rawDeadline);
  const deadline = applyBy || parseDate(campaign?.expiresAt);
  if (!deadline) return { closed: false, urgent: false, label: null };

  const diff = deadline.getTime() - Date.now();
  if (diff < 0) return { closed: true, urgent: false, label: "Applications closed" };
  if (diff < DAY_MS) return { closed: false, urgent: true, label: "Closes today" };

  const days = Math.ceil(diff / DAY_MS);
  if (days <= 14)
    return { closed: false, urgent: true, label: `${days} days left to apply` };

  return {
    closed: false,
    urgent: false,
    label: `${applyBy ? "Apply by" : "Open until"} ${formatDate(deadline)}`,
  };
};

const getApplyUrl = (campaign) => {
  try {
    const { pathname, search } = new URL(campaign.applyProxyUrl);
    return `${API_BASE}${pathname}${search}`;
  } catch {
    return `${API_BASE}/api/v1/campaigns/${campaign.id}/apply`;
  }
};

const prettyUrl = (url) => {
  try {
    const { hostname, pathname } = new URL(url);
    const path = pathname === "/" ? "" : pathname;
    return `${hostname.replace(/^www\./, "")}${path}`;
  } catch {
    return url;
  }
};

const readSaved = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(SAVED_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const scheduleValue = (value) => {
  if (!hasText(value)) return null;
  const date = parseDate(value);
  if (!date) return { text: value.trim(), passed: false };
  return { text: formatDate(date), passed: date.getTime() < Date.now() };
};

const getProductText = (campaign) => {
  const comp = campaign?.compensation || {};
  if (hasText(campaign?.productName)) return campaign.productName.trim();

  const provided = String(comp.product_provided || "").trim();
  const up = provided.toUpperCase();
  if (up === "YES" || up === "TRUE") {
    return hasText(comp.product_value) && /\d/.test(comp.product_value)
      ? `Gifted, worth ${comp.product_value.replace(/^upto\s*/i, "")}`
      : "Gifted by brand";
  }
  if (up === "NO" || up === "FALSE") return "No product";
  if (hasText(provided)) return provided;
  return null;
};

const tierName = (tier) =>
  (tier.follower_range || "Tier").replace(/\s*creators?$/i, "");

const tierRange = (tier) => {
  const min = shortNum(tier.min_followers);
  const max = shortNum(tier.max_followers);
  if (min && max) return `${min}–${max}`;
  if (min) return `${min}+`;
  return "";
};

/* ------------------------------- Hooks ------------------------------- */

function useSavedCampaign(id) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(readSaved().includes(id));
  }, [id]);

  const toggle = useCallback(() => {
    const list = readSaved();
    const next = list.includes(id) ? list.filter((i) => i !== id) : [...list, id];
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
    setSaved(next.includes(id));
  }, [id]);

  return [saved, toggle];
}

function useIsVisible(ref) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return visible;
}

/* --------------------------- Building blocks --------------------------- */

function BrandMark({ brand, size = 40 }) {
  const { bg, color } = brandStyle(brand);
  return (
    <span
      aria-hidden="true"
      className="grid shrink-0 place-items-center rounded-xl font-bold"
      style={{ width: size, height: size, fontSize: size * 0.42, backgroundColor: bg, color }}
    >
      {brand.charAt(0).toUpperCase()}
    </span>
  );
}

function FramedImage({ src, alt, className = "", lazy = false }) {
  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading={lazy ? "lazy" : undefined}
        className="absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-2xl"
      />
      <img
        src={src}
        alt={alt}
        loading={lazy ? "lazy" : undefined}
        decoding="async"
        className="relative h-full w-full object-contain"
      />
    </div>
  );
}

function IconButton({ label, onClick, to, children, active = false }) {
  const cls = `grid h-10 w-10 shrink-0 place-items-center rounded-xl transition ${FOCUS} ${
    active
      ? "bg-blue-50 text-blue-600 ring-1 ring-blue-200"
      : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-900"
  }`;

  if (to)
    return (
      <Link to={to} aria-label={label} className={cls}>
        {children}
      </Link>
    );

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active || undefined}
      className={cls}
    >
      {children}
    </button>
  );
}

function ApplyButton({ url, closed, campaignId, onApply, className = "" }) {
  if (closed) {
    return (
      <span
        aria-disabled="true"
        className={`flex h-12 items-center justify-center rounded-xl bg-slate-100 px-6 text-sm font-bold text-slate-400 ${className}`}
      >
        Applications closed
      </span>
    );
  }

  const handleClick = () => {
    trackConversion(campaignId);
    if (onApply) onApply();
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      onClick={handleClick}
      className={`flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 ${FOCUS} ${className}`}
    >
      Apply now
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}

function SectionTitle({ children, count }) {
  return (
    <h2 className="mb-2.5 text-sm font-semibold text-slate-900">
      {children}
      {count > 0 && <span className="ml-1.5 font-medium text-slate-400">{count}</span>}
    </h2>
  );
}

function CheckList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <Check size={15} strokeWidth={2.5} className="mt-[3px] shrink-0 text-blue-600" aria-hidden="true" />
          <span className="text-[13.5px] leading-6 text-slate-600">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Fact({ icon: Icon, label, value }) {
  return (
    <div className="min-w-0 px-4 py-3">
      <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Icon size={13} className="text-slate-400" aria-hidden="true" />
        {label}
      </p>
      <p title={value} className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-slate-900">
        {value}
      </p>
    </div>
  );
}

/* ------------------------------- Gallery ------------------------------- */

function ImageLayer({ src, alt, active, eager, onError }) {
  return (
    <div
      aria-hidden={!active}
      className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${
        active ? "z-10 opacity-100" : "z-0 opacity-0"
      }`}
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-2xl"
      />
      <img
        src={src}
        alt={active ? alt : ""}
        loading={eager ? undefined : "lazy"}
        decoding="async"
        onError={onError}
        className="relative h-full w-full object-contain"
      />
    </div>
  );
}

function Gallery({ images, brand }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(() => new Set());
  const touchX = useRef(null);

  const visible = useMemo(() => images.filter((s) => !failed.has(s)), [images, failed]);
  const count = visible.length;
  const current = count ? index % count : 0;

  const go = useCallback((step) => {
    if (count > 1) setIndex((current + step + count) % count);
  }, [count, current]);

  useEffect(() => {
    if (count < 2 || paused) return undefined;
    const timer = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [count, paused]);

  const { bg, color } = brandStyle(brand);

  if (!count) {
    return (
      <div className="grid aspect-[4/3] min-h-[320px] place-items-center rounded-2xl" style={{ backgroundColor: bg }}>
        <span className="grid h-20 w-20 place-items-center rounded-2xl bg-white text-3xl font-bold shadow-sm" style={{ color }}>
          {brand.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={`${brand} campaign images`}
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
      }}
      className={`grid min-w-0 grid-cols-[minmax(0,1fr)_76px] gap-3 ${FOCUS}`}
    >
      <div className="relative aspect-[4/3] min-h-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm sm:min-h-[420px] lg:aspect-auto lg:min-h-[500px]">
        {visible.map((src, i) => (
          <ImageLayer
            key={src}
            src={src}
            active={i === current}
            eager={i === 0}
            alt={`${brand} campaign image ${i + 1} of ${count}`}
            onError={() => setFailed((prev) => new Set(prev).add(src))}
          />
        ))}
        <div className="absolute left-4 top-4 z-20 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
          {brand}
        </div>
        {count > 1 && (
          <>
            <div className="absolute right-4 top-4 z-20 rounded-full bg-slate-950/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
              {current + 1} / {count}
            </div>
            <button type="button" onClick={() => go(-1)} aria-label="Previous image"
              className={`absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/95 text-slate-800 shadow-lg transition hover:scale-105 ${FOCUS}`}>
              <ChevronLeft size={19} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next image"
              className={`absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/95 text-slate-800 shadow-lg transition hover:scale-105 ${FOCUS}`}>
              <ChevronRight size={19} />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="flex min-w-0 flex-col gap-2 overflow-y-auto pr-1">
          {visible.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === current}
              className={`aspect-square w-full shrink-0 overflow-hidden rounded-xl border-2 bg-slate-100 transition ${FOCUS} ${
                i === current ? "border-blue-600 p-0.5 shadow-md shadow-blue-100" : "border-transparent opacity-75 hover:border-slate-300 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full rounded-lg object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ----------------------------- Campaign view ----------------------------- */

function CampaignView({ campaign, related, onApply }) {
  const [saved, toggleSaved] = useSavedCampaign(campaign.id);
  const [copied, setCopied] = useState(false);
  const [showAllGuidelines, setShowAllGuidelines] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const ctaRef = useRef(null);
  const ctaVisible = useIsVisible(ctaRef);

  const brand = campaign.brandName || "Brand";
  const isPaid = isPaidCampaign(campaign);
  const comp = campaign.compensation || {};
  const eligibility = campaign.eligibility || {};
  const schedule = campaign.schedule || {};

  const images = useMemo(() => uniqueStrings(campaign.images), [campaign.images]);
  const categories = uniqueStrings(campaign.categories);
  const deliverables = uniqueStrings(campaign.deliverables);
  const locations = uniqueStrings(eligibility.locations);
  const references = uniqueStrings(campaign.referenceLinks);
  const tiers = comp.payout_tiers || [];
  const requirements = uniqueStrings([
    ...(campaign.importantRequirements || []),
    ...(eligibility.other_requirements || []),
  ]);

  const reward = getReward(campaign);
  const status = getStatus(campaign);
  const applyUrl = getApplyUrl(campaign);
  const followers =
    formatFollowers(eligibility.minimum_followers) ||
    (hasText(eligibility.minimum_followers_display) && eligibility.minimum_followers_display !== "0+"
      ? eligibility.minimum_followers_display : null);
  const gender = GENDER_LABELS[eligibility.gender] ||
    (eligibility.gender ? String(eligibility.gender).replaceAll("_", " ").toLowerCase() : "All creators");
  const product = getProductText(campaign);
  const description = hasText(campaign.description)
    ? campaign.description.trim()
    : `${brand} is looking for creators to collaborate on this campaign. Review the requirements and apply if this opportunity is right for you.`;

  const rawDetails = hasText(comp.compensation_details) ? comp.compensation_details.trim() : null;
  const details = rawDetails && !(tiers.length > 0 && tiers.some((t) => t.payout_display && rawDetails.includes(t.payout_display)))
    ? rawDetails : null;

  const timeline = [
    ["Application deadline", scheduleValue(schedule.application_deadline)],
    ["Content submission", scheduleValue(schedule.content_submission_deadline)],
    ["Content goes live", scheduleValue(schedule.go_live_date)],
    ["Campaign closes", scheduleValue(campaign.expiresAt)],
  ].filter(([, value]) => value);

  const posted = parseDate(campaign.createdAt);
  const views = Number.isFinite(Number(campaign.viewsCount)) ? Number(campaign.viewsCount) : 0;
  const clicks = Number.isFinite(Number(campaign.clicksCount)) ? Number(campaign.clicksCount) : 0;
  const meta = [
    posted && `Published ${formatDate(posted)}`,
    `${(views + 200).toLocaleString("en-IN")} views`,
    `${(clicks + 200).toLocaleString("en-IN")} apply clicks`,
  ].filter(Boolean);

  const handleShare = async () => {
    const data = { title: `${campaign.campaignTitle} | Brand Collabz`, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(data.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch { /* share dismissed */ }
  };

  const visibleRequirements = showAllGuidelines ? requirements : requirements.slice(0, 4);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link to="/campaigns" className={`inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 ${FOCUS}`}>
          <ArrowLeft size={16} /> All campaigns
        </Link>
        <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Live creator opportunity
        </div>
      </div>

      {/* Main campaign hero: balanced gallery and campaign summary */}
      <div className="grid items-stretch gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_8px_30px_rgba(15,23,42,0.05)] sm:p-4">
          <Gallery images={images} brand={brand} />
          {references.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
              {references.map((url) => (
                <a key={url} href={url} target="_blank" rel="noreferrer"
                  className={`inline-flex max-w-full items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50 ${FOCUS}`}>
                  <ExternalLink size={12} /><span className="truncate">{prettyUrl(url)}</span>
                </a>
              ))}
            </div>
          )}
        </section>

        <section className={`${CARD} flex min-w-0 flex-col overflow-hidden`}>
          <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
            <BrandMark brand={brand} size={46} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-extrabold text-slate-950">{brand}</p>
              <p className="mt-0.5 text-xs font-medium text-slate-500">{typeLabel(campaign)} campaign</p>
            </div>
            <IconButton label={saved ? "Remove from saved" : "Save campaign"} onClick={toggleSaved} active={saved}>
              <Heart size={18} fill={saved ? "currentColor" : "none"} />
            </IconButton>
            <IconButton label="Share campaign" onClick={handleShare}><Share2 size={17} /></IconButton>
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <h1 className="text-[clamp(1.4rem,2.2vw,2rem)] font-extrabold leading-[1.15] tracking-tight text-slate-950">
                  {campaign.campaignTitle}
                </h1>
                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <span key={category} className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{category}</span>
                  ))}
                  {campaign.brandInstagramUrl && (
                    <a href={campaign.brandInstagramUrl} target="_blank" rel="noreferrer"
                      className={`inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-blue-200 hover:text-blue-700 ${FOCUS}`}>
                      <Camera size={12} /> Instagram <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
              <div ref={ctaRef} className="w-full shrink-0 sm:w-40">
                <ApplyButton url={applyUrl} closed={status.closed} campaignId={campaign.id} onApply={onApply} className="w-full" />
                {status.label && <p className={`mt-2 flex items-center justify-center gap-1.5 text-xs font-semibold ${status.urgent ? "text-amber-600" : "text-slate-500"}`}><Clock3 size={12} />{status.label}</p>}
              </div>
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
              {showDescription || description.length <= 190 ? description : `${description.slice(0, 190).trim()}…`}
              {description.length > 190 && (
                <button type="button" onClick={() => setShowDescription((v) => !v)} className="ml-1 font-bold text-blue-600 hover:text-blue-700">
                  {showDescription ? "Show less" : "Read more"}
                </button>
              )}
            </p>

            {/* Compensation: all tiers stay on one clean row on desktop */}
            <div className={`mt-5 grid gap-2 ${tiers.length ? "grid-cols-2 lg:grid-cols-5" : "grid-cols-2"}`}>
              <div className={`rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-4 ${tiers.length ? "col-span-2" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
                    {isPaid ? <Wallet size={19} /> : <Gift size={19} />}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-500">{reward.caption}</p>
                    <p className="break-words text-xl font-extrabold tracking-tight text-slate-950">{reward.value}</p>
                  </div>
                </div>
                {details && <p className="mt-2 text-xs leading-5 text-slate-600">{details}</p>}
              </div>
              {tiers.length > 0 ? tiers.slice(0, 3).map((tier, i) => {
                const range = tierRange(tier);
                return (
                  <div key={`${tier.follower_range}-${i}`} className="flex min-w-0 flex-col justify-center rounded-2xl border border-slate-200 bg-white p-3">
                    <p className="truncate text-xs font-semibold text-slate-500">{tierName(tier)}</p>
                    {range && <p className="truncate text-[11px] text-slate-400">{range}</p>}
                    <p className="mt-1 break-words text-base font-extrabold text-slate-900">{tier.payout_display || (tier.payout_inr ? inr(tier.payout_inr) : "—")}</p>
                  </div>
                );
              }) : (
                <div className="flex flex-col justify-center rounded-2xl border border-slate-200 bg-white p-3">
                  <p className="text-xs font-semibold text-slate-500">Collaboration type</p>
                  <p className="mt-1 text-base font-extrabold text-slate-900">{typeLabel(campaign)}</p>
                </div>
              )}
            </div>

            {/* Eligibility facts use equal-width cells and never spill out */}
            <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 sm:grid-cols-4">
              <Fact icon={Users} label="Followers" value={followers ? `${followers} followers` : "Open to all"} />
              <Fact icon={UserRound} label="Eligible creators" value={gender} />
              <Fact icon={MapPin} label="Location" value={locations.length ? locations.join(", ") : "Pan India"} />
              <Fact icon={Package} label="Product" value={product || "Shared after selection"} />
            </div>
          </div>
        </section>
      </div>

      {/* Timeline spans the full page width to visually connect both columns */}
      {timeline.length > 0 && (
        <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">Key dates</p>
              <h2 className="mt-1 text-base font-extrabold text-slate-950">Campaign timeline</h2>
            </div>
            <span className="hidden rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500 sm:inline-flex">Stay on schedule</span>
          </div>
          <div className={`grid grid-cols-2 gap-3 ${timeline.length >= 4 ? "lg:grid-cols-4" : "sm:grid-cols-4"}`}>
            {timeline.map(([label, value], i) => {
              const Icon = i === 0 ? Clock3 : i === 1 ? Camera : i === 2 ? Check : Package;
              return (
                <div key={label} className="flex min-w-0 items-start gap-3 rounded-2xl bg-slate-50 p-3 sm:p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-blue-600 shadow-sm"><Icon size={17} /></span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-500">{label}</p>
                    <p className={`mt-1 break-words text-sm font-bold leading-snug ${value.passed ? "text-slate-400 line-through" : "text-slate-900"}`}>{value.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Deliverables and requirements share a single aligned row */}
      <div className="mt-5 grid items-stretch gap-5 lg:grid-cols-2">
        <section className={`${CARD} min-w-0 p-5 sm:p-6`}>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-600">What you'll create</p>
              <SectionTitle count={deliverables.length}>Deliverables</SectionTitle>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600"><Camera size={18} /></span>
          </div>
          {deliverables.length ? <CheckList items={deliverables} /> : <p className="text-sm leading-6 text-slate-500">Deliverables will be shared by the brand during the selection process.</p>}
          {campaign.adRights && <p className="mt-5 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-600"><span className="font-bold text-slate-800">Usage rights: </span>{campaign.adRights}</p>}
        </section>

        <section className={`${CARD} min-w-0 p-5 sm:p-6`}>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-600">Before you apply</p>
              <SectionTitle count={requirements.length}>Campaign guidelines</SectionTitle>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600"><Check size={18} /></span>
          </div>
          {requirements.length ? (
            <>
              <CheckList items={visibleRequirements} />
              {requirements.length > 4 && (
                <button type="button" onClick={() => setShowAllGuidelines((v) => !v)} className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700">
                  {showAllGuidelines ? "Show less" : `View all ${requirements.length} guidelines`}
                  <ChevronRight size={14} className={showAllGuidelines ? "-rotate-90" : "rotate-90"} />
                </button>
              )}
            </>
          ) : <p className="text-sm leading-6 text-slate-500">No additional guidelines have been provided for this campaign.</p>}
        </section>
      </div>

      {/* Campaign story and quick facts */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <section className={`${CARD} min-w-0 p-5 sm:p-6`}>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-600">The opportunity</p>
          <h2 className="mt-1 text-lg font-extrabold tracking-tight text-slate-950">About this campaign</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {showDescription || description.length <= 260 ? description : `${description.slice(0, 260).trim()}…`}
          </p>
          {description.length > 260 && (
            <button type="button" onClick={() => setShowDescription((v) => !v)} className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-700">
              {showDescription ? "Read less" : "Read full brief"}
            </button>
          )}
        </section>

        <section className={`${CARD} min-w-0 p-5 sm:p-6`}>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-600">At a glance</p>
          <h2 className="mt-1 text-lg font-extrabold tracking-tight text-slate-950">Campaign information</h2>
          <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-5">
            <div><p className="text-xs font-medium text-slate-500">Published</p><p className="mt-1 text-sm font-bold text-slate-900">{posted ? formatDate(posted) : "Recently"}</p></div>
            <div><p className="text-xs font-medium text-slate-500">Campaign views</p><p className="mt-1 text-sm font-bold text-slate-900">{(views + 200).toLocaleString("en-IN")}</p></div>
            <div><p className="text-xs font-medium text-slate-500">Apply clicks</p><p className="mt-1 text-sm font-bold text-slate-900">{(clicks + 200).toLocaleString("en-IN")}</p></div>
            <div><p className="text-xs font-medium text-slate-500">Category</p><p className="mt-1 truncate text-sm font-bold text-slate-900">{categories.join(", ") || "General"}</p></div>
          </div>
        </section>
      </div>

      {/* Related opportunities */}
      {related.length > 0 && (
        <section className="mt-10 lg:mt-14">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">Discover opportunities</p>
              <h2 className="mt-1 text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">More live campaigns</h2>
            </div>
            <Link to="/campaigns" className={`inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 ${FOCUS}`}>Explore all <ArrowUpRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {related.slice(0, 3).map((item) => (
              <Link key={item.id} to={`/campaigns/${item.id}`}
                className={`group flex min-w-0 gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/5 ${FOCUS}`}>
                {item.images?.[0] ? <FramedImage src={item.images[0]} alt="" lazy className="h-28 w-28 shrink-0 rounded-xl sm:h-32 sm:w-32" /> : (
                  <div className="grid h-28 w-28 shrink-0 place-items-center rounded-xl text-2xl font-bold sm:h-32 sm:w-32" style={{ backgroundColor: brandStyle(item.brandName).bg, color: brandStyle(item.brandName).color }}>{(item.brandName || "B").charAt(0)}</div>
                )}
                <div className="flex min-w-0 flex-1 flex-col py-1">
                  <p className="truncate text-xs font-bold text-slate-500">{item.brandName || "Brand"}</p>
                  <h3 className="mt-1 line-clamp-3 text-sm font-bold leading-5 text-slate-900 transition group-hover:text-blue-700">{item.campaignTitle}</h3>
                  <p className="mt-auto pt-2 text-sm font-extrabold text-blue-600">{getReward(item).short}</p>
                </div>
                <span className="my-auto hidden h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 text-blue-600 transition group-hover:border-blue-200 group-hover:bg-blue-50 sm:grid"><ArrowUpRight size={17} /></span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Sticky mobile application action */}
      <div className={`fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 pt-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-transform duration-200 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden ${ctaVisible ? "translate-y-full" : "translate-y-0"}`} aria-hidden={ctaVisible}>
        <div className="mx-auto flex max-w-md items-center gap-4">
          <div className="min-w-0 flex-1"><p className="truncate text-base font-extrabold text-slate-950">{reward.short}</p>{status.label && <p className={`truncate text-xs ${status.urgent ? "text-amber-600" : "text-slate-500"}`}>{status.label}</p>}</div>
          <ApplyButton url={applyUrl} closed={status.closed} campaignId={campaign.id} onApply={onApply} className="shrink-0" />
        </div>
      </div>

      {copied && <div role="status" className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white shadow-lg lg:bottom-8">Link copied to clipboard</div>}
    </>
  );
}

/* -------------------------------- States -------------------------------- */

function Skeleton() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Loading campaign">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-slate-200" />
        <div className="h-10 w-10 rounded-xl bg-slate-200" />
        <div className="h-4 w-32 rounded bg-slate-200" />
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-5">
        <div className="aspect-[4/3] rounded-2xl bg-slate-200 lg:aspect-[4/5]" />
        <div className="space-y-5">
          <div className="h-20 rounded-2xl bg-slate-200" />
          <div className="h-44 rounded-2xl bg-slate-200" />
          <div className="h-28 rounded-2xl bg-slate-200" />
          <div className="h-56 rounded-2xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="grid min-h-[55vh] place-items-center">
      <div className="max-w-md text-center">
        <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
          <Package size={22} aria-hidden="true" />
        </span>
        <h1 className="text-xl font-bold text-slate-900">Campaign unavailable</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{message}</p>
        <div className="mt-6 flex justify-center gap-3">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className={`inline-flex h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 ${FOCUS}`}
            >
              <RotateCw size={14} aria-hidden="true" />
              Try again
            </button>
          )}
          <Link
            to="/campaigns"
            className={`inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white hover:bg-blue-700 ${FOCUS}`}
          >
            <ArrowLeft size={15} aria-hidden="true" />
            All campaigns
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- Page ---------------------------------- */

export default function CampaignDetails() {
  const { id } = useParams();
  const { trackApplyConversion } = useAnalytics(id);

  const [state, setState] = useState({ status: "loading", campaign: null, error: "", retryable: true });
  const [related, setRelated] = useState([]);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!id) return undefined;
    const controller = new AbortController();

    setState({ status: "loading", campaign: null, error: "", retryable: true });
    window.scrollTo({ top: 0 });

    (async () => {
      try {
        const response = await fetch(`${API_BASE}/api/v1/campaigns/${id}`, {
          signal: controller.signal,
        });

        if (response.status === 404) {
          setState({
            status: "error",
            campaign: null,
            error: "This campaign brief doesn't exist or has expired.",
            retryable: false,
          });
          return;
        }
        if (!response.ok) throw new Error("Server error");

        const campaign = unwrap(await response.json());
        if (!campaign?.id) throw new Error("Missing campaign");

        setState({ status: "ready", campaign, error: "", retryable: true });
      } catch (err) {
        if (err.name === "AbortError") return;
        setState({
          status: "error",
          campaign: null,
          error: "We couldn't load this campaign brief. Check your connection and try again.",
          retryable: true,
        });
      }
    })();

    return () => controller.abort();
  }, [id, reloadKey]);

  useEffect(() => {
    if (!id) return undefined;
    const controller = new AbortController();

    (async () => {
      try {
        const params = new URLSearchParams({
          page: "0",
          size: "8",
          sortBy: "createdAt",
          sortDirection: "desc",
        });
        const response = await fetch(`${API_BASE}/api/v1/campaigns?${params}`, {
          signal: controller.signal,
        });
        if (!response.ok) return;
        const items = unwrap(await response.json())?.content || [];
        setRelated(items.filter((item) => item.id !== id).slice(0, 3));
      } catch {
        /* recommendation failures are non-blocking */
      }
    })();

    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    const title = state.campaign?.campaignTitle;
    if (title) document.title = `${title} | Brand Collabz`;
  }, [state.campaign]);

  return (
    <main
      style={{ fontFamily: FONT }}
      className="min-h-screen bg-[#f5f8ff] pb-28 lg:pb-16"
    >
      <div className="mx-auto w-full max-w-[1560px] px-4 py-5 sm:px-6 sm:py-6 lg:px-10 lg:py-8 2xl:px-12">
        {state.status === "loading" && <Skeleton />}

        {state.status === "error" && (
          <ErrorState
            message={state.error}
            onRetry={state.retryable ? () => setReloadKey((k) => k + 1) : null}
          />
        )}

        {state.status === "ready" && (
          <CampaignView
            key={state.campaign.id}
            campaign={state.campaign}
            related={related}
            onApply={trackApplyConversion}
          />
        )}
      </div>
    </main>
  );
}