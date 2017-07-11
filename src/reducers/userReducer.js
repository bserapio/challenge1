import * as types from '../actions/actionTypes';
import initialState from './initialState';
const history = require('../store/configureStore').history;

export default function userReducer(state = initialState.session, action) {
    switch(action.type) {
        case types.LOG_IN_SUCCESS:
            history.push('/cats')
            return !!sessionStorage.jwt
        case types.LOG_OUT:
            history.push('/')
            return !!sessionStorage.jwt
        default:
            return state;
    }
}