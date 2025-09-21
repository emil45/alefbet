# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the "lepdy" project that powers lepdy.com - a Hebrew learning web application built with React and TypeScript. It's designed as an interactive platform for children to learn Hebrew through letters, numbers, colors, shapes, animals, and food with authentic Hebrew audio and multilingual UI support.

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
- `public/audio/` - Hebrew audio files organized by category (Hebrew pronunciation only)
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
- Audio-first Hebrew learning experience with authentic Hebrew pronunciation
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
- Hebrew-only audio for educational content with multilingual interface support

#### RTL/LTR Handling
- **Hebrew Letters**: Always display RTL regardless of UI language (forced with CSS overrides)
- **Numbers**: Always display LTR even in Hebrew UI (digits 0-9 are universal)
- **Smart Direction Detection**: ItemCard automatically detects content type and applies correct direction
- **CSS Overrides**: Aggressive RTL enforcement for Hebrew content with `!important` declarations

### Hebrew Learning Focus
**IMPORTANT**: This application is specifically designed for learning Hebrew, not multilingual education:
- **Educational Content**: All audio is exclusively Hebrew pronunciation
- **UI Languages**: Interface supports Hebrew, English, and Russian for accessibility
- **Audio Architecture**: Only Hebrew audio files are used (`/he/` directory)
- **Learning Goal**: Children learn Hebrew vocabulary and pronunciation regardless of UI language

### Educational Content Pattern
Each educational category follows a consistent Hebrew learning model:
- Data files export arrays of educational items with Hebrew audio
- Each item has: name, full name, Hebrew audio file path, color
- Audio files organized by category: `public/audio/{category}/he/`
- UI components render items using ItemCard with Hebrew audio playback
- All content focuses on Hebrew learning: letters (22 Hebrew letters), numbers (1-10 in Hebrew), colors, shapes, animals, food - all with Hebrew pronunciation
- Interface displays translated labels but audio is exclusively Hebrew

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
3. Add Hebrew audio files to `public/audio/{category}/he/` (audio remains Hebrew-only)
4. All 13 routes automatically generated with `/es/` prefix

### Page Structure
- **HomePage**: Main landing page with category navigation
- **Educational Pages**: LettersPage, NumbersPage, ColorsPage, ShapesPage, AnimalsPage, FoodPage
- **Game Pages**: GamesPage (hub), GuessGamePage, MemoryMatchGamePage, SimonGamePage
- **Utility Pages**: SEOPage (/learn)
- All pages wrapped in LanguageRouteWrapper for automatic language detection

### SEO & Performance
- **Hebrew Learning SEO**: Optimized for "Learn Hebrew" keywords across all languages
- **Complete Multilingual SEO**: 39-page sitemap with proper hreflang tags
- **Dynamic Meta Management**: SEOHead component manages canonical URLs and alternate language links
- **Social Media Ready**: Full Open Graph and Twitter Card support focused on Hebrew education
- **Search Engine Optimized**: Structured data (JSON-LD) for Hebrew educational content
- **Performance Optimized**: Route-based code splitting and lazy loading ready
- **Progressive Web App**: Full PWA manifest with offline capabilities
- **Consistent Messaging**: All SEO content emphasizes Hebrew learning across English/Russian/Hebrew interfaces