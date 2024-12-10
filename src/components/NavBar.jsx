import React, {useContext, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import useSound from "use-sound";
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
import { GroupContext } from "../context/group-context.tsx";
import CallContainer from "./CallContainer.tsx";
import usePaginatedNotifications from "../hooks/usePaginatedNotifications.js";
import {useAuth} from "../hooks/useAuth.tsx";
import Logo from "./Logo.tsx";


const NavBar = () => {
    const { logout, user } = useAuth();
    const { notificationsSocketApi} = useContext(SocketContext);
    const [play] = useSound("/audio/notificationsound.mp3");
    const navigate = useNavigate();
    const groupControl = useContext(GroupContext);
    const [search, setSearch] = useState();
    const [newData, setNewData] = useState("");
    const [page, setPage] = useState(0);
    const { notifications, error, loading, hasMore } = usePaginatedNotifications( page, newData)

    useEffect(() => {
        console.log("Change in notifications:\n", notifications);
    }, [notifications]);


    notificationsSocketApi.receiveNotification((notification) => {
        console.log("Receive notification:\n", notification);
        setNewData(notification);
        play();
    });

    const logoutUser = () => {
        logout();
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
        setSelectedGroup({ groupId, groupName });
        console.log("clickedLink", notifications);
    };

    return (
        <div className="navbar">
            <div className="logo2">
                <div className="logo-wrapper">
                    <Logo />
                    <div style={{lineHeight: "15px", letterSpacing: "2px", fontSize: "12px"}}><p className="code-font" style={{margin: 0, height: "fit-content"}}>Code</p><p className="code-font" style={{margin: 0}}>Hive</p></div>
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
                            <Link to={`/profile/${user.id}`}>
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
                            <Link onClick={logoutUser}>
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
