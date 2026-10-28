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

// Always listed in history (after saved entries); can't be removed.
export const DEFAULT_SNIPPETS = [
  '<script src="https://widget-cdn.doubletick.dev/loader.js" data-widget-id="wgt_8bcySFfixe7l" async></script>',
];

function getSavedHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; } catch { return []; }
}
export function getHistory() {
  const saved = getSavedHistory();
  const defaults = DEFAULT_SNIPPETS
    .filter((d) => !saved.some((h) => h.snippet === d))
    .map((snippet) => ({ snippet, isDefault: true }));
  return [...saved, ...defaults];
}
export function addToHistory(snippet) {
  const s = snippet.trim();
  const next = [{ snippet: s, savedAt: Date.now() }, ...getSavedHistory().filter((h) => h.snippet !== s)];
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next.slice(0, HISTORY_MAX)));
}
export function removeFromHistory(snippet) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(getSavedHistory().filter((h) => h.snippet !== snippet)));
}
export const clearHistory = () => localStorage.removeItem(HISTORY_KEY);

// Share links carry the snippet as base64url (UTF-8 safe) in ?widget=
const SHARE_PARAM = 'widget';
const toB64Url = (s) => btoa(String.fromCharCode(...new TextEncoder().encode(s)))
  .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromB64Url = (s) => new TextDecoder().decode(
  Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0))
);

export function shareUrl(snippet) {
  const url = new URL(location.origin + location.pathname);
  url.searchParams.set(SHARE_PARAM, toB64Url(snippet));
  return url.toString();
}

// If opened via a share link, save that snippet (replacing the current one) and strip the param.
export function consumeShareParam() {
  const url = new URL(location.href);
  const encoded = url.searchParams.get(SHARE_PARAM);
  if (!encoded) return;
  try {
    const snippet = fromB64Url(encoded).trim();
    if (snippet) { saveSnippet(snippet); addToHistory(snippet); }
  } catch { /* malformed link; ignore */ }
  url.searchParams.delete(SHARE_PARAM);
  history.replaceState(history.state, '', url);
}
