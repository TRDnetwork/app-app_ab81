import React from 'react';

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  className = '',
  header,
  footer,
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-[#e9e5dd] overflow-hidden transition-transform duration-300 hover:shadow-md hover:translate-y-[-4px] ${className}`}
    >
      {header || (title && (
        <div className="px-6 py-4 border-b border-[#e9e5dd] bg-[#faf8f5]">
          <h3 className="text-lg font-semibold text-[#1a2e1a]">{title}</h3>
        </div>
      ))}
      <div className="p-6">{children}</div>
      {footer && <div className="px-6 py-4 border-t border-[#e9e5dd] bg-[#faf8f5]">{footer}</div>}
    </div>
  );
};