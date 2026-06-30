import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Card from '../components/Card';
import Footer from '../components/Footer';
import { Sparkles, MessageSquare, ShieldCheck, HelpCircle, ArrowRight, Star } from 'lucide-react';

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
                src="https://images.unsplash.com/photo-1626621427793-39c3b058a5bc?auto=format&fit=crop&q=80&w=800" 
                alt="Uttarakhand mountain terraced fields"
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

      {/* 3. Storytelling Timeline Workflow */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-display font-bold">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-405 dark:text-slate-500 font-semibold uppercase tracking-wider">
            Copy-paste reviews or write details of your product.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Pick Feedback', desc: 'Copy a customer review or select a newly harvested product.' },
            { step: '02', title: 'Generate Template', desc: 'Auto-analyze review sentiment or write promotional Instagram post drafts.' },
            { step: '03', title: 'Share & Promote', desc: 'Copy the result to WhatsApp or Instagram to impress visiting guests.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 p-8 rounded-2xl relative group hover:scale-[1.01] transition-transform duration-300">
              <span className="absolute right-6 top-4 text-4xl font-black text-slate-200/60 dark:text-slate-800/20 font-mono tracking-tighter select-none">
                {item.step}
              </span>
              <h4 className="text-base font-black text-forest-900 dark:text-clay-50 mb-2">{item.title}</h4>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-medium font-sans">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Testimonials & Masonry Gallery */}
      <section className="py-20 border-t border-slate-200/40 dark:border-slate-800/30 bg-clay-100/40 dark:bg-forest-900/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Testimonials (5 cols width) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <h3 className="text-2xl font-display font-bold">Feedback from Weavers & Hosts</h3>
                <p className="text-xs text-slate-500 font-medium">Real merchant support validation.</p>
              </div>

              <div className="space-y-6">
                {testimonials.map((t, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#19221F] border border-slate-250/50 dark:border-slate-800/40 p-6 rounded-2xl space-y-4 shadow-xs">
                    <p className="text-xs sm:text-sm italic text-slate-650 dark:text-slate-350 leading-relaxed font-medium">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center space-x-3 border-t border-slate-100 dark:border-slate-800/60 pt-4">
                      <div className="w-8 h-8 rounded-full bg-sage-500/20 flex items-center justify-center text-sage-500 font-black text-xs font-mono">
                        {t.name[0]}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-forest-900 dark:text-clay-50">{t.name}</h4>
                        <span className="text-[10px] text-slate-450 dark:text-slate-500 block">{t.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Masonry Gallery Grid (7 cols width) */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-455 dark:text-slate-500">Regional Visual Gallery</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden h-[180px] border border-slate-200/50 dark:border-slate-800/40">
                    <img 
                      src="https://images.unsplash.com/photo-1595275312720-3b4aa582e052?auto=format&fit=crop&q=80&w=600" 
                      alt="Organic agriculture tea pickers" 
                      className="w-full h-full object-cover grayscale-10 dark:grayscale-30 transition-transform duration-500 hover:scale-103" 
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden h-[240px] border border-slate-200/50 dark:border-slate-800/40">
                    <img 
                      src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=600" 
                      alt="Weaver making handicraft shawls" 
                      className="w-full h-full object-cover grayscale-10 dark:grayscale-30 transition-transform duration-500 hover:scale-103" 
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden h-[240px] border border-slate-200/50 dark:border-slate-800/40">
                    <img 
                      src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=600" 
                      alt="Himalayan homestay balcony room view" 
                      className="w-full h-full object-cover grayscale-10 dark:grayscale-30 transition-transform duration-500 hover:scale-103" 
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden h-[180px] border border-slate-200/50 dark:border-slate-800/40">
                    <img 
                      src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=600" 
                      alt="Himalayan mountain peaks landscape" 
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
