import io from 'socket.io-client';
class ChatSocket {
    email;
    socket
    constructor(email) {
        this.email = email
        this.socket = io(`${process.env.REACT_APP_BACKEND_URL}groups`, {
            query: {
                email: email
            }
        });
    }

    sendMessage(groupId, msg) {
        console.log('sendingMsg')
        this.socket.emit("sendMessage", groupId, msg)
    }

    receiveMessageListener(callback) {
        this.socket.on('receiveMessage', callback)
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

