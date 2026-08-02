import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../backend/data/database.json');

const reviewsData = [
  // POSITIVE REVIEWS (5 & 4 Stars)
  { author: "Vikram Mehta (Chandigarh)", shopName: "Shyam's Organic Honey", rating: 5, reviewText: "The wild forest honey is pure, thick, and tastes completely natural. You can smell the wildflower blossoms!", sentiment: "positive" },
  { author: "Priya Sharma (Delhi)", shopName: "Garhwal Handlooms", rating: 4, reviewText: "The woollen pashmina shawl is soft, warm, and colors are bright. Delivery took 5 days, but quality is outstanding.", sentiment: "positive" },
  { author: "Karan Johar (Mumbai)", shopName: "Raj Mountain Homestay", rating: 5, reviewText: "Amazing views of the Himalayas from Mussoorie hills! Homely food cooked with fresh farm vegetables by Raj's family.", sentiment: "positive" },
  { author: "Ananya Roy (Kolkata)", shopName: "Harsil Valley Orchards", rating: 5, reviewText: "Ordered 10kg box of fresh Royal Delicious apples directly from Harsil valley. Crispy, sweet, and zero wax coating!", sentiment: "positive" },
  { author: "Rajesh Gupta (Noida)", shopName: "Dehradun Basmati Rice Co-op", rating: 5, reviewText: "Authentic long-grain aromatic Dehradun Basmati rice. The aroma while cooking fills the entire house.", sentiment: "positive" },
  { author: "Meenakshi Sundaram (Bengaluru)", shopName: "Almora Brassware & Crafts", rating: 5, reviewText: "Handcrafted copper water vessel from Almora market. Authentic traditional copper work with beautiful hammer engraving.", sentiment: "positive" },
  { author: "Sanjay Verma (Gurugram)", shopName: "Tehri Terrace Organic Rajma", rating: 4, reviewText: "Munsiyari red rajma cooks very fast and has a rich, buttery texture. Excellent taste when served with rice.", sentiment: "positive" },
  { author: "Neha Kapoor (Jaipur)", shopName: "Uttarkashi Sea Buckthorn Jams", rating: 5, reviewText: "Sea buckthorn (Himalayan wonder berry) jam has a wonderful tangy citrus flavor loaded with Vitamin C. Kids loved it!", sentiment: "positive" },
  { author: "Rohan Deshmukh (Pune)", shopName: "Rishikesh Ayurvedic Tea Hub", rating: 5, reviewText: "Himalayan Tulsi and Chamomile herbal infusion tea bags. Relaxing aroma and perfect for evening calm after work.", sentiment: "positive" },
  { author: "Sunita Bisht (Dehradun)", shopName: "Garhwal Millet Bakery", rating: 5, reviewText: "Mandua (Finger millet) cookies and Jhangora kheer mix. Gluten-free, delicious, and healthy snack for elders.", sentiment: "positive" },
  { author: "Amitabh Sen (Kolkata)", shopName: "Ranikhet Pine Crafts & Oils", rating: 4, reviewText: "Pure Himalayan Pine Needle essential oil. Smells like a fresh forest walk in Kumaon. Packaging was secure.", sentiment: "positive" },
  { author: "Harpreet Singh (Ludhiana)", shopName: "Chamoli Organic Garlic & Spices", rating: 5, reviewText: "High-altitude single-clove Himalayan garlic (Ek Pothi Lahsun). Very potent medicinal qualities and strong flavor.", sentiment: "positive" },
  { author: "Deepak Bhatt (Nainital)", shopName: "Kumaoni Bal Mithai Sweets", rating: 5, reviewText: "Authentic Almora Bal Mithai with roasted khoya and sugar balls. Brought back childhood memories of Kumaon trip!", sentiment: "positive" },
  { author: "Shalini Nair (Thiruvananthapuram)", shopName: "Badrinath Organic Herbs", rating: 5, reviewText: "Purchased wild Jambu and Gandharayani spices for curry seasoning. Gives a unique mountain flavor to dal.", sentiment: "positive" },
  { author: "Aakash Tripathi (Lucknow)", shopName: "Mussoorie Weaver's Collective", rating: 4, reviewText: "Handwoven tweed jacket fabric. Durable texture and authentic woollen warmth. Great craftsmanship.", sentiment: "positive" },
  { author: "Pooja Hegde (Hyderabad)", shopName: "Bhimtal Lake Wooden Handicrafts", rating: 5, reviewText: "Beautiful carved pine wood tea coasters and wall clocks. Smooth finish and eco-friendly mountain packaging.", sentiment: "positive" },
  { author: "Vivek Agarwal (Ahmedabad)", shopName: "Joshimath High-Altitude Pulses", rating: 5, reviewText: "Organic Gahat (Horsegram) dal from Joshimath valley. Extremely fresh and authentic taste.", sentiment: "positive" },
  { author: "Ritu Malhotra (Delhi)", shopName: "Pithoragarh Woollen Socks", rating: 4, reviewText: "Super warm hand-knitted sheep wool socks. Kept my feet cozy during our snowfall trek in Munsiari.", sentiment: "positive" },
  { author: "Gautam Gambhir (Delhi)", shopName: "Kumaon Organic Apple Cider Vinegar", rating: 5, reviewText: "Raw unfiltered apple cider vinegar with mother. Genuine farm-pressed vinegar without added sugar.", sentiment: "positive" },
  { author: "Smriti Mandhana (Mumbai)", shopName: "Chamba Herbal Soaps", rating: 5, reviewText: "Handmade goat milk and apricot kernel scrub soap. Natural fragrance and leaves skin feeling moisturized.", sentiment: "positive" },
  { author: "Abhinav Bindra (Dehradun)", shopName: "Dhanaulti Mountain Farmstay", rating: 5, reviewText: "Peaceful stay amidst apple trees. Fresh cow milk, organic breakfast, and breathtaking sunrise views.", sentiment: "positive" },
  { author: "Divya Agarwal (Indore)", shopName: "Pauri Garhwal Red Rice", rating: 4, reviewText: "Nutritious mountain red rice (Lal Chawal). Rich nutty flavor and great for healthy daily meals.", sentiment: "positive" },
  { author: "Manish Pandey (Nainital)", shopName: "Mukteshwar Plum Jam", rating: 5, reviewText: "Sweet and tangy plum preserves made from fresh orchard fruit. No artificial colors added.", sentiment: "positive" },

  // NEUTRAL REVIEWS (3 Stars)
  { author: "Rahul Bajaj (Surat)", shopName: "Shyam's Organic Honey", rating: 3, reviewText: "The honey taste is good, but the glass bottle seal leaked slightly inside the parcel during courier transit.", sentiment: "neutral" },
  { author: "Tarun Gill (Faridabad)", shopName: "Garhwal Handlooms", rating: 3, reviewText: "Shawl texture is warm, but the color shade was slightly darker than shown in the product catalog photo.", sentiment: "neutral" },
  { author: "Kavita Rao (Chennai)", shopName: "Harsil Valley Orchards", rating: 3, reviewText: "Apples arrived fresh, but out of 20 apples, 2 had minor pressure bruises from transport handling.", sentiment: "neutral" },
  { author: "Alok Nanda (Kanpur)", shopName: "Dehradun Basmati Rice Co-op", rating: 3, reviewText: "Rice grain length is long and aroma is nice, but price per kg is higher compared to local market brands.", sentiment: "neutral" },
  { author: "Siddharth Joshi (Vadodara)", shopName: "Almora Brassware & Crafts", rating: 3, reviewText: "Copper pot is solid, but took over 8 days to reach Gujarat. Tracking details were updated late.", sentiment: "neutral" },
  { author: "Meera Nair (Kochi)", shopName: "Rishikesh Ayurvedic Tea Hub", rating: 3, reviewText: "Herbal tea tastes decent, but the paper box packaging got slightly crushed in courier shipping.", sentiment: "neutral" },
  { author: "Anish Giri (Varanasi)", shopName: "Tehri Terrace Organic Rajma", rating: 3, reviewText: "Rajma quality is genuine, but cooking required 4 extra whistles in pressure cooker.", sentiment: "neutral" },
  { author: "Bhaskar Sharma (Agra)", shopName: "Garhwal Millet Bakery", rating: 3, reviewText: "Cookies are healthy and crisp, but finger millet taste is an acquired preference for children.", sentiment: "neutral" },
  { author: "Varun Dhawan (Mumbai)", shopName: "Ranikhet Pine Crafts & Oils", rating: 3, reviewText: "Pine oil bottle size is smaller than expected for the price, though scent is pleasant.", sentiment: "neutral" },
  { author: "Preeti Patel (Surat)", shopName: "Uttarkashi Sea Buckthorn Jams", rating: 3, reviewText: "Jam is very sour in taste due to high Vitamin C. Needs extra sweetener if you prefer sweet jams.", sentiment: "neutral" },

  // NEGATIVE REVIEWS (1 & 2 Stars)
  { author: "Mohit Chauhan (Shimla)", shopName: "Raj Mountain Homestay", rating: 2, reviewText: "Room view was nice, but hot water geyser was not working properly during cold morning hours.", sentiment: "negative" },
  { author: "Gaurav Taneja (Delhi)", shopName: "Shyam's Organic Honey", rating: 1, reviewText: "Courier took 10 days to deliver to Delhi! Honey bottle arrived with a cracked cap. Unhappy with shipping.", sentiment: "negative" },
  { author: "Kriti Sanon (Mumbai)", shopName: "Garhwal Handlooms", rating: 2, reviewText: "Thread border had a small pull defect near the tassel. Customer care took 2 days to respond to my email.", sentiment: "negative" },
  { author: "Nikhil Kamath (Bengaluru)", shopName: "Harsil Valley Orchards", rating: 1, reviewText: "Delay of over a week in dispatching apple box after placing order. Needs faster logistics.", sentiment: "negative" },
  { author: "Suraj Saxena (Bhopal)", shopName: "Almora Brassware & Crafts", rating: 2, reviewText: "Polishing on the bottom outer rim was uneven. Expected better quality control for handcrafted brass.", sentiment: "negative" },
  { author: "Isha Ambani (Mumbai)", shopName: "Mussoorie Weaver's Collective", rating: 1, reviewText: "Received wrong color pattern in fabric delivery. Had to request return exchange.", sentiment: "negative" },
  { author: "Devendra Jhajharia (Jaipur)", shopName: "Chamoli Organic Garlic & Spices", rating: 2, reviewText: "Garlic pods were smaller in size than displayed in the advertisement photos.", sentiment: "negative" },
  { author: "Pallavi Joshi (Nagpur)", shopName: "Mukteshwar Plum Jam", rating: 1, reviewText: "Glass jar arrived shattered inside courier box due to insufficient bubble wrap packaging.", sentiment: "negative" }
];

const generateReply = (author, shopName, rating, sentiment) => {
  const name = author.split(' ')[0];
  if (sentiment === 'positive') {
    return `Dear ${name}, thank you so much for the 5-star review! The team at ${shopName} is delighted you enjoyed our handcrafted Himalayan products. We hope to serve you again soon! 🙏`;
  } else if (sentiment === 'neutral') {
    return `Hello ${name}, thank you for your honest feedback regarding ${shopName}. We appreciate your support and are taking steps to improve our packaging and delivery speed. 🙏`;
  } else {
    return `Dear ${name}, we sincerely apologize for the inconvenience with your ${shopName} order. Please contact our support team directly so we can send a replacement immediately. 🙏`;
  }
};

const formattedReviews = reviewsData.map((r, idx) => ({
  id: `rev-${100 + idx}`,
  _id: `rev-${100 + idx}`,
  author: r.author,
  shopName: r.shopName,
  rating: r.rating,
  reviewText: r.reviewText,
  replySuggestion: generateReply(r.author, r.shopName, r.rating, r.sentiment),
  sentiment: r.sentiment,
  createdAt: new Date(Date.now() - idx * 86400000 * 2).toISOString()
}));

const dbContent = {
  reviews: formattedReviews,
  shops: [],
  captions: [
    {
      id: "cap-1",
      _id: "cap-1",
      productName: "Royal Delicious Apples",
      shopType: "Fruit Orchard",
      captionText: "🍎 Freshly harvested from the snow-fed heights of Harsil Valley, Uttarkashi! Experience 100% natural, crisp, zero-wax Royal Delicious apples directly from Himalayan terrace orchards. \n\n📦 Pan-India delivery available! Order your fresh orchard box today. \n\n#HarsilApples #UttarakhandOrganic #HimalayanProduce #VocalForLocal #DirectFromFarmers",
      createdAt: new Date().toISOString()
    },
    {
      id: "cap-2",
      _id: "cap-2",
      productName: "Handspun Pashmina Shawl",
      shopType: "Handloom Weaving",
      captionText: "🧣 Wrap yourself in Himalayan warmth! Hand-spun and hand-woven by master weavers in Garhwal hills using age-old looms. Featherlight, cozy, and timeless. \n\n✨ Support mountain cottage industries! \n\n#GarhwalHandloom #PashminaShawl #MakeInIndia #HandwovenLuxury #UttarakhandCrafts",
      createdAt: new Date().toISOString()
    }
  ],
  users: [
    {
      id: "usr-admin",
      _id: "usr-admin",
      name: "Saurabh Parihar (Admin)",
      email: "admin@ruralgrow.in",
      password: "$2b$10$C6IJC7yH2eAVdV8rFX/kJeY6o7QQXfpJ3KFiRVWeioGSsEm.k5k92",
      role: "admin",
      shopName: "Garhwal Farms (Admin)",
      createdAt: "2026-07-10T09:00:00.000Z"
    },
    {
      id: "usr-owner",
      _id: "usr-owner",
      name: "Saurabh Parihar",
      email: "saurabh@gmail.com",
      password: "$2b$10$C6IJC7yH2eAVdV8rFX/kJeY6o7QQXfpJ3KFiRVWeioGSsEm.k5k92",
      role: "business_owner",
      shopName: "Garhwal Organic Farms",
      createdAt: "2026-07-02T04:28:18.935Z"
    }
  ]
};

await fs.writeFile(dbPath, JSON.stringify(dbContent, null, 2), 'utf8');
console.log(`Successfully written ${formattedReviews.length} authentic Google reviews to database.json!`);
