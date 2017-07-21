import * as types from './actionTypes';


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

