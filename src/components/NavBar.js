import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import useSound from 'use-sound';
import { AuthContext } from "../context/auth-context";
import {SocketContext} from "../context/friends-socket-context";
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Button} from "react-bootstrap";

const NavBar = () => {
    const auth = React.useContext(AuthContext);
    const { friendsSocketApi } = useContext(SocketContext)
    const [play] = useSound("/audio/notificationsound.mp3");
    const navigate = useNavigate();

    const [search, setSearch] = React.useState();
    const [notifications, setNotifications] = React.useState([])

    friendsSocketApi.friendRequestListener((senderEmail) => {
        const updatedNotifications = [...notifications, {senderEmail: senderEmail, notificationType: "FRIEND_REQUEST"}]
        setNotifications(updatedNotifications)
        play()
    })

    friendsSocketApi.acceptListener((senderEmail) => {
        const updatedNotifications = [...notifications, {senderEmail: senderEmail, notificationType: "FRIEND_REQUEST_ACCEPTED"}]
        setNotifications(updatedNotifications)
        play()
    })

    // friendsSocketApi.declineFriendRequestListener((senderEmail) => {
    //     console.log('here32 ', senderEmail, "declinedFriendRequest")
    //     const updatedNotifications = [...notifications, {senderEmail: senderEmail, notificationType: "FRIEND_REQUEST"}]
    //     setNotifications(updatedNotifications)
    // })
    //
    // friendsSocketApi.unfriendListener((senderEmail) => {
    //     console.log('here32 ', senderEmail, "declinedFriendRequest")
    //     const updatedNotifications = [...notifications, {senderEmail: senderEmail, notificationType: "FRIEND_REQUEST"}]
    //     setNotifications(updatedNotifications)
    // })

    const logout = () => {
        auth.acceptLogout();
        window.location = "/";
    };

    const searchChangeHandler = (event) => {
        console.log(event.target.value);
        setSearch(event.target.value);
    };

    const submitSearch = (event) => {
        if (event.key === "Enter") {
            console.log("pressed enter");
            navigate("/search", {
                state: {
                    searchVal: search,
                },
            });
        }
    };

    return (
        <div className="navbar">
            <div className="logo2">
                <h1>Traverse</h1>
            </div>
            <input
                placeholder="Search"
                onKeyDown={submitSearch}
                onChange={searchChangeHandler}
            />
            <div className="right-side">
                <ul>
                    <li>
                        <Link to={"/"}>Feed</Link>
                    </li>
                    <li>
                        <Link to={"/groups"}>Groups</Link>
                    </li>
                    <li>
                        <Link to={`/profile/${auth.email}`}>Profile</Link>
                    </li>
                    <li>
                        <div className="dropdown">
                            <button className="dropbtn">Notifications {notifications.length ? `(${notifications.length})`: null}</button>
                            <div className="dropdown-content">
                                {notifications.map(notification => {
                                    if (notification.notificationType === "FRIEND_REQUEST") {
                                        return (
                                            <Link to="/">{notification.senderEmail} has sent you a friend request.</Link>
                                        )
                                    } else if (notification.notificationType === "FRIEND_REQUEST_ACCEPTED") {
                                        return (
                                            <Link to="/">{notification.senderEmail} has accepted your friend request friend request.</Link>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link onClick={logout}>Sign Out</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
