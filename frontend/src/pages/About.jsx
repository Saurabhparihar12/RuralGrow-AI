import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col justify-between transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-indigo-650 dark:text-indigo-400 uppercase tracking-widest bg-indigo-500/10 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-500/20">
            RuralGrow Pilot Project
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mt-4 mb-3">
            About RuralGrow AI
          </h1>
          <p className="text-lg text-slate-650 dark:text-slate-400 leading-relaxed">
            We are building this review and marketing helper as a student-led community support initiative.
          </p>
        </div>

        <div className="space-y-8">
          {/* Section 1 */}
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-indigo-650 dark:text-indigo-400 mb-3">How We Started</h2>
            <p className="text-slate-700 dark:text-slate-350 leading-relaxed text-sm">
              During our field trips to organic farms, weavers, and homestay owners in villages near Dehradun and Mussoorie, we noticed a common theme: these small businesses write down contact details in registers, and get excellent feedback from visiting tourists.
            </p>
            <p className="text-slate-700 dark:text-slate-355 leading-relaxed text-sm mt-4">
              However, they often do not know how to respond to reviews on Google Maps in fluent English or write attractive captions for Instagram. We built RuralGrow AI to give them a simple, zero-code toolbox that drafts these replies and captions for them automatically.
            </p>
          </div>

          {/* Section 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/60 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-purple-650 dark:text-purple-400 mb-2">Our Goal</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                Provide rural artisans, honey gatherers, and cottage owners with simple tools to handle their own online marketing and customer reviews without paying expensive agencies.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/60 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-emerald-655 dark:text-emerald-400 mb-2">Project Stack</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                Built using React.js for the frontend, styled with custom Tailwind utility configurations, and powered by simple Node.js servers connected to Google Gemini APIs.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
