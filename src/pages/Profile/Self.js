import React, { useContext, useEffect, useState } from "react";
import {getFriends, getUser, getFriendRequests, savePFP} from "../../api/withToken";
import FriendOpts from "../../components/FriendsOpts";
import NavBar from "../../components/NavBar";
import { AuthContext } from "../../context/auth-context";
import {useNavigate} from "react-router-dom";

import ReactS3 from 'react-s3';

window.Buffer = window.Buffer || require("buffer").Buffer;

const FriendsTable = ({ allFriends, location, triggers }) => {
    const navigate = useNavigate()
    return (
        <table>
            {allFriends.map((arr) => (
                <tr>
                    {arr.map((friendObj) =>
                        friendObj ? (
                            <td>
                                <div
                                    onClick={() => window.location = `/profile/${friendObj.email}`}
                                    style={{
                                        paddingTop: "20px",
                                        paddingLeft: "20px",
                                        paddingBottom: "20px",
                                    }}
                                >
                                    <img className="pfp" src={friendObj.pfpURL}/>
                                    <div
                                        style={{
                                            paddingLeft: "20px",
                                        }}
                                    >
                                        {friendObj.firstName}{" "}
                                        {friendObj.lastName}
                                    </div>
                                    <div style={{width:'10px'}}></div>
                                    <FriendOpts
                                        user2Email={friendObj.email}
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
    const auth = useContext(AuthContext);
    const [profile, setProfile] = useState(false);
    const [allFriends, setAllFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [numOfFriendRequests, setNumOfFriendRequests] = useState([]);
    const [numOfFriends, setNumOfFriends] = useState();
    const [tabState, setTabState] = useState("posts")
    const [friendsTabState, setFriendsTabState] = useState("friends")
    useEffect(() => {
        console.log('mounted', auth.pfpURL)
        getUser(auth.token, auth.email).then((response) => {
            setProfile(response);
        });
        getFriendsAndReqs()
    }, []);

    const getFriendsAndReqs = () => {
        getFriendRequests(auth.token, auth.email)
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
                setFriendRequests(formattedArr)
            })
            .catch((err) => console.error(err));

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
            })
            .catch((err) => console.error(err));
    }

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
                <ul>
                    <li className={friendsTabState==="friends" ? "select-tab-horizontal" : null} onClick={()=>{setFriendsTabState("friends");getFriendsAndReqs()}}>
                        All Friends
                    </li>
                    <li className={friendsTabState==="friends" ? null : "select-tab-horizontal" } onClick={()=>{setFriendsTabState("friendRequests");getFriendsAndReqs()}}>Friend Requests</li>
                </ul>
            </div>
            {friendsTabState==="friends" ?
                <FriendsTable
                    user1Email={auth.email}
                    allFriends={allFriends}
                    location="friends"
                    triggers={[getFriendsAndReqs]}
                />
                :
                <FriendsTable
                    user1Email={auth.email}
                    allFriends={friendRequests}
                    location="friendReqs"
                    triggers={[getFriendsAndReqs]}
                />
            }
        </section>
    }

    const config = {
        bucketName: 'traverse-profile-pics',
        dirName: 'photos',
        region: 'us-east-1',
        accessKeyId: 'AKIAWINDQUAYFPE5N6SF',
        secretAccessKey: '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',
    }

    const uploadPfp = (e) => {
        console.log(e.target.files[0])
        ReactS3.uploadFile(e.target.files[0], config).then((data) => {
            console.log(data)
            savePFP(auth.token, auth.email, data.location)
            auth.updatePfpURL(data.location)
        }).catch(err => alert(err))
    }

    return (
        <div style={{ height: "100%" }}>
            <NavBar />
            <div className="top-overlay"></div>
            <div className="bottom-overlay"></div>
            <div className="profile">
                <header>
                    <img onClick={() => console.log('185', auth.pfpURL)} src={auth.pfpURL} className="pfp-profile"></img>
                    <div className="pfp-edit-container">
                        <img className="pfp-edit-icon" src="https://cdn4.iconfinder.com/data/icons/interface-essential-3/24/pencil-modify-write-edit-change-writing-circle-512.png" style={{height: "30px"}}/>
                        <input type="file" onChange={uploadPfp} className="pfp-input" />
                    </div>
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

export default Self;
