import axios from "axios";

const mainService = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL + "/api",
});

const createGroup = (token, groupInfo, user1Email) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    console.log("====================================");
    console.log(groupInfo);
    console.log("====================================");
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.post(
                "/group/createGroup",
                { groupName: groupInfo.groupName, user1Email },
                config
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
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.get(
                `/getGroups`,
                config
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
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.get(
                `/group/getMembers/${groupId}`,
                config
            );
            console.log("withTokenline65", response.data);
            resolve(response.data);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const getFriendsWhoAreNotMembers = (token, user1Email, groupId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.get(
                `/group/getFriendsWhoAreNotMembers/${groupId}`,
                config
            );
            console.log("withTokenline65", response.data);
            resolve(response.data);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const getUser = (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.get(
                `/search/getUser`,
                config
            );
            console.log(response.data);
            resolve(response.data);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const searchUsers = (token, searcher, searched) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.get(
                `/search/searchUsers/${searched}`,
                config
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
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.get(
                `/friends/getFriends`,
                config
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
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.get(
                `/friends/getFriendRequests/`,
                config
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
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.get(
                `/friends/getMutualFriends/${otherUserId}`,
                config
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
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.get(
                `/friends/getFriendshipStatus/${friendUserId}`,
                config
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
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.post(
                "/friends/sendFriendRequest",
                {  friendUserId },
                config
            );
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    });
};

const removeFriendRequest = (token, friendUserId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.get(
                `/friends/removeFriendRequest/${friendUserId}`,
                config
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
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.post(
                "/friends/acceptFriendRequest",
                { friendUserId },
                config
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
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return new Promise(async (resolve, reject) => {
        try {
            const response = await mainService.post(
                "/user/savePFP",
                {  pfpURL },
                config
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
