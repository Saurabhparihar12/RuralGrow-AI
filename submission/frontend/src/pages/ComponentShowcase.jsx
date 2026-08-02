import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button, Input, Modal, Toast, Loader } from '../components/ui';
import { 
  Sparkles, 
  Search, 
  Mail, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function ComponentShowcase() {
  // Modal states
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Toast list state
  const [toasts, setToasts] = useState([]);

  // Form input states
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameInput, setNameInput] = useState('');
  
  // Loading button states
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  // Helper to add toast
  const triggerToast = (message, type) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  // Helper to remove toast
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Handle dummy submit validation
  const handleDummySubmit = (e) => {
    e.preventDefault();
    if (!emailInput.includes('@')) {
      setEmailError('Please enter a valid email address.');
      triggerToast('Validation failed! Check form errors.', 'error');
    } else {
      setEmailError('');
      setIsSubmitLoading(true);
      triggerToast('Submitting data to system...', 'info');
      setTimeout(() => {
        setIsSubmitLoading(false);
        triggerToast('Profile updated successfully!', 'success');
        setEmailInput('');
        setNameInput('');
      }, 2000);
    }
  };

  return (
    <div className="bg-clay-50 dark:bg-forest-950 text-forest-900 dark:text-clay-50 min-h-screen flex flex-col justify-between transition-colors duration-300 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-sage-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sage-500/5 rounded-full blur-3xl pointer-events-none" />

      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-8 py-12 relative z-10 animate-fade-in-blur">
        
        {/* Page Header */}
        <div className="border-b border-slate-200/50 dark:border-slate-800/40 pb-6 mb-10">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sage-500/10 text-sage-600 dark:text-sage-400 text-[9px] uppercase font-black tracking-widest">
            <span>UI Playground</span>
          </span>
          <h1 className="text-3xl font-display font-bold tracking-tight mt-4">
            Component Design Library
          </h1>
          <p className="mt-2 text-slate-550 dark:text-slate-400 text-xs sm:text-sm font-medium">
            This playground displays our custom UI components built for the RuralGrow assistant workspace.
          </p>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 1. BUTTON VARIANT SHOWCASE */}
          <div className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6.5 hover:scale-[1.002] transition-all duration-300">
            <h2 className="text-base font-black border-b border-slate-100 dark:border-slate-800/40 pb-3 mb-6">
              1. Button Component (`Button.jsx`)
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-[9px] font-bold text-slate-400 uppercase mb-3 tracking-widest">Variants</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                </div>
              </div>

              <div>
                <h3 className="text-[9px] font-bold text-slate-400 uppercase mb-3 tracking-widest">Sizes</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </div>
              </div>

              <div>
                <h3 className="text-[9px] font-bold text-slate-400 uppercase mb-3 tracking-widest">States</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" isLoading>Loading State</Button>
                  <Button variant="outline" disabled>Disabled State</Button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. INPUT FIELD SHOWCASE */}
          <div className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6.5 hover:scale-[1.002] transition-all duration-300">
            <h2 className="text-base font-black border-b border-slate-100 dark:border-slate-800/40 pb-3 mb-6">
              2. Input Field Component (`Input.jsx`)
            </h2>
            
            <form onSubmit={handleDummySubmit} className="space-y-4">
              <Input
                label="Normal Text Input"
                placeholder="Enter your full name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                inputClassName="py-2.5 text-xs rounded-xl"
              />

              <Input
                label="Input with Icon (Left)"
                placeholder="Search reviews..."
                icon={<Search className="w-4 h-4 text-slate-400" />}
                inputClassName="py-2.5 text-xs rounded-xl"
              />

              <Input
                label="Input with Validation (Email)"
                placeholder="enter-email@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                error={emailError}
                icon={<Mail className="w-4 h-4 text-slate-400" />}
                inputClassName="py-2.5 text-xs rounded-xl"
              />

              <div className="flex flex-col sm:flex-row gap-3 justify-between items-center pt-2">
                <span className="text-[10px] text-slate-450 font-semibold">Submit form to trigger validation errors or progress loader.</span>
                <Button variant="primary" type="submit" isLoading={isSubmitLoading} className="w-full sm:w-auto text-xs py-2 px-4 cursor-pointer font-bold uppercase tracking-wider bg-forest-900 dark:bg-clay-50 text-clay-50 dark:text-forest-950">
                  Test Submit
                </Button>
              </div>
            </form>
          </div>

          {/* 3. MODAL OVERLAY TRIGGER */}
          <div className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6.5 hover:scale-[1.002] transition-all duration-300">
            <h2 className="text-base font-black border-b border-slate-100 dark:border-slate-800/40 pb-3 mb-6">
              3. Modal Component (`Modal.jsx`)
            </h2>

            <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 mb-6 leading-relaxed font-medium">
              Modals display focused dialogues to users. Click the button below to view a fully accessible, animated, dark-mode-ready custom modal overlay.
            </p>

            <Button variant="primary" onClick={() => setIsDemoModalOpen(true)} className="text-xs py-2.5 px-5 cursor-pointer font-bold uppercase tracking-wider bg-forest-900 dark:bg-clay-50 text-clay-50 dark:text-forest-950">
              Open Demo Modal
            </Button>
          </div>

          {/* 4. TOAST NOTIFICATION POPUPS */}
          <div className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6.5 hover:scale-[1.002] transition-all duration-300">
            <h2 className="text-base font-black border-b border-slate-100 dark:border-slate-800/40 pb-3 mb-6">
              4. Toast Notifications (`Toast.jsx`)
            </h2>

            <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 mb-6 leading-relaxed font-medium">
              Toasts provide contextual status updates in real-time. Click to trigger notification banners at the bottom-right.
            </p>

            <div className="flex flex-wrap gap-2.5">
              <Button variant="secondary" className="text-[10px] font-bold uppercase tracking-wider py-2 px-3.5 cursor-pointer" onClick={() => triggerToast('Successfully saved reviews!', 'success')}>
                Success Toast
              </Button>
              <Button variant="danger" className="text-[10px] font-bold uppercase tracking-wider py-2 px-3.5 cursor-pointer" onClick={() => triggerToast('Could not fetch server data!', 'error')}>
                Error Toast
              </Button>
              <Button variant="secondary" className="text-[10px] font-bold uppercase tracking-wider py-2 px-3.5 cursor-pointer" onClick={() => triggerToast('Warning: High review usage detected.', 'warning')}>
                Warning Toast
              </Button>
              <Button variant="outline" className="text-[10px] font-bold uppercase tracking-wider py-2 px-3.5 cursor-pointer" onClick={() => triggerToast('Info: Analyzing sentiment score...', 'info')}>
                Info Toast
              </Button>
            </div>
          </div>

          {/* 5. SPINNING LOADERS */}
          <div className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6.5 hover:scale-[1.002] transition-all duration-300 lg:col-span-2">
            <h2 className="text-base font-black border-b border-slate-100 dark:border-slate-800/40 pb-3 mb-6">
              5. Loader Indicators (`Loader.jsx`)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-slate-50 dark:bg-forest-900/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex flex-col items-center justify-center min-h-[110px]">
                <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Small Loader</h4>
                <Loader size="sm" />
              </div>
              <div className="bg-slate-50 dark:bg-forest-900/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex flex-col items-center justify-center min-h-[110px]">
                <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Medium Loader</h4>
                <Loader size="md" />
              </div>
              <div className="bg-slate-50 dark:bg-forest-900/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex flex-col items-center justify-center min-h-[110px]">
                <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Large Loader</h4>
                <Loader size="lg" />
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* RENDER MODAL IF OPEN */}
      <Modal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        title="RuralGrow Platform Message"
        footerContent={
          <>
            <Button variant="outline" onClick={() => setIsDemoModalOpen(false)} className="text-xs py-2 px-4 cursor-pointer font-bold uppercase tracking-wider">
              Cancel
            </Button>
            <Button variant="primary" onClick={() => {
              setIsDemoModalOpen(false);
              triggerToast('Confirmed action inside modal!', 'success');
            }} className="text-xs py-2 px-4 cursor-pointer font-bold uppercase tracking-wider bg-forest-900 dark:bg-clay-50 text-clay-50 dark:text-forest-950">
              Confirm
            </Button>
          </>
        }
      >
        <p className="mb-4 text-slate-700 dark:text-slate-350 text-sm font-medium leading-relaxed">
          This is an instance of our custom modal dialogue. It matches the system's light/dark mode preference perfectly.
        </p>
        <p className="text-slate-500 dark:text-slate-450 text-xs font-semibold">
          We can place form inputs, loader animations, or button panels inside. Click <strong>Confirm</strong> to trigger a toast indicator or press <strong>Cancel</strong> / backdrop click to dismiss.
        </p>
      </Modal>

      {/* RENDER TOAST CONTAINER */}
      <div className="fixed bottom-5 right-5 z-55 flex flex-col space-y-3 pointer-events-none">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}
