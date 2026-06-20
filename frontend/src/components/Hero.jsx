import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-16 lg:py-24 transition-colors duration-300">
      {/* Decorative Radial Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-20 left-1/3 w-[300px] h-[300px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-200/20 text-indigo-700 dark:text-indigo-400 text-xs font-semibold tracking-wide uppercase">
              <span>🌱 GEU TBI Student Internship Project</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
              Helping local weavers, farms, and homestays{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-650 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                get customers online
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              We noticed that many small shopkeepers and artisans in rural towns get good reviews on Google Maps or customer queries on WhatsApp, but struggle to reply in professional English or write attractive captions for Instagram. RuralGrow AI is a simple, free helper dashboard we built to make this easy.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-650 hover:from-indigo-500 hover:to-purple-550 text-white font-medium rounded-xl shadow-lg shadow-indigo-650/20 transition-all duration-300 transform hover:-translate-y-0.5 text-center cursor-pointer text-sm"
              >
                Open Dashboard
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-305 hover:text-slate-900 dark:hover:text-white font-medium rounded-xl transition-all duration-300 text-center cursor-pointer text-sm"
              >
                Read Project Info
              </Link>
            </div>
          </div>

          {/* Hero Mockup Review Card (Indian Context) */}
          <div className="flex justify-center relative">
            <div className="w-full max-w-md bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-850 p-6 rounded-2xl shadow-xl dark:shadow-2xl relative overflow-hidden backdrop-blur-sm group hover:border-slate-300 dark:hover:border-slate-800/80 transition-all duration-500">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
              
              {/* Card Header simulating Google Maps style review */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400">
                    A
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Amit from Delhi</h4>
                    <span className="text-xs text-amber-500">★★★★★ Google Review</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-550 font-mono">1 day ago</span>
              </div>
              
              {/* Review Text */}
              <div className="space-y-4">
                <p className="text-sm italic text-slate-750 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-900">
                  "Ordered their Dehradun Basmati rice online. The aroma is absolutely amazing and grains are very long. Packaging was done nicely in cloth bag."
                </p>
                
                {/* AI generated Suggestion */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Suggested WhatsApp Reply:</span>
                  <div className="text-xs text-slate-600 dark:text-slate-450 bg-indigo-50/40 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/50 p-3 rounded-xl">
                    "Hi Amit! Thank you so much for the 5-star review! We are so happy you liked our organic Basmati rice. Do let us know when you need your next pack. Have a great day! 🙏"
                  </div>
                </div>
              </div>

              {/* Footer action mockups */}
              <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4 mt-4 text-[11px] text-slate-400 dark:text-slate-500">
                <span>Sentiment: <strong className="text-emerald-600 dark:text-emerald-400">Positive</strong></span>
                <span className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">Copy to Clipboard →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
