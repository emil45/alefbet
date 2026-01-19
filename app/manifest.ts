import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'לפדי - לימוד אותיות עברית לילדים',
    short_name: 'לפדי',
    description:
      'פלטפורמה חינוכית אינטראקטיבית לילדים - למדו אותיות עברית, מספרים, צבעים, צורות וחיות עם משחקים מהנים',
    start_url: '/',
    display: 'standalone',
    background_color: '#e7d1ba',
    theme_color: '#e7d1ba',
    orientation: 'any',
    scope: '/',
    lang: 'he',
    dir: 'rtl',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon' as any,
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['education', 'kids', 'learning', 'hebrew', 'games'],
    shortcuts: [
      {
        name: 'אותיות עברית',
        short_name: 'אותיות',
        description: 'למדו את כל האותיות העבריות',
        url: '/letters',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
          },
        ],
      },
      {
        name: 'מספרים',
        short_name: 'מספרים',
        description: 'למדו מספרים 1-10',
        url: '/numbers',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
          },
        ],
      },
      {
        name: 'משחקים',
        short_name: 'משחקים',
        description: 'משחקי למידה מהנים',
        url: '/games',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
          },
        ],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}
