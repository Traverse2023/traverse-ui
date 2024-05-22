import axios from "axios";

const mainService = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL + "/main-service",
});

function setMainServiceToken(token) {
    mainService.defaults.headers["Authorization"] = token;
}

const createGroup = ( groupInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.post(
                "/group/createGroup",
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
                `/getGroups`,
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
        try {
            const response = await mainService.get(
                `/group/getMembers/${groupId}`,
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

const getAgoraRTCToken = () => {
    // TODO: configure this endpoint to use token in header
    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    // };
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.get(import.meta.env.BACKEND_URL + auth.email + '/' + channelId);
            console.log(response.data);
            resolve(response.data);
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
