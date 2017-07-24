const apiEndPoints = {
    baseUrl: 'http://127.0.0.1:8000/',
    userList:     'api/user',
    userDetail:  'api/user/:id',
    userClientList:  'api/user/:id/client',
    userClientDetail: 'api/user/:id/client/:idMeta',
    clientList: 'api/client',
    clientDetail: 'api/client/:id',
    clientDetailActivate: 'api/client/:id/activate',
    clientDetailManteinance: 'api/client/:id/manteinance',
    clientDetailAuto: 'api/client/:id/autoUpdate',
    clientDetailInvoice: 'api/client/:id/invoice',
    clientDetailChannel: 'api/client/:id/channel',
    clientDetailIkentoo: 'api/client/:id/ikentoo',
    clientElevate: 'api/client/elevate',
    login: 'login',
};

export default apiEndPoints;

