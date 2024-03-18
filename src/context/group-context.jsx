import {createContext, useContext, useEffect, useState} from "react";
import {getMembers} from "../api/withToken.js";
import {AuthContext} from "./auth-context.js";
import {SocketContext} from "./friends-socket-context.js";
import {useRTCClient} from "agora-rtc-react";
import {useCall} from "../hooks/call-hook.js";


export const GroupContext = createContext({
    selectedGroup: "control-center",
    selectedTextChannel: "general",
    selectedVoiceChannel: null,
    setSelectedVoiceChannel: () => {},
    members: [],
    messages: [],
    setMembers: () => { },
    inCall: false,
    setInCall: () => {},
    isMuted: false,
    setIsMuted: () => {},
    triggerDisconnect: false,
    setTriggerDisconnect: () => {},
    isPortableMediaToggled: false,
    setIsPortableMediaToggled: () => {}
});

export const GroupProvider = ({children}) => {
    const auth = useContext(AuthContext)
    const [selectedGroup, setSelectedGroup] = useState(
        {groupId: "control-center", groupName: "control-center"});
    const [selectedTextChannel, setselectedTextChannel] = useState("general");
    const { selectedVoiceChannel, setSelectedVoiceChannel, inCall, setInCall, channelUsersMap, isMuted, setIsMuted, cameraOn, setCameraOn}= useCall(selectedGroup)
    const [members, setMembers] = useState([])
    const [isPortableMediaToggled, setIsPortableMediaToggled] = useState(false)
    const {token} = useContext(AuthContext)

    //get members whenever group is changed
    useEffect(() => {
        getMembers(token, selectedGroup.groupId)
            .then((response) => {
                setMembers(response);
                console.log('54', response)
            })
            .catch((err) => console.error(err));
    }, [selectedGroup.groupId]);

    return (
        <GroupContext.Provider value={{
            selectedGroup: selectedGroup,
            setSelectedGroup: setSelectedGroup,
            selectedTextChannel: selectedTextChannel,
            setselectedTextChannel: setselectedTextChannel,
            selectedVoiceChannel: selectedVoiceChannel,
            setSelectedVoiceChannel: setSelectedVoiceChannel,
            members: members,
            setMembers: setMembers,
            inCall: inCall,
            setInCall: setInCall,
            isMuted: isMuted,
            setIsMuted: setIsMuted,
            channelUsersMap: channelUsersMap,
            cameraOn: cameraOn,
            setCameraOn: setCameraOn,
            isPortableMediaToggled: isPortableMediaToggled,
            setIsPortableMediaToggled: setIsPortableMediaToggled
            }}>
            {children}
        </GroupContext.Provider>
    )
}
