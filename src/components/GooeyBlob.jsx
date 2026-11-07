import React, { useId, useImperativeHandle, useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, withMotion, matches, FINE_POINTER } from '../lib/gsap';
import { BLOB_SIZE, BLOB_RADIUS, BLOB_CENTER, BLOB_CIRCLE_COUNT, BLOB_LETTERS, morphPose, setPose } from '../lib/blobPoses';
import './GooeyBlob.css';

const CIRCLE_INDEXES = Array.from({ length: BLOB_CIRCLE_COUNT }, (_, i) => i);
const FOLLOWER_REACH = 150;
// Seconds each letter rests before melting into the next when cycling
const CYCLE_HOLD = 1.8;

// Ambient loops only run while the blob is on screen
const pauseOffscreen = (trigger, animation) => ScrollTrigger.create({
  trigger,
  start: 'top bottom',
  end: 'bottom top',
  onToggle: (self) => animation.paused(!self.isActive),
});

/**
 * The studio's signature: circles under a "goo" filter (blur + alpha threshold) so
 * they melt together. Colored with currentColor.
 *
 * - `pose` is the named pose from lib/blobPoses it starts in
 * - `cycle` keeps spelling D → O → M → D on its own (start it with pose="design")
 * - `drift` keeps them gently wandering
 * - `interactive` sends a small circle reaching toward the mouse
 * - `ref` exposes { circles } for timelines that drive the blob directly
 */
function GooeyBlob({ ref, pose = 'design', cycle = false, drift = true, interactive = false, className = '', ...props }) {
  const filterId = `goo-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`;
  const svgRef = useRef(null);
  const poseRefs = useRef([]);
  const wobbleRefs = useRef([]);
  const followerRef = useRef(null);

  useImperativeHandle(ref, () => ({ circles: poseRefs.current }), []);

  // Start in the pose without animating. GSAP scales SVG elements from
  // their top-left corner by default, which would pull smaller circles up and
  // left of their pose position: scale every circle about its own centre.
  useGSAP(() => {
    gsap.set([...poseRefs.current, followerRef.current], { transformOrigin: '50% 50%' });
    setPose(poseRefs.current, pose);
    gsap.set(followerRef.current, { x: BLOB_CENTER, y: BLOB_CENTER, scale: 0.2 });
  }, { scope: svgRef });

  // Ambient loop through the letters, paused while off screen
  useGSAP(() => withMotion(() => {
    if (!cycle) return undefined;

    // Starts paused: the trigger only fires once the blob is (or comes) into view
    const loop = gsap.timeline({ repeat: -1, paused: true });
    BLOB_LETTERS.forEach((letter, i) => {
      const next = BLOB_LETTERS[(i + 1) % BLOB_LETTERS.length];
      loop.add(morphPose(poseRefs.current, letter, next), `+=${CYCLE_HOLD}`);
    });
    pauseOffscreen(svgRef.current, loop);

    return () => loop.kill();
  }), { scope: svgRef, dependencies: [cycle], revertOnUpdate: true });

  // Idle wandering, paused while off screen
  useGSAP(() => withMotion(() => {
    if (!drift) return undefined;

    const wander = gsap.timeline({ paused: true });
    wobbleRefs.current.forEach((circle, i) => {
      // Small enough that the letters keep their shape and resting gaps stay
      // out of the filter's teardrop zone
      wander.to(circle, {
        x: () => gsap.utils.random(-4, 4),
        y: () => gsap.utils.random(-4, 4),
        duration: gsap.utils.random(3, 5),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
      }, i * 0.15);
    });
    pauseOffscreen(svgRef.current, wander);

    return () => wander.kill();
  }), { scope: svgRef, dependencies: [drift], revertOnUpdate: true });

  // A small circle that stretches out of the mass toward the pointer
  useGSAP(() => withMotion(() => {
    if (!interactive || !matches(FINE_POINTER)) return undefined;

    const follower = followerRef.current;
    const xTo = gsap.quickTo(follower, 'x', { duration: 0.8, ease: 'power3' });
    const yTo = gsap.quickTo(follower, 'y', { duration: 0.8, ease: 'power3' });
    // quickTo can't drive the `scale` shorthand: tween both axes
    const scaleXTo = gsap.quickTo(follower, 'scaleX', { duration: 0.6, ease: 'power3' });
    const scaleYTo = gsap.quickTo(follower, 'scaleY', { duration: 0.6, ease: 'power3' });

    const handleMove = (e) => {
      const rect = svgRef.current.getBoundingClientRect();
      if (!rect.width) return;
      const unit = BLOB_SIZE / rect.width;
      const dx = (e.clientX - rect.left) * unit - BLOB_CENTER;
      const dy = (e.clientY - rect.top) * unit - BLOB_CENTER;
      const distance = Math.hypot(dx, dy);
      const isNear = distance < BLOB_SIZE * 0.85;
      const reach = Math.min(distance, FOLLOWER_REACH) / (distance || 1);

      xTo(BLOB_CENTER + (isNear ? dx * reach : 0));
      yTo(BLOB_CENTER + (isNear ? dy * reach : 0));
      const scale = isNear ? 0.42 : 0.2;
      scaleXTo(scale);
      scaleYTo(scale);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }), { scope: svgRef, dependencies: [interactive], revertOnUpdate: true });

  return (
    <svg
      ref={svgRef}
      className={`gooey-blob ${className}`.trim()}
      viewBox={`0 0 ${BLOB_SIZE} ${BLOB_SIZE}`}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <defs>
        <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
          {/* Alpha threshold: a steeper ramp gives a crisp edge instead of a soft rim */}
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -13" />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`} fill="currentColor">
        {CIRCLE_INDEXES.map((i) => (
          <g key={i} ref={(node) => { poseRefs.current[i] = node; }}>
            <circle ref={(node) => { wobbleRefs.current[i] = node; }} r={BLOB_RADIUS} />
          </g>
        ))}
        <circle ref={followerRef} r={BLOB_RADIUS} />
      </g>
    </svg>
  );
}

export default GooeyBlob;
