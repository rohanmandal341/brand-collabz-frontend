import React from 'react';
import { FALLBACK_IMG } from '../../utils/format';

export default function SafeImg({ src, alt = '', className = '' }) {
  return (
    <img
      src={src || FALLBACK_IMG}
      alt={alt}
      loading="lazy"
      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }}
      className={className}
    />
  );
}
