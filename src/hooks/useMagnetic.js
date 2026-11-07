import { gsap, useGSAP, withMotion, matches, FINE_POINTER } from '../lib/gsap';

/**
 * Custom hook that makes an element lean toward the pointer while hovered
 * @param {React.RefObject<HTMLElement>} ref - Element to magnetize
 * @param {number} strength - Fraction of the pointer offset to follow (default: 0.3)
 */
export function useMagnetic(ref, strength = 0.3) {
  useGSAP(() => withMotion(() => {
    const element = ref.current;
    if (!element || !matches(FINE_POINTER)) return undefined;

    const xTo = gsap.quickTo(element, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(element, 'y', { duration: 0.6, ease: 'power3' });

    const handleMove = (e) => {
      const rect = element.getBoundingClientRect();
      xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener('pointermove', handleMove);
    element.addEventListener('pointerleave', handleLeave);

    return () => {
      element.removeEventListener('pointermove', handleMove);
      element.removeEventListener('pointerleave', handleLeave);
    };
  }), { dependencies: [strength], revertOnUpdate: true });
}
