import { useSyncExternalStore } from "react";

/*
  ONE shared clock for the whole page.
  The hero slider, every campaign card and the Campaigns page all read this
  index, so colours, tints, slides and card images change on the exact same tick.
*/

export const SPOTLIGHT_INTERVAL = 5000; // change this one number to speed up / slow down everything
export const FADE_MS = 1200; // every colour fade uses this duration

/*
  One fixed palette for the page and sidebar (no colour cycling, so nothing clashes
  with the blue navbar or the cream hero). Only the hero text and the card images
  still change on the shared 5s tick.
*/
const FIXED_THEME = {
  accent: "#2563eb", // same blue as the navbar button
  tint: "#eff6ff",
  line: "#e7e5e4",
  page: "#fafaf9",
};
export const THEMES = [FIXED_THEME, FIXED_THEME, FIXED_THEME];

let index = 0;
let timer = null;
const listeners = new Set();

const emit = () => listeners.forEach((fn) => fn());

const start = () => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (typeof document !== "undefined" && document.hidden) return;
    index = (index + 1) % THEMES.length;
    emit();
  }, SPOTLIGHT_INTERVAL);
};

/* Call from the hero dots. Restarts the clock so the new slide gets its full time. */
export const setSpotlightIndex = (next) => {
  index = next;
  emit();
  start();
};

const subscribe = (fn) => {
  listeners.add(fn);
  if (listeners.size === 1) start();

  return () => {
    listeners.delete(fn);
    if (listeners.size === 0) {
      clearInterval(timer);
      timer = null;
    }
  };
};

const getSnapshot = () => index;

export default function useSpotlightIndex() {
  return useSyncExternalStore(subscribe, getSnapshot, () => 0);
}

export function useSpotlightTheme() {
  const i = useSpotlightIndex();
  return { index: i, theme: THEMES[i % THEMES.length] };
}

/*
  Helpers for any component that wants to use the live colours as CSS variables
  (var(--accent), var(--tint), var(--line), var(--page)).
  Render <style>{THEME_CSS}</style> once, and spread themeStyle(theme) on the element.
*/
export const THEME_CSS = `
@property --accent { syntax: "<color>"; inherits: true; initial-value: #786052; }
@property --tint   { syntax: "<color>"; inherits: true; initial-value: #f5f2ee; }
@property --line   { syntax: "<color>"; inherits: true; initial-value: #e9e2da; }
@property --page   { syntax: "<color>"; inherits: true; initial-value: #f8f6f3; }
`;

export const themeStyle = (theme) => ({
  "--accent": theme.accent,
  "--tint": theme.tint,
  "--line": theme.line,
  "--page": theme.page,
  transition: ["--accent", "--tint", "--line", "--page"]
    .map((name) => `${name} ${FADE_MS}ms ease-in-out`)
    .join(", "),
});