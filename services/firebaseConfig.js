// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASRGB91RFG9rZkRux1FslI2HrqzVArkb0",
  authDomain: "fivetrees-26cd0.firebaseapp.com",
  projectId: "fivetrees-26cd0",
  storageBucket: "fivetrees-26cd0.appspot.com", 
  messagingSenderId: "582444083351",
  appId: "1:582444083351:web:37eb6fd36f4bec4931e1d2",
  measurementId: "G-3BJBPM1810"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
