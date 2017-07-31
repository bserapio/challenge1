import configureStore from '../../ducks/configureStore';

const DEFAULT_PATH = 'dashboard/api';
export const SEND_REQUEST = `${{DEFAULT_PATH}}/SEND_REQUEST`;
export const OK_RESPONSE = `${{DEFAULT_PATH}}/OK_RESPONSE`;
export const CLEAR_ERROR = `${{DEFAULT_PATH}}/CLEAR_ERROR`;
export const ERROR_400 = `${{DEFAULT_PATH}}/ERROR_400`;
export const ERROR_401 = `${{DEFAULT_PATH}}/ERROR_401`;
export const ERROR_403 = `${{DEFAULT_PATH}}/ERROR_403`;
export const ERROR_405 = `${{DEFAULT_PATH}}/ERROR_405`;
export const ERROR_500 = `${{DEFAULT_PATH}}/ERROR_500`;

export function sendRequest() {
    return dispatch => {

        return dispatch({
            type: SEND_REQUEST,
            payload: {},
        });
    };
}

export function clearError() {
    return dispatch => {

        return dispatch({
            type: CLEAR_ERROR,
            payload: {},
        });
    };
}

export function okResponse() {
    return dispatch => {

        return dispatch({
            type: OK_RESPONSE,
            payload: {},
        });
    };
}

export function error400() {
    return dispatch => {
        const apiError = {};
        apiError.code = '400';
        apiError.message = 'Bad Request';
        return dispatch({
            type: ERROR_400,
            payload: {apiError},
        });
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
            type: ERROR_401,
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
            type: ERROR_403,
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
            type: ERROR_405,
            payload: {apiError},
        });
    };
}


export function error500() {
    return dispatch => {
        const apiError = {};
        console.log('Entro en 500 action');
        apiError.code = '405';
        apiError.message = 'Method not allow';
        return dispatch({
            type: ERROR_500,
            payload: {apiError},
        });
    };
}


const initialState = {
    apiError: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SEND_REQUEST:
        case CLEAR_ERROR:
        case OK_RESPONSE: {
            return {
                ...state,
                apiError: null,
            };
        }
        case ERROR_400:
        case ERROR_401:
        case ERROR_403:
        case ERROR_405:
        case ERROR_500: {

            const {apiError} = action.payload;
            return {
                ...state,
                apiError,
            };
        }

        default: {
            return state;
        }

    }
}
