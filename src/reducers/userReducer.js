import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState, action) {
    switch (action.type) {

        case types.CHECK_LOGIN: {
            return {
                ...state,
                apiError: null,
                loginError: null,
            };
        }
        case types.LOG_IN_SUCCESS: {
            const { auth } = action.payload;

            return {
                ...state,
                auth,
                apiError: null,
                loginError: null,
            };
        }
        case types.LOG_OUT: {
            return {
                ...state,
                auth: null,
                loginError: null,
                apiError: null,
                users: [],

            };
        }
        case types.LOGIN_FAIL: {
            const { loginError } = action.payload;

            return {
                ...state,
                loginError,
            };
        }
        case types.GET_USERS_SUCCESS: {
            const { users } = action.payload;
            return {
                ...state,
                createError: null,
                apiError: null,
                users,
            };
        }
        case types.ERROR_CREATE_USER: {
            const { createError } = action.payload;
            return {
                ...state,
                createError,
            };
        }


        default: {
            return state;
        }
    }
}

