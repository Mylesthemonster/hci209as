import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDntbUChp9uB9k-FtVLusly9FuHKCzwXRs",
    authDomain: "notes-app-95918.firebaseapp.com",
    projectId: "notes-app-95918",
    storageBucket: "notes-app-95918.appspot.com",
    messagingSenderId: "531850998910",
    appId: "1:531850998910:web:ccafd58f0552c0a7fd142f"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider= new GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
auth.languageCode = 'it';
provider.setCustomParameters({
  'login_hint': 'user@example.com'
});

export {auth, provider};
export default db;

