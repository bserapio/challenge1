import request from './shared/request';
import apiEndPoints from './shared/endpoints';

function get(id) {
    const url = apiEndPoints.clientDetail.replace(':id', id);
    return request({
        url,
        method: 'GET',
    });
}
function put(id, data) {
    const url = apiEndPoints.clientDetail.replace(':id', id);
    return request({
        url,
        method: 'POST',
        data,
    });
}
function list(limit = 10, page = 1) {
    return request({
        url: apiEndPoints.userList,
        method: 'GET',
        data: {
            limit,
            page,
        },
    });
}
function create(data) {
    return request({
        url: apiEndPoints.userList,
        method: 'POST',
        data,
    });
}
const userService = {get, create, list, put};

export default userService;
