import { useState, useEffect } from 'react';

/**
 * Custom hook that reports when an element first scrolls into view
 * @param {React.RefObject<Element>} ref - Element to watch
 * @param {IntersectionObserverInit} options - Observer options (default: 20% visible)
 * @returns {boolean} - True once the element has been seen (stays true)
 */
export function useInView(ref, { threshold = 0.2, rootMargin = '0px' } = {}) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isInView) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { threshold, rootMargin });

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, isInView]);

  return isInView;
}
