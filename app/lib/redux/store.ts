import { configureStore } from '@reduxjs/toolkit';
import customerSlice from './customerSlice';

export const store = configureStore({
  reducer: {
    customer: customerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;