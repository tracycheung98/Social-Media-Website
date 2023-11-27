import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'firebase/compat/auth';
import { firestore } from '../firebase.config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

export default function Search() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const searchUsersByDisplayName = async (displayName) => {
        try {
            const q = query(collection(firestore, 'users'), where('displayName', '==', displayName));
            const querySnapshot = await getDocs(q);

            const users = [];
            querySnapshot.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() });
            });

            return users;
        } catch (error) {
            console.error('Error searching users:', error);
            throw error; 
        }
    };

    const handleSearch = async () => {
        const results = await searchUsersByDisplayName(searchTerm);

        if (results.length === 0) {
            setSearchResults('No users found.');
            console.log('No users found.');
        } else {
            console.log('Users found.');
            setSearchResults(results);
            navigate("/search", { state: { searchResults: searchResults } });
        }
    };

    return (
            <div className="searchBar">
                <input type="text" placeholder="Search user ..." value={searchTerm} onChange={handleSearchTermChange} />
                <button className="button" type="submit" onClick={handleSearch}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
    );
};