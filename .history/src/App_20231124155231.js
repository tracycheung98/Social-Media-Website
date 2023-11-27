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

export default App;