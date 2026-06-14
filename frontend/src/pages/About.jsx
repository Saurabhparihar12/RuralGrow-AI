import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-slate-100 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
            About RuralGrow AI
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            We build simple web tools to help local rural businesses manage reviews and write promotional captions.
          </p>
        </div>

        <div className="space-y-12">
          {/* Section 1 */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-indigo-400 mb-4">Why RuralGrow AI?</h2>
            <p className="text-slate-300 leading-relaxed text-sm">
              Many small businesses in rural areas, like local farms, weavers, or homestays, want to grow online but struggle to write good marketing posts or reply to customer reviews in English.
            </p>
            <p className="text-slate-300 leading-relaxed text-sm mt-4">
              RuralGrow AI is built to solve this. It provides a simple dashboard to automatically check review sentiments, suggest polite replies, and write social media captions.
            </p>
          </div>

          {/* Section 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-purple-400 mb-2">Project Vision</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Make it easy for rural business owners to manage reviews and promote their products online without needing any technical skills.
              </p>
            </div>
            <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-teal-400 mb-2">Platform Stack</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Built using React.js for the frontend, Node.js and Express for the backend, MongoDB for data storage, and the Gemini API for review sentiment analysis.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
