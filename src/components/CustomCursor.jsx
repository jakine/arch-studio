import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap, useGSAP } from '../lib/gsap';
import { useApp } from '../context/AppContext';
import { useFinePointer } from '../hooks/useMediaQuery';
import './CustomCursor.css';

// Anything matching this changes the cursor; [data-cursor] picks a specific state:
// link | prev | next | open | zoom | ring | hide. The cursor never shows text and
// never covers it: over links it opens into a transparent ring, arrows switch
// (→ ←) or open (↗), a plus enlarges.
const CURSOR_TARGETS = '[data-cursor], a, button, [role="button"], label, summary, input, textarea, select';
const TEXT_FIELDS = 'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]), textarea, select';

const resolveCursor = (element) => {
  const target = element?.closest?.(CURSOR_TARGETS);
  if (!target) return 'default';

  const explicit = target.getAttribute('data-cursor');
  if (explicit) return explicit;
  if (target.matches(TEXT_FIELDS)) return 'hide';
  return 'link';
};

function CursorFollower({ isHidden }) {
  const { pathname } = useLocation();
  const cursorRef = useRef(null);
  const pointerRef = useRef({ x: -100, y: -100 });
  const applyRef = useRef(() => {});

  useGSAP(() => {
    const cursor = cursorRef.current;
    const root = document.documentElement;
    let scrollFrame = null;

    root.classList.add('has-custom-cursor');

    // Position is tweened outside React: no re-render per mouse move
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });

    const apply = (element) => {
      const state = resolveCursor(element);
      // A link ring takes the colour of the text it circles, so it suits light
      // sections, dark ones and photos alike
      if (state === 'link') cursor.style.setProperty('--ring', getComputedStyle(element).color);
      if (cursor.dataset.state !== state) cursor.dataset.state = state;
    };
    applyRef.current = () => apply(document.elementFromPoint(pointerRef.current.x, pointerRef.current.y));

    const handleMove = (e) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
      if (cursor.dataset.visible !== 'true') {
        gsap.set(cursor, { x: e.clientX, y: e.clientY });
        cursor.dataset.visible = 'true';
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleOver = (e) => apply(e.target);
    const handleDown = () => { cursor.dataset.pressed = 'true'; };
    const handleUp = () => { cursor.dataset.pressed = 'false'; };
    const handleLeaveWindow = (e) => {
      if (!e.relatedTarget) cursor.dataset.visible = 'false';
    };

    // Content scrolls under a still pointer without firing pointerover
    const handleScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = null;
        applyRef.current();
      });
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('pointerover', handleOver, { passive: true });
    document.addEventListener('pointerout', handleLeaveWindow, { passive: true });
    window.addEventListener('pointerdown', handleDown, { passive: true });
    window.addEventListener('pointerup', handleUp, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      root.classList.remove('has-custom-cursor');
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerover', handleOver);
      document.removeEventListener('pointerout', handleLeaveWindow);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('scroll', handleScroll);
    };
  });

  // A new page renders under a pointer that hasn't moved
  useEffect(() => {
    const frame = requestAnimationFrame(() => applyRef.current());
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div
      ref={cursorRef}
      className={`cursor ${isHidden ? 'is-hidden' : ''}`.trim()}
      data-state="default"
      data-visible="false"
      aria-hidden="true"
    >
      <div className="cursor-disc">
        <svg className="cursor-icon cursor-arrow" viewBox="0 0 32 32"><path d="M4 16h24M19 7l9 9-9 9" /></svg>
        <svg className="cursor-icon cursor-plus" viewBox="0 0 32 32"><path d="M16 5v22M5 16h22" /></svg>
      </div>
    </div>
  );
}

// Negative (difference-blend) circle that follows the mouse; mouse/trackpad only
function CustomCursor() {
  const isFinePointer = useFinePointer();
  const { isIntroPlaying } = useApp();

  if (!isFinePointer) return null;
  return <CursorFollower isHidden={isIntroPlaying} />;
}

export default CustomCursor;
