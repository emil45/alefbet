import type { FirebaseApp } from 'firebase/app';

export const firebaseConfig = {
  apiKey: 'AIzaSyCUIRCYj-xmI3dsxN_PV99JvpErVfvQyKo',
  authDomain: 'lepdy-c29da.firebaseapp.com',
  databaseURL: 'https://lepdy-c29da-default-rtdb.firebaseio.com',
  projectId: 'lepdy-c29da',
  storageBucket: 'lepdy-c29da.firebasestorage.app',
  messagingSenderId: '1056907902981',
  appId: '1:1056907902981:web:740300b72dd4812bf0dc6c',
};

let app: FirebaseApp | null = null;

/**
 * Get the Firebase app instance, initializing if needed.
 * Uses getApps() check to prevent duplicate-app errors.
 */
export async function getFirebaseApp(): Promise<FirebaseApp> {
  if (!app) {
    const { initializeApp, getApps, getApp } = await import('firebase/app');
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  }
  return app;
}
