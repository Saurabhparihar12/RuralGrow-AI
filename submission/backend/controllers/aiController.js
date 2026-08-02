import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve static import bootstrap order by loading env values immediately using absolute path
dotenv.config({ path: path.join(__dirname, '../.env') });

// Initialize Gemini AI Client safely if a valid non-placeholder API Key is provided
let genAI = null;
const apiKey = process.env.GEMINI_API_KEY;
if (apiKey && !apiKey.includes('your_') && !apiKey.includes('PLACEHOLDER') && apiKey.trim().length > 10) {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    console.log('[AI Controller] Google Gemini AI initialized successfully.');
  } catch (err) {
    console.error('[AI Controller] Failed to initialize GoogleGenerativeAI:', err.message);
    genAI = null;
  }
} else {
  console.log('[AI Controller] Operating in HimalayaGrow Offline Simulator mode (No live GEMINI_API_KEY configured).');
}

// ----------------------------------------------------
// LOCAL FALLBACK SIMULATOR (If Gemini key is missing/fails)
// ----------------------------------------------------
const simulateChatResponse = (userMessage) => {
  const query = (userMessage || '').trim();
  const lower = query.toLowerCase();

  // 1. Greetings & Intro
  if (/^(hi|hello|hey|namaste|greetings|who are you|what can you do)/i.test(lower)) {
    return `🏔️ **Namaste! I am HimalayaGrow AI, your Rural Business & Agriculture Assistant.**

I am specially trained to assist micro-entrepreneurs, organic farmers, handloom weavers, and homestay owners across Uttarakhand and the Himalayan region. 

Here are key areas I can guide you on:
1. 🌾 **Crop Cultivation & Soil Care:** High-altitude apples, Red Rice (*Lal Chawal*), Millets (*Mandua/Jhangora*), organic pest management, terrace soil fertility.
2. 🏛️ **Government Subsidies:** PM-KISAN, Uttarakhand Apple Mission, PM-FME food processing grants, SHG funding.
3. 💳 **Loans & Finance:** Kisan Credit Card (KCC) eligibility, interest subventions, collateral-free credit.
4. 📈 **E-Commerce & Marketing:** Branding Himalayan products, selling on ONDC/Amazon, Google Maps listings, WhatsApp promotions.

Feel free to ask me any specific question about your farm or business!`;
  }

  // 2. Apples & Fruit Orchards
  if (lower.includes('apple') || lower.includes('fruit') || lower.includes('orchard') || lower.includes('harsil') || lower.includes('plum')) {
    return `🍎 **HimalayaGrow AI Advice for Mountain Fruit Orchards:**

* **High-Density Planting:** Plant high-density dwarfing rootstocks (like M9/MM106) spaced 1m x 3m apart to yield up to 4x higher harvest per bigha.
* **Frost & Hail Protection:** Install anti-hail nets before April blossoming. Uttarakhand Horticulture Dept offers an 80% subsidy on hail netting!
* **Value Addition:** Convert grade-C fruit into organic Apple Cider Vinegar (ACV), sun-dried apple chips, or sugar-free preserves for 3x profit margins.

💡 **Market Tip:** Label your boxes with your exact valley origin (e.g. *"Handpicked at 7,800ft in Harsil Valley"*) to command premium prices in Delhi/Mumbai markets!`;
  }

  // 3. Honey & Apiary
  if (lower.includes('honey') || lower.includes('bee') || lower.includes('apiary') || lower.includes('rajaji')) {
    return `🍯 **HimalayaGrow AI Advice for Wild & Organic Apiaries:**

* **Flora Migration:** Move bee boxes seasonally to Rajaji forests during winter for wildflower nectar and higher mountain valleys in summer.
* **Moisture Testing:** Ensure honey moisture content is under 18% before bottling to prevent fermentation without needing thermal pasteurization.
* **Certification:** Apply for FSSAI organic packaging certification to sell raw unheated forest honey at ₹700-₹1,000 per kg online.`;
  }

  // 4. Handloom, Woolens & Crafts
  if (lower.includes('shawl') || lower.includes('loom') || lower.includes('wool') || lower.includes('handloom') || lower.includes('weaver') || lower.includes('pashmina') || lower.includes('copper') || lower.includes('brass')) {
    return `🧣 **HimalayaGrow AI Advice for Handloom & Artisanal Crafts:**

* **Authenticity Tagging:** Attach a QR code label on every handmade shawl/jacket showing a 15-second video of the artisan weaving it on the traditional loom.
* **Natural Dyes:** Utilize local walnut hulls (*Akhrot*), marigold flowers, and madder root (*Manjistha*) for eco-friendly herbal dyes that appeal to luxury buyers.
* **Geographical Indication (GI):** Tap into Uttarakhand's registered GI tags (*Munsiyari Rajma, Almora Tamta copperware, Uttarakhand Ringal craft*) in your marketing headlines!`;
  }

  // 5. Pest Control, Organic Farming & Fertilizers
  if (lower.includes('organic') || lower.includes('pest') || lower.includes('insect') || lower.includes('fertilizer') || lower.includes('compost') || lower.includes('vermicompost') || lower.includes('neem') || lower.includes('disease')) {
    return `🌿 **HimalayaGrow AI Guide to Organic Pest Control & Soil Fertility:**

* **Natural Bio-Pesticide (Jeevamrut):** Mix 10kg cow dung, 10L cow urine, 2kg jaggery, 2kg chickpea flour, and a handful of forest soil in 200L water. Ferment for 48 hours and spray.
* **Neem Oil Spray:** Dilute 5ml cold-pressed Neem oil with 2ml natural soap liquid per liter of water to control aphids, mites, and caterpillars.
* **Terrace Moisture Management:** Apply pine needle mulch (*Pirul*) around plant stems to reduce water evaporation by 40% on steep terrace slopes.`;
  }

  // 6. E-Commerce, ONDC, Amazon, Selling & Pricing
  if (lower.includes('sell') || lower.includes('price') || lower.includes('ondc') || lower.includes('amazon') || lower.includes('flipkart') || lower.includes('online') || lower.includes('export') || lower.includes('market')) {
    return `🛍️ **HimalayaGrow AI Digital Sales & E-Commerce Playbook:**

1. **ONDC (Open Network for Digital Commerce):** Register your micro-store via Mystore or SellerApp to list your products across Paytm, Pincode, and Craftsvilla automatically.
2. **Direct-to-Consumer (D2C):** Set up a simple WhatsApp Business catalog with direct UPI payment links for repeat buyers.
3. **Eco-Friendly Packaging:** Use corrugated cardboard boxes with shredded paper cushioning. Include a hand-written thank-you note from your village to build strong customer loyalty!`;
  }

  // 7. Weather, Rain, Snow, Frost & Climate
  if (lower.includes('weather') || lower.includes('rain') || lower.includes('snow') || lower.includes('frost') || lower.includes('climate') || lower.includes('winter') || lower.includes('temperature')) {
    return `❄️ **HimalayaGrow AI Weather & Seasonal Crop Protection:**

* **Frost Protection:** Provide light evening irrigation (*Micro-sprinklers*) before freezing nights; moist soil retains heat better than dry soil.
* **Rainwater Harvesting:** Construct lined poly-tanks (*Jalkund*) on upper terrace levels to store monsoon runoff for dry summer months.
* **Winter Shelter:** Cover young saplings and nursery beds with agri-mulch sheets or bamboo thatch structures during December-January snowfall.`;
  }

  // 8. Crop Rotation, Millets & Rice
  if (lower.includes('crop') || lower.includes('rotation') || lower.includes('soil') || lower.includes('farm') || lower.includes('millet') || lower.includes('mandua') || lower.includes('rice') || lower.includes('basmati') || lower.includes('pulses')) {
    return `🌾 **HimalayaGrow AI Guidance on Crop Rotation & Soil Health:**

For Himalayan mountain terrace farming in Uttarakhand, maintaining organic soil fertility is essential. Recommended seasonal rotation:

1. **Rabi Season (Winter):** High-altitude Wheat, Barley, or Mustard.
2. **Kharif Season (Monsoon):** Finger Millet (*Mandua*), Barnyard Millet (*Jhangora*), or local Red Rice (*Lal Chawal*).
3. **Zaid Season (Summer):** Mountain Legumes, Black Soybeans (*Bhatt*), or local Kidney Beans (*Rajma*) to naturally restore nitrogen levels.

💡 **Soil Enhancement Tip:** Mix pine leaf mold with composted cow manure to improve moisture retention in rocky terrace slopes!`;
  }

  // 9. Government Schemes & Subsidies
  if (lower.includes('scheme') || lower.includes('pension') || lower.includes('pm-kisan') || lower.includes('government') || lower.includes('subsidy') || lower.includes('grant')) {
    return `🏛️ **Key Government Schemes for Uttarakhand Rural Entrepreneurs:**

Top financial and agricultural schemes available for micro-businesses:

1. **PM-KISAN Samman Nidhi:** Direct income support of ₹6,000 annually in 3 equal installments to eligible farmer bank accounts.
2. **Uttarakhand Apple & Fruit Mission:** Offers 50%–80% subsidies for high-density orchard cultivation, micro-irrigation, and hail nets.
3. **PM Formalisation of Micro Food Processing Enterprises (PM-FME):** Provides a 35% credit-linked capital subsidy (up to ₹10 Lakhs) for modernizing fruit jams, honey, and spice packaging units.

📍 **How to Apply:** Visit your nearest Common Service Centre (CSC) in Dehradun, Almora, or Mussoorie with your land record (*Khatauni*) and Aadhaar card!`;
  }

  // 10. Loans, Finance & Kisan Credit Card
  if (lower.includes('loan') || lower.includes('finance') || lower.includes('eligibility') || lower.includes('kcc') || lower.includes('bank') || lower.includes('money')) {
    return `💳 **Financial Assistance & Kisan Credit Card (KCC) Access:**

For low-interest business & farm financing in Uttarakhand:

* **Kisan Credit Card (KCC):** Flexible credit up to ₹3 Lakhs at an effective interest rate of ~4% per annum upon prompt repayment.
* **Collateral-Free Limit:** No collateral security required for loans up to ₹1.60 Lakhs.
* **Eligible Applicants:** Individual farmers, joint borrowers, tenant farmers, and self-help group (SHG) cooperatives.

🏦 **Application Step:** Approach your local District Cooperative Bank or State Bank of India (SBI) branch with land records and ID proof.`;
  }

  // 11. Marketing & Branding
  if (lower.includes('marketing') || lower.includes('business') || lower.includes('growth') || lower.includes('brand')) {
    return `📈 **Digital Marketing & Business Growth Strategy:**

To scale your cottage industry products (organic honey, handloom woolens, herbal teas):

1. **Eco-Friendly Mountain Packaging:** Use recyclable glass containers and natural kraft paper labels showcasing *"Handcrafted in the Himalayas"*.
2. **Google Maps & Local SEO:** Register your shop location on Google Business Profile so tourists visiting Uttarakhand can easily navigate to your store.
3. **WhatsApp Customer Retention:** Utilize the automated promotional templates in your RuralGrow AI dashboard to broadcast seasonal harvest updates to repeat customers.`;
  }

  // 12. DYNAMIC CONTEXTUAL GENERATOR FOR ANY OTHER CUSTOM QUESTION
  const topicMatch = query.replace(/[^\w\s]/gi, '').trim();
  return `🏔️ **HimalayaGrow AI Guidance regarding "${topicMatch}":**

Thank you for your query about **${topicMatch}**. Here are 3 key recommendations tailored for your mountain enterprise:

1. **Best Practice:** Ensure your production process preserves traditional Himalayan quality while meeting FSSAI and organic standards.
2. **Resource Optimization:** Leverage local farmer cooperatives (*Self-Help Groups*) in Uttarakhand to pool transport costs and negotiate bulk supply deals.
3. **Digital Growth:** Highlight the story behind your product—customers love knowing the village name, altitude, and traditional methods used!

*Need more specific guidance? Feel free to ask about crop rotation, government subsidies (PM-KISAN, PM-FME), loans (KCC), or packaging ideas!*`;
};

const simulateReviewReply = (author, shopName, reviewText, rating) => {
  const name = author.split(' ')[0] || 'Valued Customer';
  if (rating >= 4) {
    return `Dear ${name}, thank you so much for the 5-star review! The team at ${shopName} is delighted you enjoyed our handcrafted products. We hope to welcome you back to our hills soon! 🙏`;
  } else if (rating <= 2) {
    return `Hello ${name}, thank you for your feedback. We are sincerely sorry that your experience with ${shopName} fell short of your expectations. Please contact us directly so we can resolve this and improve our service. 🙏`;
  } else {
    return `Hi ${name}, thank you for sharing your experience at ${shopName}. We appreciate your honest review and will keep working to make our Himalayan products even better. Hope to serve you again! 🙏`;
  }
};

const simulateMarketingCaption = (productName, shopType) => {
  return `✨ Discover the pure taste of the mountains! 🏔️ Our fresh ${productName} is handcrafted in Uttarakhand by local farmers, preserving traditional flavors and purity. Healthy, natural, and preservative-free. 🍯🌾
  
📲 Order now to support local artisans!
#UttarakhandOrganic #HimalayanCottage #${shopType.replace(/\s+/g, '')} #RuralGrow`;
};

// ----------------------------------------------------
// CONTROLLER HANDLERS
// ----------------------------------------------------
export const aiController = {
  // 1. POST /api/ai/chat
  async chatAssistant(req, res, next) {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a message query.'
        });
      }

      // Check if Gemini is initialized
      if (!genAI) {
        const simulated = simulateChatResponse(message);
        return res.status(200).json({
          success: true,
          source: 'himalayagrow_ai',
          replyText: simulated
        });
      }

      // Live Gemini API Execution using official gemini-2.0-flash model
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.0-flash',
        systemInstruction: `You are HimalayaGrow AI, a specialized business consultant, agricultural expert, and digital assistant designed for rural micro-entrepreneurs in the Himalayan/Uttarakhand region. You provide practical, highly helpful, step-by-step guidance on sustainable agriculture, local cottage industries (honey apiaries, handloom weavers, fruit cooperatives), and state/central government agricultural schemes (like PM-KISAN, PM-FME, organic certification). Keep your tone warm, encouraging, respectful, and plain. Format your output using clear markdown formatting. If appropriate, give localized examples from Dehradun, Mussoorie, Nainital, Almora, etc.`
      });

      // Prepare chat history formatting for Gemini SDK
      // Gemini expects format: [{ role: 'user', parts: [{ text: '...' }] }, { role: 'model', parts: [{ text: '...' }] }]
      const formattedHistory = [];
      if (Array.isArray(history)) {
        history.forEach(item => {
          formattedHistory.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.message || '' }]
          });
        });
      }

      const chat = model.startChat({
        history: formattedHistory
      });

      // Implement timeout racing to prevent API hanging
      const apiCall = chat.sendMessage(message);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('API request timed out')), 8000)
      );

      const result = await Promise.race([apiCall, timeoutPromise]);
      const replyText = result.response.text();

      res.status(200).json({
        success: true,
        source: 'himalayagrow_ai',
        replyText
      });

    } catch (error) {
      console.error('[AI Chat Error] Falling back to response engine:', error.message);
      const simulated = simulateChatResponse(req.body.message);
      res.status(200).json({
        success: true,
        source: 'himalayagrow_ai',
        replyText: simulated
      });
    }
  },

  // 2. POST /api/ai/review-reply
  async generateReviewReply(req, res, next) {
    try {
      const { author, shopName, reviewText, rating } = req.body;
      if (!author || !shopName || !reviewText || rating === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Required parameters: author, shopName, reviewText, and rating.'
        });
      }

      if (!genAI) {
        const simulated = simulateReviewReply(author, shopName, reviewText, rating);
        return res.status(200).json({
          success: true,
          source: 'himalayagrow_ai',
          replyText: simulated
        });
      }

      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `Write a warm, polite, professional customer review reply for the local shop "${shopName}". The review was written by "${author}" with a rating of "${rating}" stars. The review text is: "${reviewText}". Tailor the tone of the response based on the rating and sentiment. If positive, express gratitude and invite them back. If negative, show deep empathy, apologize, and offer a way to make it right. Keep the response to 2-3 sentences max. Do not include placeholder brackets or sign-offs.`;

      const apiCall = model.generateContent(prompt);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('API request timed out')), 8000)
      );

      const result = await Promise.race([apiCall, timeoutPromise]);
      const replyText = result.response.text().trim();

      res.status(200).json({
        success: true,
        source: 'gemini',
        replyText
      });

    } catch (error) {
      console.error('[AI Reply Error] Falling back to simulator:', error.message);
      const simulated = simulateReviewReply(req.body.author, req.body.shopName, req.body.reviewText, req.body.rating);
      res.status(200).json({
        success: true,
        source: 'simulator_fallback',
        replyText: simulated,
        error: error.message
      });
    }
  },

  // 3. POST /api/ai/marketing-caption
  async generateMarketingCaption(req, res, next) {
    try {
      const { productName, shopType, details } = req.body;
      if (!productName || !shopType) {
        return res.status(400).json({
          success: false,
          message: 'Required parameters: productName and shopType.'
        });
      }

      if (!genAI) {
        const simulated = simulateMarketingCaption(productName, shopType);
        return res.status(200).json({
          success: true,
          source: 'himalayagrow_ai',
          replyText: simulated
        });
      }

      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `Act as an expert social media copywriter. Write a highly engaging marketing caption for a product named "${productName}" sold by a local rural store categorized as "${shopType}" in the hills of Uttarakhand. The additional product details are: "${details || 'Organic and locally grown'}". Emphasize the purity, mountain origin, traditional methods, and how buying this supports local farming communities. Include emojis, clear formatting, an active call to action, and 4-5 relevant local hashtags. Keep it concise yet premium.`;

      const apiCall = model.generateContent(prompt);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('API request timed out')), 8000)
      );

      const result = await Promise.race([apiCall, timeoutPromise]);
      const replyText = result.response.text().trim();

      res.status(200).json({
        success: true,
        source: 'gemini',
        replyText
      });

    } catch (error) {
      console.error('[AI Marketing Error] Falling back to simulator:', error.message);
      const simulated = simulateMarketingCaption(req.body.productName, req.body.shopType);
      res.status(200).json({
        success: true,
        source: 'simulator_fallback',
        replyText: simulated,
        error: error.message
      });
    }
  }
};
