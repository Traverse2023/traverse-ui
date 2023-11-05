import { useEffect, useState, useContext } from "react";
import {
    acceptFriendRequest,
    getFriendshipStatus,
    removeFriendRequest,
    sendFriendRequest,
} from "../api/withToken";
import { AuthContext } from "../context/auth-context";
import {SocketContext} from "../context/friends-socket-context";

const FriendOpts = ({ user2Email, locationState = null, index, component = null }) => {
    const auth = useContext(AuthContext);
    const { friendsSocketApi } = useContext(SocketContext)

    const [friendshipStatusState, setFriendshipStatusState] = useState(false);

    friendsSocketApi.friendRequestListener((senderEmail) => {
        console.log('line18', index, senderEmail)
        if (user2Email === senderEmail) {
            setFriendshipStatusState({friendshipStatus: 'FRIEND_REQUEST', initiatedUser: senderEmail})
        }
        })

    friendsSocketApi.acceptListener((senderEmail) => {
        console.log('line23', index, senderEmail)
        if (user2Email === senderEmail) {
            setFriendshipStatusState({friendshipStatus: 'FRIENDS', initiatedUser: senderEmail})
        }
    })

    friendsSocketApi.declineFriendRequestListener((senderEmail) => {
        console.log('here32 ', senderEmail, "declinedFriendRequest")
        if (user2Email === senderEmail) {
            setFriendshipStatusState({friendshipStatusState: undefined})
        }
    })

    useEffect(() => {
        console.log(friendshipStatusState);
        getFriendshipStatus(auth.token, auth.email, user2Email)
            .then(({ friendshipStatus, initiatedUser }) => {
                setFriendshipStatusState({
                    friendshipStatus,
                    initiatedUser,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [locationState]);

    const addFriend = (potentialFriend) => {
        // sendFriendRequest(auth.token, auth.email, potentialFriend);
        setFriendshipStatusState({
            friendshipStatus: "FRIEND_REQUEST",
            initiatedUser: auth.email,
        });
        friendsSocketApi.sendFriendRequest(potentialFriend)
    };

    const unfriendHandler = (potentialFriend) => {
        console.log('62 friendsopts unfriend')
        setFriendshipStatusState({
            friendshipStatus: undefined,
        });
        friendsSocketApi.unfriend(potentialFriend)
    };

    const removeFriendRequestHandler = (potentialFriend) => {
        // removeFriendRequest(auth.token, auth.email, potentialFriend);
        setFriendshipStatusState({ friendshipStatus: undefined });
        friendsSocketApi.declineFriendRequest(potentialFriend)
    };

    const acceptFriendRequestHandler = (potentialFriend) => {
        // acceptFriendRequest(auth.token, auth.email, potentialFriend);
        setFriendshipStatusState({
            friendshipStatus: "FRIENDS",
            initiatedUser: null,
        });
        friendsSocketApi.acceptFriendRequest(potentialFriend)
    };

    if (user2Email === auth.email) {
        return (
            <div className="inner-options">
                <p className="friend-options">You </p>
            </div>
        );
    }

    if (friendshipStatusState) {
        switch (friendshipStatusState.friendshipStatus) {
            case undefined: //no friendship yet
                return (
                    <div className="inner-options">
                        <button
                            className="friend-options"
                            onClick={() => {
                                addFriend(user2Email);
                            }}
                        >
                            Add Friend
                        </button>
                    </div>
                );
            case "FRIEND_REQUEST":
                if (friendshipStatusState.initiatedUser === auth.email) {
                    return (
                        <div className="inner-options">
                            <p className="friend-options">Request Sent</p>
                            <button
                                className="friend-options"
                                onClick={() =>
                                    removeFriendRequestHandler(user2Email)
                                }
                            >
                                Remove Request
                            </button>
                        </div>
                    );
                } else {
                    return (
                        <div className="inner-options">
                            <button
                                className="friend-options"
                                onClick={() =>
                                    acceptFriendRequestHandler(user2Email)
                                }
                            >
                                Accept Request
                            </button>
                            <button
                                className="friend-options"
                                onClick={() =>
                                    removeFriendRequestHandler(user2Email)
                                }
                            >
                                Decline Request
                            </button>
                        </div>
                    );
                }
            case "FRIENDS":
                return component === "Profile" ? (
                    <div className="inner-options">
                        <button className="friend-options" onClick={() => unfriendHandler(user2Email)}>
                            Remove Friend
                        </button>
                    </div>
                ) : (
                    <div className="inner-options">
                        <p className="friend-options">&#10003; Friends</p>
                        <button className="friend-options" onClick={() => unfriendHandler(user2Email)}>
                            Remove Friend
                        </button>
                    </div>
                );
            default:
                <div>Loading...</div>;
        }
    } else {
        return <div>Loading ...</div>;
    }
};

export default FriendOpts;
