
import apiEndPoints from './shared/endpoints'
let axios = require('axios');
function login(data) {
    let url = apiEndPoints.login;
   return  axios.post(url,{
            username:data.username,
            password:data.password
    });
}

function getUsers() {
    let url = apiEndPoints.userList;
    return axios.get(url);

}

function getClients() {
    let url = apiEndPoints.clientList;
    return axios.get(url);

}

const connectService = {login, getUsers, getClients};

export default connectService;