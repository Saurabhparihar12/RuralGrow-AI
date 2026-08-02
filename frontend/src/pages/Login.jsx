import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button, Input, Toast } from '../components/ui';
import { Mail, Lock, Store, User, ArrowRight, CornerDownLeft, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, signup, googleLoginSimulated, loginWithParams, forgotPassword } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showSimulatedGoogle, setShowSimulatedGoogle] = useState(false);
  
  // Form input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shopName, setShopName] = useState('Garhwal Organic Farms');
  const [role, setRole] = useState('guest');
  
  // Simulated Google inputs
  const [googleName, setGoogleName] = useState('Saurabh Parihar');
  const [googleEmail, setGoogleEmail] = useState('sparihar2005@gmail.com');
  
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Check for Google OAuth tokens returned in URL parameters
  useEffect(() => {
    const token = searchParams.get('token');
    const userStr = searchParams.get('user');
    const error = searchParams.get('error');

    if (error) {
      showToast('Google OAuth Authentication failed. Please try again.', 'error');
    } else if (token && userStr) {
      try {
        const decodedUser = JSON.parse(decodeURIComponent(userStr));
        loginWithParams(token, decodedUser);
        showToast(`Google Login Successful! Welcome ${decodedUser.name}`, 'success');
        setTimeout(() => {
          if (decodedUser.role === 'admin' || decodedUser.role === 'business_owner') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        }, 1000);
      } catch (e) {
        showToast('Error parsing Google user metadata.', 'error');
      }
    }
  }, [searchParams]);

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
          // Check role to route correctly
          const userMeta = res.user || {};
          if (userMeta.role === 'admin' || userMeta.role === 'business_owner') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
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

  const handleRealGoogleOAuth = () => {
    // Redirect browser directly to passport-google-oauth20 route on backend
    window.location.href = `${API_BASE_URL}/api/auth/google`;
  };

  const handleSimulatedGoogleSubmit = async (e) => {
    e.preventDefault();
    if (!googleEmail.trim()) {
      showToast('Please enter a mock Google email.', 'warning');
      return;
    }
    setIsLoading(true);
    const res = await googleLoginSimulated(googleName, googleEmail, 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150');
    setIsLoading(false);
    if (res.success) {
      showToast('Google OAuth Sandbox Login Successful!', 'success');
      setTimeout(() => {
        // Redirect to admin for mock admin/owner profiles
        if (googleEmail.includes('admin') || googleEmail.includes('saurabh')) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 1000);
    } else {
      showToast(res.message, 'error');
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

      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md w-full bg-white/80 dark:bg-[#19221F]/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-8 md:p-10 shadow-xl dark:shadow-none relative overflow-hidden transition-all duration-500"
        >
          
          <AnimatePresence mode="wait">
            {showSimulatedGoogle ? (
              // Simulated Google Login Form
              <motion.div
                key="google-simulated"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-xl font-display font-bold text-forest-900 dark:text-clay-50 flex items-center justify-center space-x-2">
                    <Globe className="w-5 h-5 text-blue-550" />
                    <span>Google Login Sandbox</span>
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
                    Simulate a Google OAuth authentication callback flow locally.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleSimulatedGoogleSubmit}>
                  <Input
                    label="Google Display Name"
                    type="text"
                    value={googleName}
                    onChange={(e) => setGoogleName(e.target.value)}
                    icon={<User className="w-4 h-4 text-slate-400" />}
                    inputClassName="py-2.5 text-xs rounded-xl"
                  />
                  <Input
                    label="Google Email Address"
                    type="email"
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    icon={<Mail className="w-4 h-4 text-slate-400" />}
                    inputClassName="py-2.5 text-xs rounded-xl"
                  />

                  <Button
                    variant="primary"
                    className="w-full cursor-pointer font-bold uppercase tracking-widest text-[10px] py-3.5 bg-blue-600 hover:bg-blue-700 text-white"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Confirm OAuth Simulation
                  </Button>

                  <button
                    type="button"
                    onClick={() => setShowSimulatedGoogle(false)}
                    className="w-full text-center flex items-center justify-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-forest-900 dark:hover:text-clay-50 transition-colors pt-2 cursor-pointer bg-transparent border-none"
                  >
                    <CornerDownLeft className="w-3.5 h-3.5" />
                    <span>Back to standard login</span>
                  </button>
                </form>
              </motion.div>
            ) : !isForgotPassword ? (
              // Standard native login/register
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
                    Login
                  </button>
                  <button
                    onClick={() => { setIsLogin(false); setToast(null); }}
                    className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all duration-300 relative z-10 cursor-pointer ${
                      !isLogin ? 'text-forest-900 dark:text-clay-50 bg-white dark:bg-forest-800 shadow-xs' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Register
                  </button>
                </div>

                {/* Form Header */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-display font-bold text-forest-900 dark:text-clay-50">
                    {isLogin ? 'Welcome Back' : 'Join RuralGrow'}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-450 mt-1.5 font-medium">
                    {isLogin 
                      ? 'Sign in to access your business growth tools' 
                      : 'Register your cottage industry, farm, or workshop'
                    }
                  </p>
                </div>

                {/* Form container */}
                <form className="space-y-4" onSubmit={handleAuthSubmit}>
                  
                  <AnimatePresence mode="wait">
                    {isLogin ? (
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
                            <option value="guest">Guest (Default read-only)</option>
                            <option value="farmer">Farmer (Agricultural tools)</option>
                            <option value="business_owner">Business Owner (Write permissions)</option>
                            <option value="admin">System Admin</option>
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
                    {isLogin ? 'Sign In' : 'Register Account'}
                  </Button>
                </form>

                {/* Google Sign-in Divider */}
                <div className="relative my-6 text-center">
                  <span className="absolute left-0 right-0 top-1/2 border-t border-slate-200 dark:border-slate-800 -z-10" />
                  <span className="bg-white dark:bg-[#19221F] px-3.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Or Sign In With
                  </span>
                </div>

                {/* Real Google Cloud Console OAuth 2.0 Button */}
                <button
                  onClick={handleRealGoogleOAuth}
                  type="button"
                  className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-forest-900/80 rounded-xl transition-all duration-300 font-bold text-xs text-forest-900 dark:text-clay-50 cursor-pointer bg-white dark:bg-forest-900 shadow-xs"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google (OAuth 2.0)</span>
                </button>
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
                    Enter your registered email address below to request a verification reset link.
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
            <span>Admin pre-configured demo logins:</span>
            <br />
            <span className="font-bold text-sage-600 dark:text-sage-400">admin@ruralgrow.in</span> / <span className="font-bold text-sage-600 dark:text-sage-400">admin123</span>
          </div>

        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
