'use client';

import { useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import { DEFAULT_THEME, SiteTheme } from '@/lib/theme-presets';

const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/;

function sanitizeHexColor(value: string | undefined, fallback: string): string {
  if (typeof value === 'string' && HEX_COLOR_RE.test(value.trim())) {
    return value.trim();
  }
  return fallback;
}

export const ThemeApplier: React.FC = () => {
  const { content } = useContent();
  const theme: SiteTheme = content?.theme || DEFAULT_THEME;

  useEffect(() => {
    if (!theme) return;
    const root = document.documentElement;
    const primary = sanitizeHexColor(theme.primaryColor, '#f59e0b');
    const secondary = sanitizeHexColor(theme.secondaryColor, '#0284c7');
    const accent = sanitizeHexColor(theme.accentColor, '#16a34a');

    root.style.setProperty('--primary', primary);
    root.style.setProperty('--secondary', secondary);
    root.style.setProperty('--accent', accent);
    root.setAttribute('data-theme-id', (theme.id || 'logo-official').replace(/[^a-zA-Z0-9_-]/g, ''));
    root.setAttribute('data-hero-bg', (theme.heroBackground || 'midnight-slate').replace(/[^a-zA-Z0-9_-]/g, ''));

    let styleTag = document.getElementById('dynamic-theme-style') as HTMLStyleElement | null;
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'dynamic-theme-style';
      document.head.appendChild(styleTag);
    }

    styleTag.textContent = `
      :root {
        --primary: ${primary} !important;
        --secondary: ${secondary} !important;
        --accent: ${accent} !important;
      }
      .theme-btn-primary {
        background-color: ${primary} !important;
        color: #ffffff !important;
        box-shadow: 0 10px 25px -5px ${primary}80 !important;
      }
      .theme-btn-primary:hover {
        opacity: 0.92 !important;
        transform: translateY(-1px) !important;
      }
      .theme-btn-secondary {
        border-color: ${secondary}80 !important;
        color: ${secondary} !important;
      }
      .theme-text-primary {
        color: ${primary} !important;
      }
      .theme-text-secondary {
        color: ${secondary} !important;
      }
      .theme-border-primary {
        border-color: ${primary} !important;
      }
      .text-shimmer {
        background: linear-gradient(90deg, ${primary} 0%, #ffffff 50%, ${primary} 100%) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
      }
      .brand-gradient {
        background: linear-gradient(135deg, ${primary} 0%, ${secondary} 100%) !important;
      }
    `;
  }, [theme]);

  return null;
};
