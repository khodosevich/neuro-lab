import { LOGIN, LOGOUT, UPDATE_USER } from "../reducers/userReducer";
import { UserProfile } from '../../src/types/type.ts';

export const login = (user: UserProfile) => ({
	type: LOGIN,
	payload: user,
});

export const logout = () => ({
	type: LOGOUT,
});

export const updateUser = (updatedFields: Partial<UserProfile>) => ({
	type: UPDATE_USER,
	payload: updatedFields,
});
