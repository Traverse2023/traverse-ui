import axios from "axios";

const backend = axios.create({
    baseURL: "http://load-balancer-for-main-service-1482477395.us-east-1.elb.amazonaws.com/" + "api/",
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
            const response = await backend.post(
                "group/createGroup",
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
            const response = await backend.get(
                `group/getGroups/${user1Email}`,
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
            const response = await backend.get(
                `group/getMembers/${groupId}`,
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
            const response = await backend.get(
                `group/getFriendsWhoAreNotMembers/${user1Email}/${groupId}`,
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

const getUser = (token, user1Email) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return new Promise(async (resolve, reject) => {
        try {
            const response = await backend.get(
                `search/getUser/${user1Email}`,
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
            const response = await backend.get(
                `search/searchUsers/${searcher}/${searched}`,
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

const getFriends = (token, user1Email) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    console.log("====================================");
    console.log("35", user1Email);
    console.log("====================================");
    return new Promise(async (resolve, reject) => {
        try {
            const response = await backend.get(
                `friends/getFriends/${user1Email}`,
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

const getFriendRequests = (token, user1Email) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    console.log("====================================");
    console.log("35", user1Email);
    console.log("====================================");
    return new Promise(async (resolve, reject) => {
        try {
            const response = await backend.get(
                `friends/getFriendRequests/${user1Email}`,
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

const getMutualFriends = (token, user1Email, user2Email) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return new Promise(async (resolve, reject) => {
        try {
            const response = await backend.get(
                `friends/getMutualFriends/${user1Email}/${user2Email}`,
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

const getFriendshipStatus = (token, user1Email, user2Email) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    console.log("55 here", user1Email, user2Email);
    return new Promise(async (resolve, reject) => {
        try {
            const response = await backend.get(
                `friends/getFriendshipStatus/${user1Email}/${user2Email}`,
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

const sendFriendRequest = (token, user1Email, user2Email) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return new Promise(async (resolve, reject) => {
        try {
            const response = await backend.post(
                "friends/sendFriendRequest",
                { user1Email, user2Email },
                config
            );
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    });
};

const removeFriendRequest = (token, user1Email, user2Email) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    console.log("55 here", user1Email, user2Email);
    return new Promise(async (resolve, reject) => {
        try {
            const response = await backend.get(
                `friends/removeFriendRequest/${user1Email}/${user2Email}`,
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

const acceptFriendRequest = (token, user1Email, user2Email) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return new Promise(async (resolve, reject) => {
        try {
            const response = await backend.post(
                "friends/acceptFriendRequest",
                { user1Email, user2Email },
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

const savePFP = (token, user1Email, pfpURL) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return new Promise(async (resolve, reject) => {
        try {
            const response = await backend.post(
                "user/savePFP",
                { user1Email, pfpURL },
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

export {
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
