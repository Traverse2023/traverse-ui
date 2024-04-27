import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    email: "",
    token: "",
    firstName: "",
    lastName: "",
    pfpURL: "",
    updatePfpURL: () => {},
    login: () => {},
    logout: () => {},
});
