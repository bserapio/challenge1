import * as types from './actionTypes';
import configureStore from '../store/configureStore';
import connectService from '../services/connect';

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
        configureStore.history.push('/');
        localStorage.removeItem('user');
        return dispatch({
            type: types.ERROR_403,
            payload: { apiError },
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
            payload: { apiError },
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
            payload: { apiError },
        });
    };
}

export function checkAuth() {
    return dispatch => {
        dispatch(
            {
                type: types.LOGIN_REQUEST,
                payload: {},
            });
        let auth = null;
        auth = localStorage.getItem('user');
        if (auth) {
            auth = JSON.parse(auth);
            configureStore.history.push(window.location.pathname);
            return dispatch(
                {
                    type: types.LOG_IN_SUCCESS,
                    payload: {auth},
                });
        }
        return dispatch({
            type: types.NOT_LOGGED,
            payload: {},
        });
    };
}

export function loginUser(credentials) {
    return dispatch => {
        dispatch({
            type: types.LOGIN_REQUEST,
            payload: {},
        });
        return connectService.login(credentials).then(
            res => {
                const auth = res.data;
                console.log(JSON.stringify(res.data));
                localStorage.setItem('user', JSON.stringify(res.data));
                configureStore.history.push('/clients');
                return dispatch(
                    {
                        type: types.LOG_IN_SUCCESS,
                        payload: {auth},
                    });
            },
            loginError => dispatch({
                type: types.GET_USERS_ERROR,
                payload: loginError,
            })
        );
    };
}


export function searchFilter(searchText) {
    return dispatch => {
        dispatch({
            type: types.SEARCH_FILTER,
            payload: { searchText },
        });
    };
}

export function getClientSuccess(clients) {
    return {
        type: types.GET_CLIENTS_SUCCESS,
        payload: { clients },
    };
}

export function getClientUpdateSuccess(clients) {
    return {
        type: types.GET_CLIENTS_UPDATE_SUCCESS,
        payload: { clients },
    };
}

export function getElevatorUpdateSuccess(res) {
    return {
        type: types.GET_CLIENTS_UPDATE_SUCCESS,
        payload: { res },
    };
}

export function getClientAction() {
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
                const clients = res.data;
                return dispatch(
                    {
                        type: types.GET_CLIENTS_SUCCESS,
                        payload: {clients},
                    }
                );
            },
            clientError => dispatch(
                {
                    type: types.GET_CLIENTS_ERROR,
                    payload: clientError,
                }

            )
        );
    };
}

export function updateClient(record) {
    return dispatch => {
        dispatch({
            type: types.GET_CLIENTS_UPDATE_REQUEST,
            payload: { record },
        });


        return connectService.updateClient(record).then(
            () => dispatch(getClientAction())
        );
    };
}

export function updateActiveClient(record) {
    return dispatch => {
        dispatch({
            type: types.GET_CLIENTS_UPDATE_REQUEST,
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
            type: types.GET_CLIENTS_UPDATE_REQUEST,
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
            type: types.GET_CLIENTS_UPDATE_REQUEST,
            payload: {record},
        });


        return connectService.updateAutoUpdateClient(record).then(
            () => dispatch(getClientAction())
        );
    };


}



export function removeClient(record) {
    return dispatch => {
        dispatch({
            type: types.GET_CLIENTS_UPDATE_REQUEST,
            payload: { record },
        });
        return connectService.removeClient(record).then(
            () => dispatch(getClientAction())
        );
    };
}

export function createClient(record) {
    return dispatch => {
        dispatch({
            type: types.GET_CLIENTS_CREATION_REQUEST,
            payload: { record },
        });
        return connectService.createClient(record).then(
            () => dispatch(getClientAction())
        );
    };
}

export function checkElevateClient(record) {
    return dispatch => {
        dispatch({
            type: types.GET_CLIENTS_ELEVATOR_REQUEST,
            payload: { record },
        });
        return connectService.elevateClient(record).then(
            res => {
                dispatch(getElevatorUpdateSuccess(res.data));
                return res.data;
            }
        );
    };
}

export function getUsers(role) {
    return dispatch => {
        if (role === 'user') {
            return null;
        }

        dispatch({
            type: types.GET_USERS_REQUEST,
            payload: {},
        });

        return connectService.getUsers().then(
            res => {
                dispatch(getUserSuccess(res.data));
            },
            err => {
                dispatch(loginFail(err));
            }
        );
    };
}

export function dispatchErrorCreating(createError) {
    return {
        type: types.ERROR_CREATE_USER,
        payload: { createError },
    };
}

export function dispatchCreating() {
    return {
        type: types.CREATE_USER,
        payload: {},
    };
}

export function createNewUser(data) {
    return dispatch => {
        dispatch(dispatchCreating);
        return connectService.createUser(data).then(
            res => {
                dispatch(getUsers());
                return res;
            },
            err => {
                dispatch(dispatchErrorCreating(err.response));
                throw err;
            }
        ).catch(error => {
            dispatch(dispatchErrorCreating(error.response));
        });
    };
}
export function logOutUser() {
    return dispatch => {
        dispatch({ type: types.LOG_OUT });
        localStorage.removeItem('user');
        window.location.href = '/';
    };
}
export function getUserSuccess(users) {
    return {
        type: types.GET_USERS_SUCCESS,
        payload: { users },
    };
}
export function loginFail(loginError) {
    return {
        type: types.LOGIN_FAIL,
        payload: { loginError },
    };
}

