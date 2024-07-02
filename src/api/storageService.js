import axios from "axios";

const storageService = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL + "/storage-service",
});

function setStorageServiceToken(token) {
    storageService.defaults.headers["Authorization"] = "Bearer " + token;
}

const getMessages = (groupId, channelName, cursor) => {
    console.log(groupId);
    console.log(channelName);
    console.log(`Getting messages for ${groupId}/${channelName}...`);
    return new Promise(async (resolve, reject) => {
        let url = `/messages/${groupId}/${channelName}`;
        try {
            url += cursor ? `?cursor=${cursor}` : "";
            const response = await storageService.get(url);
            console.log(`Get messages response: ${response}`);
            resolve(response.data);
        } catch (error) {
            console.log(`Error retrieving messages: ${error}`);
            reject(error);
        }
    });
};

const getNotifications = (cursor) => {
    return new Promise(async (resolve, reject) => {

        let url = `/notifications/getNotifications`

        try {
            url += cursor ? `?cursor=${cursor}` : "";
            const response = await storageService.get(url);
            console.log(`Get notifications response: ${response.data}`);
            resolve(response.data);
        } catch (error) {
            console.log(`Failed to get notifications with error: ${error}`);
            reject(error);
        }
    });
};

const deleteNotification = (userId, notificationSortKey) => {
     return new Promise(async(resolve, reject) => {
         try {
             const response = await storageService.delete(`/notifications/deleteNotification/`,
             {data: {"pk": userId, "sk": notificationSortKey}});
             console.log(`Delete notification for user ${userId} : ${response.data}`)
             resolve(response.data)
         } catch (error) {
            console.log(`Error deleting notification: ${error}`);
            reject(error);
         }
     })
}

export { getMessages, getNotifications, setStorageServiceToken};
