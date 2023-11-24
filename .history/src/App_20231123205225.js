import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import firebase from 'firebase/compat/app';
// import { auth, firestore } from './index';
import SignIn from './components/Signin';
import Home from './components/Home';
import Register from './components/Register'
import SearchResult from './components/SearchResult'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getApps, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1VZy-x7OsyjHH0avHYZ0I5vo79-qETI4",
  authDomain: "social-media-b372c.firebaseapp.com",
  projectId: "social-media-b372c",
  storageBucket: "social-media-b372c.appspot.com",
  messagingSenderId: "898615765544",
  appId: "1:898615765544:web:8d6176714795ce33f2a31d",
  measurementId: "G-Z4PCD5M13G"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Log initialization status
if (getApps().length > 0) {
  console.log('Firebase is initialized.');
} else {
  console.log('Firebase is not initialized.');
}

// Export Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Social-Media-Website' element={<Home/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
      <ToastContainer />
  </Router>
  );
};
export { auth, firestore };
export default App;