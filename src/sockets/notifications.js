import io from "socket.io-client";

class NotificationSocket {
    userId;
    socket

    constructor(userId, token) {
        this.userId = userId
        this.socket = io(`${import.meta.env.VITE_APP_BACKEND_URL}`, {
            query: {
                path: '/notifications',
                userId: userId,
                access_token: token
            }
        });
    }

    receiveNotification(callback) {
        this.socket.on('globalNotification', callback)
    }

    joinRoom(groupId) {
        this.socket.emit("joinRoom", groupId);
    }
}

export default NotificationSocket