const apiEndPoints = {
    baseUrl:'http://127.0.0.1:8000/',
    userList:     'api/user',
    userDetail:  'api/user/:id',
    userClientList:  'api/user/:id/client',
    userClientDetail:'api/user/:id/client/:idMeta',
    clientList:'api/client',
    clientDetail:'api/client/:id',
    login : 'login',
};

export default apiEndPoints;