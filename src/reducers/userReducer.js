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
                loginError: null

            };
            break;
        case types.LOGIN_FAIL:
            const {err} = action.payload;
            return {
                ...state,
                loginError:err
            };
            break;
        default:
            return state;
    }
}