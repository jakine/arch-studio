import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ResponsiveImage from './ResponsiveImage';
import RevealImage from './RevealImage';
import { useTranslation } from '../hooks/useTranslation';
import { sentenceCase } from '../utils/format';
import './Card.css';

// Shared with ProjectDetail's hero so the image morphs between the two pages
export const projectTransitionName = (id) => `project-${id}`;

/**
 * Project card: image with a colored hover wash, then category, name and year.
 * Over the image the cursor turns into a transparent ring, so the wash text
 * stays readable. Expects an already-translated project.
 */
const Card = React.memo(function Card({ project, ratio = '4 / 5', sizes = '(min-width: 768px) 40vw, 100vw', parallax = 0, headingLevel = 3, className = '' }) {
  const { t } = useTranslation();
  const mediaRef = useRef(null);
  const category = t.categories[project.category] || project.title;
  const Heading = `h${headingLevel}`;

  // Only the clicked card gets the transition name: the same project can be
  // on the page twice, and duplicate names cancel the view transition
  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    mediaRef.current.style.viewTransitionName = projectTransitionName(project.id);
  };

  return (
    <Link
      to={project.link}
      className={`card ${className}`.trim()}
      onClick={handleClick}
      viewTransition
    >
      <div ref={mediaRef} className="card-media" style={{ aspectRatio: ratio }} data-cursor="ring">
        <RevealImage className="card-reveal" parallax={parallax}>
          <ResponsiveImage image={project.featuredImage} alt={project.name} sizes={sizes} />
        </RevealImage>
        <div className="card-overlay" aria-hidden="true">
          <span className="card-overlay-title">{project.description}</span>
        </div>
      </div>
      <div className="card-meta">
        <span className="card-category">{category}</span>
        <Heading className="card-name">{sentenceCase(project.name)}</Heading>
        <span className="card-year">{project.year}</span>
      </div>
    </Link>
  );
});

Card.displayName = 'Card';

export default Card;
