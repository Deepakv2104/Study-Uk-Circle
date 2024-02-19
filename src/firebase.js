// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth , setPersistence, browserSessionPersistence} from "firebase/auth";
import {getMessaging } from 'firebase/messaging';
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIUQ_qoRCkJIQuCLHN-G0olEkn9a3LH9I",
  authDomain: "worldlynk-effa8.firebaseapp.com",
  projectId: "worldlynk-effa8",
  storageBucket: "worldlynk-effa8.appspot.com",
  messagingSenderId: "54298790712",
  appId: "1:54298790712:web:dd197a77e3f3b869c14fcd",
  measurementId: "G-TE03GW3B07"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);
const analytics = getAnalytics(firebase);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider(auth);
const storage = getStorage(firebase);
const messaging = getMessaging(firebase);
setPersistence(auth, browserSessionPersistence)
export { firestore, storage, auth , messaging, googleProvider};