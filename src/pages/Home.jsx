import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import ProjectHero from '../components/ProjectHero';
import ScrubText from '../components/ScrubText';
import RevealText from '../components/RevealText';
import RevealImage from '../components/RevealImage';
import ResponsiveImage from '../components/ResponsiveImage';
import CircleLink from '../components/CircleLink';
import Card from '../components/Card';
import ServicesScroller from '../components/ServicesScroller';
import ProjectsWidget from '../components/ProjectsWidget';
import HorizontalScrollSection from '../components/HorizontalScrollSection';
import ContactCta from '../components/ContactCta';
import { useTranslation } from '../hooks/useTranslation';
import { useProjects } from '../hooks/useProjects';
import { getImage } from '../utils/images';
import { ROUTES } from '../utils/constants';
import './Home.css';

// Asymmetric editorial grid: each featured slot has its own crop
const FEATURED_RATIOS = ['4 / 3', '3 / 4', '3 / 4', '4 / 3'];
const IMAGE_BREAK = getImage('object/p3');

function Home() {
  const { t } = useTranslation();
  const projects = useProjects();
  const featured = useMemo(() => projects.filter((project) => project.featured), [projects]);

  return (
    <div className="home">
      <title>Arch Studio – Architecture, structure and monitoring</title>
      <h1 className="visually-hidden">Arch Studio – {t.footer.tagline}</h1>

      <ProjectHero projects={featured} />

      <Section theme="paper" className="home-statement">
        <div className="container grid">
          <p className="eyebrow home-label"><span>01</span>{t.home.statement.label}</p>
          <ScrubText className="text-lg home-statement-text">{t.home.statement.text}</ScrubText>
          <div className="home-statement-cta">
            <CircleLink to={ROUTES.ABOUT}>{t.home.statement.cta}</CircleLink>
          </div>
        </div>
      </Section>

      <Section theme="paper" className="home-featured">
        <div className="container">
          <div className="home-section-head">
            <p className="eyebrow home-label"><span>02</span>{t.home.featured.label}</p>
            <RevealText as="h2" className="text-xl">{t.home.featured.title}</RevealText>
            <Link to={ROUTES.PROJECTS} className="text-link home-section-link" viewTransition>
              {t.home.featured.viewAll} →
            </Link>
          </div>
          <div className="featured-grid">
            {featured.map((project, i) => (
              <Card
                key={project.id}
                project={project}
                ratio={FEATURED_RATIOS[i % FEATURED_RATIOS.length]}
                parallax={5}
                sizes="(min-width: 768px) 50vw, 100vw"
                className={`featured-item featured-item-${(i % FEATURED_RATIOS.length) + 1}`}
              />
            ))}
          </div>
        </div>
      </Section>

      <ServicesScroller />

      <Section theme="charcoal" className="home-image-break">
        <RevealImage parallax={8} className="home-image-break-media">
          <ResponsiveImage image={IMAGE_BREAK} alt="" sizes="100vw" />
        </RevealImage>
      </Section>

      <ProjectsWidget projects={projects} />

      <HorizontalScrollSection
        label={t.home.gallery.label}
        title={t.home.gallery.title}
        projects={projects}
      />

      <ContactCta />
    </div>
  );
}

export default Home;
