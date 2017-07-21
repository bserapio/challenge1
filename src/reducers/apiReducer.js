import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function apiReducer(state = initialState, action) {
    switch (action.type) {
        case types.OK_RESPONSE: {

            return {
                ...state,
                apiError: null,
            };
        }
        case types.ERROR_401: {
            const {apiError} = action.payload;
            return {
                ...state,
                apiError,
            };
        }
        case types.ERROR_403: {
            const {apiError} = action.payload;
            return {
                ...state,
                apiError,
            };
        }
        case types.ERROR_405: {
            const {apiError} = action.payload;
            return {
                ...state,
                apiError,
            };
        }


        default: {
            return state;
        }

    }
}
