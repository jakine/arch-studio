import React from 'react';
import Section from './Section';
import RevealText from './RevealText';
import CircleLink from './CircleLink';
import GooeyBlob from './GooeyBlob';
import CopyLink from './CopyLink';
import { useTranslation } from '../hooks/useTranslation';
import { ROUTES } from '../utils/constants';
import './ContactCta.css';

// Closing "start a project" band shared by several pages
function ContactCta() {
  const { t } = useTranslation();

  return (
    <Section theme="green" className="contact-cta">
      <div className="contact-cta-blob">
        <GooeyBlob pose="design" cycle interactive />
      </div>
      <div className="contact-cta-inner container">
        <p className="eyebrow">{t.cta.label}</p>
        <RevealText as="h2" className="text-2xl contact-cta-title">{t.cta.title}</RevealText>
        <p className="text-md contact-cta-text">{t.cta.text}</p>
        <div className="contact-cta-actions">
          <CircleLink to={ROUTES.CONTACT}>{t.cta.button}</CircleLink>
          <CopyLink value={t.cta.email} href={`mailto:${t.cta.email}`} className="contact-cta-email" />
        </div>
      </div>
    </Section>
  );
}

export default ContactCta;
