import React, { useRef } from 'react';
import Section from './Section';
import RevealText from './RevealText';
import CountUp from './CountUp';
import { gsap, useGSAP, withMotion } from '../lib/gsap';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { useInView } from '../hooks/useInView';
import './ProjectTimeline.css';

/**
 * The "monitoring" story for one project: overall progress and the five
 * phases from concept to handover, with the current phase highlighted.
 */
function ProjectTimeline({ project }) {
  const { t } = useTranslation();
  const { language } = useApp();
  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, { threshold: 0.3 });

  const { timeline } = project;
  const currentIndex = timeline.findIndex((step) => !step.done);
  // The line runs up to the phase in progress (or all the way when handed over)
  const lineFill = currentIndex === -1 ? 1 : currentIndex / (timeline.length - 1);
  const formatDate = new Intl.DateTimeFormat(language === 'shq' ? 'sq' : 'en-GB', { month: 'short', year: 'numeric' });

  useGSAP(() => withMotion(() => {
    const scrollTrigger = { trigger: timelineRef.current, start: 'top 70%', once: true };
    gsap.fromTo('.timeline-line-fill', { '--fill': 0 }, { '--fill': lineFill, duration: 1.8, ease: 'power3.inOut', scrollTrigger });
    gsap.fromTo('.timeline-progress-fill', { scaleX: 0 }, { scaleX: project.progress / 100, duration: 1.8, ease: 'power3.inOut', scrollTrigger });
    gsap.from('.timeline-step', { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.1, scrollTrigger });
  }), { scope: timelineRef, dependencies: [project.id], revertOnUpdate: true });

  return (
    <Section theme="stone" className="timeline">
      <div ref={timelineRef} className="timeline-inner container">
        <div className="timeline-head">
          <div>
            <p className="eyebrow">{t.projectDetail.monitoring.label}</p>
            <RevealText as="h2" className="text-xl timeline-title">{t.projectDetail.monitoring.title}</RevealText>
          </div>
          <div className="timeline-progress">
            <p className="timeline-progress-value">
              <CountUp value={project.progress} duration={1.8} play={isInView} />
              <span className="timeline-progress-unit">%</span>
            </p>
            <p className="timeline-progress-label">
              {t.projectDetail.monitoring.progress} · {t.status[project.status]}
            </p>
          </div>
        </div>

        <div
          className="timeline-progress-bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={project.progress}
          aria-label={t.projectDetail.monitoring.progress}
        >
          <span className="timeline-progress-fill" style={{ transform: `scaleX(${project.progress / 100})` }} />
        </div>

        <div className="timeline-track" style={{ '--steps': timeline.length }}>
          <span className="timeline-line" aria-hidden="true">
            <span className="timeline-line-fill" style={{ '--fill': lineFill }} />
          </span>
          <ol className="timeline-steps">
          {timeline.map((step, i) => {
            const state = step.done ? 'is-done' : i === currentIndex ? 'is-current' : 'is-upcoming';
            return (
              <li key={step.phase} className={`timeline-step ${state}`}>
                <span className="timeline-dot" aria-hidden="true" />
                <span className="timeline-phase">{t.projectDetail.phases[step.phase]}</span>
                <time className="timeline-date" dateTime={step.date}>
                  {formatDate.format(new Date(`${step.date}-01T00:00:00`))}
                </time>
                {i === currentIndex && (
                  <span className="timeline-now">{t.projectDetail.monitoring.current}</span>
                )}
              </li>
            );
          })}
          </ol>
        </div>
      </div>
    </Section>
  );
}

export default ProjectTimeline;
