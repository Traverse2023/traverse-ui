import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import Profile from "./pages/Profile";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";
import Search from "./pages/Search";
import FriendsSocket from "./sockets/friends";
import {SocketContext} from "./context/friends-socket-context";
import {NotificationsContext} from "./context/notifications-context";
import ChatSocket from "./sockets/chat";
import Post from "./pages/Feed/Post";

function App() {
    const { token, email, firstName, lastName, pfpURL, acceptLogin, acceptLogout, updatePfpUrl } = useAuth();

    let routes;
    let friendsSocket;
    let chatsSocket;
    if (token) {
        friendsSocket = new FriendsSocket(email)
        chatsSocket = new ChatSocket(email)
        routes = (
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/groups" element={<Groups />} />
                    <Route path="/profile/:email" element={<Profile />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/post" element={<Post type="page" />} />
                </Routes>
            </Router>
        );
    } else {
        routes = (
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
                </Routes>
            </Router>
        );
    }
    const [notifications, setNotifications] = React.useState([])
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                email: email,
                token: token,
                firstName: firstName,
                lastName: lastName,
                pfpURL: pfpURL,
                acceptLogin: acceptLogin,
                acceptLogout: acceptLogout,
                updatePfpURL: updatePfpUrl
            }}
        >
            <NotificationsContext.Provider value={{
                notifications: notifications,
                setNotifications: setNotifications
            }}>
            <SocketContext.Provider value={{
                friendsSocketApi: friendsSocket,
                chatsSocketApi: chatsSocket
            }}>
                <div className="App">{routes}</div>
            </SocketContext.Provider>
            </NotificationsContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
