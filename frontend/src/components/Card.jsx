import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Card({ title, description, icon, badge, linkText = 'Get Started', linkPath = '/' }) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#19221F] border border-slate-200/60 dark:border-slate-800/40 p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none hover:border-sage-500/30 group">
      
      {/* Icon and Badge Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-forest-900/60 border border-slate-100 dark:border-slate-800/80 flex items-center justify-center text-sage-500 dark:text-sage-500 group-hover:scale-105 group-hover:bg-sage-500/10 transition-all duration-300">
          {icon ? icon : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          )}
        </div>
        {badge && (
          <span className="px-3 py-1 text-[9px] font-bold tracking-widest uppercase rounded-full bg-clay-100 dark:bg-forest-900 text-slate-500 dark:text-slate-400 border border-slate-200/30 dark:border-slate-850">
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-display font-bold text-forest-900 dark:text-clay-50 group-hover:text-sage-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            {description}
          </p>
        </div>

        {/* Action Link */}
        <div className="pt-4">
          <Link
            to={linkPath}
            className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-forest-900 dark:text-clay-50 hover:text-sage-500 dark:hover:text-sage-500 transition-colors duration-300"
          >
            <span>{linkText}</span>
            <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

    </div>
  );
}
