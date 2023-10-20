import { createContext } from "react";

export const SocketContext = createContext({
    friendsSocketApi: null,
    chatsSocketApi: null
});