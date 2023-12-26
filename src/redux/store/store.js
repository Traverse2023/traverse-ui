// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import notificationSlice from '../slices/notificationSlice';

const store = configureStore({
  reducer: {
    notifications: notificationSlice,
  },
});



export default store;
