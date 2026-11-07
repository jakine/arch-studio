import React, { useState, useRef, useEffect } from 'react';
import './ResponsiveImage.css';

/**
 * <picture> with AVIF/WebP sources from utils/images over a flat placeholder in
 * the photo's average colour. Fills its positioned parent.
 *
 * Loading: lazy by default. `loading="eager"` fetches right away at low priority,
 * for images hidden behind a clip that lazy loading would never fetch;
 * `priority` is for the LCP image (eager, high priority, no fade).
 */
const ResponsiveImage = React.memo(function ResponsiveImage({
  image,
  alt = '',
  sizes = '100vw',
  loading = 'lazy',
  priority = false,
  className = '',
  imgClassName = '',
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  // Cached images can finish before React attaches onLoad
  useEffect(() => {
    if (imgRef.current?.complete) setIsLoaded(true);
  }, [image]);

  if (!image) return null;

  return (
    <div
      className={`responsive-image ${isLoaded ? 'is-loaded' : ''} ${priority ? 'is-priority' : ''} ${className}`.trim()}
      style={image.placeholder ? { '--placeholder': `url(${image.placeholder})` } : undefined}
    >
      <picture>
        {Object.entries(image.sources).map(([format, srcSet]) => (
          <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
        ))}
        <img
          ref={imgRef}
          src={image.img.src}
          width={image.img.w}
          height={image.img.h}
          alt={alt}
          loading={priority ? 'eager' : loading}
          fetchPriority={priority ? 'high' : loading === 'eager' ? 'low' : 'auto'}
          decoding="async"
          draggable="false"
          className={`responsive-image-img ${imgClassName}`.trim()}
          onLoad={() => setIsLoaded(true)}
        />
      </picture>
    </div>
  );
});

ResponsiveImage.displayName = 'ResponsiveImage';

export default ResponsiveImage;
