import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth-context";

const NavBar = () => {
    const auth = React.useContext(AuthContext);

    const navigate = useNavigate();

    const [search, setSearch] = React.useState();

    const logout = () => {
        auth.acceptLogout();
        window.location = "/";
    };

    const searchChangeHandler = (event) => {
        console.log(event.target.value);
        setSearch(event.target.value);
    };

    const submitSearch = (event) => {
        if (event.key === "Enter") {
            console.log("pressed enter");
            navigate("/search", {
                state: {
                    searchVal: search,
                },
            });
        }
    };

    return (
        <div className="navbar">
            <div className="logo2">
                <h1>Traverse</h1>
            </div>
            <input
                placeholder="Search"
                onKeyDown={submitSearch}
                onChange={searchChangeHandler}
            />
            <div className="right-side">
                <ul>
                    <li>
                        <Link to={"/"}>Feed</Link>
                    </li>
                    <li>
                        <Link to={"/groups"}>Groups</Link>
                    </li>
                    <li>
                        <Link to={"/profile"}>Profile</Link>
                    </li>
                    <li>
                        <Link onClick={logout}>Sign Out</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
