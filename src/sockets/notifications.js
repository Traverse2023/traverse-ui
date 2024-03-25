import io from "socket.io-client";

class NotificationSocket {
    email;
    socket

    constructor(email) {
        this.email = email
        this.socket = io(`${import.meta.env.VITE_APP_BACKEND_URL}groups`, {
            query: {
                email: email
            }
        });
    }

    receiveNotification(callback) {
        this.socket.on('globalNotification', callback)
    }
}

export default NotificationSocket