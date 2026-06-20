import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button, Input } from '../components/ui';

export default function Dashboard() {
  // Review Assistant States
  const [selectedReviewIdx, setSelectedReviewIdx] = useState(null);
  const [generatedReply, setGeneratedReply] = useState('');
  
  // Promo Post States
  const [shopType, setShopType] = useState('Farm');
  const [productName, setProductName] = useState('');
  const [promoOutput, setPromoOutput] = useState('');

  const mockReviews = [
    {
      author: 'Vikram Mehta (Chandigarh)',
      shopName: 'Shyam\'s Organic Honey',
      rating: '★★★★★',
      reviewText: 'The wild forest honey is pure and tastes natural. Will order again next season.',
      replySuggestion: 'Dear Vikram, thank you for the feedback! We harvest our honey directly from the Rajaji forest region. Happy that you liked it. Keep supporting our local apiary! 🙏'
    },
    {
      author: 'Priya Sharma (Delhi)',
      shopName: 'Garhwal Handlooms',
      rating: '★★★☆☆',
      reviewText: 'The woollen shawl is warm and colors are bright. But the courier delivery to Delhi took almost 9 days.',
      replySuggestion: 'Hello Priya, thank you for ordering our hand-woven shawl. We are sorry for the delay in shipping. Since our weaving center is in a remote village, transport takes a bit extra time. We are working on a faster courier service for next orders! 🙏'
    },
    {
      author: 'Karan Johar (Mumbai)',
      shopName: 'Raj Mountain Homestay',
      rating: '★★★★★',
      reviewText: 'Amazing views of the Himalayas and homely food cooked by Raj\'s family. Very clean room.',
      replySuggestion: 'Hi Karan, thank you for staying with us at Raj Homestay! It was our pleasure hosting you in Mussoorie. Hope to see you and your friends again in the winters! 🙏'
    }
  ];

  const handleSuggestReply = (idx) => {
    setSelectedReviewIdx(idx);
    setGeneratedReply(mockReviews[idx].replySuggestion);
  };

  const handleGeneratePromo = (e) => {
    e.preventDefault();
    if (!productName.trim()) {
      setPromoOutput('Please type a product name first! (e.g. Organic Walnuts)');
      return;
    }

    // Handcrafted mock generators
    if (shopType === 'Farm') {
      setPromoOutput(`🌾 Fresh harvest alert from Uttarakhand hills! Our special, organic [${productName}] is ready. Grown traditionally with crystal clear mountain water. Support local farmers! \n\n📍 Delivery across Dehradun. Send us a WhatsApp message to order. \n\n#OrganicFarming #GrowLocal #UttarakhandFarms #DehradunBasmati #${productName.replace(/\s+/g, '')}`);
    } else if (shopType === 'Handloom') {
      setPromoOutput(`🧣 Handcrafted with love by our local weavers! Presenting the all-new [${productName}]. Every thread is woven by hand using traditional designs passed down through generations. \n\n📦 Shipments across India. Help keep our craft heritage alive! \n\n#VocalForLocal #MakeInIndia #HandloomWeavers #TraditionalCrafts #${productName.replace(/\s+/g, '')}`);
    } else {
      setPromoOutput(`🏔️ Escape the summer heat! Book your mountain view room at our homestay. Enjoy home-cooked meals and local experiences. Fresh [${productName}] tea served in the balcony. \n\n📞 Click the contact link to book your stay. \n\n#Himalayas #MountainHomestay #UttarakhandTourism #TravelIndia #${productName.replace(/\s+/g, '')}`);
    }
  };

  const stats = [
    { label: 'Reviews Staged', value: '27', change: 'From Google Maps API', color: 'text-indigo-600 dark:text-indigo-400' },
    { label: 'Captions Created', value: '14 drafts', change: 'Stored locally', color: 'text-purple-650 dark:text-purple-400' },
    { label: 'Shops Assisted', value: '3 active', change: 'GEU TBI Pilot Test', color: 'text-emerald-600 dark:text-emerald-400' },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col justify-between transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-900 pb-6 mb-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl text-slate-900 dark:text-white">
            Merchant Growth{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Dashboard
            </span>
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Write review replies and social captions for local Uttarakhand shopkeepers and homestays.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{stat.label}</span>
              <div className={`text-2xl font-black mt-2.5 ${stat.color}`}>{stat.value}</div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5 font-medium">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Main Workspace split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* TOOL 1: REVIEW REPLY WRITER */}
          <div className="bg-white dark:bg-slate-900/35 border border-slate-200 dark:border-slate-800/60 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-605 dark:text-indigo-400 flex items-center justify-center font-bold">
                  💬
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Review Reply Assistant</h3>
                  <p className="text-xs text-slate-500">Pick a feedback to auto-draft a reply</p>
                </div>
              </div>

              {/* Review Picker List */}
              <div className="space-y-3.5 my-4">
                {mockReviews.map((rev, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => handleSuggestReply(idx)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 hover:border-slate-350 dark:hover:border-slate-700
                      ${selectedReviewIdx === idx 
                        ? 'border-indigo-550 bg-indigo-50/20 dark:bg-indigo-950/10' 
                        : 'border-slate-150 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20'}`}
                  >
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-bold text-slate-800 dark:text-slate-200">{rev.author}</span>
                      <span className="text-slate-400 dark:text-slate-550 font-semibold">{rev.shopName}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 italic">"{rev.reviewText}"</p>
                  </div>
                ))}
              </div>

              {/* Output replies suggestion box */}
              {generatedReply && (
                <div className="mt-4 p-4 bg-indigo-50/20 dark:bg-indigo-950/5 border border-indigo-100 dark:border-indigo-900/50 rounded-xl space-y-2">
                  <span className="text-xs font-bold text-indigo-650 dark:text-indigo-400 uppercase tracking-wider block">Generated Reply Template:</span>
                  <textarea 
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
                    rows={4}
                    value={generatedReply}
                    onChange={(e) => setGeneratedReply(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedReply);
                        alert('Copied review response draft!');
                      }}
                    >
                      Copy Response
                    </Button>
                  </div>
                </div>
              )}
            </div>
            {!generatedReply && (
              <p className="text-center text-xs text-slate-400 mt-6 italic">Click any customer review above to suggest a reply template.</p>
            )}
          </div>

          {/* TOOL 2: SOCIAL PROMO DRAFTER */}
          <div className="bg-white dark:bg-slate-900/35 border border-slate-200 dark:border-slate-800/60 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
            <form onSubmit={handleGeneratePromo} className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-605 dark:text-purple-400 flex items-center justify-center font-bold">
                  📣
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Local Promo Poster Captioner</h3>
                  <p className="text-xs text-slate-500">Generate Instagram posts for local products</p>
                </div>
              </div>

              {/* Shop selection */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Merchant Business Type</label>
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
                      className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 cursor-pointer
                        ${shopType === item.type
                          ? 'bg-purple-600 text-white border-purple-650'
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
                placeholder="e.g. Organic Rajma, Wool Shawl, Balcony Room"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />

              <Button variant="primary" className="w-full" type="submit">
                Write Instagram Draft
              </Button>
            </form>

            {/* Promo output */}
            {promoOutput && (
              <div className="mt-4 p-4 bg-purple-50/20 dark:bg-purple-950/5 border border-purple-100 dark:border-purple-900/50 rounded-xl space-y-2">
                <span className="text-xs font-bold text-purple-650 dark:text-purple-400 uppercase tracking-wider block">Instagram Caption Draft:</span>
                <textarea 
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs text-slate-750 dark:text-slate-300 focus:outline-none"
                  rows={6}
                  value={promoOutput}
                  onChange={(e) => setPromoOutput(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
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
      </main>

      <Footer />
    </div>
  );
}
