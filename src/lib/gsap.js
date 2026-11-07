// Single place where GSAP and its plugins are registered and configured
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

// Flip is registered by the few components that use it, keeping it out of the main bundle
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Same feel as ma-kr.nl: Power3.easeOut at 0.8s
gsap.defaults({ ease: 'power3.out', duration: 0.8 });

export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
export const FINE_POINTER = '(hover: hover) and (pointer: fine)';

export const matches = (query) =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia(query).matches;

export const prefersReducedMotion = () => matches(REDUCED_MOTION);

/**
 * Run `setup` only when the user hasn't asked for reduced motion.
 * Returns a cleanup, so it can be returned straight from a useGSAP callback.
 */
export const withMotion = (setup) => {
  const mm = gsap.matchMedia();
  mm.add(MOTION_OK, setup);
  return () => mm.revert();
};

export { gsap, ScrollTrigger, SplitText, useGSAP };

