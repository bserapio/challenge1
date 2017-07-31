import configureStore from '../../ducks/configureStore';

import {push} from 'react-router-redux';
const DEFAULT_PATH = 'dashboard/auth';
export const LOGIN_REQUEST = `${{DEFAULT_PATH}}/LOGIN_REQUEST`;
export const LOGIN_SUCCESS = `${{DEFAULT_PATH}}/LOGIN_SUCCESS`;
export const LOGIN_ERROR = `${{DEFAULT_PATH}}/LOGIN_ERROR`;
export const LOG_OUT = `${{DEFAULT_PATH}}/LOG_OUT`;

export const CHECK_LOGIN = `${{DEFAULT_PATH}}/CHECK_LOGIN`;
export const NOT_LOGGED = `${{DEFAULT_PATH}}/NOT_LOGGED`;


export function checkAuthAction() {
    return dispatch => {
        dispatch(
            {
                type: LOGIN_REQUEST,
                payload: {},
            });

        const checkAuth = localStorage.getItem('user');
        if (checkAuth) {
            console.log(checkAuth);
            const auth = {};
            auth.data = JSON.parse(checkAuth);
            configureStore.history.push(window.location.pathname);
            return dispatch(
                {
                    type: LOGIN_SUCCESS,
                    payload: auth,
                });
        }
        return dispatch({
            type: LOGIN_ERROR,
            payload: {},
        });
    };
}

/*
export function loginUser(credentials) {
    return dispatch => {
        dispatch({
            type: LOGIN_REQUEST,
            payload: {},
        });
        return connectService.login(credentials).then(
            res => {
                const auth = res.data;
                localStorage.setItem('user', JSON.stringify(res.data));
                configureStore.history.push('/clients');

                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: { auth },
                });
            },
            loginError => {
                dispatch({
                    type: LOGIN_ERROR,
                    payload: { loginError },
                });
            }
        );
    };
}
*/

export const loginUserAction = data => ({
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR],
    client: 'default',
    payload: {
        request: {
            method: 'POST',
            url: 'login',
            data,

        },
    },
});


export function logOutUserAction() {
    return dispatch => {
        dispatch({type: LOG_OUT});
        localStorage.removeItem('user');
        configureStore.history.push('/');
    };
}


const initialState = {
    auth: {role: 'guest', id: -1},
    loginError: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case LOGIN_SUCCESS: {
            const auth = action.payload.data;
            console.log(auth);
            console.log(JSON.stringify(auth));

            localStorage.setItem('user', JSON.stringify(action.payload.data));
            return {
                ...state,
                auth,
                apiError: null,
                loginError: null,
            };
        }
        case CHECK_LOGIN: {
            return {
                ...state,
                apiError: null,
                loginError: null,
            };
        }
        case LOG_OUT: {
            return {
                ...state,
                auth: {role: 'guest', id: -1},
                loginError: null,
                apiError: null,
                users: [],

            };
        }
        case LOGIN_ERROR: {
            const {loginError} = action.payload;

            return {
                ...state,
                loginError,
            };
        }


        default:
            return state;
    }
}
