import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-forest-950 text-clay-50 select-none">
      
      {/* Cinematic Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-35 scale-102 pointer-events-none"
      >
        <source 
          src="https://assets.mixkit.co/videos/preview/mixkit-drone-shot-of-a-himalayan-valley-with-pine-trees-43093-large.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-forest-950/40 pointer-events-none" />

      {/* Content Sandbox */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-8 flex flex-col items-center">
        
        {/* Accent Tag */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-clay-50/10 border border-clay-50/15 text-[10px] uppercase font-bold tracking-widest text-clay-100 animate-fade-in-blur">
          <Sparkles className="w-3.5 h-3.5 text-sage-500" />
          <span>Community Outreach Initiative // Rural Growth</span>
        </div>

        {/* Storytelling Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black leading-[1.05] tracking-tight max-w-4xl animate-fade-in-blur" style={{ animationDelay: '150ms' }}>
          Empelling local growers to stand out <br />
          <span className="text-sage-500 font-light italic">in the digital market.</span>
        </h1>

        {/* Paragraph description */}
        <p className="text-sm sm:text-base text-clay-200/80 max-w-2xl leading-relaxed font-medium font-sans animate-fade-in-blur" style={{ animationDelay: '300ms' }}>
          We noticed that small weavers, honey gatherers, and family homestays in Dehradun and Mussoorie get amazing offline feedback, but struggle to write replies on Google Maps or create social media posts. RuralGrow AI is a free tool built to bridge this gap.
        </p>

        {/* Call to actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4 animate-fade-in-blur" style={{ animationDelay: '450ms' }}>
          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-clay-50 text-forest-950 font-bold text-xs uppercase tracking-widest rounded-full hover:bg-sage-500 hover:text-white transition-all duration-300 shadow-md cursor-pointer"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-clay-50/30 hover:border-clay-50 text-clay-100 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-clay-50/5 transition-all duration-300 cursor-pointer"
          >
            Read Our Story
          </Link>
        </div>

      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1.5 opacity-60 animate-float-y pointer-events-none">
        <span className="text-[9px] uppercase tracking-widest font-bold text-clay-200">Scroll Down</span>
        <div className="w-1 h-3 bg-clay-200 rounded-full" />
      </div>

    </div>
  );
}
