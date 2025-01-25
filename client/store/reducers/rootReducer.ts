import { combineReducers } from "redux";
import { counterReducer } from "./counter";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;