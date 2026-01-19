import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.lepdy.com';

type Route = {
  path: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly';
};

const routes: Route[] = [
  // Homepage
  { path: '', priority: 1.0, changeFrequency: 'daily' },

  // SEO Landing Page
  { path: '/learn', priority: 0.95, changeFrequency: 'daily' },

  // Learning Categories
  { path: '/letters', priority: 0.9, changeFrequency: 'daily' },
  { path: '/numbers', priority: 0.9, changeFrequency: 'daily' },
  { path: '/colors', priority: 0.8, changeFrequency: 'daily' },
  { path: '/shapes', priority: 0.8, changeFrequency: 'daily' },
  { path: '/animals', priority: 0.8, changeFrequency: 'daily' },
  { path: '/food', priority: 0.8, changeFrequency: 'daily' },

  // Games
  { path: '/games', priority: 0.7, changeFrequency: 'daily' },
  { path: '/games/word-builder', priority: 0.6, changeFrequency: 'daily' },
  { path: '/games/guess-game', priority: 0.6, changeFrequency: 'daily' },
  { path: '/games/memory-match-game', priority: 0.6, changeFrequency: 'daily' },
  { path: '/games/simon-game', priority: 0.6, changeFrequency: 'daily' },
  { path: '/games/speed-challenge', priority: 0.6, changeFrequency: 'daily' },
  { path: '/games/letter-rain', priority: 0.6, changeFrequency: 'daily' },
  { path: '/games/counting-game', priority: 0.6, changeFrequency: 'daily' },

  // Other
  { path: '/stickers', priority: 0.6, changeFrequency: 'daily' },

  // Info Pages
  { path: '/about', priority: 0.5, changeFrequency: 'weekly' },
  { path: '/safety', priority: 0.5, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.5, changeFrequency: 'weekly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: {
        he: `${BASE_URL}${route.path}`,
        en: `${BASE_URL}/en${route.path}`,
        ru: `${BASE_URL}/ru${route.path}`,
      },
    },
  }));
}
