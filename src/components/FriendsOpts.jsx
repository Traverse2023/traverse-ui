import { useEffect, useState, useContext } from "react";
import {getFriendshipStatus,} from "../api/main-service.js";
import {SocketContext} from "../context/friends-socket-context";
import {useAuth} from "../hooks/useAuth.tsx";

const FriendOpts = ({ user2Id, locationState = null, index, component = null, triggers=[] }) => {
    const { friendsSocketApi } = useContext(SocketContext)
    const [friendshipStatusState, setFriendshipStatusState] = useState({});
    const { user } = useAuth();
    friendsSocketApi.friendRequestListener((senderId) => {
        console.log('line18', index, senderId)
        if (user2Id === senderId) {
            setFriendshipStatusState({friendshipStatus: 'FRIEND_REQUEST', initiatedUser: senderId})
            triggers.forEach(fn => fn())
        }
        })

    friendsSocketApi.acceptListener((senderId) => {
        console.log('line23', index, senderId)
        if (user2Id === senderId) {
            setFriendshipStatusState({friendshipStatus: 'FRIENDS', initiatedUser: senderId})
            triggers.forEach(fn => fn())
        }
    })

    friendsSocketApi.declineFriendRequestListener((senderId) => {
        console.log('here32 ', senderId, "declinedFriendRequest")
        if (user2Id === senderId) {
            setFriendshipStatusState({friendshipStatusState: undefined})
            triggers.forEach(fn => fn())
        }
    })

    friendsSocketApi.unfriendListener((senderId) => {
        console.log('here32 ', senderId, "declinedFriendRequest")
        if (user2Id === senderId) {
            setFriendshipStatusState({friendshipStatusState: undefined})
            triggers.forEach(fn => fn())
        }
    })

    useEffect(() => {
        console.log(`Getting friendship status for users ${user.id} and ${user2Id}`);
        getFriendshipStatus(user.id, user2Id)
            .then(({ friendshipStatus, initiatedUser }) => {
                console.log('Friendship status: ' + friendshipStatus)
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
            initiatedUser: user.id,
        });
        friendsSocketApi.sendFriendRequest(potentialFriend)
        triggers.forEach(fn => fn())
    };

    const unfriendHandler = (potentialFriend) => {
        console.log('62 friendsopts unfriend')
        setFriendshipStatusState({
            friendshipStatus: undefined,
        });
        friendsSocketApi.unfriend(potentialFriend)
        triggers.forEach(fn => {
            console.log('triggered', fn)
            fn()
        })
    };

    const removeFriendRequestHandler = (potentialFriend) => {
        setFriendshipStatusState({ friendshipStatus: undefined });
        friendsSocketApi.declineFriendRequest(potentialFriend)
        triggers.forEach(fn => fn())
    };

    const acceptFriendRequestHandler = (potentialFriend) => {
        // acceptFriendRequest(auth.token, auth.email, potentialFriend);
        setFriendshipStatusState({
            friendshipStatus: "FRIENDS",
            initiatedUser: null,
        });
        friendsSocketApi.acceptFriendRequest(potentialFriend)
        triggers.forEach(fn => fn())
    };

    if (user.id === user2Id) {
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
                                addFriend(user2Id);
                            }}
                        >
                            Add Friend
                        </button>
                    </div>
                );
            case "FRIEND_REQUEST":
                if (friendshipStatusState.initiatedUser === user.id) {
                    return (
                        <div className="inner-options">
                            <p className="friend-options">Request Sent</p>
                            <button
                                className="friend-options"
                                onClick={() =>
                                    removeFriendRequestHandler(user2Id)
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
                                    acceptFriendRequestHandler(user2Id)
                                }
                            >
                                Accept Request
                            </button>
                            <button
                                className="friend-options"
                                onClick={() =>
                                    removeFriendRequestHandler(user2Id)
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
                        <button className="friend-options" onClick={() => unfriendHandler(user2Id)}>
                            Remove Friend
                        </button>
                    </div>
                ) : (
                    <div className="inner-options">
                        <p className="friend-options">&#10003; Friends</p>
                        <button className="friend-options" onClick={() => unfriendHandler(user2Id)}>
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
