import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAlternativeLanguageUrls, stripLanguageFromPath } from '../utils/languageRoutes';
import { RoutesEnum } from '../models/RoutesEnum';

const SEOHead: React.FC = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Get the current route without language prefix
    const currentRoute = stripLanguageFromPath(location.pathname) as RoutesEnum;
    const alternativeUrls = getAlternativeLanguageUrls(currentRoute);

    // Remove existing hreflang links
    const existingLinks = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingLinks.forEach((link) => link.remove());

    // Add new hreflang links
    Object.entries(alternativeUrls).forEach(([lang, url]) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = url;
      document.head.appendChild(link);
    });

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }

    // Set canonical to current language version
    const currentLang = i18n.language || 'he';
    canonical.setAttribute('href', alternativeUrls[currentLang] || alternativeUrls.he);
  }, [location.pathname, i18n.language]);

  return null; // This component only manages head elements
};

export default SEOHead;
