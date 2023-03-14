import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// to fix this env issue
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyAkrv9I5thu867moCISpEHTRcM0NH-Ogn4",
  authDomain: "pokedex-874de.firebaseapp.com",
  projectId: "pokedex-874de",
  storageBucket: "pokedex-874de.appspot.com",
  messagingSenderId: "846914473805",
  appId: "1:846914473805:web:996f73292841a25905f104",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
