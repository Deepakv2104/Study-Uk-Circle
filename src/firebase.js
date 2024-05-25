// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
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
  apiKey: "AIzaSyCTZK8tPL3ATp9QjeGUZpc7eFPnnB3pv9s",
  authDomain: "worldlynk-97994.firebaseapp.com",
  projectId: "worldlynk-97994",
  storageBucket: "worldlynk-97994.appspot.com",
  messagingSenderId: "681088031303",
  appId: "1:681088031303:web:48de1cd0dfea9def11ef62",
  measurementId: "G-54LXHJVZJ2"
};
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);
// const analytics = getAnalytics(firebase);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider(auth);
const storage = getStorage(firebase);
const messaging = getMessaging(firebase);
setPersistence(auth, browserSessionPersistence)
export { firestore, storage, auth , messaging, googleProvider,firebase};