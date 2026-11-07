import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

/**
 * Counts up from 0 to `value` once `play` turns true. GSAP writes the digits
 * straight into the DOM, so nothing re-renders while it counts.
 */
function CountUp({ value, play, duration = 1.6, format = String }) {
  const numberRef = useRef(null);

  useGSAP(() => {
    if (!play) return;
    const counter = { value: 0 };
    gsap.to(counter, {
      value,
      duration,
      ease: 'power2.out', // ease-out cubic, 1 − (1 − t)³ (GSAP's power3 would be quartic)
      onUpdate: () => {
        numberRef.current.textContent = format(Math.floor(counter.value));
      },
    });
  }, { dependencies: [play, value], revertOnUpdate: true });

  return <span ref={numberRef}>{format(0)}</span>;
}

export default CountUp;
