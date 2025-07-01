// Firebase SDK v9 compat version (used with -compat libraries)
const firebaseConfig = {
  apiKey: "AIzaSyAwaM9fk8464I39wCGcLDGANvKyhgB__so",
  authDomain: "student-teaching-c91d5.firebaseapp.com",
  projectId: "student-teaching-c91d5",
  storageBucket: "student-teaching-c91d5.appspot.com",
  messagingSenderId: "265212909874",
  appId: "1:265212909874:web:2cb7fdc98858d2e6aadf2b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Optionally enable services globally (used in script.js)
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

