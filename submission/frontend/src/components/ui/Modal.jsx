import React, { useEffect } from 'react';

/**
 * Modal component for dialogue/overlays.
 * 
 * @param {Object} props - The component props
 * @param {boolean} props.isOpen - Controls the modal visibility state
 * @param {Function} props.onClose - Event handler for closing the modal
 * @param {string} [props.title] - Optional title for the modal header
 * @param {React.ReactNode} props.children - Modal content body
 * @param {React.ReactNode} [props.footerContent] - Optional footer content/actions
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footerContent,
}) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog Content Container */}
      <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl transition-all duration-300 transform scale-100 flex flex-col z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          {title ? (
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {title}
            </h3>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 cursor-pointer"
            aria-label="Close dialog"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
          {children}
        </div>

        {/* Footer */}
        {footerContent && (
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-3">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
}
