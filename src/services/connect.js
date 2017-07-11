
import apiEndPoints from './shared/endpoints'
let axios = require('axios');
function login(data) {
    let url = apiEndPoints.login;
   return  axios.post(url,{
            username:data.username,
            password:data.password
    });
}
const connectService = { login };

export default connectService;