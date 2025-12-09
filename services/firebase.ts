import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, Unsubscribe, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { Player } from "../types";

// --- CONFIGURATION ---
// 1. Set this to FALSE to use real Firebase
// 2. Paste your configuration below
const USE_MOCK_FIREBASE = import.meta.env.VITE_USE_MOCK_FIREBASE !== 'false';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

// --- REAL FIREBASE INITIALIZATION ---
let db: any;
if (!USE_MOCK_FIREBASE) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (e) {
    console.error("Firebase init error. Falling back to mock.", e);
  }
}

// --- MOCK DATA STORE & EVENT SYSTEM ---
// Initial mock data
const mockPlayers: Player[] = [
  { name: "Ana Dev", score: 950, tier: "DevFest Champion", timestamp: Date.now() },
  { name: "John Code", score: 720, tier: "DevFest Ninja", timestamp: Date.now() - 10000 },
  { name: "Clara Cloud", score: 450, tier: "DevFest Smart", timestamp: Date.now() - 20000 },
];

// Store active listeners for mock mode to simulate real-time updates
let mockListeners: Array<(players: Player[]) => void> = [];

const notifyMockListeners = () => {
  const sortedPlayers = [...mockPlayers].sort((a, b) => b.score - a.score);
  mockListeners.forEach(callback => callback(sortedPlayers));
};

// --- SERVICE METHODS ---

export const savePlayerScore = async (player: Omit<Player, 'id'>) => {
  if (!USE_MOCK_FIREBASE && db) {
    try {
      const q = query(collection(db, "leaderboard"), where("name", "==", player.name));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Player exists, update if new score is higher
        const docRef = querySnapshot.docs[0].ref;
        const currentData = querySnapshot.docs[0].data();

        if (player.score > currentData.score) {
           await updateDoc(docRef, {
             score: player.score,
             tier: player.tier,
             timestamp: Date.now()
           });
        }
      } else {
        // New player
        await addDoc(collection(db, "leaderboard"), {
          ...player,
          timestamp: Date.now()
        });
      }
    } catch (e) {
      console.error("Error saving score: ", e);
    }
  } else {
    // Mock Save
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const existingPlayerIndex = mockPlayers.findIndex(p => p.name === player.name);

    if (existingPlayerIndex !== -1) {
      if (player.score > mockPlayers[existingPlayerIndex].score) {
        mockPlayers[existingPlayerIndex] = {
          ...mockPlayers[existingPlayerIndex],
          score: player.score,
          tier: player.tier,
          timestamp: Date.now()
        };
      }
    } else {
      mockPlayers.push({
        ...player,
        timestamp: Date.now(),
        id: Math.random().toString()
      });
    }
    
    notifyMockListeners();
  }
};

export const subscribeToLeaderboard = (callback: (players: Player[]) => void): Unsubscribe => {
  if (!USE_MOCK_FIREBASE && db) {
    // Real Firebase Listener (Real-time)
    const q = query(collection(db, "leaderboard"), orderBy("score", "desc"), limit(50));
    return onSnapshot(q, (snapshot) => {
      const players = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Player[];
      callback(players);
    });
  } else {
    // Mock Subscription (Simulated Real-time)
    mockListeners.push(callback);
    
    // Send initial data immediately
    notifyMockListeners();

    // Return unsubscribe function
    return () => {
      mockListeners = mockListeners.filter(l => l !== callback);
    };
  }
};