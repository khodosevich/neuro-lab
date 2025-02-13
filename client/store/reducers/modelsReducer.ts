export const GET_MODELS_LIST = "GET_MODELS_LIST";

const inittialState = {
	models: [],
}

export const modelsReducer = (state = inittialState, action: { type: string, payload: any }) => {
	switch (action.type) {
		case GET_MODELS_LIST:
			console.log("reducer", action.payload);
			return {
				...state,
				models: action.payload,
			};
		default: {
			return state;
		}
	}
}