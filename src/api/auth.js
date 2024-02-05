import axios from "axios";
import { loadAllNotificationsAsync } from "../redux/slices/notificationSlice";

const backend = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL + "api/",
});

const login = (email, password) => {
    console.log("====================================");
    console.log("authemail", email, password);
    console.log("====================================");
    return new Promise(async (resolve, reject) => {
        try {
            const response = await backend.post("auth/login", {
                email,
                password,
            });
            console.log("here", response.data);
            loadAllNotificationsAsync(email);
            resolve(response.data);
        } catch (err) {
            console.log("====================================");
            console.log("her2");
            console.log("====================================");
            console.log(err);
            reject(err);
        }
    });
};

const register = (email, password, firstName, lastName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await backend.post("auth/register", {
                email,
                firstName,
                lastName,
                password,
            });
            console.log(response.data);
            resolve(response.data);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

export { login, register };
