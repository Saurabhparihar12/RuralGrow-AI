import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Globe, MapPin, User, Cpu } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Pilot Region', value: 'Dehradun & Mussoorie hills', icon: <MapPin className="w-4 h-4 text-sage-500" /> },
    { label: 'Focus Audience', value: 'Artisans, Weavers & Orchardists', icon: <User className="w-4 h-4 text-sage-500" /> },
    { label: 'Platform Deployment', value: 'Persistent Database Connected', icon: <Globe className="w-4 h-4 text-sage-500" /> },
  ];

  return (
    <div className="bg-clay-50 dark:bg-forest-950 text-forest-900 dark:text-clay-50 min-h-screen flex flex-col justify-between transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative gradient blob */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-sage-500/5 rounded-full blur-3xl pointer-events-none" />

      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 sm:px-8 py-16 relative z-10 space-y-16 animate-fade-in-blur">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sage-500/10 text-sage-600 dark:text-sage-400 text-[9px] uppercase font-black tracking-widest">
            <span>Community Outreach Initiative</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold leading-tight tracking-tight">
            About RuralGrow<span className="text-sage-500 font-light">.ai</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-medium">
            We are designing this review helper and caption outbox composer as a community research pilot to help local shops build their digital identity.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 p-6 rounded-2xl flex items-center space-x-4 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-forest-900 flex items-center justify-center flex-shrink-0 border border-slate-100 dark:border-slate-800/80">
                {stat.icon}
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">{stat.label}</span>
                <span className="text-xs sm:text-sm font-bold text-forest-900 dark:text-clay-50 font-display">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Storytelling grid with Unsplash photo */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Text block (7 cols) */}
          <div className="md:col-span-7 space-y-6">
            <h2 className="text-2xl font-display font-bold">Why we started this pilot</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-medium">
              During field trips to organic farms, weavers, and homestay hosts in villages near Dehradun and Mussoorie, we noticed a common theme: these small businesses write down contact details in registers, and get excellent feedback from visiting tourists.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-medium">
              However, they often do not know how to respond to reviews on Google Maps in fluent English or write attractive captions for Instagram. We built RuralGrow AI to give them a simple, zero-code toolbox that drafts these replies and captions for them automatically.
            </p>
          </div>
          {/* Photo block (5 cols) */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-full max-w-sm h-[260px] rounded-2xl overflow-hidden border border-slate-200/45 dark:border-slate-800/40">
              <img 
                src="https://images.unsplash.com/photo-1592997572594-34be01bc36c7?auto=format&fit=crop&q=80&w=600" 
                alt="Organic farming tea leaves close up" 
                className="w-full h-full object-cover grayscale-10 dark:grayscale-30 transition-transform duration-500 hover:scale-103" 
              />
            </div>
          </div>
        </div>

        {/* Sub-Blocks: Goals & Credentials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 p-8 rounded-2xl space-y-4 shadow-xs">
            <h3 className="text-lg font-display font-bold text-sage-600 dark:text-sage-400">Our Primary Goal</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Provide rural artisans, honey gatherers, and cottage owners with simple tools to handle their own online marketing and customer reviews without paying expensive agencies.
            </p>
          </div>
          <div className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 p-8 rounded-2xl space-y-4 shadow-xs">
            <h3 className="text-lg font-display font-bold text-sage-600 dark:text-sage-400">Our Platform Strategy</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              We leverage modern language processing model templates to analyze review sentiments and build instant copy-paste communication kits for micro-businesses.
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
