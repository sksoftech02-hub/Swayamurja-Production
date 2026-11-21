const fs = require('fs');

async function scrape() {
  try {
    const res = await fetch('https://swayamurja.com/about-us/');
    const text = await res.text();
    const imgs = text.match(/https:\/\/[^"'\s>]+\.(?:png|jpg|jpeg|webp)/gi) || [];
    const unique = [...new Set(imgs)].filter(i => !i.includes('elementor/assets') && !i.includes('plugins'));
    console.log('Images found:', unique);

    const clientRes = await fetch('https://swayamurja.com/');
    const homeText = await clientRes.text();
    const homeImgs = homeText.match(/https:\/\/[^"'\s>]+\.(?:png|jpg|jpeg|webp)/gi) || [];
    const uniqueHome = [...new Set(homeImgs)].filter(i => i.includes('client') || i.includes('logo') || i.includes('uploads'));
    console.log('Home client images:', uniqueHome);
  } catch (err) {
    console.error('Scrape error:', err.message);
  }
}

scrape();
