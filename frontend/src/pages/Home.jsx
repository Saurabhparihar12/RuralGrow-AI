import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Card from '../components/Card';
import Footer from '../components/Footer';

export default function Home() {
  const features = [
    {
      title: 'Review Sentiment Checker',
      description: 'Scans your customer feedback, tells you if the reviews are positive or negative, and drafts a polite reply template.',
      badge: 'Review Helper',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
      )
    },
    {
      title: 'Social Media Post Creator',
      description: 'Easily writes promotional captions with hashtags for your Facebook or Instagram pages based on your product details.',
      badge: 'Social Media',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
      )
    },
    {
      title: 'WhatsApp Promo Copywriter',
      description: 'Helps you draft discount templates and promotional messages to send directly to your customers on WhatsApp.',
      badge: 'WhatsApp',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 19v-8.93a2 2 0 01.89-1.664l8-4.719a2 2 0 012.22 0l8 4.72A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Reusable Cards Grid Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-1">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-905 dark:text-slate-100 sm:text-4xl">
            Core Features
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Here are the main tools we are building to help rural businesses manage their online presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              badge={feature.badge}
              linkText="Explore Features"
              linkPath="/dashboard"
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
