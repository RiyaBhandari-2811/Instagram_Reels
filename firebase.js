// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage , ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRwR-NOlSmUBMzEZtcioZAjC_MNm_-EvA",
  authDomain: "insta-reels-be8c8.firebaseapp.com",
  projectId: "insta-reels-be8c8",
  storageBucket: "insta-reels-be8c8.appspot.com",
  messagingSenderId: "627754333249",
  appId: "1:627754333249:web:ba73e328721c0c115582c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(app);
const db = getFirestore(app);

export { auth  , storage , db} ;

