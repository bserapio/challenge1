import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOG_IN_SUCCESS: {
            const {auth} = action.payload;
            return {
                ...state,
                auth,
                loginError: null,
            };
        }
        case types.LOG_OUT: {
            return {
                ...state,
                auth: null,
                loginError: null,
                users: [],

            };
        }
        case types.LOGIN_FAIL: {
            const {loginError} = action.payload;
            console.log(loginError);
            return {
                ...state,
                loginError: loginError,
            };
        }
        case types.GET_USERS_SUCCESS: {
            const {users} = action.payload;
            return {
                ...state,
                users,
            };
        }
        default: {
            return state;
        }
    }
}
