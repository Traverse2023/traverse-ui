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
    const [selectedTextChannel, setselectedTextChannel] = useState("general");
    const [selectedVoiceChannel, setSelectedVoiceChannel] = useState(null)
    const [members, setMembers] = useState([])
    const [inCall, setInCall] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [triggerDisconnect, setTriggerDisconnect] = useState(false)
    return (
        <GroupContext.Provider
            value={{
                selectedGroup: selectedGroup,
                selectedTextChannel: selectedTextChannel,
                setselectedTextChannel: setselectedTextChannel,
                selectedVoiceChannel: selectedVoiceChannel,
                setSelectedVoiceChannel: setSelectedVoiceChannel,
                setSelectedGroup: setSelectedGroup,
                members: members,
                setMembers: setMembers,
                inCall: inCall,
                setInCall: setInCall,
                isMuted: isMuted,
                setIsMuted: setIsMuted,
                triggerDisconnect: triggerDisconnect,
                setTriggerDisconnect: setTriggerDisconnect
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
