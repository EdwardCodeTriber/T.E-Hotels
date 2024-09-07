
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'


// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDPHyob9jTfcQCgOB0aNuX0n5OdGSzkAtE",
  authDomain: "hotel-data-store.firebaseapp.com",
  projectId: "hotel-data-store",
  storageBucket: "hotel-data-store.appspot.com",
  messagingSenderId: "995060333011",
  appId: "1:995060333011:web:461196f934001f70909726",
  measurementId: "G-76QW5MV4PF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db}
export {auth}
////////////////////

