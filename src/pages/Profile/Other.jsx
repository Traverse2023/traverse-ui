import React, { useContext, useEffect, useState } from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { getFriends, getMutualFriends, getUser } from "../../api/main-service.js";
import FriendOpts from "../../components/FriendsOpts";


const FriendsTable = ({ friends }) => {
    const navigate = useNavigate()
    return friends ? (
        <table>
            {friends.map((arr) => (
                <tr>
                    {arr.map((friend) =>
                        friend ? (
                            <td>
                                <div
                                    onClick={() => window.location = `/profile/${friend.id}`}
                                    style={{
                                        paddingTop: "20px",
                                        paddingLeft: "20px",
                                        paddingBottom: "20px",
                                    }}
                                >
                                    <img className="pfp" src={friend.pfpURL}/>
                                    <div
                                        style={{
                                            paddingLeft: "20px",
                                        }}
                                    >
                                        {friend.firstName}{" "}
                                        {friend.lastName}
                                    </div>
                                    <div style={{width:'10px'}}></div>
                                    <FriendOpts
                                        user2Id={friend.email}
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
    const { userId } = useParams();
    const [allFriends, setAllFriends] = useState([]);
    const [mutualFriends, setMutualFriends] = useState([]);
    const [numOfFriends, setNumOfFriends] = useState();
    const [profile, setProfile] = useState(null);
    const loc = useLocation()
    const [tabState, setTabState] = useState("posts")
    const [friendsTabs, setFriendsTabs] = useState("ALL_FRIENDS");
    const friendsMap = {
        ALL_FRIENDS: allFriends,
        MUTUAL_FRIENDS: mutualFriends,
    };

    useEffect(() => {
        getUser(userId).then((res) => {
            setProfile(res);
        });

        getMutualFriends(profile.id)
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
        getFriends(userId)
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


    const FriendsTabsComponent = () => {
        if (friendsTabs === "ALL_FRIENDS") {
            return (
                <ul>
                    <li className="select-tab-horizontal">All Friends</li>
                    <li onClick={() => setFriendsTabs("MUTUAL_FRIENDS")}>
                        Mutual Friends
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

    let content
    if (tabState === "posts") {
        content = <section className="friends">
            <header>
                <div className="top">
                    <h1>Posts</h1>
                    <input />
                </div>
            </header>

        </section>
    } else if (tabState === "about") {
        content = <section className="friends">
            <header>
                <div className="top">
                    <h1>About</h1>
                    <input />
                </div>
            </header>
        </section>
    } else if (tabState === "friends") {
        content = <section className="friends">
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
    }

    return (
        <div style={{ height: "100%" }}>
            <div className="top-overlay"></div>
            <div className="bottom-overlay"></div>
            <div className="profile">
                <header className="other-header">
                    <img className="pfp-profile" src={profile.pfpUrl} alt="Profile"/>
                    <div className="header-text header-text-other">
                        <h1>
                            {profile.firstName} {profile.lastName}
                        </h1>

                        <h4>
                            {numOfFriends}{" "}
                            {numOfFriends > 1 ? "friends" : "friend"}
                        </h4>
                    </div>
                    <div style={{marginRight: "0", marginTop: "145px"}}>
                        <FriendOpts
                            user2Id={loc.pathname.split('/')[loc.pathname.split('/').length-1]}
                            locationState="other-profile"
                            component="Profile"
                        />
                    </div>
                </header>

                <main>
                    <section className="profile-tabs">
                        <ul>
                            <li className={tabState==="posts" ? "selected-tab" : null} onClick={()=>setTabState("posts")}>Posts</li>
                            <li className={tabState==="about" ? "selected-tab" : null} onClick={()=>setTabState("about")}>About</li>
                            <li className={tabState==="friends" ? "selected-tab" : null} onClick={()=>setTabState("friends")}>Friends</li>
                        </ul>
                    </section>
                    <section className="profile-content">
                        <div className="profile-content-div">
                            {content}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Other;
