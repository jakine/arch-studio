import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMagnetic } from '../hooks/useMagnetic';
import './CircleLink.css';

/**
 * Round call-to-action that leans toward the pointer. Renders a router Link,
 * or a plain <a> when given `href`.
 */
function CircleLink({ to, href, children, className = '', ...props }) {
  const linkRef = useRef(null);
  useMagnetic(linkRef, 0.35);

  const content = (
    <>
      <span className="circle-link-label">{children}</span>
      <span className="circle-link-arrow" aria-hidden="true">→</span>
    </>
  );

  if (href) {
    return (
      <a ref={linkRef} href={href} className={`circle-link ${className}`.trim()} {...props}>
        {content}
      </a>
    );
  }

  return (
    <Link ref={linkRef} to={to} className={`circle-link ${className}`.trim()} viewTransition {...props}>
      {content}
    </Link>
  );
}

export default CircleLink;
