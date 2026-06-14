import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Dashboard() {
  const stats = [
    { label: 'Total Reviews Analyzed', value: '142', change: '+12% this week', color: 'text-indigo-400' },
    { label: 'Marketing Copy Generated', value: '56', change: '+8 new drafts', color: 'text-purple-400' },
    { label: 'Avg Customer Rating', value: '4.8★', change: 'Based on sentiment', color: 'text-teal-400' },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="border-b border-slate-900 pb-8 mb-10">
          <h1 className="text-3xl font-extrabold text-slate-100 sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Business Growth Dashboard
          </h1>
          <p className="mt-2 text-slate-400">
            Real-time sentiment statistics, review replies, and automatic social media marketing campaigns.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-6 shadow-md">
              <span className="text-sm text-slate-500 font-medium">{stat.label}</span>
              <div className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-slate-400 mt-2 font-medium">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Main Placeholder Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-8 flex flex-col justify-center items-center text-center py-16">
            <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 border border-slate-750 mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-200 mb-2">AI Review Assistant</h2>
            <p className="text-sm text-slate-400 max-w-sm">
              Analyze guest reviews, automatically detect sentiment and themes, and generate polite suggested replies. (Pending backend connect)
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-8 flex flex-col justify-center items-center text-center py-16">
            <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-purple-400 border border-slate-750 mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-200 mb-2">Social Campaigns</h2>
            <p className="text-sm text-slate-400 max-w-sm">
              Generate localized Facebook/Instagram captions with high-converting tags and WhatsApp promo templates. (Pending backend connect)
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
