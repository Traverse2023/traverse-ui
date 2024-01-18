import axios from "axios";

const storageServiceBaseURL = `${process.env.REACT_APP_STORAGE_SERVICE_URL}/api/v1`;

const getPaginatedMessages = (groupId, channelName, pageNumber) => {
    console.log(`Getting page ${pageNumber} of messages for group: ${groupId} and channel: ${channelName}`)
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(
                `${storageServiceBaseURL}/${groupId}/${channelName}/${pageNumber}`);
            console.log(`Get messages data for group and channel ${groupId}, ${channelName}: ${response.data}`);
            resolve(response.data)
        } catch (error) {
            console.log(`Error retrieving stored messages: ${error}`)
            reject(error)
        }
    });
};

const getPaginatedNotifications = (recieivingEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(
                `${storageServiceBaseURL}/notifications/getNotifications/${recieivingEmail}`)
            console.log(`Get notifications for user ${recieivingEmail}: ${response.data}`)
            resolve(response.data)
        } catch (error) {
            console.log(`Error when getting notifications for user ${recieivingEmail}: ${error}`)
            reject(error)
        }
    });
}

export { getPaginatedMessages, getPaginatedNotifications }