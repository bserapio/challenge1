import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_CLIENTS_SUCCESS: {
            const { clients } = action.payload;
            return {
                ...state,
                clients,
                apiError: null,
            };
        }
        case types.SEARCH_FILTER: {
            const { searchText } = action.payload;
            return {
                ...state,
                searchText,

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
        case types.LOG_IN_SUCCESS: {
            const {auth} = action.payload;
            return {
                ...state,
                auth,
                apiError: null,
                loginError: null,
            };
        }
        case types.CHECK_LOGIN: {
            return {
                ...state,
                apiError: null,
                loginError: null,
            };
        }
        case types.OK_RESPONSE: {
            return {
                ...state,
                apiError: null,
            };
        }
        case types.ERROR_401: {
            const { apiError } = action.payload;
            return {
                ...state,
                apiError,
            };
        }
        case types.ERROR_403: {
            const { apiError } = action.payload;
            return {
                ...state,
                apiError,
            };
        }
        case types.ERROR_405: {
            const { apiError } = action.payload;
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
