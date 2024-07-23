// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSZXpjGhlyQOz3dfVxkAprdw3wPsGXP_A",
  authDomain: "trip-planner-b6efc.firebaseapp.com",
  projectId: "trip-planner-b6efc",
  storageBucket: "trip-planner-b6efc.appspot.com",
  messagingSenderId: "1010245753324",
  appId: "1:1010245753324:web:e275f786a3834770c548c9",
  measurementId: "G-0W6F0KZGT1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
