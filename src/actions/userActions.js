import * as types from './actionTypes';
import connectService from '../services/connect';
import configureStore from '../store/configureStore';


export function checkAuth(auth) {
    return dispatch => {
        dispatch({
            type: types.CHECK_LOGIN,
            payload: {auth},
        });
        if (!auth) {
            configureStore.history.push('/');
            dispatch({
                type: types.NOT_LOGGED,
                payload: {},
            });
        } else {
            dispatch({
                type: types.USER_LOGGED,
                payload: {auth},
            });
        }
    };
}
export function getUsers() {
    return dispatch => {
        dispatch({
            type: types.GET_USERS_REQUEST,
            payload: {},
        });

        return connectService.getUsers().then(
            res => dispatch(getUserSuccess(res.data)),
            loginError => dispatch(loginFail(loginError))
        );
    };
}
export function loginUser(credentials) {
    return dispatch => {
        connectService.login(credentials).then(
            res => {
                dispatch(loginSuccess(res.data));
                configureStore.history.push('/users');
            },
            loginError => {
                dispatch(loginFail(loginError));
            }
        );
    };
}
export function createUser(data) {
    return dispatch => connectService.createUser(data).then(
        () => dispatch(getUsers()),
        loginError => {
            console.log(loginError);
            }
    );
}


// ACTIONS CALLS

export function loginSuccess(auth) {
    return {
        type: types.LOG_IN_SUCCESS,
        payload: {auth},
    };
}
export function logOutUser() {
    return {type: types.LOG_OUT};
}
export function getUserSuccess(users) {
    return {
        type: types.GET_USERS_SUCCESS,
        payload: {users},
    };
}

export function loginFail(loginError) {
    return {type: types.LOGIN_FAIL, payload: {loginError}};
}
