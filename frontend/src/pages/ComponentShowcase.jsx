import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button, Input, Modal, Toast, Loader } from '../components/ui';

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
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col justify-between transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="border-b border-slate-200 dark:border-slate-900 pb-8 mb-12">
          <span className="text-xs font-bold text-indigo-650 dark:text-indigo-400 uppercase tracking-widest bg-indigo-500/10 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-500/20">
            UI Toolkit
          </span>
          <h1 className="text-3xl font-extrabold sm:text-4xl text-slate-900 dark:text-white mt-4">
            Custom UI Library Showcase
          </h1>
          <p className="mt-2 text-slate-650 dark:text-slate-400">
            This playground displays our custom UI components built for the Week 3 evaluation.
          </p>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 1. BUTTON VARIANT SHOWCASE */}
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm dark:shadow-md">
            <h2 className="text-lg font-bold border-b border-slate-100 dark:border-slate-800/80 pb-3 mb-6 text-slate-905 dark:text-white">
              1. Button Component (`Button.jsx`)
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3 tracking-wide">Variants</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3 tracking-wide">Sizes</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3 tracking-wide">States</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" isLoading>Loading State</Button>
                  <Button variant="outline" disabled>Disabled State</Button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. INPUT FIELD SHOWCASE */}
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm dark:shadow-md">
            <h2 className="text-lg font-bold border-b border-slate-100 dark:border-slate-800/80 pb-3 mb-6 text-slate-905 dark:text-white">
              2. Input Field Component (`Input.jsx`)
            </h2>
            
            <form onSubmit={handleDummySubmit} className="space-y-4">
              <Input
                label="Normal Text Input"
                placeholder="Enter your full name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />

              <Input
                label="Input with Icon (Left)"
                placeholder="search-reviews..."
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                }
              />

              <Input
                label="Input with Validation (Email)"
                placeholder="enter-email@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                error={emailError}
              />

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-slate-500">Submit form to trigger validation errors or progress loader.</span>
                <Button variant="primary" type="submit" isLoading={isSubmitLoading}>
                  Test Submit
                </Button>
              </div>
            </form>
          </div>

          {/* 3. MODAL OVERLAY TRIGGER */}
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm dark:shadow-md">
            <h2 className="text-lg font-bold border-b border-slate-100 dark:border-slate-800/80 pb-3 mb-6 text-slate-905 dark:text-white">
              3. Modal Component (`Modal.jsx`)
            </h2>

            <p className="text-sm text-slate-650 dark:text-slate-400 mb-6 leading-relaxed">
              Modals display focused dialogues to users. Click the button below to view a fully accessible, animated, dark-mode-ready custom modal overlay.
            </p>

            <Button variant="primary" onClick={() => setIsDemoModalOpen(true)}>
              Open Demo Modal
            </Button>
          </div>

          {/* 4. TOAST NOTIFICATION POPUPS */}
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm dark:shadow-md">
            <h2 className="text-lg font-bold border-b border-slate-100 dark:border-slate-800/80 pb-3 mb-6 text-slate-905 dark:text-white">
              4. Toast Notifications (`Toast.jsx`)
            </h2>

            <p className="text-sm text-slate-650 dark:text-slate-400 mb-6 leading-relaxed">
              Toasts provide contextual status updates in real-time. Click to trigger notification banners at the bottom-right.
            </p>

            <div className="flex flex-wrap gap-2.5">
              <Button variant="secondary" onClick={() => triggerToast('Successfully saved reviews!', 'success')}>
                Success Toast
              </Button>
              <Button variant="danger" onClick={() => triggerToast('Could not fetch server data!', 'error')}>
                Error Toast
              </Button>
              <Button variant="secondary" onClick={() => triggerToast('Warning: High review usage detected.', 'warning')}>
                Warning Toast
              </Button>
              <Button variant="outline" onClick={() => triggerToast('Info: Analyzing sentiment score...', 'info')}>
                Info Toast
              </Button>
            </div>
          </div>

          {/* 5. SPINNING LOADERS */}
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm dark:shadow-md lg:col-span-2">
            <h2 className="text-lg font-bold border-b border-slate-100 dark:border-slate-800/80 pb-3 mb-6 text-slate-905 dark:text-white">
              5. Loader Indicators (`Loader.jsx`)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-900">
                <h4 className="text-xs font-semibold text-slate-500 uppercase mb-3">Small Loader</h4>
                <Loader size="sm" />
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-900">
                <h4 className="text-xs font-semibold text-slate-500 uppercase mb-3">Medium Loader (Default)</h4>
                <Loader size="md" />
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-900">
                <h4 className="text-xs font-semibold text-slate-500 uppercase mb-3">Large Loader</h4>
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
        title="RuralGrow AI Platform Message"
        footerContent={
          <>
            <Button variant="outline" onClick={() => setIsDemoModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => {
              setIsDemoModalOpen(false);
              triggerToast('Confirmed action inside modal!', 'success');
            }}>
              Confirm
            </Button>
          </>
        }
      >
        <p className="mb-4">
          This is an instance of our custom modal dialogue. It matches the system's light/dark mode preference perfectly.
        </p>
        <p className="text-slate-550 dark:text-slate-400">
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
