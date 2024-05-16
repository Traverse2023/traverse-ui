import axios from "axios";

const mainService = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL + "/api",
});

function setMainServiceToken(token) {
    mainService.defaults.headers["Authorization"] = token;
}

const createGroup = ( groupInfo, user1Email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.post(
                "/group/createGroup",
                { groupName: groupInfo.groupName, user1Email },
            );
            console.log(response.data);
            resolve(response.data);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const getGroups = (token, user1Email) => {

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

const getMembers = (token, groupId) => {

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

const getFriendsWhoAreNotMembers = (token, groupId) => {
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

const getUser = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.get(
                `/search/getUser`,
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

const getFriends = (token) => {
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

const getFriendRequests = (token) => {
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

const getMutualFriends = (token, otherUserId) => {
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

const getFriendshipStatus = (token, friendUserId) => {
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

const sendFriendRequest = (token, friendUserId) => {
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

const removeFriendRequest = (token, friendUserId) => {
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

const acceptFriendRequest = (token, friendUserId) => {
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

const savePFP = (token, pfpURL) => {
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
