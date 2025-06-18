// src/config/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCbofbfLLzZN515clAYMl2xZeAHFdgcGB8",
  authDomain: "movieshub-bc994.firebaseapp.com",
  projectId: "movieshub-bc994",
  storageBucket: "movieshub-bc994.firebasestorage.app", 
  messagingSenderId: "1040813171873",
  appId: "1:1040813171873:web:24ea93a1ab83630af9bce0"
};

const app = initializeApp(firebaseConfig);

// Export Firebase Auth
export const auth = getAuth(app);
export const db = getFirestore(app)
export default app;
