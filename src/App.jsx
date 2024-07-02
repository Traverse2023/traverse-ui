import React, {useEffect, useState} from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home";
import Algo from "./pages/Algo";
import Groups from "./pages/Groups";
import Profile from "./pages/Profile";
import {useAuth, UserProvider} from "./hooks/useAuth.tsx";
import Search from "./pages/Search";
import FriendsSocket from "./sockets/friends";
import {SocketContext} from "./context/friends-socket-context";
import ChatSocket from "./sockets/chat";
import Post from "./pages/Feed/Post";
import AgoraRTC, {AgoraRTCProvider, useRTCClient} from "agora-rtc-react";
import {GroupProvider} from "./context/group-context.tsx";
import NotificationSocket from "./sockets/notifications.js";
import {getGroups} from "./api/main-service.js";
import CallContainer from "./components/CallContainer.tsx";
import NavBar from "./components/NavBar.jsx";



function App() {
    const { user, token, isLoggedIn } = useAuth();
    const client = useRTCClient(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));

    let routes;
    let friendsSocket;
    let chatsSocket;
    let notificationsSocket;
    console.log('invoking isLoggedIn', isLoggedIn());
    if (isLoggedIn()) {
        console.log("IS LOGGED IN")
        friendsSocket = new FriendsSocket(user.id, token);
        chatsSocket = new ChatSocket(user.id, token);
        notificationsSocket = new NotificationSocket(user.id, token);
        getGroups().then( (groups) => {
            console.log("Groups: ", groups);
            groups.forEach(g => notificationsSocket.joinRoom(g.groupId));
        })
        routes = (
            <SocketContext.Provider value={{
                friendsSocketApi: friendsSocket,
                chatsSocketApi: chatsSocket,
                notificationsSocketApi: notificationsSocket}}>
                <AgoraRTCProvider client={client}>
                    <GroupProvider>
                        <Router>
                            <CallContainer />
                            <NavBar/>
                            <div className="content"><Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/groups" element={<Groups />} />
                                <Route path="/profile/:userId" element={<Profile />} />
                                <Route path="/search" element={<Search />} />
                                <Route path="/post" element={<Post type="page" />} />
                                <Route path="/algo" element={<Algo />} />
                                {/*<Route path="*" element={<Navigate to="/" />} />*/}
                            </Routes></div>
                        </Router>
                    </GroupProvider>
                </AgoraRTCProvider>
            </SocketContext.Provider>
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
          <div className="App">{routes}</div>
    );
}


export default App;
