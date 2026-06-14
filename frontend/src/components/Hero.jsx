import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-100 py-20 lg:py-32">
      {/* Decorative Radial Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-20 left-1/3 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase">
              <span>🚀 AI-Powered Business Growth Hub</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Grow Your Rural Business with{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                AI Intelligence
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0">
              RuralGrow AI is built specifically for rural micro-enterprises to simplify marketing, automatically analyze customer reviews, and boost online engagement without requiring coding skills.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-300 transform hover:-translate-y-0.5 text-center"
              >
                Go to Dashboard
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white font-medium rounded-xl transition-all duration-300 text-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Hero Decorative Visual */}
          <div className="flex justify-center relative">
            <div className="w-full max-w-md h-[350px] rounded-2xl bg-gradient-to-tr from-slate-900/90 to-indigo-900/30 border border-slate-850 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-sm group hover:border-slate-800/80 transition-all duration-500">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/25 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-all duration-500"></div>
              
              <div className="flex items-center justify-between border-b border-slate-850 pb-4">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-xs text-slate-500 font-mono">analysis_dashboard.json</span>
              </div>
              
              <div className="flex-1 flex flex-col justify-center space-y-4 py-4">
                <div className="h-6 w-1/3 bg-slate-800 rounded-md animate-pulse"></div>
                <div className="h-10 w-full bg-slate-800/60 rounded-md border border-slate-750 flex items-center px-4 justify-between">
                  <div className="h-3 w-1/2 bg-slate-700 rounded animate-pulse"></div>
                  <div className="w-4 h-4 rounded-full bg-indigo-500/80"></div>
                </div>
                <div className="h-12 w-2/3 bg-slate-800/40 rounded-md border border-slate-750/50 flex items-center px-4">
                  <div className="h-3 w-3/4 bg-slate-700/60 rounded animate-pulse"></div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-850 pt-4 text-xs text-slate-500 font-mono">
                <span>Total Reviews: 100</span>
                <span className="text-indigo-400">Accuracy: 98.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
