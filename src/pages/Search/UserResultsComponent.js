import { useEffect, useState } from "react";

const FriendOptsComponent = ({ email, isFriend, addFriend, result }) => {
    const [clientSentFriendRequest, setSentFriendRequest] = useState(false);

    useEffect(() => {
        console.log("7result", result);
        if (result.sentFriendRequest) setSentFriendRequest(true);
    }, []);

    if (isFriend) {
        return (
            <div className="inner-options">
                <p className="friend-options">&#10003; Friends</p>
                <button className="friend-options">Remove Friend</button>
            </div>
        );
    }

    if (clientSentFriendRequest) {
        return (
            <div className="inner-options">
                <p className="friend-options">Request Sent</p>
                <button className="friend-options">Remove Friend</button>
            </div>
        );
    }

    return (
        <div className="inner-options">
            <button
                className="friend-options"
                onClick={() => {
                    setSentFriendRequest(true);
                    addFriend(email);
                }}
            >
                Add Friend
            </button>
            <button className="friend-options">Remove Friend</button>
        </div>
    );
};

const UserResultsComponent = ({ results, addFriend }) => {
    return (
        <ul className="people">
            {results.map((result) => {
                return (
                    <>
                        <li className="person">
                            <div className="pfp"></div>{" "}
                            <h4>
                                {result.firstName} {result.lastName}
                            </h4>
                            <div className="options">
                                <FriendOptsComponent
                                    email={result.email}
                                    isFriend={result.isFriend}
                                    result={result}
                                    addFriend={addFriend}
                                />
                            </div>
                        </li>
                        <br />
                    </>
                );
            })}
        </ul>
    );
};
export default UserResultsComponent;
