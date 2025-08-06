import React from 'react';
import { Route } from 'react-router-dom';
import { RoutesEnum } from '../models/RoutesEnum';
import { SUPPORTED_LANGUAGES } from '../config/languages';
import LanguageRouteWrapper from './LanguageRouteWrapper';

// Route to component mapping - Import all pages
import HomePage from '../pages/HomePage';
import LettersPage from '../pages/LettersPage';
import NumbersPage from '../pages/NumbersPage';
import ColorsPage from '../pages/ColorsPage';
import ShapesPage from '../pages/ShapesPage';
import AnimalsPage from '../pages/AnimalsPage';
import FoodPage from '../pages/FoodPage';
import SEOPage from '../pages/SEOPage';
import EducationalGuidePage from '../pages/EducationalGuidePage';
import GuessGamePage from '../pages/GuessGamePage';
import MemoryMatchGamePage from '../pages/MemoryMatchGamePage';
import SimonGamePage from '../pages/SimonGamePage';
import GamesPage from '../pages/GamesPage';

const ROUTE_COMPONENTS: Record<RoutesEnum, React.ComponentType> = {
  [RoutesEnum.HOME]: HomePage,
  [RoutesEnum.SEO]: SEOPage,
  [RoutesEnum.GUIDE]: EducationalGuidePage,
  [RoutesEnum.LETTERS]: LettersPage,
  [RoutesEnum.NUMBERS]: NumbersPage,
  [RoutesEnum.COLORS]: ColorsPage,
  [RoutesEnum.SHAPES]: ShapesPage,
  [RoutesEnum.ANIMALS]: AnimalsPage,
  [RoutesEnum.FOOD]: FoodPage,
  [RoutesEnum.GAMES]: GamesPage,
  [RoutesEnum.GUESS_GAME]: GuessGamePage,
  [RoutesEnum.MEMORY_MATCH_GAME]: MemoryMatchGamePage,
  [RoutesEnum.SIMON_GAME]: SimonGamePage,
};

/**
 * Generates all language-specific routes automatically
 * Eliminates manual duplication and makes adding new languages trivial
 */
export const generateAllRoutes = (): JSX.Element[] => {
  const routes: JSX.Element[] = [];

  // Generate routes for each supported language
  SUPPORTED_LANGUAGES.forEach(language => {
    Object.entries(ROUTE_COMPONENTS).forEach(([routePath, Component]) => {
      const route = routePath as RoutesEnum;
      
      // Build the full path for this language
      const fullPath = language.hasUrlPrefix 
        ? `/${language.code}${route}`
        : route;

      // Create unique key for React
      const key = `${language.code}-${route}`;

      routes.push(
        <Route 
          key={key}
          path={fullPath}
          element={
            <LanguageRouteWrapper>
              <Component />
            </LanguageRouteWrapper>
          }
        />
      );
    });
  });

  return routes;
};