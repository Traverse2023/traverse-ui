import React, { useContext, useEffect, useRef, useState } from "react";
import { getGroups } from "../../api/withToken";
import { AuthContext } from "../../context/auth-context";
import { GroupContext } from "../../context/group-context";
import ChatSocket from "../../sockets/chat";
import {SocketContext} from "../../context/friends-socket-context";

const GroupSelector = () => {
    const groupControl = useContext(GroupContext);
    const auth = useContext(AuthContext);
    const { chatsSocketApi } = useContext(SocketContext)

    const [groups, setGroups] = useState([]);
    useEffect(() => {
        getGroups(auth.token, auth.email)
            .then((response) => {
                setGroups(response);
            })
            .catch((err) => console.error(err));
    }, []);

    const groupClickHandler = (event) => {
        console.log('23', event.target.id);
        groupControl.setSelectedGroup(event.target.id);
        // chatsSocketApi.disconnect()
        chatsSocketApi.joinRoom(event.target.id)
    };

    console.log("7", groupControl.selectedGroup);
    return (
        <div className="groupSelector">
            <div
                className={
                    groupControl.selectedGroup === "control-center"
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
                            groupControl.selectedGroup === group.groupId
                                ? "groupSelected"
                                : "group"
                        }
                        id={group.groupId}
                        onClick={groupClickHandler}
                    >
                        <h1 id={group.groupId}>
                            {group.groupName}
                        </h1>
                    </div>
                );
            })}
        </div>
    );
};

export default GroupSelector;
