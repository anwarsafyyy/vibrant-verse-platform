import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAN3lxmoyFYFZgYhuzwqYhFFbA5MtPbHz4",
  authDomain: "oluwe-95bb0.firebaseapp.com",
  projectId: "oluwe-95bb0",
  storageBucket: "oluwe-95bb0.firebasestorage.app",
  messagingSenderId: "1006436836513",
  appId: "1:1006436836513:web:25639400d67c2c5383fce0",
  measurementId: "G-TB8WR5BSBN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Initialize Analytics (only in browser environment)
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics, db, auth, storage };
