// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRsnvRYVjuauykqorqpToOi9AXxDY9CRY",
  authDomain: "apekade-747a4.firebaseapp.com",
  projectId: "apekade-747a4",
  storageBucket: "apekade-747a4.appspot.com",
  messagingSenderId: "691473250089",
  appId: "1:691473250089:web:6be14f589a419a9393a938",
  measurementId: "G-B88382P7DH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);


export { storage };