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
  const query = (userMessage || '').toLowerCase();
  
  if (query.includes('crop') || query.includes('agriculture') || query.includes('rotation') || query.includes('soil') || query.includes('farm')) {
    return `🌾 **HimalayaGrow AI Guidance on Crop Rotation & Soil Health:**

For Himalayan mountain terrace farming in Uttarakhand, maintaining organic soil fertility is essential. Here is a recommended seasonal crop rotation plan:

1. **Rabi Season (Winter):** High-altitude Wheat, Barley, or Mustard.
2. **Kharif Season (Monsoon):** Finger Millet (*Mandua*), Barnyard Millet (*Jhangora*), or local Red Rice (*Lal Chawal*).
3. **Zaid Season (Summer):** Mountain Legumes, Black Soybeans (*Bhatt*), or local Kidney Beans (*Rajma*) to naturally restore nitrogen levels.

💡 **Soil Enhancement Tip:** Mix pine leaf mold with composted cow manure to improve moisture retention in rocky terrace slopes!`;
  }
  
  if (query.includes('scheme') || query.includes('pension') || query.includes('pm-kisan') || query.includes('government') || query.includes('subsidy') || query.includes('grant')) {
    return `🏛️ **Key Government Schemes for Uttarakhand Rural Entrepreneurs:**

Here are top financial and agricultural schemes available for micro-businesses in the region:

1. **PM-KISAN Samman Nidhi:** Direct income support of ₹6,000 annually in 3 equal installments to eligible farmer bank accounts.
2. **Uttarakhand Apple & Fruit Mission:** Offers 50%–80% subsidies for high-density orchard cultivation, micro-irrigation, and hail nets.
3. **PM Formalisation of Micro Food Processing Enterprises (PM-FME):** Provides a 35% credit-linked capital subsidy (up to ₹10 Lakhs) for modernizing fruit jams, honey, and spice packaging units.

📍 **How to Apply:** Visit your nearest Common Service Centre (CSC) in Dehradun, Almora, or Mussoorie with your land record (*Khatauni*) and Aadhaar card!`;
  }

  if (query.includes('loan') || query.includes('finance') || query.includes('eligibility') || query.includes('kcc') || query.includes('bank') || query.includes('money')) {
    return `💳 **Financial Assistance & Kisan Credit Card (KCC) Access:**

For low-interest business & farm financing in Uttarakhand:

* **Kisan Credit Card (KCC):** Provides flexible credit up to ₹3 Lakhs at an effective interest rate of ~4% per annum upon prompt repayment.
* **Collateral-Free Limit:** No collateral security required for loans up to ₹1.60 Lakhs.
* **Eligible Applicants:** Individual farmers, joint borrowers, tenant farmers, and self-help group (SHG) cooperatives.

🏦 **Application Step:** Approach your local District Cooperative Bank or State Bank of India (SBI) branch with land records and ID proof.`;
  }

  if (query.includes('marketing') || query.includes('business') || query.includes('growth') || query.includes('sell') || query.includes('brand') || query.includes('price')) {
    return `📈 **Digital Marketing & Business Growth Strategy:**

To scale your cottage industry products (organic honey, handloom woolens, herbal teas):

1. **Eco-Friendly Mountain Packaging:** Use recyclable glass containers and natural kraft paper labels showcasing *"Handcrafted in the Himalayas"*.
2. **Google Maps & Local SEO:** Register your shop location on Google Business Profile so tourists visiting Uttarakhand can easily navigate to your store.
3. **WhatsApp Customer Retention:** Utilize the automated promotional templates in your RuralGrow AI dashboard to broadcast seasonal harvest updates to repeat customers.`;
  }

  return `🏔️ **Namaste! I am HimalayaGrow AI, your Rural Business & Agriculture Assistant.**

I am here to help mountain growers and micro-merchants succeed. You can ask me about:

* 🌾 **Sustainable Terrace Farming:** Crop rotations, organic compost, millet cultivation.
* 🏛️ **Govt Subsidies & Schemes:** PM-KISAN enrollment, Apple Mission grants, food processing subsidies.
* 💳 **Kisan Credit Cards & Loans:** Eligibility rules, application steps, interest subventions.
* 📈 **Branding & Marketing:** Packaging tips, Google Maps business listing, WhatsApp outreach.

How can I assist your business growth today?`;
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

      // Live Gemini API Execution
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
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
