import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button, Input } from '../components/ui';

export default function Login() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col justify-between transition-colors duration-300">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800/80 rounded-3xl p-8 md:p-10 shadow-xl dark:shadow-2xl relative overflow-hidden">
          {/* Radial Glow */}
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-650 dark:from-indigo-400 dark:to-purple-400">
              Merchant Login
            </h2>
            <p className="text-sm text-slate-505 dark:text-slate-400 mt-2">
              Sign in to manage your shop reviews and WhatsApp posts
            </p>
          </div>

          {/* Form Mockup using Custom UI Components */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Merchant Email ID"
              type="email"
              placeholder="farmer-saurabh@example.com"
              disabled
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              }
            />

            <Input
              label="Security Password"
              type="password"
              placeholder="••••••••"
              disabled
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              }
            />

            <div className="flex items-center justify-between text-xs mt-2">
              <label className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 cursor-not-allowed">
                <input type="checkbox" disabled className="rounded border-slate-350 dark:border-slate-800 bg-white dark:bg-slate-950 text-indigo-650" />
                <span>Save credentials</span>
              </label>
              <a href="#" className="text-indigo-650 dark:text-indigo-400 hover:underline transition-colors duration-300 cursor-not-allowed">Forgot Password?</a>
            </div>

            <Button
              variant="primary"
              className="w-full mt-4 cursor-pointer"
              type="submit"
            >
              Sign In to Merchant Hub
            </Button>
          </form>

          <div className="mt-8 border-t border-slate-200 dark:border-slate-850 pt-6 text-center text-xs text-slate-500">
            <span>New merchant? </span>
            <a href="#" className="text-indigo-650 dark:text-indigo-400 hover:underline transition-colors duration-300 cursor-not-allowed">Ask Support Admin</a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
