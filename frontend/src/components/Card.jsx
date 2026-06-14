import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ title, description, icon, badge, linkText = 'Get Started', linkPath = '/' }) {
  return (
    <div className="flex flex-col h-full bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-6 hover:-translate-y-1 hover:border-slate-700/80 hover:bg-slate-900 transition-all duration-300 shadow-lg group">
      {/* Icon & Badge Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-750 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-300">
          {icon ? (
            icon
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          )}
        </div>
        {badge && (
          <span className="px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase rounded-full bg-slate-800 text-slate-400 border border-slate-750">
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-all duration-300 mb-2">
            {title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            {description}
          </p>
        </div>

        {/* Action Button */}
        <div>
          <Link
            to={linkPath}
            className="inline-flex items-center space-x-1.5 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-all duration-350"
          >
            <span>{linkText}</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
