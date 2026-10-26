import { useState } from 'react';
import { clearSnippet, getSnippet, injectSnippet, saveSnippet } from '../widget';

export default function Home() {
  const saved = getSnippet();
  const [value, setValue] = useState(saved);

  const onSave = () => {
    if (!value.trim()) return;
    saveSnippet(value);
    // Reload if a different widget was already loaded (loaders usually init once)
    if (saved && saved !== value.trim()) return location.reload();
    if (!injectSnippet(value)) alert('No <script> tag found in the snippet.');
    else setValue(value.trim());
  };

  const onClear = () => {
    clearSnippet();
    location.reload(); // widgets leave DOM + globals behind; reload is the only clean reset
  };

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
    </section>
  );
}
