import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function userReducer(state = initialState.user, action) {
    switch(action.type) {
        case types.LOG_IN_SUCCESS:
            const {user} = action.payload;
            return {
                ...state,
                user:user,
                loginError: null

            }

            break;
        case types.LOG_OUT:
            return {
                ...state,
                user:null,
                loginError: null

            }
            break;
        case types.LOGIN_FAIL:
            const {err} = action.payload;
            return {
                ...state,
                loginError:err

            }
            break;
        default:
            return state;
    }
}