import * as types from './actionTypes';
import connectService from '../services/connect';
import configureStore from '../store/configureStore'
export function loginSuccess(res) {
    return {type: types.LOG_IN_SUCCESS,payload:{res}}
}
export function loginFail(err) {
    return {type: types.LOGIN_FAIL,payload:{err}}
}

export function loginUser(credentials) {
    return function(dispatch) {
        connectService.login(credentials).then(
            (res)=> {

                dispatch(loginSuccess(res));
                configureStore.history.push('/cats')
            },
            (err) => {
                dispatch(loginFail(err));

            }
        );

    };
}

export function logOutUser() {

    return {type: types.LOG_OUT}
}