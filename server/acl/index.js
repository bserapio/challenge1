'use strict';

const pathToRegexp = require('path-to-regexp');
const groupsAcl = require('./aclGroups');

const acl = {
    urlPath: {},
    aclGroup: {},
    modelAcl: {},
    add(element) {
        for (const k in element) {
            const ele = element[k];
            for (const i in ele) {
                const eleCheck = ele[i];
                if ((!Object.prototype.hasOwnProperty.call(eleCheck, 'groups')) ||
                    (!Object.prototype.hasOwnProperty.call(eleCheck, 'methods'))) {
                    throw new Error('Error creating acl');
                }
            }
        }
        Object.assign(this.urlPath, element);
    },
    addModelAcl(element) {
        Object.assign(this.modelAcl, element);
    },
    get() {
        return this.urlPath;
    },
    checkRoute(req, element) {
        const groups = element.groups;
        const methods = element.methods;
        for (const i in groups) {
            const group = groups[i];

            if (group.indexOf(req.user.role) !== -1) {
                if ((methods.indexOf(req.method) !== -1) || (methods === '*')) {
                    return true;
                }
            }
        }
        return false;
    },
    middleware(req, res, next) {
        if (req.path === '/') {
            return next();
        }

        try {
            const role = req.user.role;
            return next();
        } catch (err) {
            if (Object.prototype.hasOwnProperty.call(err, 'id')) {
                return res.status(err.id).json({ message: 'You are not logged' });
            }
            return res.status(401).json({ message: err.message });
        }
    },
    modelMiddleware(name, action, role) {

        if (!Object.prototype.hasOwnProperty.call(this.modelAcl, name)) {
            return false;
        }
        const model = this.modelAcl[name];
        return model[action].indexOf(role) !== -1;
    },
};
const usersPath = {
    '/services/user': [
        {
            groups: [groupsAcl.adminGroup], // min group
            methods: ['*'],
        },
        {
            groups: [groupsAcl.managerGroup], // min group
            methods: ['GET'],
        },

    ],

};
const clientChannel = {
    '/services/client/:id(\\d+)/channel': [
        {
            groups: [groupsAcl.adminGroup],
            methods: ['*'],
        },
        {
            groups: [groupsAcl.managerGroup],
            methods: ['GET', 'POST'],
        },
    ],

};
const clientActivateActions = {
    '/services/client/:id(\\d+)/activate': [
        {
            groups: [groupsAcl.adminGroup], // min group
            methods: ['*'],
        },
        {
            groups: [groupsAcl.userGroup], // min group
            methods: ['GET', 'POST', 'PUT'],
        },
    ],

};
const clientManteinanceActions = {
    '/services/client/:id(\\d+)/manteinance': [
        {
            groups: [groupsAcl.adminGroup], // min group
            methods: ['*'],
        },
        {
            groups: [groupsAcl.userGroup], // min group
            methods: ['GET', 'POST', 'PUT'],
        },
    ],

};
const clientActions = {
    '/services/client/:id(\\d+)/*': [
        {
            groups: [groupsAcl.adminGroup], // min group
            methods: ['*'],
        },
        {
            groups: [groupsAcl.userGroup], // min group
            methods: ['GET', 'POST', 'PUT'],
        },
    ],

};
const clientDetail = {
    '/services/client/:id(\\d+)': [
        {
            groups: [groupsAcl.adminGroup], // min group
            methods: ['*'],
        },
        {
            groups: [groupsAcl.managerGroup], // min group
            methods: ['GET', 'POST', 'PUT'],
        },

        {
            groups: [groupsAcl.userGroup], // min group
            methods: ['GET'],

        },
    ],

};
const clientList = {
    '/services/client': [
        {
            groups: [groupsAcl.adminGroup], // min group
            methods: ['*'],
        },
        {
            groups: [groupsAcl.managerGroup], // min group
            methods: ['GET', 'POST', 'PUT'],
        },

        {
            groups: [groupsAcl.userGroup], // min group
            methods: ['GET'],

        },
    ],

};
const clientelevate = {
    '/services/client/elevate': [
        {
            groups: [groupsAcl.adminGroup], // min group
            methods: ['*'],
        },
        {
            groups: [groupsAcl.managerGroup], // min group
            methods: ['GET', 'POST', 'PUT'],
        },

    ],

};

// ACL MODELS
const usersModel = {
    'users': {
        create: groupsAcl.adminGroup,
        read: groupsAcl.managerGroup,
        update: groupsAcl.adminGroup,
        delete: groupsAcl.adminGroup,

    },

};


const clientDbModel = {
    'clientDb': {
        create: groupsAcl.managerGroup,
        read: groupsAcl.userGroup,
        update: groupsAcl.managerGroup,
        delete: groupsAcl.adminGroup,

    },

};

const clientMetaModel = {
    'clientMeta': {
        create: groupsAcl.managerGroup,
        read: groupsAcl.userGroup,
        update: groupsAcl.managerGroup,
        delete: groupsAcl.adminGroup,

    },

};


const aclFix = acl;
aclFix.add(usersPath);
aclFix.add(clientList);
aclFix.add(clientActivateActions);
aclFix.add(clientManteinanceActions);
aclFix.add(clientDetail);
aclFix.add(clientChannel);
aclFix.add(clientActions);
aclFix.add(clientelevate);
aclFix.addModelAcl(usersModel);
aclFix.addModelAcl(clientDbModel);
aclFix.addModelAcl(clientMetaModel);

module.exports = {
    aclFix,
};
