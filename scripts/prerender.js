const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const express = require('express');

// Routes to prerender - starting with critical SEO pages
const routes = [
  '/',           // Homepage (Hebrew)
  '/learn',      // SEO page (Hebrew)
  '/en/learn',   // SEO page (English)
  '/ru/learn',   // SEO page (Russian)
];

async function prerender() {
  console.log('🚀 Starting prerender process...');

  // Start a local server for the built app
  const app = express();
  app.use(express.static('build'));

  // Serve index.html for all routes (SPA fallback)
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });

  const server = app.listen(3847, () => {
    console.log('📦 Temporary server started on port 3847');
  });

  try {
    // Launch Puppeteer
    console.log('🌐 Launching browser...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'] // For Vercel compatibility
    });

    for (const route of routes) {
      console.log(`📄 Prerendering ${route}...`);

      const page = await browser.newPage();

      // Navigate to the route
      console.log(`🌍 Navigating to http://localhost:3847${route}...`);
      await page.goto(`http://localhost:3847${route}`, {
        waitUntil: 'networkidle0', // Wait until no network requests for 500ms
        timeout: 30000
      });
      console.log(`✅ Page loaded for ${route}`);

      // Debug: Check if root element exists
      const rootExists = await page.$('#root');
      console.log(`🔍 Root element exists: ${!!rootExists}`);

      // Wait for React to render - try multiple selectors
      try {
        await page.waitForSelector('#root > *', { timeout: 5000 });
      } catch (error) {
        console.log(`⚠️  Primary selector failed for ${route}, trying alternative...`);
        try {
          await page.waitForSelector('#root', { timeout: 5000 });
        } catch (error2) {
          console.log(`⚠️  Root selector failed for ${route}, waiting for body content...`);
          await page.waitForSelector('body', { timeout: 5000 });
        }
      }

      // Additional wait for i18n and dynamic content to load
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Get the fully rendered HTML
      const html = await page.content();

      // Determine the output path
      let outputPath;
      if (route === '/') {
        outputPath = path.join('static', 'index.html');
      } else {
        outputPath = path.join('static', route, 'index.html');
      }

      // Create directory if it doesn't exist
      await fs.mkdir(path.dirname(outputPath), { recursive: true });

      // Write the rendered HTML
      await fs.writeFile(outputPath, html, 'utf8');

      console.log(`✅ Pre-rendered ${route} → ${outputPath}`);
      await page.close();
    }

    await browser.close();
    console.log('🎉 Prerendering completed successfully!');

  } catch (error) {
    console.error('❌ Prerender failed:', error);
    process.exit(1);
  } finally {
    // Close the server
    server.close();
    console.log('🔌 Temporary server closed');
  }
}

// Run the prerender process
prerender().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});