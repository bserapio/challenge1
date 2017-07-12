import * as types from './actionTypes';
import connectService from '../services/connect';


export function getClientSuccess(clients) {

    return {
        type: types.GET_CLIENTS_SUCCESS,
        payload: {clients}
    };
}


export function getClientError(clientError) {

    return {
        type: types.GET_CLIENTS_ERROR,
        payload: {clientError}
    };
}

export function getClients() {
    return function (dispatch) {
        dispatch({
            type: types.GET_CLIENTS_REQUEST,
            payload: {}
        });

        connectService.getClients().then(
            (res) => {
                dispatch(getClientSuccess(res.data));
            },
            (clientError) => {
                dispatch(getClientError(clientError));
            }
        );
    };
}

