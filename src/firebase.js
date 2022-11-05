// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3cqwPS7-AbnQlLIe4VmWvBUE3XkzfjCI",
  authDomain: "storeowner-53578.firebaseapp.com",
  projectId: "storeowner-53578",
  storageBucket: "storeowner-53578.appspot.com",
  messagingSenderId: "425243990815",
  appId: "1:425243990815:web:7ff66643dcb2f068ae2e2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)