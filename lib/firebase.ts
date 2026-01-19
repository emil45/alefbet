import type { FirebaseApp } from 'firebase/app';
import type { Database } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCUIRCYj-xmI3dsxN_PV99JvpErVfvQyKo',
  authDomain: 'lepdy-c29da.firebaseapp.com',
  databaseURL: 'https://lepdy-c29da-default-rtdb.firebaseio.com',
  projectId: 'lepdy-c29da',
  storageBucket: 'lepdy-c29da.firebasestorage.app',
  messagingSenderId: '1056907902981',
  appId: '1:1056907902981:web:740300b72dd4812bf0dc6c',
};

let app: FirebaseApp | null = null;
let database: Database | null = null;

// Lazy initialization - only loads Firebase when first needed
async function getFirebaseDatabase(): Promise<Database> {
  if (!database) {
    const { initializeApp } = await import('firebase/app');
    const { getDatabase } = await import('firebase/database');
    app = initializeApp(firebaseConfig);
    database = getDatabase(app);
  }
  return database;
}

export interface LeaderboardEntry {
  score: number;
  timestamp: number;
}

export async function submitScore(game: string, score: number): Promise<void> {
  try {
    const db = await getFirebaseDatabase();
    const { ref, set } = await import('firebase/database');
    const recordRef = ref(db, `leaderboard/${game}`);
    await set(recordRef, { score, timestamp: Date.now() });
    console.log('Score submitted:', score);
  } catch (error) {
    console.error('Failed to submit score:', error);
  }
}

export async function getTopScore(game: string): Promise<LeaderboardEntry | null> {
  try {
    const db = await getFirebaseDatabase();
    const { ref, get } = await import('firebase/database');
    const recordRef = ref(db, `leaderboard/${game}`);
    const snapshot = await get(recordRef);
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Failed to get score:', error);
    return null;
  }
}
