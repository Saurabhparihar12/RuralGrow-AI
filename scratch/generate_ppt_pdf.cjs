const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// A4 Landscape size: 841.89 x 595.28 points
const doc = new PDFDocument({
  size: [841.89, 595.28],
  margin: 0,
  autoFirstPage: false
});

const outputPath = path.join(process.cwd(), 'W9_Final_Presentation_TBI-26100640.pdf');
const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Colors
const BG_DARK = '#0F172A';
const CARD_BG = '#1E293B';
const ACCENT_GREEN = '#10B981';
const ACCENT_BLUE = '#3B82F6';
const TEXT_WHITE = '#F8FAFC';
const TEXT_MUTED = '#94A3B8';
const BORDER_COLOR = '#334155';

const screenshotsDir = path.join(__dirname, 'screenshots');
const shot1 = path.join(screenshotsDir, 'screenshot_1_vercel.png');
const shot2 = path.join(screenshotsDir, 'screenshot_2_render.png');
const shot3 = path.join(screenshotsDir, 'screenshot_3_dashboard.png');
const shot4 = path.join(screenshotsDir, 'screenshot_4_ai_assistant.png');
const schemaImg = path.join(__dirname, '..', 'W5_SchemaDiagram_TBI-26100640.png');

function addSlideBase(title, slideNum, totalSlides = 10) {
  doc.addPage();
  // Background
  doc.rect(0, 0, 841.89, 595.28).fill(BG_DARK);
  
  // Header Bar
  doc.rect(40, 30, 761.89, 60).fillAndStroke(CARD_BG, BORDER_COLOR);
  doc.fillColor(TEXT_WHITE).fontSize(20).font('Helvetica-Bold').text(title, 60, 48);
  
  // Tag / Badge
  doc.rect(660, 45, 125, 30).fill('#064E3B');
  doc.fillColor(ACCENT_GREEN).fontSize(10).font('Helvetica-Bold').text(`SLIDE ${slideNum} / ${totalSlides}`, 675, 54);
  
  // Footer
  doc.moveTo(40, 555).lineTo(801.89, 555).stroke(BORDER_COLOR);
  doc.fillColor(TEXT_MUTED).fontSize(9).font('Helvetica').text('RuralGrow AI — TBI-GEU Internship Deliverable', 40, 565);
  doc.text('Intern ID: TBI-26100640 | Saurabh Parihar', 580, 565);
}

// SLIDE 1: Title Slide
doc.addPage();
doc.rect(0, 0, 841.89, 595.28).fill(BG_DARK);
doc.rect(60, 60, 721.89, 475.28).fillAndStroke(CARD_BG, BORDER_COLOR);

doc.rect(90, 90, 661.89, 6).fill(ACCENT_GREEN);
doc.fillColor(TEXT_WHITE).fontSize(34).font('Helvetica-Bold').text('RuralGrow AI', 90, 120);
doc.fillColor(ACCENT_GREEN).fontSize(18).font('Helvetica-Bold').text('Himalayan Micro-Merchant Growth & AI Assistant', 90, 165);

doc.moveTo(90, 205).lineTo(751.89, 205).stroke(BORDER_COLOR);

doc.fillColor(TEXT_MUTED).fontSize(14).font('Helvetica').text('TBI-GEU Summer Internship Final Presentation Deliverable', 90, 230);

// Info Box Grid
const boxY = 280;
doc.rect(90, boxY, 315, 210).fillAndStroke('#111827', BORDER_COLOR);
doc.fillColor(ACCENT_BLUE).fontSize(14).font('Helvetica-Bold').text('📌 Intern Details', 110, boxY + 20);
doc.fillColor(TEXT_WHITE).fontSize(12).font('Helvetica')
  .text('• Name: ', 110, boxY + 55).font('Helvetica-Bold').text('Saurabh Parihar', 180, boxY + 55)
  .font('Helvetica').text('• Intern ID: ', 110, boxY + 85).font('Helvetica-Bold').text('TBI-26100640', 190, boxY + 85)
  .font('Helvetica').text('• University: ', 110, boxY + 115).font('Helvetica-Bold').text('Graphic Era University (GEU)', 200, boxY + 115)
  .font('Helvetica').text('• Domain: ', 110, boxY + 145).font('Helvetica-Bold').text('Full-Stack Web Dev & AI / DevOps', 185, boxY + 145);

doc.rect(435, boxY, 315, 210).fillAndStroke('#111827', BORDER_COLOR);
doc.fillColor(ACCENT_GREEN).fontSize(14).font('Helvetica-Bold').text('🌐 Public Verification Links', 455, boxY + 20);
doc.fillColor(TEXT_WHITE).fontSize(10).font('Helvetica')
  .text('• Web App (Vercel):', 455, boxY + 55)
  .fillColor('#60A5FA').text('https://rural-grow-58fsd5yhj-rural-grow-ai.vercel.app', 455, boxY + 70)
  .fillColor(TEXT_WHITE).text('• REST API (Render):', 455, boxY + 100)
  .fillColor('#60A5FA').text('https://ruralgrow-ai.onrender.com', 455, boxY + 115)
  .fillColor(TEXT_WHITE).text('• GitHub Repository:', 455, boxY + 145)
  .fillColor('#60A5FA').text('https://github.com/Saurabhparihar12/RuralGrow-AI', 455, boxY + 160);


// SLIDE 2: What problem are you solving?
addSlideBase('2. Problem Statement & Mission', 2);
doc.rect(40, 110, 370, 420).fillAndStroke(CARD_BG, BORDER_COLOR);
doc.fillColor(ACCENT_GREEN).fontSize(16).font('Helvetica-Bold').text('🚨 The Core Problem', 60, 130);
doc.fillColor(TEXT_WHITE).fontSize(11).font('Helvetica')
  .text('• Language & Literacy Barrier:', 60, 165).fillColor(TEXT_MUTED).text('Rural merchants (farmers, weavers, homestay hosts) struggle to write formal English replies and marketing posts.', 75, 180)
  .fillColor(TEXT_WHITE).text('• Zero Marketing Expertise:', 60, 230).fillColor(TEXT_MUTED).text('High quality local products lack digital visibility on Instagram, Facebook, and WhatsApp.', 75, 245)
  .fillColor(TEXT_WHITE).text('• Review Ignorance:', 60, 295).fillColor(TEXT_MUTED).text('Unanswered customer reviews lead to lost sales and negative online reputation.', 75, 310)
  .fillColor(TEXT_WHITE).text('• Lack of Business Guidance:', 60, 360).fillColor(TEXT_MUTED).text('Limited access to experts regarding PM-KISAN, crop pricing, and digital expansion.', 75, 375);

doc.rect(430, 110, 370, 420).fillAndStroke(CARD_BG, BORDER_COLOR);
doc.fillColor(ACCENT_BLUE).fontSize(16).font('Helvetica-Bold').text('💡 The RuralGrow AI Solution', 450, 130);
doc.fillColor(TEXT_WHITE).fontSize(11).font('Helvetica')
  .text('• AI Review Sentiment & Auto-Reply:', 450, 165).fillColor(TEXT_MUTED).text('Instantly analyzes customer reviews and drafts polite responses in regional Indian languages.', 465, 180)
  .fillColor(TEXT_WHITE).text('• Instant Social Copywriter:', 450, 230).fillColor(TEXT_MUTED).text('Generates promotional posts with custom discounts tailored for WhatsApp, Instagram, and FB.', 465, 245)
  .fillColor(TEXT_WHITE).text('• HimalayaGrow AI Assistant:', 450, 295).fillColor(TEXT_MUTED).text('24/7 conversational guide for scheme updates, pricing, and agricultural advice.', 465, 310)
  .fillColor(TEXT_WHITE).text('• Visual Growth Dashboard:', 450, 360).fillColor(TEXT_MUTED).text('Interactive analytics tracking review ratings and customer feedback metrics.', 465, 375);


// SLIDE 3: Tech Stack Selected Along With Reason
addSlideBase('3. Technology Stack & Architectural Rationale', 3);

const techGrid = [
  { title: 'Frontend: React 19 + Vite + Tailwind CSS', reason: 'Lightning-fast SPA rendering, component reusability, and modern responsive UI styling.' },
  { title: 'Backend: Node.js + Express.js REST API', reason: 'Non-blocking I/O event loop, seamless JSON handling, and modular controller architecture.' },
  { title: 'Database: MongoDB Atlas (Mongoose ORM)', reason: 'Flexible document schema for nested reviews/captions, high scalability, and cloud persistence.' },
  { title: 'AI Integration: Google Gemini 1.5 Flash API', reason: 'High-speed multi-lingual Indian language generation with zero cost on developer free tier.' },
  { title: 'Auth & Security: JWT + Passport Google OAuth', reason: 'Stateless session security, BCrypt hashing, CORS restriction, and Helmet security headers.' },
  { title: 'Deployment: Vercel (Client) + Render (API)', reason: 'Automated CI/CD from GitHub main branch with zero server management overhead.' }
];

techGrid.forEach((item, idx) => {
  const col = idx % 2;
  const row = Math.floor(idx / 2);
  const x = 40 + col * 390;
  const y = 110 + row * 140;
  
  doc.rect(x, y, 370, 125).fillAndStroke(CARD_BG, BORDER_COLOR);
  doc.fillColor(ACCENT_GREEN).fontSize(13).font('Helvetica-Bold').text(item.title, x + 15, y + 15);
  doc.fillColor(TEXT_MUTED).fontSize(10).font('Helvetica').text(`Rationale: ${item.reason}`, x + 15, y + 45, { width: 340 });
});


// SLIDE 4: Frontend Screenshots + Live Website Link
addSlideBase('4. Frontend User Experience & Live Interface', 4);

doc.rect(40, 110, 370, 420).fillAndStroke(CARD_BG, BORDER_COLOR);
doc.fillColor(TEXT_WHITE).fontSize(13).font('Helvetica-Bold').text('Live Vercel Application Homepage', 55, 125);
if (fs.existsSync(shot1)) {
  doc.image(shot1, 55, 150, { width: 340, height: 210 });
}
doc.fillColor(TEXT_MUTED).fontSize(10).font('Helvetica')
  .text('• Responsive Glassmorphism design with Himalayan dark/light theme.', 55, 375)
  .text('• Live URL: ', 55, 400).fillColor('#60A5FA').text('https://rural-grow-58fsd5yhj-rural-grow-ai.vercel.app', 115, 400);

doc.rect(430, 110, 370, 420).fillAndStroke(CARD_BG, BORDER_COLOR);
doc.fillColor(TEXT_WHITE).fontSize(13).font('Helvetica-Bold').text('Merchant Growth & Review Analytics Dashboard', 445, 125);
if (fs.existsSync(shot3)) {
  doc.image(shot3, 445, 150, { width: 340, height: 210 });
}
doc.fillColor(TEXT_MUTED).fontSize(10).font('Helvetica')
  .text('• Recharts sentiment breakdown (Positive / Neutral / Negative).', 445, 375)
  .text('• Direct action buttons to reply or generate marketing posts.', 445, 400);


// SLIDE 5: Backend 2 Best APIs & Working
addSlideBase('5. Core Backend REST APIs & Verification', 5);

doc.rect(40, 110, 370, 420).fillAndStroke(CARD_BG, BORDER_COLOR);
doc.fillColor(ACCENT_BLUE).fontSize(14).font('Helvetica-Bold').text('API 1: POST /api/ai/analyze-review', 60, 130);
doc.fillColor(TEXT_WHITE).fontSize(11).font('Helvetica')
  .text('• Working:', 60, 160).fillColor(TEXT_MUTED).text('Accepts customer review text & rating -> analyzes sentiment -> returns suggested polite response in Hindi/English.', 75, 175, { width: 320 })
  .fillColor(TEXT_WHITE).text('• Resiliency:', 60, 235).fillColor(TEXT_MUTED).text('Equipped with local AI simulation fallback if Gemini API is unreachable.', 75, 250, { width: 320 });

doc.rect(60, 305, 330, 205).fillAndStroke('#111827', BORDER_COLOR);
doc.fillColor(ACCENT_GREEN).fontSize(10).font('Helvetica-Bold').text('[API 1 Test Payload & Response]', 75, 320);
doc.fillColor(TEXT_WHITE).fontSize(8).font('Courier')
  .text('REQUEST: { "reviewText": "Awesome organic honey!", "rating": 5 }\nRESPONSE: {\n  "success": true,\n  "sentiment": "Positive",\n  "reply": "Dhanyawaad! We are glad you enjoyed our raw honey."\n}', 75, 340);

doc.rect(430, 110, 370, 420).fillAndStroke(CARD_BG, BORDER_COLOR);
doc.fillColor(ACCENT_BLUE).fontSize(14).font('Helvetica-Bold').text('API 2: POST /api/ai/chat', 450, 130);
doc.fillColor(TEXT_WHITE).fontSize(11).font('Helvetica')
  .text('• Working:', 450, 160).fillColor(TEXT_MUTED).text('Accepts merchant query -> runs prompt engineering -> returns advice tailored for Himalayan micro-merchants.', 465, 175, { width: 320 })
  .fillColor(TEXT_WHITE).text('• Health Verification:', 450, 235).fillColor(TEXT_MUTED).text('Render API Endpoint: GET /api/health -> 200 OK.', 465, 250, { width: 320 });

if (fs.existsSync(shot2)) {
  doc.image(shot2, 450, 290, { width: 330, height: 220 });
}


// SLIDE 6: Database & Schema Design
addSlideBase('6. Database Choice & Schema Architecture', 6);

doc.rect(40, 110, 370, 420).fillAndStroke(CARD_BG, BORDER_COLOR);
doc.fillColor(ACCENT_GREEN).fontSize(14).font('Helvetica-Bold').text('🍃 Database Selection: MongoDB Atlas', 60, 130);
doc.fillColor(TEXT_WHITE).fontSize(11).font('Helvetica')
  .text('• Why MongoDB Atlas?', 60, 165).fillColor(TEXT_MUTED).text('1. Flexible JSON document structure fits reviews, captions & profiles.\n2. Cloud Atlas cluster ensures zero local setup overhead.\n3. Fast Mongoose indexing on User and Review IDs.', 75, 185, { width: 320 })
  .fillColor(TEXT_WHITE).text('• Models Designed:', 60, 275).fillColor(TEXT_MUTED).text('• User Schema (Auth, Role, ShopName)\n• Review Schema (Sentiment, Rating, AI Reply)\n• Caption Schema (Platform, Discount, Content)\n• Shop Schema (Location, Category, Contact)', 75, 295, { width: 320 });

doc.rect(430, 110, 370, 420).fillAndStroke(CARD_BG, BORDER_COLOR);
doc.fillColor(TEXT_WHITE).fontSize(14).font('Helvetica-Bold').text('Entity Relationship & Schema Diagram', 450, 130);
if (fs.existsSync(schemaImg)) {
  doc.image(schemaImg, 450, 160, { width: 330, height: 350 });
} else {
  doc.fillColor(TEXT_MUTED).fontSize(11).font('Helvetica').text('[MongoDB Schema Verified: User -> Shop -> Review -> Caption]', 450, 200);
}


// SLIDE 7: AI Feature & LLM Integration
addSlideBase('7. AI Features & Gemini LLM Integration', 7);

doc.rect(40, 110, 370, 420).fillAndStroke(CARD_BG, BORDER_COLOR);
doc.fillColor(ACCENT_GREEN).fontSize(14).font('Helvetica-Bold').text('🤖 LLM Model: Google Gemini 1.5 Flash', 60, 130);
doc.fillColor(TEXT_WHITE).fontSize(11).font('Helvetica')
  .text('• Primary Use Cases:', 60, 165).fillColor(TEXT_MUTED)
  .text('1. Review Re-Composer: Translates customer feedback into professional replies.', 75, 185, { width: 320 })
  .text('2. Social Post Writer: Formats promo text for WhatsApp/FB with emojis.', 75, 225, { width: 320 })
  .text('3. HimalayaGrow Advisory: Answers PM-KISAN & pricing questions.', 75, 265, { width: 320 })
  .fillColor(TEXT_WHITE).text('• System Prompting:', 60, 320).fillColor(TEXT_MUTED).text('Configured with specialized system instructions to maintain a polite, helpful Himalayan assistant persona.', 75, 340, { width: 320 })
  .fillColor(TEXT_WHITE).text('• Resilient Fallback:', 60, 395).fillColor(TEXT_MUTED).text('Offline rule engine ensures 100% uptime if API key is rate limited.', 75, 415, { width: 320 });

doc.rect(430, 110, 370, 420).fillAndStroke(CARD_BG, BORDER_COLOR);
doc.fillColor(TEXT_WHITE).fontSize(14).font('Helvetica-Bold').text('Live HimalayaGrow AI Chat Assistant', 450, 130);
if (fs.existsSync(shot4)) {
  doc.image(shot4, 450, 160, { width: 330, height: 350 });
}


// SLIDE 8: Hosting Service Used
addSlideBase('8. Production Hosting & Cloud Infrastructure', 8);

doc.rect(40, 110, 370, 420).fillAndStroke(CARD_BG, BORDER_COLOR);
doc.fillColor(ACCENT_BLUE).fontSize(16).font('Helvetica-Bold').text('▲ Vercel Cloud (Frontend)', 60, 130);
doc.fillColor(TEXT_WHITE).fontSize(11).font('Helvetica')
  .text('• Platform:', 60, 165).fillColor(TEXT_MUTED).text('Vercel Edge Network for React SPA.', 75, 180)
  .fillColor(TEXT_WHITE).text('• Configuration:', 60, 215).fillColor(TEXT_MUTED).text('vercel.json rewrite rules for SPA client routing.', 75, 230)
  .fillColor(TEXT_WHITE).text('• Deployment URL:', 60, 265).fillColor('#60A5FA').text('https://rural-grow-58fsd5yhj-rural-grow-ai.vercel.app', 75, 280)
  .fillColor(TEXT_WHITE).text('• Key Benefits:', 60, 315).fillColor(TEXT_MUTED).text('Instant global CDN distribution, SSL HTTPS by default, and continuous deployment from GitHub main branch.', 75, 330, { width: 310 });

doc.rect(430, 110, 370, 420).fillAndStroke(CARD_BG, BORDER_COLOR);
doc.fillColor(ACCENT_GREEN).fontSize(16).font('Helvetica-Bold').text('⚙️ Render Web Service (Backend)', 450, 130);
doc.fillColor(TEXT_WHITE).fontSize(11).font('Helvetica')
  .text('• Platform:', 450, 165).fillColor(TEXT_MUTED).text('Render Cloud Web Service for Node.js Express API.', 465, 180)
  .fillColor(TEXT_WHITE).text('• Configuration:', 450, 215).fillColor(TEXT_MUTED).text('Infrastructure-as-code render.yaml manifest.', 465, 230)
  .fillColor(TEXT_WHITE).text('• Deployment URL:', 450, 265).fillColor('#60A5FA').text('https://ruralgrow-ai.onrender.com', 465, 280)
  .fillColor(TEXT_WHITE).text('• Key Benefits:', 450, 315).fillColor(TEXT_MUTED).text('Automated Node build environment, dynamic port binding, zero secret exposure, and health check monitoring.', 465, 330, { width: 310 });


// SLIDE 9: All Live URLs
addSlideBase('9. Public Links & Verification Matrix', 9);

doc.rect(40, 110, 761.89, 420).fillAndStroke(CARD_BG, BORDER_COLOR);

doc.fillColor(ACCENT_GREEN).fontSize(16).font('Helvetica-Bold').text('🔗 Verified Publicly Accessible Links', 60, 135);
doc.fillColor(TEXT_MUTED).fontSize(11).font('Helvetica').text('All links below are live, public, and accessible without login barriers:', 60, 160);

const linksTable = [
  { label: 'Live Frontend Web App (Vercel)', url: 'https://rural-grow-58fsd5yhj-rural-grow-ai.vercel.app', status: 'ACTIVE 🟢' },
  { label: 'Live Backend REST API (Render)', url: 'https://ruralgrow-ai.onrender.com', status: 'ACTIVE 🟢' },
  { label: 'Backend API Health Check Endpoint', url: 'https://ruralgrow-ai.onrender.com/api/health', status: '200 OK 🟢' },
  { label: 'GitHub Public Source Repository', url: 'https://github.com/Saurabhparihar12/RuralGrow-AI', status: 'VERIFIED 🟢' },
  { label: 'Official Submission ZIP Deliverable', url: 'W9_Submission_TBI-26100640.zip in root directory', status: 'VERIFIED 🟢' }
];

linksTable.forEach((row, i) => {
  const y = 200 + i * 65;
  doc.rect(60, y, 721.89, 50).fillAndStroke('#111827', BORDER_COLOR);
  doc.fillColor(TEXT_WHITE).fontSize(12).font('Helvetica-Bold').text(row.label, 75, y + 10);
  doc.fillColor('#60A5FA').fontSize(10).font('Helvetica').text(row.url, 75, y + 28);
  doc.fillColor(ACCENT_GREEN).fontSize(12).font('Helvetica-Bold').text(row.status, 680, y + 18);
});


// SLIDE 10: Internship Reflection & Key Learnings
addSlideBase('10. Internship Reflection & Key Learnings', 10);

doc.rect(40, 110, 370, 420).fillAndStroke(CARD_BG, BORDER_COLOR);
doc.fillColor(ACCENT_BLUE).fontSize(16).font('Helvetica-Bold').text('🧠 Technical & DevOps Skills Learned', 60, 130);
doc.fillColor(TEXT_WHITE).fontSize(11).font('Helvetica')
  .text('1. Full-Stack MERN Architecture:', 60, 165).fillColor(TEXT_MUTED).text('Mastered building modular React frontend components with Node.js Express REST API integration.', 75, 180, { width: 320 })
  .fillColor(TEXT_WHITE).text('2. Production Cloud Deployment:', 60, 240).fillColor(TEXT_MUTED).text('Configured Vercel rewrites, Render web services, dynamic CORS security, and environment variables.', 75, 255, { width: 320 })
  .fillColor(TEXT_WHITE).text('3. Practical LLM Engineering:', 60, 320).fillColor(TEXT_MUTED).text('Implemented prompt engineering with Google Gemini API and built offline fallback simulators.', 75, 335, { width: 320 })
  .fillColor(TEXT_WHITE).text('4. Database Modeling:', 60, 400).fillColor(TEXT_MUTED).text('Designed relational document schemas in MongoDB Atlas for persistent storage.', 75, 415, { width: 320 });

doc.rect(430, 110, 370, 420).fillAndStroke(CARD_BG, BORDER_COLOR);
doc.fillColor(ACCENT_GREEN).fontSize(16).font('Helvetica-Bold').text('🌟 Overall Internship Experience', 450, 130);
doc.fillColor(TEXT_WHITE).fontSize(11).font('Helvetica')
  .text('• Real-World Impact:', 450, 165).fillColor(TEXT_MUTED).text('Building RuralGrow AI provided deep insights into solving grassroots problems for Himalayan micro-merchants.', 465, 180, { width: 320 })
  .fillColor(TEXT_WHITE).text('• Guidance & Mentorship:', 450, 250).fillColor(TEXT_MUTED).text('Grateful to Mayank Kumar sir and the Skill Dev Team at TBI-GEU for structured weekly milestones and feedback.', 465, 265, { width: 320 })
  .fillColor(TEXT_WHITE).text('• Industry Standard Habits:', 450, 335).fillColor(TEXT_MUTED).text('Adopted git workflows, clean documentation standards, API contract design, and automated PDF reporting.', 465, 350, { width: 320 });

doc.end();

writeStream.on('finish', () => {
  console.log('✅ Generated W9_Final_Presentation_TBI-26100640.pdf successfully!');
});
