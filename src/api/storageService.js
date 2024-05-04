import axios from "axios";

// const storageServiceBaseURL = `${
//     "https://storage-service.traverse.zone"
// }/api/v1`;

const storageServiceBaseURL = `${
<<<<<<< Updated upstream
    import.meta.env.VITE_APP_STORAGE_SERVICE_URL
}/api/v1`;

const getMessages = (groupId, channelName, cursor) => {
=======
    "http://127.0.0.1:8080"
}/api/v1`;


const getPaginatedMessages = (groupId, channelName, pageNumber) => {
>>>>>>> Stashed changes
    console.log(groupId);
    console.log(channelName);
    console.log(
        `Getting messages from ${storageServiceBaseURL}/messages/${groupId}/${channelName}`
    );
    return new Promise(async (resolve, reject) => {
        let url = `${storageServiceBaseURL}/messages/${groupId}/${channelName}`;
        try {
            url += cursor ? `?cursor=${cursor}` : "";
            const response = await axios.get(url);
            console.log(`Get messages data for group and channel ${groupId}, ${channelName}`);
            resolve(response.data);
        } catch (error) {
            console.log(`Error retrieving stored messages: ${error}`);
            reject(error);
        }
    });
};

const getNotifications = (userId, cursor) => {
    return new Promise(async (resolve, reject) => {

        let url = `${storageServiceBaseURL}/notifications/getNotifications/${userId}`

        try {
            url += cursor ? `?cursor=${cursor}` : "";
            const response = await axios.get(url);
            console.log(`Get notifications for user ${userId}: ${response.data}`);
            resolve(response.data);
        } catch (error) {
            console.log(`Error when getting notifications for user ${userId}: ${error}`);
            reject(error);
        }
    });
};

const deleteNotification = (userId, notificationSortKey) => {
     return new Promise(async(resolve, reject) => {
         try {
             const response = await axios.delete(`${storageServiceBaseURL}/notifications/deleteNotification/`,
             {data: {"pk": userId, "sk": notificationSortKey}});
             console.log(`Delete notification for user ${userId} : ${response.data}`)
             resolve(response.data)
         } catch (error) {
            console.log(`Error deleting notification: ${error}`);
            reject(error);
         }
     })
}

export { getMessages, getNotifications };
