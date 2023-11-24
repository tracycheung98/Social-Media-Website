import React from "react";
import { firestore } from '../App';
import "./general.css"
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

export default function FollowButton(props) {
    const addFriend = async (userId, friend) => {
        const newFriend = { id: friend.id, name: friend.displayName };

        console.log(userId)
        try {
            const userRef = doc(firestore, 'users', userId);
            console.log("userRef:", userRef);  // Add this line for debugging
            await updateDoc(userRef, {
                friend: arrayUnion(newFriend),
            });
            console.log('Friend added successfully');
            window.location.reload(); // Refresh the page
        } catch (error) {
            console.error('Error adding friend', error);
        }
    }

    return (
        <button className="button" onClick={() => addFriend(props.userId, props.friend)}>Add Friend</button>
    );
};