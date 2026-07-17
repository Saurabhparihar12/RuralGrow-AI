import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, ArrowUpRight, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Dark/Light Theme state initialization
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    ...(user ? [
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'AI Assistant', path: '/ai-assistant' },
      { name: 'Profile', path: '/profile' }
    ] : []),
    ...(user && user.role === 'admin' ? [
      { name: 'Admin', path: '/admin' }
    ] : []),
    { name: 'Showcase', path: '/showcase' },
    { name: 'About Us', path: '/about' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 border-b border-transparent ${
      isScrolled 
        ? 'bg-white/80 dark:bg-forest-950/80 backdrop-blur-xl py-3 border-slate-200/50 dark:border-slate-800/40 shadow-xs' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-12">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group select-none">
              <div className="w-8 h-8 rounded-full bg-forest-900 dark:bg-clay-50 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                <span className="text-clay-50 dark:text-forest-900 font-extrabold text-sm font-display">R</span>
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-forest-900 dark:text-clay-50">
                RuralGrow<span className="text-sage-500 font-light">.ai</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 group ${
                  isActive(link.path)
                    ? 'text-forest-900 dark:text-clay-50'
                    : 'text-slate-500 dark:text-slate-400 hover:text-forest-900 dark:hover:text-clay-50'
                }`}
              >
                <span>{link.name}</span>
                <span className={`absolute bottom-0.5 left-4 right-4 h-[1.5px] bg-sage-500 transition-all duration-300 origin-center scale-x-0 group-hover:scale-x-100 ${
                  isActive(link.path) ? 'scale-x-100 bg-forest-900 dark:bg-clay-50' : ''
                }`} />
              </Link>
            ))}
            
            {/* Show Login or Sign Out in navigation based on active state */}
            {user ? (
              <button
                onClick={handleLogout}
                className="relative px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-rose-500 transition-all duration-305 cursor-pointer flex items-center space-x-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <Link
                to="/login"
                className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 group ${
                  isActive('/login')
                    ? 'text-forest-900 dark:text-clay-50'
                    : 'text-slate-500 dark:text-slate-400 hover:text-forest-900 dark:hover:text-clay-50'
                }`}
              >
                <span>Login</span>
                <span className={`absolute bottom-0.5 left-4 right-4 h-[1.5px] bg-sage-500 transition-all duration-300 origin-center scale-x-0 group-hover:scale-x-100 ${
                  isActive('/login') ? 'scale-x-100 bg-forest-900 dark:bg-clay-50' : ''
                }`} />
              </Link>
            )}
          </div>

          {/* Right Section Controls */}
          <div className="flex items-center space-x-4">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-200/60 dark:border-slate-800/40 text-forest-900 dark:text-clay-50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-300 cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-forest-900" />
              )}
            </button>

            {/* Launch App / CTA */}
            <Link
              to="/dashboard"
              className="hidden sm:inline-flex items-center space-x-1 px-5 py-2.5 rounded-full bg-forest-900 dark:bg-clay-50 text-clay-50 dark:text-forest-950 text-[10px] font-bold uppercase tracking-widest hover:bg-sage-600 dark:hover:bg-clay-200 transition-all duration-300 cursor-pointer"
            >
              <span>Dashboard</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Menu Icon */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-forest-900 dark:hover:text-clay-50 focus:outline-none transition-all duration-300 cursor-pointer"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-80 border-t border-slate-200/50 dark:border-slate-800/30' : 'max-h-0'
      }`}>
        <div className="px-6 py-4 space-y-2 bg-white/95 dark:bg-forest-950/95 backdrop-blur-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                isActive(link.path)
                  ? 'bg-slate-100 dark:bg-slate-900 text-forest-900 dark:text-clay-50 border-l-2 border-sage-500'
                  : 'text-slate-500 dark:text-slate-400 hover:text-forest-900 dark:hover:text-clay-50 hover:bg-slate-50 dark:hover:bg-slate-900/60'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full text-left block px-4 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider text-rose-500 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                isActive('/login')
                  ? 'bg-slate-100 dark:bg-slate-900 text-forest-900 dark:text-clay-50 border-l-2 border-sage-505'
                  : 'text-slate-500 dark:text-slate-400 hover:text-forest-900 dark:hover:text-clay-50 hover:bg-slate-50 dark:hover:bg-slate-900/60'
              }`}
            >
              Login
            </Link>
          )}

          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="block text-center w-full py-3 bg-forest-900 dark:bg-clay-50 text-clay-50 dark:text-forest-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
