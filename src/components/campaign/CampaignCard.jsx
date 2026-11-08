import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarClock,
  Gift,
  IndianRupee,
  MapPin,
  Package,
  Smartphone,
  Sparkles,
  Tag,
  Users,
} from "lucide-react";

import { trackConversion } from "../../services/analytics";
import { getApplyUrl, getStatus, uniqueStrings } from "../../utils/campaign";
// Used only as the shared 5s tick, so images change in step with the hero.
import useSpotlightIndex from "../../hooks/useSpotlightIndex";

const FONT =
  'Manrope, "Helvetica Neue", Helvetica, Arial, system-ui, sans-serif';

const preload = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });

/* =========================================
   DATA HELPERS
   ========================================= */

const inr = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

const getType = (campaign) => {
  const t = String(campaign?.campaignType || "").toUpperCase();
  if (t === "PAID") return "Paid";
  if (t === "BARTER") return "Barter";
  return "Collab";
};

const getReward = (campaign) => {
  const comp = campaign?.compensation || {};
  const type = getType(campaign);
  const payout = String(comp.creator_payout || "").trim();

  if (type === "Paid") {
    if (payout && /\d/.test(payout)) return payout.replace(/\s*-\s*/g, " – ");
    if (comp.payout_amount_inr) return inr(comp.payout_amount_inr);

    if (comp.payout_tiers?.length) {
      const min = Math.min(
        ...comp.payout_tiers.map((t) => t.payout_inr || Infinity)
      );
      if (Number.isFinite(min)) return `From ${inr(min)}`;
    }
    return "Quote your rate";
  }

  if (type === "Barter") {
    if (comp.product_value_inr) return `Product ${inr(comp.product_value_inr)}`;

    const value = String(comp.product_value || "").trim();
    if (/\d/.test(value)) {
      return `Product ${value
        .replace(/^upto\s*/i, "")
        .replace(/^Rs\.?\s*/i, "₹")}`;
    }
    return "Free product";
  }

  return "Shared on apply";
};

const getDeliverables = (campaign) => {
  const list = (campaign?.deliverables || []).filter(Boolean);
  if (!list.length) return "See brief";

  const first = list[0].replace(/Instagram\s+/i, "IG ");
  return list.length > 1 ? `${first} +${list.length - 1}` : first;
};

const getAudience = (campaign) => {
  const n = campaign?.eligibility?.minimum_followers;
  if (n && n > 0) return `${n >= 1000 ? `${Math.round(n / 1000)}k` : n}+ followers`;
  return "Open to all";
};

const typeLabel = (type) =>
  type === "Paid" ? "Paid collab" : type === "Barter" ? "Product barter" : "Open collab";

const firstText = (...vals) => {
  for (const v of vals) {
    const t = Array.isArray(v) ? v.filter(Boolean).join(", ") : v;
    if (t && String(t).trim()) return String(t).trim();
  }
  return "";
};

const getClosing = (campaign) => {
  const raw = campaign?.expiresAt || campaign?.expires_at || campaign?.deadline;
  if (!raw) return "";
  const ms = new Date(raw).getTime() - Date.now();
  if (Number.isNaN(ms)) return "";
  const days = Math.ceil(ms / 86400000);
  if (days < 0) return "Closed";
  if (days === 0) return "Today";
  if (days === 1) return "1 day left";
  if (days <= 30) return `${days} days left`;
  return new Date(raw).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

/* Up to 4 labelled facts. Optional fields only show when the campaign has them. */
const getFacts = (campaign, type) => {
  const facts = [
    { icon: Package, label: "Deliverable", value: getDeliverables(campaign) },
    { icon: Users, label: "Audience", value: getAudience(campaign) },
  ];

  const platform = firstText(campaign?.platform, campaign?.platforms);
  const category = firstText(campaign?.category, campaign?.categories);
  const location = firstText(campaign?.location, campaign?.city, campaign?.locations);
  const closing = getClosing(campaign);

  if (platform) facts.push({ icon: Smartphone, label: "Platform", value: platform });
  else if (category) facts.push({ icon: Tag, label: "Category", value: category });

  if (closing) facts.push({ icon: CalendarClock, label: "Closes", value: closing });
  else if (location) facts.push({ icon: MapPin, label: "Location", value: location });

  if (facts.length < 4) facts.push({ icon: Sparkles, label: "Collab type", value: typeLabel(type) });

  return facts.slice(0, 4);
};

/* =========================================
   CAMPAIGN CARD
   Brand row, title, reward, 4 labelled facts, View brief + Apply.
   Colours are fixed (slate + the site's blue). Only the image changes.
   ========================================= */

const CampaignCard = ({ campaign }) => {
  const tick = useSpotlightIndex();

  const [failed, setFailed] = useState(() => new Set());
  const [activeSrc, setActiveSrc] = useState(null);
  const [prevSrc, setPrevSrc] = useState(null);
  const [seen, setSeen] = useState(() => new Set());

  const images = useMemo(
    () =>
      uniqueStrings(campaign?.images || []).filter((src) => !failed.has(src)),
    [campaign?.images, failed]
  );

  const current = images.includes(activeSrc) ? activeSrc : images[0];

  const currentRef = useRef(current);
  currentRef.current = current;

  const applyLink = useMemo(() => {
    try {
      if (typeof getApplyUrl === "function") {
        const url = getApplyUrl(campaign);
        if (url && url !== "#" && url !== "undefined") return url;
      }
    } catch (_) {}

    return (
      campaign?.applyProxyUrl ||
      campaign?.applyUrl ||
      campaign?.apply_url ||
      campaign?.formUrl ||
      `/campaigns/${campaign?.id}`
    );
  }, [campaign]);

  /* Reset slideshow when campaign changes */
  useEffect(() => {
    setActiveSrc(null);
    setPrevSrc(null);
    setSeen(new Set());
    setFailed(new Set());
  }, [campaign?.id]);

  /* Preload next image */
  useEffect(() => {
    if (images.length < 2 || !current) return;
    preload(images[(images.indexOf(current) + 1) % images.length]);
  }, [current, images]);

  /* Swap image on every shared tick (every 5s, same moment as the hero) */
  const lastTick = useRef(tick);

  useEffect(() => {
    if (lastTick.current === tick) return undefined; // skip first mount
    lastTick.current = tick;

    if (images.length < 2 || document.hidden) return undefined;

    const shown = currentRef.current;
    const next = images[(images.indexOf(shown) + 1) % images.length];
    if (!next || next === shown) return undefined;

    let cancelled = false;

    preload(next).then((ok) => {
      if (cancelled) return;

      if (!ok) {
        setFailed((prev) => new Set(prev).add(next));
        return;
      }

      setSeen((prev) => new Set(prev).add(next));
      setPrevSrc(shown);
      setActiveSrc(next);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  if (!campaign) return null;

  const brand = campaign?.brandName || "Brand";
  const type = getType(campaign);
  const status = getStatus ? getStatus(campaign) : { closed: false };
  const reward = getReward(campaign);
  const isPaid = type === "Paid";
  const isExternal = /^https?:\/\//.test(applyLink);

  const brandLogo =
    campaign?.brandLogo ||
    campaign?.brand_logo ||
    campaign?.logoUrl ||
    campaign?.logo ||
    campaign?.brand?.logo;

  const activeIndex = Math.max(0, images.indexOf(current));
  const layers = images.filter(
    (src) => src === current || src === prevSrc || seen.has(src)
  );

  const applyClass =
    "inline-flex h-10 flex-[1.2] items-center justify-center gap-1 rounded-lg bg-blue-600 text-[13px] font-semibold text-white hover:bg-blue-700";

  const applyLabel = (
    <>
      Apply now
      <ArrowUpRight size={14} />
    </>
  );

  const facts = getFacts(campaign, type);

  return (
    <article
      style={{ fontFamily: FONT }}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 transition-shadow duration-300 hover:shadow-[0_10px_28px_rgba(15,23,42,0.09)]"
    >
      {/* ---------- IMAGE ---------- */}
      <div className="relative h-[135px] shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-[150px]">
        {images.length > 0 ? (
          layers.map((src) => {
            const isActive = src === current;
            const isPrev = src === prevSrc;

            return (
              <img
                key={src}
                src={src}
                alt={isActive ? `${brand} campaign` : ""}
                aria-hidden={!isActive}
                loading={isActive ? "lazy" : undefined}
                decoding="async"
                onError={() => setFailed((prev) => new Set(prev).add(src))}
                className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
                  isActive
                    ? "z-10 opacity-100"
                    : isPrev
                    ? "z-[5] opacity-100"
                    : "z-0 opacity-0"
                }`}
              />
            );
          })
        ) : (
          <div className="grid h-full place-items-center bg-slate-100">
            <span className="text-3xl font-semibold text-slate-400">
              {brand.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        <span className="absolute left-2.5 top-2.5 z-20 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-slate-800 shadow-sm">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isPaid ? "bg-blue-600" : "bg-slate-400"
            }`}
          />
          {type}
        </span>

        {images.length > 1 && (
          <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1">
            {images.map((src, index) => (
              <span
                key={src}
                className={`h-1 rounded-full ${
                  activeIndex === index ? "w-4 bg-white" : "w-1 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ---------- BODY ---------- */}
      <div className="flex flex-1 flex-col px-2 pb-1 pt-3">
        {/* Brand */}
        <div className="mb-1.5 flex min-w-0 items-center gap-2">
          <span className="grid h-6 w-6 shrink-0 place-items-center overflow-hidden rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
            {brandLogo ? (
              <img
                src={brandLogo}
                alt={`${brand} logo`}
                className="h-full w-full object-contain p-0.5"
              />
            ) : (
              brand.charAt(0).toUpperCase()
            )}
          </span>
          <span className="truncate text-[12px] font-semibold text-slate-500">
            {brand}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-3 min-h-[40px]">
          <Link
            to={`/campaigns/${campaign.id}`}
            title={campaign.campaignTitle}
            className="line-clamp-2 text-[14px] font-semibold leading-[1.45] tracking-[-0.1px] text-slate-900 hover:text-blue-700"
          >
            {campaign.campaignTitle || "Creator campaign"}
          </Link>
        </h3>

        {/* Reward */}
        <div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-2.5">
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-slate-500">
              {isPaid ? "Your payout" : "Your reward"}
            </p>
            <p
              title={reward}
              className="truncate text-[17px] font-bold leading-tight tracking-[-0.3px] text-slate-900"
            >
              {reward}
            </p>
          </div>

          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-blue-600 ring-1 ring-blue-100">
            {isPaid ? <IndianRupee size={17} /> : <Gift size={17} />}
          </span>
        </div>

        {/* Facts: labelled, two per row */}
        <dl className="mb-3.5 grid grid-cols-2 gap-x-3 gap-y-2.5">
          {facts.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex min-w-0 items-center gap-2 last:odd:col-span-2"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500">
                <Icon size={13} />
              </span>
              <div className="min-w-0">
                <dt className="text-[10px] font-medium leading-none text-slate-400">
                  {label}
                </dt>
                <dd
                  title={value}
                  className="mt-1 truncate text-[12px] font-semibold leading-none text-slate-800"
                >
                  {value}
                </dd>
              </div>
            </div>
          ))}
        </dl>

        {/* Actions */}
        <div className="mt-auto flex gap-2">
          <Link
            to={`/campaigns/${campaign.id}`}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-lg border border-slate-200 bg-white text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900"
          >
            View brief
          </Link>

          {status?.closed ? (
            <span className="inline-flex h-10 flex-[1.2] cursor-not-allowed items-center justify-center rounded-lg bg-slate-100 text-[13px] font-semibold text-slate-400">
              Closed
            </span>
          ) : isExternal ? (
            <a
              href={applyLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversion(campaign.id)}
              className={applyClass}
            >
              {applyLabel}
            </a>
          ) : (
            <Link
              to={applyLink}
              onClick={() => trackConversion(campaign.id)}
              className={applyClass}
            >
              {applyLabel}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

/* =========================================
   SKELETON
   ========================================= */

export const CampaignCardSkeleton = () => (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-2">
    <div className="h-[135px] animate-pulse rounded-xl bg-slate-100 sm:h-[150px]" />
    <div className="flex flex-1 flex-col space-y-3 px-2 pb-1 pt-3">
      <div className="h-4 w-1/3 animate-pulse rounded-full bg-slate-100" />
      <div className="h-9 w-4/5 animate-pulse rounded-lg bg-slate-100" />
      <div className="h-14 animate-pulse rounded-xl bg-slate-100" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-7 animate-pulse rounded-lg bg-slate-100" />
        <div className="h-7 animate-pulse rounded-lg bg-slate-100" />
      </div>
      <div className="mt-auto h-10 animate-pulse rounded-lg bg-slate-100" />
    </div>
  </div>
);

/* =========================================
   GRID
   ========================================= */

export const CampaignGrid = ({ campaigns = [] }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {campaigns.map((campaign) => (
      <CampaignCard key={campaign.id} campaign={campaign} />
    ))}
  </div>
);

export default CampaignCard;