import axios     from 'axios'
import apiEndPoints from './endpoints'


const client = axios.create({
    baseURL: apiEndPoints.baseUrl
});

const request = function(options) {
    const Success = function(response) {
        console.debug('Request Successful!', response);
        return response.data;
    };

    const Error = function(error) {
        console.error('Request Failed:', error.config);

        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            console.error('Status:',  error.response.status);
            console.error('Data:',    error.response.data);
            console.error('Headers:', error.response.headers);

        } else {
            // Something else happened while setting up the request
            // triggered the error
            console.error('Error Message:', error.message);
        }

        return Promise.reject(error.response || error.message);
    };

    return client(options)
        .then(Success)
        .catch(Error);
};

export default request;