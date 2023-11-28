// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB31Hm63D1PiuvO1MR4AwWJOxAxFuQfvdU",
  authDomain: "ship-5d998.firebaseapp.com",
  projectId: "ship-5d998",
  storageBucket: "ship-5d998.appspot.com",
  messagingSenderId: "507425679843",
  appId: "1:507425679843:web:8c7d4cbce9ea155cd498d6",
  measurementId: "G-H3S7732F26",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export function authenticateUser() {
  const navigate = useNavigate();

  const auth = getAuth();
  React.useEffect(() => {
    const isLoginPage = location.pathname === "/login";
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (isLoginPage) {
        if (user) {
          // User is signed in.
          // ...
        } else {
          // User is not signed in.
          // If not authenticated, sign out and navigate to the login page
          signOut(auth);
        }
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [auth, navigate]);
}
