import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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
        <Route path="/Social-Media-Website/signin" element={<SignIn/>} />
        <Route path="/Social-Media-Website/register" element={<Register/>} />
        <Route path="/Social-Media-Websitesearch" element={<SearchResult />} />
      </Routes>
      <ToastContainer />
  </Router>
  );
};

export default App;