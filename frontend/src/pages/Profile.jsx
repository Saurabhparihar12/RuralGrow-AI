import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Toast } from '../components/ui';
import { User, Mail, Shield, Store, Camera, Settings, Eye, LogOut, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Profile() {
  const { user, token, logout, setUser } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [shopName, setShopName] = useState(user?.shopName || '');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150');
  
  const [toast, setToast] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // List of pre-configured avatar images
  const avatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', // Developer / Male
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', // Female
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150', // Farmer / Male
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', // Female 2
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', // Craftsman / Male
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'  // Designer / Female
  ];

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Name field cannot be left blank.', 'warning');
      return;
    }

    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      
      // Update local storage and auth context user info
      const updatedUser = {
        ...user,
        name,
        shopName,
        avatar: selectedAvatar
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      showToast('Profile information updated successfully!', 'success');
    }, 800);
  };

  return (
    <div className="bg-clay-50 dark:bg-forest-950 text-forest-900 dark:text-clay-50 min-h-screen flex flex-col justify-between transition-colors duration-500 relative">
      
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

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          
          {/* Column 1: Profile Summary Card */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 shadow-sm text-center relative overflow-hidden transition-all duration-300">
              <div className="relative w-24 h-24 mx-auto mb-4 group">
                <img 
                  src={selectedAvatar} 
                  alt="User avatar" 
                  className="w-full h-full rounded-full object-cover border-2 border-sage-600/30"
                />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>

              <h2 className="text-lg font-bold font-display text-forest-900 dark:text-clay-50">{user?.name || 'Saurabh Parihar'}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize font-medium">{user?.role || 'Guest'}</p>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/60 text-left space-y-3.5">
                <div className="flex items-center space-x-3 text-xs text-slate-650 dark:text-slate-350">
                  <Mail className="w-4 h-4 text-sage-600 dark:text-sage-400 shrink-0" />
                  <span className="truncate">{user?.email || 'sparihar2005@gmail.com'}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-slate-650 dark:text-slate-350">
                  <Store className="w-4 h-4 text-sage-600 dark:text-sage-400 shrink-0" />
                  <span className="truncate">{user?.shopName || 'Garhwal Organic Farms'}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-slate-650 dark:text-slate-350">
                  <Shield className="w-4 h-4 text-sage-600 dark:text-sage-400 shrink-0" />
                  <span className="capitalize font-bold text-sage-600 dark:text-sage-400">{user?.role || 'Guest'} Permissions</span>
                </div>
              </div>

              <button
                onClick={logout}
                className="w-full mt-8 flex items-center justify-center space-x-2 py-2.5 border border-red-500/20 hover:bg-red-500/5 text-red-500 rounded-xl transition-all duration-300 font-bold text-[10px] uppercase tracking-wider cursor-pointer bg-transparent"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out of Session</span>
              </button>
            </div>

            {/* Avatar Chooser Panel */}
            <div className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 shadow-sm transition-all duration-300">
              <h3 className="text-xs font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Choose Profile Avatar</h3>
              <div className="grid grid-cols-3 gap-3">
                {avatars.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedAvatar(url)}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                      selectedAvatar === url ? 'border-sage-605 scale-95 shadow-sm' : 'border-transparent hover:scale-105'
                    }`}
                  >
                    <img src={url} alt="avatar option" className="w-full h-full object-cover" />
                    {selectedAvatar === url && (
                      <div className="absolute inset-0 bg-sage-605/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white drop-shadow-sm" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 & 3: Profile Settings Form */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-8 shadow-sm transition-all duration-300">
              <h2 className="text-xl font-bold font-display text-forest-900 dark:text-clay-50 mb-6 flex items-center space-x-2">
                <Settings className="w-5 h-5 text-sage-600" />
                <span>Edit Profile Details</span>
              </h2>

              <form onSubmit={handleProfileUpdate} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Display Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    icon={<User className="w-4 h-4 text-slate-400" />}
                    inputClassName="py-2.5 text-xs rounded-xl"
                  />
                  <Input
                    label="Shop / Workshop Title"
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    icon={<Store className="w-4 h-4 text-slate-400" />}
                    inputClassName="py-2.5 text-xs rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">Login Email (Immutable)</label>
                  <div className="flex items-center space-x-2.5 bg-slate-50 dark:bg-forest-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl text-xs text-slate-500 font-bold select-none cursor-not-allowed">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>{user?.email || 'sparihar2005@gmail.com'}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    className="cursor-pointer font-bold uppercase tracking-widest text-[10px] py-3.5 px-6 bg-forest-900 hover:bg-forest-800 text-clay-50 rounded-xl"
                    type="submit"
                    isLoading={isUpdating}
                  >
                    Save Profile Changes
                  </Button>
                </div>
              </form>
            </div>

            {/* Simulated Saved AI Reports / Items Panel */}
            <div className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-8 shadow-sm transition-all duration-300">
              <h3 className="text-xs font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center space-x-2">
                <Eye className="w-4 h-4 text-sage-600" />
                <span>Saved AI Promotional Content</span>
              </h3>

              <div className="space-y-3">
                <div className="p-4 border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-forest-900/30 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-forest-900 dark:text-clay-50">Hill Farm Apple Cider Campaign</h4>
                    <p className="text-[10px] text-slate-550 dark:text-slate-400 mt-0.5">Created on July 04 • Category: Food Processing</p>
                  </div>
                  <span className="text-[10px] font-bold text-sage-650 bg-sage-50 dark:bg-sage-900/20 px-2.5 py-1 rounded-full uppercase tracking-wider">Active Promo</span>
                </div>
                <div className="p-4 border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-forest-900/30 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-forest-900 dark:text-clay-50">Local Wool Weavers Autumn Post</h4>
                    <p className="text-[10px] text-slate-550 dark:text-slate-400 mt-0.5">Created on July 02 • Category: Handicrafts</p>
                  </div>
                  <span className="text-[10px] font-bold text-sage-650 bg-sage-50 dark:bg-sage-900/20 px-2.5 py-1 rounded-full uppercase tracking-wider">Active Promo</span>
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
