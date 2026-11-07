import { useSyncExternalStore, useCallback } from 'react';
import { REDUCED_MOTION, FINE_POINTER } from '../lib/gsap';

/**
 * Custom hook that tracks a CSS media query
 * @param {string} query - e.g. '(min-width: 768px)'
 * @returns {boolean} - Whether the query currently matches
 */
export function useMediaQuery(query) {
  const subscribe = useCallback((onChange) => {
    const mql = window.matchMedia(query);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

export const useReducedMotion = () => useMediaQuery(REDUCED_MOTION);

export const useFinePointer = () => useMediaQuery(FINE_POINTER);
