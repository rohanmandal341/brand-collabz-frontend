import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Shirt,
  Leaf,
  MonitorSmartphone,
  Utensils,
  Plane,
  Camera,
  LayoutGrid,
  X,
  ChevronDown,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  SearchX,
} from "lucide-react";

import CampaignCard, {
  CampaignCardSkeleton,
} from "../components/campaign/CampaignCard";

import CampaignSpotlight from "../components/campaign/CampaignSpotlight";
import { useSpotlightTheme, FADE_MS } from "../hooks/useSpotlightIndex";
// Cache layer replaces direct API calls (see services/campaignCache.js)
import { loadCampaigns, readCache } from "../services/campaignCache";

/*
  Registered custom properties can be animated by the browser.
  The page sets --accent / --tint / --line / --page once per tick and every
  element that uses them fades together, hover and focus states included.
*/
const THEME_CSS = `
@property --accent { syntax: "<color>"; inherits: true; initial-value: #786052; }
@property --tint   { syntax: "<color>"; inherits: true; initial-value: #f5f2ee; }
@property --line   { syntax: "<color>"; inherits: true; initial-value: #e9e2da; }
@property --page   { syntax: "<color>"; inherits: true; initial-value: #f8f6f3; }
`;

const CATEGORIES = [
  { label: "All campaigns", value: "", icon: LayoutGrid },
  { label: "Beauty", value: "Beauty", icon: Sparkles },
  { label: "Fashion", value: "Fashion", icon: Shirt },
  { label: "Lifestyle", value: "Lifestyle", icon: Leaf },
  { label: "Technology", value: "Tech", icon: MonitorSmartphone },
  { label: "Food & beverage", value: "Food", icon: Utensils },
  { label: "Travel", value: "Travel", icon: Plane },
  { label: "UGC", value: "UGC", icon: Camera },
];

const SORTS = [
  { label: "Newest first", value: "createdAt:desc" },
  { label: "Closing soon", value: "expiresAt:asc" },
  { label: "Most viewed", value: "viewsCount:desc" },
];

const PAGE_SIZE = 12;

export default function Campaigns() {
  const [params, setParams] = useSearchParams();
  const { theme } = useSpotlightTheme();

  const get = (key, fallback = "") => params.get(key) || fallback;

  const page = Math.max(0, Number(get("page", 0)) || 0);
  const category = get("category");
  const type = get("type");
  const brand = get("brand");
  const maxFollowers = get("maxFollowers");
  const minPayout = get("minPayout");
  const sort = get("sort", "createdAt:desc");

  const [query, setQuery] = useState(brand);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [retry, setRetry] = useState(0);

  // Build the API params from the URL. Used for both cache lookup and fetch.
  const [sortBy, sortDirection] = sort.split(":");
  const queryParams = {
    page,
    size: PAGE_SIZE,
    brand,
    category,
    campaignType: type,
    maxFollowers,
    minPayout,
    sortBy,
    sortDirection,
  };

  // Turns an API response into the shape this page stores in state.
  const toState = (data) => ({
    loading: false,
    error: null,
    items: data?.content || [],
    pages: Math.max(1, data?.totalPages || 1),
    total: data?.totalElements || 0,
  });

  // Start from cached data if it exists, so cards appear on the FIRST paint
  // with no skeleton. Only show the loading state when nothing is cached.
  const [state, setState] = useState(() => {
    const hit = readCache(queryParams);
    return hit
      ? toState(hit.data)
      : { loading: true, error: null, items: [], pages: 1, total: 0 };
  });

  // Update URL parameters.
  const update = (patch, keepPage = false) => {
    const next = new URLSearchParams(params);

    Object.entries(patch).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });

    if (!keepPage) next.delete("page");

    setParams(next, { replace: true });
  };

  // Sync search input with URL.
  useEffect(() => {
    setQuery(brand);
  }, [brand]);

  // Debounced search.
  useEffect(() => {
    const timer = setTimeout(() => {
      const clean = query.trim();

      if (clean !== brand) {
        update({ brand: clean });
      }
    }, 400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Load campaigns whenever the filters, sort, page or retry change.
  useEffect(() => {
    let active = true; // prevents updating state after unmount / newer request

    const hit = readCache(queryParams);

    if (hit) {
      // Show cached cards instantly, no skeleton.
      setState(toState(hit.data));
      // Cache is under 1 minute old: no need to call the server at all.
      if (hit.fresh && retry === 0) return undefined;
    } else {
      // Nothing cached: show the skeleton while we fetch.
      setState((previous) => ({ ...previous, loading: true, error: null }));
    }

    // Fetch the latest data (retry > 0 means the user pressed "Try again").
    loadCampaigns(queryParams, { force: retry > 0 })
      .then((data) => {
        if (!active) return;
        setState(toState(data)); // swap in fresh data quietly
      })
      .catch((error) => {
        if (!active) return;
        // If cached cards are already on screen, keep them instead of
        // replacing the page with an error message.
        setState((previous) =>
          previous.items.length
            ? { ...previous, loading: false }
            : {
                ...previous,
                loading: false,
                error: error?.message || "Unable to load campaigns.",
              }
        );
      });

    return () => {
      active = false;
    };
    // queryParams is rebuilt every render, so we list its values instead.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category, type, brand, maxFollowers, minPayout, sort, retry]);

  const activeCount = [category, type, maxFollowers, minPayout].filter(
    Boolean
  ).length;

  const clearAll = () => {
    setQuery("");
    setParams({}, { replace: true });
    setMobileFiltersOpen(false);
  };

  const activeCategory =
    CATEGORIES.find((item) => item.value === category)?.label ||
    "All campaigns";

  const sidebar = (
    <div className="space-y-6">
      {/* Category */}
      <FilterGroup title="Category">
        <div className="space-y-2.5">
          {CATEGORIES.map(({ label, value, icon: Icon }) => (
            <label
              key={value || "all"}
              className="group flex cursor-pointer items-center gap-2.5 text-xs text-slate-600 transition-colors hover:text-slate-900 sm:text-sm"
            >
              <input
                type="radio"
                name="campaign-category"
                checked={category === value}
                onChange={() => update({ category: value })}
                className="h-4 w-4 accent-[color:var(--accent)]"
              />
              <Icon
                size={14}
                className="text-slate-400 transition-colors group-hover:text-[color:var(--accent)]"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      {/* Collaboration type */}
      <FilterGroup title="Collaboration type">
        <div className="space-y-2.5">
          {[
            { label: "All types", value: "" },
            { label: "Paid campaigns", value: "PAID" },
            { label: "Product barter", value: "BARTER" },
          ].map((option) => (
            <label
              key={option.value || "all-types"}
              className="flex cursor-pointer items-center gap-2.5 text-xs text-slate-600 transition-colors hover:text-slate-900 sm:text-sm"
            >
              <input
                type="radio"
                name="campaign-type"
                checked={type === option.value}
                onChange={() => update({ type: option.value })}
                className="h-4 w-4 accent-[color:var(--accent)]"
              />
              {option.label}
            </label>
          ))}
        </div>
      </FilterGroup>

      {/* Followers */}
      <FilterGroup title="Audience size">
        <select
          value={maxFollowers}
          onChange={(event) => update({ maxFollowers: event.target.value })}
          className="h-10 w-full rounded-xl border border-slate-200 bg-white/70 px-3 text-xs text-slate-700 outline-none transition focus:border-[color:var(--accent)] focus:bg-white sm:text-sm"
        >
          <option value="">Any audience size</option>
          <option value="5000">Up to 5,000</option>
          <option value="10000">Up to 10,000</option>
          <option value="25000">Up to 25,000</option>
          <option value="50000">Up to 50,000</option>
        </select>
      </FilterGroup>

      {/* Minimum payout */}
      <FilterGroup title="Minimum reward">
        <select
          value={minPayout}
          onChange={(event) => update({ minPayout: event.target.value })}
          className="h-10 w-full rounded-xl border border-slate-200 bg-white/70 px-3 text-xs text-slate-700 outline-none transition focus:border-[color:var(--accent)] focus:bg-white sm:text-sm"
        >
          <option value="">Any reward</option>
          <option value="1000">₹1,000+</option>
          <option value="3000">₹3,000+</option>
          <option value="5000">₹5,000+</option>
          <option value="8000">₹8,000+</option>
        </select>
      </FilterGroup>

      <button
        type="button"
        onClick={clearAll}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[color:var(--line)] bg-white py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-[color:var(--tint)] hover:text-slate-900"
      >
        <RotateCcw size={13} />
        Clear all filters
      </button>
    </div>
  );

  return (
    <main
      style={{
        "--accent": theme.accent,
        "--tint": theme.tint,
        "--line": theme.line,
        "--page": theme.page,
        backgroundColor: "var(--page)",
        // One duration for everything: same as the hero fade.
        transition: ["--accent", "--tint", "--line", "--page"]
          .map((name) => `${name} ${FADE_MS}ms ease-in-out`)
          .join(", "),
      }}
      className="min-h-screen pb-16 font-sans text-slate-900 antialiased selection:bg-[color:var(--tint)] selection:text-slate-900"
    >
      <style>{THEME_CSS}</style>

      <div className="mx-auto max-w-[1440px] px-4 pt-6 sm:px-7 lg:px-9">
        {/* Hero */}
        <CampaignSpotlight campaigns={state.items} />

        {/* Marketplace layout */}
        <div className="mt-8 flex items-start gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden w-[240px] shrink-0 lg:block">
            <div className="sticky top-24 rounded-2xl border border-[color:var(--line)] bg-white p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal
                    size={16}
                    className="text-[color:var(--accent)]"
                  />
                  <h2 className="text-sm font-bold text-slate-900">Filters</h2>
                </div>

                {activeCount > 0 && (
                  <span className="rounded-full border border-[color:var(--line)] bg-[color:var(--tint)] px-2 py-0.5 text-[10px] font-semibold text-[color:var(--accent)]">
                    {activeCount} active
                  </span>
                )}
              </div>

              {sidebar}
            </div>
          </aside>

          {/* Main content */}
          <section className="min-w-0 flex-1">
            {/* Search and sorting */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      update({ brand: query.trim() });
                    }
                  }}
                  placeholder="Search campaigns, brands or keywords..."
                  aria-label="Search campaigns"
                  className="h-11 w-full rounded-xl border border-[color:var(--line)] bg-white pl-10 pr-10 text-xs text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[color:var(--accent)] focus:ring-4 focus:ring-[color:var(--tint)] sm:text-sm"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      update({ brand: "" });
                    }}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                {/* Mobile filter button */}
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen((value) => !value)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[color:var(--line)] bg-white px-4 text-xs font-semibold text-slate-700 transition hover:bg-[color:var(--tint)] sm:text-sm lg:hidden"
                >
                  <SlidersHorizontal
                    size={15}
                    className="text-[color:var(--accent)]"
                  />
                  Filters
                  {activeCount > 0 && (
                    <span className="rounded-full border border-[color:var(--line)] bg-[color:var(--tint)] px-1.5 py-0.5 text-[10px] font-bold text-[color:var(--accent)]">
                      {activeCount}
                    </span>
                  )}
                </button>

                <div className="relative">
                  <select
                    value={sort}
                    onChange={(event) => update({ sort: event.target.value })}
                    aria-label="Sort campaigns"
                    className="h-11 min-w-[155px] cursor-pointer appearance-none rounded-xl border border-[color:var(--line)] bg-white pl-4 pr-10 text-xs font-semibold text-slate-700 outline-none transition focus:border-[color:var(--accent)] sm:text-sm"
                  >
                    {SORTS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Mobile filters drawer */}
            {mobileFiltersOpen && (
              <div className="mt-3 rounded-2xl border border-[color:var(--line)] bg-white p-5 shadow-lg lg:hidden">
                <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900">
                    Campaign filters
                  </h3>

                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    aria-label="Close filters"
                    className="rounded-md p-1 text-slate-400 hover:text-slate-700"
                  >
                    <X size={17} />
                  </button>
                </div>

                {sidebar}
              </div>
            )}

            {/* Results heading */}
            <div className="mb-4 mt-6 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  Explore campaigns
                </h1>

                <p className="mt-1 flex items-center gap-1.5 text-xs font-normal text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                  {state.loading
                    ? "Finding opportunities..."
                    : `${state.total.toLocaleString("en-IN")} opportunities available`}
                </p>
              </div>

              {(brand || category || activeCount > 0) && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs font-semibold text-[color:var(--accent)] hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Active filter labels */}
            {(category || type || maxFollowers || minPayout || brand) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {category && (
                  <ActiveFilter
                    label={activeCategory}
                    onClick={() => update({ category: "" })}
                  />
                )}

                {type && (
                  <ActiveFilter
                    label={type === "PAID" ? "Paid" : "Barter"}
                    onClick={() => update({ type: "" })}
                  />
                )}

                {maxFollowers && (
                  <ActiveFilter
                    label={`Up to ${Number(maxFollowers).toLocaleString("en-IN")} followers`}
                    onClick={() => update({ maxFollowers: "" })}
                  />
                )}

                {minPayout && (
                  <ActiveFilter
                    label={`₹${Number(minPayout).toLocaleString("en-IN")}+ reward`}
                    onClick={() => update({ minPayout: "" })}
                  />
                )}

                {brand && (
                  <ActiveFilter
                    label={`Search: ${brand}`}
                    onClick={() => {
                      setQuery("");
                      update({ brand: "" });
                    }}
                  />
                )}
              </div>
            )}

            {/* Error state */}
            {state.error && (
              <div className="rounded-2xl border border-rose-200 bg-white p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Unable to load campaigns
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {state.error}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setRetry((value) => value + 1)}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-[#171717] px-4 text-xs font-semibold text-white transition hover:bg-[#383838]"
                  >
                    <RefreshCw size={13} />
                    Try again
                  </button>
                </div>
              </div>
            )}

            {/* Loading cards */}
            {state.loading && (
              <div className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <CampaignCardSkeleton key={index} />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!state.loading && !state.error && state.items.length === 0 && (
              <div className="rounded-2xl border border-[color:var(--line)] bg-white px-6 py-16 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-[color:var(--line)] bg-[color:var(--tint)] text-[color:var(--accent)]">
                  <SearchX size={24} />
                </span>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  No campaigns found
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Try changing your search keywords or clearing active filters.
                </p>

                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-[#171717] px-5 text-xs font-semibold text-white transition hover:bg-[#383838]"
                >
                  View all campaigns
                </button>
              </div>
            )}

            {/* Campaign cards */}
            {!state.loading && !state.error && state.items.length > 0 && (
              <div className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {state.items.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!state.loading && !state.error && state.pages > 1 && (
              <nav
                className="mt-10 flex flex-wrap items-center justify-center gap-2.5"
                aria-label="Campaign pages"
              >
                <button
                  type="button"
                  disabled={page === 0}
                  onClick={() => update({ page: page - 1 }, true)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[color:var(--line)] bg-white px-3.5 text-xs font-semibold text-slate-700 transition hover:bg-[color:var(--tint)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={15} />
                  Previous
                </button>

                <span className="rounded-xl border border-[color:var(--line)] bg-[color:var(--tint)] px-3.5 py-2 text-xs font-semibold text-[color:var(--accent)]">
                  Page {page + 1} of {state.pages}
                </span>

                <button
                  type="button"
                  disabled={page >= state.pages - 1}
                  onClick={() => update({ page: page + 1 }, true)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[color:var(--line)] bg-white px-3.5 text-xs font-semibold text-slate-700 transition hover:bg-[color:var(--tint)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={15} />
                </button>
              </nav>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function FilterGroup({ title, children }) {
  return (
    <section className="border-b border-[color:var(--line)] pb-5 last:border-0 last:pb-0">
      <h3 className="mb-3 text-[12px] font-bold text-slate-900">{title}</h3>
      {children}
    </section>
  );
}

function ActiveFilter({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--line)] bg-[color:var(--tint)] px-3 py-1.5 text-xs font-medium text-[color:var(--accent)] transition hover:brightness-95"
    >
      <span>{label}</span>
      <X size={12} />
    </button>
  );
}