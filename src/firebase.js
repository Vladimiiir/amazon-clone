import { initializeApp } from "firebase/app"; // to initialize the app
import { getFirestore } from "firebase/firestore"; // to initialize the db
import { getAuth } from "firebase/auth"; // to initialize the authentication

const firebaseConfig = {
  apiKey: "AIzaSyCt8zAtkjecFDemyJ8A4bjENzt6m7Wb_DY",
  authDomain: "clone-c349f.firebaseapp.com",
  projectId: "clone-c349f",
  storageBucket: "clone-c349f.appspot.com",
  messagingSenderId: "364988304460",
  appId: "1:364988304460:web:40d29e4a670237b8ecb8e9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
