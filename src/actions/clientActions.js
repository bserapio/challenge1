import * as types from './actionTypes';
import connectService from '../services/connect';


export function getClientSuccess(clients) {
    return {
        type: types.GET_CLIENTS_SUCCESS,
        payload: {clients},
    };
}

export function getClientUpdateSuccess(clients) {
    return {
        type: types.GET_CLIENTS_UPDATE_SUCCESS,
        payload: {clients},
    };
}

export function getElevatorUpdateSuccess(res) {
    return {
        type: types.GET_CLIENTS_UPDATE_SUCCESS,
        payload: {res},
    };
}

export function getClientError(clientError) {
    return {
        type: types.GET_CLIENTS_ERROR,
        payload: {clientError},
    };
}

export function getClients() {
    return dispatch => {
        dispatch({
            type: types.GET_CLIENTS_REQUEST,
            payload: {},
        });

        return connectService.getClients().then(
            res => {
                const results = res.data.rows;
                results.forEach((item, index) => {
                    if (Object.prototype.hasOwnProperty.call(item, 'ClientMetum')) {
                        const element = item.ClientMetum;
                        if (element) {
                            Object.keys(element).forEach(prop => {
                                if (element && Object.prototype.hasOwnProperty.call(element, prop)) {
                                    if (prop === 'User') {
                                        Object.keys(element[prop]).forEach(prop1 => {
                                            item[`ClientMetum#User#${prop1}`] = element[prop][prop1];
                                        });
                                    } else {
                                        item[`ClientMetum#${prop}`] = element[prop];
                                    }
                                }
                            });
                            results[index] = item;
                        }
                    }
                });
                res.data.rows = results;
                return dispatch(getClientSuccess(res.data));
            },
            clientError => dispatch(getClientError(clientError))
        );
    };
}
export function updateClient(record) {
    return dispatch => {
        dispatch({
            type: types.GET_CLIENTS_UPDATE_REQUEST,
            payload: {record},
        });
        return connectService.updateClient(record).then(
            () => dispatch(getClients())
        );
    };
}

export function removeClient(record) {
    return dispatch => {
        dispatch({
            type: types.GET_CLIENTS_UPDATE_REQUEST,
            payload: {record},
        });
        return connectService.removeClient(record).then(
            () => dispatch(getClients())
        );
    };
}


export function createClient(record) {
    return dispatch => {
        dispatch({
            type: types.GET_CLIENTS_CREATION_REQUEST,
            payload: {record},
        });
        return connectService.createClient(record).then(
            () => dispatch(getClients())
        );
    };
}
export function checkElevateClient(record) {
    return dispatch => {
        dispatch({
            type: types.GET_CLIENTS_ELEVATOR_REQUEST,
            payload: {record},
        });
        return connectService.elevateClient(record).then(
            res => dispatch(getElevatorUpdateSuccess(res.data))
        );
    };
}

export function searchFilter(searchText) {
    return dispatch => {
        dispatch({
            type: types.SEARCH_FILTER,
            payload: {searchText},
        });
    };
}

