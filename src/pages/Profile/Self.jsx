import React, { useEffect, useState } from "react";
import {getFriends, getFriendRequests, savePfp} from "../../api/main-service.js";
import FriendOpts from "../../components/FriendsOpts";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.tsx";


const FriendsTable = ({ allFriends, location, triggers }) => {
    const navigate = useNavigate();
    return (
        <table>
            {allFriends.map((arr) => (
                <tr>
                    {arr.map((friend) =>
                        friend ? (
                            <td>
                                <div
                                    onClick={() =>
                                        (window.location = `/profile/${friend.id}`)
                                    }
                                    style={{
                                        paddingTop: "20px",
                                        paddingLeft: "20px",
                                        paddingBottom: "20px",
                                    }}
                                >
                                    <img
                                        className="pfp"
                                        src={friend.pfpURL}
                                    />
                                    <div
                                        style={{
                                            paddingLeft: "20px",
                                        }}
                                    >
                                        {friend.firstName}{" "}
                                        {friend.lastName}
                                    </div>
                                    <div style={{ width: "10px" }}></div>
                                    <FriendOpts
                                        user2Id={friend.id}
                                        component="Profile"
                                        locationState={location}
                                        triggers={triggers}
                                    />
                                </div>
                            </td>
                        ) : null
                    )}
                </tr>
            ))}
        </table>
    );
};

const Self = () => {
    const {user, updatePfp} = useAuth();
    const [allFriends, setAllFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [numOfFriendRequests, setNumOfFriendRequests] = useState([]);
    const [numOfFriends, setNumOfFriends] = useState();
    const [tabState, setTabState] = useState("posts");
    const [friendsTabState, setFriendsTabState] = useState("friends");
    const validPfpTypes = ['image/jpg', 'image/jpeg', 'image/png'];

    useEffect(() => {
        // TODO: Not needed if user is in global state?
        // console.log("mounted", user.pfpUrl);
        // getUser().then((response) => {
        //     setProfile(response);
        // });
        getFriendsAndReqs();
    }, []);

    useEffect(() => {
        console.log(`User updated on self profile view: ${JSON.stringify(user)}`);
    },[user])

    const getFriendsAndReqs = () => {
        getFriendRequests()
            .then((response) => {
                console.log("12", response);
                setNumOfFriendRequests(response.length);
                let formattedArr = [];
                for (let i = 0; i < response.length; i++) {
                    if (i % 2 === 0) {
                        formattedArr.push([response[i], response[i + 1]]);
                    }
                }
                console.log("====================================");
                console.log("19formattedArr", formattedArr);
                console.log("====================================");
                setFriendRequests(formattedArr);
            })
            .catch((err) => console.error(err));

        getFriends()
            .then((response) => {
                console.log("12", response);
                setNumOfFriends(response.length);
                let formattedArr = [];
                for (let i = 0; i < response.length; i++) {
                    if (i % 2 === 0) {
                        formattedArr.push([response[i], response[i + 1]]);
                    }
                }
                console.log("====================================");
                console.log("19formattedArr", formattedArr);
                console.log("====================================");
                setAllFriends(formattedArr);
            })
            .catch((err) => console.error(err));
    };

    let content;
    if (tabState === "posts") {
        content = (
            <section className="friends">
                <header>
                    <div className="top">
                        <h1>Posts</h1>
                        <input />
                    </div>
                </header>
            </section>
        );
    } else if (tabState === "about") {
        content = (
            <section className="friends">
                <header>
                    <div className="top">
                        <h1>About</h1>
                        <input />
                    </div>
                </header>
            </section>
        );
    } else if (tabState === "friends") {
        content = (
            <section className="friends">
                <header>
                    <div className="top">
                        <h1>Friends</h1>
                        <input />
                    </div>
                </header>
                <div className="friends-tabs">
                    <ul>
                        <li
                            className={
                                friendsTabState === "friends"
                                    ? "select-tab-horizontal"
                                    : null
                            }
                            onClick={() => {
                                setFriendsTabState("friends");
                                getFriendsAndReqs();
                            }}
                        >
                            All Friends
                        </li>
                        <li
                            className={
                                friendsTabState === "friends"
                                    ? null
                                    : "select-tab-horizontal"
                            }
                            onClick={() => {
                                setFriendsTabState("friendRequests");
                                getFriendsAndReqs();
                            }}
                        >
                            Friend Requests
                        </li>
                    </ul>
                </div>
                {friendsTabState === "friends" ? (
                    <FriendsTable
                        user1Email={user.id}
                        allFriends={allFriends}
                        location="friends"
                        triggers={[getFriendsAndReqs]}
                    />
                ) : (
                    <FriendsTable
                        user1Email={user.id}
                        allFriends={friendRequests}
                        location="friendReqs"
                        triggers={[getFriendsAndReqs]}
                    />
                )}
            </section>
        );
    }

    // Get file from event. Validate file is of desired image type.
    // Add image to form and send api request with form data
    const uploadPfp = (e) => {
        let pfpFile = e.target.files[0];
        console.log(`Uploading file: ${pfpFile.type}`);
        if (!validPfpTypes.find(type => type === pfpFile.type)) {
            // TODO: Display error
            console.log("Invalid pfp upload file type!");
            return
        }
        let form = new FormData();
        form.append('file', pfpFile);

        savePfp(form).then((res) => {
            console.log(`Profile pic uploaded to ${JSON.stringify(res)}!`);
            updatePfp(res);
            // TODO: Display error
        }).catch(error => console.log(`An error occurred uploading profile pic: ${error}`));
        console.log(`PFP: ${user.pfpUrl}`);
    };


    return (
        <div style={{ height: "100%" }}>
            <div className="top-overlay"></div>
            <div className="bottom-overlay"></div>
            <div className="profile">
                <header>
                    <img
                        onClick={() => console.log("185", user.pfpUrl)}
                        src={user.pfpUrl}
                        className="pfp-profile"
                    ></img>
                    <div className="pfp-edit-container">
                        <img
                            className="pfp-edit-icon"
                            src="https://cdn4.iconfinder.com/data/icons/interface-essential-3/24/pencil-modify-write-edit-change-writing-circle-512.png"
                            style={{ height: "30px" }}
                        />
                        <input
                            type="file"
                            onChange={uploadPfp}
                            className="pfp-input"
                        />
                    </div>
                    <div className="header-text">
                        <h1>
                            {user.firstName} {user.lastName}
                        </h1>

                        <h4>
                            {numOfFriends}{" "}
                            {numOfFriends > 1 ? "friends" : "friend"}
                        </h4>
                    </div>
                </header>

                <main>
                    <section className="profile-tabs">
                        <ul>
                            <li
                                className={
                                    tabState === "posts" ? "selected-tab" : null
                                }
                                onClick={() => setTabState("posts")}
                            >
                                Posts
                            </li>
                            <li
                                className={
                                    tabState === "about" ? "selected-tab" : null
                                }
                                onClick={() => setTabState("about")}
                            >
                                About
                            </li>
                            <li
                                className={
                                    tabState === "friends"
                                        ? "selected-tab"
                                        : null
                                }
                                onClick={() => setTabState("friends")}
                            >
                                Friends
                            </li>
                        </ul>
                    </section>
                    <section className="profile-content">
                        <div className="profile-content-div">{content}</div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Self;
