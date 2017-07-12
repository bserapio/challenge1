import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case types.LOG_IN_SUCCESS:
            const {auth} = action.payload;
            return {
                ...state,
                auth: auth,
                loginError: null
            };
            break;
        case types.LOG_OUT:
            return {
                ...state,
                auth: null,
                loginError: null,
                users: []

            };
            break;
        case types.LOGIN_FAIL:
            const {err} = action.payload;
            return {
                ...state,
                loginError:err
            };
            break;

        case types.GET_USERS_SUCCESS:
            const {users} = action.payload;
            return {
                ...state,
                users: users
            };
        default:
            return state;
    }
}