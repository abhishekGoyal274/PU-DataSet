//import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9xGEVC01q0t8x4NTAiO-iEgEv0CDvfRY",
  authDomain: "dic-data-set-react.firebaseapp.com",
  projectId: "dic-data-set-react",
  storageBucket: "dic-data-set-react.appspot.com",
  messagingSenderId: "197202842924",
  appId: "1:197202842924:web:4bf02229a98afb754ec889",
  // measurementId: "G-0Z98VZ7FRD",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
