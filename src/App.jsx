import React, {useState} from "react";
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
import ChatSocket from "./sockets/chat";
import Post from "./pages/Feed/Post";

import AgoraRTC, {AgoraRTCProvider, useRTCClient} from "agora-rtc-react";

function App() {
    const { token, email, firstName, lastName, pfpURL, acceptLogin, acceptLogout, updatePfpUrl } = useAuth();
    const client = useRTCClient(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
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
                    <Route path="#/groups" element={<Groups />} />
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
                chatsSocketApi: token ? chatsSocket : null
            }}>
                <AgoraRTCProvider client={client}>
                    <div className="App">{routes}</div>
                </AgoraRTCProvider>
            </SocketContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
