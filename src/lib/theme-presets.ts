export interface SiteTheme {
  id: string;
  name: string;
  heroBackground: 'midnight-slate' | 'dark-navy' | 'clean-light' | 'emerald-green';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  tagline: string;
}

export const THEME_PRESETS: SiteTheme[] = [
  {
    id: 'logo-official',
    name: '🌟 Official SwayamUrja Logo Theme',
    heroBackground: 'midnight-slate',
    primaryColor: '#f59e0b',
    secondaryColor: '#0284c7',
    accentColor: '#16a34a',
    tagline: 'Warm Solar Gold, Sky Water Blue & Fresh Eco Leaf Green from the official logo. Modern & premium.'
  },
  {
    id: 'solar-gold-navy',
    name: '☀️ Solar Gold & Midnight Navy',
    heroBackground: 'dark-navy',
    primaryColor: '#f59e0b',
    secondaryColor: '#2563eb',
    accentColor: '#38bdf8',
    tagline: 'Deep corporate midnight sapphire with radiant solar amber highlights. Clean & enterprise-grade.'
  },
  {
    id: 'clean-light',
    name: '🌤️ Clean Daylight & Pure White',
    heroBackground: 'clean-light',
    primaryColor: '#ea580c',
    secondaryColor: '#0284c7',
    accentColor: '#10b981',
    tagline: 'Crisp, airy white background with radiant solar amber and fresh sky blue accents. Highly readable.'
  },
  {
    id: 'clean-tech-blue',
    name: '⚡ High-Tech Electric Azure',
    heroBackground: 'dark-navy',
    primaryColor: '#0284c7',
    secondaryColor: '#f59e0b',
    accentColor: '#10b981',
    tagline: 'Futuristic clean-energy grid azure paired with gold solar rays.'
  },
  {
    id: 'deep-emerald',
    name: '🌲 Classic Deep Forest Green (Legacy)',
    heroBackground: 'emerald-green',
    primaryColor: '#064e3b',
    secondaryColor: '#f59e0b',
    accentColor: '#10b981',
    tagline: 'The original dark forest green theme (for comparison).'
  }
];

export const DEFAULT_THEME: SiteTheme = THEME_PRESETS[0];
