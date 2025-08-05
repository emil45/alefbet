# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Alefbet is a Hebrew educational web application built with React and TypeScript. It's designed as an interactive learning platform for children to learn Hebrew letters, numbers, colors, and shapes through various educational games and activities.

## Development Commands

### Core Development
- `npm start` - Start development server at http://localhost:3000
- `npm run build` - Build production bundle
- `npm test` - Run tests in watch mode
- `npm run format` - Format code using Prettier

### Code Quality
The project uses ESLint configuration from Create React App. TypeScript strict mode is enabled in tsconfig.json.

## Architecture & Structure

### Application Framework
- **Framework**: React 18 with TypeScript and Create React App
- **UI Library**: Material-UI (MUI) v5 with emotion styling
- **Routing**: React Router v6
- **Internationalization**: i18next with Hebrew (he) as fallback language and English (en) support
- **Analytics**: Amplitude for usage tracking
- **Audio**: Native HTML5 audio for educational content

### Key Directories
- `src/pages/` - Main application pages (HomePage, LettersPage, NumbersPage, etc.)
- `src/components/` - Reusable UI components (FunButton, ItemCard, game components)
- `src/data/` - Educational content data (letters, numbers, colors, shapes)
- `src/models/` - TypeScript interfaces and enums
- `src/utils/` - Utility functions (i18n, audio, amplitude, common helpers)
- `src/context/` - React contexts (ThemeContext for RTL/LTR support)
- `public/audio/` - Audio files organized by category (letters/he/, numbers/he/, etc.)
- `public/locales/` - Translation files (en/translation.json, he/translation.json)

### Application Structure
The app follows a single-page application pattern with:
- Route-based navigation using RoutesEnum
- Centralized theme management with RTL/LTR support
- Educational content organized by categories (letters, numbers, colors, shapes)
- Interactive games (GuessGame, MemoryMatch, Simon)
- Audio-first learning experience with Hebrew pronunciation

### Internationalization & RTL Support
- Hebrew (he) is the primary language with RTL layout
- English (en) secondary with LTR layout
- ThemeContext automatically switches direction based on language
- Translation files use nested JSON structure
- Language detection via browser settings

### Educational Content Pattern
Each educational category follows a consistent model:
- Data files export arrays of educational items
- Each item has: name, full name, audio file path, color
- Audio files located in `public/audio/{category}/he/`
- UI components render items using ItemCard with audio playback

### Game Architecture
Games are implemented as separate pages with:
- State management for game logic
- Audio feedback for interactions
- Responsive design for mobile/tablet use
- Confetti animations for celebrations