import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import ResponsiveImage from './ResponsiveImage';
import { useSmoothScroll } from './SmoothScroll';
import { gsap, useGSAP, withMotion } from '../lib/gsap';
import { useTranslation } from '../hooks/useTranslation';
import { useSwipe } from '../hooks/useSwipe';
import { fill, pad } from '../utils/format';
import { trapTab } from '../utils/focusTrap';
import './Lightbox.css';

/**
 * Fullscreen image viewer. Closed while `index` is null.
 * onIndexChange receives a number or an updater function, like a state setter.
 */
function Lightbox({ images, index, onIndexChange, onClose, title }) {
  const { t } = useTranslation();
  const { stop, start } = useSmoothScroll();
  const lightboxRef = useRef(null);
  const closeRef = useRef(null);
  const isOpen = index !== null;
  const total = images.length;

  const step = (direction) => onIndexChange((i) => (i + direction + total) % total);
  const swipe = useSwipe(step);

  // While open: no page scroll, arrows/Escape work, Tab stays inside, focus returns after
  useEffect(() => {
    if (!isOpen) return undefined;

    const returnFocusTo = document.activeElement;
    stop();
    closeRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'Tab') trapTab(e, [...lightboxRef.current.querySelectorAll('button')]);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      start();
      returnFocusTo?.focus?.({ preventScroll: true });
    };
    // step/onClose only change identity between renders, not behaviour
  }, [isOpen, stop, start]);

  // Rise in like a curtain
  useGSAP(() => withMotion(() => {
    if (!isOpen) return;
    gsap.fromTo(lightboxRef.current, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power4.inOut' });
  }), { dependencies: [isOpen], revertOnUpdate: true });

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={lightboxRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} – ${t.projectDetail.gallery}`}
      {...swipe}
    >
      <div className="lightbox-bar">
        <span className="lightbox-counter" aria-live="polite">
          <span className="visually-hidden">{fill(t.projectDetail.imageOf, { current: index + 1, total })}</span>
          <span aria-hidden="true">{pad(index + 1)} / {pad(total)}</span>
        </span>
        <span className="lightbox-title">{title}</span>
        <button ref={closeRef} type="button" className="lightbox-close" onClick={onClose}>
          {t.projectDetail.closeGallery} <span aria-hidden="true">✕</span>
        </button>
      </div>

      <div className="lightbox-stage">
        <ResponsiveImage
          key={index}
          image={images[index]}
          alt={fill(t.projectDetail.imageOf, { current: index + 1, total })}
          sizes="100vw"
          className="lightbox-image"
          imgClassName="is-contained"
        />
      </div>

      {total > 1 && (
        <>
          <button type="button" className="lightbox-nav is-prev" data-cursor="prev" aria-label={t.projectDetail.previousImage} onClick={() => step(-1)} />
          <button type="button" className="lightbox-nav is-next" data-cursor="next" aria-label={t.projectDetail.nextImage} onClick={() => step(1)} />
        </>
      )}
    </div>,
    document.body
  );
}

export default Lightbox;
