import React, {useState, useEffect, createContext,} from "react";
import {useNavigate} from "react-router-dom";
import {loginUser, registerUser} from "../api/auth";
import axios from "axios";
import {setMainServiceToken} from "../api/main-service";
import {toast} from "react-toastify";
import {setStorageServiceToken} from "../api/storageService";



type UserContextType = {
    user: User | null;
    token: string | null;
    register: (firstName:string, lastName:string, email:string, password:string) => void;
    login: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
}

//username is email
type User = {
    id?: string | null;
    username: string | null;
    password?: string | null;
    firstName: string;
    lastName: string;
    pfpUrl: string | null;
}

type Props = {children: React.ReactNode};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({children}: Props) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if(user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            setMainServiceToken(token);
            setStorageServiceToken(token);
        }
        setIsReady(true);
    }, []);

    // Create user from submitted UI data and perform register call
    const register = async(firstName: string, lastName: string, email: string, password: string) => {
        const user: User = {
            username: email,
            firstName,
            lastName,
            password,
            pfpUrl: "",
        }
        await registerUser(user).then((res) => {
            console.log("User created successfully...");
            toast.success("User registered successfully!")
        }).catch((err) => {
            console.log(`Register user failed with error: ${err.message}`);
            toast.error(err.message);
        })
    }

    // Perform login using UI form data. Save response containing token and user to local storage and state
    const login = async(username: string, password: string) => {
        await loginUser(username, password).then((res) => {
            const userLoggedIn: User = {
                id: res?.data.id,
                username: res?.data.username,
                firstName: res?.data.firstName,
                lastName: res?.data.lastName,
                pfpUrl: res?.data.lastName ? res.data.lastName : ""

            };
            console.log(`User logged in: \n${userLoggedIn}`);
            localStorage.setItem("user", JSON.stringify(userLoggedIn));
            localStorage.setItem("refreshToken", res?.data.refreshToken);
            localStorage.setItem("token", res?.data.accessToken);
            setToken(res?.data.accessToken!);
            setUser(userLoggedIn!);
        }).catch((err) => {
            console.log(`An error occurred when logging in: ${err}`);
            toast.error(err.message);
        });
    }

    // Returns if user is currently logged in
    const isLoggedIn = () => {
        return !user;
    }

    // Perform logout by removing user and tokens from local storage
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
    }

    return (
        <UserContext.Provider value={{ login, user, token, logout, isLoggedIn, register }}>
        {isReady ? children : null}
        </UserContext.Provider>
    );

};

export const useAuth = () => React.useContext(UserContext);
