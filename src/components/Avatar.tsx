import React from 'react';

export interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  fallback?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-lg',
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  fallback,
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-[#e9e5dd] text-[#1a2e1a] overflow-hidden ${sizeClasses[size]} ${className}`}
      aria-label={alt}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        fallback || alt.charAt(0).toUpperCase()
      )}
    </div>
  );
};