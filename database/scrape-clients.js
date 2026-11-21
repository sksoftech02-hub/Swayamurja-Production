const fs = require('fs');

async function scrapeClients() {
  try {
    const res = await fetch('https://swayamurja.com/');
    const text = await res.text();
    const imgs = text.match(/https:\/\/[^"'\s>]+\.(?:png|jpg|jpeg|webp)/gi) || [];
    const filtered = imgs.filter(i => {
      const lower = i.toLowerCase();
      return lower.includes('client') || lower.includes('spark') || lower.includes('ajanta') || lower.includes('baps') || lower.includes('unique') || lower.includes('ftg') || lower.includes('sun');
    });
    console.log('Filtered client images:', [...new Set(filtered)]);

    // Check carousel or logo slider in text
    const idx = text.indexOf('Our Clients');
    if (idx !== -1) {
      console.log('Our Clients section snippet:', text.substring(idx, idx + 2500).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
    }
  } catch (e) {
    console.error(e);
  }
}

scrapeClients();
