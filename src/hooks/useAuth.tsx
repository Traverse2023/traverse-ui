import React, {useState, useEffect, createContext,} from "react";
import {useNavigate} from "react-router-dom";
import {loginUser, registerUser} from "../api/auth";
import axios from "axios";
import {mainService, setMainServiceToken} from "../api/main-service";
import {toast} from "react-toastify";
import {setStorageServiceToken} from "../api/storageService";



type UserContextType = {
    user: User | null;
    token: string | null;
    register: (firstName:string, lastName:string, email:string, password:string) => void;
    login: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
    updatePfp: (pfpUrl:string) => {}
}

//username is email
type User = {
    id?: string | null;
    username: string | null;
    password?: string | null;
    firstName: string;
    lastName: string;
    pfpUrl: string;
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
        console.log(`useAuth: ${user}, ready? ${isReady}`)
        if(user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            setMainServiceToken(token);
            setStorageServiceToken(token);
        }
        setIsReady(true);
    }, []);

    useEffect(() => {
        if (user && token) {
            localStorage.setItem("user", JSON.stringify(user))
        } else {
            logout()
        }

    }, [user]);

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

    const updatePfp = async(pfpUrl: string) => {
        if (user !== null) {
            user.pfpUrl = pfpUrl
        } else {
            logout()
        }
    }

    // Perform login using UI form data. Save response containing token and user to local storage and state
    const login = async(username: string, password: string) => {
        console.log(`Performing login with user: ${username}`);
        await loginUser(username, password).then((data) => {
            const userLoggedIn: User = {
                id: data.id,
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                pfpUrl: data.pfpUrl ? data.pfpUrl : ""

            };
            console.log(`User logged in: ${JSON.stringify(userLoggedIn)}`);
            localStorage.setItem("user", JSON.stringify(userLoggedIn));
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("token", data.accessToken);
            setToken(data.accessToken);
            console.log('invoking token87', data.accessToken);
            setMainServiceToken(data.accessToken);
            setStorageServiceToken(data.accessToken);
            setUser(userLoggedIn!);

        }).catch((err) => {
            console.log(`An error occurred when logging in: ${err}`);
            toast.error(err.message);
        });
    }

    // Returns if user is currently logged in
    const isLoggedIn = () => {
        console.log('mainServiceHeaders', mainService.defaults.headers["Authorization"])
        return (!!user && !!token)
    }

    // Perform logout by removing user and tokens from local storage
    const logout = () => {
        console.log("Logging user out. Deleting user and token...")
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
    }

    return (
        <UserContext.Provider value={{ login, user, token, logout, isLoggedIn, register, updatePfp }}>
        {isReady ? children : null}
        </UserContext.Provider>
    );

};

export const useAuth = () => React.useContext(UserContext);
