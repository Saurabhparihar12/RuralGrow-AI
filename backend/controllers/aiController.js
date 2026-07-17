import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI Client if API Key is set
let genAI = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

// ----------------------------------------------------
// LOCAL FALLBACK SIMULATOR (If Gemini key is missing/fails)
// ----------------------------------------------------
const simulateChatResponse = (userMessage) => {
  const query = userMessage.toLowerCase();
  
  if (query.includes('crop') || query.includes('agriculture') || query.includes('rotation') || query.includes('soil')) {
    return `🌾 **HimalayaGrow AI (Simulator Response):**
For Himalayan regions like Uttarakhand, crop rotation is vital to maintain soil health. Here is a recommended rotation plan:
1. **Rabi (Winter):** Wheat, Barley, or Mustard.
2. **Kharif (Monsoon):** Finger Millet (Mandua), Barnyard Millet (Jhangora), or local Red Rice.
3. **Zaid (Summer):** Local Beans, Lentils, or seasonal vegetables to restore nitrogen levels.

*Tip:* Use organic compost (made from cow manure and pine leaves) to increase moisture retention in mountain terrace soils!`;
  }
  
  if (query.includes('scheme') || query.includes('pension') || query.includes('pm-kisan') || query.includes('government') || query.includes('subsidy')) {
    return `🏛️ **HimalayaGrow AI (Simulator Response):**
Here are key schemes for Uttarakhand rural growers:
1. **PM-KISAN Samman Nidhi:** Provides ₹6,000 annually in three equal installments directly to bank accounts of land-holding farmers.
2. **Uttarakhand Apple Mission:** Offers up to 50%-80% subsidy for setting up high-density apple orchards with drip irrigation.
3. **PM-FME (Formalisation of Micro Food Processing Enterprises):** Offers 35% credit-linked subsidy for modernizing fruit jams, honey packaging, or pickles.

*Requirement:* Keep your land registration documents (Khatauni), Aadhaar, and bank account active and linked to apply at your nearest CSC center!`;
  }

  if (query.includes('loan') || query.includes('finance') || query.includes('eligibility') || query.includes('kcc')) {
    return `💳 **HimalayaGrow AI (Simulator Response):**
For financial support, we recommend the **Kisan Credit Card (KCC)**:
*   **Loan Limit:** Up to ₹3 Lakhs with low interest rates (around 4% after timely repayment subvention).
*   **Eligibility:** Owners of agricultural land, tenant farmers, and sharecroppers.
*   **Collateral:** No collateral required for loans up to ₹1.6 Lakhs.

*Step-by-step:* Visit your local cooperative bank or SBI branch in Dehradun/Nainital with your land records and Aadhaar to apply.`;
  }

  if (query.includes('marketing') || query.includes('business') || query.includes('growth') || query.includes('sell')) {
    return `📈 **HimalayaGrow AI (Simulator Response):**
To grow your local business (e.g. organic jams, handloom woolens, or honey):
1. **Packaging:** Use glass jars with natural paper labels to highlight the "handcrafted in Uttarakhand hills" look.
2. **Digital Listings:** Register on Google Maps so tourists can find you easily when visiting Mussoorie/Almora.
3. **Regional Branding:** Use the WhatsApp promotion drafts in your RuralGrow dashboard to notify repeat customers when a fresh crop or pattern is ready.`;
  }

  return `🏔️ **Welcome to HimalayaGrow AI (Simulator Mode)**
I am your rural business assistant. Ask me anything about:
*   **Agriculture & Soil:** Crop rotations, terrace farming tips, organic composting.
*   **Govt Schemes:** PM-KISAN, Apple Mission, state subsidies.
*   **Finance & Loans:** Kisan Credit Card (KCC) eligibility.
*   **Marketing:** How to pack, brand, and sell your cottage industry products.

*(Note: Currently running in simulated mode. Add a valid GEMINI_API_KEY in the backend .env to connect to the live Gemini AI engine!)*`;
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
          source: 'simulator',
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
        source: 'gemini',
        replyText
      });

    } catch (error) {
      console.error('[AI Chat Error] Falling back to simulator:', error.message);
      // Fail-safe fallback response if API fails
      const simulated = simulateChatResponse(req.body.message);
      res.status(200).json({
        success: true,
        source: 'simulator_fallback',
        replyText: simulated,
        error: error.message
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
          source: 'simulator',
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
          source: 'simulator',
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
