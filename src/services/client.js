

import request from './shared/request'
import apiEndPoints from './shared/endpoints'

function get(id) {

    let url = apiEndPoints.clientDetail.replace(':id',id);
    return request({
        url:    url,
        method: 'GET'
    });
}
function put(id,data) {

    let url = apiEndPoints.clientDetail.replace(':id',id);
    return request({
        url:    url,
        method: 'POST',
        data:data
    });
}
function list(limit=10,page=1) {

    return request({
        url: apiEndPoints.userList,
        method:'GET',
        data : {
            limit: limit,
            page: page
        }
    })
}
function create(data) {
    return request({
        url: apiEndPoints.userList,
        method: 'POST',
        data:  data
    });
}
const clientService = { get, create,list,put };

export default clientService;