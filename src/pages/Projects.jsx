import React, { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Section from '../components/Section';
import Card from '../components/Card';
import StatItem from '../components/StatItem';
import RevealText from '../components/RevealText';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { getAllCategories, getCategoryCounts } from '../utils/projectsData';
import { useInView } from '../hooks/useInView';
import { useProjects } from '../hooks/useProjects';
import { useTranslation } from '../hooks/useTranslation';
import './Projects.css';

const CATEGORIES = ['all', ...getAllCategories()];
const COUNTS = getCategoryCounts();
const FIRST_YEAR = 2021;

function Projects() {
  const { t } = useTranslation();
  const projects = useProjects();
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsRef = useRef(null);
  const statsRef = useRef(null);
  const hasSwitchedRef = useRef(false);

  // Category lives in the URL so the home page can link straight to a filter
  const requested = searchParams.get('category');
  const category = CATEGORIES.includes(requested) ? requested : 'all';
  const isShown = (project) => category === 'all' || project.category === category;

  // The counters start when the stats scroll in
  const statsInView = useInView(statsRef);

  // After a switch, the cards now shown rise into place. Cards never travel
  // between grid positions, so nothing crosses the page while filtering.
  const { contextSafe } = useGSAP(() => {
    if (!hasSwitchedRef.current) return;
    hasSwitchedRef.current = false;
    gsap.set(itemsRef.current, { autoAlpha: 1 });
    gsap.fromTo(
      itemsRef.current.querySelectorAll('.projects-item:not(.is-hidden)'),
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.06, clearProps: 'opacity,visibility,transform' }
    );
  }, { scope: itemsRef, dependencies: [category] });

  // Fade the grid out, then switch
  const changeCategory = contextSafe((next) => {
    if (next === category) return;
    const apply = () => setSearchParams(next === 'all' ? {} : { category: next }, { replace: true, preventScrollReset: true });

    if (prefersReducedMotion()) {
      apply();
      return;
    }
    hasSwitchedRef.current = true;
    gsap.to(itemsRef.current, { autoAlpha: 0, duration: 0.2, ease: 'power1.out', overwrite: true, onComplete: apply });
  });

  return (
    <div className="projects-page">
      <title>{`${t.projects.title} | Arch Studio`}</title>

      <Section theme="paper" className="projects-head container">
        <p className="eyebrow">{t.projects.label}</p>
        <div className="projects-title text-display">
          <RevealText as="h1" play>{t.projects.title}</RevealText>
          <sup className="projects-title-count" aria-hidden="true">{projects.length}</sup>
        </div>
        <div className="projects-intro-row">
          <p className="text-md projects-intro">{t.projects.intro}</p>
          <div ref={statsRef} className="projects-stats">
            <StatItem value={projects.length} play={statsInView} label={t.projects.totalProjects} />
            <StatItem value={CATEGORIES.length - 1} play={statsInView} label={t.projects.categories} />
            <StatItem value={new Date().getFullYear() - FIRST_YEAR} play={statsInView} label={t.projects.activeYears} />
          </div>
        </div>
      </Section>

      <Section theme="paper" className="projects-body container">
        <div className="projects-filters" role="group" aria-label={t.projects.filterBy}>
          {CATEGORIES.map((key) => (
            <button
              key={key}
              type="button"
              className={`filter-button ${category === key ? 'is-active' : ''}`.trim()}
              onClick={() => changeCategory(key)}
              aria-pressed={category === key}
            >
              {key === 'all' ? t.projects.allProjects : t.categories[key]}
              <sup>{COUNTS[key]}</sup>
            </button>
          ))}
        </div>

        <div ref={itemsRef} className="projects-items">
          {projects.map((project) => (
            <div key={project.id} className={`projects-item ${isShown(project) ? '' : 'is-hidden'}`.trim()}>
              <Card project={project} sizes="(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 100vw" headingLevel={2} />
            </div>
          ))}
        </div>

        {!projects.some(isShown) && (
          <p className="no-projects">{t.projects.noProjectsFound}</p>
        )}
      </Section>
    </div>
  );
}

export default Projects;
