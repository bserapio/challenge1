import apiEndPoints from './shared/endpoints';
import * as userActions from '../actions/userActions';

const axios = require('axios');

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


axios.interceptors.response.use(response => response,
    error => {
        if (error.response.status === 401) {
            userActions.logOutUser();
            window.location.href = '/';

        }
        return error;
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
