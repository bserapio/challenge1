import configureStore from '../../ducks/configureStore';

const DEFAULT_PATH = 'dashboard/api';

export const OK_RESPONSE = `${{DEFAULT_PATH}}/OK_RESPONSE`;
export const ERROR_401 = `${{DEFAULT_PATH}}/ERROR_401`;
export const ERROR_403 = `${{DEFAULT_PATH}}/ERROR_403`;
export const ERROR_405 = `${{DEFAULT_PATH}}/ERROR_405`;


export function okResponse(response) {
    return response;
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

const initialState = {
    apiError: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case OK_RESPONSE: {
            return {
                ...state,
                apiError: null,
            };
        }
        case ERROR_401: {
            const {apiError} = action.payload;
            return {
                ...state,
                apiError,
            };
        }
        case ERROR_403: {
            const {apiError} = action.payload;
            return {
                ...state,
                apiError,
            };
        }
        case ERROR_405: {
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