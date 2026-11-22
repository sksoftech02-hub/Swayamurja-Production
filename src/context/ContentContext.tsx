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
    try {
      const res = await fetch('/api/content', { cache: 'no-store' });
      const data = await res.json();
      if (data.success && data.content) {
        setContent(data.content);
      }
    } catch (err) {
      console.error('Failed to load content from CMS:', err);
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
