import React, {useContext, useEffect, useState} from "react";
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
import { GroupContext } from "../context/group-context.jsx";
import CallContainer from "./CallContainer.jsx";
import usePaginatedNotifications from "../hooks/usePaginatedNotifications.js";

const NavBar = () => {
    const auth = useContext(AuthContext);
    const { notificationsSocketApi} = useContext(SocketContext);
    const [play] = useSound("/audio/notificationsound.mp3");
    const navigate = useNavigate();
    const groupControl = useContext(GroupContext);
    const [search, setSearch] = useState();
    const [newData, setNewData] = useState("");
    const [page, setPage] = useState(0);
    const { notifications, error, loading, hasMore } = usePaginatedNotifications(auth.email, page, newData)

    useEffect(() => {
        console.log("Change in notifications:\n", notifications);
    }, [notifications]);


    notificationsSocketApi.receiveNotification((notification) => {
        console.log("Receive notification:\n", notification);
        setNewData(notification);
        play();
    });

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
                                        notification.type ===
                                        "FRIEND_REQUEST"
                                    ) {
                                        return (
                                            <Link to="/">
                                                {notification.sender} has
                                                sent you a friend request.
                                            </Link>
                                        );
                                    } else if (
                                        notification.type ===
                                        "FRIEND_REQUEST_ACCEPTED"
                                    ) {
                                        return (
                                            <Link to="/">
                                                {notification.sender} has
                                                accepted your friend request
                                                friend request.
                                            </Link>
                                        );
                                    } else if (
                                        notification.type ===
                                        "GROUP_MESSAGE"
                                    ) {
                                        return (
                                            <Link
                                                onClick={(e) =>
                                                    tempHandler(
                                                        e,
                                                        notification.chatId,
                                                    )
                                                }
                                                to={`/groups`}
                                            >
                                                {notification.sender} has sent a message to group {notification.chatId}
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
