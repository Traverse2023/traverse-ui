import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFriends, getMutualFriends, getUser } from "../../api/withToken";
import FriendOpts from "../../components/FriendsOpts";
import NavBar from "../../components/NavBar";
import { AuthContext } from "../../context/auth-context";

const FriendsTable = ({ friends }) => {
    return friends ? (
        <table>
            {friends.map((arr) => (
                <tr>
                    {arr.map((friendObj) =>
                        friendObj ? (
                            <td>
                                <div
                                    style={{
                                        paddingBottom: "20px",
                                    }}
                                >
                                    <div className="pfp"> </div>
                                    <div
                                        style={{
                                            paddingLeft: "20px",
                                        }}
                                    >
                                        {friendObj.firstName}{" "}
                                        {friendObj.lastName}
                                    </div>
                                    <FriendOpts
                                        user2Email={friendObj.email}
                                        component="Profile"
                                    />
                                </div>
                            </td>
                        ) : null
                    )}
                </tr>
            ))}
        </table>
    ) : null;
};

const Other = () => {
    const { email } = useParams();
    const [allFriends, setAllFriends] = useState([]);
    const [mutualFriends, setMutualFriends] = useState([]);
    const auth = useContext(AuthContext);
    const [numOfFriends, setNumOfFriends] = useState();
    const [profile, setProfile] = useState(false);
    useEffect(() => {
        getUser(auth.token, email).then((response) => {
            setProfile(response);
        });
        getMutualFriends(auth.token, email, auth.email)
            .then((response) => {
                console.log("====================================");
                console.log("56mutual friends", response);
                let formattedArr = [];
                for (let i = 0; i < response.length; i++) {
                    if (i % 2 === 0) {
                        formattedArr.push([response[i], response[i + 1]]);
                    }
                }
                setMutualFriends(formattedArr);
                console.log("====================================");
            })
            .catch((err) => console.error(err));
        getFriends(auth.token, email)
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
                // formattedArr.map((arr) => {
                //     console.log("====================================");
                //     console.log("arr", arr);
                //     console.log("====================================");
                //     arr.map((friendObj) => {
                //         console.log("====================================");
                //         console.log(friendObj.firstName);
                //         console.log("====================================");
                //     });
                // });
            })
            .catch((err) => console.error(err));
    }, []);

    const [friendsTabs, setFriendsTabs] = useState("ALL_FRIENDS");
    const friendsMap = {
        ALL_FRIENDS: allFriends,
        MUTUAL_FRIENDS: mutualFriends,
        FRIEND_REQUESTS: [],
    };

    const FriendsTabsComponent = () => {
        if (friendsTabs === "ALL_FRIENDS") {
            return (
                <ul>
                    <li className="select-tab-horizontal">All Friends</li>
                    <li onClick={() => setFriendsTabs("MUTUAL_FRIENDS")}>
                        Mutual Friends
                    </li>
                    <li onClick={() => setFriendsTabs("FRIEND_REQUESTS")}>
                        Friend Requests
                    </li>
                </ul>
            );
        } else if (friendsTabs === "MUTUAL_FRIENDS") {
            return (
                <ul>
                    <li onClick={() => setFriendsTabs("ALL_FRIENDS")}>
                        All Friends
                    </li>
                    <li className="select-tab-horizontal">Mutual Friends</li>
                    <li onClick={() => setFriendsTabs("FRIEND_REQUESTS")}>
                        Friend Requests
                    </li>
                </ul>
            );
        } else {
            return (
                <ul>
                    <li onClick={() => setFriendsTabs("ALL_FRIENDS")}>
                        All Friends
                    </li>
                    <li onClick={() => setFriendsTabs("MUTUAL_FRIENDS")}>
                        Mutual Friends
                    </li>
                    <li className="select-tab-horizontal">Friend Requests</li>
                </ul>
            );
        }
    };

    return (
        <div style={{ height: "100%" }}>
            <NavBar />
            <div className="top-overlay"></div>
            <div className="bottom-overlay"></div>
            <div className="profile">
                <header>
                    <div className="pfp-profile"></div>
                    <div className="header-text">
                        <h1>
                            {profile.firstName} {profile.lastName}
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
                            <li className="selected-tab">Posts</li>
                            <li>About</li>
                            <li>Friends</li>
                        </ul>
                    </section>
                    <section className="profile-content">
                        <div className="profile-content-div">
                            <section className="friends">
                                <header>
                                    <div className="top">
                                        <h1>Friends</h1>
                                        <input />
                                    </div>
                                </header>
                                <div className="friends-tabs">
                                    <FriendsTabsComponent />
                                </div>
                                <FriendsTable
                                    friends={friendsMap[friendsTabs]}
                                />
                            </section>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Other;
