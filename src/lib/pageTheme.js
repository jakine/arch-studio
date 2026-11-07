// Page-level color state lives on <html> so CSS can tween the whole page at once

// Section background theme: 'paper' (default) | 'green' | 'stone' | 'charcoal' | 'white'
export const setSectionTheme = (theme) => {
  const root = document.documentElement;
  if (!theme || theme === 'paper') delete root.dataset.sectionTheme;
  else root.dataset.sectionTheme = theme;
};

// Each service pillar's page color; its blob pose is the pillar key itself
export const PILLAR_THEMES = { design: 'stone', structure: 'green', monitor: 'charcoal' };

// Header text tint over imagery: 'dark' backdrop → light header text
export const setHeaderTint = (tint) => {
  const root = document.documentElement;
  if (!tint || tint === 'auto') delete root.dataset.headerTint;
  else root.dataset.headerTint = tint;
};

export const resetPageTheme = () => {
  setSectionTheme('paper');
  setHeaderTint('auto');
};
