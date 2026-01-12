# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lepdy is an educational Hebrew learning web app for children. It teaches Hebrew letters (alef-bet), numbers, colors, shapes, animals, and food through interactive pages and games.

## Commands

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production (outputs to `build/`)
- `npm run preview` - Preview production build
- `npm run format` - Format code with Prettier
- `npm run prerender:local` - Build and prerender SEO pages using Puppeteer

## Architecture

### Multi-Language Routing System

The app supports Hebrew (default), English, and Russian with automatic route generation:

- Hebrew (default): No URL prefix (e.g., `/letters`)
- English/Russian: Prefixed URLs (e.g., `/en/letters`, `/ru/letters`)

Routes are defined in `src/models/RoutesEnum.ts` and automatically generated for all languages by `src/components/RouteGenerator.tsx`. Language configuration lives in `src/config/languages.ts`.

### Data Model Pattern

Learning content (letters, numbers, colors, etc.) follows a consistent pattern in `src/data/`:

```typescript
{
  type: ModelTypesEnum,      // Category enum
  id: string,                // Unique identifier (e.g., 'letter_1')
  translationKey: string,    // i18n key (e.g., 'letters.letter_1')
  audioFile: string,         // Audio file name
  color: string              // Display color
}
```

Translations are stored in `public/locales/{lang}/translation.json` with `name` and `fullName` for each item.

### Audio System

**Important**: All educational audio is exclusively Hebrew pronunciation, regardless of UI language. The UI supports Hebrew/English/Russian, but the learning content audio is Hebrew-only.

- Per-item audio: `/audio/{audioFile}` - Hebrew pronunciation for letters, numbers, etc.
- Game sounds: `/audio/common/` - UI feedback sounds
- Use `playAudio(path)` for item pronunciation, `playSound(AudioSounds.X)` for game feedback

### Key Directories

- `src/pages/` - Page components (one per route)
- `src/components/` - Reusable UI components
- `src/data/` - Static learning content arrays
- `src/models/` - TypeScript enums and interfaces
- `src/utils/` - i18n setup, audio utilities, route helpers
- `public/locales/` - Translation JSON files per language

### Theme and Direction

The app uses MUI with RTL/LTR support based on language. `ThemeContext` manages direction switching automatically when language changes. Hebrew uses RTL; English and Russian use LTR.

**Content direction overrides**: Hebrew letters always display RTL regardless of UI language (CSS overrides with `!important`). Numbers always display LTR even in Hebrew UI since digits are universal.

### Adding a New Language

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
3. Routes are automatically generated with the new prefix (e.g., `/es/letters`)
