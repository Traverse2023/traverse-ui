import React, { useContext, useEffect, useRef, useState } from "react";
import { getGroups } from "../../api/withToken";
import { AuthContext } from "../../context/auth-context";
import { GroupContext } from "../../context/group-context";
import ChatSocket from "../../sockets/chat";
import {SocketContext} from "../../context/friends-socket-context";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {NotificationsContext} from "../../context/notifications-context.js";

const GroupSelector = () => {
    const groupControl = useContext(GroupContext);
    const auth = useContext(AuthContext);
    const { chatsSocketApi } = useContext(SocketContext)
    const notificationContext = useContext(NotificationsContext)
    const notifications = notificationContext.notifications.map((notification) => {
        return notification.groupId
    })

    let { state } = useLocation();
    const navigate = useNavigate();

    console.log("15", state)

    useEffect(() => {
        if (state) {
            console.log('17', state)
            groupControl.setSelectedGroup({groupId: state, groupName: "X"})
        }
    }, [state]);


    const [groups, setGroups] = useState([]);
    useEffect(() => {
        getGroups(auth.token, auth.email)
            .then((response) => {
                setGroups(response);
            })
            .catch((err) => console.error(err));
    }, []);


    useEffect(() => {
        console.log("NOTS INSIDE GROUP SELECTOR", notifications)
    }, [notifications]);

    const groupClickHandler = (event) => {
        window.history.replaceState({}, document.title)

        // navigate({
        //     pathname: location.pathname,
        //     search: location.search,
        //     state: { resetState: true },
        // });

        groupControl.setSelectedGroup({groupId: event.target.id, groupName: event.target.getAttribute("data-name")});
        // chatsSocketApi.disconnect()
        const newNotifications = notifications.filter(({ groupId }) => groupId != event.target.id)
        notificationContext.setNotifications(newNotifications)
        chatsSocketApi.joinRoom(event.target.id)
    };

    console.log("7", groupControl.selectedGroup);
    return (
        <div className="groupSelector">
            <div
                className={
                    groupControl.selectedGroup.groupId === "control-center"
                        ? "groupSelected msgHome"
                        : "msgHome group"
                }
            >
                <h1 id="control-center" onClick={groupClickHandler}>
                    Control Center
                </h1>
            </div>
            <hr />
            {groups.map((group) => {
                return (
                    <div
                        className={
                            groupControl.selectedGroup.groupId === group.groupId
                                ? "groupSelected"
                                : "group" + (notifications.includes(group.groupId) ? " newNotification" : "")
                        }
                        id={group.groupId}
                        data-name={group.groupName}
                        onClick={groupClickHandler}
                    >
                        <h1 id={group.groupId} data-name={group.groupName}>
                            {group.groupName}
                        </h1>
                    </div>
                );
            })}
        </div>
    );
};

export default GroupSelector;
