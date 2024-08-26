import { initializeApp } from "firebase/app";
import {
  getAuth,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBAjmSF2BYdkg9M6ojYCMDdTtb4Bv-1nwQ",
  authDomain: "functions-9db42.firebaseapp.com",
  projectId: "functions-9db42",
  storageBucket: "functions-9db42.appspot.com",
  messagingSenderId: "945748529625",
  appId: "1:945748529625:web:11c0705a2be239202789c8",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

// Export the initialized Firebase services
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const updateUser = httpsCallable(functions, "updateUser");
export { updateEmail, reauthenticateWithCredential, EmailAuthProvider };
