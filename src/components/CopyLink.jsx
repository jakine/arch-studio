import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useFinePointer } from '../hooks/useMediaQuery';
import './CopyLink.css';

const COPIED_MS = 1800;

/**
 * An email address or phone number that copies itself. With a mouse or
 * trackpad, a small "Copy email" / "Copy number" pill shows above it and a
 * click copies; on touch it stays a normal mailto:/tel: link that opens the
 * mail or phone app.
 */
function CopyLink({ ref, value, href, kind = 'email', className = '' }) {
  const { t } = useTranslation();
  const isFinePointer = useFinePointer();
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleClick = async (e) => {
    if (!isFinePointer) return;
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsCopied(false), COPIED_MS);
    } catch {
      // Clipboard blocked: do what the link would have done
      window.location.href = href;
    }
  };

  return (
    <>
      <a
        ref={ref}
        href={href}
        className={`copy-link ${isCopied ? 'is-copied' : ''} ${className}`.trim()}
        onClick={handleClick}
      >
        {value}
        <span className="copy-link-tip" aria-hidden="true">
          {isCopied ? t.copy.copied : t.copy[kind]}
        </span>
      </a>
      <span className="visually-hidden" role="status">{isCopied ? t.copy.copied : ''}</span>
    </>
  );
}

export default CopyLink;
