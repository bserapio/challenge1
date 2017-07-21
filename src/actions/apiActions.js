import * as types from './actionTypes';
import configureStore from '../store/configureStore';
import connectService from '../services/connect';

export function okResponse(response) {
    return dispatch => {
        dispatch({
            type: types.OK_RESPONSE,
            payload: {},
        });
        return response;
    };
}

export function error401() {
    return dispatch => {
        const apiError = {};
        apiError.code = '401';
        apiError.message = 'You are not logged in';
        configureStore.history.push('/');
        localStorage.removeItem('user');
        return dispatch({
            type: types.ERROR_403,
            payload: {apiError},
        });
    };
}

export function error403() {
    return dispatch => {
        const apiError = {};
        apiError.code = '403';
        apiError.message = 'You are not allow to do that operation';
        return dispatch({
            type: types.ERROR_405,
            payload: {apiError},
        });
    };
}

export function error405() {
    return dispatch => {
        const apiError = {};
        console.log('Entro en 405 action');
        apiError.code = '405';
        apiError.message = 'Method not allow';
        return dispatch({
            type: types.ERROR_405,
            payload: {apiError},
        });
    };
}

export function checkAuth() {
    return dispatch => {
        dispatch(
            {
                type: types.LOGIN_REQUEST,
                payload: {},
            });
        let auth = null;
        auth = localStorage.getItem('user');
        console.log(auth);
        if (auth) {
            configureStore.history.push(window.location.pathname);
            auth = JSON.parse(auth);
            configureStore.history.push('/');
            return dispatch(
                {
                    type: types.LOG_IN_SUCCESS,
                    payload: auth,
                });
        } else {
            console.log("Check error");
            console.log(auth);
            return dispatch({
                type: types.NOT_LOGGED,
                payload: {},
            });
        }


    };
}

export function loginUser(credentials) {
    return dispatch => {
        console.log("Entro en login");
        dispatch({
            type: types.LOGIN_REQUEST,
            payload: {},
        });
        return connectService.login(credentials).then(
            res => {
                console.log(res.data);
                const auth = res.data;

                console.log(JSON.stringify(res.data));
                localStorage.setItem('user', JSON.stringify(res.data));
                configureStore.history.push('/clients');
                return dispatch(
                    {
                        type: types.LOG_IN_SUCCESS,
                        payload: auth,
                    });
            },
            loginError => dispatch({
                type: types.GET_USERS_ERROR,
                payload: loginError,
            })
        );
    };
}

