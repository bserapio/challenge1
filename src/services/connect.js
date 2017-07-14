
import apiEndPoints from './shared/endpoints'
let axios = require('axios');
function login(data) {
    let url = apiEndPoints.login;
   return  axios.post(url,{
            username:data.username,
            password:data.password
    });
}

function createUser(data) {
    let url = apiEndPoints.userList;
    return  axios.post(url,data);
}

function getUsers() {
    let url = apiEndPoints.userList;
    return axios.get(url);

}

function getClients() {
    let url = apiEndPoints.clientList;
    return axios.get(url);

}

function updateClient(data) {
    let url = apiEndPoints.clientDetail;
    url = url.replace(':id', data.id);
    return axios.put(url, data)


}

function createClient(data) {
    let url = apiEndPoints.clientList;
    return axios.post(url, data);
}


function elevateClient(data) {
    let url = apiEndPoints.clientElevate;
    return axios.post(url, data);
}


const connectService = {login, getUsers, getClients, updateClient, createUser, createClient, elevateClient};

export default connectService;