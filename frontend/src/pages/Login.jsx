import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Radial Glow */}
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Sign in to manage your rural business growth tools
            </p>
          </div>

          {/* Form Mockup */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
              <input
                type="email"
                placeholder="saurabh@example.com"
                disabled
                className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-550 transition-colors duration-300 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                disabled
                className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl text-slate-300 placeholder-slate-650 focus:outline-none focus:border-indigo-550 transition-colors duration-300 text-sm"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 text-slate-400 cursor-not-allowed">
                <input type="checkbox" disabled className="rounded border-slate-800 bg-slate-950 text-indigo-500" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-indigo-450 hover:text-indigo-400 transition-colors duration-300 cursor-not-allowed">Forgot Password?</a>
            </div>

            <button
              type="button"
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-650 hover:from-indigo-500 hover:to-purple-550 text-white font-medium rounded-xl shadow-lg shadow-indigo-650/20 transition-all duration-300 transform active:scale-95"
            >
              Sign In (Active in Week 3)
            </button>
          </form>

          <div className="mt-8 border-t border-slate-850 pt-6 text-center text-xs text-slate-500">
            <span>Don't have an account? </span>
            <a href="#" className="text-indigo-400 hover:text-indigo-350 transition-colors duration-300 cursor-not-allowed">Contact TBI Admin</a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
