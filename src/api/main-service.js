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
                `/group/getFriendsWhoAreNotMembers/${groupId}`,
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
                `/user/getUser`,
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
                `/search/searchUsers/${searched}`,
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
                `/friends/getFriends`,
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
                `/friends/getFriendRequests/`,
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
                `/friends/getMutualFriends/${otherUserId}`,
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
                `/friends/getFriendshipStatus/${friendUserId}`,
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
                "/friends/sendFriendRequest",
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
                `/friends/removeFriendRequest/${friendUserId}`,
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
                "/friends/acceptFriendRequest",
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

const savePFP = (pfpURL) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.post(
                "/user/savePFP",
                {  pfpURL },
            );
            console.log(response.data);
            resolve(response.data);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const getAgoraRTCToken = (channelId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Getting agora token with channelId: ", channelId)
            const response = await mainService.get('/agora/getToken/' + channelId);
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
    savePFP,
};
