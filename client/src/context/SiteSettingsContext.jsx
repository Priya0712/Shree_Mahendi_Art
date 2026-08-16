import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const SiteSettingsContext = createContext({});

export const useSiteSettings = () => useContext(SiteSettingsContext);

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    // defaults so nothing breaks before fetch completes
    heroImage:       '/images/hero-bridal-mehendi.jpg',
    ownerPortrait:   '/images/owner-portrait.jpg',
    mehendiImage:    '/images/mehendi-both-hands.jpg',
    plainImage:      '/images/before-plain-hand.jpg',
    coneShalimar:    '/images/cones-shalimar.jpg',
    coneNatural:     '/images/cones-natural.jpg',
    whatsappNumber:  '8799008221',
    instagramUrl:    'https://www.instagram.com/pili_mahendi_nail_art_007',
    siteTitle:       'શ્રી મહેંદી',
  });

  const fetchSettings = async () => {
    try {
      const { data } = await api.get('/settings');
      setSettings(s => ({ ...s, ...data }));
    } catch {
      // use defaults on error
    }
  };

  useEffect(() => {
    fetchSettings();
    // Re-fetch whenever admin saves
    window.addEventListener('site-settings-updated', fetchSettings);
    return () => window.removeEventListener('site-settings-updated', fetchSettings);
  }, []);

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
};
