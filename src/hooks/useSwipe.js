import { useRef } from 'react';

const SWIPE_THRESHOLD = 50;

/**
 * Custom hook for a horizontal touch swipe; mouse users click instead
 * @param {(direction: 1 | -1) => void} onSwipe - 1 after a swipe left (next), -1 after a swipe right
 * @returns {{ onPointerDown: Function, onPointerUp: Function }} - Handlers to spread on the element
 */
export function useSwipe(onSwipe) {
  const startXRef = useRef(null);

  return {
    onPointerDown: (e) => {
      if (e.pointerType !== 'mouse') startXRef.current = e.clientX;
    },
    onPointerUp: (e) => {
      if (startXRef.current === null) return;
      const distance = e.clientX - startXRef.current;
      startXRef.current = null;
      if (Math.abs(distance) > SWIPE_THRESHOLD) onSwipe(distance < 0 ? 1 : -1);
    },
  };
}
