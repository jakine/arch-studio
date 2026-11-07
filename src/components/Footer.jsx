import React from 'react';
import { Link } from 'react-router-dom';
import Section from './Section';
import LogoInline from './LogoInline';
import CopyLink from './CopyLink';
import { useSmoothScroll } from './SmoothScroll';
import { useTranslation } from '../hooks/useTranslation';
import { NAV_ITEMS, STUDIO_CONTACT } from '../utils/constants';
import './Footer.css';

function Footer() {
  const { t } = useTranslation();
  const { scrollTo } = useSmoothScroll();

  return (
    <Section as="footer" theme="charcoal" className="footer">
      <div className="footer-container container">
        <div className="footer-top">
          <p className="footer-tagline text-lg">{t.footer.tagline}</p>
          <button type="button" className="text-link footer-top-button" onClick={() => scrollTo(0, { duration: 1.6 })}>
            {t.footer.backToTop} ↑
          </button>
        </div>

        <div className="footer-columns">
          <div className="footer-column">
            <h2 className="footer-heading">{t.footer.studio}</h2>
            <address>
              {STUDIO_CONTACT.addressLines.map((line) => <span key={line}>{line}</span>)}
            </address>
          </div>
          <div className="footer-column">
            <h2 className="footer-heading">{t.footer.contact}</h2>
            <CopyLink value={STUDIO_CONTACT.email} href={`mailto:${STUDIO_CONTACT.email}`} />
            <CopyLink value={STUDIO_CONTACT.phone} href={STUDIO_CONTACT.phoneHref} kind="phone" />
          </div>
          <div className="footer-column">
            <h2 className="footer-heading">{t.footer.follow}</h2>
            {STUDIO_CONTACT.socials.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>
            ))}
          </div>
          <nav className="footer-column" aria-label={t.footer.sitemap}>
            <h2 className="footer-heading">{t.footer.sitemap}</h2>
            {NAV_ITEMS.map(({ route, key }) => (
              <Link key={key} to={route} viewTransition>{t.nav[key]}</Link>
            ))}
          </nav>
        </div>

        <div className="footer-wordmark" aria-hidden="true">
          <LogoInline className="footer-mark" />
          <span>studio</span>
        </div>

        <p className="footer-legal">
          &copy; {new Date().getFullYear()} Arch Studio. {t.footer.rights}
        </p>
      </div>
    </Section>
  );
}

export default Footer;
