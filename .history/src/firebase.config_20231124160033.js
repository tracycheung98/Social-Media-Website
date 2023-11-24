import { getApps, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY},
    authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL, 
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    // apiKey: "AIzaSyA1VZy-x7OsyjHH0avHYZ0I5vo79-qETI4",
    // authDomain: "social-media-b372c.firebaseapp.com",
    // databaseURL: "https://social-media-b372c-default-rtdb.firebaseio.com",
    // projectId: "social-media-b372c",
    // storageBucket: "social-media-b372c.appspot.com",
    // messagingSenderId: "898615765544",
    // appId: "1:898615765544:web:8d6176714795ce33f2a31d",
    // measurementId: "G-Z4PCD5M13G"
  };

  console.log('REACT_APP_FIREBASE_API_KEY:', process.env.REACT_APP_FIREBASE_API_KEY);
  console.log('REACT_APP_FIREBASE_AUTH_DOMAIN:', process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];


if (getApps().length > 0) {
  console.log('Firebase is initialized.');
} else {
  console.log('Firebase is not initialized.');
}

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
