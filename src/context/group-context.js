import { createContext } from "react";

export const GroupContext = createContext({
    selectedGroup: "control-center",
    selectedChannel: "general",
});
