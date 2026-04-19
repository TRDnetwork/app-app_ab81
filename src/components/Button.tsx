import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const baseClasses =
  'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

const variantClasses = {
  primary: 'bg-[#e66000] text-white hover:bg-[#ff8c42] focus:ring-[#e66000] shadow-sm hover:shadow',
  secondary: 'bg-[#1a2e1a] text-white hover:bg-[#2d442d] focus:ring-[#1a2e1a] shadow-sm',
  outline: 'border border-[#e66000] text-[#e66000] hover:bg-[#faf8f5] focus:ring-[#e66000]',
  ghost: 'text-[#e66000] hover:bg-[#e9e5dd] focus:ring-[#e66000]',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

const sizeClasses = {
  sm: 'text-sm px-3 py-1.5 min-h-8 text-sm',
  md: 'text-base px-4 py-2 min-h-10',
  lg: 'text-lg px-6 py-3 min-h-12',
};

const fullWidthClass = 'w-full';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? fullWidthClass : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  );
};