import React, { useState, useRef } from 'react';
import Section from '../components/Section';
import RevealText from '../components/RevealText';
import CircleLink from '../components/CircleLink';
import CopyLink from '../components/CopyLink';
import { useTranslation } from '../hooks/useTranslation';
import { useMagnetic } from '../hooks/useMagnetic';
import { STUDIO_CONTACT } from '../utils/constants';
import './Contact.css';

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };
const FIELDS = [
  { name: 'name', type: 'text', autoComplete: 'name' },
  { name: 'email', type: 'email', autoComplete: 'email' },
  { name: 'subject', type: 'text', autoComplete: 'off' },
];

function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSent, setIsSent] = useState(false);
  const emailRef = useRef(null);
  useMagnetic(emailRef, 0.12);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend yet: send formData through services/api.js here once there is one
    setIsSent(true);
    setFormData(EMPTY_FORM);
  };

  return (
    <div className="contact">
      <title>{`${t.nav.contact} | Arch Studio`}</title>

      <Section theme="paper" className="contact-head container">
        <p className="eyebrow">{t.contact.label}</p>
        <RevealText as="h1" className="text-2xl contact-title" play>{t.contact.title}</RevealText>
        <p className="text-md contact-subtitle">{t.contact.subtitle}</p>

        <CopyLink
          ref={emailRef}
          value={STUDIO_CONTACT.email}
          href={`mailto:${STUDIO_CONTACT.email}`}
          className="contact-email"
        />
      </Section>

      <Section theme="paper" className="contact-main container">
        <div className="contact-info">
          <div className="info-item">
            <h2>{t.contact.email}</h2>
            <CopyLink value={STUDIO_CONTACT.email} href={`mailto:${STUDIO_CONTACT.email}`} />
          </div>
          <div className="info-item">
            <h2>{t.contact.phone}</h2>
            <CopyLink value={STUDIO_CONTACT.phone} href={STUDIO_CONTACT.phoneHref} kind="phone" />
          </div>
          <div className="info-item">
            <h2>{t.contact.officeHours}</h2>
            <p>{t.contact.mondayFriday}</p>
            <p>{t.contact.saturday}</p>
          </div>
          <div className="info-item">
            <h2>{t.contact.location}</h2>
            {STUDIO_CONTACT.addressLines.map((line) => <p key={line}>{line}</p>)}
          </div>
        </div>

        <div className="contact-form-section" aria-live="polite">
          <h2 className="text-lg contact-form-title">{t.contact.writeToUs}</h2>

          {isSent ? (
            <div className="contact-sent">
              <p className="text-xl">{t.contact.sentTitle}</p>
              <p className="contact-sent-text">{t.contact.successMessage}</p>
              <button type="button" className="contact-sent-again" onClick={() => setIsSent(false)}>
                {t.contact.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              {FIELDS.map(({ name, type, autoComplete }) => (
                <div key={name} className="field">
                  <input
                    id={name}
                    name={name}
                    type={type}
                    autoComplete={autoComplete}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <label htmlFor={name}>{t.contact.form[name]}</label>
                  <span className="field-line" aria-hidden="true" />
                </div>
              ))}
              <div className="field is-textarea">
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="message">{t.contact.form.message}</label>
                <span className="field-line" aria-hidden="true" />
              </div>
              <div className="form-actions">
                <button type="submit" className="contact-submit">
                  {t.contact.form.sendMessage} <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </Section>

      <Section theme="green" className="contact-closing container">
        <p className="text-lg contact-closing-text">{t.cta.text}</p>
        <CircleLink href={`mailto:${STUDIO_CONTACT.email}`}>{t.cta.button}</CircleLink>
      </Section>
    </div>
  );
}

export default Contact;
