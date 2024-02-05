import React from "react";
import NavBar from "../components/NavBar";
import Feed from "./Feed";

const Home = () => {
    return (
        <div style={{height: '100%'}}>
            <NavBar />
            <Feed />
        </div>
    );
};

export default Home;
