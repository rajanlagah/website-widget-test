export const STORAGE_KEY = 'widget-test:snippet';
const MARK = 'data-widget-test-injected';

export const getSnippet = () => localStorage.getItem(STORAGE_KEY) || '';
export const saveSnippet = (s) => localStorage.setItem(STORAGE_KEY, s.trim());
export const clearSnippet = () => localStorage.removeItem(STORAGE_KEY);

// Parse the pasted HTML and re-create each <script> so the browser executes it
// (scripts set via innerHTML never run). Returns number of scripts injected.
export function injectSnippet(snippet) {
  if (!snippet || document.querySelector(`[${MARK}]`)) return 0;
  const doc = new DOMParser().parseFromString(snippet, 'text/html');
  const scripts = doc.querySelectorAll('script');
  scripts.forEach((src) => {
    const el = document.createElement('script');
    for (const { name, value } of src.attributes) el.setAttribute(name, value);
    if (src.hasAttribute('async')) el.async = true; // createElement scripts default async; keep explicit
    if (!src.src) el.textContent = src.textContent;
    el.setAttribute(MARK, '');
    document.body.appendChild(el);
  });
  return scripts.length;
}

// History of previously saved snippets (most recent first, deduped, capped).
const HISTORY_KEY = 'widget-test:history';
const HISTORY_MAX = 10;

export function getHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; } catch { return []; }
}
export function addToHistory(snippet) {
  const s = snippet.trim();
  const next = [{ snippet: s, savedAt: Date.now() }, ...getHistory().filter((h) => h.snippet !== s)];
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next.slice(0, HISTORY_MAX)));
}
export function removeFromHistory(snippet) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(getHistory().filter((h) => h.snippet !== snippet)));
}
export const clearHistory = () => localStorage.removeItem(HISTORY_KEY);
