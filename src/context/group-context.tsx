// @ts-ignore
import {createContext, useEffect, useRef, useState} from "react";
import {getMembers} from "../api/main-service.js";
import {useCall, VideoPlayerEnum} from "../hooks/call-hook.js";

type Member = {
    id: string
    lastName: string
    firstName: string
    password: string
    pfpURL: string
    email: string
}

type SelectedGroup = {
    groupId: string
    groupName: string
}

interface GroupContextType {
    selectedGroup: SelectedGroup,
    setSelectedGroup: any,
    selectedTextChannel: string,
    setSelectedTextChannel: any,
    selectedVoiceChannel: string | null,
    setSelectedVoiceChannel: any,
    members: Member[],
    setMembers: any,
    inCall: boolean,
    setInCall: any
    isMuted: boolean
    setIsMuted: (isMuted: boolean) => void
    videoPlayerType: VideoPlayerEnum
    setVideoPlayerType: (videoPlayerType: VideoPlayerEnum) => void
    cameraOn: boolean
    setCameraOn: any
    agoraConfig: any
    setAgoraConfig: any
    speakerUid: number | null
    setSpeakerUid: any
    currentUserUid: number | null
    setCurrentUserUid: any
}


export const GroupContext = createContext<GroupContextType>({
    selectedGroup: {groupName: "control-center", groupId: ""},
    setSelectedGroup: () => {},
    selectedTextChannel: "general",
    setSelectedTextChannel: () => {},
    selectedVoiceChannel: null,
    setSelectedVoiceChannel: () => {},
    members: [],
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
    const isInitialRender = useRef(true)
    const [selectedGroup, setSelectedGroup] = useState(
        {groupId: "control-center", groupName: "control-center"});

    const [selectedTextChannel, setSelectedTextChannel] = useState("general");

    const callHookStates = useCall(selectedGroup)
    const [members, setMembers] = useState([])
    // const [isPortableMediaToggled, setIsPortableMediaToggled] = useState(false)


    // Get members whenever group is changed
    // should only run after on update of group and not on initial render to avoid
    // unauthorized calls to api that will result in 401
    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
        } else{
            getMembers(selectedGroup.groupId)
                .then((response) => {
                    setMembers(response);
                    console.log(`Get members from context: ${JSON.stringify(response)}`);
                })
                .catch((err) => console.error(err));
        }
    }, [selectedGroup.groupId]);


    return (
        <GroupContext.Provider value={{
            selectedGroup: selectedGroup,
            setSelectedGroup: setSelectedGroup,
            selectedTextChannel: selectedTextChannel,
            setSelectedTextChannel: setSelectedTextChannel,
            members: members,
            setMembers: setMembers,
            ...callHookStates
            }}>
            {children}
        </GroupContext.Provider>
    )
}
