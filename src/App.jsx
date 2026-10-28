import { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import { THEMES, applyTheme, getTheme } from './theme';
import { getSnippet, shareUrl } from './widget';

function ShareButton() {
  const [msg, setMsg] = useState('');
  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(''), 1500); };
  const onShare = async () => {
    const snippet = getSnippet();
    if (!snippet) return flash('No widget');
    const url = shareUrl(snippet);
    try { await navigator.clipboard.writeText(url); flash('Copied!'); }
    catch { prompt('Copy share link:', url); } // clipboard API needs a secure context
  };
  return <button className="share" onClick={onShare}>{msg || 'Share'}</button>;
}

function ThemeToggle() {
  const [theme, setTheme] = useState(getTheme);
  const pick = (t) => { applyTheme(t); setTheme(t); };
  return (
    <div className="theme-toggle" role="group" aria-label="Theme">
      {THEMES.map((t) => (
        <button key={t} className={t === theme ? 'on' : ''} aria-pressed={t === theme} onClick={() => pick(t)}>
          {t[0].toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <>
      <nav className="nav">
        <strong>Widget Test Site</strong>
        <div className="nav-right">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <ShareButton />
          <ThemeToggle />
        </div>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  );
}
