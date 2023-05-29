import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
    apiKey: "AIzaSyDUtRKjxb41gxaIkY7rb4eon9U5z_UxvA4",
    authDomain: "vendoronline-a7812.firebaseapp.com",
    projectId: "vendoronline-a7812",
    storageBucket: "vendoronline-a7812.appspot.com",
    messagingSenderId: "333679678692",
    appId: "1:333679678692:web:b07c2ca554e3f7242388f1"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
