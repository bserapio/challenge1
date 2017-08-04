import configureStore from '../../ducks/configureStore';

const DEFAULT_PATH = 'dashboard/auth';
export const LOGIN_REQUEST = `${{ DEFAULT_PATH }}/LOGIN_REQUEST`;
export const LOGIN_SUCCESS = `${{ DEFAULT_PATH }}/LOGIN_SUCCESS`;
export const LOGIN_ERROR = `${{ DEFAULT_PATH }}/LOGIN_ERROR`;
export const LOGOUT_REQUEST = `${{ DEFAULT_PATH }}/LOGOUT_REQUEST`;
export const LOGOUT_SUCCESS = `${{ DEFAULT_PATH }}/LOGOUT_SUCCESS`;
export const CHECK_LOGIN = `${{ DEFAULT_PATH }}/CHECK_LOGIN`;


export function checkAuthAction() {
    return dispatch => {
        dispatch(
            {
                type: LOGIN_REQUEST,
                payload: {},
            });

        const checkAuth = localStorage.getItem('user');
        if (checkAuth) {
            try {
                const auth = {};
                auth.data = JSON.parse(checkAuth);
                configureStore.history.replace(window.location.pathname);
                return dispatch(
                    {
                        type: LOGIN_SUCCESS,
                        payload: auth,
                    });
            } catch (err) {
                return dispatch({
                    type: LOGIN_ERROR,
                    payload: {},
                });
            }
        }
        return dispatch({
            type: LOGIN_ERROR,
            payload: {},
        });
    };
}
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


export const logOutUserAction = () => ({
    types: [LOGOUT_REQUEST, LOGOUT_SUCCESS],
    client: 'default',
    payload: {
        request: {
            method: 'GET',
            url: 'logout',
        },
    },
});


const initialState = {
    auth: { role: 'guest', id: -1 },
    loginError: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case LOGIN_SUCCESS: {
            const auth = action.payload.data;
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
        case LOGOUT_SUCCESS: {
            localStorage.removeItem('user');
            return {
                ...state,
                auth: { role: 'guest', id: -1 },
                loginError: null,
                apiError: null,
                users: [],

            };
        }
        case LOGIN_ERROR: {
            const { loginError } = action.payload;

            return {
                ...state,
                loginError,
            };
        }


        default:
            return state;
    }
}
