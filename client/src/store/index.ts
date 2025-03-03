import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './slices/alertSlice';
import modelsReducer from './slices/modelsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        alert: alertReducer,
        models: modelsReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;