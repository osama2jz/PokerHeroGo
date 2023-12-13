// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0yuO8iU65VJjybzsKT1e0Xt-rsNs3khU",
  authDomain: "smartchoice-stay.firebaseapp.com",
  projectId: "smartchoice-stay",
  storageBucket: "smartchoice-stay.appspot.com",
  messagingSenderId: "406186752810",
  appId: "1:406186752810:web:808ea387c0450162bd3c53",
  measurementId: "G-RX7DDBX58J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)