//import * as firebase from "firebase/app" <--- made firebase work at first
//import firebase from "firebase" <--- tutorial
import firebase from "firebase" // <--- console suggestion

const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: "${config.measurementId}",
}

try {
  console.log("FB", firebaseConfig)
  firebase.initializeApp(firebaseConfig)
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack)
  }
}

const fire = firebase
const fire2 = firebaseConfig

export { fire, fire2 }

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6Lzu9K5FgXdpezT5e6ZIx9ib3qRhjKFo",
  authDomain: "blog-app-tutorial-586a4.firebaseapp.com",
  projectId: "blog-app-tutorial-586a4",
  storageBucket: "blog-app-tutorial-586a4.appspot.com",
  messagingSenderId: "804049462081",
  appId: "1:804049462081:web:d870f80e901ab0c33977c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
*/
