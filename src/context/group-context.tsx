import {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {getMembers} from "../api/withToken.js";
import {AuthContext} from "./auth-context.js";
import {SocketContext} from "./friends-socket-context.js";
import {useRTCClient} from "agora-rtc-react";
import {useCall, VideoPlayerEnum} from "../hooks/call-hook.js";

type Member = {
    lastName: string
    firstName: string
    password: string
    pfpURL: string
    email: string
}

interface GroupContextType {
    selectedGroup: string
    selectedTextChannel: string
    selectedVoiceChannel: string | null,
    setSelectedVoiceChannel: () => void,
    members: Member[],
    messages: any,
    setMembers: () => void,
    inCall: boolean,
    setInCall: () => void
    isMuted: boolean
    setIsMuted: (isMuted: boolean) => void
    videoPlayerType: VideoPlayerEnum
    setVideoPlayerType: (videoPlayerType: VideoPlayerEnum) => void
    cameraOn: boolean
    setCameraOn: () => void
}


export const GroupContext = createContext<GroupContextType>({
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
    videoPlayerType: VideoPlayerEnum.FIT,
    setVideoPlayerType: () => {},
    cameraOn: false,
    setCameraOn: () => {}
});

// @ts-ignore
export const GroupProvider = ({children}) => {
    const [selectedGroup, setSelectedGroup] = useState(
        {groupId: "control-center", groupName: "control-center"});

    const [selectedTextChannel, setselectedTextChannel] = useState("general");

    const callHookStates = useCall(selectedGroup)
    const [members, setMembers] = useState([])
    // const [isPortableMediaToggled, setIsPortableMediaToggled] = useState(false)
    // @ts-ignore
    const {token} = useContext(AuthContext)

    //get members whenever group is changed
    useEffect(() => {
        getMembers(token, selectedGroup.groupId)
            .then((response) => {
                setMembers(response);
                console.log('54', response);
            })
            .catch((err) => console.error(err));
    }, [selectedGroup.groupId]);




    return (
        <GroupContext.Provider value={{
            selectedGroup: selectedGroup,
            setSelectedGroup: setSelectedGroup,
            selectedTextChannel: selectedTextChannel,
            setselectedTextChannel: setselectedTextChannel,
            members: members,
            setMembers: setMembers,
            ...callHookStates
            }}>
            {children}
        </GroupContext.Provider>
    )
}
