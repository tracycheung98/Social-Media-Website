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
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
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
