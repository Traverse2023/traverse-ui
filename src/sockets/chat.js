import io from 'socket.io-client';
class ChatSocket {
    userId;
    socket
    constructor(userId) {
        this.userId = userId
        this.socket = io(`${import.meta.env.VITE_APP_BACKEND_URL}/groups`, {
            query: {
                userId: userId
            }
        });
    }

    globalListener(callback) {
        this.socket.on("globalNotification", callback)
    }

    sendMessage(groupId, message_info) {
        console.log('sendingMsg')
        this.socket.emit("sendMessage", groupId, message_info)
    }

    receiveMessageListener(callback) {
        this.socket.on('receiveMessage', callback)
    }

    joinCall(member, groupObj, channelName) {
        this.socket.emit("joinCall", member, groupObj, channelName)
    }

    joinCallListener(callback) {
        console.log('in join call listener')
        this.socket.on('joinCallListener', callback)
    }

    disconnectCall(member, groupObj, channelName) {
        this.socket.emit("disconnectCall", member, groupObj, channelName)
    }

    disconnectCallListener(callback) {
        this.socket.on('disconnectCallListener', callback)
    }

    joinRoom(groupId) {
        console.log("injoinroom15")
        this.socket.emit("joinRoom", groupId)
    }



    joinMessageListener(callback) {
        console.log("20joinMessageReceive")
        this.socket.on('joinMessage', callback);
    }

    addMember(potentialMember, groupId) {
        this.socket.emit("addMember", potentialMember, groupId)
    }

    receiveAddedToGroupNotificationListener(callback) {
        this.socket.on('receiveAddedToGroupNotification', callback);
    }

    disconnect() {
        this.socket.emit("disconnect")
    }
}

export default ChatSocket

