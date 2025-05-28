// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB_NKIibJckswc6vCC5dkXdJHyim639-E",
  authDomain: "safepass-ffb3d.firebaseapp.com",
  projectId: "safepass-ffb3d",
  storageBucket: "safepass-ffb3d.firebasestorage.app",
  messagingSenderId: "459801101586",
  appId: "1:459801101586:web:5009892a87c38454029fcb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);
