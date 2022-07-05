import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJlL0GsMLuf0ir29Xhvt2FWdA7s2p9olk",
    authDomain: "backend01-184b4.firebaseapp.com",
    projectId: "backend01-184b4",
    storageBucket: "backend01-184b4.appspot.com",
    messagingSenderId: "258128017566",
    appId: "1:258128017566:web:d82c25a796b63bb314a38f"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
export default db
export const auth = getAuth();
export const storage = getStorage(app);