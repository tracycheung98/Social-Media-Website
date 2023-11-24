import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify'; // Import toast from react-toastify
import { auth, firestore } from '../App';
import { doc, getDoc } from "firebase/firestore";

import './general.css'
import './home.css'
import 'react-toastify/dist/ReactToastify.css';
import { Tab, Tabs } from 'react-bootstrap'; // Import Bootstrap tabs components

import Navbar from './Navbar';
import Friends from './Friends';
// import Messages from './other/Messages';
import Search from "./Search";
import Upload from "./Upload";
import Posts from "./Posts";

export default function Home() {
    const [isToastDisplayed, setIsToastDisplayed] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [friendList, setFriendList] = useState([]);

    

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in
                setUser(user);
                setIsLoggedIn(true);
                const userRef = doc(firestore, 'users', user.uid);

                console.log(userRef)
                getDoc(userRef).then((docSnap) => {
                    if (docSnap.exists()) {
                        console.log("Document data:", docSnap.data());
                        setFriendList(docSnap.data().friend || []); // Use default empty array if 'friend' is not present
                    } else {
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            } else {
                // User is signed out
                setFriendList([]);
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);


    useEffect(() => {
        if (user && user.displayName && !isToastDisplayed) {
            toast.success(`Welcome, ${user.displayName}!`, {
                position: 'top-center',
                autoClose: 3000, // Adjust the duration as needed
            });
            setIsToastDisplayed(true);
        }
    }, [user, isToastDisplayed]);

    return (
        <div className="home">
            <Navbar isLoggedIn={isLoggedIn} />

            <div className="main">
                <Tabs defaultActiveKey="search" id="pills-tab">
                    <Tab eventKey="search" title="Search">
                        <Search />
                    </Tab>
                    <Tab eventKey="upload" title="Upload">
                        {isLoggedIn ? (
                            <Upload />
                        ) : (
                            <p>Log in to upload a post!</p>
                        )}
                    </Tab>
                </Tabs>

                {isLoggedIn ? (
                    <div>
                        <Posts isLoggedIn={true} currentUser={user} friendList={friendList} />
                    </div>
                ) : (
                    <div>
                        <Posts isLoggedIn={false} />
                    </div>
                )}
            </div>
            <div className="meun">
            <Friends friendList={friendList} />
            {/* <Messages isMobile={isMobile}/> */}

            </div>
        </div>
    );
};