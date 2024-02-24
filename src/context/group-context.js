import { createContext } from "react";


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
    setTriggerDisconnect: () => {}
});
