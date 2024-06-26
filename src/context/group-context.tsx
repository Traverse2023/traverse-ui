import {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {getMembers} from "../api/withToken.js";
import {AuthContext} from "./auth-context.js";
import {SocketContext} from "./friends-socket-context.js";
import {UID, useRTCClient} from "agora-rtc-react";
import {useCall, VideoPlayerEnum} from "../hooks/call-hook.js";

type Member = {
    lastName: string
    firstName: string
    password: string
    pfpURL: string
    email: string
}

interface GroupContextType {
    showVideoView: boolean
    setShowVideoView: () => void
    selectedGroup: string
    // Defines the user selected text channel. User can be part of a text channel as well as a voice channel.
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
    agoraConfig: any
    setAgoraConfig: () => {}
    speakerUid: number | null
    setSpeakerUid: (uid: UID | null) => {}
    currentUserUid: number | null
    setCurrentUserUid: (uid: UID) => {}
}


export const GroupContext = createContext<GroupContextType>({
    selectedGroup: "control-center",
    showVideoView: false,
    setShowVideoView: () => {},
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
    setCameraOn: () => {},
    agoraConfig: {},
    //@ts-ignore
    setAgoraConfig: () => {},
    speakerUid: null,
    //@ts-ignore
    setSpeakerUid: () => {},
    currentUserUid: null,
    //@ts-ignore
    setCurrentUserUid: () => {}
});

// @ts-ignore
export const GroupProvider = ({children}) => {
    const [selectedGroup, setSelectedGroup] = useState(
        {groupId: "control-center", groupName: "control-center"});

    const [selectedTextChannel, setSelectedTextChannel] = useState("general");
    const [showVideoView, setShowVideoView] = useState(false)
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
            setSelectedTextChannel: setSelectedTextChannel,
            members: members,
            setMembers: setMembers,
            showVideoView: showVideoView,
            setShowVideoView: setShowVideoView,
            ...callHookStates
            }}>
            {children}
        </GroupContext.Provider>
    )
}
