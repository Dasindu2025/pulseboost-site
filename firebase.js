import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCKhjxCnAX4uEx_GcWiynleNLeay9qeSJc",
  authDomain: "hela-optimizer-site.firebaseapp.com",
  projectId: "hela-optimizer-site",
  storageBucket: "hela-optimizer-site.firebasestorage.app",
  messagingSenderId: "1032591644470",
  appId: "1:1032591644470:web:3416a830fd6f9ed3280597"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
