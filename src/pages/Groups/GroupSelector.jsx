import React, { useContext, useEffect, useRef, useState } from "react";
import { getGroups } from "../../api/main-service.js";
import { GroupContext } from "../../context/group-context.tsx";
import {SocketContext} from "../../context/friends-socket-context";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.tsx";

const GroupSelector = () => {
    const  {user} = useAuth()
    const groupControl = useContext(GroupContext);
    const { chatsSocketApi } = useContext(SocketContext)

    let { state } = useLocation();

    useEffect(() => {
        if (state) {
            console.log('17', state)
            groupControl.setSelectedGroup({groupId: state, groupName: "X"})
        }
    }, [state]);


    const [groups, setGroups] = useState([]);
    useEffect(() => {
        getGroups(user.id)
            .then((response) => {
                setGroups(response);
            })
            .catch((err) => console.error(err));
    }, []);

    const groupClickHandler = (event) => {
        window.history.replaceState({}, document.title)
        groupControl.setSelectedGroup({groupId: event.target.id, groupName: event.target.getAttribute("data-name")});
        chatsSocketApi.joinRoom(event.target.id, "general")
    };

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
                        key={group.groupId}
                        className={
                            groupControl.selectedGroup.groupId === group.groupId
                                ? "groupSelected"
                                : "group"
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
