import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDntbUChp9uB9k-FtVLusly9FuHKCzwXRs",
  authDomain: "notes-app-95918.firebaseapp.com",
  projectId: "notes-app-95918",
  storageBucket: "notes-app-95918.appspot.com",
  messagingSenderId: "531850998910",
  appId: "1:531850998910:web:ccafd58f0552c0a7fd142f"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;