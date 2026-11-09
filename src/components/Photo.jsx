import { useState } from 'react';

// Renders a photo, or nothing if the file is missing — so layouts fall back to colour plates.
export default function Photo({ src, alt = '', className = '', eager = false }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
