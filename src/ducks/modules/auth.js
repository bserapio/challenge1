import connectService from '../services/connect';

const DEFAULT_PATH = 'dashboard/auth';
export const LOGIN_REQUEST = `${{DEFAULT_PATH}}/LOGIN_REQUEST`;
export const LOG_IN_SUCCESS = `${{DEFAULT_PATH}}/LOG_IN_SUCCESS`;
export const LOG_OUT = `${{DEFAULT_PATH}}/LOG_OUT`;
export const LOGIN_FAIL = `${{DEFAULT_PATH}}/LOGIN_FAIL`;
export const CHECK_LOGIN = `${{DEFAULT_PATH}}/CHECK_LOGIN`;
export const NOT_LOGGED = `${{DEFAULT_PATH}}/NOT_LOGGED`;


export function checkAuth() {
    return dispatch => {
        dispatch(
            {
                type: LOGIN_REQUEST,
                payload: {},
            });

        let auth = localStorage.getItem('user');
        if (auth) {
            auth = JSON.parse(auth);

            return dispatch(
                {
                    type: LOG_IN_SUCCESS,
                    payload: {auth},
                });
        }
        return dispatch({
            type: NOT_LOGGED,
            payload: {},
        });
    };
}

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
                window.location = '/clients';

                dispatch({
                    type: LOG_IN_SUCCESS,
                    payload: {auth},
                });
            },
            loginError => {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: {loginError},
                });
            }
        );
    };
}

export function logOutUser() {
    return dispatch => {
        dispatch({type: LOG_OUT});
        localStorage.removeItem('user');
        window.location = '/';
    };
}


const initialState = {
    auth: {role: 'guest', id: -1},
    loginError: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case LOG_IN_SUCCESS: {
            const {auth} = action.payload;
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
        case LOGIN_FAIL: {
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
