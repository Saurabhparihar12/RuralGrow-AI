import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button, Input, Toast } from '../components/ui';
import { Mail, Lock, Store, User, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const { login, signup, forgotPassword } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  
  // Form input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shopName, setShopName] = useState('Garhwal Organic Farms');
  const [role, setRole] = useState('merchant');
  
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    if (isForgotPassword) {
      if (!email.trim()) {
        showToast('Please enter your email to request recovery.', 'warning');
        return;
      }
      setIsLoading(true);
      const res = await forgotPassword(email);
      setIsLoading(false);
      if (res.success) {
        showToast(res.message, 'success');
        setIsForgotPassword(false);
      } else {
        showToast(res.message, 'error');
      }
      return;
    }

    if (isLogin) {
      if (!email.trim() || !password.trim()) {
        showToast('Please enter both email and password.', 'warning');
        return;
      }
      setIsLoading(true);
      const res = await login(email, password);
      setIsLoading(false);
      if (res.success) {
        showToast('Welcome to RuralGrow AI! Redirecting...', 'success');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        showToast(res.message, 'error');
      }
    } else {
      if (!name.trim() || !email.trim() || !password.trim() || !shopName.trim()) {
        showToast('Please fill out name, email, password, and shop name.', 'warning');
        return;
      }
      setIsLoading(true);
      const res = await signup(name, email, password, role, shopName);
      setIsLoading(false);
      if (res.success) {
        showToast('Account created successfully! Redirecting...', 'success');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        showToast(res.message, 'error');
      }
    }
  };

  return (
    <div className="bg-clay-50 dark:bg-forest-950 text-forest-900 dark:text-clay-50 min-h-screen flex flex-col justify-between transition-colors duration-500 relative overflow-hidden">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-55 max-w-sm w-full pointer-events-auto"
          >
            <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={() => setToast(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sage-500/5 rounded-full blur-3xl pointer-events-none" />

      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md w-full bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-8 md:p-10 shadow-xl dark:shadow-none relative overflow-hidden transition-all duration-500"
        >
          
          <AnimatePresence mode="wait">
            {!isForgotPassword ? (
              <motion.div
                key="form-fields"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Form Switch Selector Tabs */}
                <div className="flex bg-slate-100 dark:bg-forest-900/60 p-1.5 rounded-2xl mb-8 relative border border-slate-200/40 dark:border-slate-800/20">
                  <button
                    onClick={() => { setIsLogin(true); setToast(null); }}
                    className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all duration-300 relative z-10 cursor-pointer ${
                      isLogin ? 'text-forest-900 dark:text-clay-50 bg-white dark:bg-forest-800 shadow-xs' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Merchant Login
                  </button>
                  <button
                    onClick={() => { setIsLogin(false); setToast(null); }}
                    className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all duration-300 relative z-10 cursor-pointer ${
                      !isLogin ? 'text-forest-900 dark:text-clay-50 bg-white dark:bg-forest-800 shadow-xs' : 'text-slate-500 hover:text-slate-700'
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
                <form className="space-y-4" onSubmit={handleAuthSubmit}>
                  
                  <AnimatePresence mode="wait">
                    {isLogin ? (
                      // Login form fields
                      <motion.div
                        key="login-inputs"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <Input
                          label="Email ID"
                          type="email"
                          placeholder="weaver-saurabh@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          icon={<Mail className="w-4 h-4 text-slate-405" />}
                          inputClassName="py-2.5 text-xs rounded-xl"
                        />
                        <Input
                          label="Security Password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          icon={<Lock className="w-4 h-4 text-slate-405" />}
                          inputClassName="py-2.5 text-xs rounded-xl"
                        />
                        <div className="flex items-center justify-between text-[11px] pt-1">
                          <label className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 cursor-pointer select-none">
                            <input type="checkbox" className="rounded border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-sage-605" />
                            <span>Remember me</span>
                          </label>
                          <button 
                            type="button" 
                            onClick={() => setIsForgotPassword(true)} 
                            className="text-sage-600 dark:text-sage-400 hover:underline font-bold bg-transparent border-none cursor-pointer"
                          >
                            Forgot Password?
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      // Signup form fields
                      <motion.div
                        key="signup-inputs"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <Input
                          label="Your Name"
                          type="text"
                          placeholder="Saurabh Parihar"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          icon={<User className="w-4 h-4 text-slate-405" />}
                          inputClassName="py-2.5 text-xs rounded-xl"
                        />
                        <Input
                          label="Email Address"
                          type="email"
                          placeholder="weaver-saurabh@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          icon={<Mail className="w-4 h-4 text-slate-450" />}
                          inputClassName="py-2.5 text-xs rounded-xl"
                        />
                        <Input
                          label="Create Password"
                          type="password"
                          placeholder="Min. 6 characters"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          icon={<Lock className="w-4 h-4 text-slate-450" />}
                          inputClassName="py-2.5 text-xs rounded-xl"
                        />
                        <Input
                          label="Shop / Cottage Name"
                          type="text"
                          placeholder="e.g. Shyam's Organic Honey"
                          value={shopName}
                          onChange={(e) => setShopName(e.target.value)}
                          icon={<Store className="w-4 h-4 text-slate-450" />}
                          inputClassName="py-2.5 text-xs rounded-xl"
                        />
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">Default Business Role</label>
                          <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full bg-white dark:bg-forest-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-350 outline-none cursor-pointer"
                          >
                            <option value="merchant">Merchant (Write permissions)</option>
                            <option value="visitor">Viewer (Read-Only access)</option>
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    variant="primary"
                    className="w-full mt-4 cursor-pointer font-bold uppercase tracking-widest text-[10px] py-3.5 bg-forest-900 hover:bg-forest-800 text-clay-50"
                    type="submit"
                    isLoading={isLoading}
                  >
                    {isLogin ? 'Sign In to Hub' : 'Register Account'}
                  </Button>
                </form>
              </motion.div>
            ) : (
              // Forgot Password view
              <motion.div
                key="forgot-password"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-display font-bold text-forest-900 dark:text-clay-50">Reset Password</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-450 mt-1.5 font-medium">
                    Enter your registered email address below, and we will simulate a verification reset link.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleAuthSubmit}>
                  <Input
                    label="Registered Email ID"
                    type="email"
                    placeholder="weaver-saurabh@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<Mail className="w-4 h-4 text-slate-400" />}
                    inputClassName="py-2.5 text-xs rounded-xl"
                  />

                  <Button
                    variant="primary"
                    className="w-full cursor-pointer font-bold uppercase tracking-widest text-[10px] py-3.5 bg-forest-900 hover:bg-forest-800 text-clay-50"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Send Reset Link
                  </Button>

                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(false)}
                    className="w-full text-center flex items-center justify-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-forest-900 dark:hover:text-clay-50 transition-colors pt-2 cursor-pointer bg-transparent border-none"
                  >
                    <CornerDownLeft className="w-3.5 h-3.5" />
                    <span>Back to Login</span>
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 border-t border-slate-200 dark:border-slate-800/80 pt-6 text-center text-[10px] text-slate-500 font-medium">
            <span>Note: Local accounts are pre-assigned. </span>
            <br />
            <span className="font-bold text-sage-600 dark:text-sage-400">Ask Support Admin for credentials support.</span>
          </div>

        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
