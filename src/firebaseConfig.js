// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGFwd_4h6U9818_CYbeZ7Sxi0SkTOy7Lg",
  authDomain: "grupoferreirahogar-98bd6.firebaseapp.com",
  projectId: "grupoferreirahogar-98bd6",
  storageBucket: "grupoferreirahogar-98bd6.appspot.com",
  messagingSenderId: "178347227709",
  appId: "1:178347227709:web:c67792493030c52bc6c854"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
