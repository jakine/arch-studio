import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Section from './Section';
import ResponsiveImage from './ResponsiveImage';
import RevealText from './RevealText';
import { projectTransitionName } from './Card';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { useReducedMotion } from '../hooks/useMediaQuery';
import { useSwipe } from '../hooks/useSwipe';
import { sentenceCase, fill } from '../utils/format';
import './ProjectHero.css';

const SLIDE_SECONDS = 6;

/**
 * Full-screen project slider (ma-kr.nl style): wipes between projects, simple
 * dots, and a caption in the right third. Click either half of the picture,
 * a dot, or swipe; it also advances on its own.
 */
function ProjectHero({ projects }) {
  const { t } = useTranslation();
  const { isIntroPlaying } = useApp();
  const isReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const heroRef = useRef(null);
  const slidesRef = useRef([]);
  const directionRef = useRef(1);
  const previousIndexRef = useRef(0);

  const total = projects.length;
  const current = projects[index];

  const go = useCallback((step) => {
    directionRef.current = step;
    setIndex((i) => (i + step + total) % total);
  }, [total]);

  const goTo = (target) => {
    if (target === index) return;
    directionRef.current = target > index ? 1 : -1;
    setIndex(target);
  };

  // Advance on its own, unless someone is looking (hover/focus), the intro is
  // still playing or motion is reduced
  const isAutoplayRunning = !isPaused && !isIntroPlaying && !isReducedMotion;
  useEffect(() => {
    if (!isAutoplayRunning) return undefined;
    const next = gsap.delayedCall(SLIDE_SECONDS, () => go(1));
    return () => next.kill();
  }, [index, isAutoplayRunning, go]);

  // Wipe the incoming slide over the outgoing one, which drifts away underneath
  useGSAP(() => {
    const previous = previousIndexRef.current;

    // First slide: just the slow settle
    if (previous === index) {
      if (!prefersReducedMotion()) {
        gsap.fromTo(slidesRef.current[index].querySelector('.project-hero-media'), { scale: 1.08 }, { scale: 1, duration: SLIDE_SECONDS + 1.3, ease: 'power1.out' });
      }
      return;
    }
    previousIndexRef.current = index;

    const incoming = slidesRef.current[index];
    const outgoing = slidesRef.current[previous];
    const direction = directionRef.current;
    const incomingMedia = incoming.querySelector('.project-hero-media');
    const outgoingMedia = outgoing.querySelector('.project-hero-media');

    gsap.set(slidesRef.current, { zIndex: (i) => (i === index ? 2 : i === previous ? 1 : 0) });

    if (prefersReducedMotion()) {
      gsap.set(incoming, { clipPath: 'inset(0% 0% 0% 0%)' });
      return;
    }

    gsap.fromTo(
      incoming,
      { clipPath: direction > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power4.inOut', overwrite: true }
    );
    gsap.fromTo(incomingMedia, { xPercent: direction * 8, scale: 1.12 }, { xPercent: 0, duration: 1.3, ease: 'power4.inOut', overwrite: true });
    gsap.to(incomingMedia, { scale: 1, duration: SLIDE_SECONDS + 1.3, ease: 'power1.out' });
    gsap.to(outgoingMedia, { xPercent: -direction * 12, duration: 1.3, ease: 'power4.inOut', overwrite: true });
  }, { scope: heroRef, dependencies: [index] });

  // Touch swipe; mouse users click either half
  const swipe = useSwipe(go);

  // Morph this slide's image into the project page
  const handleCaptionClick = () => {
    const media = slidesRef.current[index]?.querySelector('.project-hero-media');
    if (media) media.style.viewTransitionName = projectTransitionName(current.id);
  };

  return (
    <Section
      theme="paper"
      tint="light"
      className="project-hero"
      aria-roledescription="carousel"
      aria-label={t.home.featured.title}
    >
      <div
        ref={heroRef}
        className="project-hero-inner"
        onPointerEnter={(e) => e.pointerType === 'mouse' && setIsPaused(true)}
        onPointerLeave={() => setIsPaused(false)}
        {...swipe}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div className="project-hero-slides">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(node) => { slidesRef.current[i] = node; }}
              className={`project-hero-slide ${i === 0 ? 'is-first' : ''}`.trim()}
              aria-hidden={i !== index}
            >
              <div className="project-hero-media">
                {/* Later slides wait behind a clip, so fetch them up front (at low priority) */}
                <ResponsiveImage image={project.featuredImage} alt={project.name} sizes="100vw" priority={i === 0} loading="eager" />
              </div>
            </div>
          ))}
        </div>

        <div className="project-hero-shade" aria-hidden="true" />

        <button type="button" className="project-hero-zone is-prev" data-cursor="prev" aria-label={t.home.hero.previous} onClick={() => go(-1)} />
        <button type="button" className="project-hero-zone is-next" data-cursor="next" aria-label={t.home.hero.next} onClick={() => go(1)} />

        <div className="project-hero-overlay container">
          <div className="project-hero-meta">
            <div className="project-hero-dots">
              {projects.map((project, i) => (
                <button
                  key={project.id}
                  type="button"
                  className={`project-hero-dot ${i === index ? 'is-active' : ''}`.trim()}
                  aria-label={fill(t.home.hero.showProject, { n: i + 1, name: sentenceCase(project.name) })}
                  aria-current={i === index ? 'true' : undefined}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>

            <Link
              to={current.link}
              className="project-hero-caption"
              data-cursor="open"
              onClick={handleCaptionClick}
              viewTransition
            >
              <span key={current.id} className="project-hero-subtitle">
                {t.categories[current.category] || current.title} — {sentenceCase(current.name)}
              </span>
              <RevealText key={`${current.id}-title`} as="h2" className="project-hero-title" play={!isIntroPlaying}>
                {current.description}
              </RevealText>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default ProjectHero;
