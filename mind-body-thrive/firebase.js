// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore}  from  'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmkVQtYh28jFM-9t5AFXv6af8wXq4aPk0",
  authDomain: "mindbodythrive-d0a8b.firebaseapp.com",
  projectId: "mindbodythrive-d0a8b",
  storageBucket: "mindbodythrive-d0a8b.appspot.com",
  messagingSenderId: "700524478571",
  appId: "1:700524478571:web:e9a3177306dcd9b374f12e",
  measurementId: "G-V66T5S6NKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export default db;