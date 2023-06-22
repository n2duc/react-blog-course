import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBSQDX6VGTzF2YQo0Z_3SL7YosMDUuyj0g",
    authDomain: "react-blog-course-d4a6b.firebaseapp.com",
    projectId: "react-blog-course-d4a6b",
    storageBucket: "react-blog-course-d4a6b.appspot.com",
    messagingSenderId: "613573156754",
    appId: "1:613573156754:web:fa32738c77141307d2ab4b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);