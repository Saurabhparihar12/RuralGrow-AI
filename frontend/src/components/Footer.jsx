import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 border-t border-forest-900 text-slate-400 py-16 relative overflow-hidden">
      
      {/* Background radial accent */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sage-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-forest-900">
          
          {/* Brand Info Column (6 cols width) */}
          <div className="md:col-span-6 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-6 h-6 rounded-full bg-clay-50 flex items-center justify-center">
                <span className="text-forest-950 font-bold text-xs">R</span>
              </div>
              <span className="font-display font-extrabold text-clay-50 tracking-wider">
                RuralGrow<span className="text-sage-500 font-light">.ai</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              A student-designed review feedback composer and digital outbox created to help local farmers, handloom weavers, and homestays build a sustainable online identity.
            </p>
          </div>

          {/* Links Column (3 cols width) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-clay-100">Project Hub</h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'Home Landing', path: '/' },
                { name: 'Merchant Dashboard', path: '/dashboard' },
                { name: 'UI Components', path: '/showcase' },
                { name: 'About Project', path: '/about' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-clay-50 transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Metadata Column (3 cols width) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-clay-100">Evaluation Info</h4>
            <div className="text-xs text-slate-400 space-y-1.5 font-mono">
              <p>Intern: <span className="text-clay-100">Saurabh Parihar</span></p>
              <p>ID: <span className="text-clay-100">TBI-26100640</span></p>
              <p>GEU TBI - Uttarakhand</p>
            </div>
          </div>

        </div>

        {/* Bottom copyright and social handles */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[11px] text-slate-500">
          <p>© {currentYear} RuralGrow.ai. Built for mid-internship academic review.</p>
          
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="https://github.com/Saurabhparihar12/RuralGrow-AI" className="hover:text-clay-50 transition-colors" aria-label="GitHub">
              {/* Custom Github SVG */}
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.409.678 1.204.678 2.427 0 1.753-.016 3.167-.016 3.597 0 .272.18.59.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="mailto:support@ruralgrow.ai" className="hover:text-clay-50 transition-colors" aria-label="Email">
              <Mail className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-clay-50 transition-colors" aria-label="Website">
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
