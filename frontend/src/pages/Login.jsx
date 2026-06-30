import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button, Input, Toast } from '../components/ui';
import { Mail, Lock, Store, Phone } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shopName, setShopName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      if (!email.trim() || !password.trim()) {
        showToast('Please enter both email and password credentials.', 'warning');
        return;
      }
    } else {
      if (!shopName.trim() || !email.trim() || !phone.trim()) {
        showToast('Please fill in all details to file a registration request.', 'warning');
        return;
      }
    }

    setIsLoading(true);
    showToast(isLogin ? 'Validating merchant credentials...' : 'Submitting registration request...', 'info');

    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      if (isLogin) {
        // Save simulated user session
        const mockUser = {
          email,
          role: 'merchant',
          shopName: shopName || 'Garhwal Organic Farms'
        };
        localStorage.setItem('user', JSON.stringify(mockUser));

        showToast('Login successful! Redirecting...', 'success');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        showToast('Registration request filed with Support Admin!', 'success');
        setShopName('');
        setEmail('');
        setPhone('');
        setIsLogin(true);
      }
    }, 1500);
  };

  return (
    <div className="bg-clay-50 dark:bg-forest-950 text-forest-900 dark:text-clay-50 min-h-screen flex flex-col justify-between transition-colors duration-300 relative overflow-hidden">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-55 max-w-sm w-full animate-fade-in pointer-events-auto">
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        </div>
      )}

      {/* Decorative Blob */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-sage-500/5 rounded-full blur-3xl pointer-events-none" />

      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-6 relative z-10 animate-fade-in-blur">
        <div className="max-w-md w-full bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-8 md:p-10 shadow-xl dark:shadow-none relative overflow-hidden transition-all duration-500">
          
          {/* Form Switch Selector Tabs */}
          <div className="flex bg-slate-100 dark:bg-forest-900/60 p-1.5 rounded-2xl mb-8 relative border border-slate-200/40 dark:border-slate-800/20">
            <button
              onClick={() => { setIsLogin(true); setToast(null); }}
              className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all duration-300 relative z-10 cursor-pointer ${
                isLogin ? 'text-forest-900 dark:text-clay-50 bg-white dark:bg-forest-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Merchant Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setToast(null); }}
              className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all duration-300 relative z-10 cursor-pointer ${
                !isLogin ? 'text-forest-900 dark:text-clay-50 bg-white dark:bg-forest-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-display font-bold text-forest-900 dark:text-clay-50">
              {isLogin ? 'Welcome Back' : 'Join RuralGrow'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-450 mt-1.5 font-medium">
              {isLogin 
                ? 'Sign in to access your saved reviews and promotional tools' 
                : 'Register your cottage industry, farm, or workshop'
              }
            </p>
          </div>

          {/* Form container */}
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            {isLogin ? (
              // Login form fields
              <div className="space-y-4 animate-fade-in-blur">
                <Input
                  label="Merchant Email ID"
                  type="email"
                  placeholder="weaver-saurabh@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-4 h-4 text-slate-400" />}
                  inputClassName="py-2.5 text-xs rounded-xl"
                />
                <Input
                  label="Security Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="w-4 h-4 text-slate-400" />}
                  inputClassName="py-2.5 text-xs rounded-xl"
                />
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <label className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 cursor-pointer select-none">
                    <input type="checkbox" className="rounded border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-sage-605" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" onClick={(e) => { e.preventDefault(); showToast('Password reset link requested.', 'info'); }} className="text-sage-600 dark:text-sage-400 hover:underline font-bold">Forgot Password?</a>
                </div>
              </div>
            ) : (
              // Signup form fields
              <div className="space-y-4 animate-fade-in-blur">
                <Input
                  label="Shop / Cottage Name"
                  type="text"
                  placeholder="e.g. Shyam's Organic Honey"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  icon={<Store className="w-4 h-4 text-slate-400" />}
                  inputClassName="py-2.5 text-xs rounded-xl"
                />
                <Input
                  label="Owner Email Address"
                  type="email"
                  placeholder="weaver-saurabh@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-4 h-4 text-slate-400" />}
                  inputClassName="py-2.5 text-xs rounded-xl"
                />
                <Input
                  label="WhatsApp Number"
                  type="tel"
                  placeholder="+91 99999-99999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  icon={<Store className="w-4 h-4 text-slate-400" />}
                  inputClassName="py-2.5 text-xs rounded-xl"
                />
              </div>
            )}

            <Button
              variant="primary"
              className="w-full mt-4 cursor-pointer font-bold uppercase tracking-widest text-[10px] py-3.5 bg-forest-900 hover:bg-forest-800 text-clay-50"
              type="submit"
              isLoading={isLoading}
            >
              {isLogin ? 'Sign In to Hub' : 'Register Account'}
            </Button>
          </form>

          <div className="mt-8 border-t border-slate-200 dark:border-slate-800/80 pt-6 text-center text-[10px] text-slate-500 font-medium">
            <span>Note: Local accounts are pre-assigned. </span>
            <br />
            <span className="font-bold text-sage-600 dark:text-sage-400">Ask Support Admin for credentials support.</span>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
