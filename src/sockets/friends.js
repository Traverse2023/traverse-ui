import io from "socket.io-client";
class FriendsSocket {
    email;
    socket;
    constructor(email) {
        this.email = email;
        this.socket = io(`http://load-balancer-for-main-service-1482477395.us-east-1.elb.amazonaws.com/friends`, {
            query: {
                email: email,
            },
        });
    }

    sendFriendRequest(potentialFriend) {
        this.socket.emit("sendFriendRequest", potentialFriend);
    }

    unfriend(potentialFriend) {
        console.log("19 unfriend friends.js");
        this.socket.emit("unfriend", potentialFriend);
    }

    unfriendListener(callback) {
        this.socket.on("receiveUnfriendNotification", callback);
    }

    friendRequestListener(callback) {
        this.socket.on("receiveFriendRequest", callback);
    }

    acceptFriendRequest(potentialFriend) {
        this.socket.emit("acceptFriendRequest", potentialFriend);
    }

    acceptListener(callback) {
        this.socket.on("receiveAcceptFriendRequest", callback);
    }

    declineFriendRequest(potentialFriend) {
        console.log("here31declinefriend", potentialFriend);
        this.socket.emit("declineFriendRequest", potentialFriend);
    }

    declineFriendRequestListener(callback) {
        this.socket.on("receiveDeclineFriendRequest", callback);
    }
}

export default FriendsSocket;
