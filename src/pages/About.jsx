import React, { useRef } from 'react';
import Section from '../components/Section';
import RevealText from '../components/RevealText';
import RevealImage from '../components/RevealImage';
import ScrubText from '../components/ScrubText';
import ResponsiveImage from '../components/ResponsiveImage';
import StatItem from '../components/StatItem';
import ContactCta from '../components/ContactCta';
import { useTranslation } from '../hooks/useTranslation';
import { useInView } from '../hooks/useInView';
import { projectsData, SERVICES } from '../utils/projectsData';
import { getImage } from '../utils/images';
import { pad } from '../utils/format';
import './About.css';

const FIRST_YEAR = 2021;
const HERO_IMAGE = getImage('house/p2');
const APPROACH_KEYS = ['designPhilosophy', 'collaborativeProcess', 'sustainableDesign', 'attentionToDetail'];
const VALUE_KEYS = ['innovation', 'integrity', 'excellence', 'clientFocus', 'community'];
const WHAT_WE_DO = [
  { key: 'residentialArchitecture', image: getImage('house/p1') },
  { key: 'commercialDesign', image: getImage('object/p3') },
  { key: 'interiorDesign', image: getImage('villa/p3') },
  { key: 'consultation', image: getImage('tower/p2') },
];

function About() {
  const { t } = useTranslation();
  const about = t.about;
  const statsRef = useRef(null);
  // The counters start when the band scrolls in
  const statsInView = useInView(statsRef);

  return (
    <div className="about">
      <title>{`${t.nav.about} | Arch Studio`}</title>

      <Section theme="paper" className="about-hero container">
        <p className="eyebrow">{t.nav.about}</p>
        <RevealText as="h1" className="text-2xl about-tagline" play>{about.tagline}</RevealText>
      </Section>

      <Section theme="paper" className="about-hero-image">
        <RevealImage parallax={6} className="about-hero-media">
          <ResponsiveImage image={HERO_IMAGE} alt="" sizes="100vw" />
        </RevealImage>
      </Section>

      <Section theme="paper" className="about-story container grid">
        <h2 className="eyebrow about-label"><span>01</span>{about.ourStory.title}</h2>
        <div className="about-story-text">
          <ScrubText className="text-lg">{about.ourStory.paragraph1}</ScrubText>
          <p className="text-md about-muted">{about.ourStory.paragraph2}</p>
        </div>
      </Section>

      <Section theme="green" className="about-stats">
        <div ref={statsRef} className="about-stats-inner container">
          <p className="eyebrow">{about.stats.label}</p>
          <div className="about-stats-row">
            <StatItem value={projectsData.length} play={statsInView} format={pad} label={about.stats.projects} />
            <StatItem value={new Date().getFullYear() - FIRST_YEAR} play={statsInView} format={pad} label={about.stats.years} />
            <StatItem value={SERVICES.length} play={statsInView} format={pad} label={about.stats.disciplines} />
          </div>
        </div>
      </Section>

      <Section theme="paper" className="about-approach container">
        <h2 className="eyebrow about-label"><span>02</span>{about.ourApproach.title}</h2>
        <ol className="about-approach-grid">
          {APPROACH_KEYS.map((key, i) => (
            <li key={key} className="about-approach-item">
              <span className="about-index">{pad(i + 1)}</span>
              <RevealText as="h3" className="text-lg">{about.ourApproach[key].title}</RevealText>
              <p className="about-muted">{about.ourApproach[key].text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section theme="white" className="about-work container">
        <h2 className="eyebrow about-label"><span>03</span>{about.whatWeDo.title}</h2>
        {WHAT_WE_DO.map(({ key, image }, i) => (
          <article key={key} className={`about-media-text ${i % 2 ? 'is-reversed' : ''}`.trim()}>
            <RevealImage parallax={5} className="about-media-text-image">
              <ResponsiveImage image={image} alt="" sizes="(min-width: 900px) 55vw, 100vw" />
            </RevealImage>
            <div className="about-media-text-body">
              <RevealText as="h3" className="text-xl">{about.whatWeDo[key].title}</RevealText>
              <p className="text-md about-muted">{about.whatWeDo[key].text}</p>
            </div>
          </article>
        ))}
      </Section>

      <Section theme="paper" className="about-values container">
        <h2 className="eyebrow about-label"><span>04</span>{about.ourValues.title}</h2>
        <ul className="about-values-list">
          {VALUE_KEYS.map((key) => (
            <li key={key} className="about-value">
              <RevealText as="h3" className="text-xl">{about.ourValues[key].label.replace(/:$/, '')}</RevealText>
              <p className="about-muted">{about.ourValues[key].text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <ContactCta />
    </div>
  );
}

export default About;
