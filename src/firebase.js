import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBIUQ_qoRCkJIQuCLHN-G0olEkn9a3LH9I",
  authDomain: "worldlynk-effa8.firebaseapp.com",
  projectId: "worldlynk-effa8",
  storageBucket: "worldlynk-effa8.appspot.com",
  messagingSenderId: "54298790712",
  appId: "1:54298790712:web:dd197a77e3f3b869c14fcd",
  measurementId: "G-TE03GW3B07"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();




export {
  auth,
  db,
  googleProvider
}