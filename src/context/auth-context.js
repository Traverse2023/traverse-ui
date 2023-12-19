import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    email: null,
    token: null,
    firstName: null,
    lastName: null,
    pfpURL: null,
    updatePfpURL: () => {},
    login: () => {},
    logout: () => {},
});
