import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve(process.cwd(), 'out');
const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || '/Swayamurja-Production').replace(/\/+$/, '');

if (!fs.existsSync(OUT_DIR)) {
  console.error('Missing out/ directory. Run STATIC_EXPORT=true npm run build first.');
  process.exit(1);
}

// Ensure GitHub Pages serves _next/ files without Jekyll ignoring underscore folders
fs.writeFileSync(path.join(OUT_DIR, '.nojekyll'), '');

const ASSET_PREFIX_RE = new RegExp(
  `(["'\`(])\\/(?!${BASE_PATH.slice(1)}\\/)(uploads|assets|images|favicon|apple-touch-icon)`,
  'g'
);

let touched = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (/\.(html|js|css|json)$/i.test(entry.name)) {
      const orig = fs.readFileSync(full, 'utf8');
      const next = orig.replace(ASSET_PREFIX_RE, `$1${BASE_PATH}/$2`);
      if (next !== orig) {
        fs.writeFileSync(full, next, 'utf8');
        touched++;
      }
    }
  }
}

walk(OUT_DIR);
console.log(`GitHub Pages asset prefixing complete (${BASE_PATH}): updated ${touched} files + wrote out/.nojekyll`);
