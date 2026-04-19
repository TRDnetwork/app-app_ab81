import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'neutral' | 'success' | 'danger';
  className?: string;
}

const variantClasses = {
  default: 'bg-[#1a2e1a] text-white',
  accent: 'bg-[#e66000] text-white',
  neutral: 'bg-[#e9e5dd] text-[#1a2e1a]',
  success: 'bg-green-100 text-green-800',
  danger: 'bg-red-100 text-red-800',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};