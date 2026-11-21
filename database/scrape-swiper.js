const fs = require('fs');

async function scrapeSwiper() {
  const res = await fetch('https://swayamurja.com/');
  const text = await res.text();
  const idx = text.indexOf('Our Clients');
  if (idx !== -1) {
    const raw = text.substring(idx - 200, idx + 8000);
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let match;
    const clientLogos = [];
    while ((match = imgRegex.exec(raw)) !== null) {
      clientLogos.push(match[1]);
    }
    console.log('Client logo URLs found in carousel:', [...new Set(clientLogos)]);
  }
}

scrapeSwiper();
