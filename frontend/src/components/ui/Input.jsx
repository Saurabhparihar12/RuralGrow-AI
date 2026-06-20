import React from 'react';

/**
 * Input component for text entry with design states.
 * 
 * @param {Object} props - The component props
 * @param {string} [props.label] - Label text displayed above the input field
 * @param {string} [props.error] - Error message displayed below the input field
 * @param {React.ReactNode} [props.icon] - Icon component to render inside the input (left-aligned)
 * @param {string} [props.className=''] - Additional class names for the container
 * @param {string} [props.inputClassName=''] - Additional class names for the input tag
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - Standard HTML input attributes
 */
export default function Input({
  label,
  error,
  icon,
  className = '',
  inputClassName = '',
  id,
  type = 'text',
  ...rest
}) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex flex-col space-y-1.5 w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-slate-600 dark:text-slate-400 tracking-wide uppercase"
        >
          {label}
        </label>
      )}
      <div className="relative rounded-xl shadow-xs">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={`w-full rounded-xl border px-4 py-2.5 text-sm transition-all duration-300 outline-none
            ${icon ? 'pl-11' : ''}
            ${
              error
                ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/10 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-rose-900 dark:text-rose-200'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-slate-100'
            }
            ${inputClassName}`}
          {...rest}
        />
      </div>
      {error && (
        <p className="text-xs text-rose-500 dark:text-rose-400 flex items-center mt-1">
          <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
