import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Review from './models/Review.js';
import Caption from './models/Caption.js';

// Load environment variables
dotenv.config();

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('\n[Seed Error] MONGODB_URI environment variable is missing in backend/.env!');
  console.log('Please add MONGODB_URI=mongodb+srv://... to connect to your MongoDB Atlas cluster.');
  process.exit(1);
}

const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoURI);
    console.log('[Seed] Connection successful.');

    // 1. Clear existing database collections
    console.log('[Seed] Wiping existing collections (Users, Reviews, Captions)...');
    await User.deleteMany({});
    await Review.deleteMany({});
    await Caption.deleteMany({});

    // 2. Create Seed Users
    console.log('[Seed] Creating user accounts...');
    const adminUser = await User.create({
      name: 'Saurabh Parihar (Admin)',
      email: 'admin@ruralgrow.in',
      password: 'admin123',
      role: 'admin',
      shopName: 'Garhwal Farms (Admin)'
    });

    const merchantUser = await User.create({
      name: 'Saurabh parihar',
      email: 'saurabh@gmail.com',
      password: 'admin123',
      role: 'business_owner',
      shopName: 'Garhwal Organic Farms'
    });

    const farmerUser = await User.create({
      name: 'Amit Negi',
      email: 'amitnegi@gmail.com',
      password: 'admin123',
      role: 'farmer',
      shopName: 'Negi Apple Orchard'
    });

    console.log('[Seed] User accounts created successfully.');

    // 4. Create Seed Reviews
    console.log('[Seed] Creating review logs...');
    const seedReviews = [
      {
        author: 'Vikram Mehta (Chandigarh)',
        shopName: "Shyam's Organic Honey",
        rating: 5,
        reviewText: 'The wild forest honey is pure and tastes natural. Will order again next season.',
        replySuggestion: "Dear Vikram, thank you for the feedback! We harvest our honey directly from the Rajaji forest region. Happy that you liked it. Keep supporting our local apiary! 🙏",
        sentiment: 'positive',
        createdAt: new Date('2026-06-20T10:00:00.000Z')
      },
      {
        author: 'Priya Sharma (Delhi)',
        shopName: 'Garhwal Handlooms',
        rating: 3,
        reviewText: 'The woollen shawl is warm and colors are bright. But the courier delivery to Delhi took almost 9 days.',
        replySuggestion: "Hello Priya, thank you for ordering our hand-woven shawl. We are sorry for the delay in shipping. Since our weaving center is in a remote village, transport takes a bit extra time. We are working on a faster courier service for next orders! 🙏",
        sentiment: 'neutral',
        createdAt: new Date('2026-06-21T11:30:00.000Z')
      },
      {
        author: 'Karan Johar (Mumbai)',
        shopName: 'Raj Mountain Homestay',
        rating: 5,
        reviewText: 'Amazing views of the Himalayas and homely food cooked by Raj\'s family. Very clean room.',
        replySuggestion: "Hi Karan, thank you for staying with us at Raj Homestay! It was our pleasure hosting you in Mussoorie. Hope to see you and your friends again in the winters! 🙏",
        sentiment: 'positive',
        createdAt: new Date('2026-06-22T08:15:00.000Z')
      },
      {
        author: 'Anjali Bisht (Dehradun)',
        shopName: 'Mukteshwar Organic Jams',
        rating: 5,
        reviewText: 'The plum and apricot jams taste fresh and naturally sweet. No artificial flavors or gelatin. Pure Himalayan fruit extract!',
        replySuggestion: "Hello Anjali, thank you for the wonderful review! We are committed to using 100% natural, farm-picked plums and apricots without any chemicals. We are glad you enjoyed the real taste of Mukteshwar! 🌸",
        sentiment: 'positive',
        createdAt: new Date('2026-06-23T09:00:00.000Z')
      },
      {
        author: 'David Miller (London)',
        shopName: 'Himalayan Retreat Homestay',
        rating: 5,
        reviewText: 'Outstanding experience of local Garhwali hospitality. The organic millet rotis and potato curry served for dinner were delicious. View of Trishul peak was mindblowing.',
        replySuggestion: "Dear David, thank you for staying with us. It was a pleasure sharing our traditional Garhwali meals and peak views with you. Safe travels back to London, hope to host you again! 🏔️",
        sentiment: 'positive',
        createdAt: new Date('2026-06-24T14:20:00.000Z')
      },
      {
        author: 'Rahul Goel (Noida)',
        shopName: 'Kumaon Tea Traders',
        rating: 4,
        reviewText: 'The orthodox black tea has a unique piney aroma and strong flavor. Docked one star because packaging was slightly torn during shipping.',
        replySuggestion: "Hi Rahul, thank you for trying our black tea. We apologize for the damaged box; we are coordinating with our logistics team to ensure stronger outer packaging for future orders. ☕",
        sentiment: 'positive',
        createdAt: new Date('2026-06-25T11:10:00.000Z')
      },
      {
        author: 'Meera Nair (Bangalore)',
        shopName: 'Doonga Valley Milk Producers',
        rating: 5,
        reviewText: 'Pure A2 ghee! The aroma when heated is exactly like homemade butter. Highly authentic and healthy product.',
        replySuggestion: "Dear Meera, thank you! Our A2 ghee is prepared using the traditional Bilona method to lock in the aroma and medicinal properties. We appreciate your support for our local farmers! 🥛",
        sentiment: 'positive',
        createdAt: new Date('2026-06-26T07:45:00.000Z')
      },
      {
        author: 'Suresh Rawat (Haridwar)',
        shopName: 'Uttarakhand Herbal Farm',
        rating: 2,
        reviewText: 'Ordered organic turmeric powder, but it had a distinct musty smell. Color is dull and did not taste like pure hill turmeric.',
        replySuggestion: "Hello Suresh, we are sorry for this experience. We take quality seriously; the batch might have absorbed moisture during transit. Please contact our support for a free replacement package. 🌿",
        sentiment: 'negative',
        createdAt: new Date('2026-06-27T10:30:00.000Z')
      },
      {
        author: 'Neha Sen (Kolkata)',
        shopName: 'Chamba Wool Artisan Guild',
        rating: 5,
        reviewText: 'Exquisite wood carvings and woolen cardigans! The designs are traditional Pahadi patterns. Extremely satisfied with my purchase.',
        replySuggestion: "Hi Neha, thank you! Our woodcarvers and knitters put a lot of heart into preserving the Pahadi designs. Your support keeps their livelihood thriving. 🧣",
        sentiment: 'positive',
        createdAt: new Date('2026-06-28T16:05:00.000Z')
      },
      {
        author: 'James Wilson (New York)',
        shopName: 'Almora Copper Crafts',
        rating: 4,
        reviewText: 'Hand-beaten copper bottle has a gorgeous finish. Keeps water cool and has real health benefits. Shipping took two weeks but worth the wait.',
        replySuggestion: "Dear James, we are delighted you loved the craftsmanship. Hand-hammering copper is an ancient Almora art. International shipping does take time, but we are glad it reached you safely! 🏺",
        sentiment: 'positive',
        createdAt: new Date('2026-06-29T12:00:00.000Z')
      },
      {
        author: 'Pooja Negi (Nainital)',
        shopName: 'Ramgarh Apple Orchard',
        rating: 1,
        reviewText: 'Very disappointed with the organic peaches. Half of the box was overripe and bruised during transport. No refund policy.',
        replySuggestion: "Dear Pooja, we deeply apologize for the damaged peaches. Fresh fruit transport is delicate. We will immediately issue you a full refund and review our packaging box design. 🍑",
        sentiment: 'negative',
        createdAt: new Date('2026-06-30T09:15:00.000Z')
      },
      {
        author: 'Rohan Das (Guwahati)',
        shopName: 'Kedar Valley Apiaries',
        rating: 3,
        reviewText: 'The mustard honey is thick and crystallized as expected. But the container lid was loose and leaked inside the box.',
        replySuggestion: "Hi Rohan, thank you for the feedback. We are sorry for the honey leakage. We are shifting to double-sealed jars to prevent transport leaks in future. 🍯",
        sentiment: 'neutral',
        createdAt: new Date('2026-07-01T15:00:00.000Z')
      },
      {
        author: 'Elena Petrova (Moscow)',
        shopName: 'Joshimath Woolen Shawls',
        rating: 5,
        reviewText: 'Beautiful handwoven merino wool scarf. Soft, warm, and the pattern is very unique. Delivery was surprisingly fast.',
        replySuggestion: "Dear Elena, thank you for writing to us from Moscow! We are happy that the warmth of Joshimath merino wool reached you quickly. Enjoy the winter! ❄️",
        sentiment: 'positive',
        createdAt: new Date('2026-07-02T10:10:00.000Z')
      },
      {
        author: 'Devendra Singh (Pithoragarh)',
        shopName: 'Panchachuli Handloom Cooperative',
        rating: 5,
        reviewText: 'High-grade organic linen shirts. Fabric feels light and breathable. Support local weavers!',
        replySuggestion: "Dear Devendra, thank you for encouraging our weavers. We take pride in sourcing organic linen and using natural plant-based dyes. 👕",
        sentiment: 'positive',
        createdAt: new Date('2026-07-03T08:30:00.000Z')
      },
      {
        author: 'Sara Ahmed (Hyderabad)',
        shopName: 'Rishikesh Herbs & Oils',
        rating: 2,
        reviewText: 'The lemongrass essential oil was weak and didn\'t last in the diffuser. Expected premium hill-grown quality.',
        replySuggestion: "Hi Sara, we regret that our oil did not meet your expectations. We will inspect our steam distillation batch to verify concentration levels. We appreciate your input! 🧪",
        sentiment: 'negative',
        createdAt: new Date('2026-07-04T13:45:00.000Z')
      },
      {
        author: 'Pooja Rawat (Rishikesh)',
        shopName: 'Rishikesh Herbs & Oils',
        rating: 5,
        reviewText: 'The organic rosemary oil is wonderful. It smells fresh and has helped my hair texture immensely. Best purchase ever.',
        replySuggestion: "Hello Pooja, we are so glad you loved our hand-extracted rosemary oil. We harvest our herbs locally in Rishikesh. Keep shining! 🌟",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T14:00:00.000Z')
      },
      {
        author: 'Arjun Negi (Srinagar Garhwal)',
        shopName: 'Srinagar Clay Pottery',
        rating: 5,
        reviewText: 'The hand-made clay cups are authentic and keep tea warm. Tastes like traditional village tea. Highly recommended.',
        replySuggestion: "Hi Arjun, thank you! Our local potters use organic clay from the Alaknanda riverbed to make these cups. Glad you loved the taste! 🏺",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T14:15:00.000Z')
      },
      {
        author: 'Linda Green (Berlin)',
        shopName: 'Ranikhet Nature Homestay',
        rating: 5,
        reviewText: 'Peaceful pine trees and fresh mountain air. The host family served delicious local organic food. A slice of heaven.',
        replySuggestion: "Dear Linda, thank you! We love sharing the tranquility of our pine forests and farm-to-table meals with guests. Safe travels back to Berlin! 🌲",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T14:30:00.000Z')
      },
      {
        author: 'Anil Bisht (Haldwani)',
        shopName: 'Bageshwar Copper Works',
        rating: 5,
        reviewText: 'The hand-beaten copper jug is heavy and solid. Tastes great and retains cooling benefits. High-quality craftsmanship.',
        replySuggestion: "Hello database validator! Thank you, our Bageshwar copper artisans have hammered this jug using age-old traditional tools. Appreciate your feedback! 🏺",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T14:45:00.000Z')
      },
      {
        author: 'Sneha Joshi (Nainital)',
        shopName: 'Nainital Candle Cottage',
        rating: 5,
        reviewText: 'The lavender wax candles smell heavenly. They burn slowly and make my living room feel like a mountain spa.',
        replySuggestion: "Hi Sneha, thank you! We hand-pour all our candles using organic soy wax and pure essential oils sourced from Almora farms. enjoy the scent! 🕯️",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T15:00:00.000Z')
      },
      {
        author: 'Rajesh Pandey (Almora)',
        shopName: 'Almora Bal Mithai',
        rating: 5,
        reviewText: 'Delicious chocolatey bal mithai, very fresh! The roasted sugar coating is crisp. Reminded me of my childhood days in the hills.',
        replySuggestion: "Dear Rajesh, thank you! We still follow our grandfather's original recipe, using fresh condensed milk (khoya) to preserve the real Almora taste! 🍬",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T15:15:00.000Z')
      },
      {
        author: 'Devyani Shah (Dehradun)',
        shopName: 'Dehradun Basmati Hub',
        rating: 5,
        reviewText: 'The basmati rice grains are long and extremely aromatic. Made biryani today and the whole house filled with fragrance.',
        replySuggestion: "Hello Devyani, glad to hear that! Our heritage basmati is grown using spring water in the Doon valley foothills. Thank you for supporting organic farming! 🌾",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T15:30:00.000Z')
      },
      {
        author: 'Vikram Rathore (Delhi)',
        shopName: 'Mussoorie Adventure Camp',
        rating: 3,
        reviewText: 'The mountain views and hiking trails were excellent. But the camp tents had slightly weak zippers and toilets could be cleaner.',
        replySuggestion: "Dear Vikram, thank you for the honest review. We will upgrade our tents immediately and schedule more frequent cleanings for the camp facilities. Homely regards! 🏕️",
        sentiment: 'neutral',
        createdAt: new Date('2026-07-04T15:45:00.000Z')
      },
      {
        author: 'Harish Chandra (Pithoragarh)',
        shopName: 'Munsiary Rajma Traders',
        rating: 5,
        reviewText: 'Local red kidney beans cooked perfectly. They are soft, rich in color, and have a unique sweet taste unlike city rajma.',
        replySuggestion: "Hi Harish, thank you! Munsiary Rajma is grown at high altitudes near the glaciers, giving it that special tender quality. Enjoy your meal! 🍲",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T16:00:00.000Z')
      },
      {
        author: 'Maria Dupont (Paris)',
        shopName: 'Rishikesh Yoga Retreat',
        rating: 5,
        reviewText: 'Serene atmosphere, Ganga bank view, and the yoga instructors were highly professional. Taught me true mindfulness.',
        replySuggestion: "Dear Maria, namaste! We are happy that our spiritual center provided you peace. Hope to welcome you back to Rishikesh next season. 🧘‍♀️",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T16:15:00.000Z')
      },
      {
        author: 'Sandeep Semwal (Uttarkashi)',
        shopName: 'Uttarkashi Apple Gardens',
        rating: 5,
        reviewText: 'Delicious organic apples, crisp and sweet. Delivered straight from the orchards in Harsil valley. Outstanding quality.',
        replySuggestion: "Hi Sandeep, thank you! The cold mountain winds of Harsil give these apples their distinct crunch. Glad you loved the harvest! 🍎",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T16:30:00.000Z')
      },
      {
        author: 'Sunita Thapa (Dehradun)',
        shopName: 'Himalayan Pickle House',
        rating: 5,
        reviewText: 'The hot garlic and red chili pickle is extremely spicy but delicious. Pairs perfectly with simple dal and rice.',
        replySuggestion: "Hello Sunita, thank you! We sun-dry our chilies in mustard oil according to Kumaoni traditions. Glad you liked the spice kick! 🌶️",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T16:45:00.000Z')
      },
      {
        author: 'Robert Taylor (London)',
        shopName: 'Corbett Tiger Lodge',
        rating: 5,
        reviewText: 'The safari was thrilling, saw three tigers! The lodge rooms were very cozy with fireplaces and local wooden furniture.',
        replySuggestion: "Dear Robert, thank you! We are glad you enjoyed the tiger sightings and our rustic, eco-friendly forest lodge rooms. Safe travels back to London! 🐅",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T17:00:00.000Z')
      },
      {
        author: 'Ajay Bhatt (Ranikhet)',
        shopName: 'Kumaoni Shawl Center',
        rating: 5,
        reviewText: 'The handwoven tweed jacket fits perfectly. Fabric is thick and warm, and buttons have a nice traditional metallic look.',
        replySuggestion: "Hi Ajay, thank you! Our Ranikhet tailors hand-stitch each jacket using 100% locally sourced sheep wool. Stay warm! 🧥",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T17:15:00.000Z')
      },
      {
        author: 'Meenakshi Bhandari (Chamoli)',
        shopName: 'Valley of Flowers Homestay',
        rating: 5,
        reviewText: 'Lovely hosts, clean blankets, and they served hot parathas and ginger tea in the cold morning. Felt like home.',
        replySuggestion: "Dear Meenakshi, thank you! We strive to treat every traveler like family. Glad you enjoyed the hot breakfast before your trek! 🥞",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T17:30:00.000Z')
      },
      {
        author: 'Gaurav Gairola (Tehri)',
        shopName: 'Tehri Lake Adventure',
        rating: 3,
        reviewText: 'The jet skiing and boating on Tehri lake was fun. But the ticket booking queues were messy and lacked shade in the afternoon.',
        replySuggestion: "Hi Gaurav, we appreciate the feedback. We are installing shelter canopies at the counter and upgrading our online booking portal to cut queue times. 🌊",
        sentiment: 'neutral',
        createdAt: new Date('2026-07-04T17:45:00.000Z')
      },
      {
        author: 'Neeraj Uniyal (Dehradun)',
        shopName: 'Garhwal Honey Apiary',
        rating: 5,
        reviewText: 'The eucalyptus honey has a nice rich color and deep medicinal taste. Excellent for soothing a sore throat.',
        replySuggestion: "Hello Neeraj, glad it helped! Our bees gather nectar from organic eucalyptus groves around Dehradun, giving it strong antibacterial properties. 🍯",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T18:00:00.000Z')
      },
      {
        author: 'Shalini Dobhal (Roorkee)',
        shopName: 'Himalayan Rose Water',
        rating: 5,
        reviewText: 'Very refreshing mist, spray bottle works great. Smells like fresh damask roses picked from the hills. Great toner.',
        replySuggestion: "Hi Shalini, thank you! Our rose water is steam-distilled using organic roses cultivated in the valleys of Chamoli. Enjoy the glow! 🌹",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T18:15:00.000Z')
      },
      {
        author: 'Deepak Khati (Almora)',
        shopName: 'Almora Woolen Cottage',
        rating: 5,
        reviewText: 'The merino wool socks are incredibly soft and keep toes warm in freezing night temperatures. Will order more for trekking.',
        replySuggestion: "Dear Deepak, thank you! We use double-threaded merino wool to ensure extra durability and heat retention. Happy trekking! 🧦",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T18:30:00.000Z')
      },
      {
        author: 'Kavita Arya (Haldwani)',
        shopName: 'Mukteshwar Peach Orchards',
        rating: 3,
        reviewText: 'The peaches were large and fresh, but a bit too raw and hard to eat immediately. Needed to sit in a basket for 3 days to ripen.',
        replySuggestion: "Hello Kavita, thank you. We pick peaches slightly raw so they do not turn mushy or rot during transit. Letting them sit for a couple of days gives the best sweetness! 🍑",
        sentiment: 'neutral',
        createdAt: new Date('2026-07-04T18:45:00.000Z')
      },
      {
        author: 'Ramesh Arya (Bageshwar)',
        shopName: 'Bageshwar Handlooms',
        rating: 5,
        reviewText: 'Traditional woolen carpet has thick weaving and beautiful geometric patterns. Adds a nice warm Pahadi look to my drawing room.',
        replySuggestion: "Hi Ramesh, thank you! Our weavers take up to a month to complete a single carpet. We are thrilled you loved the geometric designs! 🧶",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T19:00:00.000Z')
      },
      {
        author: 'Geeta Ramola (Mussoorie)',
        shopName: 'Landour Bakehouse Fan',
        rating: 5,
        reviewText: 'The ginger cookies and butter biscuits are crunchy and have the perfect spice level. Goes amazingly well with hot masala tea.',
        replySuggestion: "Dear Geeta, thank you! We stick to classic baking methods to capture that authentic mountain bakery feel. Hope to serve you again! 🍪",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T19:15:00.000Z')
      },
      {
        author: 'Nitin Kotnala (Kotdwar)',
        shopName: 'Kotdwar Timber Crafts',
        rating: 5,
        reviewText: 'The hand-carved wooden stool is sturdy, heavy, and has a lovely dark wood polish. Clearly made by expert artisans.',
        replySuggestion: "Hi Nitin, thank you! Our Kotdwar workshop uses seasoned local wood and organic varnishes to ensure lifetime durability. 🪑",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T19:30:00.000Z')
      },
      {
        author: 'Thomas Alva (Boston)',
        shopName: 'Himalayan Trekking Organizers',
        rating: 5,
        reviewText: 'The trekking guide was highly experienced and safe. Took us through beautiful hidden meadows and high-altitude lakes. Great experience.',
        replySuggestion: "Dear Thomas, thank you! Safety is our first priority. We are glad you enjoyed the alpine meadows and mountain lakes. 🏔️",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T19:45:00.000Z')
      },
      {
        author: 'Preeti Dabral (Rishikesh)',
        shopName: 'Rishikesh Ayurvedic Soap',
        rating: 5,
        reviewText: 'The organic neem and tulsi soap has cleared my skin blemishes. Very gentle on the skin, doesn\'t dry it out.',
        replySuggestion: "Hello Preeti, glad to hear that! We use cold-pressed coconut oil and pure neem extract to keep the soap natural and skin-friendly. 🧼",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T20:00:00.000Z')
      },
      {
        author: 'Kamal Rana (Ramnagar)',
        shopName: 'Ramnagar Organic Rice',
        rating: 5,
        reviewText: 'The unpolished brown rice takes a bit extra time to cook but has a delicious nutty flavor and keeps me active all day.',
        replySuggestion: "Hi Kamal, thank you! Because we do not run the rice through chemical polishing machines, it retains its natural nutrients and fibers. 🌾",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T20:15:00.000Z')
      },
      {
        author: 'Sonia Sen (Delhi)',
        shopName: 'Nainital Boat Club Cafe',
        rating: 1,
        reviewText: 'The coffee was completely cold and the waiter took 30 minutes to bring a single plate of fries. Terrible service.',
        replySuggestion: "Dear Sonia, we are extremely sorry for the poor service. We had a sudden rush of tourists and were short-staffed. We are retraining our service team to prevent this. ☕",
        sentiment: 'negative',
        createdAt: new Date('2026-07-04T20:30:00.000Z')
      },
      {
        author: 'Vipin Rawat (Pauri Garhwal)',
        shopName: 'Pauri Hill Lodge',
        rating: 3,
        reviewText: 'The scenic terrace view of the snow-clad peaks was outstanding. However, the room WiFi was weak and disconnected frequently.',
        replySuggestion: "Hello Vipin, thank you for staying with us. We are upgrading to a high-speed fiber connection next week to resolve the WiFi signals. Warm regards! 📶",
        sentiment: 'neutral',
        createdAt: new Date('2026-07-04T20:45:00.000Z')
      },
      {
        author: 'Divya Barthwal (Rishikesh)',
        shopName: 'Rishikesh Rafting Camp',
        rating: 5,
        reviewText: 'The rafting safety instructions were clear and the guides were highly professional. Navigating the rapids was exhilarating.',
        replySuggestion: "Hi Divya, thank you! Navigating the Ganga rapids is always exciting. We are glad you felt safe and had a great time! 🛶",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T21:00:00.000Z')
      },
      {
        author: 'Manish Pundir (Chamba)',
        shopName: 'Chamba Fruit Squash',
        rating: 5,
        reviewText: 'The rhododendron (Buransh) juice squash is very sweet and refreshing. Perfect coolant after returning from a hot walk.',
        replySuggestion: "Hello Manish, thank you! Buransh juice is a natural cooling drink made from wild spring-blossom rhododendron flowers. Glad you loved the squash! 🍹",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T21:15:00.000Z')
      },
      {
        author: 'Swati Mamgain (Dehradun)',
        shopName: 'Doon Valley Bakery',
        rating: 5,
        reviewText: 'The walnut chocolate fudge is rich, soft, and loaded with fresh local hill walnuts. Will definitely buy again.',
        replySuggestion: "Hi Swati, thank you! We source our walnuts fresh from Mussoorie farms to ensure crunchy, premium bites. Enjoy the fudge! 🍫",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T21:30:00.000Z')
      },
      {
        author: 'Vivek Nautiyal (Uttarkashi)',
        shopName: 'Gangotri Pilgrim Homestay',
        rating: 5,
        reviewText: 'Simple clean room, very close to the temple. The host was incredibly polite and woke up early to guide us about queue times.',
        replySuggestion: "Dear Vivek, we are happy to assist your pilgrimage. Serving pilgrims visiting Gangotri is a holy duty for us. Safe travels! 🕉️",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T21:45:00.000Z')
      },
      {
        author: 'Charlotte Dubois (Lyon)',
        shopName: 'Mussoorie Heritage Tour',
        rating: 5,
        reviewText: 'Learned a lot about colonial history and mountain flora. The local guide spoke fluent French and was highly engaging.',
        replySuggestion: "Chère Charlotte, merci! We love introducing the rich history of Landour and Mussoorie to global travelers. Bienvenue à nouveau! 🗺️",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T22:00:00.000Z')
      },
      {
        author: 'Jagdish Prasad (Haldwani)',
        shopName: 'Haldwani Seed Farm',
        rating: 5,
        reviewText: 'The organic mustard seeds sprouted within 4 days. High germination rate and clean packaging. Satisfied farmer.',
        replySuggestion: "Hello Jagdish, thank you! We clean and sort our seeds meticulously to ensure the highest yield rate for our fellow farmers. Happy harvest! 🌾",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T22:15:00.000Z')
      },
      {
        author: 'Priya Bahuguna (Dehradun)',
        shopName: 'Doonga Organic Wheat',
        rating: 5,
        reviewText: 'The stone-ground wheat flour makes incredibly soft and sweet rotis. Healthy option for the family, much better than mills.',
        replySuggestion: "Dear Priya, thank you! Using slow stone grinders (gharat) keeps the temperature low and preserves the wheat germ nutrition. 🌾",
        sentiment: 'positive',
        createdAt: new Date('2026-07-04T22:30:00.000Z')
      }
    ];

    const insertedReviews = await Review.insertMany(seedReviews);
    console.log('[Seed] Review logs created successfully.');

    // 5. Create Seed Captions
    console.log('[Seed] Creating social captions...');
    await Caption.create({
      productName: 'Pashmina Shawl',
      shopType: 'Handloom',
      captionText: '🧣 Handcrafted with love by our local weavers! Presenting the all-new [Pashmina Shawl]. Every thread is woven by hand using traditional designs passed down through generations. \n\n📦 Shipments across India. Help keep our craft heritage alive! \n\n#VocalForLocal #MakeInIndia #HandloomWeavers #TraditionalCrafts #PashminaShawl',
      reviewId: insertedReviews[1]._id,
      createdAt: new Date('2026-06-30T16:53:40.650Z')
    });

    console.log('[Seed] Social captions created successfully.');
    console.log('\n[Seed Success] MongoDB database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n[Seed Error] Seeding operation failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
