import axios from "axios";

const backend = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});

// Login user with username and password. Use the access token to get user from main service.
// Return tokens and user data.
const loginUser = (email, password) => {
    console.log("Authenticating user...")
    return new Promise(async (resolve, reject) => {
        try {
            const authResponse = await backend.post("/auth/login", {
                "username": email,
                "password": password,
            });
            console.log(`Login response: ${authResponse.data}`);
            let {accessToken, refreshToken} = authResponse.data;

            const getUserResponse = await backend.get("/main-service/user/getUser",
                {
                    headers: {
                        Authorization : `Bearer ${accessToken}`
                    }});

            console.log(`Get user response: ${JSON.stringify(getUserResponse.data)}`);
            // username is email
            let {id, username, firstName, lastName, pfpUrl} = getUserResponse.data;
            resolve({refreshToken, accessToken, id, username, firstName, lastName, pfpUrl});

        } catch (err) {
            console.log(`Error while attempting login ${err}`);
            reject(err);
        }
    });
};

const registerUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await backend.post("/auth/register", user);
            console.log(response.data);
            resolve(response.data);
        } catch (err) {
            console.log(`An error occurred registering user: ${err}`);
            reject(err);
        }
    });
};

export { loginUser, registerUser };
