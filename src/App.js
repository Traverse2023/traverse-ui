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
import ChatSocket from "./sockets/chat";

function App() {
    const { token, email, acceptLogin, acceptLogout } = useAuth();

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
                acceptLogin: acceptLogin,
                acceptLogout: acceptLogout,
            }}
        >
            <SocketContext.Provider value={{
                friendsSocketApi: friendsSocket,
                chatsSocketApi: chatsSocket
            }}>
                <div className="App">{routes}</div>
            </SocketContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
