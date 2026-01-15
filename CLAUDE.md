# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lepdy is a Hebrew learning web application for children ages 2-7. It teaches Hebrew letters, numbers, colors, shapes, animals, and food through interactive cards and educational games.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

### Next.js App Router with Internationalization

- Uses Next.js 16 with App Router and `next-intl` for i18n
- Locales: Hebrew (he, default, RTL), English (en), Russian (ru)
- Routes: `app/[locale]/` - locale is a dynamic segment
- Hebrew is the default locale and uses the root path (`/`), other locales use prefix (`/en`, `/ru`)
- Configuration: `i18n/config.ts` (locales, directions), `i18n/request.ts` (next-intl setup)
- Translation files: `messages/{he,en,ru}.json`

### Page Pattern

Pages follow a consistent server/client split:
- `page.tsx`: Server component that sets locale with `setRequestLocale()`, generates metadata via `lib/seo.ts`, renders a `*Content.tsx` client component
- `*Content.tsx`: Client component with `'use client'` directive containing interactive logic

### Learning Categories

Content in `data/` directory as TypeScript arrays with items containing:
- `id`, `translationKey`, `audioFile`, `color`
- Categories: letters, numbers, colors, shapes, animals, food

The `CategoryPage` component (`components/CategoryPage.tsx`) renders category items as interactive cards with audio playback. It supports multiple render modes: text, image, element, color.

### Games

Located in `app/[locale]/games/`:
- **guess-game**: Quiz-style game to identify items
- **memory-match-game**: Card matching game
- **simon-game**: Sequence memory game
- **speed-challenge**: Timed challenge
- **word-builder**: Word construction game
- **letter-rain**: Falling letters game (ages 5-7)

### Audio

- Category audio: `/public/audio/{category}/he/{filename}.mp3`
- Game sounds: `/public/audio/common/` - managed via `utils/audio.ts` with `AudioSounds` enum
- Use `playSound(AudioSounds.X)` for game effects, `playAudio(path)` for category item audio

### Theming

- MUI (Material-UI) theming with RTL/LTR support
- Theme defined in `theme/theme.ts` with custom pastel color palette
- Direction passed through `Providers` component which creates directional MUI theme

### Analytics

- Amplitude: initialized in `providers.tsx`, events defined in `models/amplitudeEvents.ts`
- Google Analytics 4 + Google Ads: loaded in locale layout
