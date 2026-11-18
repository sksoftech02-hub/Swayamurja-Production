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
      // Use cache: 'no-store' to guarantee fresh data from disk/database
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

    // Auto-refresh when tab gains focus
    const handleFocus = () => {
      refreshContent();
    };
    window.addEventListener('focus', handleFocus);

    // Instant sync when CMS is saved from another tab in the same browser
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'swayamurja_cms_updated') {
        refreshContent();
      }
    };
    window.addEventListener('storage', handleStorage);

    // Lightweight background heartbeat poll every 30 seconds
    const interval = setInterval(refreshContent, 30000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
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
