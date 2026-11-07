import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import GooeyBlob from './GooeyBlob';
import Section from './Section';
import { gsap, ScrollTrigger, useGSAP, withMotion } from '../lib/gsap';
import { morphPose } from '../lib/blobPoses';
import { setSectionTheme, setHeaderTint, PILLAR_THEMES } from '../lib/pageTheme';
import { useTranslation } from '../hooks/useTranslation';
import { useReducedMotion } from '../hooks/useMediaQuery';
import { ROUTES } from '../utils/constants';
import { pad } from '../utils/format';
import './ServicesScroller.css';

// How long the section stays pinned, in viewport heights
const PIN_LENGTH = '250%';
// Timeline length of one blob change (relative to the 0.6 holds)
const MORPH_LENGTH = 1.4;

// Same three phases, stacked, for reduced motion
function ServicesList({ steps, label, cta }) {
  return (
    <div className="process-static container">
      <p className="eyebrow">{label}</p>
      {steps.map((step, i) => (
        <Section key={step.key} theme={PILLAR_THEMES[step.key]} className="process-static-step">
          <GooeyBlob pose={step.key} drift={false} className="process-static-blob" />
          <div>
            <p className="process-static-index">{pad(i + 1)}</p>
            <h2 className="text-2xl">{step.title}</h2>
            <p className="text-md process-static-text">{step.text}</p>
          </div>
        </Section>
      ))}
      <Link to={ROUTES.SERVICES} className="text-link process-link" viewTransition>{cta} →</Link>
    </div>
  );
}

/**
 * Pinned story of the studio's three services. Scrolling scrubs one timeline:
 * titles roll, copy cross-fades, the blob changes pose and the page changes color.
 */
function ServicesScroller() {
  const { t } = useTranslation();
  const isReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const blobRef = useRef(null);
  const counterRef = useRef(null);
  const { label, cta, steps } = t.home.process;

  useGSAP(() => withMotion(() => {
    const section = sectionRef.current;
    // The static list is showing (reduced motion was switched on mid-visit)
    if (!section) return;
    const titles = gsap.utils.toArray('.process-title', section);
    const texts = gsap.utils.toArray('.process-text', section);
    const dots = gsap.utils.toArray('.process-dot', section);
    let phase = -1;

    const setPhase = (next) => {
      if (next === phase) return;
      // Not a <Section>, so clear any image tint left by the hero on the way in
      if (phase === -1) setHeaderTint('auto');
      phase = next;
      setSectionTheme(PILLAR_THEMES[steps[next].key]);
      counterRef.current.textContent = pad(next + 1);
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === next));
    };

    // ±130%, not 100%: descenders hang below the line box and would peek into the window
    gsap.set(titles.slice(1), { yPercent: 130 });
    gsap.set(texts.slice(1), { autoAlpha: 0, y: 24 });

    const timeline = gsap.timeline({ defaults: { duration: 0.9, ease: 'power3.inOut' } });
    // Hold → change → hold → change → hold, a change per phase after the first.
    // During a change the blob melts into one mass and splits into the next
    // shape; the title rolls over while it's merged.
    timeline.to({}, { duration: 0.6 });
    for (let i = 1; i < steps.length; i++) {
      const start = timeline.duration();
      timeline
        .add(morphPose(blobRef.current.circles, steps[i - 1].key, steps[i].key, { duration: MORPH_LENGTH }), start)
        .addLabel(`phase${i}`, start + MORPH_LENGTH / 2)
        .to(titles[i - 1], { yPercent: -130 }, start + 0.25)
        .to(titles[i], { yPercent: 0 }, start + 0.25)
        .to(texts[i - 1], { autoAlpha: 0, y: -24, duration: 0.45, ease: 'power2.in' }, start + 0.2)
        .to(texts[i], { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' }, start + 0.75)
        .to({}, { duration: 0.6 }, start + MORPH_LENGTH);
    }

    // Phase boundaries sit halfway through each change
    const thresholds = steps.slice(1).map((_, i) => timeline.labels[`phase${i + 1}`] / timeline.duration());
    const phaseAt = (progress) => thresholds.filter((threshold) => progress >= threshold).length;

    const pin = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${PIN_LENGTH}`,
      pin: true,
      scrub: 1.2,
      animation: timeline,
    });

    // Page color for the whole stretch this section owns: scrolling in, pinned
    // and scrolling out (like a <Section>: top at 50% → bottom at 50%).
    // Phase comes from the scroll position, not pin.progress, which can still
    // be stale here when scrolling up (triggers then update bottom-up).
    const pinProgress = (scroll) => gsap.utils.clamp(0, 1, (scroll - pin.start) / (pin.end - pin.start));
    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      end: () => `+=${section.offsetHeight + pin.end - pin.start}`,
      onToggle: (self) => {
        // Forget the phase on leave so coming back re-applies the page color
        phase = -1;
        if (self.isActive) setPhase(phaseAt(pinProgress(self.scroll())));
      },
      onUpdate: (self) => self.isActive && setPhase(phaseAt(pinProgress(self.scroll()))),
    });
  }), { scope: sectionRef, dependencies: [steps], revertOnUpdate: true });

  if (isReducedMotion) {
    return <ServicesList steps={steps} label={label} cta={cta} />;
  }

  return (
    <section ref={sectionRef} className="process" aria-label={label}>
      <div className="process-inner container">
        <div className="process-top">
          <p className="eyebrow">{label}</p>
          <p className="process-counter" aria-hidden="true">
            <span ref={counterRef}>01</span> / {pad(steps.length)}
          </p>
        </div>

        <div className="process-visual">
          <GooeyBlob ref={blobRef} pose={steps[0].key} interactive />
        </div>

        <div className="process-copy">
          <h2 className="process-titles">
            {steps.map((step) => (
              <span key={step.key} className="process-title text-display">{step.title}</span>
            ))}
          </h2>
          <div className="process-texts">
            {steps.map((step) => (
              <p key={step.key} className="process-text text-md">{step.text}</p>
            ))}
          </div>
        </div>

        <div className="process-bottom">
          <div className="process-dots" aria-hidden="true">
            {steps.map((step, i) => (
              <span key={step.key} className={`process-dot ${i === 0 ? 'is-active' : ''}`.trim()} />
            ))}
          </div>
          <Link to={ROUTES.SERVICES} className="text-link process-link" viewTransition>{cta} →</Link>
        </div>
      </div>
    </section>
  );
}

export default ServicesScroller;
