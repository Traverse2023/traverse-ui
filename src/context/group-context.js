import { createContext } from "react";

export const GroupContext = createContext({
    selectedGroup: "control-center",
    selectedChannel: "general",
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
