// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3rNd8JYsLU7EwW9fi5Fx0jO5uRgcGDW4",
  authDomain: "pdm-87b42.firebaseapp.com",
  projectId: "pdm-87b42",
  storageBucket: "pdm-87b42.firebasestorage.app",
  messagingSenderId: "33792179859",
  appId: "1:33792179859:web:b5a76b9feb243b76665766"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);