import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons'

export default function Navbar(props) {
    const navigate = useNavigate();

    const handleLogout = () => {

        auth.signOut()
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error('Logout error:', error);
            });
    };

    return (<div className="navbar">

            <Link to="/">
                <button className="navButton">
                    <FontAwesomeIcon icon={faHouse} /> Home
                </button>
            </Link>

            {props.isLoggedIn ? (
                <button className="navButton" onClick={handleLogout}>Logout</button>
            ) : (
                <Link to="/signin">
                    <button className="navButton">Login</button>
                </Link>
            )
            }
    </div>);
};