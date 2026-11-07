import React, { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';

const SmoothScrollContext = createContext(null);

// Custom hook to lock/unlock and drive page scrolling
export const useSmoothScroll = () => {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error('useSmoothScroll must be used within SmoothScroll');
  }
  return context;
};

/**
 * Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in
 * sync. Skipped entirely for reduced motion; the API then falls back to native.
 */
function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const isLockedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;

    // Someone may have locked scrolling before Lenis existed (child effects run first)
    if (isLockedRef.current) lenis.stop();

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Keep trigger positions right when late content (images, fonts) changes page height
  useEffect(() => {
    let timeoutId;
    const refresh = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => ScrollTrigger.refresh(), 150);
    };

    const observer = new ResizeObserver(refresh);
    observer.observe(document.body);
    document.fonts?.ready.then(refresh);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  // Stable API: consumers never re-render because of scrolling
  const api = useMemo(() => ({
    stop: () => {
      isLockedRef.current = true;
      document.documentElement.classList.add('is-scroll-locked');
      lenisRef.current?.stop();
    },
    start: () => {
      isLockedRef.current = false;
      document.documentElement.classList.remove('is-scroll-locked');
      lenisRef.current?.start();
    },
    scrollTo: (target, options = {}) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, options);
        return;
      }
      window.scrollTo({ top: target, behavior: options.immediate ? 'instant' : 'smooth' });
    },
  }), []);

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
}

export default SmoothScroll;
