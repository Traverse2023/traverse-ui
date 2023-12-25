import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import useSound from 'use-sound';
import { AuthContext } from "../context/auth-context";
import {SocketContext} from "../context/friends-socket-context";
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Button} from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { faHome, faUserGroup, faUser, faBell, faSignOut } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const NavBar = () => {
    const auth = React.useContext(AuthContext);
    const { chatsSocketApi, friendsSocketApi } = useContext(SocketContext)
    const [play] = useSound("/audio/notificationsound.mp3");
    const navigate = useNavigate();

    const [search, setSearch] = React.useState();
    const [notifications, setNotifications] = React.useState([])

    friendsSocketApi.friendRequestListener((senderEmail) => {
        const updatedNotifications = [...notifications, {senderEmail: senderEmail, notificationType: "FRIEND_REQUEST"}]
        setNotifications(updatedNotifications)
        play()
    })

    chatsSocketApi.globalListener( (notification) => {
        console.log('29global', notification)
        if (notification.notificationType === "MESSAGE_SENT") {
            const updatedNotifications = [...notifications, notification]
            setNotifications(updatedNotifications)
            play()
        }
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
                <div className="logo-wrapper">
                    <img src="imgs/logo-svg.svg" style={{height: '40px', paddingTop: "7px"}}/>
                </div>
            </div>
            <input
                placeholder="Search"
                onKeyDown={submitSearch}
                onChange={searchChangeHandler}
            />
            <div className="right-side">
                <ul>
                    <li>
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                                <Tooltip className="tooltip" style={{backgroundColor: "lightgray", zIndex: '100'}}>
                                    Feed
                                </Tooltip>
                            }
                        >
                            <Link to={"/"}><FontAwesomeIcon icon={faHome} /></Link>
                        </OverlayTrigger>
                    </li>
                    <li>
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                                <Tooltip className="tooltip" style={{backgroundColor: "lightgray", zIndex: '100'}}>
                                    Groups
                                </Tooltip>
                            }
                        >
                            <Link to={"/groups"}><FontAwesomeIcon icon={faUserGroup} /></Link>
                        </OverlayTrigger>
                    </li>
                    <li>
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                                <Tooltip className="tooltip" style={{backgroundColor: "lightgray", zIndex: '100'}}>
                                    Profile
                                </Tooltip>
                            }
                        >
                            <Link to={`/profile/${auth.email}`}><FontAwesomeIcon icon={faUser} /></Link>
                        </OverlayTrigger>
                    </li>
                    <li>
                        <div className="dropdown">
                            <button className="dropbtn"><FontAwesomeIcon icon={faBell} /> {notifications.length ? `(${notifications.length})`: null}</button>
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
                                    } else if (notification.notificationType === "MESSAGE_SENT") {
                                        return (
                                            <Link to="/groups" state={{ groupId: notification.groupId }}>{notification.message}</Link>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </li>
                    <li>
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                                <Tooltip className="tooltip" style={{backgroundColor: "lightgray", zIndex: '100'}}>
                                    Sign Out
                                </Tooltip>
                            }
                        >
                            <Link onClick={logout}><FontAwesomeIcon icon={faSignOut} /></Link>
                        </OverlayTrigger>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
