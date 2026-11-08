/* -------------------------------------------------------------------------- */
/*  Shared campaign helpers (card, details page, sidebar, filtering)           */
/* -------------------------------------------------------------------------- */

// If services/api already exports your base URL, import it here instead.
export const API_BASE = "https://adrovis-influencer-backend.onrender.com";

const DAY_MS = 86_400_000;

export const BRAND_STYLES = {
  nykaa: { bg: "#fce8ee", color: "#d12c62" },
  ponds: { bg: "#e8f3f8", color: "#397d9e" },
  minimalist: { bg: "#eeeeeb", color: "#55564e" },
  "earth rhythm": { bg: "#eaf1e7", color: "#55794e" },
  mamaearth: { bg: "#edf4e8", color: "#528345" },
  puma: { bg: "#eeeeee", color: "#252525" },
  swiggy: { bg: "#fff0e4", color: "#e87924" },
  boat: { bg: "#f0eafa", color: "#6741a0" },
};

export const brandStyle = (name = "") =>
  BRAND_STYLES[name.toLowerCase()] || { bg: "#f5eee8", color: "#8b6149" };

/* ------------------------------- Primitives -------------------------------- */

export const inr = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

export const isPaidCampaign = (c) => c?.campaignType?.toUpperCase() === "PAID";

export const uniqueStrings = (list = []) => [
  ...new Set(
    list
      .filter((item) => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean)
  ),
];

/** Date-only strings ("2026-11-25") count as the end of that local day. */
export const parseDate = (value) => {
  if (!value) return null;
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T23:59:59`)
    : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const formatDate = (date, short = false) =>
  date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    ...(short ? {} : { year: "numeric" }),
  });

export const formatFollowers = (value) => {
  const n = Number(value);
  if (!value || Number.isNaN(n)) return null;
  return n >= 1000
    ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k+`
    : `${n.toLocaleString("en-IN")}+`;
};

export const GENDER_LABELS = {
  FEMALE_ONLY: "Female creators only",
  MALE_ONLY: "Male creators only",
};

export const getGender = (campaign) => {
  const gender = campaign?.eligibility?.gender;
  if (!gender || gender === "NOT_SPECIFIED") return null;
  return GENDER_LABELS[gender] || gender.replaceAll("_", " ").toLowerCase();
};

/* ------------------------------ Apply link --------------------------------- */

/**
 * The API's applyProxyUrl can point at an internal host such as
 * http://localhost:8080, which never works in production. Only its path is
 * trusted; the host always comes from API_BASE.
 */
export const getApplyUrl = (campaign) => {
  try {
    const { pathname, search } = new URL(campaign.applyProxyUrl);
    return `${API_BASE}${pathname}${search}`;
  } catch {
    return `${API_BASE}/api/v1/campaigns/${campaign.id}/apply`;
  }
};

/* ------------------------------ Reward/status ------------------------------ */

/** Highest cash amount a creator can earn (0 when there is none). */
export const getMaxPayout = (campaign) => {
  const comp = campaign?.compensation || {};
  let amounts = [
    comp.payout_amount_inr,
    ...(comp.payout_tiers || []).map((tier) => tier.payout_inr),
  ]
    .map(Number)
    .filter((n) => n > 0);

  if (!amounts.length && comp.creator_payout) {
    amounts = (String(comp.creator_payout).match(/[\d,]+/g) || [])
      .map((s) => Number(s.replace(/,/g, "")))
      .filter((n) => n > 0);
  }
  return amounts.length ? Math.max(...amounts) : 0;
};

export const getReward = (campaign) => {
  const comp = campaign?.compensation || {};

  if (isPaidCampaign(campaign)) {
    const amount =
      comp.creator_payout ||
      (comp.payout_amount_inr ? inr(comp.payout_amount_inr) : null);
    return {
      value: amount || "Paid",
      caption:
        comp.payout_tiers?.length > 1
          ? "Cash payout, based on followers"
          : "Cash payout",
      short: amount || "Paid",
    };
  }

  const amount =
    comp.product_value ||
    (comp.product_value_inr ? inr(comp.product_value_inr) : null);
  return {
    value: amount || "Free product",
    caption: amount ? "Free product, value" : "Product barter",
    short: amount ? `Product ${amount}` : "Product barter",
  };
};

export const getStatus = (campaign) => {
  const applyBy = parseDate(campaign?.schedule?.application_deadline);
  const deadline = applyBy || parseDate(campaign?.expiresAt);
  if (!deadline) return { closed: false, urgent: false, label: null, short: null };

  const diff = deadline.getTime() - Date.now();
  if (diff < 0) {
    return { closed: true, urgent: false, label: "Applications closed", short: "Closed" };
  }
  if (diff < DAY_MS) {
    return { closed: false, urgent: true, label: "Closes today", short: "Closes today" };
  }

  const days = Math.ceil(diff / DAY_MS);
  if (days <= 14) {
    return {
      closed: false,
      urgent: days <= 7,
      label: `${days} days left to apply`,
      short: `${days} days left`,
    };
  }

  return {
    closed: false,
    urgent: false,
    label: `${applyBy ? "Apply by" : "Open until"} ${formatDate(deadline)}`,
    short: applyBy ? `Apply by ${formatDate(deadline, true)}` : null,
  };
};

/* -------------------------------- Platforms -------------------------------- */

const PLATFORM_PATTERNS = [
  ["Instagram", /instagram|reel|stories|\bstory\b/i],
  ["YouTube", /youtube/i],
  ["TikTok", /tiktok/i],
];

/** Uses an explicit `platforms` array when the API sends one, else deliverables text. */
export const getPlatforms = (campaign) => {
  const explicit = uniqueStrings(campaign?.platforms || []);
  if (explicit.length) return explicit;
  const text = (campaign?.deliverables || []).join(" ");
  return PLATFORM_PATTERNS.filter(([, re]) => re.test(text)).map(([name]) => name);
};

/* --------------------------------- Filters --------------------------------- */

export const DEFAULT_FILTERS = {
  type: "", // "" | "PAID" | "BARTER"
  categories: [], // string[]
  platforms: [], // string[]
  location: "", // single city
  followers: "", // followers the creator has; "" = any
  minPayout: 0, // INR
};

export const countActiveFilters = (f) =>
  (f.type ? 1 : 0) +
  (f.categories?.length || 0) +
  (f.platforms?.length || 0) +
  (f.location ? 1 : 0) +
  (f.followers ? 1 : 0) +
  (Number(f.minPayout) > 0 ? 1 : 0);

const lower = (list) => list.map((s) => s.toLowerCase());

export const filterCampaigns = (campaigns, filters) => {
  const f = { ...DEFAULT_FILTERS, ...filters };

  return campaigns.filter((c) => {
    if (f.type && (c.campaignType || "").toUpperCase() !== f.type) return false;

    if (f.categories.length) {
      const cats = lower(uniqueStrings(c.categories));
      if (!lower(f.categories).some((x) => cats.includes(x))) return false;
    }

    if (f.platforms.length) {
      const platforms = lower(getPlatforms(c));
      if (!lower(f.platforms).some((x) => platforms.includes(x))) return false;
    }

    // A campaign with no location list is open everywhere.
    if (f.location) {
      const locations = lower(uniqueStrings(c.eligibility?.locations));
      if (locations.length && !locations.includes(f.location.toLowerCase())) {
        return false;
      }
    }

    // "I have N followers": hide campaigns that need more than that.
    if (f.followers) {
      const required = Number(c.eligibility?.minimum_followers) || 0;
      if (required > Number(f.followers)) return false;
    }

    if (Number(f.minPayout) > 0 && getMaxPayout(c) < Number(f.minPayout)) {
      return false;
    }

    return true;
  });
};

const tally = (lists) => {
  const counts = new Map();
  lists.forEach((list) =>
    new Set(list).forEach((value) =>
      counts.set(value, (counts.get(value) || 0) + 1)
    )
  );
  return [...counts]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
};

/** Builds sidebar options from real data so a filter never leads to zero results. */
export const getFilterOptions = (campaigns) => {
  const highest = Math.max(0, ...campaigns.map(getMaxPayout));
  return {
    categories: tally(campaigns.map((c) => uniqueStrings(c.categories))),
    platforms: tally(campaigns.map(getPlatforms)),
    locations: tally(campaigns.map((c) => uniqueStrings(c.eligibility?.locations))),
    maxPayout: Math.ceil(highest / 1000) * 1000,
  };
};