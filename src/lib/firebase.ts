import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfe_WCiHfmFlXdoye0mulq-T6tFi0SvNw",
  authDomain: "expensemanager-97c8b.firebaseapp.com",
  projectId: "expensemanager-97c8b",
  storageBucket: "expensemanager-97c8b.firebasestorage.app",
  messagingSenderId: "429381054281",
  appId: "1:429381054281:web:0d2e12fd38bd9191cf3498",
  measurementId: "G-P12MDJV4J3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
