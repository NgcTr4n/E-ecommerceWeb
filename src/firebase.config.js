// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCoqacwKtvjXZROo9sUSWQym-FcQ_NScFY",
  authDomain: "ecommercewebsite-6f3a3.firebaseapp.com",
  projectId: "ecommercewebsite-6f3a3",
  storageBucket: "ecommercewebsite-6f3a3.appspot.com",
  messagingSenderId: "786791601555",
  appId: "1:786791601555:web:4e15f690f509d124418466",
  measurementId: "G-3T6WQ8JPCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)



export default app;
