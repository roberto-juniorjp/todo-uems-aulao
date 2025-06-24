import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7HnRR3A-4GFfRY2Z-UtgGmbMWAONoh8w",
  authDomain: "appuems-d987a.firebaseapp.com",
  projectId: "appuems-d987a",
  storageBucket: "appuems-d987a.firebasestorage.app",
  messagingSenderId: "243207921734",
  appId: "1:243207921734:web:59fc76bdd1eb3e65492a47",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);