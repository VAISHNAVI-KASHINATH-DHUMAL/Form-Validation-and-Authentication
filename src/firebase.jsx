// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA0lZwHF3IruLSrBGzfKNLpE_qjTH_sLi4",
  authDomain: "form-validation-82567.firebaseapp.com",
  projectId: "form-validation-82567",
  storageBucket: "form-validation-82567.appspot.com",
  messagingSenderId: "723388003102",
  appId: "1:723388003102:web:bb3bb1c8fb92158bb58f0f",
  measurementId: "G-8JTEFJVM3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
