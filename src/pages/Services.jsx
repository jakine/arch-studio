import React, { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import RevealText from '../components/RevealText';
import GooeyBlob from '../components/GooeyBlob';
import Card from '../components/Card';
import ContactCta from '../components/ContactCta';
import { gsap, useGSAP, withMotion } from '../lib/gsap';
import { PILLAR_THEMES } from '../lib/pageTheme';
import { useTranslation } from '../hooks/useTranslation';
import { useProjects } from '../hooks/useProjects';
import { ROUTES } from '../utils/constants';
import { pad } from '../utils/format';
import './Services.css';

function Services() {
  const { t } = useTranslation();
  const projects = useProjects();
  const processRef = useRef(null);
  const services = t.services;
  const pillars = t.home.process.steps;
  const featured = useMemo(() => projects.filter((project) => project.featured).slice(0, 3), [projects]);

  // The process line fills as you read down the steps
  useGSAP(() => withMotion(() => {
    gsap.fromTo('.services-process-line-fill', { scaleY: 0 }, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: '.services-process-steps', start: 'top 60%', end: 'bottom 60%', scrub: true },
    });
  }), { scope: processRef });

  return (
    <div className="services-page">
      <title>{`${t.nav.services} | Arch Studio`}</title>

      <Section theme="paper" className="services-hero container">
        <div className="services-hero-copy">
          <p className="eyebrow">{services.hero.tagline}</p>
          <RevealText as="h1" className="text-2xl services-title" play>{services.hero.title}</RevealText>
          <p className="text-md services-subtitle">{services.hero.subtitle}</p>
        </div>
        <div className="services-hero-blob">
          <GooeyBlob pose="design" cycle interactive />
        </div>
      </Section>

      <div className="services-pillars">
        <p className="eyebrow container services-pillars-label">{services.pillarsLabel}</p>
        {pillars.map((pillar, i) => (
          <Section key={pillar.key} theme={PILLAR_THEMES[pillar.key]} className="services-pillar container">
            <div className="services-pillar-visual">
              <GooeyBlob pose={pillar.key} />
            </div>
            <div className="services-pillar-body">
              <p className="services-pillar-index">{pad(i + 1)} / {pad(pillars.length)}</p>
              <RevealText as="h2" className="services-pillar-title">{pillar.title}</RevealText>
              <p className="text-md services-pillar-text">{pillar.text}</p>
              <div className="services-pillar-includes">
                <span className="eyebrow">{services.includes}</span>
                <ul>
                  {services.pillars[pillar.key].map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          </Section>
        ))}
      </div>

      <Section theme="paper" className="services-process container">
        <div ref={processRef} className="services-process-inner">
          <div className="services-process-head">
            <p className="eyebrow">{services.intro.subtitle}</p>
            <RevealText as="h2" className="text-xl">{services.process.title}</RevealText>
            <p className="services-process-intro">{services.intro.description}</p>
          </div>
          <div className="services-process-steps">
            <span className="services-process-line" aria-hidden="true">
              <span className="services-process-line-fill" />
            </span>
            <ol className="services-process-list">
              {services.process.steps.map((step) => (
                <li key={step.number} className="services-process-step">
                  <span className="services-process-number">{pad(step.number)}</span>
                  <RevealText as="h3" className="text-lg">{step.title}</RevealText>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section theme="paper" className="services-work container">
        <div className="services-work-head">
          <p className="eyebrow">{services.work.title}</p>
          <RevealText as="h2" className="text-xl">{services.work.subtitle}</RevealText>
          <Link to={ROUTES.PROJECTS} className="text-link services-work-link" viewTransition>{services.work.viewAll} →</Link>
        </div>
        <div className="services-work-grid">
          {featured.map((project) => (
            <Card key={project.id} project={project} sizes="(min-width: 900px) 33vw, 100vw" />
          ))}
        </div>
      </Section>

      <ContactCta />
    </div>
  );
}

export default Services;
