import React from 'react';

export interface TextareaProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  id,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  rows = 4,
  className = '',
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="text-[#1a2e1a] text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#e66000] focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 transition-shadow duration-200 ${
          error ? 'border-red-500' : 'border-[#e9e5dd]'
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};