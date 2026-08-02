import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-clay-50 dark:bg-forest-950 flex flex-col items-center justify-center p-6 text-center transition-colors duration-500">
          <div className="max-w-md w-full bg-white dark:bg-[#19221F] border border-slate-200 dark:border-slate-800/80 rounded-3xl p-8 shadow-sm space-y-6">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ⚠️
            </div>
            <h2 className="text-xl font-bold font-display text-forest-900 dark:text-clay-50">Application Encountered an Error</h2>
            <p className="text-xs text-slate-505 dark:text-slate-400 leading-relaxed font-sans font-medium">
              Something went wrong while rendering this page. The system caught this exception gracefully to prevent a complete crash.
            </p>
            <pre className="text-[10px] text-left bg-slate-50 dark:bg-forest-900 border border-slate-200 dark:border-slate-850 p-4 rounded-xl overflow-x-auto text-rose-500 dark:text-rose-400 font-mono">
              {this.state.error?.toString() || 'Unknown error'}
            </pre>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/';
              }}
              className="w-full py-3 bg-forest-900 dark:bg-clay-50 hover:bg-forest-800 dark:hover:bg-clay-100 text-clay-50 dark:text-forest-950 font-bold uppercase tracking-widest rounded-xl text-xs transition-all cursor-pointer border-none"
            >
              Reload Page & Recover
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
