import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import {auth, firestore } from '../firebase.config';
import './register.css';


import { createUserWithEmailAndPassword , updateProfile} from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [succeed, setSucceed] = useState(false); 

  const handleRegistration = async () => {
    if (!email || !password || !displayName) {
      console.log("Email, password, and display name are required.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });
  
      const userDocRef = doc(firestore, 'users', userCredential.user.uid);
      await setDoc(userDocRef, {
        displayName: displayName,
        email: email,
        // Add other user data as needed
      });
  
      console.log('Successfully registered.');
      setSucceed(true);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.', {
        position: 'top-center',
      });
    }
  };

  return (
  <div id="card">
        <div id="card-content">
          <div id="card-title">
            <h2>REGISTRATION</h2>
            <div className="underline-title"></div>
          </div>
          <div className="form">
          <label id="user-username-label" htmlFor="user-username">
              &nbsp;Username
            </label>
            <input id="user-username" className="form-content" type="text" name="username" value={displayName}
              onChange={(e) => setDisplayName(e.target.value)} required />
            <div className="form-border"></div>

            <label id="user-email-label" htmlFor="user-email">
              &nbsp;Email
            </label>
            <input id="user-email" className="form-content" type="email" name="email" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
            <div className="form-border"></div>
            <label id="user-password-label" htmlFor="user-password">
              &nbsp;Password
            </label>
            <input id="user-password" className="form-content" type="password" name="password" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
            <div className="form-border"></div>

            {/* <input id="submit-btn" type="submit" name="submit" value="LOGIN" /> */}
            <button id="submit-btn" onClick={handleRegistration}  disabled={!displayName || !email || !password}>REGISTER</button>
            {succeed && <Navigate to="/signin?success=1" />}
            {/* <a href="#" id="signup">Don't have account yet?</a> */}
            {/* <Link to="/register" id="signup">Don't have account yet?</Link> */}
          </div>
        </div>
      </div>




    // <div>
    //   <h2>Registration</h2>
    //   <input
    //     type="email"
    //     placeholder="Email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <input
    //     type="password"
    //     placeholder="Password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <input
    //     type="text"
    //     placeholder="Username"
    //     value={displayName}
    //     onChange={(e) => setDisplayName(e.target.value)} // Set the display name
    //   />
    //   <button onClick={handleRegistration}>Register</button>
    //   {succeed && <Navigate to="/signin?success=1" />}

    // </div>
  );
};

