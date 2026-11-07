import React, { useRef } from 'react';
import { gsap, SplitText, useGSAP, withMotion } from '../lib/gsap';

/**
 * Large statement text whose words light up one by one as you scroll past
 */
function ScrubText({ as: Tag = 'p', children, className = '', ...props }) {
  const textRef = useRef(null);

  useGSAP(() => withMotion(() => {
    SplitText.create(textRef.current, {
      type: 'words',
      aria: 'none',
      autoSplit: true,
      onSplit: (self) => gsap.fromTo(
        self.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: textRef.current, start: 'top 85%', end: 'bottom 50%', scrub: true },
        }
      ),
    });
  }), { scope: textRef, dependencies: [children], revertOnUpdate: true });

  return (
    <Tag
      key={typeof children === 'string' ? children : undefined}
      ref={textRef}
      className={`scrub-text ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default ScrubText;
