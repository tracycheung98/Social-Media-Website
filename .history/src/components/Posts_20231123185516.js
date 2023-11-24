import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Card from 'react-bootstrap/Card';

export default function Posts(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const postsRef = ref(db, "posts");

        // Subscribe to changes in the "posts" node
        const unsubscribe = onValue(postsRef, (snapshot) => {
            const postsData = snapshot.val();
            if (postsData) {
                // Convert the object of posts into an array
                const postsArray = Object.entries(postsData).map(([postId, postData]) => ({
                    id: postId,
                    ...postData,
                }));

                // Sort the posts based on their timestamp (assuming 'timestamp' is a property in your post data)
                postsArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                let filteredPosts;

                if (props.isLoggedIn) {
                    // If the user is logged in, filter posts
                    filteredPosts = postsArray.filter((post) => {
                        // Include posts created by users in the friend list, current user, and public posts
                        return (
                            post.public === true ||
                            post.userId === props.currentUser.uid ||
                            (props.friendList && props.friendList.some((friend) => friend.id === post.userId))
                        );
                    });
                } else {
                    // If the user is not logged in, show all posts
                    filteredPosts = postsArray.filter((post) => {
                        // Include posts created by users in the friend list, current user, and public posts
                        return (
                            post.public === true
                        );
                    });
                }

                setPosts(filteredPosts);
            } else {
                setPosts([]);
            }
        });

        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
    }, [props.isLoggedIn, props.currentUser, props.friendList]);

    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };

    return (
        <div>
            <h2 className="titles">Posts</h2>
            <div className="posts">
                {posts.map((post) => (
                    <Card>
                        <Card.Img  src={post.photoUrl} />
                        <Card.Body>
                            <Card.Text>
                            <span className="postUser"> {post.username}  &nbsp; </span>
                            {post.caption}
                            <p className="postTime"> {new Date(post.timestamp).toLocaleString('en-US', options)}</p>
                               
                            </Card.Text>

                        </Card.Body>
                    </Card>

                ))}
            </div>
        </div>
    );
}
