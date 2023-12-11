import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart as solidHeart} from '@fortawesome/free-solid-svg-icons';
import {faHeart as regularHeart} from '@fortawesome/free-regular-svg-icons';
import { getDatabase, ref, onValue } from "firebase/database";
import Card from 'react-bootstrap/Card';


export default function Posts(props) {
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const postsRef = ref(db, "posts");

        const unsubscribePosts = onValue(postsRef, (snapshot) => {
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
                // console.log("filteredPosts" + JSON.stringify(filteredPosts))
            } else {
                setPosts([]);
            }
        });

        return () => unsubscribePosts();
    }, [props.isLoggedIn, props.currentUser, props.friendList, likedPosts]);

    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };

    const handleLike = (postId) => {
        console.log("like button clicked",postId);
        if (likedPosts.includes(postId)) {
            setLikedPosts(likedPosts.filter((id) => id !== postId));
        } else {
            setLikedPosts([...likedPosts, postId]);
        }
    };

    return (
        <div>
            <h2 className="titles">Posts</h2>
            <div className="posts">
                {posts.map((post) => (
                    <Card key={post.id}>
                        <Card.Img src={post.photoUrl} />
                        <Card.Body>
                            {/* <Card.Text> */}
                
                            <button className="likeButton" onClick={() => handleLike(post.id)}>
                            <FontAwesomeIcon icon={likedPosts.includes(post.id) ? solidHeart : regularHeart} />
                            

                            </button>

                            <span className="postUser"> {post.username}  &nbsp; </span>
                            <div dangerouslySetInnerHTML={{ __html: post.caption.replace(/\n/g, '<br />') }} style={{ whiteSpace: 'pre-line' }} />
                            <p className="postTime"> {new Date(post.timestamp).toLocaleString('en-US', options)}</p>

                            {/* </Card.Text> */}

                        </Card.Body>
                    </Card>

                ))}
            </div>
        </div>
    );
}
