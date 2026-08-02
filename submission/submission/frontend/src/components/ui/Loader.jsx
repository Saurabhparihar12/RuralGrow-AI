import React from 'react';

/**
 * Loader component for displaying async operations.
 * 
 * @param {Object} props - The component props
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Visual size of the loader
 * @param {string} [props.color='text-indigo-600 dark:text-indigo-400'] - Tailwind text color class for the indicator
 * @param {string} [props.className=''] - Additional custom CSS class names
 */
export default function Loader({
  size = 'md',
  color = 'text-indigo-600 dark:text-indigo-400',
  className = '',
}) {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={`flex items-center justify-center p-2 ${className}`}>
      <div
        className={`animate-spin rounded-full border-t-transparent border-slate-200 dark:border-slate-800 ${color} ${sizes[size]}`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
