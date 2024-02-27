// src/counterSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    notifications: [],
    loadState: "idle",
    addState: "idle",
};

export const addNotificationAsync = createAsyncThunk(
    "notifications/addNotification",
    async (notification) => {
        const response = await axios.post(
            `
                https://storage-service.traverse.zone`,
            notification
        );
        return response.data;
    }
);

export const loadAllNotificationsAsync = createAsyncThunk(
    "notifications/loadAllNotifications",
    async (forEmail) => {
        const response = await axios.get(
            `https://storage-service.traverse.zone/api/v1/notifications/getNotifications/${forEmail}`
        );
        return response.data;
    }
);

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotification: (state, action) => {
            console.log("action.payload: ", action);
            state.notifications.push(action.payload);
            console.log("After adding not", state.notifications);
        },
        loadAllNotifications: (state, action) => {
            state.notifications = action.payload;
        },
        // increment: (state) => {
        //   state.value += 1;
        // },
        // decrement: (state) => {
        //   state.value -= 1;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNotificationAsync.pending, (state) => {
                // You can add some loading state here
                state.addState = "loading";
            })
            .addCase(addNotificationAsync.fulfilled, (state, action) => {
                // The notification is added to the state when the promise is fulfilled
                state.notifications.push(action.payload);
                state.addState = "fulfilled";
            })
            .addCase(addNotificationAsync.rejected, (state) => {
                // You can handle errors here
                state.addState = "failed";
            })
            .addCase(loadAllNotificationsAsync.pending, (state) => {
                // You can add some loading state here
                state.loadState = "loading";
            })
            .addCase(loadAllNotificationsAsync.fulfilled, (state, action) => {
                // The notification is added to the state when the promise is fulfilled
                state.notifications = action.payload;
                state.loadState = "fulfilled";
            })
            .addCase(loadAllNotificationsAsync.rejected, (state) => {
                // You can handle errors here
                state.loadState = "failed";
            });
    },
});

export const { addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
