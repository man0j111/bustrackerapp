// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDReTbPQUK5IE61HrNyRf40lJX_qRI35JI",
  authDomain: "bustrackerapp-1234.firebaseapp.com",
  projectId: "bustrackerapp-1234",
  storageBucket: "bustrackerapp-1234.firebasestorage.app",
  messagingSenderId: "948881612044",
  appId: "1:948881612044:web:41f8baaae6d1bee76ffd29"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
