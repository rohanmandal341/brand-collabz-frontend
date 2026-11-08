import React, { useState } from "react";
import { ChevronDown, RotateCcw, SlidersHorizontal } from "lucide-react";

import { countActiveFilters } from "../../utils/campaign";
import {
  THEME_CSS,
  themeStyle,
  useSpotlightTheme,
} from "../../hooks/useSpotlightIndex";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]";

const TYPE_OPTIONS = [
  { label: "All campaigns", value: "" },
  { label: "Paid campaigns", value: "PAID" },
  { label: "Product barter", value: "BARTER" },
];

const FOLLOWER_OPTIONS = [
  { label: "Any", value: "" },
  { label: "1K+", value: "1000" },
  { label: "5K+", value: "5000" },
  { label: "10K+", value: "10000" },
  { label: "50K+", value: "50000" },
  { label: "100K+", value: "100000" },
];

function FilterSection({ title, hint, children }) {
  const [open, setOpen] = useState(true);

  return (
    <section className="border-b border-[color:var(--line)] py-4 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className={`flex w-full items-center justify-between rounded text-[13px] font-semibold text-[#17191f] ${FOCUS}`}
      >
        {title}
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-3 space-y-2.5">
          {hint && <p className="text-[11px] text-slate-500">{hint}</p>}
          {children}
        </div>
      )}
    </section>
  );
}

function Option({ type = "checkbox", name, label, count, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-slate-600 transition-colors hover:text-[#17191f]">
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 accent-[color:var(--accent)]"
      />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {count != null && (
        <span className="text-[11px] text-slate-400">{count}</span>
      )}
    </label>
  );
}

/**
 * Props
 *  filters      current filter state (see DEFAULT_FILTERS in utils/campaign)
 *  options      result of getFilterOptions(campaigns); sections without data are hidden
 *  onChange     (key, value) => void
 *  onClear      () => void
 *  resultCount  number of campaigns after filtering
 */
export default function CampaignSidebar({
  filters,
  options = {},
  onChange,
  onClear,
  resultCount,
}) {
  const { theme } = useSpotlightTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = countActiveFilters(filters);

  const categories = options.categories || [];
  const platforms = options.platforms || [];
  const locations = options.locations || [];
  const maxPayout = options.maxPayout || 0;

  const toggleIn = (key, value) => {
    const current = filters[key] || [];
    onChange(
      key,
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  return (
    <aside
      aria-label="Campaign filters"
      style={themeStyle(theme)}
      className="w-full rounded-2xl border border-[color:var(--line)] bg-white p-6 lg:sticky lg:top-24 lg:max-h-[calc(100dvh-8rem)] lg:w-[240px] lg:shrink-0 lg:overflow-y-auto"
    >
      <style>{THEME_CSS}</style>

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          aria-expanded={mobileOpen}
          className={`flex items-center gap-2 rounded lg:pointer-events-none ${FOCUS}`}
        >
          <SlidersHorizontal
            size={16}
            className="text-[color:var(--accent)]"
            aria-hidden="true"
          />
          <h2 className="text-sm font-bold text-[#17191f]">Filters</h2>
          {active > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[color:var(--accent)] px-1.5 text-[11px] font-bold text-white">
              {active}
            </span>
          )}
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={`text-slate-400 transition-transform lg:hidden ${mobileOpen ? "rotate-180" : ""}`}
          />
        </button>

        <button
          type="button"
          onClick={onClear}
          disabled={active === 0}
          className={`flex items-center gap-1 rounded text-[11px] font-semibold text-[color:var(--accent)] hover:underline disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline ${FOCUS}`}
        >
          <RotateCcw size={12} aria-hidden="true" />
          Clear all
        </button>
      </div>

      <div
        className={`${mobileOpen ? "block" : "hidden"} mt-3 border-t border-[color:var(--line)] lg:block`}
      >
        <FilterSection title="Campaign type">
          {TYPE_OPTIONS.map((option) => (
            <Option
              key={option.value || "all"}
              type="radio"
              name="campaign-type"
              label={option.label}
              checked={(filters.type || "") === option.value}
              onChange={() => onChange("type", option.value)}
            />
          ))}
        </FilterSection>

        {categories.length > 0 && (
          <FilterSection title="Category">
            {categories.map(({ value, count }) => (
              <Option
                key={value}
                label={value}
                count={count}
                checked={(filters.categories || []).includes(value)}
                onChange={() => toggleIn("categories", value)}
              />
            ))}
          </FilterSection>
        )}

        {platforms.length > 0 && (
          <FilterSection title="Platform">
            {platforms.map(({ value, count }) => (
              <Option
                key={value}
                label={value}
                count={count}
                checked={(filters.platforms || []).includes(value)}
                onChange={() => toggleIn("platforms", value)}
              />
            ))}
          </FilterSection>
        )}

        {locations.length > 0 && (
          <FilterSection
            title="My city"
            hint="Campaigns with no city limit always show."
          >
            <Option
              type="radio"
              name="campaign-location"
              label="Anywhere"
              checked={!filters.location}
              onChange={() => onChange("location", "")}
            />
            {locations.map(({ value, count }) => (
              <Option
                key={value}
                type="radio"
                name="campaign-location"
                label={value}
                count={count}
                checked={filters.location === value}
                onChange={() => onChange("location", value)}
              />
            ))}
          </FilterSection>
        )}

        <FilterSection
          title="My followers"
          hint="Shows campaigns you qualify for."
        >
          {FOLLOWER_OPTIONS.map((option) => (
            <Option
              key={option.value || "any"}
              type="radio"
              name="campaign-followers"
              label={option.label}
              checked={String(filters.followers || "") === option.value}
              onChange={() => onChange("followers", option.value)}
            />
          ))}
        </FilterSection>

        {maxPayout > 0 && (
          <FilterSection
            title="Minimum payout"
            hint={
              Number(filters.minPayout) > 0
                ? "Product barter campaigns are hidden."
                : undefined
            }
          >
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>₹0</span>
              <span className="rounded-full bg-[color:var(--tint)] px-2 py-0.5 font-semibold text-[color:var(--accent)]">
                ₹{Number(filters.minPayout || 0).toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={maxPayout}
              step={maxPayout >= 20000 ? 1000 : 500}
              value={filters.minPayout || 0}
              onChange={(e) => onChange("minPayout", Number(e.target.value))}
              aria-label="Minimum payout"
              className="w-full cursor-pointer accent-[color:var(--accent)]"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹0</span>
              <span>₹{maxPayout.toLocaleString("en-IN")}</span>
            </div>
          </FilterSection>
        )}

        {typeof resultCount === "number" && (
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className={`mt-2 h-11 w-full rounded-xl bg-[#171717] text-sm font-semibold text-white transition hover:bg-[#383838] lg:hidden ${FOCUS}`}
          >
            Show {resultCount} {resultCount === 1 ? "campaign" : "campaigns"}
          </button>
        )}
      </div>
    </aside>
  );
}