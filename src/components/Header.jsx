import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import LogoInline from './LogoInline';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { ROUTES } from '../utils/constants';
import './Header.css';

function Header({ logoRef }) {
  const { isIntroPlaying } = useApp();
  const { t } = useTranslation();
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);

  // Hide while scrolling down, come back on any scroll up (listener bound once)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollYRef.current;

      setIsHidden(isScrollingDown && currentScrollY > 120);
      setIsScrolled(currentScrollY > 10);
      lastScrollYRef.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClassName = [
    'header',
    isHidden && !isMenuOpen && 'is-hidden',
    isScrolled && 'is-scrolled',
    isMenuOpen && 'is-menu-open',
    isIntroPlaying && 'is-intro',
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClassName}>
      <a className="skip-link" href="#main">{t.nav.skipToContent}</a>
      <div className="header-container">
        <Link to={ROUTES.HOME} className="logo" aria-label="Arch Studio" viewTransition>
          <span className="logo-container">
            <LogoInline ref={logoRef} className="arch-logo" />
            <span className="logo-text">studio</span>
          </span>
        </Link>
        <Nav isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} />
      </div>
    </header>
  );
}

export default Header;
