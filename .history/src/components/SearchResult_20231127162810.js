import React, { useEffect, useState } from "react";
import { auth, firestore } from '../firebase.config';
import { doc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import './general.css'
import './search.css'
import Navbar from './Navbar';
import Search from "./Search";
import Friends from "./Friends";

import FollowButton from "./FollowButton";


export default function SearchResult() {
    const { state } = useLocation();
    const searchResults = state ? state.searchResults : [];
    const searchButtonClicked = state ? state.searchButtonClicked : false;
    const [userId, setUserId] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [friendList, setFriendList] = useState([]);

console.log(searchButtonClicked)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {

                setUserId(user.uid);
                setIsLoggedIn(true);
                const userRef = doc(firestore, 'users', user.uid);

                // console.log(userRef)
                getDoc(userRef).then((docSnap) => {
                    if (docSnap.exists()) {
                        // console.log("Document data:", docSnap.data());
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

    const isFriend = (friendId) => {
        return friendList && friendList.some(el => el.id === friendId);
    };

    return (
        <div className="home">
            <Navbar isLoggedIn={isLoggedIn} />
            <Friends friendList={friendList} />
            <div className="main">
                <Search />
                <h5>Search Results</h5>
                {searchButtonClicked ?

                    (searchResults != [] ? (
                        <ul>
                            {searchResults.map((result) => (
                                <li key={result.id}>
                                    <p>{result.displayName}</p>
                                    {result.id === userId ? (
                                        null
                                    ) : (
                                        isLoggedIn ? (
                                            isFriend(result.id) ? (
                                                <button className="button" disabled>Already a friend</button>
                                            ) : (
                                                <FollowButton
                                                    userId={userId}
                                                    friend={result}
                                                />
                                            )
                                        ) : (
                                            <button className="button" disabled>Sign in to add friend</button>
                                        ))}
                                </li>
                            ))}
                        </ul>
                    )
                        : (<p>No users found.</p>)) : (null)}
            </div>
        </div>
    );
};