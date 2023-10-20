import io from 'socket.io-client';
class FriendsSocket {
    email;
    socket
    constructor(email) {
        this.email = email
        this.socket = io(`${process.env.REACT_APP_BACKEND_URL}friends`, {
            query: {
                email: email
            }
        });
    }

    sendFriendRequest(potentialFriend) {
        this.socket.emit("sendFriendRequest", potentialFriend)
    }

    friendRequestListener(callback) {
        this.socket.on('receiveFriendRequest', callback);
    }

    acceptFriendRequest(potentialFriend) {
        this.socket.emit('acceptFriendRequest', potentialFriend)
    }

    acceptListener(callback) {
        this.socket.on('receiveAcceptFriendRequest', callback);
    }

}

export default FriendsSocket

