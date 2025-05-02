import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import alertReducer from './slices/alertSlice';
import modelsReducer from './slices/modelsSlice';
import userReducer from './slices/userSlice';
import datasetsSlice from './slices/datasetsSlice.ts';
import chatSlice from './slices/chatSlice.ts';

export const store = configureStore({
    reducer: {
        alert: alertReducer,
        models: modelsReducer,
        user: userReducer,
        datasets: datasetsSlice,
        chat: chatSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;