import React, { useRef } from 'react';
import { gsap, SplitText, useGSAP, withMotion } from '../lib/gsap';
import './RevealText.css';

/**
 * Text whose lines slide up from behind a mask.
 * By default it plays when scrolled into view; pass `play` to control it
 * yourself (false = hold hidden, true = play now).
 */
function RevealText({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  stagger = 0.08,
  duration = 1.1,
  start = 'top 90%',
  play,
  ...props
}) {
  const textRef = useRef(null);

  useGSAP(() => withMotion(() => {
    SplitText.create(textRef.current, {
      type: 'lines',
      mask: 'lines',
      aria: 'none',
      linesClass: 'reveal-line',
      autoSplit: true,
      onSplit: (self) => gsap.from(self.lines, {
        yPercent: 110,
        duration,
        ease: 'power4.out',
        stagger,
        delay,
        paused: play === false,
        scrollTrigger: play === undefined ? { trigger: textRef.current, start, once: true } : undefined,
      }),
    });
  }), { scope: textRef, dependencies: [children, play], revertOnUpdate: true });

  // Keyed by text so React remounts instead of reconciling SplitText's DOM
  return (
    <Tag
      key={typeof children === 'string' ? children : undefined}
      ref={textRef}
      className={`reveal-text ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default RevealText;
