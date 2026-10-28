export const THEME_KEY = 'widget-test:theme';
export const THEMES = ['auto', 'light', 'dark'];

export function getTheme() {
  const t = localStorage.getItem(THEME_KEY);
  return THEMES.includes(t) ? t : 'auto';
}

// 'auto' removes the attribute so CSS falls back to prefers-color-scheme.
// index.html applies the saved value before first paint to avoid a flash.
export function applyTheme(theme) {
  if (theme === 'auto') {
    localStorage.removeItem(THEME_KEY);
    document.documentElement.removeAttribute('data-theme');
  } else {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
}
