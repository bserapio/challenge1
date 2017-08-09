const DEFAULT_PATH = 'dashboard/client';
export const GET_CLIENTS_SUCCESS = `${{ DEFAULT_PATH }}/GET_CLIENT_SUCCESS`;
export const GET_CLIENTS_REQUEST = `${{ DEFAULT_PATH }}/GET_CLIENT_REQUEST`;
export const GET_CLIENTS_ERROR = `${{ DEFAULT_PATH }}/GET_CLIENTS_ERROR`;
export const GET_CLIENTS_UPDATE_REQUEST = `${{ DEFAULT_PATH }}/GET_CLIENTS_UPDATE_REQUEST`;
export const GET_CLIENTS_UPDATE_SUCCESS = `${{ DEFAULT_PATH }}/GET_UPDATE_SUCCESS`;
export const GET_CLIENTS_UPDATE_ERROR = `${{ DEFAULT_PATH }}/GET_CLIENTS_UPDATE_ERROR`;
export const GET_CLIENTS_REMOVE_REQUEST = `${{ DEFAULT_PATH }}/GET_CLIENTS_REMOVE_REQUEST`;
export const GET_CLIENTS_REMOVE_SUCCESS = `${{ DEFAULT_PATH }}/GET_CLIENTS_REMOVE_SUCCESS`;
export const GET_CLIENTS_REMOVE_ERROR = `${{ DEFAULT_PATH }}/GET_CLIENTS_REMOVE_ERROR`;
export const GET_CLIENTS_CREATION_REQUEST = `${{ DEFAULT_PATH }}/GET_CLIENTS_CREATION_REQUEST`;
export const GET_CLIENTS_CREATION_RESPONSE = `${{ DEFAULT_PATH }}/GET_CLIENTS_CREATION_RESPONSE`;
export const GET_CLIENTS_CREATION_ERROR = `${{ DEFAULT_PATH }}/GET_CLIENTS_CREATION_ERROR`;
export const GET_CLIENTS_ELEVATOR_REQUEST = `${{ DEFAULT_PATH }}/GET_CLIENTS_ELEVATOR_REQUEST`;
export const GET_CLIENTS_ELEVATOR_SUCCESS = `${{ DEFAULT_PATH }}/GET_CLIENTS_ELEVATOR_SUCCESS`;
export const GET_CLIENTS_ELEVATOR_ERROR = `${{ DEFAULT_PATH }}/GET_CLIENTS_ELEVATOR_ERROR`;
export const SEARCH_FILTER = `${{ DEFAULT_PATH }}/SEARCH_FILTER`;

const prepareClients = data => {
    const results = data;
    results.forEach((item, index) => {
        if (Object.prototype.hasOwnProperty.call(item, 'clientMeta')) {
            const element = item.clientMeta;
            if (element) {
                Object.keys(element).forEach(prop => {
                    if (element && Object.prototype.hasOwnProperty.call(element, prop)) {
                        if (prop === 'users') {
                            Object.keys(element[prop]).forEach(prop1 => {
                                item[`clientMeta#users#${prop1}`] = element[prop][prop1];
                            });
                        } else {
                            item[`clientMeta#${prop}`] = element[prop];
                        }
                    }
                });
                item.key = item.id;
                results[index] = item;
            }
        }
    });
    return results;
};


export function getElevatorUpdateSuccess(res) {
    return {
        type: GET_CLIENTS_UPDATE_SUCCESS,
        payload: { res },
    };
}


export const getClientAction = () => ({
    types: [GET_CLIENTS_REQUEST, GET_CLIENTS_SUCCESS, GET_CLIENTS_ERROR],
    client: 'default',
    payload: {
        request: {
            method: 'GET',
            url: '/services/client',

        },
    },
});

export const updateClientAction = data => ({
    types: [GET_CLIENTS_UPDATE_REQUEST, GET_CLIENTS_UPDATE_SUCCESS, GET_CLIENTS_UPDATE_ERROR],
    client: 'default',
    payload: {
        request: {
            method: 'PUT',
            url: `services/client/${data.id}`,
            data,

        },
    },
});

export const updateClientActionBooleanAction = (data, method) => {
    let url;
    switch (method) {

        case 'active': {
            url = `services/client/${data.id}/activate`;
            break;
        }
        case 'maintenance': {
            url = `services/client/${data.id}/manteinance`;
            break;
        }
        case 'autoUpdate': {
            url = `services/client/${data.id}/autoUpdate`;
            break;
        }
        case 'invoice': {
            url = `services/client/${data.id}/invoice`;
            break;
        }
        case 'channel': {
            url = `services/client/${data.id}/channel`;
            break;
        }

        case 'ikentoo': {
            url = `services/client/${data.id}/ikentoo`;
            break;
        }
        default: {
            url = null;
        }
    }

    if (url === null) {
        return url;
    }
    return {
        types: [GET_CLIENTS_UPDATE_REQUEST, GET_CLIENTS_UPDATE_SUCCESS, GET_CLIENTS_UPDATE_ERROR],
        client: 'default',
        payload: {
            request: {
                method: 'PUT',
                url,
                data,

            },
        },
    };
};


export const removeClientAction = data => ({
    types: [GET_CLIENTS_REMOVE_REQUEST, GET_CLIENTS_REMOVE_SUCCESS, GET_CLIENTS_REMOVE_ERROR],
    client: 'default',
    payload: {
        request: {
            method: 'DELETE',
            url: `services/client/${data.id}`,

        },
    },
});

export const createClientAction = data => ({
    types: [GET_CLIENTS_CREATION_REQUEST, GET_CLIENTS_CREATION_RESPONSE, GET_CLIENTS_CREATION_ERROR],
    client: 'default',
    payload: {
        request: {
            method: 'POST',
            url: 'services/client',
            data,

        },
    },
});

export const checkElevateAction = data => ({
    types: [GET_CLIENTS_ELEVATOR_REQUEST, GET_CLIENTS_ELEVATOR_SUCCESS, GET_CLIENTS_ELEVATOR_ERROR],
    client: 'default',
    payload: {
        request: {
            method: 'POST',
            url: 'services/client/elevate',
            data,

        },
    },
});

export function searchFilter(searchText) {
    return dispatch => {
        dispatch({
            type: SEARCH_FILTER,
            payload: { searchText },
        });
    };
}


const initialState = {
    clients: [],
    searchClient: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CLIENTS_SUCCESS: {
            const clients = prepareClients(action.payload.data);

            return {
                ...state,
                clients,
                apiError: null,
            };
        }
        case SEARCH_FILTER: {
            const { searchText } = action.payload;
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
