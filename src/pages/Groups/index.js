import React, { createContext, useContext, useState } from "react";
import NavBar from "../../components/NavBar";
import { GroupContext } from "../../context/group-context";
import ControlCenter from "./ControlCenter";
import GroupSelector from "./GroupSelector";
import Members from "./Members";
import MessageArea from "./MessageArea";
import SubGroupSelector from "./SubGroupSelector";

const Groups = () => {
    const groupControl = useContext(GroupContext);

    const [selectedGroup, setSelectedGroup] = useState({groupId: "control-center", groupName: "control-center"});
    const [selectedChannel, setSelectedChannel] = useState("general");
    const [members, setMembers] = useState([])

    return (
        <GroupContext.Provider
            value={{
                selectedGroup: selectedGroup,
                selectedChannel: selectedChannel,
                setSelectedChannel: setSelectedChannel,
                setSelectedGroup: setSelectedGroup,
                members: members,
                setMembers: setMembers
            }}
        >
            <div style={{ height: "100%" }}>
                <div className="groupsContainer">
                    <NavBar />
                    <GroupSelector />
                    {selectedGroup.groupId !== "control-center" ? (
                        <>
                            <SubGroupSelector />
                            <MessageArea />
                            <Members />
                        </>
                    ) : (
                        <ControlCenter />
                    )}
                </div>
            </div>
        </GroupContext.Provider>
    );
};

export default Groups;
