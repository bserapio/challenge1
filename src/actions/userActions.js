import * as types from './actionTypes';
import connectService from '../services/connect';
import configureStore from '../store/configureStore'
export function loginSuccess(user) {
    return {
        type: types.LOG_IN_SUCCESS,
        payload: { user }
    };
}
export function loginFail(loginError) {
    return {type: types.LOGIN_FAIL,payload:{loginError}}
}

export function loginUser(credentials) {
    return function(dispatch) {
        connectService.login(credentials).then(
            (res)=> {
                debugger;
                dispatch(loginSuccess(res.data));
                configureStore.history.push('/cats')
            },
            (loginError) => {
                dispatch(loginFail(loginError));

            }
        );

    };
}

export function logOutUser() {

    return {type: types.LOG_OUT}
}