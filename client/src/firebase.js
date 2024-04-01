// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-9ed11.firebaseapp.com",
  projectId: "mern-blog-9ed11",
  storageBucket: "mern-blog-9ed11.appspot.com",
  messagingSenderId: "902555260203",
  appId: "1:902555260203:web:f0a059b2c7fd30c4c3616e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);