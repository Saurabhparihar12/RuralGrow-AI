import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button, Input, Loader } from '../components/ui';

export default function Dashboard() {
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

  // Load reviews on mount and when filters change
  useEffect(() => {
    fetchReviews();
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
  };

  // Add review POST call
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newShopName.trim() || !newReviewText.trim()) {
      alert('Please fill in all fields (Author, Shop, and Review text).');
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
        // Reload list
        fetchReviews();
      } else {
        alert(`Error: ${json.message}`);
      }
    } catch (err) {
      alert('Failed to submit review to server.');
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
        fetchReviews();
      } else {
        alert(`Error: ${json.message}`);
      }
    } catch (err) {
      alert('Failed to delete review from server.');
    }
  };

  // Local Promo Caption generation
  const handleGeneratePromo = (e) => {
    e.preventDefault();
    if (!productName.trim()) {
      setPromoOutput('Please type a product name first! (e.g. Organic Walnuts)');
      return;
    }
    if (shopType === 'Farm') {
      setPromoOutput(`🌾 Fresh harvest alert from Uttarakhand hills! Our special, organic [${productName}] is ready. Grown traditionally with crystal clear mountain water. Support local farmers! \n\n📍 Delivery across Dehradun. Send us a WhatsApp message to order. \n\n#OrganicFarming #GrowLocal #UttarakhandFarms #DehradunBasmati #${productName.replace(/\s+/g, '')}`);
    } else if (shopType === 'Handloom') {
      setPromoOutput(`🧣 Handcrafted with love by our local weavers! Presenting the all-new [${productName}]. Every thread is woven by hand using traditional designs passed down through generations. \n\n📦 Shipments across India. Help keep our craft heritage alive! \n\n#VocalForLocal #MakeInIndia #HandloomWeavers #TraditionalCrafts #${productName.replace(/\s+/g, '')}`);
    } else {
      setPromoOutput(`🏔️ Escape the summer heat! Book your mountain view room at our homestay. Enjoy home-cooked meals and local experiences. Fresh [${productName}] tea served in the balcony. \n\n📞 Click the contact link to book your stay. \n\n#Himalayas #MountainHomestay #UttarakhandTourism #TravelIndia #${productName.replace(/\s+/g, '')}`);
    }
  };

  // Dynamic statistics calculations
  const totalReviewsCount = reviews.length;
  const uniqueShopsCount = new Set(reviews.map(r => r.shopName)).size;
  const averageRatingVal = totalReviewsCount > 0 
    ? (reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / totalReviewsCount).toFixed(1)
    : '5.0';

  const stats = [
    { label: 'Reviews Staged', value: `${totalReviewsCount}`, change: 'Loaded from server DB', color: 'text-indigo-650 dark:text-indigo-400' },
    { label: 'Active Shop Profiles', value: `${uniqueShopsCount}`, change: 'Distinct shops assisted', color: 'text-purple-650 dark:text-purple-400' },
    { label: 'Average Review Rating', value: `${averageRatingVal}★`, change: 'Based on merchant feedback', color: 'text-emerald-600 dark:text-emerald-400' },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col justify-between transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-900 pb-4 mb-6">
          <h1 className="text-3xl font-extrabold sm:text-4xl text-slate-900 dark:text-white">
            Merchant Growth{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Dashboard
            </span>
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
            Live connection dashboard managing customer reviews and social captions for rural organic farms and homestays.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-xs">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">{stat.label}</span>
              <div className={`text-2xl font-black mt-1.5 ${stat.color}`}>{stat.value}</div>
              <div className="text-[10px] text-slate-550 dark:text-slate-400 mt-1 font-medium">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Server Connection error banner */}
        {error && (
          <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-250 dark:border-rose-900 text-rose-800 dark:text-rose-300 p-4 rounded-xl mb-6 text-sm flex items-center">
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Main Workspace grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* COLUMN 1: REVIEW WRITER (7 cols width) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900/35 border border-slate-200 dark:border-slate-800/60 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 flex items-center justify-center font-bold">
                  💬
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Review Reply Assistant</h3>
                  <p className="text-[11px] text-slate-500">Pick customer review to generate replies</p>
                </div>
              </div>
            </div>

            {/* Filter and Search Panel */}
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Search reviews by name, product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="!space-y-0"
                  inputClassName="py-2 text-xs"
                />
              </div>
              <button 
                type="submit"
                className="px-3 bg-indigo-650 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm transition-colors duration-200"
              >
                Search
              </button>
              <select
                value={sentimentFilter}
                onChange={(e) => setSentimentFilter(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
              >
                <option value="all">All Sentiment</option>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </select>
            </form>

            {/* Review List Box */}
            {loading ? (
              <div className="py-12 flex justify-center">
                <Loader size="md" />
              </div>
            ) : reviews.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 dark:text-slate-550 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                No reviews found. Try creating one in the form on the right!
              </div>
            ) : (
              <div className="space-y-3.5 max-h-[360px] overflow-y-auto pr-1">
                {reviews.map((rev) => {
                  const id = rev.id || rev._id;
                  const isSelected = selectedReviewId === id;
                  
                  // Sentiment badge design
                  const sentimentColors = {
                    positive: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50',
                    negative: 'bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900/50',
                    neutral: 'bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-400 border-slate-200 dark:border-slate-750'
                  };

                  return (
                    <div 
                      key={id} 
                      onClick={() => handleSelectReview(rev)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 flex justify-between items-start group
                        ${isSelected 
                          ? 'border-indigo-500 bg-indigo-50/10 dark:bg-indigo-950/5 shadow-inner' 
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/20 dark:bg-slate-900/10'}`}
                    >
                      <div className="flex-1 space-y-1.5 pr-4">
                        <div className="flex justify-between items-center text-[11px] mb-1">
                          <span className="font-bold text-slate-800 dark:text-slate-200">{rev.author}</span>
                          <span className="text-slate-500 dark:text-slate-450 font-semibold">{rev.shopName}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-350 line-clamp-2 italic leading-relaxed">
                          "{rev.reviewText}"
                        </p>
                        
                        {/* Rating stars & sentiment indicators */}
                        <div className="flex items-center space-x-2 pt-1">
                          <span className="text-xs text-amber-500">
                            {Array.from({ length: Number(rev.rating || 5) }).map((_, i) => '★').join('')}
                          </span>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full border uppercase tracking-wider font-bold ${sentimentColors[rev.sentiment] || sentimentColors.neutral}`}>
                            {rev.sentiment || 'neutral'}
                          </span>
                        </div>
                      </div>

                      {/* Trash Delete button */}
                      <button
                        onClick={(e) => handleDeleteReview(id, e)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-150 dark:hover:bg-slate-850 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                        aria-label="Delete review"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Generated Reply Suggestion Panel */}
            {selectedReviewId && generatedReply && (
              <div className="pt-3 border-t border-slate-150 dark:border-slate-850 p-4 bg-indigo-50/20 dark:bg-indigo-950/5 rounded-2xl space-y-2 animate-fade-in">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-indigo-650 dark:text-indigo-400 uppercase tracking-widest block">
                    AI Suggested Response Draft ({reviewSentiment}):
                  </span>
                </div>
                <textarea 
                  className="w-full bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-850 rounded-lg p-2.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
                  rows={4}
                  value={generatedReply}
                  onChange={(e) => setGeneratedReply(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs py-1 px-3 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedReply);
                      alert('Copied review response template!');
                    }}
                  >
                    Copy to Clipboard
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* COLUMN 2: SUBMIT FORM & CAPTIONER (5 cols width) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* TOOL 1: ADD REVIEW FORM (NEW CRUD CREATE ACTION) */}
            <div className="bg-white dark:bg-slate-900/35 border border-slate-200 dark:border-slate-800/60 rounded-3xl p-5 shadow-xs">
              <div className="flex items-center space-x-2.5 mb-4">
                <div className="w-8.5 h-8.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-650 dark:text-teal-400 flex items-center justify-center text-sm font-bold shadow-inner">
                  ✏️
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Log New Customer Review</h3>
                  <p className="text-[10px] text-slate-500">Insert actual buyer feedbacks to server database</p>
                </div>
              </div>

              <form onSubmit={handleAddReview} className="space-y-3">
                <Input
                  label="Customer Name & Location"
                  placeholder="e.g. Shyam Lal (Mussoorie)"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="!space-y-1"
                  inputClassName="py-2 text-xs"
                />

                <Input
                  label="Local Shop Name"
                  placeholder="e.g. Garhwal Fruit Preserve"
                  value={newShopName}
                  onChange={(e) => setNewShopName(e.target.value)}
                  className="!space-y-1"
                  inputClassName="py-2 text-xs"
                />

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
                    Rating Score
                  </label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                    <option value={3}>★★★☆☆ (3 Stars)</option>
                    <option value={2}>★★☆☆☆ (2 Stars)</option>
                    <option value={1}>★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
                    Review Message Text
                  </label>
                  <textarea
                    placeholder="Enter review feedback text..."
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500"
                    rows={3}
                  />
                </div>

                <Button 
                  variant="primary" 
                  className="w-full text-xs py-2 cursor-pointer mt-1" 
                  type="submit"
                  isLoading={isSubmitLoading}
                >
                  Save Review to Database
                </Button>
              </form>
            </div>

            {/* TOOL 2: SOCIAL PROMO DRAFTER */}
            <div className="bg-white dark:bg-slate-900/35 border border-slate-200 dark:border-slate-800/60 rounded-3xl p-5 shadow-xs">
              <form onSubmit={handleGeneratePromo} className="space-y-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8.5 h-8.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-650 dark:text-purple-400 flex items-center justify-center font-bold shadow-inner">
                    📣
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Local Promo Poster Captioner</h3>
                    <p className="text-[10px] text-slate-500">Generate Instagram posts for local products</p>
                  </div>
                </div>

                {/* Shop selection */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">Merchant Business Type</label>
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
                        className={`px-3 py-1.5 text-[11px] font-semibold rounded-xl border transition-all duration-200 cursor-pointer
                          ${shopType === item.type
                            ? 'bg-purple-600 text-white border-purple-650 shadow-xs'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product input */}
                <Input
                  label="Product Name / Feature"
                  placeholder="e.g. Organic Apricots, Woolen Cap, Pine Cottage"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="!space-y-1"
                  inputClassName="py-2 text-xs"
                />

                <Button variant="primary" className="w-full text-xs py-2 cursor-pointer" type="submit">
                  Write Instagram Draft
                </Button>
              </form>

              {/* Promo output */}
              {promoOutput && (
                <div className="mt-4 p-4 bg-purple-50/20 dark:bg-purple-950/5 border border-purple-100 dark:border-purple-900/50 rounded-xl space-y-2 animate-fade-in">
                  <span className="text-[10px] font-bold text-purple-655 dark:text-purple-400 uppercase tracking-widest block">Instagram Caption Draft:</span>
                  <textarea 
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-xs text-slate-750 dark:text-slate-300 focus:outline-none"
                    rows={5}
                    value={promoOutput}
                    onChange={(e) => setPromoOutput(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs py-1 px-3 cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(promoOutput);
                        alert('Copied Instagram caption draft!');
                      }}
                    >
                      Copy Caption
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
