// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBGNwQ_WYSz5Z6M-W_T6bYiChXjozeauL0",
  authDomain: "lmdb-93d09.firebaseapp.com",
  projectId: "lmdb-93d09",
  storageBucket: "lmdb-93d09.appspot.com",
  messagingSenderId: "596425529285",
  appId: "1:596425529285:web:04978a1e87685b26f31dac",
  measurementId: "G-X9YS0WFYTH",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
