import React, { useState, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Section from '../components/Section';
import ResponsiveImage from '../components/ResponsiveImage';
import RevealText from '../components/RevealText';
import RevealImage from '../components/RevealImage';
import ProjectTimeline from '../components/ProjectTimeline';
import Lightbox from '../components/Lightbox';
import { projectTransitionName } from '../components/Card';
import { getProjectById, getNextProject, getTranslatedProject } from '../utils/projectsData';
import { ROUTES } from '../utils/constants';
import { sentenceCase } from '../utils/format';
import { useTranslation } from '../hooks/useTranslation';
import { useApp } from '../context/AppContext';
import NotFound from './NotFound';
import './ProjectDetail.css';

// Gallery rhythm: full bleed, then a staggered pair
const SHOT_LAYOUTS = ['wide', 'left', 'right'];

function NextProject({ project }) {
  const { t } = useTranslation();
  const mediaRef = useRef(null);

  // Morph the preview image into the next project's hero
  const handleClick = () => {
    mediaRef.current.style.viewTransitionName = projectTransitionName(project.id);
  };

  return (
    <Section theme="charcoal" className="pd-next">
      <Link
        to={project.link}
        className="pd-next-link container"
        data-cursor="open"
        onClick={handleClick}
        viewTransition
      >
        <p className="eyebrow">{t.projectDetail.nextProject}</p>
        <span className="pd-next-name text-display">{sentenceCase(project.name)}</span>
        <span ref={mediaRef} className="pd-next-media">
          {/* Hidden behind a clip until hover, so lazy loading would never fetch it */}
          <ResponsiveImage image={project.featuredImage} alt="" sizes="(min-width: 768px) 30vw, 60vw" loading="eager" />
        </span>
      </Link>
    </Section>
  );
}

function ProjectDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { language } = useApp();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const baseProject = getProjectById(id);

  // Get translated project data
  const project = useMemo(() => baseProject && getTranslatedProject(baseProject, language), [baseProject, language]);
  const nextProject = useMemo(() => baseProject && getTranslatedProject(getNextProject(id), language), [baseProject, id, language]);

  if (!project) {
    return <NotFound />;
  }

  const category = t.categories[project.category] || project.title;
  const facts = [
    { label: t.projectDetail.category, value: category },
    { label: t.projectDetail.year, value: project.year },
    { label: t.projectDetail.location, value: project.location },
    { label: t.projectDetail.area, value: project.area },
    { label: t.projectDetail.status, value: t.status[project.status] },
  ];

  return (
    // Keyed so moving to the next project replays every entrance
    <article key={project.id} className="project-detail">
      <title>{`${sentenceCase(project.name)} | Arch Studio`}</title>

      <Section theme="paper" tint="light" className="pd-hero">
        <div className="pd-hero-media" style={{ viewTransitionName: projectTransitionName(project.id) }}>
          <ResponsiveImage image={project.images[0]} alt={project.name} sizes="100vw" priority />
        </div>
        <div className="pd-hero-shade" aria-hidden="true" />
        <div className="pd-hero-content container">
          <Link to={ROUTES.PROJECTS} className="text-link pd-back" viewTransition>{t.projectDetail.backToProjects}</Link>
          <p className="pd-hero-category">{category} · {project.year}</p>
          <RevealText as="h1" className="text-display pd-title" play delay={0.2}>
            {sentenceCase(project.name)}
          </RevealText>
        </div>
      </Section>

      <Section theme="paper" className="pd-intro container">
        <dl className="pd-facts">
          {facts.map(({ label, value }) => (
            <div key={label} className="pd-fact">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="pd-story">
          <RevealText as="p" className="text-lg pd-lead">{project.description}</RevealText>
          <p className="text-md pd-body">{project.longDescription}</p>
          <div className="pd-services">
            <span className="eyebrow">{t.projectDetail.services}</span>
            <ul>
              {project.services.map((service) => (
                <li key={service}>{t.serviceNames[service]}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {project.images.length > 1 && (
        <Section theme="paper" className="pd-gallery container" aria-label={t.projectDetail.gallery}>
          {project.images.slice(1).map((image, i) => (
            <button
              key={image.key}
              type="button"
              className={`pd-shot is-${SHOT_LAYOUTS[i % SHOT_LAYOUTS.length]}`}
              data-cursor="zoom"
              aria-label={t.projectDetail.openImage}
              onClick={() => setLightboxIndex(i + 1)}
            >
              <RevealImage parallax={4} className="pd-shot-media">
                <ResponsiveImage image={image} alt="" sizes="(min-width: 768px) 60vw, 100vw" />
              </RevealImage>
            </button>
          ))}
        </Section>
      )}

      <ProjectTimeline project={project} />

      <NextProject project={nextProject} />

      <Lightbox
        images={project.images}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
        title={project.name}
      />
    </article>
  );
}

export default ProjectDetail;
