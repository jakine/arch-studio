import React, { useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ROUTES, NAV_ITEMS } from '../utils/constants';
import { useTranslation } from '../hooks/useTranslation';
import { trapTab } from '../utils/focusTrap';
import { useSmoothScroll } from './SmoothScroll';
import './Nav.css';

const MENU_ITEMS = [{ route: ROUTES.HOME, key: 'home' }, ...NAV_ITEMS];

const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'shq', label: 'SHQ', name: 'Shqip' },
];

// Label that rolls up to reveal a copy of itself on hover
function RollLabel({ children }) {
  return (
    <span className="roll">
      <span className="roll-inner" data-text={children}>{children}</span>
    </span>
  );
}

function NavControls({ className = '' }) {
  const { theme, toggleTheme, language, changeLanguage } = useApp();
  const { t } = useTranslation();

  return (
    <div className={`nav-controls ${className}`.trim()}>
      <div className="language-switcher" role="group" aria-label={t.nav.switchLanguage}>
        {LANGUAGES.map(({ code, label, name }) => (
          <button
            key={code}
            type="button"
            className={`language-option ${language === code ? 'is-active' : ''}`.trim()}
            onClick={() => changeLanguage(code)}
            aria-pressed={language === code}
            aria-label={name}
            lang={code === 'shq' ? 'sq' : code}
          >
            {label}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={`theme-toggle is-${theme}`}
        onClick={toggleTheme}
        aria-label={t.nav.toggleTheme}
      >
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="8.25" />
          <path d="M10 1.75a8.25 8.25 0 0 1 0 16.5Z" />
        </svg>
      </button>
    </div>
  );
}

function Nav({ isMenuOpen, onMenuOpenChange }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { stop, start } = useSmoothScroll();
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  // Close the menu when the route changes
  useEffect(() => {
    onMenuOpenChange(false);
  }, [pathname, onMenuOpenChange]);

  // While open: lock scrolling, close on Escape, keep Tab inside the menu
  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const menu = menuRef.current;
    stop();
    menu.querySelector('a')?.focus({ preventScroll: true });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onMenuOpenChange(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key === 'Tab') trapTab(e, [toggleRef.current, ...menu.querySelectorAll('a, button')]);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      start();
    };
  }, [isMenuOpen, onMenuOpenChange, stop, start]);

  return (
    <>
      <nav className="nav" aria-label={t.nav.mainNavigation}>
        <ul className="nav-links">
          {NAV_ITEMS.map(({ route, key }) => (
            <li key={key}>
              <NavLink to={route} className="nav-link" viewTransition>
                <RollLabel>{t.nav[key]}</RollLabel>
              </NavLink>
            </li>
          ))}
        </ul>
        <NavControls className="nav-controls-inline" />
      </nav>

      <button
        ref={toggleRef}
        type="button"
        className="menu-toggle"
        onClick={() => onMenuOpenChange(!isMenuOpen)}
        aria-expanded={isMenuOpen}
        aria-controls="site-menu"
      >
        <RollLabel>{isMenuOpen ? t.nav.close : t.nav.menu}</RollLabel>
        <span className={`menu-toggle-icon ${isMenuOpen ? 'is-open' : ''}`.trim()} aria-hidden="true" />
      </button>

      <div
        ref={menuRef}
        id="site-menu"
        className="menu"
        data-open={isMenuOpen}
        inert={!isMenuOpen}
      >
        <ul className="menu-links">
          {MENU_ITEMS.map(({ route, key }, index) => (
            <li key={key} className="menu-item" style={{ '--i': index }}>
              <NavLink to={route} className="menu-link" end={route === ROUTES.HOME} viewTransition>
                <span className="menu-link-inner">
                  <span className="menu-link-index">{String(index + 1).padStart(2, '0')}</span>
                  {t.nav[key]}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
        <NavControls className="menu-controls" />
      </div>
    </>
  );
}

export default Nav;
