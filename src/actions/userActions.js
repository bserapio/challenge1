import * as types from './actionTypes';
import connectService from '../services/connect';
import configureStore from '../store/configureStore'
export function loginSuccess(auth) {
    return {
        type: types.LOG_IN_SUCCESS,
        payload: {auth}
    };
}

export function checkAuth(auth) {
    return function (dispatch) {
        dispatch({
            type: types.CHECK_LOGIN,
            payload: {auth}
        });
        if (!auth) {
            configureStore.history.push('/')
        }

    }
}

export function loginFail(loginError) {
    return {type: types.LOGIN_FAIL,payload:{loginError}}
}

export function loginUser(credentials) {
    return function(dispatch) {
        connectService.login(credentials).then(
            (res)=> {

                dispatch(loginSuccess(res.data));
                configureStore.history.push('/users')
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