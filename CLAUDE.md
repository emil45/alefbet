# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the "alefbet" project that powers lepdy.com - a Hebrew educational web application built with React and TypeScript. It's designed as an interactive learning platform for children to learn Hebrew letters, numbers, colors, shapes, animals, and food through various educational games and activities.

## Development Commands

### Core Development
- `npm run dev` - Start development server (Vite)
- `npm run build` - Build production bundle (Vite)
- `npm run preview` - Preview production build locally
- `npm run format` - Format code using Prettier

### Code Quality
The project uses ESLint configuration from Create React App. TypeScript strict mode is enabled in tsconfig.json.

## Architecture & Structure

### Application Framework
- **Framework**: React 18 with TypeScript and Vite
- **UI Library**: Material-UI (MUI) v5 with emotion styling
- **Routing**: React Router v6
- **Internationalization**: i18next with Hebrew (he) as fallback language, English (en) and Russian (ru) support
- **Analytics**: Amplitude for usage tracking
- **Audio**: Native HTML5 audio for educational content
- **Animations**: React Confetti for celebrations

### Key Directories
- `src/pages/` - Main application pages (HomePage, LettersPage, NumbersPage, AnimalsPage, FoodPage, etc.)
- `src/components/` - Reusable UI components (FunButton, ItemCard, BackButton, CursorFollower, LanguageRouteWrapper, RouteGenerator, SEOHead)
- `src/config/` - Application configuration (languages.ts for centralized language settings)
- `src/data/` - Educational content data (letters, numbers, colors, shapes, animals, food)
- `src/models/` - TypeScript interfaces and enums (RoutesEnum, GameModeEnum, educational models)
- `src/utils/` - Utility functions (languageRoutes, i18n, audio, amplitude, common helpers)
- `src/context/` - React contexts (ThemeContext for RTL/LTR support)
- `src/theme/` - Theme configuration and color definitions
- `public/audio/` - Audio files organized by category with multi-language support (he/en/ru)
- `public/locales/` - Translation files (en/translation.json, he/translation.json, ru/translation.json)

### Application Structure
The app follows a single-page application pattern with:
- **Advanced Multilingual Routing**: 13 base routes × 3 languages = 39 routes auto-generated via RouteGenerator component
- **URL Structure**: Hebrew (default - no prefix), English (`/en/*`), Russian (`/ru/*`)
- **Language-Aware Navigation**: All navigation preserves current language context
- **SEO-Optimized**: Complete hreflang implementation with proper canonical URLs and sitemap
- Centralized theme management with RTL/LTR support
- Educational content organized by categories (letters, numbers, colors, shapes, animals, food)
- Interactive games (GuessGame, MemoryMatch, Simon) accessible from dedicated games page
- Audio-first learning experience with multilingual pronunciation (Hebrew, English, Russian)
- Responsive design with cursor following effects and smooth transitions

### Internationalization & RTL Support
- **Production-Grade Multilingual Architecture**: Centralized language configuration in `src/config/languages.ts`
- **URL-Based Language Detection**: Language automatically detected from URL path
- Hebrew (he) is the primary language with RTL layout (no URL prefix)
- English (en) and Russian (ru) secondary languages with LTR layout (with `/en/`, `/ru/` prefixes)
- **Dynamic Language Switching**: Preserves current page when switching languages
- **SEO-Complete**: Full hreflang tags, multilingual sitemap, and Open Graph support
- ThemeContext automatically switches direction based on language
- Translation files use nested JSON structure
- Multi-language audio support for educational content

### Educational Content Pattern
Each educational category follows a consistent model:
- Data files export arrays of educational items
- Each item has: name, full name, audio file path, color
- Audio files organized by category and language: `public/audio/{category}/{language}/`
- UI components render items using ItemCard with audio playback
- Categories include: letters (22 Hebrew letters), numbers (1-10), colors (12 colors), shapes (21 shapes), animals (20 animals), food items

### Game Architecture
Games are implemented as separate pages with:
- State management for game logic
- Audio feedback for interactions
- Responsive design for mobile/tablet use
- Confetti animations for celebrations
- Three main games: Guess Game (audio-based learning), Memory Match (card matching), Simon Says (sequence memory)
- Centralized games hub accessible via GamesPage
- Common game sounds and effects in `public/audio/common/`

### Advanced Architecture Components

#### Language System
- **`LanguageRouteWrapper`**: Automatically detects language from URL and updates i18n context
- **`RouteGenerator`**: Programmatically generates all 39 multilingual routes from single configuration
- **`SEOHead`**: Dynamically manages hreflang links and canonical URLs for each page
- **`src/config/languages.ts`**: Single source of truth for all language configuration

#### Adding New Languages
To add a new language (e.g., Spanish):
1. Add language config to `src/config/languages.ts`:
```typescript
{
  code: 'es',
  name: 'Español', 
  direction: 'ltr',
  isDefault: false,
  hasUrlPrefix: true,
}
```
2. Add translations to `public/locales/es/translation.json`
3. Add audio files to `public/audio/{category}/es/`
4. All 13 routes automatically generated with `/es/` prefix

### Page Structure
- **HomePage**: Main landing page with category navigation
- **Educational Pages**: LettersPage, NumbersPage, ColorsPage, ShapesPage, AnimalsPage, FoodPage
- **Game Pages**: GamesPage (hub), GuessGamePage, MemoryMatchGamePage, SimonGamePage
- **Utility Pages**: SEOPage (/learn), EducationalGuidePage (/guide)
- All pages wrapped in LanguageRouteWrapper for automatic language detection

### SEO & Performance
- **Complete Multilingual SEO**: 39-page sitemap with proper hreflang tags
- **Dynamic Meta Management**: SEOHead component manages canonical URLs and alternate language links
- **Social Media Ready**: Full Open Graph and Twitter Card support
- **Search Engine Optimized**: Structured data (JSON-LD) for educational content
- **Performance Optimized**: Route-based code splitting and lazy loading ready
- **Progressive Web App**: Full PWA manifest with offline capabilities