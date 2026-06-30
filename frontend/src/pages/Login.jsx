import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button, Input, Toast } from '../components/ui';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      showToast('Please enter both email and password credentials.', 'warning');
      return;
    }

    setIsLoading(true);
    showToast('Validating merchant credentials...', 'info');

    // Simulate API authorization response delay
    setTimeout(() => {
      setIsLoading(false);
      showToast('Login successful! Redirecting...', 'success');
      
      // Navigate to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }, 1500);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col justify-between transition-colors duration-300 relative overflow-hidden">
      {/* Toast popup */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-55 max-w-sm w-full animate-fade-in pointer-events-auto">
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        </div>
      )}

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
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Sign in to manage your shop reviews and WhatsApp posts
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleLoginSubmit}>
            <Input
              label="Merchant Email ID"
              type="email"
              placeholder="farmer-saurabh@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={
                <svg className="w-4 h-4 text-slate-450" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              }
            />

            <Input
              label="Security Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={
                <svg className="w-4 h-4 text-slate-455" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              }
            />

            <div className="flex items-center justify-between text-xs mt-2">
              <label className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 cursor-pointer select-none">
                <input type="checkbox" className="rounded border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-indigo-650" />
                <span>Save credentials</span>
              </label>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast('Password reset mail sent to support admin.', 'info'); }} className="text-indigo-650 dark:text-indigo-400 hover:underline transition-colors duration-300">Forgot Password?</a>
            </div>

            <Button
              variant="primary"
              className="w-full mt-4 cursor-pointer font-bold"
              type="submit"
              isLoading={isLoading}
            >
              Sign In to Merchant Hub
            </Button>
          </form>

          <div className="mt-8 border-t border-slate-200 dark:border-slate-850 pt-6 text-center text-xs text-slate-500">
            <span>New merchant? </span>
            <a href="#" onClick={(e) => { e.preventDefault(); showToast('Registration requests can be filed with support admins.', 'info'); }} className="text-indigo-650 dark:text-indigo-400 hover:underline transition-colors duration-300">Ask Support Admin</a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
