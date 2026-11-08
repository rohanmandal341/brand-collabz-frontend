// src/services/campaignCache.js
// ---------------------------------------------------------------
// One place that knows how to fetch campaigns AND remember them.
// Both Home (prefetch) and Campaigns (display) use this file,
// so they always share the same cached data.
// ---------------------------------------------------------------
import { fetchCampaigns } from "./api";

// Prefix for localStorage keys. If you ever change the shape of the
// API response, change "v1" to "v2" and all old caches are ignored.
const PREFIX = "cc:v1:";

// Younger than this = "fresh": show it and skip the network call.
export const FRESH_MS = 60_000; // 1 minute

// Older than this = too old to show at all, so we wait for the network.
const MAX_AGE_MS = 24 * 60 * 60_000; // 24 hours

// Keep at most this many cached lists in localStorage (storage is limited).
const MAX_STORED = 20;

// The default first page. Home prefetches exactly this, and Campaigns
// asks for exactly this when no filters are chosen.
// IMPORTANT: size must equal PAGE_SIZE in Campaigns.jsx (12).
export const DEFAULT_PARAMS = {
  page: 0,
  size: 12,
  sortBy: "createdAt",
  sortDirection: "desc",
};

// In-memory cache: fastest, but disappears when the tab is closed.
const memory = new Map();

// Tracks requests currently running, so two components asking for the
// same data at the same time cause only ONE network call.
const inflight = new Map();

// Turns params into a stable cache key. Empty values are dropped and
// keys are sorted, so { brand: "" } and {} produce the same key.
export const keyOf = (params) =>
  PREFIX +
  JSON.stringify(
    Object.entries(params)
      .filter(([, v]) => v !== "" && v !== null && v !== undefined)
      .sort(([a], [b]) => a.localeCompare(b))
  );

// Removes the oldest stored lists when we go over MAX_STORED.
function prune() {
  try {
    const entries = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(PREFIX)) {
        const at = JSON.parse(localStorage.getItem(k))?.at || 0;
        entries.push([k, at]);
      }
    }
    if (entries.length <= MAX_STORED) return;
    entries
      .sort((a, b) => a[1] - b[1]) // oldest first
      .slice(0, entries.length - MAX_STORED)
      .forEach(([k]) => localStorage.removeItem(k));
  } catch {
    /* storage unavailable: ignore */
  }
}

// Reads from cache (memory first, then localStorage).
// Returns null if nothing usable, else { data, fresh }.
export function readCache(params) {
  const key = keyOf(params);

  let entry = memory.get(key);
  if (!entry) {
    try {
      entry = JSON.parse(localStorage.getItem(key));
    } catch {
      entry = null; // corrupted or blocked storage
    }
    if (entry) memory.set(key, entry); // warm memory for next time
  }

  if (!entry || Date.now() - entry.at > MAX_AGE_MS) return null;
  return { data: entry.data, fresh: Date.now() - entry.at < FRESH_MS };
}

// Fetches campaigns (or returns fresh cached data) and saves the result.
// force: true skips the freshness check (used by the "Try again" button).
export function loadCampaigns(params, { force = false } = {}) {
  const key = keyOf(params);

  // 1) Fresh cache? Return immediately, no network.
  if (!force) {
    const cached = readCache(params);
    if (cached?.fresh) return Promise.resolve(cached.data);
  }

  // 2) Same request already running? Reuse it.
  if (inflight.has(key)) return inflight.get(key);

  // 3) Otherwise call the API and store the result.
  const request = fetchCampaigns(params)
    .then((data) => {
      const entry = { at: Date.now(), data };
      memory.set(key, entry);
      try {
        localStorage.setItem(key, JSON.stringify(entry));
        prune();
      } catch {
        /* storage full or blocked: memory cache still works */
      }
      return data;
    })
    .finally(() => inflight.delete(key)); // always clean up, even on error

  inflight.set(key, request);
  return request;
}