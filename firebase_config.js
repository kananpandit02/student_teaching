// Import Firebase v9+ modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAwaM9fk8464I39wCGcLDGANvKyhgB__so",
  authDomain: "student-teaching-c91d5.firebaseapp.com",
  projectId: "student-teaching-c91d5",
  storageBucket: "student-teaching-c91d5.appspot.com",
  messagingSenderId: "265212909874",
  appId: "1:265212909874:web:2cb7fdc98858d2e6aadf2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in script.js
export { auth, db };
