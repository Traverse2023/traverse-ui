import React, {useState, useEffect, createContext,} from "react";
import {useNavigate} from "react-router-dom";
import {loginUser, registerUser} from "../api/auth";
import axios from "axios";

//
// export const useAuth = () => {
//     const [token, setToken] = React.useState(false);
//     const [email, setEmail] = React.useState(false);
//     const [firstName, setFirstName] = React.useState(false)
//     const [lastName, setLastName] = React.useState(false)
//     const [pfpURL, setPfpURL] = React.useState(false)
//
//     const acceptLogin = useCallback((token) => {
//         setToken(token);
//         localStorage.setItem("email", email);
//         localStorage.setItem("token", token);
//         localStorage.setItem("firstName", firstName)
//         localStorage.setItem("lastName", lastName)
//         localStorage.setItem("expiration", tokenExpirationDate);
//         localStorage.setItem("pfpURL", pfpURL)
//         setEmail(email);
//         setFirstName(firstName)
//         setLastName(lastName)
//         setPfpURL(pfpURL)
//     }, []);
//
//     const acceptLogout = useCallback(() => {
//         setToken(null);
//         localStorage.clear();
//         setEmail(null);
//         setTokenExpirationDate(null);
//     });
//
//     const updatePfpUrl = useCallback((location) => {
//         setPfpURL(location)
//         localStorage.setItem("pfpURL", location)
//     })
//
//     useEffect(() => {
//         if (
//             localStorage.getItem("token") &&
//             localStorage.getItem("email")
//         ) {
//             acceptLogin(
//                 localStorage.getItem("email"),
//                 localStorage.getItem("firstName"),
//                 localStorage.getItem("lastName"),
//                 localStorage.getItem("pfpURL"),
//                 localStorage.getItem("token"),
//             );
//         }
//     }, [acceptLogin]);
//
//     useEffect(() => {
//         if (token && tokenExpirationDate) {
//             const remainingTime =
//                 tokenExpirationDate.getTime() - new Date().getTime();
//         } else {
//             clearTimeout(logoutTimer);
//         }
//     }, [token, acceptLogout, tokenExpirationDate]);
//
//     return { token, email, firstName, lastName, pfpURL, acceptLogin, acceptLogout, updatePfpUrl };
// };

type UserContextType = {
    user: User | null;
    token: string | null;
    register: (user: User) => void;
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
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if(user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        setIsReady(true);
    }, []);

    const register = async(user: User) => {
        await registerUser(user).then((res) => {
            const userCreated: User = {
                id: res?.data.id,
                username: res?.data.username,
                firstName: res?.data.firstName,
                lastName: res?.data.lastName,
                pfpUrl: res?.data.lastName

            };

        })
    }
    const login = async(username: string, password: string) => {
        await loginUser(username, password).then((res) => {
            const userLoggedIn: User = {
                id: res?.data.id,
                username: res?.data.username,
                firstName: res?.data.firstName,
                lastName: res?.data.lastName,
                pfpUrl: res?.data.lastName ? res.data.lastName : ""

            };
            console.log(`User created: \n${userLoggedIn}`);

            localStorage.setItem("refreshToken", res?.data.refreshToken);
            localStorage.setItem("token", res?.data.accessToken);
            setToken(res?.data.accessToken!);
            setUser(userLoggedIn!);

        }).catch((err) => console.log(`An error occurred when logging in: ${err}`));
    }

    const isLoggedIn = () => {
        return !user;
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/");
    }

    return (
        <UserContext.Provider value={{ login, user, token, logout, isLoggedIn, register }}>
        {isReady ? children : null}
        </UserContext.Provider>
    );

};

export const useAuth = () => React.useContext(UserContext);
