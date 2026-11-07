import React, { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, withMotion } from '../lib/gsap';
import './RevealImage.css';

// Longest the wipe waits for its photo before playing anyway
const LOAD_TIMEOUT = 1500;

const whenLoaded = (img) => (img.complete && img.naturalWidth > 0
  ? Promise.resolve()
  : new Promise((resolve) => {
    img.addEventListener('load', resolve, { once: true });
    img.addEventListener('error', resolve, { once: true });
  }));

/**
 * Wipes its content in from the bottom with a slow settle-in scale, once it's
 * in view and its photo has loaded, so the wipe never shows a placeholder.
 * `parallax` (percent) adds a scrubbed vertical drift afterwards.
 */
function RevealImage({ children, className = '', parallax = 0, ...props }) {
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);

  useGSAP(() => withMotion(() => {
    const wrapper = wrapperRef.current;
    const images = () => [...wrapper.querySelectorAll('img')];
    const loadNow = () => images().forEach((img) => { img.loading = 'eager'; });
    // Keep some overscan while drifting so edges never show
    const restScale = parallax ? 1 + (parallax * 2.4) / 100 : 1;
    let isActive = true;
    let timeoutId;

    const reveal = gsap.timeline({ paused: true })
      .fromTo(wrapper, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.out' }, 0)
      .fromTo(innerRef.current, { scale: restScale + 0.25 }, { scale: restScale, duration: 1.8, ease: 'expo.out' }, 0);

    // The image sits behind a full clip, which lazy loading treats as never
    // visible: fetch it a screen ahead instead
    ScrollTrigger.create({ trigger: wrapper, start: 'top bottom+=100%', once: true, onEnter: loadNow });

    ScrollTrigger.create({
      trigger: wrapper,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        loadNow(); // in case a fast jump skipped the early trigger
        const timeout = new Promise((resolve) => { timeoutId = setTimeout(resolve, LOAD_TIMEOUT); });
        Promise.race([Promise.all(images().map(whenLoaded)), timeout]).then(() => {
          clearTimeout(timeoutId);
          if (isActive) reveal.play();
        });
      },
    });

    if (parallax) {
      gsap.fromTo(
        innerRef.current,
        { yPercent: -parallax },
        {
          yPercent: parallax,
          ease: 'none',
          scrollTrigger: { trigger: wrapper, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    }

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
    };
  }), { scope: wrapperRef, dependencies: [parallax], revertOnUpdate: true });

  return (
    <div ref={wrapperRef} className={`reveal-image ${className}`.trim()} {...props}>
      <div ref={innerRef} className="reveal-image-inner">
        {children}
      </div>
    </div>
  );
}

export default RevealImage;
