// SignIn.js
import React, { useState, useEffect } from "react";
import { Navigate, Link, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signin.css';
import { auth } from '../firebase.config';
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [succeed, setSucceed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const successParam = searchParams.get('success');

    if (successParam === '1') {
      toast.success('Registration successful!', {
        position: 'top-center',
      });
    }
  }, [location.search]);

  const handleSignIn = async () => {
    try {
        console.log("Attempting to sign in...");
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Successfully logged in");
      setSucceed(true);
    } catch (error) {
      console.error('Sign-in error:', error);
      toast.error('Log in failed. Please try again.', {
        position: 'top-center',
      });
    }
  }

  return (
    <div className="signin">
      <div id="card">
        <div id="card-content">
          <div id="card-title">
            <h2>LOGIN</h2>
            <div className="underline-title"></div>
          </div>
          <div className="form">
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
            <button id="submit-btn" onClick={handleSignIn}>LOGIN</button>
            {succeed && <Navigate to="/" />}
            {/* <a href="#" id="signup">Don't have account yet?</a> */}
            <Link to="/register" id="signup">Don't have account yet?</Link>
          </div>
        </div>
      </div>
    </div >
  );
}
