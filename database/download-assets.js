const fs = require('fs');
const path = require('path');

const clientDir = path.join(__dirname, '..', 'public', 'uploads', 'clients');
const teamDir = path.join(__dirname, '..', 'public', 'uploads', 'team');

if (!fs.existsSync(clientDir)) fs.mkdirSync(clientDir, { recursive: true });
if (!fs.existsSync(teamDir)) fs.mkdirSync(teamDir, { recursive: true });

async function downloadFile(url, dest) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed ${url}: ${res.status}`);
      return false;
    }
    const arrayBuffer = await res.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(arrayBuffer));
    console.log(`Saved: ${dest}`);
    return true;
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
    return false;
  }
}

async function main() {
  // Download client logos 1 to 21
  for (let i = 1; i <= 21; i++) {
    let url = `https://swayamurja.com/wp-content/uploads/2025/09/${i}-1229x1536.png`;
    if (i === 10) url = `https://swayamurja.com/wp-content/uploads/2025/09/10-2-1229x1536.png`;
    if (i === 11) url = `https://swayamurja.com/wp-content/uploads/2025/09/11-2-1229x1536.png`;
    if (i === 12) url = `https://swayamurja.com/wp-content/uploads/2025/09/12-1-1229x1536.png`;
    if (i === 13) url = `https://swayamurja.com/wp-content/uploads/2025/09/13-1-1229x1536.png`;

    await downloadFile(url, path.join(clientDir, `client-${i}.png`));
  }

  // Also spark and unique logos
  await downloadFile('https://swayamurja.com/wp-content/uploads/2026/09/spark_engineers___india_logo.png', path.join(clientDir, 'spark-engineers.png'));
  await downloadFile('https://swayamurja.com/wp-content/uploads/2026/09/unique_logo.png', path.join(clientDir, 'unique-tools.png'));

  // Download team photo & Rahul Nalawade photo
  await downloadFile('https://swayamurja.com/wp-content/uploads/2023/08/rahul-nalawade-768x768.jpg', path.join(teamDir, 'rahul-nalawade.jpg'));
  await downloadFile('https://swayamurja.com/wp-content/uploads/2026/05/our-team-1024x576.png', path.join(teamDir, 'our-team.png'));

  console.log('All downloads completed!');
}

main();
