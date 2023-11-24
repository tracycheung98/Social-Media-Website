import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Card from 'react-bootstrap/Card';

export default function Posts(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const postsRef = ref(db, "posts");

        const unsubscribe = onValue(postsRef, (snapshot) => {
            const postsData = snapshot.val();
            if (postsData) {
                const postsArray = Object.entries(postsData).map(([postId, postData]) => ({
                    id: postId,
                    ...postData,
                }));
                postsArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                let filteredPosts;

                if (props.isLoggedIn) {
                    filteredPosts = postsArray.filter((post) => {
                        return (
                            post.public === true ||
                            post.userId === props.currentUser.uid ||
                            (props.friendList && props.friendList.some((friend) => friend.id === post.userId))
                        );
                    });
                } else {
                    filteredPosts = postsArray.filter((post) => {
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
