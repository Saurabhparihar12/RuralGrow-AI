import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button, Input, Loader, Toast } from '../components/ui';
import { 
  MessageSquare, 
  Trash2, 
  Search, 
  Clipboard, 
  User, 
  Store, 
  Star, 
  Sparkles, 
  Activity,
  Plus,
  Compass,
  Settings,
  Database
} from 'lucide-react';

export default function Dashboard() {
  // Navigation tabs state
  const [activeTab, setActiveTab] = useState('reviews'); // 'reviews' | 'promotions' | 'settings'

  // Live API States
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState('all');

  // New Review Form States
  const [newAuthor, setNewAuthor] = useState('');
  const [newShopName, setNewShopName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  // Selected Review / Reply States
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [generatedReply, setGeneratedReply] = useState('');
  const [reviewSentiment, setReviewSentiment] = useState('');

  // Promo Post States (Client-Side generator helper)
  const [shopType, setShopType] = useState('Farm');
  const [productName, setProductName] = useState('');
  const [promoOutput, setPromoOutput] = useState('');

  // Captions API States
  const [captions, setCaptions] = useState([]);
  const [captionsLoading, setCaptionsLoading] = useState(false);

  // Toast State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Fetch reviews from REST API
  const fetchReviews = async () => {
    try {
      setLoading(true);
      let url = 'http://localhost:5000/api/reviews';
      const params = [];
      if (searchTerm.trim()) {
        params.push(`search=${encodeURIComponent(searchTerm.trim())}`);
      }
      if (sentimentFilter && sentimentFilter !== 'all') {
        params.push(`sentiment=${sentimentFilter}`);
      }
      if (params.length > 0) {
        url += `?${params.join('&')}`;
      }

      const res = await fetch(url);
      const json = await res.json();
      if (json.success) {
        setReviews(json.data);
        setError(null);
      } else {
        setError(json.message || 'Failed to fetch reviews.');
      }
    } catch (err) {
      setError('Could not connect to backend server. Make sure the Express API is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch captions from REST API
  const fetchCaptions = async () => {
    try {
      setCaptionsLoading(true);
      const res = await fetch('http://localhost:5000/api/captions');
      const json = await res.json();
      if (json.success) {
        setCaptions(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch captions:', err.message);
    } finally {
      setCaptionsLoading(false);
    }
  };

  // Load reviews and captions on mount and when filters change
  useEffect(() => {
    fetchReviews();
    fetchCaptions();
  }, [sentimentFilter]);

  // Handle search submit button
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchReviews();
  };

  // Select a review to view and copy suggestions
  const handleSelectReview = (rev) => {
    const id = rev.id || rev._id;
    setSelectedReviewId(id);
    setGeneratedReply(rev.replySuggestion || '');
    setReviewSentiment(rev.sentiment || 'neutral');
    showToast(`Viewing review by ${rev.author}`, 'info');
  };

  // Add review POST call
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newShopName.trim() || !newReviewText.trim()) {
      showToast('Please fill in all fields (Author, Shop, and Review text).', 'warning');
      return;
    }

    try {
      setIsSubmitLoading(true);
      const res = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: newAuthor,
          shopName: newShopName,
          rating: Number(newRating),
          reviewText: newReviewText
        })
      });
      
      const json = await res.json();
      if (json.success) {
        // Reset form
        setNewAuthor('');
        setNewShopName('');
        setNewRating(5);
        setNewReviewText('');
        showToast('Review created and saved successfully!', 'success');
        // Reload list
        fetchReviews();
      } else {
        showToast(`Error: ${json.message}`, 'error');
      }
    } catch (err) {
      showToast('Failed to submit review to server.', 'error');
    } finally {
      setIsSubmitLoading(false);
    }
  };

  // Delete review DELETE call
  const handleDeleteReview = async (id, e) => {
    e.stopPropagation(); // Stop click from selecting row
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${id}`, {
        method: 'DELETE'
      });
      const json = await res.json();
      if (json.success) {
        if (selectedReviewId === id) {
          setSelectedReviewId(null);
          setGeneratedReply('');
          setReviewSentiment('');
        }
        showToast('Review removed from database.', 'success');
        fetchReviews();
      } else {
        showToast(`Error: ${json.message}`, 'error');
      }
    } catch (err) {
      showToast('Failed to delete review from server.', 'error');
    }
  };

  // Local Promo Caption generation and database saving
  const handleGeneratePromo = async (e) => {
    e.preventDefault();
    if (!productName.trim()) {
      showToast('Please type a product name first!', 'warning');
      return;
    }
    
    let text = '';
    if (shopType === 'Farm') {
      text = `🌾 Fresh harvest alert from Uttarakhand hills! Our special, organic [${productName}] is ready. Grown traditionally with crystal clear mountain water. Support local farmers! \n\n📍 Delivery across Dehradun. Send us a WhatsApp message to order. \n\n#OrganicFarming #GrowLocal #UttarakhandFarms #DehradunBasmati #${productName.replace(/\s+/g, '')}`;
    } else if (shopType === 'Handloom') {
      text = `🧣 Handcrafted with love by our local weavers! Presenting the all-new [${productName}]. Every thread is woven by hand using traditional designs passed down through generations. \n\n📦 Shipments across India. Help keep our craft heritage alive! \n\n#VocalForLocal #MakeInIndia #HandloomWeavers #TraditionalCrafts #${productName.replace(/\s+/g, '')}`;
    } else {
      text = `🏔️ Escape the summer heat! Book your mountain view room at our homestay. Enjoy home-cooked meals and local experiences. Fresh [${productName}] tea served in the balcony. \n\n📞 Click the contact link to book your stay. \n\n#Himalayas #MountainHomestay #UttarakhandTourism #TravelIndia #${productName.replace(/\s+/g, '')}`;
    }
    
    setPromoOutput(text);
    showToast('Instagram caption generated!', 'success');

    // Save caption to database
    try {
      const res = await fetch('http://localhost:5000/api/captions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          shopType,
          captionText: text
        })
      });
      const json = await res.json();
      if (json.success) {
        fetchCaptions(); // reload saved list
      }
    } catch (err) {
      console.error('Failed to save caption draft:', err.message);
    }
  };

  // Delete saved caption
  const handleDeleteCaption = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this caption?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/captions/${id}`, {
        method: 'DELETE'
      });
      const json = await res.json();
      if (json.success) {
        showToast('Instagram caption deleted.', 'success');
        fetchCaptions();
      } else {
        showToast(`Error: ${json.message}`, 'error');
      }
    } catch (err) {
      showToast('Failed to delete caption.', 'error');
    }
  };

  // Dynamic statistics calculations
  const totalReviewsCount = reviews.length;
  const uniqueShopsCount = new Set(reviews.map(r => r.shopName)).size;
  const averageRatingVal = totalReviewsCount > 0 
    ? (reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / totalReviewsCount).toFixed(1)
    : '5.0';

  return (
    <div className="bg-clay-50 dark:bg-forest-950 text-forest-900 dark:text-clay-50 min-h-screen flex flex-col justify-between transition-colors duration-300 relative overflow-hidden">
      {/* Toast Notification Container */}
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

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-8 py-10 relative z-10 animate-fade-in-blur">
        
        {/* Asymmetrical Workspace Sidebar + Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 1. LEFT SIDEBAR COMPONENT (3 columns width) */}
          <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-5.5 shadow-xs space-y-6">
              
              {/* Profile Block */}
              <div className="flex items-center space-x-3.5 border-b border-slate-100 dark:border-slate-800/50 pb-4">
                <div className="w-10 h-10 rounded-full bg-sage-500/15 text-sage-600 dark:text-sage-400 flex items-center justify-center font-bold text-sm">
                  RG
                </div>
                <div>
                  <h4 className="text-xs font-bold text-forest-900 dark:text-clay-50 font-display">RuralGrow Operator</h4>
                  <span className="text-[9px] text-slate-450 dark:text-slate-500 font-semibold block">Merchant Hub Profile</span>
                </div>
              </div>

              {/* Sidebar navigation */}
              <nav className="space-y-1.5">
                {[
                  { id: 'reviews', label: 'Reviews Hub', icon: <MessageSquare className="w-3.5 h-3.5" /> },
                  { id: 'promotions', label: 'Promo Builder', icon: <Compass className="w-3.5 h-3.5" /> },
                  { id: 'settings', label: 'Platform Guide', icon: <Settings className="w-3.5 h-3.5" /> }
                ].map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-left text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer
                        ${isActive 
                          ? 'bg-forest-900 dark:bg-clay-50 text-clay-50 dark:text-forest-950 border-transparent shadow-xs' 
                          : 'bg-transparent text-slate-500 hover:text-forest-900 dark:hover:text-clay-50 border-transparent hover:bg-slate-50 dark:hover:bg-forest-900/40'}`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Platform connection status info indicator */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between text-[9px] font-bold uppercase text-slate-400 dark:text-slate-500 font-mono">
                <div className="flex items-center space-x-1.5">
                  <Database className="w-3.5 h-3.5 text-sage-500" />
                  <span>DB Connection</span>
                </div>
                <span className="text-sage-600 dark:text-sage-400">Connected</span>
              </div>

            </div>
          </div>

          {/* 2. MAIN WORKSPACE CONTENT CANVAS (9 columns width) */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Top Workspace Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200/50 dark:border-slate-800/40 pb-5 gap-3.5">
              <div>
                <h2 className="text-2xl font-display font-bold text-forest-900 dark:text-clay-50 uppercase tracking-tight">
                  {activeTab === 'reviews' && 'Reviews Hub'}
                  {activeTab === 'promotions' && 'Promo Builder'}
                  {activeTab === 'settings' && 'Platform Guide'}
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {activeTab === 'reviews' && 'Analyze customer sentiment logs and fetch Suggested Replies.'}
                  {activeTab === 'promotions' && 'Draft marketing copy templates optimized for Instagram.'}
                  {activeTab === 'settings' && 'Review operational guidelines for copy-pasting reviews and captions.'}
                </p>
              </div>
            </div>

            {/* Awwwards metrics with micro-sparkline SVGs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  label: 'Reviews Staged', 
                  value: `${totalReviewsCount}`, 
                  sparkline: (
                    <svg className="w-14 h-6 text-emerald-500" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M10 25 L30 20 L50 22 L70 12 L90 5" />
                    </svg>
                  )
                },
                { 
                  label: 'Distinct Shops', 
                  value: `${uniqueShopsCount}`, 
                  sparkline: (
                    <svg className="w-14 h-6 text-sage-500" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M10 22 L30 22 L50 15 L70 18 L90 8" />
                    </svg>
                  )
                },
                { 
                  label: 'Average Score', 
                  value: `${averageRatingVal}★`, 
                  sparkline: (
                    <svg className="w-14 h-6 text-amber-500" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M10 18 L30 15 L50 10 L70 8 L90 5" />
                    </svg>
                  )
                }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-2xl p-5 flex items-center justify-between shadow-xs">
                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">{stat.label}</span>
                    <div className="text-2xl font-display font-black text-forest-900 dark:text-clay-50 leading-none">{stat.value}</div>
                  </div>
                  <div>{stat.sparkline}</div>
                </div>
              ))}
            </div>

            {/* Conditional Tab Rendering */}
            
            {/* TAB 1: REVIEWS HUB */}
            {activeTab === 'reviews' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in-blur">
                
                {/* List Container (7 columns) */}
                <div className="lg:col-span-7 bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 shadow-xs space-y-6">
                  
                  {/* Filter and Search Panel */}
                  <form onSubmit={handleSearchSubmit} className="flex gap-2.5">
                    <div className="flex-1">
                      <Input
                        placeholder="Search reviews..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="!space-y-0"
                        inputClassName="py-2.5 text-xs rounded-xl focus:ring-1 focus:ring-sage-500"
                        icon={<Search className="w-3.5 h-3.5 text-slate-400" />}
                      />
                    </div>
                    <button 
                      type="submit"
                      className="px-4.5 bg-forest-900 dark:bg-clay-50 text-clay-50 dark:text-forest-950 rounded-xl text-[10px] font-bold uppercase tracking-widest cursor-pointer shadow-xs hover:bg-sage-600 dark:hover:bg-clay-200 transition-colors"
                    >
                      Search
                    </button>
                    <select
                      value={sentimentFilter}
                      onChange={(e) => setSentimentFilter(e.target.value)}
                      className="bg-white dark:bg-forest-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-350 outline-none cursor-pointer"
                    >
                      <option value="all">All Sentiment</option>
                      <option value="positive">Positive</option>
                      <option value="neutral">Neutral</option>
                      <option value="negative">Negative</option>
                    </select>
                  </form>

                  {/* Review List Box */}
                  {loading ? (
                    <div className="py-20 flex justify-center">
                      <Loader size="md" />
                    </div>
                  ) : reviews.length === 0 ? (
                    <div className="py-16 text-center text-xs text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl font-medium">
                      No reviews found. Try creating one in the form on the right!
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                      {reviews.map((rev) => {
                        const id = rev.id || rev._id;
                        const isSelected = selectedReviewId === id;
                        
                        const sentimentColors = {
                          positive: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-450 border-emerald-250/30 dark:border-emerald-900/40',
                          negative: 'bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-455 border-rose-250/30 dark:border-rose-900/40',
                          neutral: 'bg-slate-100 dark:bg-slate-800/80 text-slate-650 dark:text-slate-400 border-slate-200/50 dark:border-slate-700/60'
                        };

                        return (
                          <div 
                            key={id} 
                            onClick={() => handleSelectReview(rev)}
                            className={`p-4.5 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex justify-between items-start group
                              ${isSelected 
                                ? 'border-sage-500 bg-sage-500/5 shadow-xs' 
                                : 'border-slate-200/60 dark:border-slate-800/80 hover:border-slate-350 dark:hover:border-slate-700 bg-slate-50/20 dark:bg-slate-900/10'}`}
                          >
                            <div className="flex-1 space-y-2.5 pr-4">
                              <div className="flex justify-between items-center text-[10px] mb-0.5">
                                <span className="font-bold text-forest-900 dark:text-clay-50">{rev.author}</span>
                                <span className="text-slate-400 dark:text-slate-500 font-semibold">{rev.shopName}</span>
                              </div>
                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 line-clamp-2 italic leading-relaxed font-medium">
                                "{rev.reviewText}"
                              </p>
                              
                              <div className="flex items-center space-x-2 pt-0.5">
                                <span className="text-xs text-amber-500 flex items-center">
                                  {Array.from({ length: Number(rev.rating || 5) }).map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                                  ))}
                                </span>
                                <span className={`text-[9px] px-2.5 py-0.5 rounded-full border uppercase tracking-widest font-bold ${sentimentColors[rev.sentiment] || sentimentColors.neutral}`}>
                                  {rev.sentiment || 'neutral'}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={(e) => handleDeleteReview(id, e)}
                              className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                              aria-label="Delete review"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Generated Reply Suggestion Panel */}
                  {selectedReviewId && generatedReply && (
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/40 space-y-3.5 animate-fade-in-blur">
                      <span className="text-[10px] font-bold text-sage-600 dark:text-sage-400 uppercase tracking-widest block">
                        AI Suggested Response Draft ({reviewSentiment}):
                      </span>
                      <textarea 
                        className="w-full bg-slate-50 dark:bg-forest-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs sm:text-sm text-slate-755 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-sage-500 leading-relaxed font-medium"
                        rows={4}
                        value={generatedReply}
                        onChange={(e) => setGeneratedReply(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs py-2 px-4 cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(generatedReply);
                            showToast('Suggested reply copied to clipboard!', 'success');
                          }}
                        >
                          Copy to Clipboard
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Form Container (5 columns) */}
                <div className="lg:col-span-5 bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 shadow-xs">
                  <div className="flex items-center space-x-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-teal-500/10 text-teal-650 dark:text-teal-400 flex items-center justify-center text-sm font-bold shadow-inner">
                      <Plus className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-forest-900 dark:text-clay-50">Log Customer Review</h3>
                      <p className="text-[10px] text-slate-550 font-medium">Insert buyer feedback into database</p>
                    </div>
                  </div>

                  <form onSubmit={handleAddReview} className="space-y-4">
                    <Input
                      label="Customer Name & Location"
                      placeholder="e.g. Shyam Lal (Mussoorie)"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="!space-y-1.5"
                      inputClassName="py-2.5 text-xs rounded-xl focus:ring-1 focus:ring-sage-500"
                      icon={<User className="w-3.5 h-3.5 text-slate-400" />}
                    />

                    <Input
                      label="Local Shop Name"
                      placeholder="e.g. Garhwal Fruit Preserve"
                      value={newShopName}
                      onChange={(e) => setNewShopName(e.target.value)}
                      className="!space-y-1.5"
                      inputClassName="py-2.5 text-xs rounded-xl focus:ring-1 focus:ring-sage-500"
                      icon={<Store className="w-3.5 h-3.5 text-slate-400" />}
                    />

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                        Rating Score
                      </label>
                      <select
                        value={newRating}
                        onChange={(e) => setNewRating(Number(e.target.value))}
                        className="w-full bg-white dark:bg-forest-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-350 outline-none cursor-pointer"
                      >
                        <option value={5}>★★★★★ (5 Stars)</option>
                        <option value={4}>★★★★☆ (4 Stars)</option>
                        <option value={3}>★★★☆☆ (3 Stars)</option>
                        <option value={2}>★★☆☆☆ (2 Stars)</option>
                        <option value={1}>★☆☆☆☆ (1 Star)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                        Review Message Text
                      </label>
                      <textarea
                        placeholder="Enter review feedback text..."
                        value={newReviewText}
                        onChange={(e) => setNewReviewText(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-forest-900/60 px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-sage-500 font-medium"
                        rows={3}
                      />
                    </div>

                    <Button 
                      variant="primary" 
                      className="w-full text-xs py-3 cursor-pointer mt-1 font-bold uppercase tracking-wider bg-forest-900 dark:bg-clay-50 text-clay-50 dark:text-forest-950" 
                      type="submit"
                      isLoading={isSubmitLoading}
                    >
                      Save Review to Database
                    </Button>
                  </form>
                </div>

              </div>
            )}

            {/* TAB 2: PROMOTIONS WRITER */}
            {activeTab === 'promotions' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in-blur">
                
                {/* Generation Form Panel (5 cols) */}
                <div className="lg:col-span-5 bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 shadow-xs space-y-5">
                  <form onSubmit={handleGeneratePromo} className="space-y-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-650 dark:text-purple-400 flex items-center justify-center font-bold shadow-inner">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-forest-900 dark:text-clay-50">Instagram Promo Poster</h3>
                        <p className="text-[10px] text-slate-550 font-medium">Generate social drafts for local products</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-555 uppercase mb-2.5 tracking-wider">Merchant Business Type</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { type: 'Farm', label: 'Farm Harvest' },
                          { type: 'Handloom', label: 'Handicraft' },
                          { type: 'Homestay', label: 'Homestay' }
                        ].map((item) => (
                          <button
                            key={item.type}
                            type="button"
                            onClick={() => setShopType(item.type)}
                            className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl border transition-all duration-300 cursor-pointer
                              ${shopType === item.type
                                ? 'bg-forest-900 dark:bg-clay-50 text-clay-50 dark:text-forest-950 border-transparent shadow-xs'
                                : 'bg-white dark:bg-[#19221F] text-slate-650 dark:text-slate-350 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Input
                      label="Product Name / Feature"
                      placeholder="e.g. Organic Apricots, Woolen Cap, Pine Cottage"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="!space-y-1.5"
                      inputClassName="py-2.5 text-xs rounded-xl focus:ring-1 focus:ring-sage-500"
                      icon={<Sparkles className="w-3.5 h-3.5 text-slate-400" />}
                    />

                    <Button variant="primary" className="w-full text-xs py-3 cursor-pointer font-bold uppercase tracking-wider bg-forest-900 dark:bg-clay-50 text-clay-50 dark:text-forest-950" type="submit">
                      Write Instagram Draft
                    </Button>
                  </form>

                  {promoOutput && (
                    <div className="p-4 bg-purple-50/15 dark:bg-purple-950/10 border border-purple-100/50 dark:border-purple-900/30 rounded-2xl space-y-3.5 animate-fade-in-blur">
                      <span className="text-[10px] font-bold text-purple-655 dark:text-purple-400 uppercase tracking-widest block">Instagram Caption Draft:</span>
                      <textarea 
                        className="w-full bg-white dark:bg-forest-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs sm:text-sm text-slate-750 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-purple-500/25 leading-relaxed font-medium"
                        rows={5}
                        value={promoOutput}
                        onChange={(e) => setPromoOutput(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs py-2 px-4 cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(promoOutput);
                            showToast('Instagram caption copied!', 'success');
                          }}
                        >
                          Copy Caption
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Captions History List Panel (7 cols) */}
                <div className="lg:col-span-7 bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/50 pb-3">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Saved Caption Logs</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-forest-900 text-slate-500 dark:text-slate-400 border border-slate-200/30 text-[9px] font-bold">{captions.length} saved</span>
                  </div>

                  {captionsLoading ? (
                    <div className="py-20 flex justify-center"><Loader size="md" /></div>
                  ) : captions.length === 0 ? (
                    <div className="text-[11px] text-slate-455 dark:text-slate-500 italic text-center py-16 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                      No saved promo posts yet. Generate one in the form on the left!
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                      {captions.map((cap) => {
                        const capId = cap.id || cap._id;
                        return (
                          <div key={capId} className="p-4 bg-slate-55/35 dark:bg-forest-900/30 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl flex justify-between items-start gap-4 hover:border-slate-350 dark:hover:border-slate-700 transition-colors duration-300">
                            <div className="flex-1 space-y-2">
                              <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-wider">
                                <span className="text-purple-650 dark:text-purple-400">{cap.shopType}</span>
                                <span className="text-slate-400 dark:text-slate-555">{cap.productName}</span>
                              </div>
                              <p className="text-[11px] sm:text-xs text-slate-655 dark:text-slate-300 leading-relaxed font-medium whitespace-pre-wrap">
                                {cap.captionText}
                              </p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(cap.captionText);
                                  showToast('Copied saved caption!', 'success');
                                }}
                                className="p-2 rounded-xl text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                                title="Copy Caption"
                              >
                                <Clipboard className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => handleDeleteCaption(capId, e)}
                                className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                                title="Delete Caption"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB 3: PLATFORM GUIDE */}
            {activeTab === 'settings' && (
              <div className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-8 shadow-xs space-y-6 animate-fade-in-blur">
                <h3 className="text-lg font-display font-bold border-b border-slate-100 dark:border-slate-800/50 pb-3">Platform Operations Guide</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Review Assistant Guidelines</span>
                      <p className="text-slate-655 dark:text-slate-350 leading-relaxed">
                        Copy customer reviews from Google Maps and click on card items to review sentiment tags and suggested reply templates. Click Copy to save response suggestions to your outbox.
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Promo Builder Guidelines</span>
                      <p className="text-slate-655 dark:text-slate-350 leading-relaxed">
                        Specify product properties and select business categories (Farm, Handloom, or Homestay). Generating templates stores promotion copy persistently in the database log.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Database Mode</span>
                      <p className="text-slate-655 dark:text-slate-350 leading-relaxed font-semibold">
                        Connected to persistent storage. If whitelisted clusters are unavailable, connection fallback is handled locally using local backup JSON tables transparently.
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Community Repository</span>
                      <a href="https://github.com/Saurabhparihar12/RuralGrow-AI" target="_blank" rel="noreferrer" className="text-sage-600 dark:text-sage-400 hover:underline font-bold font-mono">
                        github.com/Saurabhparihar12/RuralGrow-AI
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
