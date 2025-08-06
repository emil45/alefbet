import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCurrentLanguageFromPath } from '../utils/languageRoutes';

interface LanguageRouteWrapperProps {
  children: React.ReactNode;
}

const LanguageRouteWrapper: React.FC<LanguageRouteWrapperProps> = ({ children }) => {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Extract language from current path
    const langFromPath = getCurrentLanguageFromPath();
    
    // Only change language if it's different from current
    if (i18n.language !== langFromPath) {
      i18n.changeLanguage(langFromPath);
    }
  }, [location.pathname, i18n]);

  return <>{children}</>;
};

export default LanguageRouteWrapper;