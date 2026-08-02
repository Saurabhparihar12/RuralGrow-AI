const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function captureRealScreenshots() {
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('🚀 Launching headless Chrome browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();

  // 1. Screenshot 1: Live Vercel App Homepage
  console.log('[1/4] Capturing Live Vercel App Homepage...');
  await page.goto('https://rural-grow-58fsd5yhj-rural-grow-ai.vercel.app/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  const shot1Path = path.join(screenshotsDir, 'screenshot_1_vercel.png');
  await page.screenshot({ path: shot1Path, fullPage: false });
  console.log('Saved:', shot1Path);

  // 2. Screenshot 2: Live Render Backend REST API
  console.log('[2/4] Capturing Live Render Backend REST API...');
  await page.goto('https://ruralgrow-ai.onrender.com/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  const shot2Path = path.join(screenshotsDir, 'screenshot_2_render.png');
  await page.screenshot({ path: shot2Path, fullPage: false });
  console.log('Saved:', shot2Path);

  // 3. Screenshot 3: Live Dashboard & Sentiment Graph
  console.log('[3/4] Capturing Live Dashboard & Sentiment Analytics...');
  await page.goto('https://rural-grow-58fsd5yhj-rural-grow-ai.vercel.app/dashboard', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));
  const shot3Path = path.join(screenshotsDir, 'screenshot_3_dashboard.png');
  await page.screenshot({ path: shot3Path, fullPage: false });
  console.log('Saved:', shot3Path);

  // 4. Screenshot 4: Live AI Assistant
  console.log('[4/4] Capturing Live HimalayaGrow AI Assistant...');
  await page.goto('https://rural-grow-58fsd5yhj-rural-grow-ai.vercel.app/ai-assistant', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));

  // Type a sample question into AI Assistant prompt box if present
  try {
    const inputSelector = 'input[type="text"], textarea';
    await page.waitForSelector(inputSelector, { timeout: 3000 });
    await page.type(inputSelector, 'What is the best crop rotation for Mussoorie terrace farms?');
    const sendButton = await page.$('button[type="submit"], button.bg-forest-900, button');
    if (sendButton) {
      await sendButton.click();
      await new Promise(r => setTimeout(r, 3000));
    }
  } catch(e) {
    console.log('Prompt input interaction notice:', e.message);
  }

  const shot4Path = path.join(screenshotsDir, 'screenshot_4_ai_assistant.png');
  await page.screenshot({ path: shot4Path, fullPage: false });
  console.log('Saved:', shot4Path);

  await browser.close();
  console.log('✅ ALL 4 REAL SCREENSHOTS CAPTURED SUCCESSFULLY!');
}

captureRealScreenshots().catch(err => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
