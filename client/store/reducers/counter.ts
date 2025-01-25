const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
const COUNTER_DECREMENT = 'COUNTER_DECREMENT';

export const counterReducer = (state = { count: 0 }, action: { type: string }) => {
    switch (action.type) {
        case COUNTER_INCREMENT: {
            return {
                ...state,
                count: state.count + 1
            }
        }
        case COUNTER_DECREMENT: {
            return {
                ...state,
                count: state.count - 1
            }
        }

        default: {
            return state;
        }
    }
}