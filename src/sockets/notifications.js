import io from "socket.io-client";
class NotificationsSocket {
    email;
    socket;
    constructor(email) {
        this.email = email;
        this.socket = io(`${import.meta.env.VITE_APP_BACKEND_URL}notifications`, {
            query: {
                email: email,
            },
        });
    }

    receiveNotificationListener(callback) {
        this.socket.on("notification", callback);
        console.log("Send notification from server");

    }


}

export default NotificationsSocket;
