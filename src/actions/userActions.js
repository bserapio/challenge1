import * as types from './actionTypes';
import connectService from '../services/connect';
import configureStore from '../store/configureStore';


export function checkAuth(auth) {
    return dispatch => {
        dispatch({
            type: types.CHECK_LOGIN,
            payload: { auth },
        });
        if (!auth) {
            if (localStorage.getItem('user')) {
                dispatch(loginSuccess(JSON.parse(localStorage.getItem('user'))));
                configureStore.history.push(window.location.pathname);
            } else {
                configureStore.history.push('/');
                dispatch({
                    type: types.NOT_LOGGED,
                    payload: {},
                });
            }
        } else {
            dispatch({
                type: types.USER_LOGGED,
                payload: { auth },
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
            res => {
                dispatch(getUserSuccess(res.data))
            },
            err => {
                dispatch(loginFail(err))
            }
        );
    };
}
export function loginUser(credentials) {
    return dispatch => {
        dispatch({
            type: types.LOGIN_REQUEST,
            payload: {},
        });
        connectService.login(credentials).then(
            res => {
                localStorage.setItem('user', JSON.stringify(res.data));
                dispatch(loginSuccess(res.data));
                configureStore.history.push('/clients');
            },
            loginError => {
                dispatch(userError(loginError));
            }
        );
    };
}

export function dispatchErrorCreating(createError) {
    return {
        type: types.ERROR_CREATE_USER,
        payload: { createError },
    };
}

export function dispatchCreating() {
    return {
        type: types.CREATE_USER,
        payload: {},
    };
}


export function createNewUser(data) {
    return dispatch => {
        dispatch(dispatchCreating);
        return connectService.createUser(data).then(
            res => {
                dispatch(getUsers());
                return res;
            },
            err => {
                dispatch(dispatchErrorCreating(err.response));
                throw err;
            }
        ).catch(error => {
            dispatch(dispatchErrorCreating(error.response));
        });
    };
}


// ACTIONS CALLS

export function loginSuccess(auth) {
    return {
        type: types.LOG_IN_SUCCESS,
        payload: { auth },
    };
}
export function logOutUser() {
    return dispatch => {
        dispatch({ type: types.LOG_OUT });
        localStorage.removeItem('user');
        window.location.href = '/';
    };
}


export function getUserSuccess(users) {
    return {
        type: types.GET_USERS_SUCCESS,
        payload: { users },
    };
}

export function loginFail(loginError) {
    return {
        type: types.LOGIN_FAIL,
        payload: {loginError}
    };
}

export function userError(loginError) {
    return {
        type: types.GET_USERS_ERROR,
        payload: {loginError}
    };
}
