import axios from "axios";

const storageServiceBaseURL = `${
    "https://storage-service.traverse.zone"
}/api/v1`;

const getPaginatedMessages = (groupId, channelName, pageNumber) => {
    console.log(groupId);
    console.log(channelName);
    console.log(
        `Getting messages from ${storageServiceBaseURL}/messages/${groupId}/${channelName}/${pageNumber}`
    );
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(
                `${storageServiceBaseURL}/messages/${groupId}/${channelName}/${pageNumber}`
            );
            console.log(
                `Get messages data for group and channel ${groupId}, ${channelName}`
            );
            resolve(response.data);
        } catch (error) {
            console.log(`Error retrieving stored messages: ${error}`);
            reject(error);
        }
    });
};

const getPaginatedNotifications = (recieivingEmail, pageNumber) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(
                `${storageServiceBaseURL}/notifications/getNotifications/${recieivingEmail}/ ${pageNumber}`
            );
            console.log(
                `Get notifications for user ${recieivingEmail}: ${response.data}`
            );
            resolve(response.data);
        } catch (error) {
            console.log(
                `Error when getting notifications for user ${recieivingEmail}: ${error}`
            );
            reject(error);
        }
    });
};

export { getPaginatedMessages, getPaginatedNotifications };
