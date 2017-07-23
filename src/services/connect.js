import apiEndPoints from './shared/endpoints';
import * as appActions from '../actions/appActions';
import configureStore from '../store/configureStore';

const axios = require('axios');

const store = configureStore.store;
function login(data) {
    const url = apiEndPoints.login;
    return axios.post(url, {
        username: data.username,
        password: data.password,
    });
}

function createUser(data) {
    const url = apiEndPoints.userList;
    return axios.post(url, data);
}

function getUsers() {
    const url = apiEndPoints.userList;
    return axios.get(url);
}

function getClients() {
    const url = apiEndPoints.clientList;
    return axios.get(url);
}

function updateClient(data) {
    console.log(data);
    let url = apiEndPoints.clientDetail;
    url = url.replace(':id', data.id);
    return axios.put(url, data);
}

function removeClient(data) {
    let url = apiEndPoints.clientDetail;
    url = url.replace(':id', data.id);
    return axios.delete(url);
}

function createClient(data) {
    const url = apiEndPoints.clientList;
    return axios.post(url, data);
}


function elevateClient(data) {
    const url = apiEndPoints.clientElevate;
    return axios.post(url, data);
}

axios.interceptors.response.use(response => {
    store.dispatch(appActions.okResponse());
    return response;
}
    , err => {
    switch (err.response.status) {

        case 401: {
            localStorage.removeItem('user');
            store.dispatch(appActions.error401());
            throw err;
        }
        case 403: {
            store.dispatch(appActions.error403());
            throw err;
        }
        case 405: {
            console.log('error 405');
            store.dispatch(appActions.error405());
            throw err;
        }

        default: {
            throw err;
        }
    }
});


const connectService = {
    login,
    getUsers,
    getClients,
    updateClient,
    createUser,
    createClient,
    elevateClient,
    removeClient,
};

export default connectService;
