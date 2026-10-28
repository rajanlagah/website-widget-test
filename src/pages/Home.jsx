import { useState } from 'react';
import {
  addToHistory, clearHistory, clearSnippet, getHistory, getSnippet, injectSnippet, removeFromHistory, saveSnippet,
} from '../widget';

// Pull a readable label out of a snippet: widget id / src host, else first chars.
function label(snippet) {
  const id = snippet.match(/data-[\w-]*id=["']([^"']+)["']/i);
  const src = snippet.match(/src=["']([^"']+)["']/i);
  let host = '';
  try { host = src ? new URL(src[1], location.href).host : ''; } catch {}
  return [host, id && id[1]].filter(Boolean).join(' · ') || snippet.slice(0, 60);
}

export default function Home() {
  const saved = getSnippet();
  const [value, setValue] = useState(saved);
  const [history, setHistory] = useState(getHistory);

  const onSave = () => {
    if (!value.trim()) return;
    saveSnippet(value);
    addToHistory(value);
    setHistory(getHistory());
    // Reload if a different widget was already loaded (loaders usually init once)
    if (saved && saved !== value.trim()) return location.reload();
    if (!injectSnippet(value)) alert('No <script> tag found in the snippet.');
    else setValue(value.trim());
  };

  const onClear = () => {
    clearSnippet();
    location.reload(); // widgets leave DOM + globals behind; reload is the only clean reset
  };

  const onRemove = (snippet) => { removeFromHistory(snippet); setHistory(getHistory()); };
  const onClearHistory = () => { clearHistory(); setHistory(getHistory()); };

  return (
    <section className="center">
      <h1>Paste your widget snippet</h1>
      <p className="muted">Saved in localStorage and loaded on every page until you clear it.</p>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='<script src="..." data-widget-id="..." async></script>'
        rows={6}
        spellCheck={false}
      />
      <div className="row">
        <button onClick={onSave}>Save & load</button>
        <button className="secondary" onClick={onClear} disabled={!saved}>Clear</button>
      </div>
      <p className="status">{saved ? '● Widget active' : '○ No widget saved'}</p>

      {history.length > 0 && (
        <div className="history">
          <div className="history-head">
            <strong>History</strong>
            <button className="link" onClick={onClearHistory}>Clear history</button>
          </div>
          <ul>
            {history.map((h) => (
              <li key={h.snippet} className={h.snippet === saved ? 'active' : ''}>
                <button className="history-item" onClick={() => setValue(h.snippet)} title={h.snippet}>
                  <span className="history-label">{label(h.snippet)}</span>
                  <span className="muted">
                    {h.snippet === saved ? 'active · ' : ''}{h.isDefault ? 'default' : new Date(h.savedAt).toLocaleString()}
                  </span>
                </button>
                {!h.isDefault && (
                  <button className="link" onClick={() => onRemove(h.snippet)} aria-label="Remove">✕</button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
