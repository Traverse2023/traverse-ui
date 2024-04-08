import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSound from "use-sound";
import { AuthContext } from "../context/auth-context";
import { SocketContext } from "../context/friends-socket-context";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
    faHome,
    faUserGroup,
    faUser,
    faBell,
    faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { addNotification } from "../redux/slices/notificationSlice";
import axios from "axios";
import { GroupContext } from "../context/group-context.tsx";
import CallContainer from "./CallContainer.tsx";

const NavBar = () => {
    const auth = React.useContext(AuthContext);
    const { chatsSocketApi, friendsSocketApi } = useContext(SocketContext);
    const [play] = useSound("/audio/notificationsound.mp3");
    const navigate = useNavigate();
    const groupControl = useContext(GroupContext);
    const [search, setSearch] = React.useState();
    const [notifications, setNotifications] = React.useState([]);

    useEffect(() => {
        console.log("25nots", notifications);
    }, [notifications]);

    const loadNotifications = async () => {
        // TODO: over storage service operation out
        console.log(
            "STORAGE SERV URL",
            import.meta.env.VITE_APP_STORAGE_SERVICE_URL
        );
        const currentNotifications = await axios.get(
            `${
                import.meta.env.VITE_APP_STORAGE_SERVICE_URL
            }/api/v1/notifications/getNotifications/${auth.email}`
        );
        if (currentNotification) {
            setNotifications(currentNotifications.data);
            console.log("CURR NOTS", currentNotifications.data);
        }
    };

    useEffect(() => {
        loadNotifications()
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
    }, []);

    friendsSocketApi.friendRequestListener((senderEmail) => {
        const updatedNotifications = [
            ...notifications,
            { senderEmail: senderEmail, notificationType: "FRIEND_REQUEST" },
        ];
        setNotifications(updatedNotifications);
        play();
    });

    chatsSocketApi.globalListener((notification) => {
        console.log("29global", notification);
        if (notification.notificationType === "MESSAGE_SENT") {
            const updatedNotifications = [...notifications, notification];
            setNotifications(updatedNotifications);
            play();
        }
    });

    friendsSocketApi.acceptListener((senderEmail) => {
        const updatedNotifications = [
            ...notifications,
            {
                senderEmail: senderEmail,
                notificationType: "FRIEND_REQUEST_ACCEPTED",
            },
        ];
        setNotifications(updatedNotifications);
        play();
    });

    // useEffect(() => {
    //     chatsSocketApi.globalListener( (notification) => {
    //         console.log('29global', notification)
    //         const { recipientEmail } = notification
    //         if (notification.notificationType === "MESSAGE_SENT") {
    //             console.log("sound should play")
    //             play()
    //             dispatch(
    //                 addNotification(
    //                     {recipientEmail, notificationType: "MESSAGE_SENT"}
    //                 )
    //             )
    //             // play()
    //         }
    //     })
    // }, [])

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

    const tempHandler = (e, groupId, groupName) => {
        e.preventDefault();
        groupControl.setSelectedGroup({ groupId, groupName });
        console.log("clickedLink", notifications);
    };

    return (
        <div className="navbar">
            <CallContainer />
            <div className="logo2">
                <div className="logo-wrapper">
                    <img
                        src="imgs/logo-svg.svg"
                        style={{ height: "40px", paddingTop: "7px" }}
                    />
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
                                <Tooltip
                                    className="tooltip"
                                    style={{
                                        backgroundColor: "lightgray",
                                        zIndex: "100",
                                    }}
                                >
                                    Feed
                                </Tooltip>
                            }
                        >
                            <Link to={"/"}>
                                <FontAwesomeIcon icon={faHome} />
                            </Link>
                        </OverlayTrigger>
                    </li>
                    <li>
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                                <Tooltip
                                    className="tooltip"
                                    style={{
                                        backgroundColor: "lightgray",
                                        zIndex: "100",
                                    }}
                                >
                                    Groups
                                </Tooltip>
                            }
                        >
                            <Link to={"/groups"}>
                                <FontAwesomeIcon icon={faUserGroup} />
                            </Link>
                        </OverlayTrigger>
                    </li>
                    <li>
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                                <Tooltip
                                    className="tooltip"
                                    style={{
                                        backgroundColor: "lightgray",
                                        zIndex: "100",
                                    }}
                                >
                                    Profile
                                </Tooltip>
                            }
                        >
                            <Link to={`/profile/${auth.email}`}>
                                <FontAwesomeIcon icon={faUser} />
                            </Link>
                        </OverlayTrigger>
                    </li>
                    <li>
                        <div className="dropdown">
                            <button className="dropbtn">
                                <FontAwesomeIcon icon={faBell} />{" "}
                                {notifications.length
                                    ? `(${notifications.length})`
                                    : null}
                            </button>
                            <div className="dropdown-content">
                                {notifications.map((notification) => {
                                    if (
                                        notification.notificationType ===
                                        "FRIEND_REQUEST"
                                    ) {
                                        return (
                                            <Link to="/">
                                                {notification.senderEmail} has
                                                sent you a friend request.
                                            </Link>
                                        );
                                    } else if (
                                        notification.notificationType ===
                                        "FRIEND_REQUEST_ACCEPTED"
                                    ) {
                                        return (
                                            <Link to="/">
                                                {notification.senderEmail} has
                                                accepted your friend request
                                                friend request.
                                            </Link>
                                        );
                                    } else if (
                                        notification.notificationType ===
                                        "MESSAGE_SENT"
                                    ) {
                                        return (
                                            <Link
                                                onClick={(e) =>
                                                    tempHandler(
                                                        e,
                                                        notification.groupId,
                                                        notification.groupName
                                                    )
                                                }
                                                to={`/groups`}
                                            >
                                                {notification.message}
                                            </Link>
                                        );
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
                                <Tooltip
                                    className="tooltip"
                                    style={{
                                        backgroundColor: "lightgray",
                                        zIndex: "100",
                                    }}
                                >
                                    Sign Out
                                </Tooltip>
                            }
                        >
                            <Link onClick={logout}>
                                <FontAwesomeIcon icon={faSignOut} />
                            </Link>
                        </OverlayTrigger>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
