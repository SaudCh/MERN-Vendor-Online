import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
    apiKey: "AIzaSyDict8drhyLP4JJriwyR_qiU9pzNPuKiIE",
    authDomain: "squatting-toad-b9bb8.firebaseapp.com",
    projectId: "squatting-toad-b9bb8",
    storageBucket: "squatting-toad-b9bb8.appspot.com",
    messagingSenderId: "526046657496",
    appId: "1:526046657496:web:e333696ab52e3be44dd0ad",
    measurementId: "G-E9VHN6TC8T"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
