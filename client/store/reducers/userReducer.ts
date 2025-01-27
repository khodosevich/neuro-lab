export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const UPDATE_USER = "UPDATE_USER";

interface UserState {
    isAuth: boolean;
    user: {
        id: string | null;
        email: string | null;
    };
}

const inittialState: UserState = {
    isAuth: false,
    user: {
        id: null,
        email: null
    }
}

export const userReducer = (state = inittialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case LOGIN:
            console.log("LOGIN", action.payload);
            return {
                ...state,
                isAuth: true,
                user: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                isAuth: false,
                user: {
                    id: null,
                    username: null,
                    email: null,
                },
            };
        case UPDATE_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                },
            };
        default: {
            return state;
        }
    }
}