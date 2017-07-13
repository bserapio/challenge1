import * as types from './actionTypes';
import connectService from '../services/connect';


export function getClientSuccess(clients) {

    return {
        type: types.GET_CLIENTS_SUCCESS,
        payload: {clients}
    };
}

export function getClientUpdateSuccess(clients) {
    return {
        type: types.GET_CLIENTS_UPDATE_SUCCESS,
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

        return connectService.getClients().then(
            (res) => {
                return dispatch(getClientSuccess(res.data));
            },
            (clientError) => {
                return dispatch(getClientError(clientError));
            }
        );
    };
}

export function updateClient(record) {
    return function (dispatch) {
        dispatch({
            type: types.GET_CLIENTS_UPDATE_REQUEST,
            payload: {record}
        });
        return connectService.updateClient(record).then(
            (res) => {
                return dispatch(getClients());
            }
        )
    }


}