// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAWm7Xv3C5ZApabF4AtqjyB3uvLr0PuRg",
  authDomain: "boardgame-60717.firebaseapp.com",
  projectId: "boardgame-60717",
  storageBucket: "boardgame-60717.appspot.com",
  messagingSenderId: "322941278304",
  appId: "1:322941278304:web:bead91af0aa8261f64cb05",
  measurementId: "G-G6G65H6C9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);