// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6RnHqj-Va9AVrajcaQDOaCnT5-hcgHGs",
  authDomain: "deepshield-8420d.firebaseapp.com",
  projectId: "deepshield-8420d",
  storageBucket: "deepshield-8420d.firebasestorage.app",
  messagingSenderId: "38668285672",
  appId: "1:38668285672:web:4da036318564e3572f7b5d",
  measurementId: "G-G4XRHFPE6P"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { app, auth };
