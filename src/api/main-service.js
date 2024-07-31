import axios from "axios";

export const mainService = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});

function setMainServiceToken(token) {
    mainService.defaults.headers["Authorization"] = "Bearer " + token;
}

const createGroup = ( groupInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.post(
                "/main-service/group/createGroup",
                { groupName: groupInfo.groupName },
            );
            console.log(response.data);
            resolve(response.data);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const getGroups = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.get(
                `/main-service/group/getGroups`,
            );
            console.log(response.data);
            resolve(response.data);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const getMembers = (groupId) => {

    return new Promise(async (resolve, reject) => {
        console.log(`Getting members of group ${groupId}`)

        try {
            const response = await mainService.get(
                `/main-service/group/getMembers/${groupId}`,
            );
            resolve(response.data);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const getFriendsWhoAreNotMembers = (groupId) => {
    return new Promise(async (resolve, reject) => {
        console.log(`Get friends who aren't members for group ${groupId}`);
        try {
            const response = await mainService.get(
                `/main-service/group/getFriendsWhoAreNotMembers/${groupId}`,
            );
            resolve(response.data);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const getUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.get(
                `/main-service/user/getUser`,
            );
            console.log(response.data);
            resolve(response.data);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const searchUsers = (searched) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.get(
                `/main-service/search/searchUsers/${searched}`,
            );
            console.log(response.data);
            resolve(response.data);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const getFriends = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.get(
                `/main-service/friends/getFriends`,
            );
            console.log(response.data);
            resolve(response.data);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const getFriendRequests = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.get(
                `/main-service/friends/getFriendRequests/`,
            );
            console.log(response.data);
            resolve(response.data);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const getMutualFriends = (otherUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.get(
                `/main-service/friends/getMutualFriends/${otherUserId}`,
            );
            console.log(response.data);
            resolve(response.data);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const getFriendshipStatus = (friendUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.get(
                `/main-service/friends/getFriendshipStatus/${friendUserId}`,
            );
            console.log(response.data);
            resolve(response.data);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const sendFriendRequest = (friendUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.post(
                "/main-service/friends/sendFriendRequest",
                {  friendUserId },
            );
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    });
};

const removeFriendRequest = (friendUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.get(
                `/main-service/friends/removeFriendRequest/${friendUserId}`,
            );
            console.log(response.data);
            resolve(response.data);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const acceptFriendRequest = (friendUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.post(
                "/main-service/friends/acceptFriendRequest",
                { friendUserId },
            );
            console.log(response.data);
            resolve(response.data);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};


const savePfp = (formData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.post(
                "/main-service/user/updatePfp",
                formData,
            );
            console.log(`Uploaded pfp url: ${response.data.pfpUrl}`);
            resolve(response.data.pfpUrl);
        } catch (err) {
            console.log(err.message);
            reject(err.message);
        }
    });
};

const getAgoraRTCToken = (channelId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Getting agora token with channelId: ", channelId)
            const response = await mainService.get('/main-service/agora/getToken/' + channelId);
            console.log(response);
            resolve(response);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}



export {
    setMainServiceToken,
    getAgoraRTCToken,
    searchUsers,
    sendFriendRequest,
    getMutualFriends,
    getFriendshipStatus,
    removeFriendRequest,
    acceptFriendRequest,
    getFriends,
    getUser,
    createGroup,
    getGroups,
    getMembers,
    getFriendsWhoAreNotMembers,
    getFriendRequests,
    savePfp,
};
