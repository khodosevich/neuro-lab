import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "../../types/type.ts";

type UserState = {
	isAuth: boolean;
	user: UserProfile | null;
}

const initialState: UserState = {
	isAuth: false,
	user: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<UserProfile>) => {
			state.isAuth = true;
			state.user = action.payload;
		},
		logout: (state) => {
			state.isAuth = false;
			state.user = null;
		},
		updateUser: (state, action: PayloadAction<Partial<UserProfile>>) => {
			if (state.user) {
				state.user = { ...state.user, ...action.payload };
			}
		},
		setUserProfile: (state, action: PayloadAction<UserProfile>) => {
			state.user = action.payload;
		}
	},
});

export const { login, logout, updateUser, setUserProfile } = userSlice.actions;
export default userSlice.reducer;
