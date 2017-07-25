import configureStore from '../../ducks/configureStore';
import connectService from '../services/connect';

const DEFAULT_PATH = 'dashboard/client';
export const GET_CLIENTS_SUCCESS = `${{DEFAULT_PATH}}/GET_CLIENT_SUCCESS`;
export const GET_CLIENTS_REQUEST = `${{DEFAULT_PATH}}/GET_CLIENT_REQUEST`;
export const GET_CLIENTS_ERROR = `${{DEFAULT_PATH}}/GET_CLIENTS_ERROR`;
export const GET_CLIENTS_UPDATE_REQUEST = `${{DEFAULT_PATH}}/GET_CLIENTS_UPDATE_REQUEST`;
export const GET_CLIENTS_UPDATE_SUCCESS = `${{DEFAULT_PATH}}/GET_UPDATE_SUCCESS`;
export const GET_CLIENTS_REMOVE_REQUEST = `${{DEFAULT_PATH}}/GET_CLIENTS_REMOVE_REQUEST`;
export const GET_CLIENTS_REMOVE_SUCCESS = `${{DEFAULT_PATH}}/GET_CLIENTS_REMOVE_SUCCESS`;
export const GET_CLIENTS_CREATION_REQUEST = `${{DEFAULT_PATH}}/GET_CLIENTS_CREATION_REQUEST`;
export const GET_CLIENTS_ELEVATOR_REQUEST = `${{DEFAULT_PATH}}/GET_CLIENTS_ELEVATOR_REQUEST`;
export const GET_CLIENTS_ELEVATOR_SUCCESS = `${{DEFAULT_PATH}}/GET_CLIENTS_ELEVATOR_SUCCESS`;
export const SEARCH_FILTER = `${{DEFAULT_PATH}}/SEARCH_FILTER`;


export function getClientSuccess(clients) {
    return {
        type: GET_CLIENTS_SUCCESS,
        payload: {clients},
    };
}

export function getClientUpdateSuccess(clients) {
    return {
        type: GET_CLIENTS_UPDATE_SUCCESS,
        payload: {clients},
    };
}

export function getElevatorUpdateSuccess(res) {
    return {
        type: GET_CLIENTS_UPDATE_SUCCESS,
        payload: {res},
    };
}

export function getClientAction() {
    return dispatch => {
        dispatch({
            type: GET_CLIENTS_REQUEST,
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
                            item.key = item.id;
                            results[index] = item;
                        }
                    }
                });
                res.data.rows = results;
                const clients = res.data;
                return dispatch(
                    {
                        type: GET_CLIENTS_SUCCESS,
                        payload: {clients},
                    }
                );
            },
            clientError => dispatch(
                {
                    type: GET_CLIENTS_ERROR,
                    payload: clientError,
                }
            )
        );
    };
}

export function updateClient(record) {
    return dispatch => {
        dispatch({
            type: GET_CLIENTS_UPDATE_REQUEST,
            payload: {record},
        });


        return connectService.updateClient(record).then(
            () => dispatch(getClientAction())
        );
    };
}

export function updateActiveClient(record) {
    return dispatch => {
        dispatch({
            type: GET_CLIENTS_UPDATE_REQUEST,
            payload: {record},
        });


        return connectService.updateActiveClient(record).then(
            () => dispatch(getClientAction())
        );
    };
}

export function updateManteinanceClient(record) {
    return dispatch => {
        dispatch({
            type: GET_CLIENTS_UPDATE_REQUEST,
            payload: {record},
        });


        return connectService.updateManteinanceClient(record).then(
            () => dispatch(getClientAction())
        );
    };


}

export function updateAutoUpdateClient(record) {
    return dispatch => {
        dispatch({
            type: GET_CLIENTS_UPDATE_REQUEST,
            payload: {record},
        });


        return connectService.updateAutoUpdateClient(record).then(
            () => dispatch(getClientAction())
        );
    };
}


export function updateInvoiceClient(record) {
    return dispatch => {
        dispatch({
            type: GET_CLIENTS_UPDATE_REQUEST,
            payload: {record},
        });


        return connectService.updateInvoiceClient(record).then(
            () => dispatch(getClientAction())
        );
    };


}

export function updateChannelClient(record) {
    return dispatch => {
        dispatch({
            type: GET_CLIENTS_UPDATE_REQUEST,
            payload: {record},
        });


        return connectService.updateChannelClient(record).then(
            () => dispatch(getClientAction())
        );
    };


}

export function updateIkentooClient(record) {
    return dispatch => {
        dispatch({
            type: GET_CLIENTS_UPDATE_REQUEST,
            payload: {record},
        });


        return connectService.updateIkentooClient(record).then(
            () => dispatch(getClientAction())
        );
    };


}

export function removeClient(record) {
    return dispatch => {
        dispatch({
            type: GET_CLIENTS_UPDATE_REQUEST,
            payload: {record},
        });
        return connectService.removeClient(record).then(
            () => dispatch(getClientAction())
        );
    };
}

export function createClient(record) {
    return dispatch => {
        dispatch({
            type: GET_CLIENTS_CREATION_REQUEST,
            payload: {record},
        });
        return connectService.createClient(record).then(
            () => dispatch(getClientAction())
        );
    };
}

export function checkElevateClient(record) {
    return dispatch => {
        dispatch({
            type: GET_CLIENTS_ELEVATOR_REQUEST,
            payload: {record},
        });
        return connectService.elevateClient(record).then(
            res => {
                dispatch(getElevatorUpdateSuccess(res.data));
                return res.data;
            }
        );
    };
}


const initialState = {
    clients: [],
    searchClient: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CLIENTS_SUCCESS: {
            const {clients} = action.payload;
            return {
                ...state,
                clients,
                apiError: null,
            };
        }
        case SEARCH_FILTER: {
            const {searchText} = action.payload;
            return {
                ...state,
                searchText,

            };
        }


        default: {
            return state;
        }

    }

}