import React, { useRef } from 'react';
import Card from './Card';
import Section from './Section';
import RevealText from './RevealText';
import { gsap, useGSAP } from '../lib/gsap';
import { pad } from '../utils/format';
import './HorizontalScrollSection.css';

// Same condition as the CSS fallback in HorizontalScrollSection.css
const PINNED_QUERY = '(min-width: 900px) and (prefers-reduced-motion: no-preference)';
// Rest on the first and last card before sliding, as a share of the slide distance
const HOLD_START = 0.3;
const HOLD_END = 0.2;

/**
 * Project strip: on desktop the section pins and vertical scrolling slides the
 * cards sideways; on touch / reduced motion it's a native swipeable row.
 */
const HorizontalScrollSection = ({ label, title, projects }) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(PINNED_QUERY, () => {
      const track = trackRef.current;
      const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);

      // Rest → slide → rest, whichever way you scroll; the progress line only
      // moves while the cards do
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${distance() * (1 + HOLD_START + HOLD_END)}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
        .to({}, { duration: HOLD_START })
        .to(track, { x: () => -distance(), ease: 'none', duration: 1 })
        .to(progressRef.current, { scaleX: 1, ease: 'none', duration: 1 }, '<')
        .to({}, { duration: HOLD_END });
    });

    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [projects], revertOnUpdate: true });

  return (
    <Section theme="paper" className="hscroll">
      <div ref={sectionRef} className="hscroll-pin">
        <div className="hscroll-head container">
          <p className="eyebrow">{label}</p>
          <RevealText as="h2" className="text-xl hscroll-title">{title}</RevealText>
          <span className="hscroll-count">{pad(projects.length)}</span>
        </div>
        <div ref={trackRef} className="hscroll-track">
          {projects.map((project) => (
            <Card
              key={project.id}
              project={project}
              ratio="3 / 4"
              sizes="(min-width: 900px) 26vw, 75vw"
              className="hscroll-card"
            />
          ))}
        </div>
        <div className="hscroll-progress container" aria-hidden="true">
          <span ref={progressRef} className="hscroll-progress-bar" />
        </div>
      </div>
    </Section>
  );
};

export default HorizontalScrollSection;
