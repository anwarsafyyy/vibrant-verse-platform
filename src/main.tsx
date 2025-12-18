import { createRoot } from "react-dom/client";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import App from "./App.tsx";
import "./index.css";
import { auth } from "./lib/firebase";

// Try to ensure public pages can read Firestore when rules require auth.
// If anonymous auth isn't enabled in Firebase, this will fail silently.
onAuthStateChanged(auth, (user) => {
  if (!user) {
    signInAnonymously(auth).catch(() => {
      // ignore
    });
  }
});

createRoot(document.getElementById("root")!).render(<App />);

