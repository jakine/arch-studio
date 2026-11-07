import React, { useEffect, useRef } from 'react';
import { Flip } from 'gsap/Flip';
import { gsap, useGSAP } from '../lib/gsap';
import { useApp } from '../context/AppContext';
import { useSmoothScroll } from './SmoothScroll';
import LogoInline from './LogoInline';
import './Intro.css';

gsap.registerPlugin(Flip);

// Seconds the logo rests in the middle before heading to the header
const HOLD = 0.8;

/**
 * Splash: the ARCH mark rises in the middle of the screen, rests there for a
 * moment, then glides into its place in the header while the curtain lifts.
 * Click, scroll or press any key to fast-forward.
 */
function Intro({ targetRef }) {
  const { finishIntro } = useApp();
  const { stop, start } = useSmoothScroll();
  const introRef = useRef(null);
  const curtainRef = useRef(null);
  const markRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(() => {
    const mark = markRef.current;
    const target = targetRef.current;

    stop();

    const timeline = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        gsap.set(target, { visibility: 'visible' });
        finishIntro();
      },
    });

    timeline
      // Rise into view (clip only, so Flip measures the mark untouched)
      .fromTo(mark, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power4.out' })
      // Rest, then land in the header while the curtain lifts
      .add(Flip.fit(mark, target, { scale: true, duration: 1.1, ease: 'power3.inOut' }), `+=${HOLD}`)
      .to(mark, { color: getComputedStyle(target).color, duration: 1.1, ease: 'power3.inOut' }, '<')
      .to(curtainRef.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'power4.inOut' }, '<0.1');

    timelineRef.current = timeline;
  }, { scope: introRef });

  // Fast-forward on any intent to move on
  useEffect(() => {
    const skip = () => timelineRef.current?.timeScale(4);
    window.addEventListener('pointerdown', skip);
    window.addEventListener('keydown', skip);
    window.addEventListener('wheel', skip, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('wheel', skip);
      start();
    };
  }, [start]);

  return (
    <div ref={introRef} className="intro" aria-hidden="true">
      <div ref={curtainRef} className="intro-curtain" />
      <div className="intro-stage">
        <div ref={markRef} className="intro-mark">
          <LogoInline className="intro-logo" />
        </div>
      </div>
    </div>
  );
}

export default Intro;
