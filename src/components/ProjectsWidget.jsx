import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import Section from './Section';
import ResponsiveImage from './ResponsiveImage';
import { projectTransitionName } from './Card';
import { useTranslation } from '../hooks/useTranslation';
import { useInView } from '../hooks/useInView';
import { getAllCategories, getCategoryCounts } from '../utils/projectsData';
import { ROUTES } from '../utils/constants';
import { sentenceCase } from '../utils/format';
import './ProjectsWidget.css';

// ma-kr order: the categories first, "all" last
const CATEGORIES = [...getAllCategories(), 'all'];
const COUNTS = getCategoryCounts();

/**
 * Category list with project counts beside a large image (ma-kr "Soort project").
 * Hovering a category shows one of its projects; the choice stays when the
 * pointer leaves. Clicking a category opens the filtered projects page.
 */
function ProjectsWidget({ projects }) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const slidesRef = useRef({});
  const widgetRef = useRef(null);
  // Hidden slides sit behind a full clip, which lazy loading never fetches:
  // load them all once the widget is a screen away, so hovering never shows a placeholder
  const isNear = useInView(widgetRef, { threshold: 0, rootMargin: '100% 0px' });

  const labelOf = (category) => (category === 'all' ? t.home.categories.all : t.categories[category]);

  // One project per category: its first. "All" shows the first featured project
  // no category shows already, so every hover changes the picture
  const panels = useMemo(() => {
    const firstOf = (category) => projects.find((project) => project.category === category);
    const shown = getAllCategories().map(firstOf);
    return CATEGORIES.map((category) => ({
      category,
      project: (category === 'all'
        ? projects.find((project) => project.featured && !shown.includes(project))
        : firstOf(category)) || projects[0],
    }));
  }, [projects]);
  const active = panels.find((panel) => panel.category === activeCategory);

  // Morph the shown image into the project page
  const handleImageClick = () => {
    const slide = slidesRef.current[activeCategory];
    if (slide) slide.style.viewTransitionName = projectTransitionName(active.project.id);
  };

  return (
    <Section theme="white" className="projects-widget">
      <div ref={widgetRef} className="projects-widget-inner container">
        <div className="projects-widget-categories">
          <p className="eyebrow">{t.home.categories.label}</p>
          <ul className="projects-widget-list">
            {CATEGORIES.map((category) => (
              <li key={category} className={category === activeCategory ? 'is-active' : ''}>
                <Link
                  to={category === 'all' ? ROUTES.PROJECTS : `${ROUTES.PROJECTS}?category=${category}`}
                  onPointerEnter={() => setActiveCategory(category)}
                  onFocus={() => setActiveCategory(category)}
                  viewTransition
                >
                  {labelOf(category)}
                  <span className="projects-widget-count">{COUNTS[category]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="projects-widget-media">
          <Link
            to={active.project.link}
            className="projects-widget-image"
            data-cursor="open"
            aria-label={sentenceCase(active.project.name)}
            onClick={handleImageClick}
            viewTransition
          >
            {panels.map(({ category, project }) => (
              <div
                key={category}
                ref={(node) => { slidesRef.current[category] = node; }}
                className={`projects-widget-slide ${category === activeCategory ? 'is-active' : ''}`.trim()}
              >
                <ResponsiveImage
                  image={project.featuredImage}
                  alt=""
                  sizes="(min-width: 900px) 55vw, 100vw"
                  loading={isNear ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </Link>
          <p key={activeCategory} className="projects-widget-caption">
            {labelOf(activeCategory)} — {sentenceCase(active.project.name)}
          </p>
        </div>
      </div>
    </Section>
  );
}

export default ProjectsWidget;
