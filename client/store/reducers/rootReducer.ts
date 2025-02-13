import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { modelsReducer } from './modelsReducer.ts';
import { alertReducer } from './alertReducer.ts';

export const rootReducer = combineReducers({
    user: userReducer,
    models: modelsReducer,
    alert: alertReducer,
});

export type RootState = ReturnType<typeof rootReducer>;