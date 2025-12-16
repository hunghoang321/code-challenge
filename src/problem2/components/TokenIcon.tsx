'use client';

import Image from 'next/image';
import { FALLBACK_TOKEN_ICON } from '@/lib/constants';

interface TokenIconProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

/**
 * Token icon component with fallback handling
 */
export function TokenIcon({ src, alt, size = 24, className = '' }: TokenIconProps) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).src = FALLBACK_TOKEN_ICON;
        }}
      />
    </div>
  );
}
