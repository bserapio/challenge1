import * as types from './actionTypes';
import connectService from '../services/connect';


export function getUsers(role) {
    return dispatch => {

        if (role === 'user') {
            return null;
        }

        dispatch({
            type: types.GET_USERS_REQUEST,
            payload: {},
        });

        return connectService.getUsers().then(
            res => {
                dispatch(getUserSuccess(res.data));
            },
            err => {
                dispatch(loginFail(err));
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
        payload: {loginError},
    };
}

