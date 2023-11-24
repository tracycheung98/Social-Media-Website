import React, { useState, useEffect } from "react";
import Collapse from 'react-bootstrap/Collapse';

export default function Friends(props) {
    
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [open, setOpen] = useState(false);

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        // Set initial window size
        handleResize();

        // Add event listener to update window size when the window is resized
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // The empty dependency array ensures that the effect runs once after the initial render

    const isMobile = windowSize.width < 768;

    return (
        <div>
            {isMobile ? (<div>
                <button className="button"
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    Friend List
                </button>
                <Collapse in={open}>
                    <div id="example-collapse-text" className="card">

                        <ul className="list-group list-group-flush">
                            {props.friendList && props.friendList.map((user) => (
                                <li className="list-group-item" key={user.id}>
                                    {user.name}
                                </li>
                            ))}
                        </ul>

                    </div>
                </Collapse>
            </div>

            ) : (
                <div className="friends">
                    <p className="titles">Friend List</p>
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            {props.friendList && props.friendList.map((user) => (
                                <li className="list-group-item" key={user.id}>
                                    {user.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

        </div>
    );
}
