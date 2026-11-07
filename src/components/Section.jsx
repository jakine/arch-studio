import React, { useRef } from 'react';
import { ScrollTrigger, useGSAP } from '../lib/gsap';
import { setSectionTheme, setHeaderTint } from '../lib/pageTheme';

/**
 * A page section that owns the page color while it's in view (ma-kr.nl style):
 * `theme` applies when the section crosses the middle of the viewport, `tint`
 * applies while the section sits under the header.
 */
function Section({ as: Tag = 'section', theme = 'paper', tint = 'auto', className = '', children, ...props }) {
  const sectionRef = useRef(null);

  // refreshPriority -1: measure after any pins (including ones inside this
  // section, created later by a parent component) have added their spacing.
  // Only a section that is actually active applies its colors, so sections
  // skipped by a fast jump never overwrite the one landed on.
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 50%',
      end: 'bottom 50%',
      refreshPriority: -1,
      onToggle: (self) => self.isActive && setSectionTheme(theme),
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 40px',
      end: 'bottom 40px',
      refreshPriority: -1,
      onToggle: (self) => self.isActive && setHeaderTint(tint),
    });
  }, { scope: sectionRef, dependencies: [theme, tint], revertOnUpdate: true });

  return (
    <Tag ref={sectionRef} className={`page-section ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
}

export default Section;
