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

                let results = res.data.rows;
                results.forEach((item, index) => {
                    if (item.hasOwnProperty('ClientMetum')) {
                        const element = item.ClientMetum;
                        for (var prop in element) {
                            item['ClientMetum#' + prop] = element[prop];
                        }
                        results[index] = item;
                    }
                });
                res.data.rows = results;
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
export function createClient(record) {
    return function (dispatch) {
        dispatch({
            type: types.GET_CLIENTS_CREATION_REQUEST,
            payload: {record}
        });
        return connectService.createClient(record).then(
            (res) => {
                return dispatch(getClients());
            }
        )
    }


}
export function checkElevateClient(record) {
    return function (dispatch) {
        dispatch({
            type: types.GET_CLIENTS_ELEVATOR_REQUEST,
            payload: {record}
        });
        return connectService.createClient(record).then(
            (res) => {
                return dispatch(getClients());
            }
        )
    }


}