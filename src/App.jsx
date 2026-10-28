import { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import { THEMES, applyTheme, getTheme } from './theme';

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
