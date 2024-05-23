import React, {useState} from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Algo from "./pages/Algo/index.tsx";
import Groups from "./pages/Groups";
import Profile from "./pages/Profile";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";
import Search from "./pages/Search";
import FriendsSocket from "./sockets/friends";
import {SocketContext} from "./context/friends-socket-context";
import ChatSocket from "./sockets/chat";
import Post from "./pages/Feed/Post";
import AgoraRTC, {AgoraRTCProvider, useRTCClient} from "agora-rtc-react";
import {GroupProvider} from "./context/group-context.tsx";
import NotificationSocket from "./sockets/notifications.js";
import {getGroups} from "./api/withToken.js";


function App() {
    const { token, email, firstName, lastName, pfpURL, acceptLogin, acceptLogout, updatePfpUrl } = useAuth();
    const client = useRTCClient(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));


    let routes;
    let friendsSocket;
    let chatsSocket;
    let notificationsSocket;
    if (token) {
        friendsSocket = new FriendsSocket(email)
        chatsSocket = new ChatSocket(email)
        notificationsSocket = new NotificationSocket(email)
        getGroups(token, email).then( (groups) => {
            console.log("Groups: ", groups);
            groups.forEach(g => notificationsSocket.joinRoom(g.groupId));
        })
        routes = (
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/groups" element={<Groups />} />
                    <Route path="/profile/:email" element={<Profile />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/post" element={<Post type="page" />} />
                    <Route path="/algo" element={<Algo />} />
                    {/*<Route path="*" element={<Navigate to="/" />} />*/}
                </Routes>
            </Router>
        );
    } else {
        routes = (
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                     {/*<Route path="*" element={<Navigate to="/" replace />} />*/}
                </Routes>
            </Router>
        );
    }

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
            <SocketContext.Provider value={{
                friendsSocketApi: token ? friendsSocket : null,
                chatsSocketApi: token ? chatsSocket : null,
                notificationsSocketApi: token ? notificationsSocket : null
            }}>
                <AgoraRTCProvider client={client}>
                    <GroupProvider>
                        <div className="App">{routes}</div>
                    </GroupProvider>
                </AgoraRTCProvider>
            </SocketContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
