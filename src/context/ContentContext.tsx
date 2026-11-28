'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SiteContent } from '@/lib/content-store';

interface ContentContextType {
  content: SiteContent | null;
  refreshContent: () => Promise<void>;
  loading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshContent = useCallback(async () => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    try {
      const res = await fetch(`${basePath}/api/content`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.content) {
          setContent(data.content);
          return;
        }
      }
      // Static GitHub Pages fallback when API server is not present
      const staticRes = await fetch(`${basePath}/static-content.json`);
      if (staticRes.ok) {
        const staticData = await staticRes.json();
        if (staticData) {
          setContent(staticData);
        }
      }
    } catch (err) {
      try {
        const staticRes = await fetch(`${basePath}/static-content.json`);
        if (staticRes.ok) {
          const staticData = await staticRes.json();
          if (staticData) setContent(staticData);
        }
      } catch {
        console.error('Failed to load content from CMS:', err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshContent();

    // Instant cross-tab sync when CMS is saved from Admin / Super Admin in the same browser
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'swayamurja_cms_updated') {
        refreshContent();
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [refreshContent]);

  return (
    <ContentContext.Provider value={{ content, refreshContent, loading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
