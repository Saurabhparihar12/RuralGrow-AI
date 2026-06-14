import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info Column */}
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-650 flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="font-bold text-slate-100 tracking-tight">RuralGrow AI</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              A simple web app to help rural small businesses handle customer reviews and write marketing posts easily.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-slate-100 transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm hover:text-slate-100 transition-colors duration-300">Dashboard</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-slate-100 transition-colors duration-300">About</Link>
              </li>
              <li>
                <Link to="/login" className="text-sm hover:text-slate-100 transition-colors duration-300">Login</Link>
              </li>
            </ul>
          </div>

          {/* Contact / Info Column */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Enterprise Support</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              RuralGrow AI Platform<br />
              Email: info@ruralgrow.ai<br />
              ID: <span className="text-indigo-400 font-mono">TBI-26100640</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-900 pt-8 text-xs text-slate-500">
          <p>© {currentYear} RuralGrow AI. All rights reserved. Deployed for evaluation.</p>
          
          {/* Mock Social Links */}
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-slate-300 transition-colors duration-300" aria-label="Github">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.478-10-10-10z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors duration-300" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
