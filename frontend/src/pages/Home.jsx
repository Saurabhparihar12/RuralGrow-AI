import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Card from '../components/Card';
import Footer from '../components/Footer';
import { 
  Sparkles, 
  MessageSquare, 
  HelpCircle, 
  ArrowRight, 
  Star, 
  Clipboard, 
  Cpu, 
  Share2,
  CheckCircle2
} from 'lucide-react';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);

  const features = [
    {
      title: 'Review Reply Composer',
      description: 'Automatically analyzes customer review sentiment and drafts a professional, contextual reply template ready for WhatsApp or Google Maps.',
      badge: 'Google Maps Helper',
      icon: <MessageSquare className="w-5 h-5 text-sage-500" />
    },
    {
      title: 'Instagram Caption Writer',
      description: 'Transform basic product properties into highly engaging social captions with regional tags and community hashtags.',
      badge: 'Social Media Writer',
      icon: (
        <svg className="w-5 h-5 text-sage-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      title: 'WhatsApp Promo Drafts',
      description: 'Quickly compose simple, friendly promo text alerts for new harvest arrivals, loom patterns, or cozy homestay rooms.',
      badge: 'WhatsApp Broadcaster',
      icon: <Sparkles className="w-5 h-5 text-sage-500" />
    }
  ];

  const testimonials = [
    {
      name: 'Shyam Lal',
      role: 'Rajaji Forest Apiary Owner',
      quote: "Before using RuralGrow, I could not write responses to my Google Maps reviews. Now I copy-paste suggested drafts instantly and visitors are very happy."
    },
    {
      name: 'Sita Devi',
      role: 'Pine Vista Homestay Host',
      quote: "We use the WhatsApp composer to announce tea harvest dates to our regular tourists. It takes just one click and looks very professional."
    }
  ];

  const faqs = [
    {
      q: 'How does the auto review analyzer assign replies?',
      a: 'The system reads the text feedback and parses keywords to determine positive, negative, or neutral sentiment. It then merges variables to draft a polite response template.'
    },
    {
      q: 'Is my merchant data saved permanently?',
      a: 'Yes. With the Week 5 upgrade, all customer reviews and Instagram promo caption history are stored persistently in the database, meaning they survive restarts.'
    },
    {
      q: 'Can I use this without a MongoDB instance?',
      a: 'Absolutely. If no database URI is detected, the server transparently switches to the local JSON file database fallback mode.'
    }
  ];

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="bg-clay-50 dark:bg-forest-950 text-forest-900 dark:text-clay-50 min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* 1. Brand Storytelling Split Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Block */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sage-500/10 text-sage-600 dark:text-sage-400 text-[9px] uppercase font-black tracking-widest">
              <span>Our Origin Story</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold leading-tight tracking-tight">
              Empowering local weavers <br />
              & family organic farms.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-medium">
              During field visits to organic orchards, weavers, and homestays in villages near Dehradun and Mussoorie, we found amazing craftsmen who lacked the tools to handle digital outbox marketing. 
            </p>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-medium">
              We built RuralGrow AI as a student community pilot to offer a zero-code toolkit that translates local feedback into professional digital content.
            </p>
            <div className="pt-2">
              <a 
                href="/about" 
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-sage-600 hover:text-sage-700 transition-colors"
              >
                <span>Read student credentials</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Block: Alternating photo grid */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md h-[400px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/45 dark:border-slate-800/40">
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800" 
                alt="Himalayan mountain valley"
                className="w-full h-full object-cover grayscale-15 dark:grayscale-30 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-white/70 dark:bg-forest-900/80 backdrop-blur-md border border-white/50 dark:border-white/5 shadow-xs">
                <span className="text-[9px] uppercase tracking-widest font-bold text-sage-600 dark:text-sage-400 block mb-1">Location Spotlight</span>
                <p className="text-xs font-bold text-forest-900 dark:text-clay-50 font-display">Dehradun & Mussoorie Organic Valleys</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Features Grid */}
      <section className="py-20 border-t border-slate-200/40 dark:border-slate-800/30 bg-clay-100/40 dark:bg-forest-900/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight">
              One simple dashboard. Three utilities.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-455 font-medium leading-relaxed">
              Designed to help micro-businesses automate customer correspondence with zero cost.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <Card
                key={idx}
                title={feat.title}
                description={feat.description}
                icon={feat.icon}
                badge={feat.badge}
                linkText="Launch Tool"
                linkPath="/dashboard"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Redesigned Storytelling Workflow: Split Grid Layout */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 relative z-10 border-t border-slate-200/40 dark:border-slate-800/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Sticky Content */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start space-y-5">
            <span className="text-[10px] font-bold text-sage-600 dark:text-sage-400 uppercase tracking-widest block">System Workflow</span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold leading-tight tracking-tight">
              Translating local work into global reach.
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              We mapped the complete correspondence pipeline into three simple phases. No marketing training required. Just copy, paste, and let the AI draft templates.
            </p>
          </div>

          {/* Right Workflow Steps connected by custom visual line */}
          <div className="lg:col-span-7 space-y-8 relative pl-6 border-l border-slate-200 dark:border-slate-800/80">
            {[
              { 
                step: '01', 
                title: 'Collect Local Feedback', 
                desc: 'Copy an online review from Google Maps, or enter details for a newly made woollen caps batch, honey jars, or cottage booking.',
                icon: <Clipboard className="w-4 h-4 text-sage-500" />
              },
              { 
                step: '02', 
                title: 'Compose Contextual Drafts', 
                desc: 'The backend parses content keywords to determine sentiments, and suggests friendly responses or outputs hashtag-optimized Instagram promotions.',
                icon: <Cpu className="w-4 h-4 text-sage-500" />
              },
              { 
                step: '03', 
                title: 'Publish to Community Channels', 
                desc: 'Copy the formatted templates to your outbox with one click. Share on WhatsApp or Google Maps instantly to keep tourists engaged.',
                icon: <Share2 className="w-4 h-4 text-sage-500" />
              }
            ].map((item, idx) => (
              <div key={idx} className="relative bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 p-8 rounded-2xl shadow-xs transition-transform duration-300 hover:scale-[1.005]">
                {/* Node dot */}
                <div className="absolute -left-[31px] top-9 w-2.5 h-2.5 rounded-full bg-sage-500 border-2 border-clay-50 dark:border-forest-950" />
                
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-forest-900 flex items-center justify-center border border-slate-100 dark:border-slate-800/60">
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold text-sage-600 dark:text-sage-400 font-mono">{item.step}</span>
                </div>
                <h4 className="text-base font-bold text-forest-900 dark:text-clay-50 mb-2">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Redesigned Testimonials & Gallery: Grid Layout */}
      <section className="py-20 border-t border-slate-200/40 dark:border-slate-800/30 bg-clay-100/40 dark:bg-forest-900/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Redesigned Testimonials: Large Storytelling Card (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Merchant Endorsements</span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold">What local growers are saying</h3>
              </div>

              <div className="space-y-6">
                {testimonials.map((t, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 p-8 rounded-2xl relative shadow-xs">
                    {/* Visual Quote Accent Mark */}
                    <span className="absolute right-6 top-4 text-6xl font-serif text-sage-500/10 select-none">“</span>
                    <p className="text-xs sm:text-sm italic text-slate-600 dark:text-slate-350 leading-relaxed font-medium relative z-10 mb-5">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center space-x-3.5 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                      <div className="w-9 h-9 rounded-full bg-sage-500/15 text-sage-600 dark:text-sage-400 flex items-center justify-center text-xs font-black font-mono">
                        {t.name[0]}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-forest-900 dark:text-clay-50">{t.name}</h4>
                        <span className="text-[9px] text-slate-450 dark:text-slate-500 font-semibold block">{t.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Masonry Gallery Grid (7 cols width) */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-455 dark:text-slate-500">Regional Visual Gallery</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden h-[180px] border border-slate-200/50 dark:border-slate-800/40 shadow-xs">
                    <img 
                      src="https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600" 
                      alt="Organic tea fields" 
                      className="w-full h-full object-cover grayscale-10 dark:grayscale-30 transition-transform duration-500 hover:scale-103" 
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden h-[240px] border border-slate-200/50 dark:border-slate-800/40 shadow-xs">
                    <img 
                      src="https://images.unsplash.com/photo-1617854818583-09e7f077a156?auto=format&fit=crop&q=80&w=600" 
                      alt="Handloom weaving thread" 
                      className="w-full h-full object-cover grayscale-10 dark:grayscale-30 transition-transform duration-500 hover:scale-103" 
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden h-[240px] border border-slate-200/50 dark:border-slate-800/40 shadow-xs">
                    <img 
                      src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600" 
                      alt="Cozy homestay villa" 
                      className="w-full h-full object-cover grayscale-10 dark:grayscale-30 transition-transform duration-500 hover:scale-103" 
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden h-[180px] border border-slate-200/50 dark:border-slate-800/40 shadow-xs">
                    <img 
                      src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=600" 
                      alt="Snow peak Himalayas" 
                      className="w-full h-full object-cover grayscale-10 dark:grayscale-30 transition-transform duration-500 hover:scale-103" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. FAQs Accordion */}
      <section className="py-24 max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-display font-bold">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500 font-medium">Quick details on data pipeline mechanics.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx} 
                onClick={() => toggleFaq(idx)}
                className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-2xl p-5.5 cursor-pointer select-none transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-xs sm:text-sm font-bold text-forest-900 dark:text-clay-50">{faq.q}</h4>
                  <HelpCircle className={`w-4 h-4 text-sage-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60' : 'max-h-0'}`}>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium font-sans">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
