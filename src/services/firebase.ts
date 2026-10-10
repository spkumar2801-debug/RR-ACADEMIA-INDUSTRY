import { initializeApp, getApps, getApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import type { Firestore } from "firebase/firestore";

// Public Firebase Client Configuration
// Reads from Vite environment variables (VITE_ prefix) with verified project fallbacks
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCyx3-TJnPE6MXFcPYu0sjc-0EpkeP_VCo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "rr-academia.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "rr-academia",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "rr-academia.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "490631009517",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:490631009517:web:b5d16fd83a7a6c39e928e4",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-WCCB5E5W71"
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let isFirebaseInitialized = false;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  isFirebaseInitialized = true;

  // Safe development diagnostics (never logs private credentials or secrets)
  if (import.meta.env.DEV) {
    const maskedKey = firebaseConfig.apiKey
      ? `${firebaseConfig.apiKey.slice(0, 6)}...${firebaseConfig.apiKey.slice(-4)}`
      : "[MISSING]";
    console.info(
      `%c[Firebase Config Audit]%c App initialized: "${app.name}" | Project: "${firebaseConfig.projectId}" | AuthDomain: "${firebaseConfig.authDomain}" | API Key: ${maskedKey}`,
      "color: #D4AF37; font-weight: bold;",
      "color: #94A3B8;"
    );
  }
} catch (error) {
  console.warn("Firebase client initialization warning:", error);
}

export interface FirebaseDiagnosticInfo {
  isInitialized: boolean;
  projectId: string;
  authDomain: string;
  hasApiKey: boolean;
  apiKeyMasked: string;
  appName: string;
}

export function getFirebaseDiagnosticInfo(): FirebaseDiagnosticInfo {
  const key = firebaseConfig.apiKey || "";
  return {
    isInitialized: isFirebaseInitialized && Boolean(app),
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    hasApiKey: Boolean(key && key !== "your_firebase_api_key_here"),
    apiKeyMasked: key.length > 10 ? `${key.slice(0, 6)}...${key.slice(-4)}` : "[INVALID/MISSING]",
    appName: app?.name || "none"
  };
}

export { app, auth, db, isFirebaseInitialized, firebaseConfig };
