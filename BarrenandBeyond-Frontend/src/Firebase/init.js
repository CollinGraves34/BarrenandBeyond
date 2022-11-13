// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbA9U_k7iQuNeOUJ7nCTwQomHW9qL1rjE",
  authDomain: "barreandbeyond.firebaseapp.com",
  projectId: "barreandbeyond",
  storageBucket: "barreandbeyond.appspot.com",
  messagingSenderId: "946208339341",
  appId: "1:946208339341:web:bc45a26e4ab6df341db9c4",
  measurementId: "G-3CYVY46B3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);
