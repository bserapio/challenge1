import apiEndPoints from './shared/endpoints';

import * as apiActions from '../modules/api';

import configureStore from '../configureStore';

const axios = require('axios');

const store = configureStore;


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
    let url = apiEndPoints.clientDetail;
    url = url.replace(':id', data.id);
    return axios.put(url, data);
}

function updateActiveClient(data) {
    let url = apiEndPoints.clientDetailActivate;
    url = url.replace(':id', data.id);
    return axios.put(url, data);
}

function updateManteinanceClient(data) {
    let url = apiEndPoints.clientDetailManteinance;
    url = url.replace(':id', data.id);
    return axios.put(url, data);
}

function updateAutoUpdateClient(data) {
    let url = apiEndPoints.clientDetailAuto;
    url = url.replace(':id', data.id);
    return axios.put(url, data);
}

function updateInvoiceClient(data) {
    let url = apiEndPoints.clientDetailInvoice;
    url = url.replace(':id', data.id);
    return axios.put(url, data);
}


function updateChannelClient(data) {
    let url = apiEndPoints.clientDetailChannel;
    url = url.replace(':id', data.id);
    return axios.put(url, data);
}

function updateIkentooClient(data) {
    let url = apiEndPoints.clientDetailIkentoo;
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
        store.dispatch(apiActions.okResponse());
    return response;
}
    , err => {
    switch (err.response.status) {

        case 401: {
            localStorage.removeItem('user');
            store.dispatch(apiActions.error401());
            throw err;
        }
        case 403: {
            store.dispatch(apiActions.error403());
            throw err;
        }
        case 405: {
            console.log('error 405');
            store.dispatch(apiActions.error405());
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
    updateActiveClient,
    updateManteinanceClient,
    updateAutoUpdateClient,
    updateInvoiceClient,
    updateChannelClient,
    updateIkentooClient,
};

export default connectService;
