const apiEndPoints = {
    baseUrl: 'http://127.0.0.1:8000/',
    userList: 'services/user',
    userDetail: 'services/user/:id',
    userClientList: 'services/user/:id/client',
    userClientDetail: 'services/user/:id/client/:idMeta',
    clientList: 'services/client',
    clientDetail: 'services/client/:id',
    clientDetailActivate: 'services/client/:id/activate',
    clientDetailManteinance: 'services/client/:id/manteinance',
    clientDetailAuto: 'services/client/:id/autoUpdate',
    clientDetailInvoice: 'services/client/:id/invoice',
    clientDetailChannel: 'services/client/:id/channel',
    clientDetailIkentoo: 'services/client/:id/ikentoo',
    clientElevate: 'services/client/elevate',
    login: 'login',
    acl: 'common/acl',
    lang: 'common/lang',
    types: 'common/type',
    config: 'common/config',
};

export default apiEndPoints;

