// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSwzuJHRDjMDE__y1rWWt0csfkIMPR4Ds",
  authDomain: "poker-hero-go.firebaseapp.com",
  projectId: "poker-hero-go",
  storageBucket: "poker-hero-go.appspot.com",
  messagingSenderId: "953462740748",
  appId: "1:953462740748:web:5bce5c433e8959d78cdb29",
  measurementId: "G-EZP1HWEDHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)