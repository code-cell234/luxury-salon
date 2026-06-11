import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnFoeqjOHvuQqz_uWpwcCXOnxkp4j5MRY",
  authDomain: "luxury-salon-58eea.firebaseapp.com",
  projectId: "luxury-salon-58eea",
  storageBucket: "luxury-salon-58eea.firebasestorage.app",
  messagingSenderId: "144468905416",
  appId: "1:144468905416:web:0877a4bc31633be37bc4fd",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);
console.log("Firebase file loaded");

