import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgLd2f1PXg7QsTW6iqj2H-NfJGLbCIXAw",
  authDomain: "button-clicker-3af86.firebaseapp.com",
  projectId: "button-clicker-3af86",
  storageBucket: "button-clicker-3af86.firebasestorage.app",
  messagingSenderId: "890181659755",
  appId: "1:890181659755:web:18eb3065b20084b887d52e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
