// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import notificationSlice from '../slices/notificationSlice';

const store = configureStore({
  reducer: {
    notifications: notificationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
