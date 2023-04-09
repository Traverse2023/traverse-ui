import React, { useContext, useEffect, useState } from "react";
import { getFriends, getUser } from "../../api/withToken";
import FriendOpts from "../../components/FriendsOpts";
import NavBar from "../../components/NavBar";
import { AuthContext } from "../../context/auth-context";

const FriendsTable = ({ allFriends }) => {
    return (
        <table>
            {allFriends.map((arr) => (
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
    );
};

const Self = () => {
    const auth = useContext(AuthContext);
    const [profile, setProfile] = useState(false);
    const [allFriends, setAllFriends] = useState([]);
    const [numOfFriends, setNumOfFriends] = useState();
    useEffect(() => {
        getUser(auth.token, auth.email).then((response) => {
            setProfile(response);
        });

        getFriends(auth.token, auth.email)
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
                                    <ul>
                                        <li className="select-tab-horizontal">
                                            All Friends
                                        </li>
                                        <li>Friend Requests</li>
                                    </ul>
                                </div>
                                <FriendsTable
                                    user1Email={auth.email}
                                    allFriends={allFriends}
                                />
                            </section>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Self;
